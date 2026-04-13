import React from 'react'
import './LeaderboardScreen.css'
import { TEAMS } from '../data/gameData'

const LeaderboardScreen = ({ scores, onPlayAgain }) => {
  // Create ranking array
  const ranking = TEAMS.map(team => ({
    ...team,
    score: scores[team.id]
  })).sort((a, b) => b.score - a.score)

  const getMedalEmoji = (position) => {
    switch(position) {
      case 0: return '🥇'
      case 1: return '🥈'
      case 2: return '🥉'
      default: return '   '
    }
  }

  const getPositionLabel = (position) => {
    switch(position) {
      case 0: return 'Người chiến thắng'
      case 1: return 'Á quân'
      case 2: return 'Quán quân thứ 3'
      default: return null
    }
  }

  return (
    <div className="leaderboard-container">
      <div className="leaderboard-screen">
        <div className="leaderboard-header">
          <h1>🏆 BẢNG XẾP HẠNG CUỐI CÙNG 🏆</h1>
          <p>14 câu hỏi đã hoàn thành!</p>
        </div>

        <div className="podium">
          {ranking.slice(0, 3).map((team, index) => (
            <div key={team.id} className={`podium-position position-${index + 1}`}>
              <div className="medal">{getMedalEmoji(index)}</div>
              <div className="position-rank">{getPositionLabel(index)}</div>
              <div className="team-name" style={{ backgroundColor: team.color }}>
                {team.name}
              </div>
              <div className="team-score">{team.score} điểm</div>
            </div>
          ))}
        </div>

        <div className="full-ranking">
          <div className="ranking-header">
            <h3>📋 Bảng xếp hạng đầy đủ</h3>
          </div>
          <div className="ranking-list">
            {ranking.map((team, index) => (
              <div key={team.id} className="ranking-row">
                <div className="ranking-position">#{index + 1}</div>
                <div className="ranking-team" style={{ borderLeftColor: team.color }}>
                  <span className="ranking-name">{team.name}</span>
                </div>
                <div className="ranking-score">{team.score}</div>
              </div>
            ))}
          </div>
        </div>

        <div className="final-stats">
          <div className="stat">
            <span className="stat-label">Điểm cao nhất:</span>
            <span className="stat-value">{Math.max(...ranking.map(t => t.score))} điểm</span>
          </div>
          <div className="stat">
            <span className="stat-label">Điểm thấp nhất:</span>
            <span className="stat-value">{Math.min(...ranking.map(t => t.score))} điểm</span>
          </div>
          <div className="stat">
            <span className="stat-label">Tổng điểm:</span>
            <span className="stat-value">{ranking.reduce((sum, t) => sum + t.score, 0)} điểm</span>
          </div>
        </div>

        <div className="leaderboard-actions">
          <button className="btn-play-again" onClick={onPlayAgain}>
            🎮 CHƠI LẠI
          </button>
        </div>
      </div>
    </div>
  )
}

export default LeaderboardScreen
