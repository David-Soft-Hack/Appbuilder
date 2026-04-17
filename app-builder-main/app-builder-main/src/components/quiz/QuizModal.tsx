import { useState, useCallback } from 'react';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import LinearProgress from '@mui/material/LinearProgress';
import Chip from '@mui/material/Chip';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CancelIcon from '@mui/icons-material/Cancel';
import QuizIcon from '@mui/icons-material/Quiz';
import { QUIZ_QUESTIONS } from '../../data/quizzes';

interface QuizModalProps {
  open: boolean;
  onClose: () => void;
  onAnswer: (correct: boolean) => void;
}

export default function QuizModal({ open, onClose, onAnswer }: QuizModalProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [score, setScore] = useState(0);
  const [finished, setFinished] = useState(false);

  const question = QUIZ_QUESTIONS[currentIndex];
  const progress = ((currentIndex) / QUIZ_QUESTIONS.length) * 100;
  const isAnswered = selectedOption !== null;
  const isCorrect = selectedOption === question?.correctIndex;

  const handleSelect = useCallback(
    (index: number) => {
      if (isAnswered) return;
      setSelectedOption(index);
      const correct = index === question.correctIndex;
      if (correct) setScore((s) => s + 1);
      onAnswer(correct);
    },
    [isAnswered, question, onAnswer],
  );

  const handleNext = useCallback(() => {
    if (currentIndex < QUIZ_QUESTIONS.length - 1) {
      setCurrentIndex((i) => i + 1);
      setSelectedOption(null);
    } else {
      setFinished(true);
    }
  }, [currentIndex]);

  const handleRestart = useCallback(() => {
    setCurrentIndex(0);
    setSelectedOption(null);
    setScore(0);
    setFinished(false);
  }, []);

  const handleClose = useCallback(() => {
    handleRestart();
    onClose();
  }, [handleRestart, onClose]);

  if (finished) {
    const percent = Math.round((score / QUIZ_QUESTIONS.length) * 100);
    return (
      <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth PaperProps={{ sx: { borderRadius: 3, mx: 2 } }}>
        <DialogContent sx={{ p: 3, textAlign: 'center' }}>
          <Box sx={{ fontSize: '3rem', mb: 2 }}>{percent >= 80 ? '🏆' : percent >= 60 ? '👍' : '📚'}</Box>
          <Typography variant="h5" sx={{ fontWeight: 700, mb: 1 }}>
            {percent >= 80 ? '¡Excelente!' : percent >= 60 ? '¡Buen trabajo!' : 'Sigue practicando'}
          </Typography>
          <Typography variant="body2" sx={{ color: 'text.secondary', mb: 2 }}>
            Obtuviste {score} de {QUIZ_QUESTIONS.length} respuestas correctas
          </Typography>
          <Box
            sx={{
              p: 2,
              borderRadius: 2,
              bgcolor: percent >= 80 ? 'success.main' : percent >= 60 ? 'warning.main' : 'error.main',
              color: 'white',
              mb: 3,
            }}
          >
            <Typography variant="h3" sx={{ fontWeight: 700 }}>
              {percent}%
            </Typography>
          </Box>
          <Box sx={{ display: 'flex', gap: 2 }}>
            <Button variant="outlined" fullWidth onClick={handleRestart}>
              Reintentar
            </Button>
            <Button variant="contained" fullWidth onClick={handleClose}>
              Cerrar
            </Button>
          </Box>
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      maxWidth="sm"
      fullWidth
      PaperProps={{ sx: { borderRadius: 3, mx: 2 } }}
    >
      <DialogContent sx={{ p: 0 }}>
        <Box sx={{ p: 2, borderBottom: '1px solid', borderColor: 'divider' }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1.5 }}>
            <QuizIcon color="primary" />
            <Typography variant="subtitle1" sx={{ fontWeight: 700 }}>
              Quiz de Hardware
            </Typography>
            <Chip
              label={`${currentIndex + 1}/${QUIZ_QUESTIONS.length}`}
              size="small"
              color="primary"
              sx={{ ml: 'auto', fontWeight: 700 }}
            />
          </Box>
          <LinearProgress variant="determinate" value={progress} sx={{ height: 6, borderRadius: 3 }} />
        </Box>

        <Box sx={{ p: 2 }}>
          <Box
            sx={{
              p: 2,
              borderRadius: 2,
              bgcolor: 'background.default',
              mb: 2,
            }}
          >
            <Typography variant="subtitle1" sx={{ fontWeight: 600, lineHeight: 1.4 }}>
              {question.question}
            </Typography>
          </Box>

          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1, mb: 2 }}>
            {question.options.map((option, index) => {
              let bgcolor = 'background.paper';
              let borderColor = 'divider';
              let textColor = 'text.primary';

              if (isAnswered) {
                if (index === question.correctIndex) {
                  bgcolor = 'success.main';
                  borderColor = 'success.main';
                  textColor = 'success.contrastText';
                } else if (index === selectedOption) {
                  bgcolor = 'error.main';
                  borderColor = 'error.main';
                  textColor = 'error.contrastText';
                } else {
                  bgcolor = 'action.disabledBackground';
                  textColor = 'text.disabled';
                }
              } else if (selectedOption === null) {
                bgcolor = 'background.paper';
              }

              return (
                <Box
                  key={index}
                  onClick={() => handleSelect(index)}
                  sx={{
                    p: 1.5,
                    borderRadius: 2,
                    border: '2px solid',
                    borderColor,
                    bgcolor,
                    cursor: isAnswered ? 'default' : 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: 1.5,
                    transition: 'all 0.2s',
                    '&:hover': !isAnswered
                      ? { borderColor: 'primary.main', bgcolor: 'action.hover' }
                      : {},
                  }}
                >
                  <Box
                    sx={{
                      width: 28,
                      height: 28,
                      borderRadius: '50%',
                      border: '2px solid',
                      borderColor: isAnswered && index === question.correctIndex
                        ? 'success.contrastText'
                        : isAnswered && index === selectedOption
                          ? 'error.contrastText'
                          : 'divider',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      flexShrink: 0,
                    }}
                  >
                    {isAnswered && index === question.correctIndex ? (
                      <CheckCircleIcon sx={{ fontSize: 16, color: 'success.contrastText' }} />
                    ) : isAnswered && index === selectedOption ? (
                      <CancelIcon sx={{ fontSize: 16, color: 'error.contrastText' }} />
                    ) : (
                      <Typography variant="caption" sx={{ fontWeight: 700 }}>
                        {String.fromCharCode(65 + index)}
                      </Typography>
                    )}
                  </Box>
                  <Typography variant="body2" sx={{ color: textColor, fontWeight: 500, flex: 1 }}>
                    {option}
                  </Typography>
                </Box>
              );
            })}
          </Box>

          {isAnswered && (
            <Box
              sx={{
                p: 1.5,
                borderRadius: 2,
                bgcolor: isCorrect ? 'success.main' : 'error.main',
                mb: 2,
              }}
            >
              <Typography variant="body2" sx={{ color: 'white', fontWeight: 500 }}>
                <strong>{isCorrect ? '¡Correcto! ' : 'Incorrecto. '}</strong>
                {question.explanation}
              </Typography>
            </Box>
          )}

          {isAnswered && (
            <Button variant="contained" fullWidth size="large" onClick={handleNext} sx={{ borderRadius: 2 }}>
              {currentIndex < QUIZ_QUESTIONS.length - 1 ? 'Siguiente pregunta' : 'Ver resultados'}
            </Button>
          )}
        </Box>
      </DialogContent>
    </Dialog>
  );
}
