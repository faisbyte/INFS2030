import React from 'react'
import { mockUser, mockSubjects, mockInterests } from '../data/mockData'
import s from './Profile.module.css'

const SETTINGS = [
  { icon:'🔔', label:'Notifications', val:'Daily 8am' },
  { icon:'🚆', label:'Commute Time',  val:'45 min'   },
  { icon:'🌐', label:'Voice Language',val:'EN-AU'     },
  { icon:'🌙', label:'Dark Mode',     val:'Off'       },
  { icon:'🔒', label:'Privacy & Data',val:''          },
]

export default function Profile() {
  const interests = mockInterests.filter(x => x.selected)

  return (
    <div className={s.screen}>
      <div className={s.header}>
        <h1 className={s.title}>Profile</h1>
        <button className={s.settingsBtn}>⚙️</button>
      </div>

      <div className={s.profileCard}>
        <div className={s.avatar}>AC</div>
        <div>
          <div className={s.userName}>{mockUser.name}</div>
          <div className={s.userUni}>{mockUser.university}</div>
          <div className={s.userId}>{mockUser.studentId}</div>
        </div>
        <div className={s.streakBanner}>
          <span style={{fontSize:26}}>🔥</span>
          <div>
            <div className={s.streakTitle}>{mockUser.streak} Day Commute Streak</div>
            <div className={s.streakSub}>Top 8% of your cohort this week</div>
          </div>
        </div>
      </div>

      <div className={s.statsRow}>
        {[['📚',mockUser.totalLessons,'Lessons'],['⚡','2,340','Total XP'],['🏆','Top 8%','Rank'],['⏱','3.2h','Month']].map(([ic,v,l],i)=>(
          <div key={i} className={s.statCard}>
            <span style={{fontSize:18}}>{ic}</span>
            <span className={s.statVal}>{v}</span>
            <span className={s.statLbl}>{l}</span>
          </div>
        ))}
      </div>

      <div className={s.section}>
        <h2 className={s.sectionTitle}>Active Subjects</h2>
        {mockSubjects.map(sub=>(
          <div key={sub.id} className={s.subjectRow}>
            <span className={s.subjectDot} style={{background:sub.color}}/>
            <div className={s.subjectInfo}>
              <div className={s.subjectCode} style={{color:sub.color}}>{sub.code}</div>
              <div className={s.subjectName}>{sub.name}</div>
            </div>
            <div className={s.subjectRight}>
              <span className={s.subjectPct}>{Math.round(sub.progress*100)}%</span>
              <div className={s.subjectBar}><div className={s.subjectFill} style={{width:`${sub.progress*100}%`,background:sub.color}}/></div>
            </div>
          </div>
        ))}
      </div>

      <div className={s.section}>
        <h2 className={s.sectionTitle}>My Interests</h2>
        <div className={s.interestWrap}>
          {interests.map(x=>(
            <div key={x.id} className={s.interestTag}>{x.emoji} {x.label}</div>
          ))}
        </div>
      </div>

      <div className={s.section}>
        <h2 className={s.sectionTitle}>Settings</h2>
        <div className={s.settingsList}>
          {SETTINGS.map((row,i)=>(
            <div key={i} className={s.settingRow} style={i===SETTINGS.length-1?{borderBottom:'none'}:{}}>
              <span className={s.settingIcon}>{row.icon}</span>
              <span className={s.settingLabel}>{row.label}</span>
              <span className={s.settingRight}>
                {row.val && <span className={s.settingVal}>{row.val}</span>}
                <span style={{color:'#A8988E',fontSize:18}}>›</span>
              </span>
            </div>
          ))}
        </div>
      </div>

      <button className={s.logoutBtn}>Sign Out</button>
      <p className={s.version}>CampusScroll v1.0.0 · University of Sydney Business School</p>
      <div style={{height:24}}/>
    </div>
  )
}
