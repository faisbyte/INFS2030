import React, { useState } from 'react'
import Welcome from './screens/Welcome.jsx'
import ConnectLMS from './screens/ConnectLMS.jsx'
import SubjectConfirm from './screens/SubjectConfirm.jsx'
import InterestBuilder from './screens/InterestBuilder.jsx'
import MainApp from './screens/MainApp.jsx'
import './app.css'

export default function App() {
  const [screen, setScreen] = useState('welcome')

  const nav = (s) => setScreen(s)

  return (
    <div className="shell">
      <div className="phone">
        {screen === 'welcome'   && <Welcome nav={nav} />}
        {screen === 'lms'       && <ConnectLMS nav={nav} />}
        {screen === 'subjects'  && <SubjectConfirm nav={nav} />}
        {screen === 'interests' && <InterestBuilder nav={nav} />}
        {screen === 'app'       && <MainApp nav={nav} />}
      </div>
    </div>
  )
}
