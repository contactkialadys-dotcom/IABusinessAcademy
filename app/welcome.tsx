import { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, Image, KeyboardAvoidingView, Platform } from "react-native";
import { router } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as Haptics from "expo-haptics";

import { ScreenContainer } from "@/components/screen-container";

export default function WelcomeScreen() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async () => {
    // Validation
    if (!name.trim()) {
      setError("Veuillez entrer votre nom");
      return;
    }
    if (!email.trim() || !email.includes("@")) {
      setError("Veuillez entrer un email valide");
      return;
    }

    // Haptic feedback
    if (Platform.OS !== "web") {
      await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    }

    // Sauvegarder les informations
    try {
      await AsyncStorage.setItem("user_name", name.trim());
      await AsyncStorage.setItem("user_email", email.trim());
      await AsyncStorage.setItem("onboarding_completed", "true");
      
      // Rediriger vers l'application
      router.replace("/(tabs)");
    } catch (e) {
      setError("Une erreur s'est produite. Veuillez réessayer.");
    }
  };

  return (
    <ScreenContainer className="bg-background">
      <KeyboardAvoidingView 
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        className="flex-1"
      >
        <View className="flex-1 justify-center items-center px-6">
          {/* Logo */}
          <View className="items-center mb-10">
            <View className="w-36 h-36 bg-primary/10 rounded-full items-center justify-center mb-6 shadow-lg">
              <Text className="text-7xl">🎓</Text>
            </View>
            
            <Text className="text-4xl font-bold text-foreground text-center mb-4 leading-tight">
              Bienvenue à l'IA{"\n"}Business Academy
            </Text>
            
            <Text className="text-lg text-muted text-center leading-relaxed px-4">
              Maîtrisez l'IA pour transformer votre business
            </Text>
          </View>

          {/* Formulaire */}
          <View className="w-full max-w-sm gap-5 mt-2">
            <View>
              <Text className="text-sm font-semibold text-foreground mb-2">
                Votre nom
              </Text>
              <TextInput
                className="bg-surface border-2 border-border rounded-2xl px-5 py-4 text-foreground text-base shadow-sm"
                placeholder="Ex: Marie Dupont"
                placeholderTextColor="#9BA1A6"
                value={name}
                onChangeText={(text) => {
                  setName(text);
                  setError("");
                }}
                autoCapitalize="words"
                returnKeyType="next"
              />
            </View>

            <View>
              <Text className="text-sm font-semibold text-foreground mb-2">
                Votre email
              </Text>
              <TextInput
                className="bg-surface border-2 border-border rounded-2xl px-5 py-4 text-foreground text-base shadow-sm"
                placeholder="Ex: marie@exemple.com"
                placeholderTextColor="#9BA1A6"
                value={email}
                onChangeText={(text) => {
                  setEmail(text);
                  setError("");
                }}
                keyboardType="email-address"
                autoCapitalize="none"
                returnKeyType="done"
                onSubmitEditing={handleSubmit}
              />
            </View>

            {error ? (
              <Text className="text-sm text-error text-center">
                {error}
              </Text>
            ) : null}

            <TouchableOpacity
              className="bg-primary rounded-2xl py-5 mt-4 active:opacity-80 shadow-lg"
              onPress={handleSubmit}
            >
              <Text className="text-background font-bold text-center text-xl">
                🚀 Commencer mon apprentissage
              </Text>
            </TouchableOpacity>
          </View>

          {/* Footer */}
          <View className="mt-12">
            <Text className="text-xs text-muted text-center">
              En continuant, vous acceptez nos conditions d'utilisation
            </Text>
          </View>
        </View>
      </KeyboardAvoidingView>
    </ScreenContainer>
  );
}
