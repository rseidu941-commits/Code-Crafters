import { Routes, Route } from 'react-router-dom';
import Landing from '../pages/Landing';
import Events from '../pages/Events';
import EventDetail from '../pages/EventDetail';
import Login from '../pages/Login';
import Register from '../pages/Register';
import CreateEvent from '../pages/CreateEvent';
import EditEvent from '../pages/EditEvent';
import MyEvents from '../pages/MyEvents';
import EventStats from '../pages/EventStats';
import MyRegistrations from '../pages/MyRegistrations';
import NotFound from '../pages/NotFound';
import ProtectedRoute from './ProtectedRoute';

export default function AppRoutes() {
  return (
    <Routes>
      {/* Public routes */}
      <Route path="/" element={<Landing />} />
      <Route path="/events" element={<Events />} />
      <Route path="/events/:id" element={<EventDetail />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />

      {/* Organizer-only routes */}
      <Route element={<ProtectedRoute allow={["organizer"]} />}>
        <Route path="/events/new" element={<CreateEvent />} />
        <Route path="/events/:id/edit" element={<EditEvent />} />
        <Route path="/my-events" element={<MyEvents />} />
        <Route path="/my-events/:id/stats" element={<EventStats />} />
      </Route>

      {/* Spectator-only routes */}
      <Route element={<ProtectedRoute allow={["spectator"]} />}>
        <Route path="/my-registrations" element={<MyRegistrations />} />
      </Route>

      {/* 404 catch-all */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}
