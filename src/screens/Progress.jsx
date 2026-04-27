import React, { useState } from 'react'
import { mockSubjects, syllabusNodes } from '../data/mockData'
import s from './Progress.module.css'

export default function Progress() {
  const [selId, setSelId] = useState(mockSubjects[0].id)
  const sub = mockSubjects.find(x => x.id === selId)
  const nodes = syllabusNodes[sub.code] || []

  return (
    <div className={s.screen}>
      <div className={s.header}>
        <h1 className={s.title}>Your Progress</h1>
        <div className={s.xpChip}>⚡ 2,340 XP</div>
      </div>

      <div className={s.statsRow}>
        {[
          { icon:'🔥', val:'12', lbl:'day streak' },
          { icon:'📚', val:'47', lbl:'lessons' },
          { icon:'⏱', val:'1.8h', lbl:'this week' },
        ].map((x,i) => (
          <div key={i} className={s.statCard}>
            <span style={{fontSize:20}}>{x.icon}</span>
            <span className={s.statVal}>{x.val}</span>
            <span className={s.statLbl}>{x.lbl}</span>
          </div>
        ))}
      </div>

      <div className={s.weeklyCard}>
        <div className={s.weeklyTop}>
          <span className={s.weeklyLabel}>Weekly Goal</span>
          <span className={s.weeklyFrac}><b style={{color:'#7C4DFF'}}>7</b> / 10 lessons</span>
        </div>
        <div className={s.weeklyPips}>
          {Array.from({length:10}).map((_,i)=>(
            <div key={i} className={s.pip} style={{background: i<7 ? '#7C4DFF' : '#2A2A3A'}} />
          ))}
        </div>
        <span className={s.weeklyNote}>3 more lessons to hit your goal</span>
      </div>

      <div className={s.section}>
        <h2 className={s.sectionTitle}>Syllabus Map</h2>
        <div className={s.subjectTabs}>
          {mockSubjects.map(x => (
            <button key={x.id}
              className={`${s.subTab} ${selId===x.id?s.subTabActive:''}`}
              style={selId===x.id ? {borderColor:x.color, background:x.color+'15', color:x.color} : {}}
              onClick={() => setSelId(x.id)}>
              <span className={s.subTabDot} style={{background:x.color}} />
              {x.code}
            </button>
          ))}
        </div>
      </div>

      <div className={s.syllabusCard}>
        <div className={s.syllabusTop}>
          <div>
            <div className={s.syllabusCode} style={{color:sub.color}}>{sub.code}</div>
            <div className={s.syllabusName}>{sub.name}</div>
          </div>
          <div className={s.ring} style={{borderColor:sub.color+'60'}}>
            <div className={s.ringInner} style={{borderColor:sub.color, opacity: sub.progress}} />
            <span className={s.ringPct} style={{color:sub.color}}>{Math.round(sub.progress*100)}%</span>
          </div>
        </div>
        <div className={s.progBg}><div className={s.progFill} style={{width:`${sub.progress*100}%`,background:sub.color}} /></div>
        <p className={s.progNote}>{sub.completedTopics} of {sub.totalTopics} topics completed</p>

        <div className={s.nodes}>
          {nodes.map((node, i) => (
            <div key={node.id} className={s.nodeRow}>
              <div className={s.nodeTrack}>
                <div className={s.nodeCircle} style={
                  node.done ? {background:sub.color, borderColor:sub.color} :
                  node.current ? {borderColor:sub.color, borderWidth:2.5} :
                  {borderColor:'#2A2A3A'}
                }>
                  {node.done && <span style={{color:'#fff',fontSize:10,fontWeight:900}}>✓</span>}
                  {node.current && <span className={s.nodeDot} style={{background:sub.color}} />}
                </div>
                {i < nodes.length-1 && (
                  <div className={s.nodeLine} style={{background:node.done?sub.color+'50':'#2A2A3A'}} />
                )}
              </div>
              <div className={s.nodeContent} style={node.current?{background:sub.color+'0E',border:`1px solid ${sub.color}30`,borderRadius:10}:{}}>
                <div className={s.nodeTopRow}>
                  <span className={s.nodeTopic} style={node.done?{color:'#9090B0'}:node.current?{color:'#F0F0FF',fontWeight:700}:{color:'#555570'}}>
                    {node.topic}
                  </span>
                  {node.current && <span className={s.nextBadge} style={{color:sub.color,background:sub.color+'22',border:`1px solid ${sub.color}44`}}>NEXT</span>}
                </div>
                <span className={s.nodeWeek}>Week {node.week}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div style={{height:20}} />
    </div>
  )
}
