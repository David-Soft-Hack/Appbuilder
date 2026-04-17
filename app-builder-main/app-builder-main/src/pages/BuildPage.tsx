import { useState, useCallback } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import ToggleButton from '@mui/material/ToggleButton';
import Button from '@mui/material/Button';
import Alert from '@mui/material/Alert';
import Snackbar from '@mui/material/Snackbar';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import SchoolIcon from '@mui/icons-material/School';
import DashboardIcon from '@mui/icons-material/Dashboard';
import PCCaseView from '../components/build/PCCaseView';
import PCDiagramView from '../components/build/PCDiagramView';
import ComponentInventory from '../components/build/ComponentInventory';
import TutorialCard from '../components/build/TutorialCard';
import ComponentDocModal from '../components/build/ComponentDocModal';
import PowerOnModal from '../components/build/PowerOnModal';
import { PC_COMPONENTS, TUTORIAL_ORDER } from '../data/components';
import type { PCComponent, ComponentType } from '../data/components';
import type { BuildMode, BuildState } from '../hooks/useBuildSimulator';

interface BuildPageProps {
  state: BuildState;
  buildProgress: number;
  isBuildComplete: boolean;
  onInstall: (component: PCComponent) => void;
  onSetMode: (mode: BuildMode) => void;
  onReset: () => void;
  showPowerOn: boolean;
  onClosePowerOn: () => void;
}

export default function BuildPage({
  state,
  buildProgress,
  isBuildComplete,
  onInstall,
  onSetMode,
  onReset,
  showPowerOn,
  onClosePowerOn,
}: BuildPageProps) {
  const [docComponent, setDocComponent] = useState<PCComponent | null>(null);
  const [snackbar, setSnackbar] = useState<{ open: boolean; message: string; severity: 'success' | 'error' | 'warning' }>({
    open: false,
    message: '',
    severity: 'success',
  });

  const isSandbox = state.mode === 'sandbox';
  const nextType =
    !isSandbox && state.tutorialStep < TUTORIAL_ORDER.length
      ? TUTORIAL_ORDER[state.tutorialStep]
      : null;

  const handleSlotClick = useCallback(
    (type: ComponentType) => {
      const component = PC_COMPONENTS.find((c) => c.type === type);
      if (!component) return;
      if (state.installed[type]) {
        setDocComponent(component);
        return;
      }
      if (!isSandbox && nextType !== type) {
        const nextComponent = PC_COMPONENTS.find((c) => c.type === nextType);
        setSnackbar({
          open: true,
          message: `En modo tutorial, debes instalar primero: ${nextComponent?.name ?? 'el siguiente componente'}`,
          severity: 'warning',
        });
        return;
      }
      setDocComponent(component);
    },
    [state.installed, isSandbox, nextType],
  );

  const handleComponentSelect = useCallback(
    (component: PCComponent) => {
      if (!isSandbox && nextType !== component.type && !state.installed[component.type]) {
        const nextComponent = PC_COMPONENTS.find((c) => c.type === nextType);
        setSnackbar({
          open: true,
          message: `Siguiente en el tutorial: ${nextComponent?.name ?? 'el siguiente componente'}`,
          severity: 'warning',
        });
        return;
      }
      setDocComponent(component);
    },
    [isSandbox, nextType, state.installed],
  );

  const handleInstall = useCallback(
    (component: PCComponent) => {
      onInstall(component);
      setSnackbar({
        open: true,
        message: `${component.name} instalado correctamente`,
        severity: 'success',
      });
    },
    [onInstall],
  );

  return (
    <Box sx={{ p: 2, display: 'flex', flexDirection: 'column', gap: 2 }}>
      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <ToggleButtonGroup
          value={state.mode}
          exclusive
          onChange={(_, val) => val && onSetMode(val as BuildMode)}
          size="small"
        >
          <ToggleButton value="tutorial" sx={{ gap: 0.5, px: 1.5, fontSize: '0.75rem' }}>
            <SchoolIcon sx={{ fontSize: 16 }} />
            Tutorial
          </ToggleButton>
          <ToggleButton value="sandbox" sx={{ gap: 0.5, px: 1.5, fontSize: '0.75rem' }}>
            <DashboardIcon sx={{ fontSize: 16 }} />
            Libre
          </ToggleButton>
        </ToggleButtonGroup>

        <Button
          variant="outlined"
          color="error"
          size="small"
          startIcon={<DeleteOutlineIcon />}
          onClick={onReset}
          sx={{ fontSize: '0.75rem' }}
        >
          Reiniciar
        </Button>
      </Box>

      {!isSandbox && (
        <TutorialCard
          currentStep={state.tutorialStep}
          isComplete={isBuildComplete}
        />
      )}

      {isSandbox && (
        <Alert severity="info" sx={{ borderRadius: 2 }}>
          <Typography variant="body2">
            <strong>Modo libre:</strong> Instala los componentes en el orden que prefieras. Puedes instalar cualquier componente en cualquier momento.
          </Typography>
        </Alert>
      )}

      <PCDiagramView
        installed={state.installed}
        onComponentClick={handleSlotClick}
        nextType={nextType}
      />

      <PCCaseView
        installed={state.installed}
        nextType={nextType}
        isSandbox={isSandbox}
        onSlotClick={handleSlotClick}
        buildProgress={buildProgress}
      />

      <ComponentInventory
        installed={state.installed}
        isSandbox={isSandbox}
        tutorialStep={state.tutorialStep}
        onSelect={handleComponentSelect}
      />

      <ComponentDocModal
        component={docComponent}
        open={docComponent !== null}
        onClose={() => setDocComponent(null)}
        onInstall={handleInstall}
        isInstalled={docComponent ? !!state.installed[docComponent.type] : false}
      />

      <PowerOnModal open={showPowerOn} onClose={onClosePowerOn} />

      <Snackbar
        open={snackbar.open}
        autoHideDuration={3000}
        onClose={() => setSnackbar((s) => ({ ...s, open: false }))}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
        sx={{ mb: 8 }}
      >
        <Alert
          severity={snackbar.severity}
          onClose={() => setSnackbar((s) => ({ ...s, open: false }))}
          sx={{ width: '100%', borderRadius: 2 }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Box>
  );
}
