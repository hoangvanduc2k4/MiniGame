import React from 'react'
import './QuestionBoard.css'
import { QUESTION_ICONS } from '../data/gameData'

const QuestionBoard = ({ questions, openedQuestions, onQuestionClick, totalQuestions = 0 }) => {
  // Convert to Set if it's an array (from localStorage)
  const openedSet = openedQuestions instanceof Set ? openedQuestions : new Set(openedQuestions)
  
  // Filter out null/undefined questions
  const validQuestions = questions.filter(q => q !== null && q !== undefined)
  
  return (
    <div className="question-board">
      <h2>❓ Bộ câu hỏi ({14 - openedSet.size} còn lại / 14 tổng cộng)</h2>
      <div className="progress-bar">
        <div className="progress-fill" style={{ width: `${(openedSet.size / 14) * 100}%` }}></div>
      </div>
      <div className="questions-grid">
        {validQuestions.map((question) => {
          if (!question) return null
          
          const isOpened = openedSet.has(question.id)
          const icon = QUESTION_ICONS[(question.id - 1) % QUESTION_ICONS.length]
          
          return (
            <button
              key={question.id}
              className={`question-card ${isOpened ? 'opened' : 'closed'}`}
              onClick={() => onQuestionClick(question)}
              disabled={isOpened}
              title={isOpened ? 'Đã mở' : `Câu hỏi ${question.id}`}
            >
              <div className="question-icon">{icon}</div>
              <div className="question-number">#{question.id}</div>
              {isOpened && <div className="opened-overlay">✓</div>}
            </button>
          )
        })}
      </div>
    </div>
  )
}

export default QuestionBoard
