import React, { useState } from 'react'
import { mockInterests } from '../data/mockData'
import s from './Onboarding.module.css'

export default function InterestBuilder({ nav }) {
  const [interests, setInterests] = useState(mockInterests)
  const toggle = id => setInterests(prev => prev.map(x => x.id===id ? {...x,selected:!x.selected} : x))
  const count = interests.filter(x => x.selected).length
  const ok = count >= 3

  return (
    <div className={s.screen}>
      <div className={s.content}>
        <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',marginBottom:28}}>
          <button className={s.back} style={{marginBottom:0}} onClick={() => nav('subjects')}>←</button>
          <div className={s.stepRow} style={{marginBottom:0}}>
            {[0,1,2].map(i => <div key={i} className={`${s.stepDot} ${s.stepDotActive}`} />)}
          </div>
        </div>

        <h1 className={s.title}>What are you<br />into?</h1>
        <p className={s.subtitle}>We connect your business concepts to what you actually love. Pick at least 3.</p>

        <div className={s.counter}>
          <span style={{color: ok?'#2D7A4F':'#C85C38', fontWeight:900, fontSize:20}}>{count}</span>
          <span style={{color:'#6B605A', fontSize:14}}> selected{!ok ? ` — pick ${3-count} more` : ' ✓'}</span>
        </div>

        <div className={s.tags}>
          {interests.map(item => (
            <button key={item.id} className={`${s.tag} ${item.selected?s.tagOn:''}`} onClick={() => toggle(item.id)}>
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
