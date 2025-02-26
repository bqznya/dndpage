import React from "react";
import "./Header.css";
import { Link } from "react-router-dom";

const Header: React.FC = () => {
    return (
        <header className="header">
		<nav className="wtf">
		    <Link to="/map" className="head-link">Карта</Link>
		    <Link to="/" className="head-link">Список персонажей</Link>
		    <Link to="/create" className="head-link">Создать персонажа</Link>
		</nav>
        </header>
		
    );
};

export default Header;
