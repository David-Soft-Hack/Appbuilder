import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardActionArea from '@mui/material/CardActionArea';
import Chip from '@mui/material/Chip';
import BuildIcon from '@mui/icons-material/Build';
import MenuBookIcon from '@mui/icons-material/MenuBook';
import QuizIcon from '@mui/icons-material/Quiz';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import type { AppPage } from '../hooks/useBuildSimulator';

interface FeatureCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  color: string;
  tag: string;
  onClick: () => void;
}

function FeatureCard({ icon, title, description, color, tag, onClick }: FeatureCardProps) {
  return (
    <Card elevation={0} sx={{ border: '1px solid', borderColor: 'divider' }}>
      <CardActionArea onClick={onClick} sx={{ borderRadius: 2 }}>
        <CardContent sx={{ p: 2 }}>
          <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 1.5 }}>
            <Box
              sx={{
                width: 44,
                height: 44,
                borderRadius: 2,
                bgcolor: `${color}18`,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color,
                flexShrink: 0,
              }}
            >
              {icon}
            </Box>
            <Box sx={{ flex: 1 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 0.5 }}>
                <Typography variant="subtitle2" sx={{ fontWeight: 700 }}>
                  {title}
                </Typography>
                <Chip
                  label={tag}
                  size="small"
                  sx={{
                    fontSize: '0.6rem',
                    height: 18,
                    bgcolor: `${color}18`,
                    color,
                    fontWeight: 700,
                  }}
                />
              </Box>
              <Typography variant="caption" sx={{ color: 'text.secondary', lineHeight: 1.5 }}>
                {description}
              </Typography>
            </Box>
          </Box>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}

interface HomePageProps {
  onNavigate: (page: AppPage) => void;
  buildProgress: number;
  achievementsCount: number;
  quizScore: number;
}

export default function HomePage({ onNavigate, buildProgress, achievementsCount, quizScore }: HomePageProps) {
  return (
    <Box sx={{ p: 2 }}>
      <Box
        sx={{
          borderRadius: 3,
          p: 3,
          mb: 3,
          background: 'linear-gradient(135deg, #0EA5E922 0%, #F9731622 100%)',
          border: '1px solid',
          borderColor: 'divider',
          textAlign: 'center',
        }}
      >
        <Typography
          variant="h4"
          sx={{ fontWeight: 700, mb: 1, fontSize: { xs: '1.5rem', sm: '2rem' } }}
        >
          PC Builder
        </Typography>
        <Typography variant="body1" sx={{ color: 'text.secondary', mb: 2, fontSize: '0.9rem' }}>
          Aprende a armar una computadora paso a paso con este simulador interactivo
        </Typography>
        <Button
          variant="contained"
          size="large"
          startIcon={<BuildIcon />}
          onClick={() => onNavigate('build')}
          sx={{ borderRadius: 3, px: 4 }}
        >
          Comenzar a armar
        </Button>
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
          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', mb: 0.5 }}>
            <TrendingUpIcon sx={{ color: 'primary.main', fontSize: 20 }} />
          </Box>
          <Typography variant="h6" sx={{ fontWeight: 700, fontSize: '1.1rem', color: 'primary.main' }}>
            {buildProgress}%
          </Typography>
          <Typography variant="caption" sx={{ color: 'text.secondary' }}>
            Ensamblaje
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
          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', mb: 0.5 }}>
            <EmojiEventsIcon sx={{ color: 'warning.main', fontSize: 20 }} />
          </Box>
          <Typography variant="h6" sx={{ fontWeight: 700, fontSize: '1.1rem', color: 'warning.main' }}>
            {achievementsCount}
          </Typography>
          <Typography variant="caption" sx={{ color: 'text.secondary' }}>
            Logros
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
          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', mb: 0.5 }}>
            <QuizIcon sx={{ color: 'success.main', fontSize: 20 }} />
          </Box>
          <Typography variant="h6" sx={{ fontWeight: 700, fontSize: '1.1rem', color: 'success.main' }}>
            {quizScore}
          </Typography>
          <Typography variant="caption" sx={{ color: 'text.secondary' }}>
            Quiz score
          </Typography>
        </Box>
      </Box>

      <Typography variant="subtitle1" sx={{ fontWeight: 700, mb: 1.5 }}>
        Explorar
      </Typography>

      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5 }}>
        <FeatureCard
          icon={<BuildIcon />}
          title="Simulador de Ensamblaje"
          description="Arma tu PC virtual paso a paso en modo tutorial o sandbox libre"
          color="#0EA5E9"
          tag="Principal"
          onClick={() => onNavigate('build')}
        />
        <FeatureCard
          icon={<MenuBookIcon />}
          title="Biblioteca de Componentes"
          description="Aprende sobre cada pieza del hardware con documentación detallada"
          color="#F97316"
          tag="Educativo"
          onClick={() => onNavigate('learn')}
        />
        <FeatureCard
          icon={<QuizIcon />}
          title="Quiz de Hardware"
          description="Pon a prueba tus conocimientos con preguntas sobre componentes de PC"
          color="#10B981"
          tag="Quiz"
          onClick={() => onNavigate('learn')}
        />
        <FeatureCard
          icon={<EmojiEventsIcon />}
          title="Logros y Progreso"
          description="Desbloquea logros completando retos y aprendiendo sobre hardware"
          color="#F59E0B"
          tag="Gamificación"
          onClick={() => onNavigate('achievements')}
        />
      </Box>

      <Box
        sx={{
          mt: 3,
          p: 2,
          borderRadius: 2,
          bgcolor: 'background.paper',
          border: '1px solid',
          borderColor: 'divider',
        }}
      >
        <Typography variant="subtitle2" sx={{ fontWeight: 700, mb: 1 }}>
          Componentes que aprenderás
        </Typography>
        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.75 }}>
          {['Placa Madre', 'Procesador', 'RAM', 'GPU', 'SSD NVMe', 'PSU', 'Ventiladores', 'Cables'].map(
            (comp) => (
              <Chip key={comp} label={comp} size="small" variant="outlined" sx={{ fontSize: '0.7rem' }} />
            ),
          )}
        </Box>
      </Box>
    </Box>
  );
}
