import { createTheme } from '@mui/material/styles';

export function buildTheme(mode: 'light' | 'dark') {
  return createTheme({
    palette: {
      mode,
      primary: { main: mode === 'light' ? '#0EA5E9' : '#38BDF8' },
      secondary: { main: mode === 'light' ? '#F97316' : '#FB923C' },
      background: {
        default: mode === 'light' ? '#EFF6FF' : '#080D1A',
        paper: mode === 'light' ? '#FFFFFF' : '#0F172A',
      },
      success: { main: mode === 'light' ? '#10B981' : '#34D399' },
      error: { main: mode === 'light' ? '#EF4444' : '#F87171' },
      warning: { main: '#F59E0B' },
    },
    typography: {
      fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
      h4: { fontWeight: 700 },
      h5: { fontWeight: 700 },
      h6: { fontWeight: 600 },
      subtitle1: { fontWeight: 500 },
      subtitle2: { fontWeight: 500 },
    },
    shape: { borderRadius: 12 },
    components: {
      MuiButton: {
        styleOverrides: {
          root: { textTransform: 'none', fontWeight: 600, borderRadius: 10 },
        },
      },
      MuiCard: {
        styleOverrides: {
          root: { borderRadius: 16 },
        },
      },
      MuiChip: {
        styleOverrides: {
          root: { fontWeight: 600 },
        },
      },
      MuiBottomNavigation: {
        styleOverrides: {
          root: { height: 64 },
        },
      },
    },
  });
}

export default buildTheme('dark');
