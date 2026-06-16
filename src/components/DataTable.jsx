import React, { useState, useEffect } from 'react';
import { Search, ChevronLeft, ChevronRight } from 'lucide-react';
import './DataTable.css';

const DataTable = ({ data, filters, setFilters }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 20;

  // Reset page to 1 when filters or data change
  useEffect(() => {
    setCurrentPage(1);
  }, [filters, data.length]);

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters(prev => ({ ...prev, [name]: value }));
  };

  const totalPages = Math.max(1, Math.ceil(data.length / itemsPerPage));
  
  const paginatedData = data.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <div className="data-table-container glass">
      <div className="table-filters">
        <div className="filter-input-wrapper">
          <Search size={18} className="filter-icon" />
          <input 
            type="text" 
            name="name" 
            placeholder="Filtrar por Nombre" 
            value={filters.name}
            onChange={handleFilterChange}
            className="filter-input"
          />
        </div>
        <div className="filter-input-wrapper">
          <Search size={18} className="filter-icon" />
          <input 
            type="text" 
            name="email" 
            placeholder="Filtrar por Email" 
            value={filters.email}
            onChange={handleFilterChange}
            className="filter-input"
          />
        </div>
        <div className="filter-input-wrapper">
          <Search size={18} className="filter-icon" />
          <input 
            type="text" 
            name="score" 
            placeholder="Filtrar por Score (Ej: 2-1)" 
            value={filters.score}
            onChange={handleFilterChange}
            className="filter-input"
          />
        </div>
      </div>
      
      <div className="table-wrapper">
        <table className="data-table">
          <thead>
            <tr>
              <th>Nombre</th>
              <th>Mail</th>
              <th>Edad</th>
              <th>Localidad</th>
              <th>Predicción</th>
            </tr>
          </thead>
          <tbody>
            {paginatedData.length > 0 ? (
              paginatedData.map(item => (
                <tr key={item.id}>
                  <td>{item.nombre}</td>
                  <td className="text-secondary">{item.mail}</td>
                  <td>
                    <span className="badge">{item.edad}</span>
                  </td>
                  <td>{item.localidad}</td>
                  <td className="font-medium score-cell">
                    {item.teamA} <span className="score-badge">{item.teamAScore} - {item.teamBScore}</span> {item.teamB}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" className="empty-state">No se encontraron registros.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {data.length > 0 && (
        <div className="pagination-controls">
          <span className="pagination-info">
            Mostrando {((currentPage - 1) * itemsPerPage) + 1} a {Math.min(currentPage * itemsPerPage, data.length)} de {data.length} registros
          </span>
          <div className="pagination-buttons">
            <button 
              className="pagination-btn" 
              onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
              disabled={currentPage === 1}
            >
              <ChevronLeft size={18} />
            </button>
            <span className="pagination-current">Página {currentPage} de {totalPages}</span>
            <button 
              className="pagination-btn" 
              onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
              disabled={currentPage === totalPages}
            >
              <ChevronRight size={18} />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default DataTable;
