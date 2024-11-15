import React from "react";
import { NavLink } from "react-router-dom";
import 'bootstrap-icons/font/bootstrap-icons.css'; // Bootstrap Icons
import './Navbar.css'; 

const Navbar = () => {
	return (
		<nav className="navbar navbar-expand-lg navbar-light bg-light shadow sticky-top custom-navbar">
			<div className="container-fluid">
				<NavLink className="navbar-brand" to={"/"}>
					Приложение онлайн-викторины
				</NavLink>
				<button
					className="navbar-toggler"
					type="button"
					data-bs-toggle="collapse"
					data-bs-target="#navbarNav"
					aria-controls="navbarNav"
					aria-expanded="false"
					aria-label="Toggle navigation"
				>
					<span className="navbar-toggler-icon"></span>
				</button>
				<div className="collapse navbar-collapse" id="navbarNav">
					<ul className="navbar-nav ms-auto">
						<li className="nav-item">
							<NavLink className="nav-link" to={"/admin"}>
								<i className="bi bi-person-lock me-1"></i>
								Админ панель
							</NavLink>
						</li>
						<li className="nav-item">
							<NavLink className="nav-link" to={"/quiz-stepper"}>
								<i className="bi bi-question-circle me-1"></i>
								Пройти тест
							</NavLink>
						</li>
					</ul>
				</div>
			</div>
		</nav>
	);
}

export default Navbar;
