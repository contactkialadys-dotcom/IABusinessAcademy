import { View, Text, TextInput, TouchableOpacity, ScrollView, KeyboardAvoidingView, Platform, Alert } from "react-native";
import { useState, useRef, useEffect } from "react";
import * as Clipboard from 'expo-clipboard';

import { ScreenContainer } from "@/components/screen-container";
import { IconSymbol } from "@/components/ui/icon-symbol";
import { trpc } from "@/lib/trpc";
import { trackEvent } from "@/hooks/use-analytics";

interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
  timestamp: Date;
}

export default function ChatbotScreen() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "welcome",
      role: "assistant",
      content: "Bonjour ! Je suis votre assistant IA Business Academy. Posez-moi toutes vos questions sur l'intelligence artificielle, les outils IA, le marketing digital, ou comment développer votre business avec l'IA. Je suis là pour vous aider ! 🚀",
      timestamp: new Date(),
    },
  ]);
  const [inputText, setInputText] = useState("");
  const scrollViewRef = useRef<ScrollView>(null);

  const chatMutation = trpc.chatbot.sendMessage.useMutation({
    onSuccess: (data: { response: string }) => {
      const assistantMessage: Message = {
        id: Date.now().toString() + "-assistant",
        role: "assistant",
        content: data.response,
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, assistantMessage]);
    },
  });

  const handleSend = () => {
    if (inputText.trim()) {
      const userMessage: Message = {
        id: Date.now().toString(),
        role: "user",
        content: inputText.trim(),
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, userMessage]);
      chatMutation.mutate({ message: inputText.trim() });
      trackEvent('Chatbot', 'Envoyer message', inputText.trim().substring(0, 50));
      setInputText("");
    }
  };

  const handleCopy = async (content: string) => {
    try {
      await Clipboard.setStringAsync(content);
      Alert.alert("✅ Copié", "La réponse a été copiée dans le presse-papiers");
    } catch (error) {
      Alert.alert("Erreur", "Impossible de copier le texte");
    }
  };

  useEffect(() => {
    // Auto-scroll vers le bas quand de nouveaux messages arrivent
    scrollViewRef.current?.scrollToEnd({ animated: true });
  }, [messages]);

  return (
    <ScreenContainer>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={{ flex: 1 }}
        keyboardVerticalOffset={100}
      >
        <View className="flex-1">
          {/* Header */}
          <View className="p-6 pb-4 border-b border-border">
            <Text className="text-2xl font-bold text-foreground">Assistant IA</Text>
            <Text className="text-sm text-muted mt-1">
              Posez toutes vos questions sur l'IA et le business
            </Text>
          </View>

          {/* Messages */}
          <ScrollView
            ref={scrollViewRef}
            contentContainerStyle={{ flexGrow: 1, padding: 16 }}
            className="flex-1"
          >
            <View className="gap-4">
              {messages.map((message) => (
                <View key={message.id}>
                  <View
                    className={`flex-row ${message.role === "user" ? "justify-end" : "justify-start"}`}
                  >
                    {message.role === "assistant" && (
                      <View className="bg-primary rounded-full w-8 h-8 items-center justify-center mr-2">
                        <IconSymbol size={18} name="sparkles" color="#F5F0E8" />
                      </View>
                    )}
                    <View
                      className={`max-w-[80%] rounded-3xl p-4 shadow-md ${
                        message.role === "user"
                          ? "bg-primary"
                          : "bg-surface border-2 border-border"
                      }`}
                    >
                      <Text
                        className={`text-base leading-relaxed ${
                          message.role === "user" ? "text-background" : "text-foreground"
                        }`}
                      >
                        {message.content}
                      </Text>
                    </View>
                    {message.role === "user" && (
                      <View className="bg-muted rounded-full w-8 h-8 items-center justify-center ml-2">
                        <IconSymbol size={18} name="person.fill" color="#F5F0E8" />
                      </View>
                    )}
                  </View>
                  {/* Bouton copier pour les réponses de l'assistant */}
                  {message.role === "assistant" && (
                    <View className="flex-row justify-start ml-10 mt-1">
                      <TouchableOpacity
                        onPress={() => handleCopy(message.content)}
                        className="flex-row items-center gap-1 px-3 py-1 rounded-full bg-surface border border-border"
                        style={{ opacity: 0.8 }}
                      >
                        <IconSymbol size={14} name="doc.on.doc" color="#8B4513" />
                        <Text className="text-xs text-muted">Copier</Text>
                      </TouchableOpacity>
                    </View>
                  )}
                </View>
              ))}

              {chatMutation.isPending && (
                <View className="flex-row justify-start">
                  <View className="bg-primary rounded-full w-8 h-8 items-center justify-center mr-2">
                    <IconSymbol size={18} name="sparkles" color="#F5F0E8" />
                  </View>
                  <View className="bg-surface border border-border rounded-2xl p-4">
                    <Text className="text-base text-muted">En train d'écrire...</Text>
                  </View>
                </View>
              )}
            </View>
          </ScrollView>

          {/* Input */}
          <View className="p-4 border-t border-border bg-background">
            <View className="flex-row items-center gap-2">
              <TextInput
                className="flex-1 bg-surface rounded-2xl p-4 text-foreground border-2 border-border shadow-sm text-base"
                placeholder="Posez votre question..."
                placeholderTextColor="#C9B8A8"
                value={inputText}
                onChangeText={setInputText}
                multiline
                maxLength={500}
                onSubmitEditing={handleSend}
              />
              <TouchableOpacity
                className={`rounded-2xl p-3 shadow-md ${
                  inputText.trim() && !chatMutation.isPending ? "bg-primary" : "bg-surface"
                }`}
                onPress={handleSend}
                disabled={!inputText.trim() || chatMutation.isPending}
              >
                <IconSymbol
                  size={24}
                  name="arrow.up.circle.fill"
                  color={inputText.trim() && !chatMutation.isPending ? "#F5F0E8" : "#C9B8A8"}
                />
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </KeyboardAvoidingView>
    </ScreenContainer>
  );
}
