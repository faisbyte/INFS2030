import React, { useState, useRef, useEffect } from 'react'
import { mockFeed } from '../data/mockData'
import s from './Feed.module.css'

/* ── Auto-playing video that pauses when scrolled out of view ── */
function CardVideo({ src }) {
  const videoRef = useRef(null)
  const [muted, setMuted] = useState(true)

  useEffect(() => {
    const video = videoRef.current
    if (!video) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          video.play().catch(() => {})
        } else {
          video.pause()
        }
      },
      { threshold: 0.6 }
    )

    observer.observe(video)
    return () => observer.disconnect()
  }, [])

  return (
    <div className={s.videoWrap}>
      <video
        ref={videoRef}
        src={src}
        className={s.video}
        loop
        muted={muted}
        playsInline
        preload="auto"
      />
      {/* mute/unmute tap */}
      <button
        className={s.muteBtn}
        onClick={() => setMuted(m => !m)}
        title={muted ? 'Unmute' : 'Mute'}
      >
        {muted ? '🔇' : '🔊'}
      </button>
    </div>
  )
}

/* ── Title with one word in accent colour ── */
function AccentTitle({ title, accent, accentColor }) {
  if (!accent || !title.includes(accent)) return <h2 className={s.cardTitle}>{title}</h2>
  const [before, after] = title.split(accent)
  return (
    <h2 className={s.cardTitle}>
      {before}
      <span style={{ color: accentColor, fontStyle: 'italic' }}>{accent}</span>
      {after}
    </h2>
  )
}

/* ── Single card ── */
function Card({ card, onAudio }) {
  const [liked, setLiked] = useState(false)
  const [saved, setSaved] = useState(false)

  return (
    <div className={s.card}>
      {/* video fills top portion */}
      <div className={s.visualArea}>
        <CardVideo src={card.video} />
      </div>

      {/* white content panel slides up from bottom */}
      <div className={s.contentArea}>
        <div className={s.subjectRow}>
          <span
            className={s.subjectChip}
            style={{ color: card.subjectColor, background: card.subjectColor + '18', border: `1px solid ${card.subjectColor}30` }}
          >
            {card.subject}
          </span>
          <span className={s.conceptChip}>{card.concept}</span>
        </div>

        <AccentTitle title={card.title} accent={card.titleAccent} accentColor={card.accentColor} />
        <p className={s.cardBody}>{card.body}</p>

        <div className={s.sourceRow}>
          <span className={s.sourceIcon}>📄</span>
          <span className={s.sourceText}>From: Week {card.week} Reading</span>
          <span className={s.sourceTap}>· Tap to open</span>
        </div>

        <div className={s.swipeRow}>
          <div className={s.progressBar}>
            <div className={s.progressFill} style={{ background: card.accentColor }} />
          </div>
          <div className={s.swipeHint}>Swipe up for next lesson ∧</div>
        </div>
      </div>

      {/* social sidebar */}
      <div className={s.sidebar}>
        <button className={s.socialBtn} onClick={() => setLiked(l => !l)}>
          <span className={s.socialIcon}>{liked ? '❤️' : '🤍'}</span>
          <span className={s.socialCount} style={liked ? { color: '#C85C38' } : {}}>{card.likes}</span>
        </button>
        <button className={s.socialBtn}>
          <span className={s.socialIcon}>💬</span>
          <span className={s.socialCount}>{card.comments}</span>
        </button>
        <button className={s.socialBtn} onClick={() => setSaved(v => !v)}>
          <span className={s.socialIcon}>🔖</span>
          <span className={s.socialCount} style={saved ? { color: '#5B4FCF' } : {}}>{card.saves}</span>
        </button>
        <button className={s.socialBtn} onClick={onAudio}>
          <span className={s.socialIcon}>↗</span>
          <span className={s.socialCount}>{card.shares}</span>
        </button>
      </div>
    </div>
  )
}

/* ── Feed ── */
export default function Feed({ onAudio }) {
  const [idx, setIdx] = useState(0)

  const handleScroll = e => {
    const el = e.currentTarget
    setIdx(Math.round(el.scrollTop / el.clientHeight))
  }

  return (
    <div className={s.wrap}>
      <div className={s.header}>
        <span className={s.headerLogo}>CampusScroll</span>
        <button className={s.searchBtn}>🔍</button>
      </div>

      <div className={s.feed} onScroll={handleScroll}>
        {mockFeed.map(card => (
          <Card key={card.id} card={card} onAudio={onAudio} />
        ))}
      </div>

      {/* progress pips */}
      <div className={s.pips}>
        {mockFeed.map((_, i) => (
          <div key={i} className={`${s.pip} ${i === idx ? s.pipActive : ''}`} />
        ))}
      </div>
    </div>
  )
}
