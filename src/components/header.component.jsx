import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

function Header() {
  return (
    <nav className="navbar navbar-expand-sm bg-dark">
    <div className="container">
    <a href="#" className="navbar-brand text-muted">TestProject</a>
    <ul className="navbar-nav">
     <li className="nav-item">
      <a className="nav-link" href="#">Главная</a>
     </li>
    <li className="nav-item">
      <a className="nav-link" href="#">Вход</a>
    </li>
    <li className="nav-item">
      <a className="nav-link" href="#">Регистрация</a>
    </li>
   </ul>
    </div>
   </nav>
  );
}

export default Header;
