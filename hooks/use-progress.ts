import { useState, useEffect } from 'react';
import { getCurrentUser, getUserProgress, saveUserProgress, type UserProgress } from '@/lib/auth-service';

export interface FormationProgress {
  [formationId: string]: {
    completedModules: string[];
    totalModules: number;
    percentage: number;
  };
}

export function useProgress() {
  const [progress, setProgress] = useState<FormationProgress>({});
  const [loading, setLoading] = useState(true);
  const [userId, setUserId] = useState<string | null>(null);

  // Charger la progression de l'utilisateur connecté
  useEffect(() => {
    loadProgress();
  }, []);

  const loadProgress = async () => {
    try {
      const user = await getCurrentUser();
      if (user) {
        setUserId(user.id);
        const userProgress = await getUserProgress(user.id);
        
        // Convertir le format UserProgress en FormationProgress
        const formationProgress: FormationProgress = {};
        Object.entries(userProgress.completedModules).forEach(([formationId, moduleIds]) => {
          formationProgress[formationId] = {
            completedModules: moduleIds,
            totalModules: moduleIds.length, // Sera mis à jour lors du premier markModuleComplete
            percentage: 0,
          };
        });
        setProgress(formationProgress);
      }
    } catch (error) {
      console.error('Erreur lors du chargement de la progression:', error);
    } finally {
      setLoading(false);
    }
  };

  // Sauvegarder la progression de l'utilisateur
  const saveProgress = async (newProgress: FormationProgress) => {
    if (!userId) return;
    
    try {
      const userProgress = await getUserProgress(userId);
      
      // Convertir FormationProgress en format UserProgress
      const completedModules: Record<string, string[]> = {};
      Object.entries(newProgress).forEach(([formationId, data]) => {
        completedModules[formationId] = data.completedModules;
      });
      
      userProgress.completedModules = completedModules;
      await saveUserProgress(userId, userProgress);
      setProgress(newProgress);
    } catch (error) {
      console.error('Erreur lors de la sauvegarde de la progression:', error);
    }
  };

  // Marquer un module comme complété
  const markModuleComplete = async (formationId: string, moduleId: string, totalModules: number) => {
    const currentFormationProgress = progress[formationId] || {
      completedModules: [],
      totalModules,
      percentage: 0,
    };

    // Vérifier si le module n'est pas déjà complété
    if (!currentFormationProgress.completedModules.includes(moduleId)) {
      const updatedCompletedModules = [...currentFormationProgress.completedModules, moduleId];
      const percentage = Math.round((updatedCompletedModules.length / totalModules) * 100);

      const updatedProgress = {
        ...progress,
        [formationId]: {
          completedModules: updatedCompletedModules,
          totalModules,
          percentage,
        },
      };

      await saveProgress(updatedProgress);
    }
  };

  // Marquer un module comme non complété
  const markModuleIncomplete = async (formationId: string, moduleId: string, totalModules: number) => {
    const currentFormationProgress = progress[formationId];
    if (!currentFormationProgress) return;

    const updatedCompletedModules = currentFormationProgress.completedModules.filter(
      (id) => id !== moduleId
    );
    const percentage = Math.round((updatedCompletedModules.length / totalModules) * 100);

    const updatedProgress = {
      ...progress,
      [formationId]: {
        completedModules: updatedCompletedModules,
        totalModules,
        percentage,
      },
    };

    await saveProgress(updatedProgress);
  };

  // Vérifier si un module est complété
  const isModuleComplete = (formationId: string, moduleId: string): boolean => {
    return progress[formationId]?.completedModules.includes(moduleId) || false;
  };

  // Obtenir le pourcentage de progression d'une formation
  const getFormationProgress = (formationId: string): number => {
    return progress[formationId]?.percentage || 0;
  };

  // Obtenir le nombre de modules complétés (total ou par formation)
  const getCompletedModulesCount = (formationId?: string): number => {
    if (formationId) {
      return progress[formationId]?.completedModules.length || 0;
    }
    // Retourner le total de tous les modules complétés
    return Object.values(progress).reduce((total, formation) => {
      return total + formation.completedModules.length;
    }, 0);
  };

  // Réinitialiser la progression d'une formation
  const resetFormationProgress = async (formationId: string) => {
    const updatedProgress = { ...progress };
    delete updatedProgress[formationId];
    await saveProgress(updatedProgress);
  };

  return {
    progress,
    loading,
    markModuleComplete,
    markModuleIncomplete,
    isModuleComplete,
    getFormationProgress,
    getCompletedModulesCount,
    resetFormationProgress,
  };
}
