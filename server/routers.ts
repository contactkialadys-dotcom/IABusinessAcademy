import { z } from "zod";
import { COOKIE_NAME } from "../shared/const.js";
import { getSessionCookieOptions } from "./_core/cookies";
import { systemRouter } from "./_core/systemRouter";
import { publicProcedure, router } from "./_core/trpc";
import { generateImage } from "./_core/imageGeneration";
import * as db from "./db";

export const appRouter = router({
  // if you need to use socket.io, read and register route in server/_core/index.ts, all api should start with '/api/' so that the gateway can route correctly
  system: systemRouter,
  auth: router({
    me: publicProcedure.query((opts) => opts.ctx.user),
    logout: publicProcedure.mutation(({ ctx }) => {
      const cookieOptions = getSessionCookieOptions(ctx.req);
      ctx.res.clearCookie(COOKIE_NAME, { ...cookieOptions, maxAge: -1 });
      return {
        success: true,
      } as const;
    }),
  }),

  // Générateur d'images pour les élèves de l'IA Business Academy
  imageGenerator: router({
    generate: publicProcedure
      .input(z.object({
        prompt: z.string().min(1).max(1000),
      }))
      .mutation(async ({ input }) => {
        // Générer l'image avec l'IA
        const { url: imageUrl } = await generateImage({
          prompt: input.prompt,
        });

        if (!imageUrl) {
          throw new Error("Failed to generate image");
        }

        // Sauvegarder dans l'historique
        const imageId = await db.saveGeneratedImage({
          prompt: input.prompt,
          imageUrl,
        });

        return {
          id: imageId.toString(),
          imageUrl,
          prompt: input.prompt,
        };
      }),

    getHistory: publicProcedure.query(async () => {
      return db.getGeneratedImages();
    }),
  }),

  // Chatbot IA pour répondre aux questions des élèves
  chatbot: router({
    sendMessage: publicProcedure
      .input(z.object({
        message: z.string().min(1).max(500),
      }))
      .mutation(async ({ input }) => {
        const { invokeLLM } = await import("./_core/llm");
        
        const response = await invokeLLM({
          messages: [
            {
              role: "system",
              content: "Tu es un assistant expert en intelligence artificielle et business pour l'IA Business Academy. Tu aides les entrepreneurs à comprendre et utiliser l'IA pour développer leur business. Règles STRICTES : 1) Réponds en texte simple SANS formatage Markdown (pas de *, **, #, ###, listes à puces). 2) Maximum 150 mots par réponse. 3) Sois clair, direct et actionnable. 4) Utilise des exemples concrets. 5) Sois enthousiaste mais concis.",
            },
            {
              role: "user",
              content: input.message,
            },
          ],
        });

        const content = response.choices[0].message.content;
        const responseText = typeof content === "string" ? content : "Désolé, je n'ai pas pu générer une réponse.";
        
        return {
          response: responseText,
        };
      }),
  }),
});

export type AppRouter = typeof appRouter;
