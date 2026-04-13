import React from 'react'
import './QuestionModal.css'
import { TEAMS } from '../data/gameData'

const QuestionModal = ({ question, selectedTeam, onAnswer, onClose, showResult, result, hasUsedStar = false }) => {
  if (!question) return null

  const currentTeam = TEAMS.find(t => t.id === selectedTeam)
  const isSpecial = question.isReward || question.isPenalty

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={e => e.stopPropagation()}>
        {!showResult ? (
          <>
            <div className="modal-header" style={{ backgroundColor: currentTeam?.color }}>
              <h2>📝 {currentTeam?.name}</h2>
              <button className="close-btn" onClick={onClose}>✕</button>
            </div>

            <div className="modal-body">
              <div className="question-text">
                <p>{question.question}</p>
              </div>

              {/* Regular questions with options */}
              {question.options && !isSpecial && (
                <div>
                  <div className="options">
                    {question.options.map((option, idx) => (
                      <button
                        key={idx}
                        className="option-btn"
                        onClick={() => {
                          const isCorrect = option === question.correctAnswer
                          onAnswer(isCorrect, false)
                        }}
                      >
                        {option}
                      </button>
                    ))}
                  </div>
                  
                  {/* Star power-up button */}
                  {!hasUsedStar && (
                    <div className="star-power-section">
                      <p className="star-hint">⭐ Dùng sao hi vọng để +2 điểm?</p>
                      <div className="star-options">
                        {question.options.map((option, idx) => (
                          <button
                            key={`star-${idx}`}
                            className="option-btn star-option"
                            onClick={() => {
                              const isCorrect = option === question.correctAnswer
                              onAnswer(isCorrect, true)
                            }}
                          >
                            ⭐ {option}
                          </button>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
          </>
        ) : (
          <div className="result-container">
            <div className={`result-message ${result?.correct ? 'success' : 'error'}`}>
              {result?.correct ? '✓' : '✕'}
            </div>
            <p className="result-text">{result?.message}</p>
            {result?.points && (
              <div className={`score-display ${result.points > 0 ? 'positive' : 'negative'}`}>
                {result.points > 0 ? '+' : ''}{result.points}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  )
}

export default QuestionModal
