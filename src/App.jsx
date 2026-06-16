import React, { useState, useEffect, useMemo } from 'react';
import { Database, Download, RefreshCw, Gift, Users, Trophy, Target, Scale } from 'lucide-react';
import { generateMockData } from './utils/mockData';
import StatCard from './components/StatCard';
import DataTable from './components/DataTable';
import RaffleModal from './components/RaffleModal';
import './App.css';

function App() {
  const [data, setData] = useState([]);
  const [filters, setFilters] = useState({ name: '', email: '', score: '' });
  const [isRaffleOpen, setIsRaffleOpen] = useState(false);
  const [raffleWinner, setRaffleWinner] = useState(null);

  // Initialize data
  useEffect(() => {
    handleRefresh();
  }, []);

  const handleRefresh = () => {
    setData(generateMockData(200));
  };

  const handleSorteo = () => {
    if (filteredData.length === 0) return;
    const randomIndex = Math.floor(Math.random() * filteredData.length);
    setRaffleWinner(filteredData[randomIndex]);
    setIsRaffleOpen(true);
  };

  const handleExportCSV = () => {
    if (filteredData.length === 0) return;
    
    const headers = ['ID', 'Nombre', 'Mail', 'Edad', 'Localidad', 'Team A', 'Team B', 'Score A', 'Score B'];
    const csvRows = [
      headers.join(','),
      ...filteredData.map(row => 
        [
          row.id, 
          `"${row.nombre}"`, 
          row.mail, 
          row.edad, 
          `"${row.localidad}"`, 
          row.teamA, 
          row.teamB, 
          row.teamAScore, 
          row.teamBScore
        ].join(',')
      )
    ];
    
    const csvContent = "data:text/csv;charset=utf-8," + csvRows.join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "votaciones_mundial26.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Filter Logic
  const filteredData = useMemo(() => {
    return data.filter(item => {
      const matchName = item.nombre.toLowerCase().includes(filters.name.toLowerCase());
      const matchEmail = item.mail.toLowerCase().includes(filters.email.toLowerCase());
      const scoreString = `${item.teamAScore}-${item.teamBScore}`;
      const matchScore = filters.score ? scoreString.includes(filters.score) : true;
      return matchName && matchEmail && matchScore;
    });
  }, [data, filters]);

  // Statistics Logic
  const stats = useMemo(() => {
    let localWins = 0;
    let awayWins = 0;
    let ties = 0;

    filteredData.forEach(item => {
      if (item.teamAScore > item.teamBScore) localWins++;
      else if (item.teamBScore > item.teamAScore) awayWins++;
      else ties++;
    });

    return { total: filteredData.length, localWins, awayWins, ties };
  }, [filteredData]);

  return (
    <div className="app-container">
      <header className="header">
        <h1>Dashboard Mundial '26</h1>
        <div className="header-actions">
          <button className="btn btn-secondary" onClick={handleRefresh}>
            <RefreshCw size={18} /> Actualizar
          </button>
          <button className="btn btn-success" onClick={handleExportCSV}>
            <Download size={18} /> Exportar CSV
          </button>
          <button className="btn btn-primary" onClick={handleSorteo}>
            <Gift size={18} /> Realizar Sorteo
          </button>
        </div>
      </header>

      <section className="stats-grid">
        <StatCard 
          title="Total Registros" 
          value={stats.total} 
          icon={Users} 
          colorClass="stat-total" 
        />
        <StatCard 
          title="Gana Local" 
          value={stats.localWins} 
          icon={Target} 
          colorClass="stat-local" 
        />
        <StatCard 
          title="Gana Visitante" 
          value={stats.awayWins} 
          icon={Target} 
          colorClass="stat-away" 
        />
        <StatCard 
          title="Empates" 
          value={stats.ties} 
          icon={Scale} 
          colorClass="stat-tie" 
        />
      </section>

      <section className="table-section">
        <DataTable 
          data={filteredData} 
          filters={filters} 
          setFilters={setFilters} 
        />
      </section>

      <RaffleModal 
        isOpen={isRaffleOpen} 
        onClose={() => setIsRaffleOpen(false)} 
        winner={raffleWinner} 
      />
    </div>
  );
}

export default App;
