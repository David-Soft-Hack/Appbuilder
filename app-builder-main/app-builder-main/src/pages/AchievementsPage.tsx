import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Chip from '@mui/material/Chip';
import LinearProgress from '@mui/material/LinearProgress';
import Divider from '@mui/material/Divider';
import LockIcon from '@mui/icons-material/Lock';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';
import StarIcon from '@mui/icons-material/Star';
import MemoryIcon from '@mui/icons-material/Memory';
import SpeedIcon from '@mui/icons-material/Speed';
import MonitorIcon from '@mui/icons-material/Monitor';
import StorageIcon from '@mui/icons-material/Storage';
import PowerIcon from '@mui/icons-material/Power';
import EmojiEventsOutlinedIcon from '@mui/icons-material/EmojiEventsOutlined';
import SchoolIcon from '@mui/icons-material/School';
import MenuBookIcon from '@mui/icons-material/MenuBook';
import type { Achievement } from '../data/achievements';

const ICON_MAP: Record<string, React.ReactNode> = {
  star: <StarIcon />,
  circuit: <MemoryIcon />,
  memory: <MemoryIcon />,
  speed: <SpeedIcon />,
  monitor: <MonitorIcon />,
  storage: <StorageIcon />,
  power: <PowerIcon />,
  trophy: <EmojiEventsIcon />,
  school: <SchoolIcon />,
  emoji_events: <EmojiEventsIcon />,
  menu_book: <MenuBookIcon />,
};

interface AchievementCardProps {
  achievement: Achievement;
  unlocked: boolean;
}

function AchievementCard({ achievement, unlocked }: AchievementCardProps) {
  return (
    <Card
      elevation={0}
      sx={{
        border: '1px solid',
        borderColor: unlocked ? achievement.color : 'divider',
        bgcolor: unlocked ? `${achievement.color}08` : 'background.paper',
        opacity: unlocked ? 1 : 0.6,
        transition: 'all 0.3s ease',
        ...(unlocked && {
          boxShadow: `0 0 12px ${achievement.color}20`,
        }),
      }}
    >
      <CardContent sx={{ p: 2, '&:last-child': { pb: 2 } }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
          <Box
            sx={{
              width: 48,
              height: 48,
              borderRadius: 2,
              bgcolor: unlocked ? `${achievement.color}20` : 'action.disabledBackground',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: unlocked ? achievement.color : 'text.disabled',
              flexShrink: 0,
            }}
          >
            {unlocked ? (ICON_MAP[achievement.icon] ?? <EmojiEventsOutlinedIcon />) : <LockIcon />}
          </Box>
          <Box sx={{ flex: 1 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 0.25 }}>
              <Typography
                variant="subtitle2"
                sx={{
                  fontWeight: 700,
                  color: unlocked ? achievement.color : 'text.disabled',
                }}
              >
                {achievement.title}
              </Typography>
              {unlocked && (
                <Chip
                  label="Obtenido"
                  size="small"
                  sx={{
                    height: 16,
                    fontSize: '0.6rem',
                    bgcolor: `${achievement.color}20`,
                    color: achievement.color,
                    fontWeight: 700,
                  }}
                />
              )}
            </Box>
            <Typography
              variant="caption"
              sx={{ color: unlocked ? 'text.secondary' : 'text.disabled' }}
            >
              {achievement.description}
            </Typography>
          </Box>
        </Box>
      </CardContent>
    </Card>
  );
}

interface AchievementsPageProps {
  unlocked: Achievement[];
  locked: Achievement[];
  buildProgress: number;
  quizCorrect: number;
  docsRead: number;
}

export default function AchievementsPage({
  unlocked,
  locked,
  buildProgress,
  quizCorrect,
  docsRead,
}: AchievementsPageProps) {
  const total = unlocked.length + locked.length;
  const progress = total > 0 ? Math.round((unlocked.length / total) * 100) : 0;

  return (
    <Box sx={{ p: 2 }}>
      <Box
        sx={{
          p: 2.5,
          borderRadius: 3,
          border: '1px solid',
          borderColor: 'warning.main',
          background: 'linear-gradient(135deg, rgba(245,158,11,0.1) 0%, rgba(251,191,36,0.05) 100%)',
          mb: 3,
          textAlign: 'center',
        }}
      >
        <EmojiEventsIcon sx={{ fontSize: 48, color: 'warning.main', mb: 1 }} />
        <Typography variant="h4" sx={{ fontWeight: 700, mb: 0.5 }}>
          {unlocked.length} / {total}
        </Typography>
        <Typography variant="body2" sx={{ color: 'text.secondary', mb: 2 }}>
          Logros desbloqueados
        </Typography>
        <LinearProgress
          variant="determinate"
          value={progress}
          sx={{
            height: 10,
            borderRadius: 5,
            bgcolor: 'rgba(245,158,11,0.15)',
            '& .MuiLinearProgress-bar': { bgcolor: 'warning.main', borderRadius: 5 },
          }}
        />
        <Typography variant="caption" sx={{ color: 'text.secondary', mt: 0.5, display: 'block' }}>
          {progress}% completado
        </Typography>
      </Box>

      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr 1fr',
          gap: 1.5,
          mb: 3,
        }}
      >
        <Box
          sx={{
            p: 1.5,
            borderRadius: 2,
            bgcolor: 'background.paper',
            border: '1px solid',
            borderColor: 'divider',
            textAlign: 'center',
          }}
        >
          <Typography variant="h6" sx={{ fontWeight: 700, color: 'primary.main' }}>
            {buildProgress}%
          </Typography>
          <Typography variant="caption" sx={{ color: 'text.secondary' }}>
            Build
          </Typography>
        </Box>
        <Box
          sx={{
            p: 1.5,
            borderRadius: 2,
            bgcolor: 'background.paper',
            border: '1px solid',
            borderColor: 'divider',
            textAlign: 'center',
          }}
        >
          <Typography variant="h6" sx={{ fontWeight: 700, color: 'success.main' }}>
            {quizCorrect}
          </Typography>
          <Typography variant="caption" sx={{ color: 'text.secondary' }}>
            Quiz
          </Typography>
        </Box>
        <Box
          sx={{
            p: 1.5,
            borderRadius: 2,
            bgcolor: 'background.paper',
            border: '1px solid',
            borderColor: 'divider',
            textAlign: 'center',
          }}
        >
          <Typography variant="h6" sx={{ fontWeight: 700, color: 'warning.main' }}>
            {docsRead}
          </Typography>
          <Typography variant="caption" sx={{ color: 'text.secondary' }}>
            Leídos
          </Typography>
        </Box>
      </Box>

      {unlocked.length > 0 && (
        <>
          <Divider sx={{ mb: 2 }}>
            <Typography variant="caption" sx={{ color: 'text.secondary', fontWeight: 600 }}>
              DESBLOQUEADOS ({unlocked.length})
            </Typography>
          </Divider>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5, mb: 2 }}>
            {unlocked.map((ach) => (
              <AchievementCard key={ach.id} achievement={ach} unlocked={true} />
            ))}
          </Box>
        </>
      )}

      {locked.length > 0 && (
        <>
          <Divider sx={{ mb: 2 }}>
            <Typography variant="caption" sx={{ color: 'text.secondary', fontWeight: 600 }}>
              BLOQUEADOS ({locked.length})
            </Typography>
          </Divider>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5 }}>
            {locked.map((ach) => (
              <AchievementCard key={ach.id} achievement={ach} unlocked={false} />
            ))}
          </Box>
        </>
      )}
    </Box>
  );
}
