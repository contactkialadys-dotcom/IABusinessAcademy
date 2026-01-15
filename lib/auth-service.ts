import AsyncStorage from "@react-native-async-storage/async-storage";

const USERS_KEY = "@ia_academy_users";
const CURRENT_USER_KEY = "@ia_academy_current_user";

export interface User {
  id: string;
  name: string;
  email: string;
  password: string;
  emailVerified: boolean;
  createdAt: string;
}

export interface UserProgress {
  completedModules: Record<string, string[]>; // formationId -> moduleIds[]
  generatedImages: Array<{ prompt: string; imageUrl: string; createdAt: string }>;
  chatHistory: Array<{ role: "user" | "assistant"; content: string; createdAt: string }>;
}

/**
 * Valide le format d'un email
 */
export function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

/**
 * Récupère tous les utilisateurs
 */
async function getAllUsers(): Promise<User[]> {
  try {
    const usersJson = await AsyncStorage.getItem(USERS_KEY);
    return usersJson ? JSON.parse(usersJson) : [];
  } catch (error) {
    console.error("Error getting users:", error);
    return [];
  }
}

/**
 * Sauvegarde tous les utilisateurs
 */
async function saveAllUsers(users: User[]): Promise<void> {
  try {
    await AsyncStorage.setItem(USERS_KEY, JSON.stringify(users));
  } catch (error) {
    console.error("Error saving users:", error);
    throw error;
  }
}

/**
 * Inscription d'un nouvel utilisateur
 */
export async function registerUser(
  name: string,
  email: string,
  password: string
): Promise<{ success: boolean; error?: string; user?: User }> {
  // Validation
  if (!name || name.trim().length < 2) {
    return { success: false, error: "Le nom doit contenir au moins 2 caractères" };
  }

  if (!isValidEmail(email)) {
    return { success: false, error: "Format d'email invalide" };
  }

  if (!password || password.length < 6) {
    return { success: false, error: "Le mot de passe doit contenir au moins 6 caractères" };
  }

  // Vérifier si l'email existe déjà
  const users = await getAllUsers();
  const existingUser = users.find((u) => u.email.toLowerCase() === email.toLowerCase());

  if (existingUser) {
    return { success: false, error: "Cet email est déjà utilisé" };
  }

  // Créer le nouvel utilisateur
  const newUser: User = {
    id: Date.now().toString(),
    name: name.trim(),
    email: email.toLowerCase().trim(),
    password, // En production, il faudrait hasher le mot de passe
    emailVerified: true, // Automatiquement vérifié dans cette version simplifiée
    createdAt: new Date().toISOString(),
  };

  users.push(newUser);
  await saveAllUsers(users);

  // Connecter automatiquement l'utilisateur
  await setCurrentUser(newUser);

  // Initialiser la progression
  await initializeUserProgress(newUser.id);

  return { success: true, user: newUser };
}

/**
 * Connexion d'un utilisateur
 */
export async function loginUser(
  email: string,
  password: string
): Promise<{ success: boolean; error?: string; user?: User }> {
  if (!email || !password) {
    return { success: false, error: "Email et mot de passe requis" };
  }

  const users = await getAllUsers();
  const user = users.find(
    (u) => u.email.toLowerCase() === email.toLowerCase() && u.password === password
  );

  if (!user) {
    return { success: false, error: "Email ou mot de passe incorrect" };
  }

  await setCurrentUser(user);
  return { success: true, user };
}

/**
 * Déconnexion
 */
export async function logoutUser(): Promise<void> {
  try {
    await AsyncStorage.removeItem(CURRENT_USER_KEY);
  } catch (error) {
    console.error("Error logging out:", error);
  }
}

/**
 * Récupère l'utilisateur connecté
 */
export async function getCurrentUser(): Promise<User | null> {
  try {
    const userJson = await AsyncStorage.getItem(CURRENT_USER_KEY);
    return userJson ? JSON.parse(userJson) : null;
  } catch (error) {
    console.error("Error getting current user:", error);
    return null;
  }
}

/**
 * Définit l'utilisateur connecté
 */
async function setCurrentUser(user: User): Promise<void> {
  try {
    await AsyncStorage.setItem(CURRENT_USER_KEY, JSON.stringify(user));
  } catch (error) {
    console.error("Error setting current user:", error);
    throw error;
  }
}

/**
 * Initialise la progression d'un utilisateur
 */
async function initializeUserProgress(userId: string): Promise<void> {
  const progress: UserProgress = {
    completedModules: {},
    generatedImages: [],
    chatHistory: [],
  };

  try {
    await AsyncStorage.setItem(`@progress_${userId}`, JSON.stringify(progress));
  } catch (error) {
    console.error("Error initializing progress:", error);
  }
}

/**
 * Récupère la progression d'un utilisateur
 */
export async function getUserProgress(userId: string): Promise<UserProgress> {
  try {
    const progressJson = await AsyncStorage.getItem(`@progress_${userId}`);
    if (progressJson) {
      return JSON.parse(progressJson);
    }
  } catch (error) {
    console.error("Error getting progress:", error);
  }

  // Retourner une progression vide par défaut
  return {
    completedModules: {},
    generatedImages: [],
    chatHistory: [],
  };
}

/**
 * Sauvegarde la progression d'un utilisateur
 */
export async function saveUserProgress(userId: string, progress: UserProgress): Promise<void> {
  try {
    await AsyncStorage.setItem(`@progress_${userId}`, JSON.stringify(progress));
  } catch (error) {
    console.error("Error saving progress:", error);
    throw error;
  }
}

/**
 * Marque un module comme complété
 */
export async function markModuleCompleted(
  userId: string,
  formationId: string,
  moduleId: string
): Promise<void> {
  const progress = await getUserProgress(userId);

  if (!progress.completedModules[formationId]) {
    progress.completedModules[formationId] = [];
  }

  if (!progress.completedModules[formationId].includes(moduleId)) {
    progress.completedModules[formationId].push(moduleId);
    await saveUserProgress(userId, progress);
  }
}

/**
 * Vérifie si un module est complété
 */
export async function isModuleCompleted(
  userId: string,
  formationId: string,
  moduleId: string
): Promise<boolean> {
  const progress = await getUserProgress(userId);
  return progress.completedModules[formationId]?.includes(moduleId) || false;
}
