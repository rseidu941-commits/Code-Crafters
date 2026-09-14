export default function StatsCard({ label, value }) {
  return (
    <div className="stats-card bg-white rounded-xl shadow-sm border border-gray-100 p-6 text-center">
      <span className="stats-card__value block text-4xl font-bold text-primary mb-2">{value}</span>
      <p className="stats-card__label text-secondary">{label}</p>
    </div>
  );
}
