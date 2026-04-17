import { useState, useEffect } from 'react';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import LinearProgress from '@mui/material/LinearProgress';
import PowerSettingsNewIcon from '@mui/icons-material/PowerSettingsNew';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';

const BOOT_SEQUENCE = [
  'Iniciando POST (Power-On Self Test)...',
  'Detectando CPU: AMD Ryzen 5 5600X @ 3.7GHz',
  'Detectando RAM: 16GB DDR4 3200MHz — Dual Channel',
  'Detectando GPU: NVIDIA GeForce RTX 3060 12GB',
  'Detectando almacenamiento: Samsung 970 EVO 1TB NVMe',
  'Verificando integridad del sistema...',
  'Cargando gestor de arranque...',
  '¡Sistema iniciado correctamente!',
];

interface PowerOnModalProps {
  open: boolean;
  onClose: () => void;
}

export default function PowerOnModal({ open, onClose }: PowerOnModalProps) {
  const [step, setStep] = useState(0);
  const [complete, setComplete] = useState(false);

  useEffect(() => {
    if (!open) {
      setStep(0);
      setComplete(false);
      return;
    }
    const interval = setInterval(() => {
      setStep((s) => {
        if (s >= BOOT_SEQUENCE.length - 1) {
          setComplete(true);
          clearInterval(interval);
          return s;
        }
        return s + 1;
      });
    }, 700);
    return () => clearInterval(interval);
  }, [open]);

  const progress = ((step + 1) / BOOT_SEQUENCE.length) * 100;

  return (
    <Dialog
      open={open}
      maxWidth="sm"
      fullWidth
      PaperProps={{
        sx: {
          bgcolor: '#0A0F1E',
          borderRadius: 3,
          mx: 2,
          border: '1px solid rgba(56, 189, 248, 0.3)',
          boxShadow: '0 0 40px rgba(56, 189, 248, 0.2)',
        },
      }}
    >
      <DialogContent sx={{ p: 3 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 3 }}>
          <Box
            sx={{
              width: 44,
              height: 44,
              borderRadius: '50%',
              bgcolor: complete ? 'success.main' : '#38BDF820',
              border: '2px solid',
              borderColor: complete ? 'success.main' : '#38BDF8',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              animation: !complete ? 'glow 1.5s infinite alternate' : 'none',
              '@keyframes glow': {
                from: { boxShadow: '0 0 8px rgba(56, 189, 248, 0.3)' },
                to: { boxShadow: '0 0 20px rgba(56, 189, 248, 0.8)' },
              },
            }}
          >
            {complete ? (
              <CheckCircleIcon sx={{ color: 'success.main' }} />
            ) : (
              <PowerSettingsNewIcon sx={{ color: '#38BDF8' }} />
            )}
          </Box>
          <Box>
            <Typography variant="h6" sx={{ color: '#38BDF8', fontWeight: 700 }}>
              {complete ? '¡PC Encendida!' : 'Encendiendo sistema...'}
            </Typography>
            <Typography variant="caption" sx={{ color: 'rgba(255,255,255,0.5)' }}>
              BIOS v2.4.1 — PC Builder Simulator
            </Typography>
          </Box>
        </Box>

        <Box
          sx={{
            bgcolor: '#000',
            borderRadius: 2,
            p: 2,
            fontFamily: 'monospace',
            mb: 2,
            minHeight: 200,
            border: '1px solid rgba(56, 189, 248, 0.2)',
          }}
        >
          {BOOT_SEQUENCE.slice(0, step + 1).map((line, i) => (
            <Box
              key={i}
              sx={{
                display: 'flex',
                alignItems: 'center',
                gap: 1,
                mb: 0.5,
                animation: i === step ? 'fadeIn 0.3s ease' : 'none',
                '@keyframes fadeIn': { from: { opacity: 0, x: -10 }, to: { opacity: 1, x: 0 } },
              }}
            >
              <Typography
                variant="caption"
                sx={{
                  color: i === BOOT_SEQUENCE.length - 1 ? '#10B981' : '#38BDF8',
                  fontFamily: 'monospace',
                  fontSize: '0.7rem',
                  lineHeight: 1.8,
                }}
              >
                {i === BOOT_SEQUENCE.length - 1 ? '✓ ' : '> '}
                {line}
                {i === step && !complete && (
                  <Box
                    component="span"
                    sx={{
                      display: 'inline-block',
                      width: 8,
                      height: 14,
                      bgcolor: '#38BDF8',
                      ml: 0.5,
                      verticalAlign: 'text-bottom',
                      animation: 'blink 1s infinite',
                      '@keyframes blink': {
                        '0%, 100%': { opacity: 1 },
                        '50%': { opacity: 0 },
                      },
                    }}
                  />
                )}
              </Typography>
            </Box>
          ))}
        </Box>

        <LinearProgress
          variant="determinate"
          value={progress}
          sx={{
            height: 8,
            borderRadius: 4,
            mb: 3,
            bgcolor: 'rgba(56, 189, 248, 0.1)',
            '& .MuiLinearProgress-bar': {
              bgcolor: complete ? 'success.main' : '#38BDF8',
              borderRadius: 4,
            },
          }}
        />

        {complete && (
          <Box sx={{ textAlign: 'center' }}>
            <Typography variant="h5" sx={{ color: '#10B981', fontWeight: 700, mb: 1 }}>
              ¡Ensamblaje exitoso!
            </Typography>
            <Typography variant="body2" sx={{ color: 'rgba(255,255,255,0.6)', mb: 2 }}>
              Tu PC está funcionando correctamente. Eres un experto en ensamblaje.
            </Typography>
            <Button variant="contained" onClick={onClose} sx={{ bgcolor: '#10B981', '&:hover': { bgcolor: '#059669' } }}>
              Continuar
            </Button>
          </Box>
        )}
      </DialogContent>
    </Dialog>
  );
}
