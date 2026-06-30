import React, { useState, useEffect } from 'react'
import './SimpleQuizGame.css'
import { SAMPLE_QUESTIONS } from '../data/gameData'

const SimpleQuizGame = () => {
  const [gameStarted, setGameStarted] = useState(false)
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
  const [selectedAnswer, setSelectedAnswer] = useState(null)
  const [answered, setAnswered] = useState(false)
  const [answeredQuestions, setAnsweredQuestions] = useState([])
  const [gameEnded, setGameEnded] = useState(false)
  const [questions, setQuestions] = useState([])

  // Initialize 10 questions on game start
  useEffect(() => {
    if (gameStarted && questions.length === 0) {
      setQuestions(SAMPLE_QUESTIONS.slice(0, 10))
    }
  }, [gameStarted])

  const handleStartGame = () => {
    setGameStarted(true)
  }

  const handleResetGame = () => {
    setGameStarted(false)
    setCurrentQuestionIndex(0)
    setSelectedAnswer(null)
    setAnswered(false)
    setAnsweredQuestions([])
    setGameEnded(false)
    setQuestions([])
  }

  const handleAnswerSelect = (answer) => {
    if (!answered) {
      setSelectedAnswer(answer)
      setAnswered(true)
      const currentQuestion = questions[currentQuestionIndex]
      const isCorrect = answer === currentQuestion.correctAnswer
      setAnsweredQuestions([...answeredQuestions, { 
        question: currentQuestion.question, 
        selected: answer, 
        correct: currentQuestion.correctAnswer,
        isCorrect 
      }])
    }
  }

  const handleNextQuestion = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1)
      setSelectedAnswer(null)
      setAnswered(false)
    } else {
      setGameEnded(true)
    }
  }

  // Start screen
  if (!gameStarted) {
    return (
      <div className="simple-quiz-container start-screen">
        <div className="start-content">
          <h1>🎯 Quiz 10 Câu Hỏi</h1>
          <p className="subtitle">Trả lời 10 câu hỏi về Lịch Sử Đảng Cộng Sản Việt Nam</p>
          
          <div className="rules">
            <h3>Cách chơi:</h3>
            <ul>
              <li>✅ 10 câu hỏi trắc nghiệm</li>
              <li>✅ Chọn đáp án và nhấn tiếp tục</li>
              <li>✅ Xem kết quả sau khi kết thúc</li>
            </ul>
          </div>

          <button className="btn-start" onClick={handleStartGame}>
            🚀 BẮT ĐẦU
          </button>
        </div>
      </div>
    )
  }

  // Game ended screen
  if (gameEnded) {
    const correctCount = answeredQuestions.filter(q => q.isCorrect).length
    return (
      <div className="simple-quiz-container end-screen">
        <div className="end-content">
          <h1>🎉 Kết Thúc!</h1>
          <div className="score-display">
            <p className="score-text">Bạn trả lời đúng</p>
            <p className="score-number">{correctCount}/10</p>
          </div>

          <div className="results">
            <h3>Kết quả chi tiết:</h3>
            <div className="results-list">
              {answeredQuestions.map((item, index) => (
                <div key={index} className={`result-item ${item.isCorrect ? 'correct' : 'incorrect'}`}>
                  <div className="result-status">
                    {item.isCorrect ? '✅' : '❌'}
                  </div>
                  <div className="result-details">
                    <p className="result-question">Câu {index + 1}: {item.question}</p>
                    <p className="result-answer">Bạn chọn: <strong>{item.selected}</strong></p>
                    {!item.isCorrect && <p className="correct-answer">Đáp án đúng: <strong>{item.correct}</strong></p>}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <button className="btn-restart" onClick={handleResetGame}>
            ↺ Chơi Lại
          </button>
        </div>
      </div>
    )
  }

  // Quiz game screen
  const currentQuestion = questions[currentQuestionIndex]
  if (!currentQuestion) return null

  return (
    <div className="simple-quiz-container quiz-screen">
      <div className="quiz-content">
        <div className="quiz-header">
          <div className="progress">
            <span className="progress-text">Câu {currentQuestionIndex + 1}/10</span>
            <div className="progress-bar">
              <div className="progress-fill" style={{ width: `${((currentQuestionIndex + 1) / 10) * 100}%` }}></div>
            </div>
          </div>
        </div>

        <div className="question-container">
          <h2 className="question-text">{currentQuestion.question}</h2>

          <div className="answers-container">
            {currentQuestion.options.map((option, index) => (
              <button
                key={index}
                className={`answer-btn ${
                  selectedAnswer === option ? 'selected' : ''
                } ${
                  answered && option === currentQuestion.correctAnswer ? 'correct' : ''
                } ${
                  answered && selectedAnswer === option && option !== currentQuestion.correctAnswer ? 'incorrect' : ''
                }`}
                onClick={() => handleAnswerSelect(option)}
                disabled={answered}
              >
                <span className="answer-letter">{String.fromCharCode(65 + index)}</span>
                <span className="answer-text">{option}</span>
              </button>
            ))}
          </div>

          {answered && (
            <div className="answer-feedback">
              {selectedAnswer === currentQuestion.correctAnswer ? (
                <p className="feedback-correct">✅ Chính xác!</p>
              ) : (
                <p className="feedback-incorrect">❌ Sai rồi!</p>
              )}
            </div>
          )}
        </div>

        {answered && (
          <button className="btn-next" onClick={handleNextQuestion}>
            {currentQuestionIndex === 9 ? '🏁 Kết Thúc' : 'Câu Tiếp Theo →'}
          </button>
        )}
      </div>
    </div>
  )
}

export default SimpleQuizGame
