import React from 'react';
import './StatCard.css';

const StatCard = ({ title, value, icon: Icon, colorClass }) => {
  return (
    <div className={`stat-card glass ${colorClass}`}>
      <div className="stat-card-icon">
        <Icon size={24} />
      </div>
      <div className="stat-card-content">
        <h3>{title}</h3>
        <p className="stat-card-value">{value}</p>
      </div>
    </div>
  );
};

export default StatCard;
