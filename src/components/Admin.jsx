import React from 'react'
import { Link } from 'react-router-dom'

const Admin = () => {
	return (
		<section className="container">
			<h2 className="mt-5">Добро пожаловать на домашнюю страницу администратора</h2>
			<hr />
			<nav className="nav flex-column">
				<Link to={"/create-quiz"} className="nav-link">
				Создать новый тест
				</Link>
				<Link to={"/all-quizzes"} className="nav-link">
				Управление существующими викторинами
				</Link>
			</nav>
		</section>
	)
}

export default Admin