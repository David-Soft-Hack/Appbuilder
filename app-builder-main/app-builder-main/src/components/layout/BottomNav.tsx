import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import Paper from '@mui/material/Paper';
import HomeIcon from '@mui/icons-material/Home';
import BuildIcon from '@mui/icons-material/Build';
import MenuBookIcon from '@mui/icons-material/MenuBook';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';
import type { AppPage } from '../../hooks/useBuildSimulator';

interface BottomNavProps {
  page: AppPage;
  onChangePage: (page: AppPage) => void;
}

const NAV_ITEMS: { label: string; value: AppPage; icon: React.ReactNode }[] = [
  { label: 'Inicio', value: 'home', icon: <HomeIcon /> },
  { label: 'Ensamblar', value: 'build', icon: <BuildIcon /> },
  { label: 'Aprender', value: 'learn', icon: <MenuBookIcon /> },
  { label: 'Logros', value: 'achievements', icon: <EmojiEventsIcon /> },
];

export default function BottomNav({ page, onChangePage }: BottomNavProps) {
  return (
    <Paper
      elevation={0}
      sx={{
        position: 'fixed',
        bottom: 0,
        left: 0,
        right: 0,
        borderTop: 1,
        borderColor: 'divider',
        zIndex: 'appBar',
      }}
    >
      <BottomNavigation
        value={page}
        onChange={(_, newValue: AppPage) => onChangePage(newValue)}
        showLabels
      >
        {NAV_ITEMS.map((item) => (
          <BottomNavigationAction
            key={item.value}
            label={item.label}
            value={item.value}
            icon={item.icon}
            sx={{ fontSize: '0.65rem' }}
          />
        ))}
      </BottomNavigation>
    </Paper>
  );
}
