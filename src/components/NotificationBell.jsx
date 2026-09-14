import { useState, useEffect, useRef } from 'react';
import { useAuth } from '../context/AuthContext';
import { getNotifications, updateNotification } from '../api/api';

export default function NotificationBell() {
  const { user } = useAuth();
  const [notifications, setNotifications] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const bellRef = useRef(null);

  useEffect(() => {
    if (user) {
      getNotifications(user.id).then(data => setNotifications(data));
    }
  }, [user]);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (bellRef.current && !bellRef.current.contains(e.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleMarkAsRead = async (id) => {
    try {
      await updateNotification(id, { read: true });
      setNotifications(prev =>
        prev.map(n => n.id === id ? { ...n, read: true } : n)
      );
    } catch {
      alert('Failed to mark as read.');
    }
  };

  const handleMarkAllRead = async () => {
    const unread = notifications.filter(n => !n.read);
    try {
      await Promise.all(unread.map(n => updateNotification(n.id, { read: true })));
      setNotifications(prev => prev.map(n => ({ ...n, read: true })));
    } catch {
      alert('Failed to mark all as read.');
    }
  };

  const unreadCount = notifications.filter(n => !n.read).length;

  if (!user) return null;

  return (
    <div className="notification-bell relative" ref={bellRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="notification-bell__btn relative text-secondary hover:text-primary transition"
      >
        🔔
        {unreadCount > 0 && (
          <span className="notification-bell__badge absolute -top-2 -right-2 bg-red-500 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">
            {unreadCount}
          </span>
        )}
      </button>

      {isOpen && (
        <div className="notification-bell__dropdown absolute right-0 top-full mt-2 w-72 sm:w-80 bg-white rounded-xl shadow-lg border border-gray-100 z-50">
          <div className="notification-bell__header px-4 py-3 border-b border-gray-100 flex items-center justify-between">
            <h3 className="notification-bell__title font-semibold text-secondary">Notifications</h3>
            {unreadCount > 0 && (
              <button
                onClick={handleMarkAllRead}
                className="notification-bell__mark-all text-xs text-primary hover:underline"
              >
                Mark all read
              </button>
            )}
          </div>
          <div className="notification-bell__list max-h-64 overflow-y-auto">
            {notifications.length === 0 ? (
              <p className="notification-bell__empty text-center text-secondary py-4 text-sm">No notifications yet.</p>
            ) : (
              notifications.map(n => (
                <div
                  key={n.id}
                  onClick={() => !n.read && handleMarkAsRead(n.id)}
                  className={`notification-bell__item px-4 py-3 border-b border-gray-100 last:border-0 cursor-pointer ${!n.read ? 'bg-blue-50' : ''}`}
                >
                  <p className="notification-bell__message text-sm text-secondary">{n.message}</p>
                  <p className="notification-bell__date text-xs text-gray-400 mt-1">{n.createdAt}</p>
                </div>
              ))
            )}
          </div>
        </div>
      )}
    </div>
  );
}
