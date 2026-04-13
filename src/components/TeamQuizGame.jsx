import React, { useState, useEffect } from 'react'
import './TeamQuizGame.css'
import { SAMPLE_QUESTIONS, SPECIAL_QUESTIONS, TEAMS, QUESTION_ICONS } from '../data/gameData'
import TeamScoreboard from './TeamScoreboard'
import QuestionBoard from './QuestionBoard'
import QuestionModal from './QuestionModal'
import LeaderboardScreen from './LeaderboardScreen'

const TeamQuizGame = () => {
  const [gameStarted, setGameStarted] = useState(false)
  const [scores, setScores] = useState(() => {
    const saved = localStorage.getItem('quizGameScores')
    return saved ? JSON.parse(saved) : TEAMS.reduce((acc, team) => ({ ...acc, [team.id]: 0 }), {})
  })
  
  const [openedQuestions, setOpenedQuestions] = useState(() => {
    const saved = localStorage.getItem('quizGameOpenedQuestions')
    return saved ? new Set(JSON.parse(saved)) : new Set()
  })
  
  const [selectedTeam, setSelectedTeam] = useState(1)
  const [currentQuestion, setCurrentQuestion] = useState(null)
  const [showAnswerResult, setShowAnswerResult] = useState(false)
  const [answerResult, setAnswerResult] = useState(null)
  const [questions, setQuestions] = useState([])
  const [isGameEnded, setIsGameEnded] = useState(false)
  const [usedStars, setUsedStars] = useState(() => {
    const saved = localStorage.getItem('quizGameUsedStars')
    return saved ? JSON.parse(saved) : TEAMS.reduce((acc, team) => ({ ...acc, [team.id]: false }), {})
  })

  // Load questions in order on game start
  useEffect(() => {
    if (gameStarted && questions.length === 0) {
      // Create 10 MCQ questions
      const mcqQuestions = SAMPLE_QUESTIONS.slice(0, 10)
      
      // Random 4 positions for special questions from 0-13
      const specialPositions = []
      while (specialPositions.length < 4) {
        const pos = Math.floor(Math.random() * 14)
        if (!specialPositions.includes(pos)) {
          specialPositions.push(pos)
        }
      }
      
      // Create array of 14 questions
      const allQuestions = Array(14).fill(null)
      
      // Place MCQ questions in non-special positions
      let mcqIndex = 0
      for (let i = 0; i < 14; i++) {
        if (!specialPositions.includes(i)) {
          allQuestions[i] = {
            ...mcqQuestions[mcqIndex++],
            id: i + 1  // Assign sequential id based on position
          }
        }
      }
      
      // Place 2 reward questions (random 2 from 4 special positions)
      allQuestions[specialPositions[0]] = {
        id: specialPositions[0] + 1,
        question: "🎁 Thưởng: Cộng 1 điểm!",
        isReward: true,
        points: 1
      }
      allQuestions[specialPositions[1]] = {
        id: specialPositions[1] + 1,
        question: "🎁 Thưởng: Cộng 1 điểm!",
        isReward: true,
        points: 1
      }
      
      // Place 2 penalty questions
      allQuestions[specialPositions[2]] = {
        id: specialPositions[2] + 1,
        question: "⚡ Phạt: Trừ 1 điểm!",
        isPenalty: true,
        points: -1
      }
      allQuestions[specialPositions[3]] = {
        id: specialPositions[3] + 1,
        question: "⚡ Phạt: Trừ 1 điểm!",
        isPenalty: true,
        points: -1
      }
      
      setQuestions(allQuestions)
    }
  }, [gameStarted])

  // Save scores to localStorage
  useEffect(() => {
    localStorage.setItem('quizGameScores', JSON.stringify(scores))
  }, [scores])

  // Save opened questions to localStorage
  useEffect(() => {
    localStorage.setItem('quizGameOpenedQuestions', JSON.stringify(Array.from(openedQuestions)))
  }, [openedQuestions])

  // Save used stars to localStorage
  useEffect(() => {
    localStorage.setItem('quizGameUsedStars', JSON.stringify(usedStars))
  }, [usedStars])

  // Check if game is ended (all 14 questions answered)
  useEffect(() => {
    if (gameStarted && openedQuestions.size === 14) {
      setTimeout(() => {
        setIsGameEnded(true)
      }, 2000)
    }
  }, [openedQuestions, gameStarted])

  const handleStartGame = () => {
    setGameStarted(true)
  }

  const handleResetGame = () => {
    setGameStarted(false)
    setScores(TEAMS.reduce((acc, team) => ({ ...acc, [team.id]: 0 }), {}))
    setOpenedQuestions(new Set())
    setCurrentQuestion(null)
    setSelectedTeam(1)
    setQuestions([])
    setIsGameEnded(false)
    setUsedStars(TEAMS.reduce((acc, team) => ({ ...acc, [team.id]: false }), {}))
  }

  const handlePlayAgain = () => {
    handleResetGame()
    setTimeout(() => setGameStarted(true), 100)
  }

  const handleQuestionClick = (question) => {
    if (!openedQuestions.has(question.id)) {
      // Auto-apply reward/penalty questions immediately
      if (question.isReward || question.isPenalty) {
        setOpenedQuestions(prev => new Set([...prev, question.id]))
        
        let message = ""
        if (question.isReward) {
          message = `🎁 +${question.points} điểm thưởng!`
        } else {
          message = `⚡ ${question.points} điểm phạt!`
        }
        
        setScores(prev => ({
          ...prev,
          [selectedTeam]: prev[selectedTeam] + question.points
        }))
        
        setAnswerResult({ correct: question.isReward, message, points: question.points })
        setShowAnswerResult(true)
        
        setTimeout(() => {
          setShowAnswerResult(false)
        }, 2000)
      } else {
        // Regular questions open modal
        setCurrentQuestion(question)
      }
    }
  }

  const handleAnswerQuestion = (isCorrect, useStar = false) => {
    if (currentQuestion) {
      // Only close question if correct or if it's a special reward/penalty
      if (isCorrect || currentQuestion.isReward || currentQuestion.isPenalty) {
        setOpenedQuestions(prev => new Set([...prev, currentQuestion.id]))
      }
      // If wrong regular question, question stays open for other teams
      
      let pointsToAdd = isCorrect ? 1 : -1
      let message = ""
      
      // Apply star power-up if used
      if (useStar && !usedStars[selectedTeam]) {
        pointsToAdd = isCorrect ? 2 : -1 // Star gives +2 instead of +1
        setUsedStars(prev => ({ ...prev, [selectedTeam]: true }))
      }
      
      // Special reward/penalty questions - auto apply points
      if (currentQuestion.isReward || currentQuestion.isPenalty) {
        pointsToAdd = currentQuestion.points
        if (currentQuestion.isReward) {
          message = `🎁 +${currentQuestion.points} điểm thưởng!`
        } else {
          message = `⚡ ${currentQuestion.points} điểm phạt!`
        }
      } else {
        // Regular questions: correct = +1/-1, or +2/-1 with star
        if (isCorrect) {
          message = useStar && !usedStars[selectedTeam] ? '⭐ +2 điểm (Star)!' : '+1 điểm!'
        } else {
          message = '-1 điểm!'
        }
      }
      
      setScores(prev => ({
        ...prev,
        [selectedTeam]: prev[selectedTeam] + pointsToAdd
      }))
      
      setAnswerResult({ correct: currentQuestion.isReward || isCorrect, message, points: pointsToAdd })
      setShowAnswerResult(true)
      
      setTimeout(() => {
        setShowAnswerResult(false)
        // Only close modal if answer is correct or special question
        if (isCorrect || currentQuestion.isReward || currentQuestion.isPenalty) {
          setCurrentQuestion(null)
        }
        // If wrong regular question, keep modal open for other teams to answer
      }, 2000)
    }
  }

  const handleSelectTeam = (teamId) => {
    setSelectedTeam(teamId)
  }

  if (isGameEnded) {
    return (
      <LeaderboardScreen 
        scores={scores}
        onPlayAgain={handlePlayAgain}
      />
    )
  }

  if (!gameStarted) {
    return (
      <div className="game-container start-view">
        <div className="start-screen">
          <h1>🎮 Team Quiz Game</h1>
          <p>Trò chơi quiz đội nhóm - 7 đội thi đua</p>
          
          <div className="teams-preview">
            <h3>Các đội tham gia:</h3>
            <div className="teams-grid">
              {TEAMS.map(team => (
                <div key={team.id} className="team-badge" style={{ backgroundColor: team.color }}>
                  {team.name}
                </div>
              ))}
            </div>
          </div>

          <div className="rules">
            <h3>Luật chơi:</h3>
            <ul>
              <li>✅ 14 câu hỏi tổng cộng (10 câu hỏi thường + 4 câu special)</li>
              <li>✅ Mỗi đội chọn bất kỳ câu nào (không bắt buộc lần lượt)</li>
              <li>✅ Trả lời đúng: +1 điểm (hoặc +2 nếu dùng ⭐)</li>
              <li>✅ Trả lời sai: -1 điểm, câu hỏi vẫn mở cho đội khác chọn lại</li>
              <li>✅ 4 câu special (2 thưởng +1, 2 phạt -1) tự động áp dụng ngay</li>
              <li>✅ Mỗi đội có 1 sao ⭐ dùng 1 lần: nếu đúng +2 thay vì +1</li>
            </ul>
          </div>

          <button className="btn-start" onClick={handleStartGame}>
            🚀 BẮT ĐẦU CHƠI
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="game-container">
      <header className="game-header">
        <div className="header-content">
          <h1>🎮 Team Quiz Game</h1>
          <div className="game-controls">
            <button className="btn-reset" onClick={handleResetGame}>
              ↺ Reset
            </button>
          </div>
        </div>
      </header>

      <TeamScoreboard 
        scores={scores} 
        selectedTeam={selectedTeam}
        onSelectTeam={handleSelectTeam}
        usedStars={usedStars}
      />

      <QuestionBoard 
        questions={questions.slice(0, 14)}
        openedQuestions={openedQuestions}
        onQuestionClick={handleQuestionClick}
      />

      {showAnswerResult && (
        <div className="notification-overlay">
          <div className={`notification ${answerResult?.correct ? 'success' : 'error'}`}>
            <div className="notification-message">{answerResult?.message}</div>
            {answerResult?.points && (
              <div className={`notification-points ${answerResult.points > 0 ? 'positive' : 'negative'}`}>
                {answerResult.points > 0 ? '+' : ''}{answerResult.points}
              </div>
            )}
          </div>
        </div>
      )}

      <QuestionModal 
        question={currentQuestion}
        selectedTeam={selectedTeam}
        onAnswer={handleAnswerQuestion}
        onClose={() => setCurrentQuestion(null)}
        showResult={showAnswerResult}
        result={answerResult}
        hasUsedStar={usedStars[selectedTeam]}
      />
    </div>
  )
}

export default TeamQuizGame
