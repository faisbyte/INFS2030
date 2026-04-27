import React, { useState } from 'react'
import { mockSubjects, syllabusNodes } from '../data/mockData'
import s from './Progress.module.css'

export default function Progress() {
  const [selId, setSelId] = useState(mockSubjects[0].id)
  const sub   = mockSubjects.find(x => x.id === selId)
  const nodes = syllabusNodes[sub.code] || []

  return (
    <div className={s.screen}>
      <div className={s.header}>
        <h1 className={s.title}>Your Progress</h1>
        <div className={s.xpChip}>⚡ 2,340 XP</div>
      </div>

      <div className={s.statsRow}>
        {[['🔥','12','day streak'],['📚','47','lessons'],['⏱','1.8h','this week']].map(([ic,v,l],i)=>(
          <div key={i} className={s.statCard}>
            <span style={{fontSize:20}}>{ic}</span>
            <span className={s.statVal}>{v}</span>
            <span className={s.statLbl}>{l}</span>
          </div>
        ))}
      </div>

      <div className={s.weeklyCard}>
        <div className={s.weeklyTop}>
          <span className={s.weeklyLabel}>Weekly Goal</span>
          <span className={s.weeklyFrac}><b style={{color:'#C85C38'}}>7</b><span style={{color:'#A8988E'}}> / 10 lessons</span></span>
        </div>
        <div className={s.pips}>{Array.from({length:10}).map((_,i)=>(
          <div key={i} className={s.pip} style={{background:i<7?'#C85C38':'#E4D9CE'}} />
        ))}</div>
        <span className={s.weeklyNote}>3 more lessons to hit your goal</span>
      </div>

      <div className={s.section}>
        <h2 className={s.sectionTitle}>Syllabus Map</h2>
        <div className={s.subjectTabs}>
          {mockSubjects.map(x=>(
            <button key={x.id} className={`${s.subTab} ${selId===x.id?s.subTabActive:''}`}
              style={selId===x.id?{borderColor:x.color,background:x.color+'15',color:x.color}:{}}
              onClick={()=>setSelId(x.id)}>
              <span className={s.tabDot} style={{background:x.color}}/>
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
          <div className={s.ring} style={{borderColor:sub.color+'50'}}>
            <span className={s.ringPct} style={{color:sub.color}}>{Math.round(sub.progress*100)}%</span>
          </div>
        </div>
        <div className={s.progBg}><div className={s.progFill} style={{width:`${sub.progress*100}%`,background:sub.color}}/></div>
        <p className={s.progNote}>{sub.completedTopics} of {sub.totalTopics} topics completed</p>

        <div className={s.nodes}>
          {nodes.map((node,i)=>(
            <div key={node.id} className={s.nodeRow}>
              <div className={s.nodeTrack}>
                <div className={s.nodeCircle} style={
                  node.done ? {background:sub.color,borderColor:sub.color} :
                  node.current ? {borderColor:sub.color,borderWidth:'2.5px'} :
                  {borderColor:'#E4D9CE'}
                }>
                  {node.done && <span style={{color:'#fff',fontSize:10,fontWeight:900}}>✓</span>}
                  {node.current && <span className={s.nodeDot} style={{background:sub.color}}/>}
                </div>
                {i<nodes.length-1 && <div className={s.nodeLine} style={{background:node.done?sub.color+'40':'#E4D9CE'}}/>}
              </div>
              <div className={s.nodeContent} style={node.current?{background:sub.color+'0C',border:`1px solid ${sub.color}30`,borderRadius:10}:{}}>
                <div className={s.nodeTopRow}>
                  <span className={s.nodeTopic} style={node.done?{color:'#A8988E'}:node.current?{color:'#1A1514',fontWeight:700}:{color:'#E4D9CE'}}>
                    {node.topic}
                  </span>
                  {node.current && <span className={s.nextBadge} style={{color:sub.color,background:sub.color+'18',border:`1px solid ${sub.color}35`}}>NEXT</span>}
                </div>
                <span className={s.nodeWeek}>Week {node.week}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div style={{height:20}}/>
    </div>
  )
}
