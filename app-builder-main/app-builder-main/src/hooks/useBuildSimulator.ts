import { useState, useCallback, useEffect } from 'react';
import { PC_COMPONENTS, TUTORIAL_ORDER, type ComponentType, type PCComponent } from '../data/components';
import { ACHIEVEMENTS, type Achievement } from '../data/achievements';

export type BuildMode = 'tutorial' | 'sandbox';
export type AppPage = 'home' | 'build' | 'learn' | 'achievements';

export interface BuildState {
  installed: Partial<Record<ComponentType, PCComponent>>;
  mode: BuildMode;
  tutorialStep: number;
  unlockedAchievements: string[];
  docsRead: ComponentType[];
  quizCorrect: number;
  totalQuizAnswered: number;
  powerOn: boolean;
  selectedComponent: PCComponent | null;
}

const STORAGE_KEY = 'pc_build_state';

function loadState(): Partial<BuildState> {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) return JSON.parse(saved) as Partial<BuildState>;
  } catch {
    return {};
  }
  return {};
}

function saveState(state: BuildState) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  } catch {
    /* ignore */
  }
}

const initialBuildState: BuildState = {
  installed: {},
  mode: 'tutorial',
  tutorialStep: 0,
  unlockedAchievements: [],
  docsRead: [],
  quizCorrect: 0,
  totalQuizAnswered: 0,
  powerOn: false,
  selectedComponent: null,
};

export function useBuildSimulator() {
  const [page, setPage] = useState<AppPage>('home');
  const [state, setState] = useState<BuildState>(() => {
    const saved = loadState();
    return { ...initialBuildState, ...saved };
  });
  const [showPowerOn, setShowPowerOn] = useState(false);
  const [lastInstalledType, setLastInstalledType] = useState<ComponentType | null>(null);

  useEffect(() => {
    saveState(state);
  }, [state]);

  const unlockAchievement = useCallback((condition: string, currentState: BuildState): string[] => {
    const newlyUnlocked: string[] = [];
    ACHIEVEMENTS.forEach((ach) => {
      if (
        ach.condition === condition &&
        !currentState.unlockedAchievements.includes(ach.id)
      ) {
        newlyUnlocked.push(ach.id);
      }
    });
    return newlyUnlocked;
  }, []);

  const installComponent = useCallback(
    (component: PCComponent) => {
      setState((prev) => {
        const newInstalled = { ...prev.installed, [component.type]: component };
        const installedCount = Object.keys(newInstalled).length;
        const allTypes: ComponentType[] = ['motherboard', 'cpu', 'ram', 'gpu', 'storage', 'psu', 'fan', 'cables'];
        const allInstalled = allTypes.every((t) => newInstalled[t]);

        let newAchievements = [...prev.unlockedAchievements];

        if (installedCount === 1) {
          newAchievements = [...newAchievements, ...unlockAchievement('install_first', prev)];
        }
        if (component.type === 'motherboard') {
          newAchievements = [...newAchievements, ...unlockAchievement('install_motherboard', prev)];
        }
        if (component.type === 'cpu') {
          newAchievements = [...newAchievements, ...unlockAchievement('install_cpu', prev)];
        }
        if (component.type === 'ram') {
          newAchievements = [...newAchievements, ...unlockAchievement('install_ram', prev)];
        }
        if (component.type === 'gpu') {
          newAchievements = [...newAchievements, ...unlockAchievement('install_gpu', prev)];
        }
        if (component.type === 'storage') {
          newAchievements = [...newAchievements, ...unlockAchievement('install_storage', prev)];
        }
        if (component.type === 'psu') {
          newAchievements = [...newAchievements, ...unlockAchievement('install_psu', prev)];
        }
        if (allInstalled) {
          newAchievements = [
            ...newAchievements,
            ...unlockAchievement('complete_build', { ...prev, unlockedAchievements: newAchievements }),
          ];
        }

        const newTutorialStep =
          prev.mode === 'tutorial'
            ? Math.min(prev.tutorialStep + 1, TUTORIAL_ORDER.length)
            : prev.tutorialStep;

        if (prev.mode === 'tutorial' && newTutorialStep === TUTORIAL_ORDER.length) {
          newAchievements = [
            ...newAchievements,
            ...unlockAchievement('complete_tutorial', { ...prev, unlockedAchievements: newAchievements }),
          ];
        }

        return {
          ...prev,
          installed: newInstalled,
          unlockedAchievements: [...new Set(newAchievements)],
          tutorialStep: newTutorialStep,
          powerOn: allInstalled,
        };
      });
      setLastInstalledType(component.type);
      if (
        ['fan', 'motherboard', 'cpu', 'ram', 'gpu', 'storage', 'psu', 'cables'].every(
          (t) =>
            t === component.type ||
            state.installed[t as ComponentType],
        )
      ) {
        setTimeout(() => setShowPowerOn(true), 800);
      }
    },
    [state.installed, unlockAchievement],
  );

  const removeComponent = useCallback((type: ComponentType) => {
    setState((prev) => {
      const newInstalled = { ...prev.installed };
      delete newInstalled[type];
      return { ...prev, installed: newInstalled, powerOn: false };
    });
  }, []);

  const setMode = useCallback((mode: BuildMode) => {
    setState((prev) => ({ ...prev, mode }));
  }, []);

  const markDocRead = useCallback((type: ComponentType) => {
    setState((prev) => {
      if (prev.docsRead.includes(type)) return prev;
      const newDocsRead = [...prev.docsRead, type];
      let newAchievements = [...prev.unlockedAchievements];
      if (newDocsRead.length >= 5) {
        newAchievements = [
          ...newAchievements,
          ...unlockAchievement('read_5_docs', prev),
        ];
      }
      return { ...prev, docsRead: newDocsRead, unlockedAchievements: [...new Set(newAchievements)] };
    });
  }, [unlockAchievement]);

  const recordQuizAnswer = useCallback(
    (correct: boolean) => {
      setState((prev) => {
        const newCorrect = prev.quizCorrect + (correct ? 1 : 0);
        const newAnswered = prev.totalQuizAnswered + 1;
        let newAchievements = [...prev.unlockedAchievements];
        if (correct && newCorrect === 1) {
          newAchievements = [...newAchievements, ...unlockAchievement('first_quiz', prev)];
        }
        if (newCorrect === 8) {
          newAchievements = [
            ...newAchievements,
            ...unlockAchievement('all_quiz', { ...prev, unlockedAchievements: newAchievements }),
          ];
        }
        return {
          ...prev,
          quizCorrect: newCorrect,
          totalQuizAnswered: newAnswered,
          unlockedAchievements: [...new Set(newAchievements)],
        };
      });
    },
    [unlockAchievement],
  );

  const resetBuild = useCallback(() => {
    setState((prev) => ({
      ...initialBuildState,
      unlockedAchievements: prev.unlockedAchievements,
      docsRead: prev.docsRead,
      quizCorrect: prev.quizCorrect,
      totalQuizAnswered: prev.totalQuizAnswered,
    }));
    setShowPowerOn(false);
  }, []);

  const selectComponent = useCallback((component: PCComponent | null) => {
    setState((prev) => ({ ...prev, selectedComponent: component }));
  }, []);

  const getNextTutorialComponent = useCallback((): PCComponent | null => {
    if (state.tutorialStep >= TUTORIAL_ORDER.length) return null;
    const nextType = TUTORIAL_ORDER[state.tutorialStep];
    return PC_COMPONENTS.find((c) => c.type === nextType) ?? null;
  }, [state.tutorialStep]);

  const getUnlockedAchievements = useCallback((): Achievement[] => {
    return ACHIEVEMENTS.filter((a) => state.unlockedAchievements.includes(a.id));
  }, [state.unlockedAchievements]);

  const getLockedAchievements = useCallback((): Achievement[] => {
    return ACHIEVEMENTS.filter((a) => !state.unlockedAchievements.includes(a.id));
  }, [state.unlockedAchievements]);

  const installedCount = Object.keys(state.installed).length;
  const totalSlots = 8;
  const buildProgress = Math.round((installedCount / totalSlots) * 100);
  const isBuildComplete = installedCount === totalSlots;

  return {
    page,
    setPage,
    state,
    installComponent,
    removeComponent,
    setMode,
    markDocRead,
    recordQuizAnswer,
    resetBuild,
    selectComponent,
    getNextTutorialComponent,
    getUnlockedAchievements,
    getLockedAchievements,
    buildProgress,
    isBuildComplete,
    showPowerOn,
    setShowPowerOn,
    lastInstalledType,
  };
}
