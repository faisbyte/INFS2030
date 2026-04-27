import React, { useState, useRef } from 'react'
import s from './Onboarding.module.css'

const LMS = [
  { name: 'Canvas LMS', color: '#E66000', emoji: '🟧', sub: 'University of Sydney, UTS & more' },
  { name: 'Blackboard', color: '#CC0000', emoji: '🟥', sub: 'UNSW, Macquarie & more' },
  { name: 'Moodle', color: '#F98012', emoji: '🟨', sub: 'Many Australian universities' },
  { name: 'D2L Brightspace', color: '#00A1DE', emoji: '🟦', sub: 'Next-gen LMS platform' },
]

export default function ConnectLMS({ nav }) {
  const [loading, setLoading] = useState(false)
  const [prog, setProg] = useState(0)

  const handleConnect = () => {
    setLoading(true)
    let p = 0
    const iv = setInterval(() => {
      p += 2
      setProg(p)
      if (p >= 100) { clearInterval(iv); setTimeout(() => nav('subjects'), 300) }
    }, 40)
  }

  return (
    <div className={s.screen}>
      <div className={s.bg} style={{ background: 'linear-gradient(160deg, #0F0A2A 0%, #0A0A0F 100%)' }} />
      <div className={s.content}>
        <button className={s.back} onClick={() => nav('welcome')}>←</button>

        <div className="step-dots" style={{marginBottom:24}}>
          {[0,1,2].map(i => <div key={i} className={`step-dot${i===0?' active':''}`} />)}
        </div>

        <h1 className={s.title}>Connect your<br />university LMS</h1>
        <p className={s.subtitle}>Read-only access. We import your subjects automatically.</p>

        {loading ? (
          <div className={s.loadingBox}>
            <div className={s.loadingSpinner}>⟳</div>
            <div className={s.loadingTitle}>Connecting securely...</div>
            <div className={s.loadingSub}>Importing your enrolled subjects</div>
            <div className={s.progBg}>
              <div className={s.progFill} style={{ width: `${prog}%` }} />
            </div>
            <div className={s.loadingSteps}>
              {['Authenticating SSO...','Fetching enrolled units...','Importing syllabus data...'].map((step,i)=>(
                <div key={i} className={s.loadingStep}>
                  <span style={{color:'#00E676'}}>✓</span> {step}
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div className={s.list}>
            {LMS.map(lms => (
              <button key={lms.name} className={s.lmsCard} onClick={handleConnect}>
                <div className={s.lmsIcon} style={{ background: lms.color + '20' }}>
                  <span style={{ fontSize: 22 }}>{lms.emoji}</span>
                </div>
                <div className={s.lmsInfo}>
                  <div className={s.lmsName}>{lms.name}</div>
                  <div className={s.lmsSub}>{lms.sub}</div>
                </div>
                <span className={s.arrow}>→</span>
              </button>
            ))}
            <div className={s.secNote}>
              🔒 256-bit encrypted. Read-only. We never store your password.
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
