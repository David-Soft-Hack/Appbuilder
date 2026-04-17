import Box from '@mui/material/Box';
import Header from './Header';
import BottomNav from './BottomNav';
import type { AppPage } from '../../hooks/useBuildSimulator';

interface AppLayoutProps {
  page: AppPage;
  onChangePage: (page: AppPage) => void;
  buildProgress: number;
  mode: 'light' | 'dark';
  onToggleMode: () => void;
  children: React.ReactNode;
}

export default function AppLayout({
  page,
  onChangePage,
  buildProgress,
  mode,
  onToggleMode,
  children,
}: AppLayoutProps) {
  return (
    <Box
      sx={{
        minHeight: '100dvh',
        display: 'flex',
        flexDirection: 'column',
        bgcolor: 'background.default',
        maxWidth: 480,
        mx: 'auto',
        position: 'relative',
      }}
    >
      <Header page={page} buildProgress={buildProgress} mode={mode} onToggleMode={onToggleMode} />
      <Box
        component="main"
        sx={{
          flex: 1,
          overflowY: 'auto',
          pb: 10,
        }}
      >
        {children}
      </Box>
      <BottomNav page={page} onChangePage={onChangePage} />
    </Box>
  );
}
