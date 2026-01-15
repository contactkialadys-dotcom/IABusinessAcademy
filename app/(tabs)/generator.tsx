import { ScrollView, Text, View, TouchableOpacity, TextInput, Image, ActivityIndicator } from "react-native";
import { useState } from "react";

import { ScreenContainer } from "@/components/screen-container";
import { IconSymbol } from "@/components/ui/icon-symbol";
import { trpc } from "@/lib/trpc";
import { trackEvent } from "@/hooks/use-analytics";

const promptsByCategory = {
  maquillage: [
    "Photo produit professionnelle d'un rouge à lèvres luxueux sur fond beige avec éclairage doux, style e-commerce",
    "Palette de maquillage colorée avec pinceaux, photo studio haute qualité, fond blanc pur, éclairage professionnel",
    "Mascara noir élégant avec packaging doré, photo produit premium, fond rose pastel, ombres douces",
  ],
  beaute: [
    "Sérum de beauté dans flacon en verre transparent avec pipette dorée, fond blanc minimaliste, éclairage studio",
    "Crème visage luxueuse dans pot blanc avec couvercle doré, entourée de fleurs fraîches, fond beige élégant",
    "Huile de beauté dans bouteille ambre avec plantes naturelles, ambiance spa, lumière naturelle douce",
  ],
  bijoux: [
    "Collier en or avec pendentif diamant sur présentoir velours noir, éclairage bijouterie, reflets brillants",
    "Boucles d'oreilles en argent élégantes sur marbre blanc, photo joaillerie professionnelle, fond neutre",
    "Bracelet doré délicat avec pierres précieuses, présentation luxueuse, fond sombre avec reflets",
  ],
  chaussures: [
    "Baskets blanches modernes sur fond coloré uni, photo e-commerce professionnelle, éclairage uniforme",
    "Escarpins noirs élégants en cuir, photo studio haute qualité, fond gris neutre, reflets subtils",
    "Sneakers colorées tendance flottant dans l'air, fond dynamique, style publicitaire moderne",
  ],
  vetements: [
    "T-shirt blanc basique sur cinêtre en bois, fond minimaliste beige, lumière naturelle douce",
    "Robe élégante noire sur mannequin, photo mode professionnelle, fond blanc studio, éclairage parfait",
    "Veste en jean décontractée pliée artistiquement, fond neutre, style catalogue mode",
  ],
  cosmetiques: [
    "Gamme de produits cosmétiques alignés, packaging blanc et or, fond rose pastel, éclairage doux",
    "Crème hydratante avec texture crémeuse visible, fond blanc pur, macro photo professionnelle",
    "Set de soins visage avec ingrédients naturels autour, ambiance spa luxueuse, lumière naturelle",
  ],
};

const allPrompts = Object.values(promptsByCategory).flat();

export default function GeneratorScreen() {
  const [prompt, setPrompt] = useState("");
  const [generatedImage, setGeneratedImage] = useState<string | null>(null);

  const generateMutation = trpc.imageGenerator.generate.useMutation({
    onSuccess: (data) => {
      if (data.imageUrl) {
        setGeneratedImage(data.imageUrl);
      }
    },
  });

  const historyQuery = trpc.imageGenerator.getHistory.useQuery();

  const handleGenerate = () => {
    if (prompt.trim()) {
      generateMutation.mutate({ prompt: prompt.trim() });
      trackEvent('Générateur', 'Générer image', prompt.trim().substring(0, 50));
    }
  };

  const handleDownload = () => {
    if (generatedImage) {
      // Sur mobile, on pourrait utiliser expo-file-system pour télécharger
      // Pour l'instant, on affiche juste un message
      alert("Image prête à être téléchargée !");
    }
  };

  return (
    <ScreenContainer>
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <View className="flex-1 gap-6 p-6">
          {/* Header */}
          <View className="pt-4">
            <Text className="text-3xl font-bold text-foreground">Générateur d'Images</Text>
            <Text className="text-base text-muted mt-2">
              Créez des visuels professionnels avec l'IA
            </Text>
          </View>

          {/* Image générée - EN HAUT */}
          {generatedImage && (
            <View className="gap-3">
              <Text className="text-lg font-bold text-foreground">✨ Votre image générée</Text>
              <View className="bg-surface rounded-3xl p-4 border-2 border-border shadow-lg">
                <Image
                  source={{ uri: generatedImage }}
                  className="w-full aspect-square rounded-2xl"
                  resizeMode="cover"
                />
                <TouchableOpacity
                  className="bg-primary rounded-2xl p-4 mt-4 active:opacity-80 shadow-md"
                  onPress={handleDownload}
                >
                  <Text className="text-background font-bold text-center text-base">
                    📥 Télécharger l'image
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          )}

          {/* Section pour les élèves */}
          <View className="bg-primary/10 rounded-2xl p-5 border border-primary/30">
            <View className="flex-row items-center gap-3 mb-2">
              <IconSymbol size={24} name="star.fill" color="#8B6F47" />
              <Text className="text-lg font-bold text-foreground">Les Élèves</Text>
            </View>
            <Text className="text-sm text-muted leading-relaxed">
              En tant qu'élève de l'IA Business Academy, vous bénéficiez d'un accès gratuit au générateur d'images. Créez autant de visuels que nécessaire pour votre business !
            </Text>
          </View>

          {/* Champ de saisie */}
          <View className="gap-3">
            <Text className="text-base font-semibold text-foreground">
              Décrivez l'image que vous souhaitez créer
            </Text>
            <TextInput
              className="bg-surface rounded-xl p-4 text-foreground border border-border min-h-[100px]"
              placeholder="Ex: Un logo moderne pour une startup tech..."
              placeholderTextColor="#C9B8A8"
              value={prompt}
              onChangeText={setPrompt}
              multiline
              textAlignVertical="top"
            />
            
            {/* Bouton Générer - Juste après le champ de saisie */}
            <TouchableOpacity
              className={`rounded-2xl p-4 ${
                prompt.trim() && !generateMutation.isPending
                  ? "bg-primary"
                  : "bg-surface"
              }`}
              onPress={handleGenerate}
              disabled={!prompt.trim() || generateMutation.isPending}
            >
              {generateMutation.isPending ? (
                <View className="flex-row items-center justify-center gap-2">
                  <ActivityIndicator color="#F5F0E8" />
                  <Text className="text-background font-bold text-center">
                    Génération en cours...
                  </Text>
                </View>
              ) : (
                <Text
                  className={`font-bold text-center ${
                    prompt.trim() ? "text-background" : "text-muted"
                  }`}
                >
                  🎨 Générer l'image
                </Text>
              )}
            </TouchableOpacity>
          </View>

          {/* Catégories de prompts par domaine */}
          <View className="gap-3">
            <Text className="text-sm font-semibold text-muted">Prompts par domaine business :</Text>
            
            {Object.entries(promptsByCategory).map(([category, prompts]) => (
              <View key={category} className="gap-2">
                <Text className="text-xs font-bold text-primary uppercase">
                  {category === 'maquillage' ? '💄 Maquillage' :
                   category === 'beaute' ? '✨ Beauté' :
                   category === 'bijoux' ? '💎 Bijoux' :
                   category === 'chaussures' ? '👟 Chaussures' :
                   category === 'vetements' ? '👔 Vêtements' :
                   '🧼 Cosmétiques'}
                </Text>
                <View className="flex-row flex-wrap gap-2">
                  {prompts.map((example: string, index: number) => (
                    <TouchableOpacity
                      key={index}
                      className="bg-surface rounded-lg px-3 py-2 border border-border active:opacity-80 max-w-full"
                      onPress={() => setPrompt(example)}
                    >
                      <Text className="text-xs text-foreground" numberOfLines={2}>
                        {example.length > 60 ? example.substring(0, 60) + '...' : example}
                      </Text>
                    </TouchableOpacity>
                  ))}
                </View>
              </View>
            ))}
          </View>

          {/* Affichage de l'erreur */}
          {generateMutation.isError && (
            <View className="bg-error/10 rounded-xl p-4 border border-error/30">
              <Text className="text-error text-sm">
                Une erreur est survenue lors de la génération. Veuillez réessayer.
              </Text>
            </View>
          )}

          {/* Historique */}
          {historyQuery.data && historyQuery.data.length > 0 && (
            <View className="gap-3 mb-6">
              <Text className="text-lg font-bold text-foreground">Historique</Text>
              <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                <View className="flex-row gap-3">
                  {historyQuery.data.map((item: any) => (
                    <TouchableOpacity
                      key={item.id}
                      className="bg-surface rounded-xl border border-border overflow-hidden active:opacity-80"
                      onPress={() => setGeneratedImage(item.imageUrl)}
                    >
                      <Image
                        source={{ uri: item.imageUrl }}
                        className="w-24 h-24"
                        resizeMode="cover"
                      />
                    </TouchableOpacity>
                  ))}
                </View>
              </ScrollView>
            </View>
          )}
        </View>
      </ScrollView>
    </ScreenContainer>
  );
}
