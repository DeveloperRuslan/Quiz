import React, { useEffect, useState } from "react"
import "./AddQuestion.css";
import { Link } from "react-router-dom"
import { createQuestion, getSubjects } from "../../../utils/QuizService"

const AddQuestion = () => {
	const [question, setQuestionText] = useState("")
	const [questionType, setQuestionType] = useState("single")
	const [choices, setChoices] = useState([""])
	const [correctAnswers, setCorrectAnswers] = useState([""])
	const [subject, setSubject] = useState("")
	const [newSubject, setNewSubject] = useState("")
	const [subjectOptions, setSubjectOptions] = useState([""])

	useEffect(() => {
		fetchSubjects()
	}, [])

	const fetchSubjects = async () => {
		try {
			const subjectsData = await getSubjects()
			setSubjectOptions(subjectsData)
		} catch (error) {
			console.error(error)
		}
	}

	const handleAddChoice = () => {
		const lastChoice = choices[choices.length - 1]
		const lastChoiceLetter = lastChoice ? lastChoice.charAt(0) : "A"
		const newChoiceLetter = String.fromCharCode(lastChoiceLetter.charCodeAt(0) + 1)
		const newChoice = `${newChoiceLetter}.`
		setChoices([...choices, newChoice])
	}

	const handleRemoveChoice = (index) => {
		setChoices(choices.filter((choice, i) => i !== index))
	}

	const handleChoiceChange = (index, value) => {
		setChoices(choices.map((choice, i) => (i === index ? value : choice)))
	}

	const handleCorrectAnswerChange = (index, value) => {
		setCorrectAnswers(correctAnswers.map((answer, i) => (i === index ? value : answer)))
	}

	const handleAddCorrectAnswer = () => {
		setCorrectAnswers([...correctAnswers, ""])
	}

	const handleRemoveCorrectAnswer = (index) => {
		setCorrectAnswers(correctAnswers.filter((answer, i) => i !== index))
	}

	const handleSubmit = async (e) => {
		e.preventDefault()
		try {
			const result = {
				question,
				questionType,
				choices,
				correctAnswers: correctAnswers.map((answer) => {
					const choiceLetter = answer.charAt(0).toUpperCase()
					const choiceIndex = choiceLetter.charCodeAt(0) - 65
					return choiceIndex >= 0 && choiceIndex < choices.length ? choiceLetter : null
				}),

				subject
			}

			await createQuestion(result)

			setQuestionText("")
			setQuestionType("single")
			setChoices([""])
			setCorrectAnswers([""])
			setSubject("")
		} catch (error) {
			console.error(error)
		}
	}

	const handleAddSubject = () => {
		if (newSubject.trim() !== "") {
			setSubject(newSubject.trim())
			setSubjectOptions([...subjectOptions, newSubject.trim()])
			setNewSubject("")
		}
	}

	return (
		<div className="container mt-4">
  ...
  <div className="col-md-8 mx-auto mt-5">
    <div className="card border-0 shadow-sm">
      <div className="card-header text-center">
        <h5 className="card-title">Добавить новые вопросы</h5>
      </div>
      <div className="card-body">
        <form onSubmit={handleSubmit} className="p-3">
          {/* Выбор темы */}
          <div className="mb-3">
            <label htmlFor="subject" className="form-label text-info">
              Выберите тему
            </label>
            <select
              id="subject"
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              className="form-select">
              <option value="">Выберите тему</option>
              <option value={"New"}>Добавить новую</option>
              {subjectOptions.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
          </div>

          {/* Новый ввод темы */}
          {subject === "New" && (
            <div className="mb-3">
              <label htmlFor="new-subject" className="form-label text-info">Добавить новую тему</label>
              <input
                type="text"
                id="new-subject"
                value={newSubject}
                onChange={(event) => setNewSubject(event.target.value)}
                className="form-control"
              />
              <button
                type="button"
                onClick={handleAddSubject}
                className="btn btn-outline-primary mt-2">Добавить тему</button>
            </div>
          )}
          
          {/* Поле для вопроса */}
          <div className="mb-3">
            <label htmlFor="question-text" className="form-label text-info">Вопрос</label>
            <textarea
              className="form-control"
              rows={4}
              value={question}
              onChange={(e) => setQuestionText(e.target.value)}></textarea>
          </div>

          {/* Выбор типа вопроса */}
          <div className="mb-3">
            <label htmlFor="question-type" className="form-label text-info">Тип вопроса</label>
            <select
              id="question-type"
              value={questionType}
              onChange={(event) => setQuestionType(event.target.value)}
              className="form-select">
              <option value="single">Одиночный ответ</option>
              <option value="multiple">Множественный ответ</option>
            </select>
          </div>

          {/* Варианты ответов */}
          <div className="mb-3">
            <label htmlFor="choices" className="form-label text-primary">Выбор</label>
            {choices.map((choice, index) => (
              <div key={index} className="input-group mb-3">
                <input
                  type="text"
                  value={choice}
                  onChange={(e) => handleChoiceChange(index, e.target.value)}
                  className="form-control"
                />
                <button
                  type="button"
                  onClick={() => handleRemoveChoice(index)}
                  className="btn btn-outline-danger">Удалить</button>
              </div>
            ))}
            <button
              type="button"
              onClick={handleAddChoice}
              className="btn btn-outline-primary">Добавить выбор</button>
          </div>

          {/* Правильные ответы */}
          {questionType === "single" && (
            <div className="mb-3">
              <label htmlFor="answer" className="form-label text-success">Правильный ответ</label>
              <input
                type="text"
                className="form-control"
                id="answer"
                value={correctAnswers[0]}
                onChange={(e) => handleCorrectAnswerChange(0, e.target.value)}
              />
            </div>
          )}
          {questionType === "multiple" && (
            <div className="mb-3">
              <label htmlFor="answer" className="form-label text-success">Правильный ответ(s)</label>
              {correctAnswers.map((answer, index) => (
                <div key={index} className="d-flex mb-2">
                  <input
                    type="text"
                    className="form-control me-2"
                    value={answer}
                    onChange={(e) => handleCorrectAnswerChange(index, e.target.value)}
                  />
                  {index > 0 && (
                    <button
                      type="button"
                      className="btn btn-danger"
                      onClick={() => handleRemoveCorrectAnswer(index)}>Удалить</button>
                  )}
                </div>
              ))}
              <button
                type="button"
                className="btn btn-outline-info"
                onClick={handleAddCorrectAnswer}>Добавить правильный ответ</button>
            </div>
          )}

          {/* Группа кнопок для отправки */}
          <div className="btn-group mt-3">
            <button type="submit" className="btn btn-outline-success">Сохранить вопрос</button>
            <Link to={"/all-quizzes"} className="btn btn-outline-primary">Вернуться к существующим вопросам</Link>
          </div>
        </form>
      </div>
    </div>
  </div>
</div>

	)
}

export default AddQuestion