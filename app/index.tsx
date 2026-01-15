import { useEffect } from "react";
import { router } from "expo-router";
import { View, ActivityIndicator } from "react-native";
import { getCurrentUser } from "@/lib/auth-service";

export default function Index() {
  useEffect(() => {
    checkAuth();
  }, []);

  const checkAuth = async () => {
    try {
      const user = await getCurrentUser();
      
      if (user) {
        // Utilisateur connecté, rediriger vers les tabs
        router.replace("/(tabs)");
      } else {
        // Utilisateur non connecté, rediriger vers l'authentification
        router.replace("/auth");
      }
    } catch (error) {
      console.error("Error checking auth:", error);
      // En cas d'erreur, rediriger vers l'authentification
      router.replace("/auth");
    }
  };

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center", backgroundColor: "#F5F0E8" }}>
      <ActivityIndicator size="large" color="#0a7ea4" />
    </View>
  );
}
