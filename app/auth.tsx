import { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
  Alert,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from "react-native";
import { router } from "expo-router";
import { ScreenContainer } from "@/components/screen-container";
import { registerUser, loginUser } from "@/lib/auth-service";

export default function AuthScreen() {
  const [isLogin, setIsLogin] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    setLoading(true);

    try {
      if (isLogin) {
        // Connexion
        const result = await loginUser(email, password);
        if (result.success) {
          Alert.alert(
            "Connexion réussie",
            `Bienvenue ${result.user?.name} !`,
            [
              {
                text: "Continuer",
                onPress: () => router.replace("/(tabs)"),
              },
            ]
          );
        } else {
          Alert.alert("Erreur", result.error || "Une erreur est survenue");
        }
      } else {
        // Inscription
        const result = await registerUser(name, email, password);
        if (result.success) {
          Alert.alert(
            "Inscription réussie ! 🎉",
            `Bienvenue dans l'IA Business Academy, ${result.user?.name} !\n\nVotre compte a été créé avec succès. Vous pouvez maintenant accéder à toutes les formations gratuites.`,
            [
              {
                text: "Commencer mon apprentissage",
                onPress: () => router.replace("/(tabs)"),
              },
            ]
          );
        } else {
          Alert.alert("Erreur", result.error || "Une erreur est survenue");
        }
      }
    } catch (error) {
      Alert.alert("Erreur", "Une erreur est survenue. Veuillez réessayer.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <ScreenContainer>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        className="flex-1"
      >
        <ScrollView
          contentContainerStyle={{ flexGrow: 1 }}
          keyboardShouldPersistTaps="handled"
        >
          <View className="flex-1 justify-center px-6 py-8">
            {/* Logo et titre */}
            <View className="items-center mb-8">
              <Text className="text-6xl mb-4">🎓</Text>
              <Text className="text-3xl font-bold text-foreground text-center">
                IA Business Academy
              </Text>
              <Text className="text-base text-muted text-center mt-2">
                Maîtrisez l'IA pour transformer votre business
              </Text>
            </View>

            {/* Formulaire */}
            <View className="bg-surface rounded-2xl p-6 shadow-sm border border-border">
              <Text className="text-2xl font-bold text-foreground mb-6 text-center">
                {isLogin ? "Connexion" : "Inscription"}
              </Text>

              {/* Champ Nom (seulement pour l'inscription) */}
              {!isLogin && (
                <View className="mb-4">
                  <Text className="text-sm font-medium text-foreground mb-2">
                    Votre nom
                  </Text>
                  <TextInput
                    className="bg-background border border-border rounded-xl px-4 py-3 text-foreground"
                    placeholder="Ex: Marie Dupont"
                    placeholderTextColor="#9BA1A6"
                    value={name}
                    onChangeText={setName}
                    autoCapitalize="words"
                  />
                </View>
              )}

              {/* Champ Email */}
              <View className="mb-4">
                <Text className="text-sm font-medium text-foreground mb-2">
                  Votre email
                </Text>
                <TextInput
                  className="bg-background border border-border rounded-xl px-4 py-3 text-foreground"
                  placeholder="Ex: marie@example.com"
                  placeholderTextColor="#9BA1A6"
                  value={email}
                  onChangeText={setEmail}
                  keyboardType="email-address"
                  autoCapitalize="none"
                  autoCorrect={false}
                />
              </View>

              {/* Champ Mot de passe */}
              <View className="mb-6">
                <Text className="text-sm font-medium text-foreground mb-2">
                  Mot de passe
                </Text>
                <TextInput
                  className="bg-background border border-border rounded-xl px-4 py-3 text-foreground"
                  placeholder="Minimum 6 caractères"
                  placeholderTextColor="#9BA1A6"
                  value={password}
                  onChangeText={setPassword}
                  secureTextEntry
                  autoCapitalize="none"
                  autoCorrect={false}
                />
              </View>

              {/* Bouton de soumission */}
              <TouchableOpacity
                className="bg-primary rounded-xl py-4 items-center mb-4"
                onPress={handleSubmit}
                disabled={loading}
                style={({ pressed }: { pressed: boolean }) => [
                  pressed && { opacity: 0.8, transform: [{ scale: 0.98 }] },
                ]}
              >
                {loading ? (
                  <ActivityIndicator color="#ffffff" />
                ) : (
                  <Text className="text-background font-semibold text-base">
                    {isLogin ? "Se connecter" : "Créer mon compte"}
                  </Text>
                )}
              </TouchableOpacity>

              {/* Lien pour basculer entre inscription et connexion */}
              <TouchableOpacity
                onPress={() => {
                  setIsLogin(!isLogin);
                  setName("");
                  setEmail("");
                  setPassword("");
                }}
                className="items-center"
              >
                <Text className="text-muted text-sm">
                  {isLogin ? "Pas encore de compte ? " : "Déjà un compte ? "}
                  <Text className="text-primary font-semibold">
                    {isLogin ? "S'inscrire" : "Se connecter"}
                  </Text>
                </Text>
              </TouchableOpacity>
            </View>

            {/* Message de confidentialité */}
            <Text className="text-xs text-muted text-center mt-6 px-4">
              En continuant, vous acceptez nos conditions d'utilisation.
              {"\n"}
              Vos données sont stockées localement sur votre appareil.
            </Text>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </ScreenContainer>
  );
}
