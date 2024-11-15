import React, { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { getSubjects } from "../../../utils/QuizService"

 const QuizStepper = () => {
		const [currentStep, setCurrentStep] = useState(1)
		const [selectedSubject, setSelectedSubject] = useState("")
		const [selectedNumQuestions, setSelectedNumQuestions] = useState("")
		const [subjects, setSubjects] = useState([])
		const navigate = useNavigate()

		useEffect(() => {
			fetchSubjectData()
		}, [])

		const fetchSubjectData = async () => {
			try {
				const subjectsData = await getSubjects()
				setSubjects(subjectsData)
			} catch (error) {
				console.error(error)
			}
		}

		const handleNext = () => {
			if (currentStep === 3) {
				if (selectedSubject && selectedNumQuestions) {
					navigate("/take-quiz", { state: { selectedNumQuestions, selectedSubject } })
				} else {
					alert("Пожалуйста, выберите тему и количество вопросов.")
				}
			} else {
				setCurrentStep((prevStep) => prevStep + 1)
			}
		}

		const handlePrevious = () => {
			setCurrentStep((prevStep) => prevStep - 1)
		}

		const handleSubjectChange = (event) => {
			setSelectedSubject(event.target.value)
		}

		const handleNumQuestionsChange = (event) => {
			setSelectedNumQuestions(event.target.value)
		}

		const renderStepContent = () => {
			switch (currentStep) {
				case 1:
					return (
						<div>
							<h3 className="text-info mb-2">Я хочу пройти викторину:</h3>
							<select
								className="form-select"
								value={selectedSubject}
								onChange={handleSubjectChange}>
								<option value="">Выберите тему</option>
								{subjects.map((subject) => (
									<option key={subject} value={subject}>
										{subject}
									</option>
								))}
							</select>
						</div>
					)
				case 2:
					return (
						<div>
							<h4 className="text-info mb-2"> На сколько вопросов вы хотели бы ответить?</h4>
							<input
								type="number"
								className="form-control"
								value={selectedNumQuestions}
								onChange={handleNumQuestionsChange}
								placeholder="Введите количество вопросов"
							/>
						</div>
					)
				case 3:
					return (
						<div>
							<h2>Ваш выбор:</h2>
							<p>Предмет: {selectedSubject}</p>
							<p>Количество вопросов: {selectedNumQuestions}</p>
						</div>
					)
				default:
					return null
			}
		}

		const renderProgressBar = () => {
			const progress = currentStep === 3 ? 100 : ((currentStep - 1) / 2) * 100
			return (
				<div className="progress">
					<div
						className="progress-bar"
						role="progressbar"
						style={{ width: `${progress}%` }}
						aria-valuenow={progress}>
						Шаг {currentStep}
					</div>
				</div>
			)
		}

		return (
			<section className="mt-5">
				<h3 style={{ color: "GrayText" }} className="mb-4">
				Добро пожаловать на онлайн-викторину!
				</h3>
				{renderProgressBar()}
				<div className="card">
					<div className="card-body">
						{renderStepContent()}
						<div className="d-flex justify-content-between mt-4">
							{currentStep > 1 && (
								<button className="btn btn-primary" onClick={handlePrevious}>
									Предыдущий
								</button>
							)}
							{currentStep < 3 && (
								<button
									className="btn btn-primary"
									onClick={handleNext}
									disabled={
										(currentStep === 1 && !selectedSubject) ||
										(currentStep === 2 && !selectedNumQuestions)
									}>
									Следующий
								</button>
							)}
							{currentStep === 3 && (
								<button className="btn btn-success" onClick={handleNext}>
									Начать викторину
								</button>
							)}
						</div>
					</div>
				</div>
			</section>
		)
 }

 export default QuizStepper