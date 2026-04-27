import React, { useState } from 'react'
import { mockFeed } from '../data/mockData'
import s from './Feed.module.css'

/* ── Infographic visuals ── */

function FiveForcesVisual({ d }) {
  return (
    <div className={s.fiveForces} style={{ background: d.bgColor }}>
      <div className={s.ffCenter}>
        <div className={s.ffEmoji}>{d.emoji}</div>
        <div className={s.ffLabel}>{d.label}</div>
      </div>
      {d.forces.map(f => (
        <div key={f.pos} className={`${s.ffBox} ${s[f.pos]}`}>
          <div className={s.ffBoxTitle}>{f.title}</div>
          <div className={s.ffBoxBody}>{f.body}</div>
        </div>
      ))}
    </div>
  )
}

function SupplyChainVisual({ d }) {
  return (
    <div className={s.supplyChain} style={{ background: d.bgColor }}>
      <div className={s.scEmoji}>{d.emoji}</div>
      <div className={s.scChain}>
        {d.nodes.map((n, i) => (
          <React.Fragment key={i}>
            <div className={`${s.scNode} ${i === d.bottleneck ? s.scBottleneck : ''}`}>
              <div className={s.scNodeLabel}>{n}</div>
              {i === d.bottleneck && <div className={s.scBadge}>BOTTLENECK</div>}
            </div>
            {i < d.nodes.length - 1 && (
              <div className={`${s.scArrow} ${i === d.bottleneck - 1 ? s.scArrowRed : ''}`}>→</div>
            )}
          </React.Fragment>
        ))}
      </div>
    </div>
  )
}

function SegmentationVisual({ d }) {
  return (
    <div className={s.segmentation} style={{ background: d.bgColor }}>
      <div className={s.segEmoji}>{d.emoji}</div>
      <div className={s.segCircles}>
        {d.segments.map((seg, i) => (
          <div key={i} className={s.segCircle} style={{ borderColor: seg.color, background: seg.color + '12' }}>
            <div className={s.segLabel} style={{ color: seg.color }}>{seg.label}</div>
            <div className={s.segSub}>{seg.sub}</div>
          </div>
        ))}
      </div>
    </div>
  )
}

function CapitalVisual({ d }) {
  return (
    <div className={s.capital} style={{ background: d.bgColor }}>
      <div className={s.capEmoji}>{d.emoji}</div>
      <div className={s.capBars}>
        <div className={s.capBar}>
          <div className={s.capBarLabel}>DEBT</div>
          <div className={s.capBarTrack}>
            <div className={s.capBarFill} style={{ width: `${d.debt}%`, background: '#C85C38' }} />
          </div>
          <div className={s.capBarPct} style={{ color: '#C85C38' }}>{d.debt}%</div>
        </div>
        <div className={s.capBar}>
          <div className={s.capBarLabel}>EQUITY</div>
          <div className={s.capBarTrack}>
            <div className={s.capBarFill} style={{ width: `${d.equity}%`, background: '#2D7A4F' }} />
          </div>
          <div className={s.capBarPct} style={{ color: '#2D7A4F' }}>{d.equity}%</div>
        </div>
        <div className={s.capNote}>Tax shield makes debt ≈ cheaper than equity</div>
      </div>
    </div>
  )
}

function NpvVisual({ d }) {
  const max = Math.max(...d.flows.map(Math.abs))
  return (
    <div className={s.npv} style={{ background: d.bgColor }}>
      <div className={s.npvEmoji}>{d.emoji}</div>
      <div className={s.npvChart}>
        {d.flows.map((f, i) => (
          <div key={i} className={s.npvCol}>
            <div className={s.npvBarWrap}>
              <div
                className={s.npvBar}
                style={{
                  height: `${Math.abs(f) / max * 60}px`,
                  background: f < 0 ? '#C85C38' : '#2D7A4F',
                  marginTop: f < 0 ? 0 : 'auto',
                  alignSelf: f < 0 ? 'flex-start' : 'flex-end',
                }}
              />
            </div>
            <div className={s.npvVal} style={{ color: f < 0 ? '#C85C38' : '#2D7A4F' }}>
              {f > 0 ? '+' : ''}{f}M
            </div>
            <div className={s.npvYear}>{d.years[i]}</div>
          </div>
        ))}
      </div>
      <div className={s.npvNote}>NPV = Sum of discounted future cash flows</div>
    </div>
  )
}

function BrandVisual({ d }) {
  const colors = ['#C85C38','#D4724A','#E08860','#5B4FCF','#7B6FDF','#A8988E']
  return (
    <div className={s.brand} style={{ background: d.bgColor }}>
      <div className={s.brandEmoji}>{d.emoji}</div>
      <div className={s.pyramid}>
        {d.levels.map((lv, i) => (
          <div key={i} className={s.pyramidRow} style={{ width: `${45 + i * 9}%`, background: colors[i] + '22', borderColor: colors[i] + '55' }}>
            <span style={{ fontSize: 11, fontWeight: 700, color: colors[i] }}>{lv}</span>
          </div>
        ))}
      </div>
    </div>
  )
}

function CardVisual({ card }) {
  const d = card.visualData
  if (card.visual === 'five-forces')  return <FiveForcesVisual d={d} />
  if (card.visual === 'supply-chain') return <SupplyChainVisual d={d} />
  if (card.visual === 'segmentation') return <SegmentationVisual d={d} />
  if (card.visual === 'capital')      return <CapitalVisual d={d} />
  if (card.visual === 'npv')          return <NpvVisual d={d} />
  if (card.visual === 'brand')        return <BrandVisual d={d} />
  return null
}

/* ── Title with accent word ── */
function AccentTitle({ title, accent, accentColor }) {
  if (!title.includes(accent)) return <h2 className={s.cardTitle}>{title}</h2>
  const [before, after] = title.split(accent)
  return (
    <h2 className={s.cardTitle}>
      {before}<span style={{ color: accentColor, fontStyle: 'italic' }}>{accent}</span>{after}
    </h2>
  )
}

/* ── Single card ── */
function Card({ card, onAudio }) {
  const [liked, setLiked] = useState(false)
  const [saved, setSaved] = useState(false)
  const [likes, setLikes] = useState(card.likes)

  const handleLike = () => {
    setLiked(!liked)
    setLikes(prev => liked
      ? (parseInt(prev) - 1 || prev)
      : (parseInt(prev) + 1 || prev)
    )
  }

  return (
    <div className={s.card}>
      {/* ── visual top half ── */}
      <div className={s.visualArea}>
        <CardVisual card={card} />
      </div>

      {/* ── content bottom half ── */}
      <div className={s.contentArea}>
        <div className={s.subjectRow}>
          <span className={s.subjectChip} style={{ color: card.subjectColor, background: card.subjectColor + '18', border: `1px solid ${card.subjectColor}30` }}>
            {card.subject}
          </span>
          <span className={s.conceptChip}>{card.concept}</span>
        </div>

        <AccentTitle title={card.title} accent={card.titleAccent} accentColor={card.accentColor} />
        <p className={s.cardBody}>{card.body}</p>

        <div className={s.sourceRow}>
          <span className={s.sourceIcon}>📄</span>
          <span className={s.sourceText}>From: Week {card.week} Reading</span>
          <span className={s.sourceTap}>· Tap to open</span>
        </div>

        <div className={s.swipeRow}>
          <div className={s.progressBar}>
            <div className={s.progressFill} style={{ background: card.accentColor }} />
          </div>
          <div className={s.swipeHint}>Swipe up for next lesson <span>∧</span></div>
        </div>
      </div>

      {/* ── social sidebar ── */}
      <div className={s.sidebar}>
        <button className={`${s.socialBtn} ${liked ? s.socialBtnLiked : ''}`} onClick={handleLike}>
          <span className={s.socialIcon}>{liked ? '❤️' : '🤍'}</span>
          <span className={s.socialCount}>{likes}</span>
        </button>
        <button className={s.socialBtn}>
          <span className={s.socialIcon}>💬</span>
          <span className={s.socialCount}>{card.comments}</span>
        </button>
        <button className={`${s.socialBtn} ${saved ? s.socialBtnSaved : ''}`} onClick={() => setSaved(!saved)}>
          <span className={s.socialIcon}>{saved ? '🔖' : '🔖'}</span>
          <span className={s.socialCount}>{card.saves}</span>
        </button>
        <button className={s.socialBtn} onClick={onAudio}>
          <span className={s.socialIcon}>↗</span>
          <span className={s.socialCount}>{card.shares}</span>
        </button>
      </div>
    </div>
  )
}

/* ── Feed ── */
export default function Feed({ onAudio }) {
  const [idx, setIdx] = useState(0)

  const handleScroll = e => {
    const el = e.currentTarget
    setIdx(Math.round(el.scrollTop / el.clientHeight))
  }

  return (
    <div className={s.wrap}>
      {/* header */}
      <div className={s.header}>
        <span className={s.headerLogo}>CampusScroll</span>
        <button className={s.searchBtn}>🔍</button>
      </div>

      {/* feed */}
      <div className={s.feed} onScroll={handleScroll}>
        {mockFeed.map(card => (
          <Card key={card.id} card={card} onAudio={onAudio} />
        ))}
      </div>
    </div>
  )
}
