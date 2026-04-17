import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import Box from '@mui/material/Box';
import LinearProgress from '@mui/material/LinearProgress';
import Tooltip from '@mui/material/Tooltip';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import LightModeIcon from '@mui/icons-material/LightMode';
import MemoryIcon from '@mui/icons-material/Memory';
import type { AppPage } from '../../hooks/useBuildSimulator';

const PAGE_TITLES: Record<AppPage, string> = {
  home: 'PC Builder Simulator',
  build: 'Ensamblar PC',
  learn: 'Aprender',
  achievements: 'Logros',
};

interface HeaderProps {
  page: AppPage;
  buildProgress: number;
  mode: 'light' | 'dark';
  onToggleMode: () => void;
}

export default function Header({ page, buildProgress, mode, onToggleMode }: HeaderProps) {
  return (
    <AppBar position="sticky" elevation={0} sx={{ borderBottom: 1, borderColor: 'divider' }}>
      <Toolbar sx={{ minHeight: 56 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, flex: 1 }}>
          <MemoryIcon sx={{ color: 'primary.main' }} />
          <Typography variant="h6" sx={{ fontWeight: 700, fontSize: '1rem' }}>
            {PAGE_TITLES[page]}
          </Typography>
        </Box>
        {page === 'build' && (
          <Box sx={{ flex: 1, mx: 2 }}>
            <Typography variant="caption" sx={{ color: 'text.secondary', display: 'block', mb: 0.5 }}>
              {buildProgress}% completado
            </Typography>
            <LinearProgress
              variant="determinate"
              value={buildProgress}
              sx={{ height: 6, borderRadius: 3 }}
            />
          </Box>
        )}
        <Tooltip title={mode === 'dark' ? 'Modo claro' : 'Modo oscuro'}>
          <IconButton onClick={onToggleMode} color="inherit" size="small">
            {mode === 'dark' ? <LightModeIcon /> : <DarkModeIcon />}
          </IconButton>
        </Tooltip>
      </Toolbar>
    </AppBar>
  );
}
