import { useState, useEffect } from "react";
import { View, Text, TouchableOpacity, Alert, ScrollView } from "react";
import { router } from "expo-router";
import { ScreenContainer } from "@/components/screen-container";
import { getCurrentUser, logoutUser, type User } from "@/lib/auth-service";
import { useProgress } from "@/hooks/use-progress";

export default function ProfileScreen() {
  const [user, setUser] = useState<User | null>(null);
  const { getCompletedModulesCount } = useProgress();

  useEffect(() => {
    loadUser();
  }, []);

  const loadUser = async () => {
    const currentUser = await getCurrentUser();
    setUser(currentUser);
  };

  const handleLogout = () => {
    Alert.alert(
      "Déconnexion",
      "Êtes-vous sûr de vouloir vous déconnecter ?",
      [
        {
          text: "Annuler",
          style: "cancel",
        },
        {
          text: "Déconnexion",
          style: "destructive",
          onPress: async () => {
            await logoutUser();
            router.replace("/auth");
          },
        },
      ]
    );
  };

  if (!user) {
    return (
      <ScreenContainer className="p-6">
        <Text className="text-foreground">Chargement...</Text>
      </ScreenContainer>
    );
  }

  const completedCount = getCompletedModulesCount();

  return (
    <ScreenContainer className="p-6">
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        {/* En-tête du profil */}
        <View className="items-center mb-8">
          <View className="w-24 h-24 rounded-full bg-primary items-center justify-center mb-4">
            <Text className="text-4xl text-background font-bold">
              {user.name.charAt(0).toUpperCase()}
            </Text>
          </View>
          <Text className="text-2xl font-bold text-foreground">{user.name}</Text>
          <Text className="text-base text-muted mt-1">{user.email}</Text>
          {user.emailVerified && (
            <View className="flex-row items-center mt-2">
              <Text className="text-success mr-1">✓</Text>
              <Text className="text-sm text-success">Email vérifié</Text>
            </View>
          )}
        </View>

        {/* Statistiques */}
        <View className="bg-surface rounded-2xl p-6 mb-6 border border-border">
          <Text className="text-lg font-semibold text-foreground mb-4">
            Mes statistiques
          </Text>

          <View className="flex-row justify-between items-center mb-4">
            <Text className="text-muted">Modules complétés</Text>
            <Text className="text-2xl font-bold text-primary">{completedCount}</Text>
          </View>

          <View className="flex-row justify-between items-center">
            <Text className="text-muted">Membre depuis</Text>
            <Text className="text-foreground font-medium">
              {new Date(user.createdAt).toLocaleDateString("fr-FR", {
                year: "numeric",
                month: "long",
              })}
            </Text>
          </View>
        </View>

        {/* Informations du compte */}
        <View className="bg-surface rounded-2xl p-6 mb-6 border border-border">
          <Text className="text-lg font-semibold text-foreground mb-4">
            Informations du compte
          </Text>

          <View className="mb-4">
            <Text className="text-sm text-muted mb-1">Nom complet</Text>
            <Text className="text-base text-foreground">{user.name}</Text>
          </View>

          <View className="mb-4">
            <Text className="text-sm text-muted mb-1">Adresse email</Text>
            <Text className="text-base text-foreground">{user.email}</Text>
          </View>

          <View>
            <Text className="text-sm text-muted mb-1">Identifiant</Text>
            <Text className="text-base text-foreground font-mono">#{user.id}</Text>
          </View>
        </View>

        {/* Bouton de déconnexion */}
        <TouchableOpacity
          className="bg-error rounded-xl py-4 items-center mb-4"
          onPress={handleLogout}
          style={({ pressed }) => [
            pressed && { opacity: 0.8, transform: [{ scale: 0.98 }] },
          ]}
        >
          <Text className="text-background font-semibold text-base">
            Se déconnecter
          </Text>
        </TouchableOpacity>

        {/* Message de confidentialité */}
        <Text className="text-xs text-muted text-center mt-4">
          Vos données sont stockées localement sur votre appareil.
          {"\n"}
          Aucune information n'est partagée avec des tiers.
        </Text>
      </ScrollView>
    </ScreenContainer>
  );
}
