import React, { useState } from 'react';
import '../../estilos/login.css';
import Cookies from 'js-cookie';
import { useNavigate } from 'react-router-dom';

const DashboardHeader = () => {
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogout = async (event: React.FormEvent) => {
    event.preventDefault();

    try {
      // Llamada al backend para cerrar la sesión
      const response = await fetch('/api/pacientes/logout', {
        method: 'POST',
        credentials: 'include',
      });

      const data = await response.json();

      // Verificar que la respuesta fue exitosa
      if (!response.ok) {
        setError(data.message || 'Error al cerrar sesión');
        return;
      }

      // Eliminar el token de las cookies en front
      Cookies.remove('token');
      navigate('/');

    } catch (error) {
      console.error('Error al cerrar sesión:', error);
      setError('Error en la conexión. Inténtalo más tarde.');
    }
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <a className="navbar-brand" href="#">Mi Sitio</a>
      <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
        <span className="navbar-toggler-icon"></span>
      </button>
      <div className="collapse navbar-collapse" id="navbarNav">
        <ul className="navbar-nav ms-auto">
          <li className="nav-item">
            <button className="btn btn-outline-primary me-2" onClick={() => navigate('/pacienteDashboard')}>Inicio</button>
          </li>
          <li className="nav-item dropdown">
            <button className="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton" data-bs-toggle="dropdown" aria-expanded="false">
              <i className="bi bi-person"></i>
            </button>
            <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton">
              <li><a className="dropdown-item" onClick={() => navigate('/datosPaciente')}>Mis Datos</a></li>
              <li><hr className="dropdown-divider" /></li>
              <li>
                <a className="dropdown-item cerrar-sesion" onClick={handleLogout}>Cerrar Sesión</a>
              </li>
            </ul>
          </li>
        </ul>
      </div>
      {error && <div className="error-message">{error}</div>}
    </nav>
  );
};

export default DashboardHeader;