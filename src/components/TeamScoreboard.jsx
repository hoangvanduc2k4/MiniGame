import React from 'react'
import './TeamScoreboard.css'
import { TEAMS } from '../data/gameData'

const TeamScoreboard = ({ scores, selectedTeam, onSelectTeam, usedStars = {} }) => {
  return (
    <div className="scoreboard">
      <h2>📊 Bảng Điểm</h2>
      <div className="teams-container">
        {TEAMS.map(team => (
          <div 
            key={team.id}
            className={`team-score-card ${selectedTeam === team.id ? 'active' : ''}`}
            style={{ borderColor: team.color }}
            onClick={() => onSelectTeam(team.id)}
          >
            <div className="team-color-bar" style={{ backgroundColor: team.color }}></div>
            <div className="team-info">
              <h3>{team.name}</h3>
              <div className="score">
                <span className="score-number">{scores[team.id]}</span>
                <span className="score-label">điểm</span>
              </div>
              <div className="star-status">
                {usedStars[team.id] ? (
                  <span className="star-used">⭐ Đã dùng</span>
                ) : (
                  <span className="star-available">⭐ Còn</span>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
      <p className="instruction">👆 Click để chọn đội chơi</p>
    </div>
  )
}

export default TeamScoreboard
