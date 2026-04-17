import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardActionArea from '@mui/material/CardActionArea';
import Chip from '@mui/material/Chip';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import LockIcon from '@mui/icons-material/Lock';
import { PC_COMPONENTS, TUTORIAL_ORDER } from '../../data/components';
import type { PCComponent, ComponentType } from '../../data/components';

interface ComponentCardProps {
  component: PCComponent;
  isInstalled: boolean;
  isLocked: boolean;
  isNext: boolean;
  onClick: () => void;
}

function ComponentCard({ component, isInstalled, isLocked, isNext, onClick }: ComponentCardProps) {
  return (
    <Card
      elevation={0}
      sx={{
        border: '2px solid',
        borderColor: isInstalled
          ? component.color
          : isNext
            ? 'primary.main'
            : isLocked
              ? 'divider'
              : 'divider',
        opacity: isLocked ? 0.5 : 1,
        transition: 'all 0.2s ease',
        bgcolor: isInstalled ? `${component.color}10` : 'background.paper',
        flexShrink: 0,
        width: 160,
      }}
    >
      <CardActionArea onClick={onClick} disabled={isLocked} sx={{ borderRadius: 1.5 }}>
        <CardContent sx={{ p: 1.5, '&:last-child': { pb: 1.5 } }}>
          <Box sx={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', mb: 1 }}>
            <Box
              sx={{
                width: 40,
                height: 40,
                borderRadius: 2,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                bgcolor: isInstalled ? `${component.color}20` : `${component.color}15`,
                fontSize: '1.4rem',
              }}
            >
              {isLocked ? (
                <LockIcon sx={{ fontSize: 20, color: 'text.disabled' }} />
              ) : isInstalled ? (
                <CheckCircleIcon sx={{ fontSize: 20, color: component.color }} />
              ) : (
                <span style={{ fontSize: '1.1rem' }}>
                  {['fan', 'motherboard', 'cpu', 'ram', 'gpu', 'storage', 'psu', 'cables'][
                    ['fan', 'motherboard', 'cpu', 'ram', 'gpu', 'storage', 'psu', 'cables'].indexOf(
                      component.type,
                    )
                  ] === component.type
                    ? ['💨', '🔲', '🔴', '🟩', '🎮', '💾', '⚡', '🔌'][
                        ['fan', 'motherboard', 'cpu', 'ram', 'gpu', 'storage', 'psu', 'cables'].indexOf(
                          component.type,
                        )
                      ]
                    : '🔧'}
                </span>
              )}
            </Box>
            {isNext && !isInstalled && (
              <Chip
                label="Sig."
                size="small"
                color="primary"
                sx={{ fontSize: '0.6rem', height: 18, fontWeight: 700 }}
              />
            )}
          </Box>
          <Typography
            variant="caption"
            sx={{
              color: 'text.secondary',
              display: 'block',
              fontSize: '0.6rem',
              textTransform: 'uppercase',
              letterSpacing: '0.05em',
              mb: 0.25,
            }}
          >
            {component.brand}
          </Typography>
          <Typography
            variant="body2"
            sx={{
              fontWeight: 700,
              fontSize: '0.75rem',
              lineHeight: 1.2,
              color: isInstalled ? component.color : 'text.primary',
            }}
          >
            {component.name}
          </Typography>
          <Typography
            variant="caption"
            sx={{ color: 'text.secondary', fontSize: '0.65rem', display: 'block', mt: 0.5 }}
          >
            {isInstalled ? 'Instalado' : isLocked ? 'Bloqueado' : 'Toca para ver'}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}

interface ComponentInventoryProps {
  installed: Partial<Record<ComponentType, PCComponent>>;
  isSandbox: boolean;
  tutorialStep: number;
  onSelect: (component: PCComponent) => void;
}

export default function ComponentInventory({
  installed,
  isSandbox,
  tutorialStep,
  onSelect,
}: ComponentInventoryProps) {
  const nextType = tutorialStep < TUTORIAL_ORDER.length ? TUTORIAL_ORDER[tutorialStep] : null;

  return (
    <Box>
      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 1.5 }}>
        <Typography variant="subtitle2" sx={{ fontWeight: 700 }}>
          Componentes disponibles
        </Typography>
        <Chip
          label={`${Object.keys(installed).length}/8`}
          size="small"
          variant="outlined"
          sx={{ fontSize: '0.7rem' }}
        />
      </Box>
      <Box
        sx={{
          display: 'flex',
          gap: 1.5,
          overflowX: 'auto',
          pb: 1,
          mx: -2,
          px: 2,
          '&::-webkit-scrollbar': { height: 4 },
          '&::-webkit-scrollbar-thumb': {
            bgcolor: 'divider',
            borderRadius: 2,
          },
        }}
      >
        {PC_COMPONENTS.map((component, index) => {
          const isInstalled = !!installed[component.type];
          const isLocked = !isSandbox && index > tutorialStep;
          const isNext = !isSandbox && component.type === nextType;
          return (
            <ComponentCard
              key={component.id}
              component={component}
              isInstalled={isInstalled}
              isLocked={isLocked}
              isNext={isNext}
              onClick={() => onSelect(component)}
            />
          );
        })}
      </Box>
    </Box>
  );
}
