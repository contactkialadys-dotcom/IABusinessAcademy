import { useEffect } from 'react';
import ReactGA from 'react-ga4';
import { usePathname } from 'expo-router';
import Constants from 'expo-constants';

let isInitialized = false;

/**
 * Hook pour initialiser et utiliser Google Analytics dans l'application.
 * 
 * Ce hook initialise automatiquement Google Analytics avec l'ID de mesure
 * fourni via la variable d'environnement EXPO_PUBLIC_GA_MEASUREMENT_ID.
 * Il suit également automatiquement les changements de page.
 * 
 * @example
 * ```tsx
 * export default function MyScreen() {
 *   useAnalytics();
 *   return <View>...</View>;
 * }
 * ```
 */
export function useAnalytics() {
  const pathname = usePathname();
  
  useEffect(() => {
    // Récupérer l'ID de mesure depuis les variables d'environnement
    const measurementId = Constants.expoConfig?.extra?.GA_MEASUREMENT_ID || 
                         process.env.EXPO_PUBLIC_GA_MEASUREMENT_ID;
    
    // Initialiser Google Analytics une seule fois
    if (!isInitialized && measurementId) {
      ReactGA.initialize(measurementId, {
        gaOptions: {
          anonymizeIp: true, // Anonymiser les adresses IP pour la conformité RGPD
        },
      });
      isInitialized = true;
      console.log('Google Analytics initialized with ID:', measurementId);
    }
    
    // Suivre les changements de page
    if (isInitialized && pathname) {
      ReactGA.send({ hitType: 'pageview', page: pathname });
      console.log('Page view tracked:', pathname);
    }
  }, [pathname]);
}

/**
 * Fonction pour suivre des événements personnalisés dans Google Analytics.
 * 
 * @param category - Catégorie de l'événement (ex: "Formation", "E-book", "Chatbot")
 * @param action - Action effectuée (ex: "Démarrer", "Télécharger", "Compléter")
 * @param label - Label optionnel pour plus de détails (ex: nom de la formation)
 * @param value - Valeur numérique optionnelle (ex: durée en secondes)
 * 
 * @example
 * ```tsx
 * trackEvent('Formation', 'Démarrer', 'Gemini pour les débutants');
 * trackEvent('E-book', 'Télécharger', 'Guide IA 2024', 1);
 * ```
 */
export function trackEvent(
  category: string,
  action: string,
  label?: string,
  value?: number
) {
  if (isInitialized) {
    ReactGA.event({
      category,
      action,
      label,
      value,
    });
    console.log('Event tracked:', { category, action, label, value });
  }
}
