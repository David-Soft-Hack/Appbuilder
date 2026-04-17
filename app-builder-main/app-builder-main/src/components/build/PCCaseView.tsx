import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Chip from '@mui/material/Chip';
import Tooltip from '@mui/material/Tooltip';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import { SLOTS } from '../../data/components';
import type { PCComponent, ComponentType } from '../../data/components';

const COMPONENT_ICONS: Record<ComponentType, string> = {
  fan: '💨',
  motherboard: '🔲',
  cpu: '🔴',
  ram: '🟩',
  gpu: '🎮',
  storage: '💾',
  psu: '⚡',
  cables: '🔌',
};

interface SlotProps {
  label: string;
  type: ComponentType;
  component: PCComponent | null;
  isNext: boolean;
  onClick: () => void;
}

function CaseSlot({ label, type, component, isNext, onClick }: SlotProps) {
  const installed = component !== null;
  return (
    <Tooltip title={installed ? component.name : `Instalar ${label}`} placement="right">
      <Box
        onClick={onClick}
        sx={{
          display: 'flex',
          alignItems: 'center',
          gap: 1.5,
          p: 1.5,
          borderRadius: 2,
          cursor: 'pointer',
          border: '2px solid',
          borderColor: installed
            ? component.color
            : isNext
              ? 'primary.main'
              : 'divider',
          bgcolor: installed
            ? `${component.color}18`
            : isNext
              ? 'primary.main'
              : 'transparent',
          transition: 'all 0.25s ease',
          position: 'relative',
          '&:hover': {
            borderColor: installed ? component.color : 'primary.main',
            bgcolor: installed ? `${component.color}28` : 'primary.main',
            transform: 'translateX(4px)',
          },
          ...(isNext && !installed && {
            animation: 'pulse 2s infinite',
            '@keyframes pulse': {
              '0%, 100%': { opacity: 1 },
              '50%': { opacity: 0.6 },
            },
          }),
        }}
      >
        <Box
          sx={{
            width: 36,
            height: 36,
            borderRadius: 1.5,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '1.2rem',
            bgcolor: installed ? `${component.color}30` : isNext ? 'rgba(255,255,255,0.2)' : 'action.hover',
            flexShrink: 0,
          }}
        >
          {COMPONENT_ICONS[type]}
        </Box>
        <Box sx={{ flex: 1, minWidth: 0 }}>
          <Typography
            variant="caption"
            sx={{
              color: installed
                ? component.color
                : isNext
                  ? 'primary.contrastText'
                  : 'text.secondary',
              fontWeight: 600,
              display: 'block',
              fontSize: '0.65rem',
              textTransform: 'uppercase',
              letterSpacing: '0.05em',
            }}
          >
            {label}
          </Typography>
          <Typography
            variant="body2"
            sx={{
              fontWeight: 600,
              color: installed
                ? 'text.primary'
                : isNext
                  ? 'primary.contrastText'
                  : 'text.disabled',
              fontSize: '0.8rem',
              whiteSpace: 'nowrap',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
            }}
          >
            {installed ? component.model : 'Vacío — toca para instalar'}
          </Typography>
        </Box>
        {installed ? (
          <CheckCircleIcon sx={{ color: component.color, fontSize: 20, flexShrink: 0 }} />
        ) : (
          <AddCircleOutlineIcon
            sx={{
              color: isNext ? 'primary.contrastText' : 'text.disabled',
              fontSize: 20,
              flexShrink: 0,
            }}
          />
        )}
      </Box>
    </Tooltip>
  );
}

interface PCCaseViewProps {
  installed: Partial<Record<ComponentType, PCComponent>>;
  nextType: ComponentType | null;
  isSandbox: boolean;
  onSlotClick: (type: ComponentType) => void;
  buildProgress: number;
}

export default function PCCaseView({
  installed,
  nextType,
  isSandbox,
  onSlotClick,
  buildProgress,
}: PCCaseViewProps) {
  const installedCount = Object.keys(installed).length;

  return (
    <Box
      sx={{
        bgcolor: 'background.paper',
        borderRadius: 3,
        border: '2px solid',
        borderColor: buildProgress === 100 ? 'success.main' : 'divider',
        overflow: 'hidden',
        boxShadow: buildProgress === 100 ? '0 0 24px rgba(16,185,129,0.25)' : 1,
        transition: 'all 0.5s ease',
      }}
    >
      <Box
        sx={{
          bgcolor: 'action.hover',
          px: 2,
          py: 1.5,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          borderBottom: '1px solid',
          borderColor: 'divider',
        }}
      >
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <Box
            sx={{
              width: 10,
              height: 10,
              borderRadius: '50%',
              bgcolor: buildProgress === 100 ? 'success.main' : 'text.disabled',
              boxShadow: buildProgress === 100 ? '0 0 8px rgba(16,185,129,0.8)' : 'none',
              transition: 'all 0.3s',
            }}
          />
          <Box sx={{ width: 8, height: 8, borderRadius: '50%', bgcolor: 'text.disabled' }} />
          <Box sx={{ width: 8, height: 8, borderRadius: '50%', bgcolor: 'text.disabled' }} />
          <Typography variant="caption" sx={{ ml: 1, color: 'text.secondary', fontWeight: 600 }}>
            Gabinete ATX
          </Typography>
        </Box>
        <Chip
          label={`${installedCount}/8 piezas`}
          size="small"
          color={buildProgress === 100 ? 'success' : 'default'}
          variant={buildProgress === 100 ? 'filled' : 'outlined'}
          sx={{ fontWeight: 600, fontSize: '0.7rem' }}
        />
      </Box>

      <Box sx={{ p: 1.5, display: 'flex', flexDirection: 'column', gap: 1 }}>
        {SLOTS.map((slot) => (
          <CaseSlot
            key={slot.id}
            label={slot.label}
            type={slot.type}
            component={installed[slot.type] ?? null}
            isNext={!isSandbox && nextType === slot.type}
            onClick={() => onSlotClick(slot.type)}
          />
        ))}
      </Box>
    </Box>
  );
}
