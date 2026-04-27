import React from 'react'
import s from './Welcome.module.css'

export default function Welcome({ nav }) {
  return (
    <div className={s.screen}>
      <div className={s.content}>
        <div className={s.logo}>
          <div className={s.logoIcon}>📖</div>
          <div>
            <div className={s.logoName}>CampusScroll</div>
            <div className={s.logoTag}>Study smarter. Scroll better.</div>
          </div>
        </div>

        <div className={s.hero}>
          <div className={s.badge}><span className={s.badgeDot} />Designed for Gen Z students</div>
          <h1 className={s.headline}>Turn your<br />commute into<br />your edge.</h1>
          <p className={s.sub}>
            Micro-lessons from your actual syllabus, personalised to what you love.
            Learn <span className={s.accent}>FINC2011</span> through Formula 1.
            Master <span className={s.accent}>BUSS1000</span> through Streetwear.
          </p>
        </div>

        <div className={s.stats}>
          {[['2.3 min','avg lesson'],['94%','retention rate'],['12K+','students']].map(([v,l],i)=>(
            <div key={i} className={s.stat}>
              <span className={s.statVal}>{v}</span>
              <span className={s.statLbl}>{l}</span>
            </div>
          ))}
        </div>

        <div className={s.actions}>
          <button className={s.primaryBtn} onClick={() => nav('lms')}>Get Started →</button>
          <button className={s.skipBtn} onClick={() => nav('app')}>Skip to Demo →</button>
        </div>
      </div>
    </div>
  )
}
