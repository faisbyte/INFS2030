import React, { useState, useRef } from 'react'
import s from './Terms.module.css'

const SECTIONS = [
  {
    heading: '1. Intellectual Property',
    body: `All course materials, syllabi, lecture content, assessments, and reading lists accessible through CampusScroll remain the exclusive intellectual property of your enrolled university and its academic staff.\n\nCampusScroll holds no ownership over any university-sourced content. We act solely as a read-only presentation layer. You may not reproduce, redistribute, or commercialise any university content accessed through this app.`,
  },
  {
    heading: '2. Licence to Use University Content',
    body: `By connecting your Learning Management System (LMS), you confirm that you are a currently enrolled student with a valid licence to access your institution's course materials for personal study purposes only.\n\nThis licence is non-transferable and limited to your own academic use. Sharing login credentials or exported content with non-enrolled individuals is strictly prohibited.`,
  },
  {
    heading: '3. AI-Generated Study Summaries',
    body: `CampusScroll uses artificial intelligence to generate simplified summaries and micro-lessons derived from your syllabus content. These summaries are illustrative aids and do not constitute official academic advice.\n\nAI-generated content may contain inaccuracies. Always refer to official course materials for assessment preparation. CampusScroll accepts no liability for academic outcomes.`,
  },
  {
    heading: '4. Data Privacy & LMS Access',
    body: `We access your LMS in read-only mode. We do not store your university password. Subject enrolment data is cached locally on your device solely to personalise your feed.\n\nWe do not sell, share, or transfer your academic data to third parties. You may revoke LMS access at any time from the Profile settings.`,
  },
  {
    heading: '5. Institutional Agreements',
    body: `CampusScroll operates under licensing agreements with participating universities. Your institution's subscription to CampusScroll grants you access at no personal cost. These agreements govern the scope of content we may surface and may be amended by your institution at any time.`,
  },
  {
    heading: '6. Acceptable Use',
    body: `You agree not to use CampusScroll to circumvent academic integrity policies, including but not limited to using AI summaries as submitted academic work.\n\nMisuse of the platform may result in account suspension and referral to your university's academic integrity office.`,
  },
]

export default function Terms({ nav }) {
  const [accepted, setAccepted] = useState(false)
  const bodyRef = useRef(null)

  return (
    <div className={s.screen}>
      <div className={s.topBar}>
        <button className={s.back} onClick={() => nav('welcome')}>←</button>
      </div>

      <div className={s.intro}>
        <div className={s.iconWrap}>⚖️</div>
        <h1 className={s.title}>Terms &amp; Conditions</h1>
        <p className={s.subtitle}>
          Please read before connecting your university account. This covers intellectual property, data use, and your rights as a student.
        </p>
      </div>

      <div className={s.card} ref={bodyRef}>
        {SECTIONS.map((sec, i) => (
          <div key={i} className={s.section}>
            <div className={s.secHeading}>{sec.heading}</div>
            <p className={s.secBody}>{sec.body}</p>
          </div>
        ))}

        <div className={s.divider} />

        <label className={s.checkRow}>
          <div
            className={`${s.checkbox} ${accepted ? s.checkboxOn : ''}`}
            onClick={() => setAccepted(v => !v)}
          >
            {accepted && <span className={s.tick}>✓</span>}
          </div>
          <span className={s.checkLabel}>
            I have read and agree to the Terms &amp; Conditions, including the intellectual property and data privacy clauses.
          </span>
        </label>
      </div>

      <div className={s.footer}>
        <button
          className={s.acceptBtn}
          disabled={!accepted}
          onClick={() => nav('lms')}
        >
          Accept &amp; Continue →
        </button>
        <p className={s.footerNote}>You can review these terms again anytime in Profile → Privacy &amp; Data</p>
      </div>
    </div>
  )
}
