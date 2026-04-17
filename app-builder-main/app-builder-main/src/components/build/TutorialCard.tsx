import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import LightbulbIcon from '@mui/icons-material/Lightbulb';
import { TUTORIAL_STEPS } from '../../data/tutorials';

interface TutorialCardProps {
  currentStep: number;
  isComplete: boolean;
}

export default function TutorialCard({ currentStep, isComplete }: TutorialCardProps) {
  if (isComplete) {
    return (
      <Box
        sx={{
          p: 2,
          borderRadius: 2,
          bgcolor: 'success.main',
          color: 'success.contrastText',
          textAlign: 'center',
        }}
      >
        <Typography variant="h6" sx={{ fontWeight: 700, mb: 0.5 }}>
          ¡Ensamblaje Completo!
        </Typography>
        <Typography variant="body2">
          Completaste el tutorial. ¡Felicitaciones, ya sabes cómo armar una PC!
        </Typography>
      </Box>
    );
  }

  if (currentStep >= TUTORIAL_STEPS.length) return null;
  const step = TUTORIAL_STEPS[currentStep];

  return (
    <Box
      sx={{
        p: 2,
        borderRadius: 2,
        border: '1px solid',
        borderColor: 'primary.main',
        bgcolor: 'background.paper',
      }}
    >
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1.5 }}>
        <Box
          sx={{
            width: 28,
            height: 28,
            borderRadius: '50%',
            bgcolor: 'primary.main',
            color: 'primary.contrastText',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontWeight: 700,
            fontSize: '0.8rem',
            flexShrink: 0,
          }}
        >
          {currentStep + 1}
        </Box>
        <Typography variant="subtitle2" sx={{ fontWeight: 700, color: 'primary.main' }}>
          {step.title}
        </Typography>
      </Box>

      <Typography variant="body2" sx={{ color: 'text.secondary', mb: 1.5, lineHeight: 1.6 }}>
        {step.description}
      </Typography>

      <Box
        sx={{
          p: 1.5,
          borderRadius: 1.5,
          bgcolor: 'warning.main',
          display: 'flex',
          gap: 1,
          alignItems: 'flex-start',
        }}
      >
        <LightbulbIcon sx={{ fontSize: 16, color: 'warning.contrastText', mt: 0.2, flexShrink: 0 }} />
        <Typography variant="caption" sx={{ color: 'warning.contrastText', lineHeight: 1.5 }}>
          <strong>Tip:</strong> {step.tip}
        </Typography>
      </Box>

      <Box
        sx={{
          mt: 1.5,
          overflow: 'hidden',
        }}
      >
        <Stepper activeStep={currentStep} alternativeLabel sx={{ px: 0 }}>
          {TUTORIAL_STEPS.map((s, i) => (
            <Step key={s.id} completed={i < currentStep}>
              <StepLabel
                sx={{
                  '& .MuiStepLabel-label': {
                    fontSize: '0.55rem',
                    display: { xs: 'none', sm: 'block' },
                  },
                }}
              >
                {s.title}
              </StepLabel>
            </Step>
          ))}
        </Stepper>
      </Box>
    </Box>
  );
}
