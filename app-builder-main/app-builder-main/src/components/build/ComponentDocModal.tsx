import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Chip from '@mui/material/Chip';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import InfoIcon from '@mui/icons-material/Info';
import FunctionsIcon from '@mui/icons-material/Functions';
import BuildIcon from '@mui/icons-material/Build';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import type { PCComponent } from '../../data/components';

interface SectionProps {
  icon: React.ReactNode;
  title: string;
  content: string;
  color: string;
}

function DocSection({ icon, title, content, color }: SectionProps) {
  return (
    <Box
      sx={{
        p: 2,
        borderRadius: 2,
        border: '1px solid',
        borderColor: 'divider',
        bgcolor: 'background.paper',
      }}
    >
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
        <Box sx={{ color }}>{icon}</Box>
        <Typography variant="subtitle2" sx={{ fontWeight: 700, color }}>
          {title}
        </Typography>
      </Box>
      <Typography variant="body2" sx={{ color: 'text.secondary', lineHeight: 1.7 }}>
        {content}
      </Typography>
    </Box>
  );
}

interface ComponentDocModalProps {
  component: PCComponent | null;
  open: boolean;
  onClose: () => void;
  onInstall: (component: PCComponent) => void;
  isInstalled: boolean;
}

export default function ComponentDocModal({
  component,
  open,
  onClose,
  onInstall,
  isInstalled,
}: ComponentDocModalProps) {
  if (!component) return null;

  return (
    <Dialog
      open={open}
      onClose={onClose}
      fullScreen
      PaperProps={{
        sx: { bgcolor: 'background.default', maxWidth: 480, mx: 'auto' },
      }}
    >
      <DialogTitle sx={{ p: 0 }}>
        <Box
          sx={{
            p: 2,
            background: `linear-gradient(135deg, ${component.color}22 0%, ${component.color}08 100%)`,
            borderBottom: '1px solid',
            borderColor: 'divider',
          }}
        >
          <Box sx={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between' }}>
            <Box sx={{ flex: 1 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 0.5 }}>
                <Chip
                  label={component.brand}
                  size="small"
                  sx={{
                    bgcolor: `${component.color}20`,
                    color: component.color,
                    fontWeight: 700,
                    border: `1px solid ${component.color}40`,
                    fontSize: '0.65rem',
                  }}
                />
                {isInstalled && (
                  <Chip
                    icon={<CheckCircleOutlineIcon />}
                    label="Instalado"
                    size="small"
                    color="success"
                    variant="outlined"
                    sx={{ fontSize: '0.65rem' }}
                  />
                )}
              </Box>
              <Typography variant="h6" sx={{ fontWeight: 700, lineHeight: 1.2 }}>
                {component.name}
              </Typography>
              <Typography variant="body2" sx={{ color: 'text.secondary', mt: 0.5 }}>
                {component.model}
              </Typography>
            </Box>
            <IconButton onClick={onClose} size="small" sx={{ mt: -0.5 }}>
              <CloseIcon />
            </IconButton>
          </Box>
        </Box>
      </DialogTitle>

      <DialogContent sx={{ p: 2, display: 'flex', flexDirection: 'column', gap: 2 }}>
        <Box
          sx={{
            p: 1.5,
            borderRadius: 2,
            bgcolor: `${component.color}12`,
            border: `1px solid ${component.color}30`,
          }}
        >
          <Typography variant="body2" sx={{ color: 'text.secondary', fontStyle: 'italic' }}>
            {component.shortDesc}
          </Typography>
        </Box>

        <DocSection
          icon={<InfoIcon fontSize="small" />}
          title="¿Qué es?"
          content={component.whatIs}
          color={component.color}
        />

        <DocSection
          icon={<FunctionsIcon fontSize="small" />}
          title="¿Para qué sirve?"
          content={component.function}
          color={component.color}
        />

        <DocSection
          icon={<BuildIcon fontSize="small" />}
          title="¿Cómo se instala?"
          content={component.howToInstall}
          color={component.color}
        />

        <Box>
          <Typography variant="subtitle2" sx={{ fontWeight: 700, mb: 1 }}>
            Especificaciones
          </Typography>
          <Box
            sx={{
              display: 'grid',
              gridTemplateColumns: '1fr 1fr',
              gap: 1,
            }}
          >
            {component.specs.map((spec) => (
              <Box
                key={spec.label}
                sx={{
                  p: 1.5,
                  borderRadius: 2,
                  bgcolor: 'background.paper',
                  border: '1px solid',
                  borderColor: 'divider',
                }}
              >
                <Typography
                  variant="caption"
                  sx={{ color: 'text.secondary', display: 'block', mb: 0.25 }}
                >
                  {spec.label}
                </Typography>
                <Typography variant="body2" sx={{ fontWeight: 600, fontSize: '0.8rem' }}>
                  {spec.value}
                </Typography>
              </Box>
            ))}
          </Box>
        </Box>

        <Divider />

        <Button
          variant="contained"
          fullWidth
          size="large"
          disabled={isInstalled}
          onClick={() => {
            onInstall(component);
            onClose();
          }}
          sx={{
            bgcolor: isInstalled ? undefined : component.color,
            '&:hover': { bgcolor: isInstalled ? undefined : `${component.color}dd` },
            borderRadius: 3,
            py: 1.5,
          }}
        >
          {isInstalled ? 'Ya instalado' : `Instalar ${component.name}`}
        </Button>
      </DialogContent>
    </Dialog>
  );
}
