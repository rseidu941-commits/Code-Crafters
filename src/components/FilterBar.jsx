export default function FilterBar({
  searchTerm,
  setSearchTerm,
  filters,
  setFilters,
}) {
  const handleChange = (e) => {
    setFilters({ ...filters, [e.target.name]: e.target.value });
  };

  return (
    <div className="filter-bar bg-white rounded-xl shadow-sm border border-gray-100 p-4 mb-8">
      {/* Search by title or description */}
      <div className="filter-bar__search mb-4">
        <input
          type="text"
          placeholder="Search events..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="filter-bar__input w-full px-4 py-2 border border-gray-200 rounded-lg text-secondary focus:outline-none focus:border-primary"
        />
      </div>

      {/* Filter by category, modality, technology, date */}
      <div className="filter-bar__filters flex flex-col sm:flex-row sm:flex-wrap gap-3">
        <select
          name="category"
          value={filters.category}
          onChange={handleChange}
          className="filter-bar__select px-4 py-2 border border-gray-200 rounded-lg text-secondary focus:outline-none focus:border-primary"
        >
          <option value="">All Categories</option>
          <option value="workshop">Workshop</option>
          <option value="bootcamp">Bootcamp</option>
        </select>

        <select
          name="modality"
          value={filters.modality}
          onChange={handleChange}
          className="filter-bar__select px-4 py-2 border border-gray-200 rounded-lg text-secondary focus:outline-none focus:border-primary"
        >
          <option value="">All Modalities</option>
          <option value="online">Online</option>
          <option value="presencial">In-Person</option>
        </select>

        <select
          name="technology"
          value={filters.technology}
          onChange={handleChange}
          className="filter-bar__select px-4 py-2 border border-gray-200 rounded-lg text-secondary focus:outline-none focus:border-primary"
        >
          <option value="">All Technologies</option>
          <option value="React">React</option>
          <option value="JavaScript">JavaScript</option>
          <option value="AI">AI</option>
          <option value="DevOps">DevOps</option>
          <option value="CSS">CSS</option>
          <option value="TypeScript">TypeScript</option>
        </select>

        <select
          name="date"
          value={filters.date}
          onChange={handleChange}
          className="filter-bar__select px-4 py-2 border border-gray-200 rounded-lg text-secondary focus:outline-none focus:border-primary"
        >
          <option value="">All Dates</option>
          <option value="october">October 2026</option>
          <option value="november">November 2026</option>
        </select>
      </div>
    </div>
  );
}
