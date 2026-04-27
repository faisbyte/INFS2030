import React, { useState } from 'react'
import { mockInterests } from '../data/mockData'
import s from './Onboarding.module.css'

export default function InterestBuilder({ nav }) {
  const [interests, setInterests] = useState(mockInterests)
  const toggle = id => setInterests(prev => prev.map(x => x.id === id ? { ...x, selected: !x.selected } : x))
  const count = interests.filter(x => x.selected).length
  const ok = count >= 3

  return (
    <div className={s.screen}>
      <div className={s.bg} style={{ background: 'linear-gradient(160deg, #0F0D25 0%, #0A0A0F 100%)' }} />
      <div className={s.content}>
        <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:28 }}>
          <button className={s.back} onClick={() => nav('subjects')}>←</button>
          <div className="step-dots">
            {[0,1,2].map(i => <div key={i} className="step-dot active" />)}
          </div>
        </div>

        <h1 className={s.title}>What are you<br />into?</h1>
        <p className={s.subtitle} style={{marginBottom:14}}>
          We connect your business concepts to what actually interests you. Pick at least 3.
        </p>

        <div className={s.counter}>
          <span style={{ color: ok ? '#00E676' : '#7C4DFF', fontWeight: 900, fontSize: 20 }}>{count}</span>
          <span style={{ color: '#9090B0', fontSize: 14 }}>
            {' '}selected{!ok ? ` — pick ${3 - count} more` : ' ✓'}
          </span>
        </div>

        <div className={s.tags}>
          {interests.map(item => (
            <button key={item.id}
              className={`${s.tag} ${item.selected ? s.tagOn : ''}`}
              onClick={() => toggle(item.id)}
            >
              {item.emoji} {item.label}
            </button>
          ))}
        </div>
      </div>

      <div className={s.footer}>
        <button className={s.continueBtn} disabled={!ok} onClick={() => nav('app')}>
          ✨ Build My Feed →
        </button>
      </div>
    </div>
  )
}
