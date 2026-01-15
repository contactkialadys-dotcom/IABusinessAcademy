import { ScrollView, Text, View, TouchableOpacity, Linking, Platform, Image } from "react-native";
import { VideoView, useVideoPlayer } from "expo-video";
import { useAudioPlayer, setAudioModeAsync } from "expo-audio";
import { useEffect, useState } from "react";
import { useRouter } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";

import { ScreenContainer } from "@/components/screen-container";
import { IconSymbol } from "@/components/ui/icon-symbol";
import { SOCIAL_LINKS } from "@/constants/social-links";

export default function HomeScreen() {
  const router = useRouter();
  const [userName, setUserName] = useState("");
  
  // Vidéo de bienvenue
  const welcomeVideo = useVideoPlayer(require("@/assets/videos/bienvenue-complete.mp4"), (player) => {
    player.loop = true;
    player.play();
  });

  useEffect(() => {
    // Activer la lecture audio en mode silencieux sur iOS
    if (Platform.OS === "ios") {
      setAudioModeAsync({ playsInSilentMode: true });
    }

    // Récupérer le nom de l'élève
    AsyncStorage.getItem("user_name").then((name) => {
      if (name) setUserName(name);
    });

    return () => {
      welcomeVideo.release();
    };
  }, []);

  const handleJoinGroup = () => {
    // Ouvrir le lien vers le groupe Telegram
    Linking.openURL(SOCIAL_LINKS.telegram);
  };

  return (
    <ScreenContainer>
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <View className="flex-1">
          {/* Hero Section avec vidéo spectaculaire */}
          <View className="relative">
            {/* Vidéo de bienvenue en arrière-plan */}
            <View className="w-full h-80">
              <VideoView
                player={welcomeVideo}
                style={{ width: "100%", height: "100%" }}
                contentFit="cover"
                nativeControls={false}
              />
            </View>
            
            {/* Overlay avec gradient pour lisibilité */}
            <View className="absolute inset-0 bg-gradient-to-b from-transparent via-black/30 to-black/60" />
            
            {/* Contenu superposé */}
            <View className="absolute inset-0 items-center justify-center px-6">
              {/* Chapeau académique en grand */}
              <Text className="text-8xl mb-4">🎓</Text>
              
              <Text className="text-5xl font-bold text-white text-center leading-tight drop-shadow-2xl">
                IA Business Academy
              </Text>
              
              {userName && (
                <View className="bg-primary/90 px-6 py-3 rounded-full mt-4">
                  <Text className="text-lg font-bold text-white">
                    Bonjour {userName} ! 👋
                  </Text>
                </View>
              )}
              
              <Text className="text-xl text-white/95 text-center px-4 leading-relaxed mt-4 drop-shadow-lg">
                Maîtrisez l'IA pour transformer votre business
              </Text>
            </View>
          </View>

          <View className="p-6">
            {/* Section Pourquoi l'IA Business Academy */}
            <View className="mb-8">
              <View className="items-center mb-6">
                <Text className="text-4xl mb-4">🎯</Text>
                <Text className="text-3xl font-bold text-foreground text-center leading-tight">
                  Pourquoi l'IA Business Academy ?
                </Text>
              </View>
              
              <Text className="text-lg text-foreground leading-relaxed mb-6 text-center">
                L'IA Business Academy a été créée avec une mission simple mais puissante : <Text className="font-bold text-primary">émocratiser l'intelligence artificielle pour tous les entrepreneurs</Text>.
              </Text>
              
              <View className="bg-primary/10 rounded-3xl p-6 mb-4 border-2 border-primary/30">
                <Text className="text-base text-foreground leading-relaxed mb-4">
                  Nous avons constaté que de nombreux entrepreneurs talentueux restaient bloqués par la complexité apparente de l'IA. Pourtant, ces outils peuvent <Text className="font-semibold">multiplier leur productivité par 10</Text>, réduire leurs coûts et leur faire gagner des heures précieuses chaque jour.
                </Text>
                
                <Text className="text-base text-foreground leading-relaxed">
                  Notre académie propose des <Text className="font-semibold text-primary">formations gratuites et payantes, pratiques et accessibles</Text>, conçues spécifiquement pour les entrepreneurs qui veulent des résultats concrets, pas de la théorie.
                </Text>
              </View>
              
              <View className="bg-success/10 rounded-3xl p-6 border-2 border-success/30">
                <Text className="text-xl font-bold text-foreground mb-4 text-center">
                  ✨ Notre promesse
                </Text>
                <View className="gap-3">
                  <View className="flex-row items-start gap-3">
                    <Text className="text-2xl">🚀</Text>
                    <View className="flex-1">
                      <Text className="text-base font-semibold text-foreground">Formations pratiques</Text>
                      <Text className="text-sm text-foreground">Des tutoriels pas à pas que vous pouvez appliquer immédiatement</Text>
                    </View>
                  </View>
                  
                  <View className="flex-row items-start gap-3">
                    <Text className="text-2xl">💎</Text>
                    <View className="flex-1">
                      <Text className="text-base font-semibold text-foreground">Formations accessibles</Text>
                      <Text className="text-sm text-foreground">Formations gratuites et payantes pour tous les budgets</Text>
                    </View>
                  </View>
                  
                  <View className="flex-row items-start gap-3">
                    <Text className="text-2xl">🤝</Text>
                    <View className="flex-1">
                      <Text className="text-base font-semibold text-foreground">Communauté d'entraide</Text>
                      <Text className="text-sm text-foreground">Échangez avec d'autres entrepreneurs et progressez ensemble</Text>
                    </View>
                  </View>
                  
                  <View className="flex-row items-start gap-3">
                    <Text className="text-2xl">⚡</Text>
                    <View className="flex-1">
                      <Text className="text-base font-semibold text-foreground">Résultats rapides</Text>
                      <Text className="text-sm text-foreground">Voyez l'impact de l'IA sur votre business dès la première semaine</Text>
                    </View>
                  </View>
                </View>
              </View>
            </View>

            {/* Section Ce que vous allez apprendre */}
            <View className="mb-8">
              <Text className="text-2xl font-bold text-foreground mb-4">
                💡 Ce que vous allez maîtriser
              </Text>
              
              <View className="gap-4">
                <View className="flex-row items-start gap-3 pb-4 border-b-2 border-border">
                  <View className="bg-primary rounded-full p-2 mt-1">
                    <Text className="text-xl">📸</Text>
                  </View>
                  <View className="flex-1">
                    <Text className="text-lg font-semibold text-foreground">Création de visuels IA</Text>
                    <Text className="text-sm text-foreground leading-relaxed">
                      Générez des images professionnelles pour vos réseaux sociaux, publicités et site web sans designer
                    </Text>
                  </View>
                </View>
                
                <View className="flex-row items-start gap-3 pb-4 border-b-2 border-border">
                  <View className="bg-primary rounded-full p-2 mt-1">
                    <Text className="text-xl">🎬</Text>
                  </View>
                  <View className="flex-1">
                    <Text className="text-lg font-semibold text-foreground">Production vidéo IA</Text>
                    <Text className="text-sm text-foreground leading-relaxed">
                      Créez des vidéos marketing captivantes en quelques clics pour booster votre visibilité
                    </Text>
                  </View>
                </View>
                
                <View className="flex-row items-start gap-3 pb-4 border-b-2 border-border">
                  <View className="bg-primary rounded-full p-2 mt-1">
                    <Text className="text-xl">🛍️</Text>
                  </View>
                  <View className="flex-1">
                    <Text className="text-lg font-semibold text-foreground">E-commerce avec IA</Text>
                    <Text className="text-sm text-foreground leading-relaxed">
                      Automatisez votre boutique en ligne et optimisez vos ventes grâce à l'intelligence artificielle
                    </Text>
                  </View>
                </View>
                
                <View className="flex-row items-start gap-3">
                  <View className="bg-primary rounded-full p-2 mt-1">
                    <Text className="text-xl">💎</Text>
                  </View>
                  <View className="flex-1">
                    <Text className="text-lg font-semibold text-foreground">Maîtrise de Gemini</Text>
                    <Text className="text-sm text-foreground leading-relaxed">
                      Exploitez tout le potentiel de Google Gemini pour votre stratégie business
                    </Text>
                  </View>
                </View>
              </View>
            </View>

            {/* Navigation - Accès rapide */}
            <View className="mb-8">
              <Text className="text-2xl font-bold text-foreground mb-4">🎯 Commencez maintenant</Text>
              
              <View className="gap-4">
                <TouchableOpacity
                  className="bg-primary rounded-2xl p-6 active:opacity-80 shadow-lg"
                  onPress={() => router.push("/(tabs)/formations")}
                >
                  <View className="flex-row items-center gap-4">
                    <View className="bg-white/20 rounded-full p-3">
                      <IconSymbol size={32} name="book.fill" color="#FFFFFF" />
                    </View>
                    <View className="flex-1">
                      <Text className="text-xl font-bold text-white">Formations</Text>
                      <Text className="text-sm text-white/90 mt-1">
                        4 mini-formations pratiques sur l'IA
                      </Text>
                    </View>
                    <IconSymbol size={24} name="chevron.right" color="#FFFFFF" />
                  </View>
                </TouchableOpacity>

                <TouchableOpacity
                  className="bg-surface rounded-2xl p-6 active:opacity-80 border-2 border-primary/30"
                  onPress={() => router.push("/(tabs)/ebooks")}
                >
                  <View className="flex-row items-center gap-4">
                    <View className="bg-primary rounded-full p-3">
                      <IconSymbol size={32} name="books.vertical.fill" color="#F5F0E8" />
                    </View>
                    <View className="flex-1">
                      <Text className="text-xl font-bold text-foreground">Ebooks</Text>
                      <Text className="text-sm text-foreground mt-1">
                        Guides complets pour entrepreneurs
                      </Text>
                    </View>
                    <IconSymbol size={24} name="chevron.right" color="#C9B8A8" />
                  </View>
                </TouchableOpacity>

                <TouchableOpacity
                  className="bg-surface rounded-2xl p-6 active:opacity-80 border-2 border-primary/30"
                  onPress={() => router.push("/(tabs)/generator")}
                >
                  <View className="flex-row items-center gap-4">
                    <View className="bg-primary rounded-full p-3">
                      <IconSymbol size={32} name="sparkles" color="#F5F0E8" />
                    </View>
                    <View className="flex-1">
                      <Text className="text-xl font-bold text-foreground">Générateur d'Images</Text>
                      <Text className="text-sm text-foreground mt-1">
                        Créez des visuels avec l'IA gratuitement
                      </Text>
                    </View>
                    <IconSymbol size={24} name="chevron.right" color="#C9B8A8" />
                  </View>
                </TouchableOpacity>
              </View>
            </View>

            {/* CTA Groupe d'Entraide */}
            <TouchableOpacity
              className="bg-gradient-to-r from-primary to-primary/80 rounded-3xl p-8 active:opacity-80 shadow-xl mb-8"
              onPress={handleJoinGroup}
            >
              <View className="items-center gap-4">
                <View className="bg-white/20 rounded-full p-4">
                  <IconSymbol size={48} name="person.3.fill" color="#FFFFFF" />
                </View>
                <Text className="text-2xl font-bold text-white text-center">
                  Rejoignez notre communauté
                </Text>
                <Text className="text-base text-white/95 text-center leading-relaxed">
                  Échangez avec des centaines d'entrepreneurs qui utilisent l'IA pour développer leur business
                </Text>
                <View className="bg-white/20 px-8 py-3 rounded-full mt-2">
                  <Text className="text-white font-bold text-lg">Rejoindre maintenant →</Text>
                </View>
              </View>
            </TouchableOpacity>

            {/* Programme d'Affiliation */}
            <View className="bg-success/10 rounded-3xl p-6 border-2 border-success/30 mb-8">
              <View className="flex-row items-center gap-3 mb-4">
                <View className="bg-success rounded-full p-3">
                  <IconSymbol size={28} name="dollarsign.circle.fill" color="#FFFFFF" />
                </View>
                <Text className="text-xl font-bold text-foreground flex-1">
                  Programme d'Affiliation
                </Text>
              </View>
              
              <Text className="text-base text-foreground leading-relaxed mb-4">
                Gagnez des commissions en recommandant l'IA Business Academy. Jusqu'à 30% de commission sur chaque vente !
              </Text>
              
              <View className="gap-3 mb-4">
                <Text className="text-sm text-foreground leading-relaxed">
                  ✓ Commissions récurrentes sur les abonnements
                </Text>
                <Text className="text-sm text-foreground leading-relaxed">
                  ✓ Matériel marketing fourni
                </Text>
                <Text className="text-sm text-foreground leading-relaxed">
                  ✓ Tableau de bord pour suivre vos gains
                </Text>
                <Text className="text-sm text-foreground leading-relaxed">
                  ✓ Paiements mensuels sécurisés
                </Text>
              </View>
              
              <TouchableOpacity className="bg-success rounded-2xl p-4 active:opacity-80 shadow-md">
                <Text className="text-white font-bold text-center text-base">
                  Devenir Affilié →
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </ScrollView>
    </ScreenContainer>
  );
}
