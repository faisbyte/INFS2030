# CampusScroll — Prototype

A mobile-first app that transforms passive university course material into personalised, short-form, vertical-scrolling micro-lessons. Built with React Native + Expo.

---

## How to Run Locally

### Prerequisites

Install these once if you don't have them:

1. **Node.js** (v18+): https://nodejs.org
2. **Expo Go app** on your iPhone or Android — download from the App Store / Google Play.

---

### Running the App

```bash
# 1. Navigate to the project folder
cd /Users/faisalnaveed/Documents/GitHub/INFS2030

# 2. Install dependencies (skip if already done)
npm install

# 3. Start the Expo development server
npx expo start
```

This opens a browser tab with a **QR code** and the Metro bundler console.

---

### Viewing on Your Phone (Easiest — no simulator needed)

1. Open the **Expo Go** app on your iPhone.
2. Tap **Scan QR Code**.
3. Scan the QR code from your terminal or browser.
4. The app loads on your device in ~30 seconds.

> Make sure your phone and Mac are on the **same Wi-Fi network**.

---

### Viewing in iOS Simulator (Mac only)

1. Install **Xcode** from the Mac App Store (large download ~14 GB).
2. Open Xcode → Settings → Platforms → install an iOS Simulator.
3. Run:
   ```bash
   npx expo start --ios
   ```

---

### Viewing in Android Emulator

1. Install **Android Studio**: https://developer.android.com/studio
2. Create a virtual device (AVD) inside Android Studio, then start it.
3. Run:
   ```bash
   npx expo start --android
   ```

---

### Taking Screenshots

**On your physical iPhone:** Side Button + Volume Up simultaneously.

**In iOS Simulator:** Cmd + S (or File → Save Screenshot).

---

## App Structure

```
CampusScroll/
├── App.js                          # Root entry point
├── app.json                        # Expo config
├── src/
│   ├── navigation/
│   │   └── AppNavigator.js         # Stack + Tab navigation
│   ├── screens/
│   │   ├── onboarding/
│   │   │   ├── WelcomeScreen.js
│   │   │   ├── ConnectLMSScreen.js
│   │   │   ├── SubjectConfirmScreen.js
│   │   │   └── InterestBuilderScreen.js
│   │   ├── HomeFeedScreen.js       # TikTok-style swipe feed
│   │   ├── AudioModeScreen.js      # Podcast-style commute player
│   │   ├── ProgressScreen.js       # Syllabus map + progress rings
│   │   └── ProfileScreen.js        # User profile + streak
│   ├── data/
│   │   └── mockData.js             # All hardcoded mock content
│   └── theme/
│       └── colors.js               # Design tokens (dark palette)
```

---

## Recommended Demo Flow for Pitch Screenshots

1. **Welcome Screen** — hero headline + stats
2. **Connect LMS** — tap "Canvas LMS", watch animated loading sequence
3. **Subject Confirm** — imported BUSS1000, FINC2011, MKTG2001
4. **Interest Builder** — tap interests, hit "Build My Feed"
5. **Home Feed** — swipe through F1 / Coffee / Nike / Supreme / AFL cards
6. **Tap "Deeper explanation"** on any card to expand full body text
7. **Tap Audio icon** (side button) to jump to Audio Mode
8. **Audio Mode** — tap play, see animated waveform + commute playlist
9. **Progress Tab** — syllabus map nodes, progress ring, weekly goal bar
10. **Profile Tab** — 🔥 12 Day Streak, subject progress, interests

---

*Frontend-only prototype. No backend required. All content is hardcoded mock data.*