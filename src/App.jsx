// src/App.jsx
import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import HomePage from './pages/HomePage';
import WishlistPage from './pages/WishlistPage';
import './index.css';
import { FaHome, FaHeart, FaBars } from 'react-icons/fa'; // FontAwesome icons

const App = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);

  return (
    <Router>
      <div className="flex">
        {/* Sidebar de navigation avec icons  */}
        <aside
          className={`bg-gray-800 text-white ${
            isCollapsed ? 'w-16' : 'w-64'
          } h-screen p-4 transition-all duration-300 flex flex-col`}
        >
          {/* Bouton pour retracter/étendre la barre */}
          <button
            onClick={() => setIsCollapsed(!isCollapsed)}
            className="text-white focus:outline-none mb-6"
          >
            <FaBars size={24} />
          </button>

          {/* Lien de navigation dans la sidebar*/}
          <ul className="space-y-4">
            <li>
              <Link
                to="/"
                className="flex items-center py-2 px-4 rounded hover:bg-gray-700"
              >
                <FaHome size={20} className="min-w-[20px]" />
                {!isCollapsed && <span className="ml-3">Accueil</span>}
              </Link>
            </li>
            <li>
              <Link
                to="/wishlist"
                className="flex items-center py-2 px-4 rounded hover:bg-gray-700"
              >
                <FaHeart size={20} className="min-w-[20px]" />
                {!isCollapsed && <span className="ml-3">Wishlist</span>}
              </Link>
            </li>
          </ul>
        </aside>

        {/* Contenu principale */}
        <main className="flex-1 p-4">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/wishlist" element={<WishlistPage />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
};

export default App;