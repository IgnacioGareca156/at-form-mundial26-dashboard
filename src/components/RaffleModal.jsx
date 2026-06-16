import React, { useEffect, useState } from 'react';
import { Trophy, X } from 'lucide-react';
import './RaffleModal.css';

const RaffleModal = ({ isOpen, onClose, winner }) => {
  const [isRevealing, setIsRevealing] = useState(true);

  useEffect(() => {
    if (isOpen) {
      setIsRevealing(true);
      // Simulate a suspenseful drumroll/reveal effect
      const timer = setTimeout(() => {
        setIsRevealing(false);
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content glass">
        <button className="modal-close" onClick={onClose}>
          <X size={24} />
        </button>
        
        <div className="modal-header">
          <div className="trophy-container">
            <Trophy size={48} className={`trophy-icon ${!isRevealing ? 'pop-animation' : 'spin-animation'}`} />
          </div>
          <h2>Sorteo Mundial 26</h2>
        </div>

        <div className="modal-body">
          {isRevealing ? (
            <div className="revealing-state">
              <p>Buscando ganador al azar...</p>
              <div className="loader"></div>
            </div>
          ) : (
            <div className="winner-state pop-animation">
              <p className="winner-subtitle">¡Felicidades!</p>
              <h3 className="winner-name">{winner?.nombre}</h3>
              <p className="winner-mail">{winner?.mail}</p>
              <div className="winner-details">
                <span className="badge">{winner?.localidad}</span>
                <span className="badge">{winner?.edad}</span>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default RaffleModal;
