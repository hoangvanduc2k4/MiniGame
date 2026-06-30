import React, { useState, useEffect } from 'react'
import './CardFlipGame.css'
import { SAMPLE_QUESTIONS, QUESTION_ICONS } from '../data/gameData'

const CardFlipGame = () => {
  const [gameStarted, setGameStarted] = useState(() => {
    return localStorage.getItem('hcm_quiz_gameStarted') === 'true'
  })
  const [questions, setQuestions] = useState([])
  const [answeredCards, setAnsweredCards] = useState(() => {
    const saved = localStorage.getItem('hcm_quiz_answeredCards')
    return saved ? JSON.parse(saved) : {}
  })
  const [gameEnded, setGameEnded] = useState(() => {
    return localStorage.getItem('hcm_quiz_gameEnded') === 'true'
  })
  const [score, setScore] = useState(() => {
    const saved = localStorage.getItem('hcm_quiz_score')
    return saved ? parseInt(saved, 10) : 0
  })
  
  // Modal states
  const [activeQuestionIdx, setActiveQuestionIdx] = useState(null)
  const [wrongOptions, setWrongOptions] = useState([])
  const [showErrorPopup, setShowErrorPopup] = useState(false)

  // Initialize questions
  useEffect(() => {
    if (gameStarted && questions.length === 0) {
      const initialQuestions = SAMPLE_QUESTIONS.map((q, idx) => ({
        ...q,
        id: idx,
        icon: q.icon || QUESTION_ICONS[idx % QUESTION_ICONS.length]
      }))
      setQuestions(initialQuestions)
    }
  }, [gameStarted])

  // Save state to localStorage
  useEffect(() => {
    localStorage.setItem('hcm_quiz_gameStarted', gameStarted)
    localStorage.setItem('hcm_quiz_answeredCards', JSON.stringify(answeredCards))
    localStorage.setItem('hcm_quiz_score', score)
    localStorage.setItem('hcm_quiz_gameEnded', gameEnded)
  }, [gameStarted, answeredCards, score, gameEnded])

  // Check if all cards are answered
  useEffect(() => {
    if (gameStarted && questions.length > 0) {
      if (Object.keys(answeredCards).length === questions.length) {
        setTimeout(() => {
          setGameEnded(true)
        }, 1500)
      }
    }
  }, [answeredCards, gameStarted, questions.length])

  const handleStartGame = () => {
    setGameStarted(true)
  }

  const handleResetGame = (silent = false) => {
    if (!silent && !gameEnded) {
      if (!window.confirm("Đồng chí có chắc chắn muốn làm mới nhiệm vụ? Toàn bộ tiến trình sẽ bị xóa.")) {
        return
      }
    }

    setGameStarted(false)
    setQuestions([])
    setAnsweredCards({})
    setGameEnded(false)
    setScore(0)
    setActiveQuestionIdx(null)
    // Clear localStorage
    localStorage.removeItem('hcm_quiz_gameStarted')
    localStorage.removeItem('hcm_quiz_answeredCards')
    localStorage.removeItem('hcm_quiz_score')
    localStorage.removeItem('hcm_quiz_gameEnded')
  }

  const handleCardClick = (idx) => {
    if (!answeredCards[idx]) {
      setActiveQuestionIdx(idx)
      setWrongOptions([])
      setShowErrorPopup(false)
    }
  }

  const handleSelectAnswer = (option) => {
    const currentQuestion = questions[activeQuestionIdx]
    const isCorrect = option === currentQuestion.correctAnswer
    
    if (isCorrect) {
      // First attempt correct? Bonus? Or just mark as correct.
      // The user says "chọn đến đáp án đúng thì thôi", so we mark it answered when correct.
      setAnsweredCards(prev => ({
        ...prev,
        [activeQuestionIdx]: {
          selected: option,
          isCorrect: true
        }
      }))
      
      // Only increment score if they haven't made a mistake? 
      // User didn't specify scoring logic, but usually, first try is better.
      // Let's just increment score for simplicity.
      setScore(prev => prev + 1)
      
      // The modal will now stay open so the user can read the explanation.
      // They must click "TIẾP TỤC NHIỆM VỤ" to close it.
    } else {
      // Wrong answer
      setShowErrorPopup(true)
      setWrongOptions(prev => [...prev, option])
    }
  }

  // Start screen
  if (!gameStarted) {
    return (
      <div className="socialist-game-container start-screen">
        <div className="premium-overlay"></div>
        <div className="start-content">
          <div className="emblem-container">
            <div className="star-emblem">⭐</div>
          </div>
          <h1 className="main-title">Lịch Sử Đảng Cộng Sản Việt Nam</h1>
          <h2 className="sub-title">Đường Lối Cách Mạng Giai Đoạn 1954 - 1975</h2>
          
          <div className="info-box">
            <p>Chào mừng đồng chí đến với thử thách kiến thức cách mạng.</p>
            <div className="rules-list">
              <div className="rule-item"><span>🚩</span> {questions.length > 0 ? questions.length : 10} Thử thách tư duy</div>
              <div className="rule-item"><span>🚩</span> Nhấn vào thẻ để mở câu hỏi</div>
              <div className="rule-item"><span>🚩</span> Kiên trì đến khi tìm ra chân lý</div>
              <div className="rule-item"><span>🚩</span> Hoàn thành để nhận vinh quang</div>
            </div>
          </div>

          <button className="btn-socialist-start" onClick={handleStartGame}>
            BẮT ĐẦU NHIỆM VỤ
          </button>
        </div>
      </div>
    )
  }

  // Game ended screen
  if (gameEnded) {
    return (
      <div className="socialist-game-container end-screen">
        <div className="premium-overlay"></div>
        <div className="end-content">
          <h1 className="victory-title">NHIỆM VỤ HOÀN THÀNH!</h1>
          <div className="medal-case">
             <div className="medal">🏅</div>
          </div>
          <div className="result-stats">
            <p className="stat-label">Kết quả học tập</p>
            <p className="stat-value">{score}/{questions.length}</p>
          </div>

          <div className="rank-message">
            {score === questions.length ? "⭐ Đồng chí là một chuyên gia lý luận xuất sắc!" : 
             score >= 7 ? "👍 Kiến thức của đồng chí rất vững vàng." : 
             "📚 Cần tăng cường học tập và rèn luyện thêm."}
          </div>

          <button className="btn-socialist-restart" onClick={() => handleResetGame(true)}>
            THỰC HIỆN LẠI ↺
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="socialist-game-container game-screen">
      <div className="premium-overlay"></div>
      
      <header className="game-header">
        <div className="header-left">
          <span className="party-star">⭐</span>
          <div>
            <h1>Hệ Thống Trắc Nghiệm Lý Luận</h1>
            <p>Đường lối cách mạng giai đoạn 1954 - 1975</p>
          </div>
        </div>
        <div className="header-right">
          <div className="score-badge">
            <span className="score-num">{Object.keys(answeredCards).length}</span>
            <span className="score-total">/ {questions.length}</span>
          </div>
          <button 
            className="btn-reset-game" 
            onClick={() => handleResetGame(false)} 
            title="Làm mới nhiệm vụ"
          >
            ↺
          </button>
        </div>
      </header>

      <div className="questions-grid">
        {questions.map((q, idx) => {
          const isAnswered = answeredCards[idx]
          return (
            <div
              key={idx}
              className={`question-card ${isAnswered ? 'answered' : ''}`}
              onClick={() => handleCardClick(idx)}
            >
              <div className="card-inner">
                <div className="card-top">
                   <span className="card-no">#{idx + 1}</span>
                   <span className="card-status">{isAnswered ? '✅' : '❓'}</span>
                </div>
                <div className="card-icon-main">{q.icon}</div>
                <p className="card-hint">{isAnswered ? 'Đã hoàn thành' : 'Nhấn để mở'}</p>
              </div>
            </div>
          )
        })}
      </div>

      {/* MCQ Modal */}
      {activeQuestionIdx !== null && (
        <div className="socialist-modal-backdrop" onClick={() => setActiveQuestionIdx(null)}>
          <div className="socialist-modal-content" onClick={e => e.stopPropagation()}>
            <div className="modal-header">
              <div className="modal-title-row">
                 <span className="modal-star">⭐</span>
                 <h3>CÂU HỎI SỐ {activeQuestionIdx + 1}</h3>
              </div>
              <button className="modal-close" onClick={() => setActiveQuestionIdx(null)}>×</button>
            </div>
            
            <div className="modal-body">
              <p className="question-text-large">{questions[activeQuestionIdx].question}</p>
              
              <div className="options-grid">
                {questions[activeQuestionIdx].options.map((option, oIdx) => {
                  const isDisabled = wrongOptions.includes(option)
                  const isCorrectAnswer = option === questions[activeQuestionIdx].correctAnswer
                  const isAnsweredCorrectly = answeredCards[activeQuestionIdx]?.isCorrect
                  
                  return (
                    <button
                      key={oIdx}
                      className={`socialist-option-btn ${isDisabled ? 'disabled' : ''} ${isAnsweredCorrectly && isCorrectAnswer ? 'correct-glow' : ''}`}
                      disabled={isDisabled || isAnsweredCorrectly}
                      onClick={() => handleSelectAnswer(option)}
                    >
                      <span className="option-index">{String.fromCharCode(65 + oIdx)}</span>
                      <span className="option-val">{option}</span>
                    </button>
                  )
                })}
              </div>

              {/* Show explanation when answered correctly */}
              {answeredCards[activeQuestionIdx]?.isCorrect && (
                <div className="explanation-box">
                  <div className="explanation-header">
                     <span className="mc-icon">🎙️</span>
                     <h4>GIẢI THÍCH TỪ MC:</h4>
                  </div>
                  <p className="explanation-content">{questions[activeQuestionIdx].explanation}</p>
                </div>
              )}
            </div>
            
            <div className="modal-footer">
               {!answeredCards[activeQuestionIdx]?.isCorrect ? (
                 <p className="modal-footer-hint">Hãy chọn đáp án mà đồng chí cho là đúng nhất.</p>
               ) : (
                 <button className="btn-modal-next" onClick={() => setActiveQuestionIdx(null)}>
                   TIẾP TỤC NHIỆM VỤ ➔
                 </button>
               )}
            </div>
          </div>
        </div>
      )}

      {/* Error Popup */}
      {showErrorPopup && (
        <div className="error-popup-backdrop" onClick={() => setShowErrorPopup(false)}>
          <div className="error-popup-content" onClick={e => e.stopPropagation()}>
            <span className="error-popup-icon">❌</span>
            <h3>CHƯA CHÍNH XÁC!</h3>
            <p>Đồng chí hãy suy nghĩ thêm để tìm ra câu trả lời đúng.</p>
            <button className="btn-error-close" onClick={() => setShowErrorPopup(false)}>
              THỬ LẠI
            </button>
          </div>
        </div>
      )}
    </div>
  )
}

export default CardFlipGame
