import { useState, useMemo } from 'react';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { buildTheme } from './theme';
import AppLayout from './components/layout/AppLayout';
import HomePage from './pages/HomePage';
import BuildPage from './pages/BuildPage';
import LearnPage from './pages/LearnPage';
import AchievementsPage from './pages/AchievementsPage';
import { useBuildSimulator } from './hooks/useBuildSimulator';

function AppContent({ mode, onToggleMode }: { mode: 'light' | 'dark'; onToggleMode: () => void }) {
  const {
    page,
    setPage,
    state,
    installComponent,
    setMode,
    markDocRead,
    recordQuizAnswer,
    resetBuild,
    buildProgress,
    isBuildComplete,
    getUnlockedAchievements,
    getLockedAchievements,
    showPowerOn,
    setShowPowerOn,
  } = useBuildSimulator();

  const renderPage = () => {
    switch (page) {
      case 'home':
        return (
          <HomePage
            onNavigate={setPage}
            buildProgress={buildProgress}
            achievementsCount={getUnlockedAchievements().length}
            quizScore={state.quizCorrect}
          />
        );
      case 'build':
        return (
          <BuildPage
            state={state}
            buildProgress={buildProgress}
            isBuildComplete={isBuildComplete}
            onInstall={installComponent}
            onSetMode={setMode}
            onReset={resetBuild}
            showPowerOn={showPowerOn}
            onClosePowerOn={() => setShowPowerOn(false)}
          />
        );
      case 'learn':
        return (
          <LearnPage
            docsRead={state.docsRead}
            quizCorrect={state.quizCorrect}
            totalQuizAnswered={state.totalQuizAnswered}
            onMarkDocRead={markDocRead}
            onRecordQuizAnswer={recordQuizAnswer}
          />
        );
      case 'achievements':
        return (
          <AchievementsPage
            unlocked={getUnlockedAchievements()}
            locked={getLockedAchievements()}
            buildProgress={buildProgress}
            quizCorrect={state.quizCorrect}
            docsRead={state.docsRead.length}
          />
        );
      default:
        return null;
    }
  };

  return (
    <AppLayout
      page={page}
      onChangePage={setPage}
      buildProgress={buildProgress}
      mode={mode}
      onToggleMode={onToggleMode}
    >
      {renderPage()}
    </AppLayout>
  );
}

export default function App() {
  const [mode, setMode] = useState<'light' | 'dark'>('dark');
  const theme = useMemo(() => buildTheme(mode), [mode]);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <AppContent mode={mode} onToggleMode={() => setMode((m) => (m === 'dark' ? 'light' : 'dark'))} />
    </ThemeProvider>
  );
}
