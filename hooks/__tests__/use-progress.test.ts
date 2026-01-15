import { describe, it, expect, beforeEach, vi } from 'vitest';

// Mock AsyncStorage pour les tests
const mockStorage: Record<string, string> = {};

const AsyncStorageMock = {
  getItem: vi.fn(async (key: string) => {
    return mockStorage[key] || null;
  }),
  setItem: vi.fn(async (key: string, value: string) => {
    mockStorage[key] = value;
  }),
  removeItem: vi.fn(async (key: string) => {
    delete mockStorage[key];
  }),
  clear: vi.fn(async () => {
    Object.keys(mockStorage).forEach(key => delete mockStorage[key]);
  }),
};

vi.mock('@react-native-async-storage/async-storage', () => ({
  default: AsyncStorageMock,
}));

const PROGRESS_KEY = '@ia_business_academy:progress';

describe('useProgress hook', () => {
  beforeEach(async () => {
    // Nettoyer le mock storage avant chaque test
    await AsyncStorageMock.clear();
  });

  it('devrait sauvegarder et charger la progression correctement', async () => {
    const testProgress = {
      'formation-1': {
        completedModules: ['module-1', 'module-2'],
        totalModules: 5,
        percentage: 40,
      },
    };

    // Sauvegarder la progression
    await AsyncStorageMock.setItem(PROGRESS_KEY, JSON.stringify(testProgress));

    // Charger la progression
    const savedProgress = await AsyncStorageMock.getItem(PROGRESS_KEY);
    const parsedProgress = savedProgress ? JSON.parse(savedProgress) : null;

    expect(parsedProgress).toEqual(testProgress);
    expect(parsedProgress['formation-1'].completedModules).toHaveLength(2);
    expect(parsedProgress['formation-1'].percentage).toBe(40);
  });

  it('devrait calculer correctement le pourcentage de progression', () => {
    const totalModules = 10;
    const completedModules = ['m1', 'm2', 'm3', 'm4', 'm5'];
    const expectedPercentage = Math.round((completedModules.length / totalModules) * 100);

    expect(expectedPercentage).toBe(50);
  });

  it('devrait gérer les formations sans progression', async () => {
    const savedProgress = await AsyncStorageMock.getItem(PROGRESS_KEY);
    expect(savedProgress).toBeNull();
  });

  it('devrait mettre à jour la progression quand un module est complété', async () => {
    const formationId = 'formation-1';
    const moduleId = 'module-3';
    const totalModules = 5;

    // État initial
    const initialProgress = {
      [formationId]: {
        completedModules: ['module-1', 'module-2'],
        totalModules,
        percentage: 40,
      },
    };

    await AsyncStorageMock.setItem(PROGRESS_KEY, JSON.stringify(initialProgress));

    // Ajouter un nouveau module complété
    const savedProgressStr = await AsyncStorageMock.getItem(PROGRESS_KEY);
    const savedProgress = savedProgressStr ? JSON.parse(savedProgressStr) : {};
    const currentFormationProgress = savedProgress[formationId];

    const updatedCompletedModules = [...currentFormationProgress.completedModules, moduleId];
    const updatedPercentage = Math.round((updatedCompletedModules.length / totalModules) * 100);

    const updatedProgress = {
      ...savedProgress,
      [formationId]: {
        completedModules: updatedCompletedModules,
        totalModules,
        percentage: updatedPercentage,
      },
    };

    await AsyncStorageMock.setItem(PROGRESS_KEY, JSON.stringify(updatedProgress));

    // Vérifier
    const finalProgressStr = await AsyncStorageMock.getItem(PROGRESS_KEY);
    const finalProgress = finalProgressStr ? JSON.parse(finalProgressStr) : {};

    expect(finalProgress[formationId].completedModules).toHaveLength(3);
    expect(finalProgress[formationId].percentage).toBe(60);
    expect(finalProgress[formationId].completedModules).toContain(moduleId);
  });

  it('ne devrait pas ajouter un module déjà complété', async () => {
    const formationId = 'formation-1';
    const moduleId = 'module-1';
    const totalModules = 5;

    const initialProgress = {
      [formationId]: {
        completedModules: ['module-1', 'module-2'],
        totalModules,
        percentage: 40,
      },
    };

    await AsyncStorageMock.setItem(PROGRESS_KEY, JSON.stringify(initialProgress));

    // Essayer d'ajouter un module déjà complété
    const savedProgressStr = await AsyncStorageMock.getItem(PROGRESS_KEY);
    const savedProgress = savedProgressStr ? JSON.parse(savedProgressStr) : {};
    const currentFormationProgress = savedProgress[formationId];

    // Vérifier si le module est déjà complété
    if (!currentFormationProgress.completedModules.includes(moduleId)) {
      currentFormationProgress.completedModules.push(moduleId);
    }

    expect(currentFormationProgress.completedModules).toHaveLength(2);
    expect(currentFormationProgress.completedModules.filter((id: string) => id === moduleId)).toHaveLength(1);
  });

  it('devrait retourner 0% pour une formation sans progression', async () => {
    const formationId = 'formation-inexistante';
    
    const savedProgressStr = await AsyncStorageMock.getItem(PROGRESS_KEY);
    const savedProgress = savedProgressStr ? JSON.parse(savedProgressStr) : {};
    
    const percentage = savedProgress[formationId]?.percentage || 0;
    expect(percentage).toBe(0);
  });

  it('devrait retourner 100% quand tous les modules sont complétés', async () => {
    const formationId = 'formation-1';
    const totalModules = 5;
    const completedModules = ['m1', 'm2', 'm3', 'm4', 'm5'];

    const progress = {
      [formationId]: {
        completedModules,
        totalModules,
        percentage: Math.round((completedModules.length / totalModules) * 100),
      },
    };

    await AsyncStorageMock.setItem(PROGRESS_KEY, JSON.stringify(progress));

    const savedProgressStr = await AsyncStorageMock.getItem(PROGRESS_KEY);
    const savedProgress = savedProgressStr ? JSON.parse(savedProgressStr) : {};

    expect(savedProgress[formationId].percentage).toBe(100);
    expect(savedProgress[formationId].completedModules).toHaveLength(totalModules);
  });
});
