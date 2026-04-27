import React, { useState } from 'react'
import Feed from './Feed.jsx'
import Audio from './Audio.jsx'
import Progress from './Progress.jsx'
import Profile from './Profile.jsx'
import s from './MainApp.module.css'

const TABS = [
  { id: 'feed',     label: 'Feed',     icon: '▶' },
  { id: 'audio',    label: 'Audio',    icon: '🎧' },
  { id: 'progress', label: 'Progress', icon: '📍' },
  { id: 'profile',  label: 'Profile',  icon: '👤' },
]

export default function MainApp() {
  const [tab, setTab] = useState('feed')

  return (
    <div className={s.wrap}>
      <div className={s.content}>
        {tab === 'feed'     && <Feed onAudio={() => setTab('audio')} />}
        {tab === 'audio'    && <Audio />}
        {tab === 'progress' && <Progress />}
        {tab === 'profile'  && <Profile />}
      </div>

      <nav className={s.tabBar}>
        {TABS.map(t => (
          <button key={t.id} className={`${s.tab} ${tab === t.id ? s.tabActive : ''}`} onClick={() => setTab(t.id)}>
            <span className={s.tabIcon}>{t.icon}</span>
            <span className={s.tabLabel}>{t.label}</span>
          </button>
        ))}
      </nav>
    </div>
  )
}
