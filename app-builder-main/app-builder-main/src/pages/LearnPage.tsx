import { useState } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Card from '@mui/material/Card';
import CardActionArea from '@mui/material/CardActionArea';
import CardContent from '@mui/material/CardContent';
import Chip from '@mui/material/Chip';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import QuizIcon from '@mui/icons-material/Quiz';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import MenuBookIcon from '@mui/icons-material/MenuBook';
import { PC_COMPONENTS } from '../data/components';
import type { PCComponent, ComponentType } from '../data/components';
import ComponentDocModal from '../components/build/ComponentDocModal';
import QuizModal from '../components/quiz/QuizModal';

const COMPONENT_EMOJIS: Record<ComponentType, string> = {
  fan: '💨',
  motherboard: '🔲',
  cpu: '🔴',
  ram: '🟩',
  gpu: '🎮',
  storage: '💾',
  psu: '⚡',
  cables: '🔌',
};

interface LearnPageProps {
  docsRead: ComponentType[];
  quizCorrect: number;
  totalQuizAnswered: number;
  onMarkDocRead: (type: ComponentType) => void;
  onRecordQuizAnswer: (correct: boolean) => void;
}

interface ComponentLearnCardProps {
  component: PCComponent;
  isRead: boolean;
  onClick: () => void;
}

function ComponentLearnCard({ component, isRead, onClick }: ComponentLearnCardProps) {
  return (
    <Card
      elevation={0}
      sx={{
        border: '1px solid',
        borderColor: isRead ? component.color : 'divider',
        bgcolor: isRead ? `${component.color}08` : 'background.paper',
        transition: 'all 0.2s',
      }}
    >
      <CardActionArea onClick={onClick} sx={{ borderRadius: 1.5 }}>
        <CardContent sx={{ p: 2 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
            <Box
              sx={{
                width: 48,
                height: 48,
                borderRadius: 2,
                bgcolor: `${component.color}18`,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '1.4rem',
                flexShrink: 0,
              }}
            >
              {COMPONENT_EMOJIS[component.type]}
            </Box>
            <Box sx={{ flex: 1, minWidth: 0 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 0.25 }}>
                <Typography
                  variant="subtitle2"
                  sx={{ fontWeight: 700, fontSize: '0.85rem', color: isRead ? component.color : 'text.primary' }}
                >
                  {component.name}
                </Typography>
                {isRead && <CheckCircleIcon sx={{ fontSize: 14, color: component.color }} />}
              </Box>
              <Typography
                variant="caption"
                sx={{ color: 'text.secondary', display: 'block', lineHeight: 1.4 }}
              >
                {component.shortDesc}
              </Typography>
              <Box sx={{ display: 'flex', gap: 0.5, mt: 0.75 }}>
                <Chip
                  label={component.brand}
                  size="small"
                  sx={{
                    fontSize: '0.6rem',
                    height: 16,
                    bgcolor: `${component.color}15`,
                    color: component.color,
                    fontWeight: 600,
                  }}
                />
                <Chip
                  label={isRead ? 'Leído' : 'Toca para leer'}
                  size="small"
                  variant="outlined"
                  sx={{ fontSize: '0.6rem', height: 16 }}
                />
              </Box>
            </Box>
          </Box>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}

export default function LearnPage({
  docsRead,
  quizCorrect,
  totalQuizAnswered,
  onMarkDocRead,
  onRecordQuizAnswer,
}: LearnPageProps) {
  const [selectedComponent, setSelectedComponent] = useState<PCComponent | null>(null);
  const [quizOpen, setQuizOpen] = useState(false);

  const handleOpenDoc = (component: PCComponent) => {
    setSelectedComponent(component);
    onMarkDocRead(component.type);
  };

  const accuracy = totalQuizAnswered > 0 ? Math.round((quizCorrect / totalQuizAnswered) * 100) : 0;

  return (
    <Box sx={{ p: 2 }}>
      <Box
        sx={{
          p: 2,
          borderRadius: 2,
          border: '1px solid',
          borderColor: 'divider',
          bgcolor: 'background.paper',
          mb: 2,
          display: 'flex',
          alignItems: 'center',
          gap: 2,
        }}
      >
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <MenuBookIcon color="primary" />
          <Box>
            <Typography variant="subtitle2" sx={{ fontWeight: 700 }}>
              Progreso de lectura
            </Typography>
            <Typography variant="caption" sx={{ color: 'text.secondary' }}>
              {docsRead.length} de {PC_COMPONENTS.length} componentes leídos
            </Typography>
          </Box>
        </Box>
        <Chip
          label={`${docsRead.length}/${PC_COMPONENTS.length}`}
          color="primary"
          sx={{ ml: 'auto', fontWeight: 700 }}
        />
      </Box>

      <Box
        sx={{
          p: 2,
          borderRadius: 2,
          border: '1px solid',
          borderColor: 'success.main',
          bgcolor: 'success.main',
          mb: 2,
          display: 'flex',
          alignItems: 'center',
          gap: 2,
        }}
      >
        <Box sx={{ flex: 1 }}>
          <Typography variant="subtitle2" sx={{ fontWeight: 700, color: 'success.contrastText' }}>
            Quiz de Hardware
          </Typography>
          <Typography variant="caption" sx={{ color: 'rgba(255,255,255,0.8)' }}>
            {totalQuizAnswered > 0
              ? `${quizCorrect} correctas · ${accuracy}% acierto`
              : '8 preguntas sobre componentes'}
          </Typography>
        </Box>
        <Button
          variant="contained"
          size="small"
          startIcon={<QuizIcon />}
          onClick={() => setQuizOpen(true)}
          sx={{ bgcolor: 'white', color: 'success.main', '&:hover': { bgcolor: 'rgba(255,255,255,0.9)' }, flexShrink: 0 }}
        >
          Jugar
        </Button>
      </Box>

      <Divider sx={{ my: 2 }}>
        <Typography variant="caption" sx={{ color: 'text.secondary', fontWeight: 600 }}>
          COMPONENTES
        </Typography>
      </Divider>

      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5 }}>
        {PC_COMPONENTS.map((component) => (
          <ComponentLearnCard
            key={component.id}
            component={component}
            isRead={docsRead.includes(component.type)}
            onClick={() => handleOpenDoc(component)}
          />
        ))}
      </Box>

      <ComponentDocModal
        component={selectedComponent}
        open={selectedComponent !== null}
        onClose={() => setSelectedComponent(null)}
        onInstall={() => {}}
        isInstalled={false}
      />

      <QuizModal
        open={quizOpen}
        onClose={() => setQuizOpen(false)}
        onAnswer={onRecordQuizAnswer}
      />
    </Box>
  );
}
