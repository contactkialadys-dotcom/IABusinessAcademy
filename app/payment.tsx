import { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, ScrollView, KeyboardAvoidingView, Platform } from "react-native";
import { router, useLocalSearchParams } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as Haptics from "expo-haptics";

import { ScreenContainer } from "@/components/screen-container";
import { IconSymbol } from "@/components/ui/icon-symbol";

export default function PaymentScreen() {
  const { formationId, formationTitle } = useLocalSearchParams<{ formationId: string; formationTitle: string }>();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);

  const handlePayment = async () => {
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

    setIsProcessing(true);

    // Simuler un traitement de paiement
    setTimeout(async () => {
      try {
        // Sauvegarder les informations de paiement
        await AsyncStorage.setItem(`payment_${formationId}`, "completed");
        await AsyncStorage.setItem(`payment_${formationId}_name`, name.trim());
        await AsyncStorage.setItem(`payment_${formationId}_email`, email.trim());
        
        // Haptic feedback de succès
        if (Platform.OS !== "web") {
          await Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
        }
        
        // Rediriger vers la formation
        router.back();
      } catch (e) {
        setError("Une erreur s'est produite. Veuillez réessayer.");
        setIsProcessing(false);
      }
    }, 2000);
  };

  return (
    <ScreenContainer className="bg-background">
      <KeyboardAvoidingView 
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        className="flex-1"
      >
        <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
          <View className="flex-1 p-6">
            {/* Header avec bouton retour */}
            <View className="flex-row items-center gap-4 mb-8 pt-4">
              <TouchableOpacity
                onPress={() => router.back()}
                className="w-10 h-10 rounded-full bg-surface items-center justify-center border border-border"
              >
                <IconSymbol size={20} name="chevron.left" color="#8B6F47" />
              </TouchableOpacity>
              <Text className="text-2xl font-bold text-foreground flex-1">
                Accéder à la formation
              </Text>
            </View>

            {/* Info formation */}
            <View className="bg-primary/10 rounded-3xl p-6 border-2 border-primary/30 mb-8">
              <View className="flex-row items-center gap-3 mb-3">
                <View className="w-12 h-12 bg-primary rounded-full items-center justify-center">
                  <Text className="text-2xl">📸</Text>
                </View>
                <Text className="text-xl font-bold text-foreground flex-1">
                  {formationTitle || "Mini Formation"}
                </Text>
              </View>
              <Text className="text-base text-muted leading-relaxed mb-4">
                Accédez au contenu complet avec vidéos, audios et exercices pratiques
              </Text>
              <View className="flex-row items-center gap-2">
                <IconSymbol size={18} name="checkmark.circle.fill" color="#8B6F47" />
                <Text className="text-sm text-foreground">Accès à vie</Text>
              </View>
              <View className="flex-row items-center gap-2 mt-2">
                <IconSymbol size={18} name="checkmark.circle.fill" color="#8B6F47" />
                <Text className="text-sm text-foreground">Support par email</Text>
              </View>
            </View>

            {/* Prix */}
            <View className="items-center mb-8">
              <Text className="text-5xl font-bold text-primary">29€</Text>
              <Text className="text-sm text-muted mt-1">Paiement unique</Text>
            </View>

            {/* Formulaire */}
            <View className="gap-5">
              <View>
                <Text className="text-sm font-semibold text-foreground mb-2">
                  Votre nom complet
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
                  editable={!isProcessing}
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
                  onSubmitEditing={handlePayment}
                  editable={!isProcessing}
                />
              </View>

              {error ? (
                <Text className="text-sm text-error text-center">
                  {error}
                </Text>
              ) : null}

              <TouchableOpacity
                className="bg-primary rounded-2xl py-5 mt-4 shadow-lg active:opacity-80"
                onPress={handlePayment}
                disabled={isProcessing}
              >
                {isProcessing ? (
                  <Text className="text-background font-bold text-center text-xl">
                    ⏳ Traitement en cours...
                  </Text>
                ) : (
                  <Text className="text-background font-bold text-center text-xl">
                    💳 Payer 29€ et accéder
                  </Text>
                )}
              </TouchableOpacity>
            </View>

            {/* Garantie */}
            <View className="mt-8 items-center">
              <View className="flex-row items-center gap-2 bg-success/10 rounded-full px-4 py-2 border border-success/30">
                <IconSymbol size={16} name="checkmark.shield.fill" color="#22C55E" />
                <Text className="text-xs text-success font-semibold">
                  Garantie satisfait ou remboursé 30 jours
                </Text>
              </View>
            </View>

            {/* Footer */}
            <View className="mt-8">
              <Text className="text-xs text-muted text-center leading-relaxed">
                Paiement sécurisé. Vos données sont protégées.{"\n"}
                En continuant, vous acceptez nos conditions d'utilisation.
              </Text>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </ScreenContainer>
  );
}
