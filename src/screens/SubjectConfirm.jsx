import React, { useState } from 'react'
import { mockSubjects } from '../data/mockData'
import s from './Onboarding.module.css'

export default function SubjectConfirm({ nav }) {
  const [subjects, setSubjects] = useState(mockSubjects.map(x => ({ ...x, on: true })))
  const toggle = id => setSubjects(prev => prev.map(x => x.id === id ? { ...x, on: !x.on } : x))
  const count = subjects.filter(x => x.on).length

  return (
    <div className={s.screen}>
      <div className={s.bg} style={{ background: 'linear-gradient(160deg, #0A1A2A 0%, #0A0A0F 100%)' }} />
      <div className={s.content}>
        <button className={s.back} onClick={() => nav('lms')}>←</button>

        <div className="step-dots" style={{marginBottom:24}}>
          {[0,1,2].map(i => <div key={i} className={`step-dot${i<=1?' active':''}`} />)}
        </div>

        <div className={s.titleRow}>
          <div>
            <h1 className={s.title}>Your subjects</h1>
            <p className={s.subtitle} style={{marginBottom:0}}>Imported from Canvas LMS</p>
          </div>
          <div className={s.syncedBadge}>
            <span className={s.syncedDot} />Synced
          </div>
        </div>

        <div className={s.list} style={{marginTop:20}}>
          {subjects.map(sub => (
            <button key={sub.id} className={s.subjectCard} onClick={() => toggle(sub.id)}
              style={{ borderColor: sub.on ? sub.color + '40' : 'var(--border)', background: sub.on ? sub.color + '0C' : 'var(--surface2)' }}>
              <div className={s.subjectBar} style={{ background: sub.color }} />
              <div className={s.subjectBody}>
                <div className={s.subjectTop}>
                  <div>
                    <div className={s.subjectCode} style={{ color: sub.color }}>{sub.code}</div>
                    <div className={s.subjectName}>{sub.name}</div>
                  </div>
                  <div className={s.checkbox} style={sub.on ? { background: sub.color, borderColor: sub.color } : {}}>
                    {sub.on && <span style={{color:'#fff',fontSize:12,fontWeight:900}}>✓</span>}
                  </div>
                </div>
                <div className={s.subjectMeta}>{sub.totalTopics} topics · ~{Math.ceil(sub.totalTopics * 2.5 / 60)}h of lessons</div>
              </div>
            </button>
          ))}
        </div>

        <button className={s.continueBtn} disabled={count === 0} onClick={() => nav('interests')}>
          Continue with {count} subject{count !== 1 ? 's' : ''} →
        </button>
      </div>
    </div>
  )
}
