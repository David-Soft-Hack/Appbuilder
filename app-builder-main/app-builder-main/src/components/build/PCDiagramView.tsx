import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Tooltip from '@mui/material/Tooltip';
import { useTheme } from '@mui/material/styles';
import type { PCComponent, ComponentType } from '../../data/components';

interface ComponentSlot {
  type: ComponentType;
  x: number;
  y: number;
  width: number;
  height: number;
  label: string;
}

const SLOT_POSITIONS: ComponentSlot[] = [
  { type: 'psu', x: 10, y: 75, width: 20, height: 20, label: 'PSU' },
  { type: 'fan', x: 35, y: 10, width: 15, height: 15, label: 'Fan' },
  { type: 'motherboard', x: 35, y: 30, width: 55, height: 50, label: 'Motherboard' },
  { type: 'cpu', x: 40, y: 35, width: 10, height: 10, label: 'CPU' },
  { type: 'ram', x: 53, y: 35, width: 8, height: 15, label: 'RAM' },
  { type: 'gpu', x: 65, y: 45, width: 20, height: 15, label: 'GPU' },
  { type: 'storage', x: 10, y: 50, width: 20, height: 15, label: 'SSD' },
  { type: 'cables', x: 10, y: 30, width: 20, height: 15, label: 'Cables' },
];

interface PCDiagramViewProps {
  installed: Partial<Record<ComponentType, PCComponent>>;
  onComponentClick: (type: ComponentType) => void;
  nextType: ComponentType | null;
}

export default function PCDiagramView({ installed, onComponentClick, nextType }: PCDiagramViewProps) {
  const theme = useTheme();
  const isDark = theme.palette.mode === 'dark';

  const getComponentColor = (component: PCComponent | undefined): string => {
    if (!component) return theme.palette.action.disabled;
    return component.color;
  };

  const getSlotStyle = (slot: ComponentSlot) => {
    const component = installed[slot.type];
    const isNext = nextType === slot.type;
    const isInstalled = !!component;

    return {
      position: 'absolute' as const,
      left: `${slot.x}%`,
      top: `${slot.y}%`,
      width: `${slot.width}%`,
      height: `${slot.height}%`,
      borderRadius: 1,
      border: '2px solid',
      borderColor: isInstalled
        ? getComponentColor(component)
        : isNext
          ? theme.palette.primary.main
          : theme.palette.divider,
      backgroundColor: isInstalled
        ? `${getComponentColor(component)}20`
        : isNext
          ? `${theme.palette.primary.main}15`
          : `${theme.palette.action.hover}`,
      cursor: 'pointer',
      transition: theme.transitions.create(['all'], {
        duration: theme.transitions.duration.short,
      }),
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      '&:hover': {
        borderColor: isInstalled ? getComponentColor(component) : theme.palette.primary.main,
        transform: 'scale(1.05)',
        boxShadow: isInstalled
          ? `0 0 16px ${getComponentColor(component)}40`
          : `0 0 12px ${theme.palette.primary.main}30`,
      },
      ...(isNext && !isInstalled && {
        animation: 'pulse 2s infinite',
        '@keyframes pulse': {
          '0%, 100%': { opacity: 1 },
          '50%': { opacity: 0.6 },
        },
      }),
    };
  };

  return (
    <Box
      sx={{
        bgcolor: isDark ? '#0A1428' : '#F0F7FF',
        borderRadius: 3,
        border: '2px solid',
        borderColor: 'divider',
        overflow: 'hidden',
        p: 2,
        mb: 2,
      }}
    >
      <Typography variant="subtitle2" sx={{ fontWeight: 700, mb: 1.5, ml: 1 }}>
        Diagrama del Gabinete (Vista Superior)
      </Typography>

      <Box
        sx={{
          position: 'relative',
          width: '100%',
          paddingBottom: '100%',
          bgcolor: isDark ? '#0F172A' : '#FFFFFF',
          borderRadius: 2,
          border: '3px solid',
          borderColor: theme.palette.primary.main,
          overflow: 'hidden',
          boxShadow: isDark ? 'inset 0 0 20px rgba(56,189,248,0.1)' : 'inset 0 0 15px rgba(14,165,233,0.08)',
        }}
      >
        {SLOT_POSITIONS.map((slot) => {
          const component = installed[slot.type];

          return (
            <Tooltip
              key={slot.type}
              title={
                component
                  ? `${component.name} - ${component.brand} instalado`
                  : `Instala aquí: ${slot.label}`
              }
              placement="top"
            >
              <Box
                onClick={() => onComponentClick(slot.type)}
                sx={getSlotStyle(slot)}
              >
                <Box sx={{ textAlign: 'center', pointerEvents: 'none' }}>
                  <Typography
                    variant="caption"
                    sx={{
                      fontWeight: 700,
                      fontSize: '0.5rem',
                      color: component ? getComponentColor(component) : 'text.secondary',
                      textTransform: 'uppercase',
                      letterSpacing: '0.05em',
                    }}
                  >
                    {slot.label}
                  </Typography>
                  {component && (
                    <Typography
                      variant="caption"
                      sx={{
                        fontSize: '0.45rem',
                        color: component.color,
                        display: 'block',
                        mt: 0.25,
                        fontWeight: 600,
                      }}
                    >
                      ✓
                    </Typography>
                  )}
                </Box>
              </Box>
            </Tooltip>
          );
        })}
      </Box>

      <Box sx={{ display: 'flex', gap: 1, mt: 1.5, flexWrap: 'wrap', justifyContent: 'center' }}>
        {SLOT_POSITIONS.map((slot) => {
          const component = installed[slot.type];
          const isNext = nextType === slot.type;

          return (
            <Box
              key={slot.type}
              sx={{
                display: 'flex',
                alignItems: 'center',
                gap: 0.5,
                px: 1,
                py: 0.5,
                borderRadius: 1,
                bgcolor: component
                  ? `${getComponentColor(component)}15`
                  : isNext
                    ? `${theme.palette.primary.main}15`
                    : 'action.hover',
                border: '1px solid',
                borderColor: component
                  ? getComponentColor(component)
                  : isNext
                    ? theme.palette.primary.main
                    : 'divider',
              }}
            >
              <Box
                sx={{
                  width: 8,
                  height: 8,
                  borderRadius: '50%',
                  bgcolor: component ? getComponentColor(component) : 'text.disabled',
                }}
              />
              <Typography
                variant="caption"
                sx={{
                  fontSize: '0.7rem',
                  fontWeight: 600,
                  color: component ? getComponentColor(component) : 'text.secondary',
                }}
              >
                {slot.label}
              </Typography>
            </Box>
          );
        })}
      </Box>
    </Box>
  );
}
