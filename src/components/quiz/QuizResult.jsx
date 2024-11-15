import React from "react"
import { useLocation} from "react-router-dom"

 const QuizResult = () => {
		const location = useLocation()
		const { quizQuestions, totalScores } = location.state
		const numQuestions = quizQuestions.length
		const percentage = Math.round((totalScores / numQuestions) * 100)

		const handleRetakeQuiz = () => {
			alert("Упс! данный функционал не реализован!!!")
		}

		return (
			<section className="container mt-5">
				<h3>Сводка результатов вашего теста</h3>
				<hr />
				<h5 className="text-info">
				Ты ответил на  {totalScores} из {numQuestions} вопросов правильно.
				</h5>
				<p>Ваш общий балл {percentage}%.</p>

				<button className="btn btn-primary btn-sm" onClick={handleRetakeQuiz}>
				Повторно пройти этот тест
				</button>
			</section>
		)
 }

 export default QuizResult