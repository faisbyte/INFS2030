import React, { useState } from 'react'
import { mockFeed } from '../data/mockData'
import s from './Feed.module.css'

function Card({ card, onAudio }) {
  const [expanded, setExpanded] = useState(false)
  const [liked, setLiked] = useState(card.liked)
  const [saved, setSaved] = useState(card.bookmarked)

  return (
    <div className={s.card} style={{ background: card.bg }}>
      <div className={s.overlay} />

      <div className={s.topBar}>
        <div className={s.pill} style={{ color: card.subjectColor }}>
          <span className={s.pillDot} style={{ background: card.subjectColor }} />
          {card.subject}
        </div>
        <div className={s.pill} style={{ color: '#9090B0' }}>
          {card.interestEmoji} {card.interest}
        </div>
      </div>

      <div className={s.body}>
        <div className={s.badgeRow}>
          <span className={s.diffBadge} style={{ color: card.accentColor, background: card.accentColor + '22', border: `1px solid ${card.accentColor}55` }}>
            {card.difficulty}
          </span>
          <span className={s.dur}>⏱ {card.duration}</span>
          <span className={s.xpBadge}>⚡ {card.xp} XP</span>
        </div>

        <div className={s.concept} style={{ color: card.accentColor }}>{card.concept.toUpperCase()}</div>
        <h2 className={s.title}>{card.title}</h2>
        <p className={s.hook}>{card.hook}</p>

        {expanded && (
          <div className={s.expanded}>
            {card.body.split('\n').map((line, i) => line.trim() ? <p key={i} className={s.bodyLine}>{line}</p> : null)}
            <div className={s.takeaway} style={{ borderLeftColor: card.accentColor }}>
              <div className={s.takeawayLabel}>KEY TAKEAWAY</div>
              <div className={s.takeawayText}>{card.takeaway}</div>
            </div>
          </div>
        )}

        <button className={s.deeperBtn} style={{ color: card.accentColor, border: `1px solid ${card.accentColor}44`, background: card.accentColor + '15' }}
          onClick={() => setExpanded(!expanded)}>
          {expanded ? '↑ Show less' : '💡 Deeper explanation'}
        </button>

        <div className={s.hint}>↑ swipe for next lesson</div>
      </div>

      <div className={s.side}>
        <button className={`${s.sideBtn} ${liked ? s.liked : ''}`} onClick={() => setLiked(!liked)}>
          <span style={{ fontSize: 26 }}>{liked ? '❤️' : '🤍'}</span>
          <span>Like</span>
        </button>
        <button className={`${s.sideBtn} ${saved ? s.saved : ''}`} onClick={() => setSaved(!saved)}>
          <span style={{ fontSize: 24 }}>{saved ? '🔖' : '📌'}</span>
          <span>Save</span>
        </button>
        <button className={s.sideBtn} onClick={onAudio}>
          <span className={s.audioBtn}>🎧</span>
          <span>Audio</span>
        </button>
      </div>
    </div>
  )
}

export default function Feed({ onAudio }) {
  const [idx, setIdx] = useState(0)

  const handleScroll = (e) => {
    const el = e.currentTarget
    const newIdx = Math.round(el.scrollTop / el.clientHeight)
    setIdx(newIdx)
  }

  return (
    <div className={s.feed} onScroll={handleScroll}>
      {mockFeed.map((card) => (
        <Card key={card.id} card={card} onAudio={onAudio} />
      ))}
      <div className={s.pips}>
        {mockFeed.map((_, i) => (
          <div key={i} className={`${s.pip} ${i === idx ? s.pipActive : ''} ${i < idx ? s.pipDone : ''}`} />
        ))}
      </div>
    </div>
  )
}
