import React, { useState } from 'react'
import { mockPlaylist } from '../data/mockData'
import s from './Audio.module.css'

const COLORS = { BUSS1000: '#5B4FCF', FINC2011: '#2D7A4F', MKTG2001: '#C85C38' }
const SPEEDS = [0.75, 1.0, 1.25, 1.5, 2.0]

export default function Audio() {
  const [idx, setIdx] = useState(0)
  const [playing, setPlaying] = useState(false)
  const [speed, setSpeed] = useState(1.0)
  const prog = 0.34

  const track = mockPlaylist[idx]
  const color = COLORS[track.subject] || '#5B4FCF'
  const elapsed = Math.floor(prog * track.seconds)
  const elapsedStr = `${Math.floor(elapsed/60)}:${String(elapsed%60).padStart(2,'0')}`

  return (
    <div className={s.screen}>
      <div className={s.header}>
        <h1 className={s.title}>Audio Mode</h1>
        <div className={s.badge}>🚆 Commute Ready</div>
      </div>

      <div className={s.player}>
        <div className={s.trackTop}>
          <span className={s.subjectPill} style={{ color, background: color+'18', border:`1px solid ${color}30` }}>{track.subject}</span>
          <span className={s.counter}>{idx+1} / {mockPlaylist.length}</span>
        </div>

        <div className={s.albumArt} style={{ background: color+'18' }}>
          <span style={{ fontSize:52 }}>🎓</span>
        </div>

        {playing && (
          <div className={s.waveform}>
            {Array.from({length:24}).map((_,i) => (
              <div key={i} className={s.waveBar} style={{ height:`${18+Math.sin(i*0.9)*12}px`, background:color, animationDelay:`${i*0.07}s` }} />
            ))}
          </div>
        )}

        <p className={s.trackTitle}>{track.title}</p>

        <div className={s.progRow}>
          <div className={s.progBg}><div className={s.progFill} style={{ width:`${prog*100}%`, background:color }} /></div>
          <div className={s.progTimes}><span>{elapsedStr}</span><span>{track.duration}</span></div>
        </div>

        <div className={s.controls}>
          <button className={s.ctrl} onClick={() => { const i=SPEEDS.indexOf(speed); setSpeed(SPEEDS[(i+1)%SPEEDS.length]) }}>
            <span className={s.speedBadge}>{speed}x</span>
          </button>
          <button className={s.ctrl} onClick={() => setIdx((idx-1+mockPlaylist.length)%mockPlaylist.length)}>⏮</button>
          <button className={s.playBtn} style={{ background:color }} onClick={() => setPlaying(!playing)}>
            {playing ? '⏸' : '▶'}
          </button>
          <button className={s.ctrl} onClick={() => setIdx((idx+1)%mockPlaylist.length)}>⏭</button>
          <button className={s.ctrl} style={{opacity:0.4}}>⇄</button>
        </div>
      </div>

      <div className={s.listHeader}>
        <span className={s.listTitle}>This Week's Commute Playlist</span>
        <span className={s.listMeta}>27 min total</span>
      </div>

      <div className={s.list}>
        {mockPlaylist.map((t, i) => {
          const c = COLORS[t.subject] || '#5B4FCF'
          const active = i === idx
          return (
            <button key={t.id} className={`${s.trackRow} ${active?s.trackActive:''}`}
              style={active?{background:c+'10'}:{}} onClick={() => setIdx(i)}>
              <div className={s.trackNum} style={active?{background:c+'22'}:{}}>
                {active && playing ? <span style={{color:c}}>♪</span> : <span style={active?{color:c}:{}}>{i+1}</span>}
              </div>
              <div className={s.trackInfo}>
                <div className={s.trackName} style={active?{color:'#1A1514',fontWeight:700}:{}}>{t.title}</div>
                <div className={s.trackMeta}>
                  <span className={s.trackDot} style={{background:c}} />
                  <span>{t.subject}</span><span>{t.duration}</span>
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
