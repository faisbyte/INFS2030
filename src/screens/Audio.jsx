import React, { useState } from 'react'
import { mockPlaylist } from '../data/mockData'
import s from './Audio.module.css'

const COLORS = { BUSS1000: '#7C4DFF', FINC2011: '#00E5FF', MKTG2001: '#FF6B35' }
const SPEEDS = [0.75, 1.0, 1.25, 1.5, 2.0]

export default function Audio() {
  const [idx, setIdx] = useState(0)
  const [playing, setPlaying] = useState(false)
  const [speed, setSpeed] = useState(1.0)
  const [prog] = useState(0.34)

  const track = mockPlaylist[idx]
  const color = COLORS[track.subject] || '#7C4DFF'
  const elapsed = Math.floor(prog * track.seconds)
  const elapsedStr = `${Math.floor(elapsed/60)}:${String(elapsed%60).padStart(2,'0')}`

  return (
    <div className={s.screen}>
      <div className={s.header}>
        <h1 className={s.title}>Audio Mode</h1>
        <div className={s.commuteBadge}>🚆 Commute Ready</div>
      </div>

      <div className={s.player} style={{ '--accent': color }}>
        <div className={s.playerGlow} style={{ background: `radial-gradient(ellipse at center, ${color}22 0%, transparent 70%)` }} />

        <div className={s.playerTop}>
          <div className={s.subjectPill} style={{ color, background: color+'18', border: `1px solid ${color}44` }}>
            {track.subject}
          </div>
          <span className={s.trackCounter}>{idx+1} / {mockPlaylist.length}</span>
        </div>

        <div className={s.albumArt} style={{ background: color+'28' }}>
          <span style={{ fontSize: 52, opacity: 0.85 }}>🎓</span>
        </div>

        {playing && (
          <div className={s.waveform}>
            {Array.from({length:24}).map((_,i) => (
              <div key={i} className={s.waveBar} style={{
                height: `${20 + Math.sin(i * 0.8) * 14 + Math.cos(i * 1.3) * 8}px`,
                background: color, animationDelay: `${i * 0.06}s`
              }} />
            ))}
          </div>
        )}

        <p className={s.trackTitle}>{track.title}</p>

        <div className={s.progSection}>
          <div className={s.progBg}>
            <div className={s.progFill} style={{ width: `${prog*100}%`, background: color }} />
          </div>
          <div className={s.progTimes}>
            <span>{elapsedStr}</span>
            <span>{track.duration}</span>
          </div>
        </div>

        <div className={s.controls}>
          <button className={s.ctrl} onClick={() => { const i=SPEEDS.indexOf(speed); setSpeed(SPEEDS[(i+1)%SPEEDS.length]) }}>
            <span className={s.speedBadge}>{speed}x</span>
          </button>
          <button className={s.ctrl} onClick={() => setIdx((idx-1+mockPlaylist.length)%mockPlaylist.length)}>⏮</button>
          <button className={s.playBtn} style={{ background: color }} onClick={() => setPlaying(!playing)}>
            {playing ? '⏸' : '▶'}
          </button>
          <button className={s.ctrl} onClick={() => setIdx((idx+1)%mockPlaylist.length)}>⏭</button>
          <button className={s.ctrl} style={{ opacity: 0.4 }}>⇄</button>
        </div>
      </div>

      <div className={s.listHeader}>
        <span className={s.listTitle}>This Week's Commute Playlist</span>
        <span className={s.listMeta}>27 min total</span>
      </div>

      <div className={s.list}>
        {mockPlaylist.map((t, i) => {
          const c = COLORS[t.subject] || '#7C4DFF'
          const active = i === idx
          return (
            <button key={t.id} className={`${s.trackRow} ${active ? s.trackActive : ''}`}
              style={active ? { background: c+'12' } : {}} onClick={() => setIdx(i)}>
              <div className={s.trackNum} style={active ? { background: c+'28' } : {}}>
                {active && playing ? <span style={{color:c}}>♪</span> : <span style={active?{color:c}:{}}>{i+1}</span>}
              </div>
              <div className={s.trackInfo}>
                <div className={s.trackName} style={active?{color:'#F0F0FF'}:{}}>{t.title}</div>
                <div className={s.trackMeta}>
                  <span className={s.trackDot} style={{background:c}} />
                  <span>{t.subject}</span>
                  <span>{t.duration}</span>
                </div>
              </div>
              {active && <div className={s.activeBar} style={{background:c}} />}
            </button>
          )
        })}
      </div>
    </div>
  )
}
