import React, { useState } from 'react'
import { mockSubjects } from '../data/mockData'
import s from './Onboarding.module.css'

export default function SubjectConfirm({ nav }) {
  const [subjects, setSubjects] = useState(mockSubjects.map(x => ({ ...x, on: true })))
  const toggle = id => setSubjects(prev => prev.map(x => x.id === id ? { ...x, on: !x.on } : x))
  const count = subjects.filter(x => x.on).length

  return (
    <div className={s.screen}>
      <div className={s.content}>
        <button className={s.back} onClick={() => nav('lms')}>←</button>
        <div className={s.stepRow}>
          {[0,1,2].map(i => <div key={i} className={`${s.stepDot}${i<=1?' '+s.stepDotActive:''}`} />)}
        </div>
        <div className={s.titleRow}>
          <div>
            <h1 className={s.title} style={{marginBottom:4}}>Your subjects</h1>
            <p style={{fontSize:14,color:'#A8988E'}}>Imported from Canvas LMS</p>
          </div>
          <div className={s.syncedBadge}><span className={s.syncedDot}/>Synced</div>
        </div>

        <div className={s.list}>
          {subjects.map(sub => (
            <button key={sub.id} className={s.subjectCard} onClick={() => toggle(sub.id)}
              style={{ borderColor: sub.on ? sub.color+'50' : '#E4D9CE', background: sub.on ? sub.color+'0A' : '#fff' }}>
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

        <button className={s.continueBtn} disabled={count===0} onClick={() => nav('interests')}>
          Continue with {count} subject{count!==1?'s':''} →
        </button>
      </div>
    </div>
  )
}
