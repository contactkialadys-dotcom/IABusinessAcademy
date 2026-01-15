import { ScrollView, Text, View, TouchableOpacity, ActivityIndicator, Platform, Linking, Image, Modal, TextInput } from "react-native";
import { useState, useEffect } from "react";
import { useAudioPlayer } from "expo-audio";
import { useRouter } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";

import { ScreenContainer } from "@/components/screen-container";
import { IconSymbol } from "@/components/ui/icon-symbol";
import { useProgress } from "@/hooks/use-progress";
import { trackEvent } from "@/hooks/use-analytics";

interface Formation {
  id: string;
  title: string;
  description: string;
  duration: string;
  level: string;
  category: string;
  modules: Module[];
}

interface Module {
  id: string;
  title: string;
  description: string;
  content: string;
}

interface FormationWithImage extends Formation {
  image?: any;
}

const formations: FormationWithImage[] = [
  {
    id: "3",
    title: "Photos Pro IA : Économisez des milliers d'euros",
    description: "Les entrepreneurs dépensent des fortunes dans les shootings photo. Découvrez comment créer des photos professionnelles en quelques minutes avec l'IA, gratuitement. Fini les shootings coûteux !",
    duration: "1h",
    level: "Débutant",
    category: "Création de contenu",
    image: require("@/assets/images/formation-photo-ia.png"),

    modules: [
      {
        id: "3-0",
        title: "🎧 L'art du prompting et son importance",
        description: "Comprenez pourquoi le prompting est la clé pour créer des photos IA professionnelles",
        content: "AUDIO_PROMPTING",
      },
      {
        id: "3-1",
        title: "🎧 Écoutez le guide audio des étapes",
        description: "Écoutez ce guide audio pour comprendre toutes les étapes facilement",
        content: "AUDIO_TUTORIAL",
      },
      {
        id: "3-2",
        title: "🎧 Générer des photos avec Gemini - Étape par étape",
        description: "Le guide complet pour créer des photos professionnelles avec Gemini",
        content: "AUDIO_GEMINI\n\n📸 COMMENT GÉNÉRER DES PHOTOS PRO AVEC GEMINI\n\nÉTAPE 1 : Accéder à Gemini\n- Allez sur gemini.google.com\n- Connectez-vous avec votre compte Google\n- C'est GRATUIT !\n\nÉTAPE 2 : Rédiger un prompt efficace\nUtilisez cette structure :\n\"Crée une photo produit professionnelle de [VOTRE PRODUIT], [DESCRIPTION DÉTAILLÉE], sur fond [COULEUR/STYLE], avec éclairage [TYPE], style [E-COMMERCE/LUXE/MINIMALISTE], haute qualité, 4K\"\n\nEXEMPLE CONCRET :\n\"Crée une photo produit professionnelle d'un rouge à lèvres rouge luxueux avec packaging doré, sur fond beige élégant, avec éclairage studio doux, style e-commerce haut de gamme, haute qualité, 4K\"\n\nÉTAPE 3 : Télécharger et utiliser\n- Cliquez sur l'image générée\n- Téléchargez en haute résolution\n- Utilisez pour vos réseaux sociaux, site web, publicités\n\n💡 ASTUCE : Générez 5-10 variations et choisissez la meilleure !",
      },
      {
        id: "3-3",
        title: "🎧 Créer un Gem personnalisé pour votre business",
        description: "Automatisez la génération de photos avec votre propre assistant IA",
        content: "AUDIO_GEM\n\n🤖 QU'EST-CE QU'UN GEM ?\n\nUn Gem est un assistant IA personnalisé que vous créez dans Gemini. Il connaît votre business et génère exactement ce dont vous avez besoin !\n\nCOMMENT CRÉER VOTRE GEM :\n\n1. Dans Gemini, cliquez sur 'Gem Manager'\n\n2. Cliquez sur 'Créer un nouveau Gem'\n\n3. Donnez-lui un nom : \"Expert Photos Produits\"\n\n4. Rédigez les instructions :\n\"Tu es un expert en création de photos produits pour e-commerce. Quand je te donne le nom d'un produit, tu génères automatiquement une photo professionnelle haute qualité avec :\n- Fond adapté au produit\n- Éclairage studio professionnel\n- Style e-commerce moderne\n- Composition équilibrée\n- Haute résolution 4K\"\n\n5. Sauvegardez votre Gem\n\nMAINTENANT, il vous suffit de dire :\n\"Génère une photo de mon nouveau parfum\"\n\nEt votre Gem crée automatiquement une photo pro ! 🚀\n\nVous gagnez des HEURES chaque semaine !",
      },
      {
        id: "3-4",
        title: "🎧 Prompts avancés pour chaque type de produit",
        description: "Les formules qui fonctionnent pour maquillage, bijoux, vêtements, etc.",
        content: "AUDIO_PROMPTS\n\n💯 PROMPTS PAR CATÉGORIE\n\nMAQUILLAGE :\n\"Photo produit professionnelle d'un [PRODUIT] [COULEUR] avec packaging [STYLE], sur fond [COULEUR] avec reflets doux, éclairage beauté, style magazine luxe, 4K\"\n\nBIJOUX :\n\"Bijou [TYPE] en [MATÉRIAU] avec [PIERRES], sur présentoir [STYLE], fond [COULEUR], éclairage bijouterie avec reflets brillants, style joaillerie haut de gamme, 4K\"\n\nVÊTEMENTS :\n\"[VÊTEMENT] [COULEUR] [STYLE] sur [SUPPORT], fond [AMBIANCE], lumière naturelle douce, style catalogue mode, composition équilibrée, 4K\"\n\nCHAUSSURES :\n\"[TYPE DE CHAUSSURE] [COULEUR] en [MATÉRIAU], sur fond [STYLE], éclairage [TYPE], angle [PERSPECTIVE], style e-commerce premium, 4K\"\n\nCOSMÉTIQUES :\n\"Produit cosmétique [TYPE] dans [CONTENANT], entouré de [ÉLÉMENTS NATURELS], fond [AMBIANCE], lumière spa douce, style bien-être luxe, 4K\"\n\n🔥 RÉSULTAT : Des photos qui coûteraient 500-1000€ avec un photographe, GRATUITEMENT !",
      },
      {
        id: "3-5",
        title: "🎧 Économisez des milliers d'euros en shootings",
        description: "Pourquoi les entrepreneurs gaspillent leur argent dans les shootings photo",
        content: "AUDIO_ECONOMIES\n\n💸 LA RÉALITÉ DES SHOOTINGS PHOTO\n\nCE QUE LES ENTREPRENEURS DÉPENSENT :\n\n💰 Coûts d'un shooting photo professionnel :\n- Photographe : 300-800€/séance\n- Studio : 100-300€/jour\n- Mannequin/modèle : 200-500€\n- Retouches : 50-200€\n\nTOTAL : 650-1800€ par shooting !\n\nFRÉQUENCE NÉCESSAIRE :\n- E-commerce : 1-2 shootings/mois\n- Budget annuel : 8 000 - 40 000€\n\n⚠️ LE PROBLÈME :\n\n1. Budget énorme qui pourrait servir à la publicité\n2. Impossible de tester rapidement de nouveaux produits\n3. Dépend du photographe et de sa disponibilité\n4. Modifications = nouveau shooting = nouveaux frais\n\n✨ LA SOLUTION : L'IA\n\nAVEC GEMINI (GRATUIT) :\n- 0€ de coût\n- Photos illimitées 24/7\n- Modifications instantanées\n- Testez 10 variations en 5 minutes\n\n🚀 CE QUE VOUS POUVEZ FAIRE AVEC L'ARGENT ÉCONOMISÉ :\n\n✓ Investir dans la publicité Facebook/Instagram\n✓ Acheter plus de stock\n✓ Embaucher un assistant\n✓ Lancer de nouveaux produits\n\n💡 LA CLÉ DU SUCCÈS :\n\nLes entrepreneurs qui maîtrisent l'IA ont un avantage MASSIF sur leurs concurrents. Pendant que les autres dépensent des milliers d'euros en shootings, vous créez des visuels pro gratuitement et réinvestissez dans la croissance.\n\nC'est simple : Plus d'argent pour les photos = Plus d'argent pour vendre = Plus de résultats !",
      },
      {
        id: "3-6",
        title: "📱 Accédez au contenu complet sur WhatsApp",
        description: "Rejoignez notre groupe WhatsApp pour accéder à tous les tutoriels vidéo et audios",
        content: "WHATSAPP_LINK",
      },
    ],
  },





  {
    id: "7",
    title: "Lancer son e-commerce en Afrique",
    description: "Guide complet pour créer et développer votre boutique en ligne en Afrique, de la création à la maîtrise de Facebook Ads.",
    duration: "2h 30min",
    level: "Intermédiaire",
    category: "E-commerce",
    image: require("@/assets/images/formation-ecommerce.png"),
    modules: [
      {
        id: "7-1",
        title: "Pourquoi l'e-commerce en Afrique est une opportunité en or",
        description: "Comprendre le potentiel du marché africain",
        content: "🚀 L'OPPORTUNITÉ AFRICAINE\n\nL'Afrique est le continent de l'avenir pour l'e-commerce. Voici pourquoi VOUS devez vous lancer maintenant :\n\nLES CHIFFRES QUI DONNENT LE VERTIGE\n\n• Marché : 75 milliards $ d'ici 2025\n• Croissance : +20% par an\n• Utilisateurs internet : 500 millions+\n• Pénétration mobile : 80%\n• Population jeune : 60% ont moins de 25 ans\n\nCE QUI REND L'AFRIQUE UNIQUE\n\n1. CONCURRENCE FAIBLE\nEn Europe, il y a 1000 boutiques pour chaque niche. En Afrique, vous pouvez être le premier !\n\n2. COÛTS PUBLICITAIRES BAS\nFacebook Ads coûte 10x moins cher qu'en Europe. Vous pouvez tester avec 5€/jour !\n\n3. DEMANDE EXPLOSIVE\nLes Africains veulent acheter en ligne mais manquent d'options de qualité.\n\n4. MOBILE-FIRST\nTout se passe sur smartphone. Pas besoin de site web complexe !\n\nSECTEURS QUI EXPLOSENT\n\n💄 Beauté & Cosmétiques : +35%/an\n👗 Mode & Accessoires : +30%/an\n📱 Électronique : +40%/an\n👶 Articles bébés : +25%/an\n📚 Produits digitaux : +50%/an\n\nEXEMPLE RÉEL\n\nSarah, 28 ans, Côte d'Ivoire\n- A lancé une boutique de bijoux sur Instagram\n- Investissement : 200€\n- Résultat après 6 mois : 2000€/mois\n\n💡 LE MOMENT, C'EST MAINTENANT !\n\nDans 5 ans, le marché sera saturé. Ceux qui se lancent aujourd'hui seront les leaders de demain.\n\nDans les prochains modules, je vous montre EXACTEMENT comment faire.",
      },
      {
        id: "7-2",
        title: "Choisir les produits qui se vendent vraiment",
        description: "Méthode pour identifier les produits rentables",
        content: "🎯 TROUVER LE BON PRODUIT\n\nLe choix du produit = 80% de votre succès. Voici comment ne PAS se tromper :\n\nLES 5 CRITÈRES D'OR\n\n1. MARGE MINIMUM 50%\nAchat : 10€ → Vente : 20€ minimum\nSinon, impossible de rentabiliser la pub !\n\n2. LÉGER ET COMPACT\nLivraison coûte cher en Afrique\n✓ Bijoux, vêtements, cosmétiques\n✗ Meubles, électroménager\n\n3. FORTE DEMANDE LOCALE\nUtilisez Facebook Marketplace pour voir ce qui se vend déjà\n\n4. PAS PÉRISSABLE\nLivraison peut prendre 3-7 jours\n\n5. DIFFICILE À TROUVER EN MAGASIN\nSi disponible partout, pourquoi acheter en ligne ?\n\nPRODUITS QUI MARCHENT EN 2026\n\n💄 BEAUTÉ (Marge : 60-80%)\n• Perruques et tissages\n• Maquillage\n• Produits capillaires\n• Parfums\n\n👗 MODE (Marge : 50-70%)\n• Bijoux fantaisie\n• Montres\n• Sacs à main\n• Lunettes de soleil\n\n📱 TECH (Marge : 40-60%)\n• Coques téléphone\n• Écouteurs\n• Powerbanks\n• Ring lights\n\n👶 BÉBÉS (Marge : 50-70%)\n• Vêtements\n• Jouets éducatifs\n• Accessoires\n\n📚 DIGITAL (Marge : 95-100%)\n• Formations\n• Ebooks\n• Templates\n\nCOMMENT VALIDER VOTRE IDÉE\n\nÉTAPE 1 : Recherche Facebook Marketplace\nSi d'autres vendent = demande existe !\n\nÉTAPE 2 : Posez la question\nDans les groupes Facebook de votre niche\n\nÉTAPE 3 : Test avec 10 unités\nCommandez petit stock, testez la demande\n\nERREURS FATALES À ÉVITER\n\n✗ Produits trop chers (adaptés au pouvoir d'achat local)\n✗ Produits sans demande (votre goût ≠ marché)\n✗ Trop de produits au début (concentrez-vous sur 3-5)\n✗ Produits encombrants (frais de port tuent la marge)\n\n💡 ASTUCE PRO\n\nCommencez avec des produits légers à forte marge (bijoux, cosmétiques). Une fois rentable, diversifiez !\n\nDans le prochain module : Créer votre boutique SANS budget.",
      },
      {
        id: "7-3",
        title: "Créer votre boutique en ligne (gratuit ou pas cher)",
        description: "3 options pour lancer votre boutique selon votre budget",
        content: "🛍️ CRÉER VOTRE BOUTIQUE\n\nVous n'avez PAS besoin de milliers d'euros. Voici 3 options selon votre budget :\n\nOPTION 1 : GRATUIT (0€)\n\nUtilisez les réseaux sociaux :\n\nFACEBOOK\n1. Créez une page professionnelle\n2. Activez la boutique Facebook\n3. Ajoutez vos produits\n4. Utilisez Facebook Marketplace\n\nINSTAGRAM\n1. Compte professionnel\n2. Boutique Instagram\n3. Posts + Stories avec produits\n\nWHATSAPP BUSINESS\n1. Téléchargez WhatsApp Business\n2. Créez votre catalogue\n3. Réponses automatiques\n4. Statuts pour promotions\n\n✓ Avantages : Gratuit, audience massive\n✗ Inconvénients : Moins professionnel\n\nOPTION 2 : LOW-COST (10-30€/mois)\n\nCréez votre site avec :\n\nSHOPIFY (29€/mois)\n• Le plus simple\n• Thèmes magnifiques\n• Paiements intégrés\n• Application mobile\n\nWOOCOMMERCE (10€/mois)\n• Basé sur WordPress\n• Très flexible\n• Un peu plus technique\n\n✓ Avantages : Professionnel, crédible\n✗ Inconvénients : Coût mensuel\n\nOPTION 3 : PRODUITS DIGITAUX (0€)\n\nGUMROAD\n• Gratuit pour commencer\n• Livraison automatique\n• Idéal pour ebooks, formations\n\nCE DONT VOUS AVEZ BESOIN\n\n1. PHOTOS PRODUITS\n• Smartphone suffit\n• Fond blanc ou neutre\n• Lumière naturelle\n• OU générez avec Gemini\n\n2. DESCRIPTIONS\nUtilisez ChatGPT :\n\"Crée une description produit pour [PRODUIT]. Inclus bénéfices, caractéristiques, CTA. 150 mots. Ton persuasif.\"\n\n3. LOGO\n• Canva (gratuit)\n• OU Gemini\n\n4. NOM DE DOMAINE (optionnel)\nvotreboutique.com (10€/an)\n\nSTRUCTURE DE VOTRE BOUTIQUE\n\n🏠 PAGE D'ACCUEIL\n• Bannière accrocheuse\n• Produits vedettes\n• Témoignages\n• Offres spéciales\n\n📸 PAGES PRODUITS\n• 3-5 photos minimum\n• Description détaillée\n• Prix clair\n• Bouton \"Acheter\" visible\n\n📞 CONTACT\n• Numéro WhatsApp\n• Email\n• Réseaux sociaux\n\nTEMPS DE CRÉATION\n\n• Réseaux sociaux : 2 heures\n• Shopify : 1 journée\n• WooCommerce : 2-3 jours\n\n💡 MA RECOMMANDATION\n\nDémarrez GRATUIT avec Instagram + WhatsApp Business. Une fois rentable, passez à Shopify pour plus de crédibilité.\n\nProchain module : Les paiements en Afrique.",
      },
      {
        id: "7-4",
        title: "Accepter les paiements en Afrique",
        description: "Toutes les solutions de paiement qui fonctionnent",
        content: "💳 SOLUTIONS DE PAIEMENT\n\nLe paiement est CRUCIAL. Voici toutes les options qui marchent en Afrique :\n\nSOLUTION 1 : MOBILE MONEY (LA PLUS POPULAIRE)\n\nAfrique de l'Ouest\n• Orange Money\n• MTN Mobile Money\n• Moov Money\n• Wave\n\nAfrique de l'Est\n• M-Pesa\n• Airtel Money\n\nComment ça marche :\n1. Client commande\n2. Vous envoyez votre numéro Mobile Money\n3. Client envoie l'argent\n4. Vous confirmez\n5. Vous expédiez\n\n✓ Très utilisé, instantané, faibles frais (0-1%)\n✗ Manuel, pas automatisé\n\nSOLUTION 2 : PASSERELLES DE PAIEMENT\n\nFLUTTERWAVE (Recommandé)\n• 34 pays africains\n• Cartes + Mobile Money\n• Intégration facile\n• Frais : 3,8%\n\nPAYSTACK (Nigeria)\n• Très populaire\n• Interface simple\n• Frais : 1,5% + 100 NGN\n\nCINETPAY (Francophone)\n• Support français\n• Mobile Money + cartes\n• Frais : 2-5%\n\n✓ Automatique, professionnel\n✗ Frais plus élevés\n\nSOLUTION 3 : PAIEMENT À LA LIVRAISON\n\nTRÈS POPULAIRE EN AFRIQUE !\n\nComment ça marche :\n1. Client commande\n2. Vous expédiez\n3. Client paie le livreur en espèces\n4. Livreur vous reverse (moins sa commission)\n\n✓ Rassure les clients, augmente les ventes de 30%\n✗ Risque d'annulation (10-15%)\n\nSOLUTION 4 : WHATSAPP + MOBILE MONEY\n\nLA COMBINAISON GAGNANTE pour démarrer :\n\n1. Client contacte sur WhatsApp\n2. Vous confirmez prix et dispo\n3. Client envoie via Mobile Money\n4. Vous envoyez capture transaction\n5. Vous expédiez\n\nSimple, direct, efficace !\n\nCONSEIL PRO : PROPOSEZ PLUSIEURS OPTIONS\n\nOffrez au minimum :\n1. Mobile Money\n2. Paiement à la livraison\n3. Cartes bancaires (si possible)\n\nPlus d'options = Plus de ventes !\n\nFRAIS MOYENS\n\n• Mobile Money direct : 0-1%\n• Passerelles : 2-4%\n• Paiement livraison : 0% (mais risque)\n• Cartes bancaires : 3-4%\n\n💡 MA STRATÉGIE\n\nDébut : WhatsApp + Mobile Money\nCroissance : Ajoutez Flutterwave\nScale : Tous les moyens de paiement\n\nProchain module : Livraison et logistique.",
      },
      {
        id: "7-5",
        title: "Gérer la livraison comme un pro",
        description: "Stratégies pour une livraison efficace et rentable",
        content: "🚚 LIVRAISON EN AFRIQUE\n\nLa livraison peut faire ou défaire votre business. Voici comment bien la gérer :\n\nLES DÉFIS\n\n1. Adresses imprécises\nSolution : Utilisez des points de repère\n\"Près de la pharmacie X, deuxième rue à gauche\"\n\n2. Coûts élevés\nSolution : Intégrez dans le prix ou minimum de commande\n\n3. Délais variables\nSolution : Soyez transparent (3-7 jours)\n\nOPTION 1 : SERVICES DE LIVRAISON\n\nAfrique de l'Ouest\n• DHL eCommerce\n• Gozem\n• Yango Delivery\n• Glovo\n\nAfrique de l'Est\n• Sendy\n• SafeBoda\n• Jumia Express\n\nCoûts moyens :\n• Local (même ville) : 1-3€\n• National : 5-15€\n• International : 20-50€\n\nOPTION 2 : LIVREURS INDÉPENDANTS\n\nEngagez des livreurs à moto\n\n✓ Moins cher (0,5-2€)\n✓ Plus flexible\n✗ Moins fiable\n✗ Pas d'assurance\n\nOPTION 3 : POINTS DE RETRAIT\n\nClients viennent récupérer chez vous\n\n✓ Coût zéro\n✓ Pas d'annulation\n✗ Moins pratique\n\nIdéal pour démarrer !\n\nSTRATÉGIE LIVRAISON GRATUITE\n\nOffrez la livraison gratuite au-dessus d'un montant :\n\nExemple :\n• < 50€ : Livraison 5€\n• ≥ 50€ : GRATUIT\n\nRésultat : Panier moyen +40% !\n\nOPTIMISER VOS COÛTS\n\n1. Négociez (50+ livraisons/mois)\n2. Groupez les livraisons (même zone, même jour)\n3. Emballages légers (moins de poids = moins cher)\n4. Proposez Standard vs Express\n\nGESTION DES RETOURS\n\nRetours rares en Afrique (5-10%) grâce au paiement livraison.\n\nPolitique recommandée :\n• Retour sous 7 jours\n• Produit non utilisé\n• Frais retour : client\n• Remboursement sous 14 jours\n\nEMBALLAGE\n\nInvestissez dans un bon emballage :\n• Protège le produit\n• Fait bonne impression\n• Génère du bouche-à-oreille\n\nCoût : 0,5-2€/colis\n\nSUIVI CLIENT (WHATSAPP)\n\nTenez vos clients informés :\n• Commande confirmée ✓\n• Colis expédié 🚚\n• En cours de livraison 📦\n• Livré 🎉\n\nRéduit les réclamations de 70% !\n\n💡 ASTUCE PRO\n\nDébut : Points de retrait\nCroissance : Livreurs indépendants\nScale : Services professionnels\n\nDernier module : MAÎTRISER FACEBOOK ADS !",
      },
      {
        id: "7-6",
        title: "Maîtriser Facebook Ads pour vendre massivement",
        description: "Guide complet pour créer des publicités rentables",
        content: "AUDIO_ECOM_FACEBOOK_ADS\n\n🚀 FACEBOOK ADS : LE GUIDE ULTIME\n\nFacebook Ads est l'outil le PLUS PUISSANT pour vendre en Afrique. Voici comment créer des pubs qui CONVERTISSENT :\n\nPOURQUOI FACEBOOK ADS ?\n\n• 200M+ Africains sur Facebook\n• Utilisation : 2-3h/jour\n• CPC : 0,05-0,20€ (10x moins cher qu'en Europe !)\n• CPM : 0,50-2€\n\nCONFIGURATION (15 MIN)\n\nÉTAPE 1 : Business Manager\n1. business.facebook.com\n2. Créez compte\n3. Ajoutez page Facebook\n4. Ajoutez compte Instagram\n\nÉTAPE 2 : Pixel Facebook\nLe pixel suit les visiteurs et leurs actions.\n\nPour Shopify :\nParamètres → Facebook Channel → Connectez\n\nPour WordPress :\nPlugin \"Facebook for WooCommerce\"\n\nÉTAPE 3 : Moyen de paiement\nAjoutez carte bancaire ou Mobile Money (via Flutterwave)\n\nCRÉER VOTRE PREMIÈRE CAMPAGNE\n\nOBJECTIF : Conversions (ventes)\n\nBUDGET : 5-10€/jour pour commencer\n\nCIBLAGE GAGNANT\n\nLOCALISATION\n• Votre pays\n• OU villes spécifiques si livraison limitée\n\nÂGE ET SEXE\nExemple cosmétiques : Femmes 18-45 ans\n\nINTÉRÊTS\n• Mode et beauté\n• Shopping en ligne\n• Marques concurrentes\n• Influenceurs de votre niche\n\nLANGUE\n• Français (Afrique francophone)\n• Anglais (Afrique anglophone)\n\nPLACEMENTS\n✓ Facebook Feed\n✓ Instagram Feed\n✓ Facebook Stories\n✓ Instagram Stories\n✗ Audience Network (décochez)\n\nCRÉER VOTRE PUB\n\nFORMAT : Carousel ou Image unique\n\nIMAGE/VIDÉO\n• Haute qualité\n• Fond coloré ou neutre\n• Produit bien visible\n• Texte sur l'image (\"PROMO -30%\")\n\nGénérez avec Gemini :\n\"Crée image publicitaire pour [PRODUIT], fond [COULEUR], style e-commerce moderne, texte 'PROMO -30%' visible, haute qualité\"\n\nTEXTE PUBLICITAIRE GAGNANT\n\nStructure en 6 étapes :\n\n1. HOOK (première ligne)\n🔥 PROMO LIMITÉE : -30% sur [PRODUIT] !\n\n2. PROBLÈME\nVous en avez marre de [PROBLÈME] ?\n\n3. SOLUTION\nDécouvrez [PRODUIT] qui [BÉNÉFICE]\n\n4. PREUVE SOCIALE\nDéjà 500+ clients satisfaits !\n\n5. URGENCE\nOffre valable jusqu'au [DATE] !\n\n6. CTA\nCommandez maintenant 🛍️\n\nUtilisez ChatGPT :\n\"Crée texte pub Facebook pour [PRODUIT]. Cible : [AUDIENCE]. Inclus hook, bénéfices, urgence, CTA. Ton persuasif. 150 mots. Emojis.\"\n\nBOUTON : \"Acheter maintenant\"\n\nLIEN : Votre page produit\n\nOPTIMISER (A/B TESTING)\n\nTestez :\n• 3 images différentes\n• 2 textes différents\n• 2 audiences différentes\n\nAprès 3 jours, gardez ce qui performe !\n\nMÉTRIQUES CLÉS\n\nCTR : 1-3% = Bon\nCPC : 0,05-0,20€ = Bon\nROAS : 3x minimum\n\nExemple :\nDépense : 100€\nVentes : 300€\nROAS : 3x ✓\n\nSTRATÉGIES AVANCÉES\n\n1. RETARGETING\nCiblez visiteurs qui n'ont pas acheté\nConversion : 5-10x supérieure !\n\n2. LOOKALIKE AUDIENCES\nFacebook trouve des clones de vos clients\nPuissant après 50+ ventes\n\n3. VIDÉOS\nMoins cher, plus engageant\nFilmez avec smartphone : unboxing, démo, témoignages\n\nBUDGET RECOMMANDÉ\n\nDébut : 5-10€/jour\nOptimisation : 20-50€/jour\nScaling : 100€/jour+\n\nRÈGLE D'OR : Ne dépensez que ce que vous pouvez perdre. Une fois rentable, réinvestissez les profits !\n\nERREURS FATALES\n\n✗ Ciblage trop large (tout le pays)\n✗ Budget trop faible (< 5€/jour)\n✗ Arrêter après 1 jour\n✗ Ne pas tester\n✗ Images de mauvaise qualité\n\nRÉSULTAT ATTENDU\n\nAvec bonne pub + bon produit :\n• 50-100 clics/jour\n• 2-5 ventes/jour\n• ROAS : 3-5x\n\n10€/jour → 30-50€/jour de ventes\n\n🎉 FÉLICITATIONS !\n\nVous avez maintenant TOUTES les clés pour réussir en e-commerce en Afrique.\n\nPASSEZ À L'ACTION DÈS AUJOURD'HUI !🚀",
      },
    ],
  },
  {
    id: "8",
    title: "Créer des vidéos professionnelles avec l'IA",
    description: "Apprenez à créer des vidéos virales pour TikTok, Instagram et YouTube avec les outils IA. Scripts, montage, voix off, tout est automatisé !",
    duration: "1h 30min",
    level: "Débutant",
    category: "Création de contenu",
    image: require("@/assets/images/formation-video-ia.png"),
    modules: [
      {
        id: "8-1",
        title: "Scripts vidéo gagnants avec ChatGPT",
        description: "Créez des scripts engageants qui captivent votre audience",
        content: "AUDIO_VIDEO_SCRIPTS\n\n📝 CRÉER DES SCRIPTS VIDÉO GAGNANTS\n\nLe script est la BASE d'une bonne vidéo. Sans bon script, même la meilleure vidéo échoue.\n\nSTRUCTURE GAGNANTE (HOOK-VALUE-CTA)\n\n1. HOOK (3 premières secondes)\nPhrase choc qui arrête le scroll\n\n2. VALUE (30-45 secondes)\nContenu utile, conseil, transformation\n\n3. CTA (5 dernières secondes)\nAppel à l'action clair\n\nPROMPT CHATGPT POUR SCRIPT\n\n\"Crée un script vidéo de 45 secondes pour [SUJET]. Format : Reels Instagram. Cible : entrepreneurs africains. Inclus :\\n- Hook percutant (3 sec)\\n- 3 conseils pratiques (30 sec)\\n- CTA engageant (5 sec)\\n- Ton : énergique et inspirant\\n- Indique les transitions visuelles\"\n\nEXEMPLE CONCRET\n\nSujet : \"Photos produits avec IA\"\n\n[0-3 sec] HOOK\n\"Vous payez 500€ pour un shooting photo ? STOP !\"\n[Visuel : Main qui barre un billet]\n\n[3-15 sec] CONSEIL 1\n\"Allez sur Gemini, c'est GRATUIT\"\n[Visuel : Écran Gemini]\n\n[15-30 sec] CONSEIL 2\n\"Tapez : Photo produit pro de [produit], fond beige, éclairage studio\"\n[Visuel : Texte qui s'écrit]\n\n[30-40 sec] CONSEIL 3\n\"En 10 secondes, vous avez une photo à 500€ !\"\n[Visuel : Résultat]\n\n[40-45 sec] CTA\n\"Suivez @ia_business_academy pour plus !\"\n\nTYPES DE VIDÉOS QUI MARCHENT\n\n1. TUTORIELS (\"Comment faire X\")\n2. AVANT/APRÈS\n3. ERREURS À ÉVITER\n4. SECRETS/ASTUCES\n5. TÉMOIGNAGES\n\nFRÉQUENCE : 3-5 vidéos/semaine minimum !",
      },
      {
        id: "8-2",
        title: "Outils IA pour créer des vidéos (gratuits et payants)",
        description: "Découvrez les meilleurs outils pour créer des vidéos pro",
        content: "AUDIO_VIDEO_OUTILS\n\n🛠️ OUTILS IA POUR CRÉER DES VIDÉOS\n\n1. CANVA (Gratuit + 11€/mois)\n• Templates vidéo prêts\n• Animations auto\n• Musique libre\n• Sous-titres auto\n\n2. CAPCUT (100% Gratuit)\nLE MEILLEUR pour mobile !\n• Montage facile\n• Effets et transitions\n• Sous-titres auto\n• Musiques TikTok\n\n3. RUNWAY ML (12$/mois)\nCRÉATION VIDÉO PAR IA\n• Texte → Vidéo\n• Image → Vidéo animée\n\nPROMPT EXEMPLE :\n\"Produit cosmétique qui tourne sur fond rose avec particules dorées, éclairage studio, 4K\"\n\n4. ELEVENLABS (Gratuit 10min/mois)\nVOIX OFF IA ULTRA-RÉALISTE\n• 20+ langues\n• Voix naturelles\n• Export MP3\n\n5. PICTORY (23$/mois)\nTEXTE → VIDÉO AUTO\n• Collez script\n• Vidéo générée avec images, voix, musique\n\nMON WORKFLOW COMPLET\n\n1. Script → ChatGPT\n2. Voix off → ElevenLabs\n3. Vidéos → Canva/Runway\n4. Montage → CapCut\n5. Publication\n\nTEMPS : 30 min pour une vidéo pro !",
      },
      {
        id: "8-3",
        title: "Créer des Reels et TikToks viraux",
        description: "Les formules qui génèrent des millions de vues",
        content: "AUDIO_VIDEO_VIRAUX\n\n🚀 CRÉER DU CONTENU VIRAL\n\nLe viral n'est PAS de la chance. C'est une science !\n\nFORMULES VIRALES TESTÉES\n\n1. AVANT/APRÈS\n\"J'ai testé [X] pendant 30 jours...\"\nPerformance : 500K-2M vues\n\n2. ERREURS À ÉVITER\n\"5 erreurs qui tuent votre business\"\nPerformance : 300K-1M vues\n\n3. SECRETS/ASTUCES\n\"Le secret que les experts cachent\"\nPerformance : 400K-1.5M vues\n\n4. CHIFFRES CHOCS\n\"J'ai gagné 5000€ en 30 jours avec...\"\nPerformance : 600K-3M vues\n\nSTRATÉGIE DE PUBLICATION\n\nFRÉQUENCE :\n• TikTok : 2-3/jour\n• Instagram Reels : 1-2/jour\n• YouTube Shorts : 1/jour\n\nHEURES OPTIMALES (Afrique) :\n• 7h-9h (matin)\n• 12h-14h (pause déj)\n• 19h-22h (soir)\n\nHASHTAGS GAGNANTS\n\nMIX de 3 types :\n\n1. LARGES (10M+ vues)\n#business #entrepreneur #argent\n\n2. MOYENS (100K-1M)\n#businessafrique #iabusiness\n\n3. NICHES (10K-100K)\n#ecommerceafrique #aitools\n\nNOMBRE : 5-8 hashtags max\n\nSOUS-TITRES = OBLIGATOIRES\n• 85% regardent sans son\n• +40% de rétention\n\nFORMAT OPTIMAL\n• Ratio : 9:16 (vertical)\n• Durée : 15-45 sec\n• Résolution : 1080x1920 px\n• FPS : 30\n\nMÉTRIQUES CLÉS\n\n1. RÉTENTION : 50%+ objectif\n2. ENGAGEMENT : 5%+ objectif\n3. PARTAGES : 2%+ des vues\n\nLE SYSTÈME 80/20\n80% VALEUR (éduquer, inspirer)\n20% VENTE (promo)\n\nRÉSULTAT (90 jours) :\n• 10K-50K followers\n• 100K-500K vues/mois\n• Premières ventes",
      },
      {
        id: "8-4",
        title: "Monétiser vos vidéos",
        description: "Gagnez de l'argent avec vos contenus vidéo",
        content: "AUDIO_VIDEO_MONETISER\n\n💰 MONÉTISER VOS VIDÉOS\n\n5 MÉTHODES DE MONÉTISATION\n\n1. VENDRE VOS PRODUITS\nLE PLUS RENTABLE !\n\nStratégie :\n• 80% contenu gratuit\n• 20% promotion\n• Lien en bio\n\nConversion : 1-3% des vues\n10K vues → 5-15 ventes\n\n2. AFFILIATION\nVendez produits des autres\nCommission : 5-50%\n\nPlateformes :\n• Amazon Partenaires\n• ClickBank\n• ShareASale\n\n3. SPONSORING\nLes marques vous paient\n\nTarifs :\n• 10K followers : 50-200€/vidéo\n• 50K followers : 300-1000€/vidéo\n• 100K followers : 1000-5000€/vidéo\n\n4. FONDS CRÉATEURS\n\nTikTok :\n• 10K followers requis\n• 0,02-0,04€ / 1000 vues\n\nYouTube Shorts :\n• 1K abonnés requis\n• 0,05-0,10€ / 1000 vues\n\n5. MINI FORMATIONS EN LIGNE\nLE PLUS SCALABLE\n\nPrix : 20-200€\nPotentiel : 2K-10K€/mois\n\nLE FUNNEL VIDÉO\n\n1. CONTENU GRATUIT (Reels)\n→ Attirer audience\n\n2. LEAD MAGNET\n→ Récupérer email\n\n3. EMAIL NURTURING\n→ Créer confiance\n\n4. VENTE\n→ Mini formation/Produit\n\nCONVERSION : 5-10% des leads\n\nCALCUL RENTABILITÉ\n\nScénario (6 mois) :\n• 20K followers\n• 500K vues/mois\n• Produit à 50€\n• Conversion : 1%\n\nRÉSULTAT :\n500K vues → 50 ventes → 2500€/mois\n\nPLAN 90 JOURS\n\nJours 1-30 : CROISSANCE\n• 1-2 vidéos/jour\n• Objectif : 5K followers\n\nJours 31-60 : ENGAGEMENT\n• Lead magnet\n• Objectif : 10K followers + 500 emails\n\nJours 61-90 : MONÉTISATION\n• Lancement produit\n• Objectif : Premières ventes\n\n🎉 À VOUS DE JOUER ! 🚀",
      },
    ],
  },
  {
    id: "9",
    title: "💎 Maîtriser Gemini : L'outil IA le plus puissant pour entrepreneurs",
    description: "Gemini de Google est gratuit et plus puissant que ChatGPT pour les entrepreneurs. Découvrez comment l'utiliser pour automatiser tout votre business : photos, textes, analyses, et bien plus !",
    duration: "2h",
    level: "Débutant à Avancé",
    category: "Maîtrise IA",
    image: require("@/assets/images/formation-gemini.png"),
    modules: [
      {
        id: "9-0",
        title: "🎧 Pourquoi Gemini est l'outil #1 pour les entrepreneurs africains",
        description: "Découvrez pourquoi Gemini surpasse tous les autres outils IA",
        content: "AUDIO_GEMINI_INTRO",
      },
      {
        id: "9-1",
        title: "Créer votre compte et comprendre l'interface",
        description: "Premiers pas avec Gemini",
        content: "AUDIO_GEMINI_COMPTE\n\n🚀 DÉMARRER AVEC GEMINI\n\nÉTAPE 1 : Créer votre compte\n- Allez sur gemini.google.com\n- Connectez-vous avec votre compte Google\n- C'est 100% GRATUIT, aucune carte bancaire nécessaire !\n\nÉTAPE 2 : Comprendre l'interface\n\nL'interface de Gemini est très simple :\n\n1. BARRE DE CONVERSATION\nC'est là que vous tapez vos demandes (prompts)\n\n2. HISTORIQUE\nToutes vos conversations sont sauvegardées automatiquement\n\n3. GEM MANAGER\nAccédez à vos assistants personnalisés\n\n4. PARAMÈTRES\n- Langue : Français\n- Modèle : Gemini Advanced (gratuit)\n- Extensions : Google Workspace, YouTube, Maps\n\nÉTAPE 3 : Activer les extensions\n\nLes extensions permettent à Gemini d'accéder à vos autres outils Google :\n\n✓ Gmail : Rédiger et analyser des emails\n✓ Google Drive : Chercher dans vos documents\n✓ YouTube : Trouver des vidéos et résumer leur contenu\n✓ Google Maps : Trouver des lieux et itinéraires\n✓ Google Flights : Chercher des vols\n\nPour activer :\n1. Cliquez sur l'icône Extensions\n2. Activez celles dont vous avez besoin\n\n💡 ASTUCE : Activez tout ! Gemini sera encore plus puissant.",
      },
      {
        id: "9-2",
        title: "Maîtriser l'art du prompting avec Gemini",
        description: "Comment parler à Gemini pour obtenir les meilleurs résultats",
        content: "AUDIO_GEMINI_PROMPTING\n\n✍️ L'ART DU PROMPTING\n\nUn bon prompt = Un bon résultat !\n\nSTRUCTURE D'UN PROMPT EFFICACE :\n\n[RÔLE] + [TÂCHE] + [CONTEXTE] + [FORMAT] + [STYLE]\n\nEXEMPLE BASIQUE :\n❌ \"Écris un post Instagram\"\n\nEXEMPLE OPTIMISÉ :\n✅ \"Tu es un expert en marketing digital. Rédige un post Instagram pour promouvoir mon nouveau rouge à lèvres rouge luxueux. Cible : femmes africaines 25-40 ans. Format : texte accrocheur + 15 hashtags. Style : élégant et inspirant.\"\n\nRÉSULTAT : 10x meilleur !\n\nLES 7 RÈGLES D'OR DU PROMPTING :\n\n1. SOYEZ SPÉCIFIQUE\n❌ \"Crée une image de produit\"\n✅ \"Crée une photo produit professionnelle d'un parfum luxueux, flacon doré, fond beige, éclairage studio, style haute parfumerie, 4K\"\n\n2. DONNEZ DU CONTEXTE\n❌ \"Rédige un email\"\n✅ \"Rédige un email de relance pour un client qui a abandonné son panier. Produit : cosmétiques naturels. Ton : amical mais professionnel. Inclus une offre de -10%.\"\n\n3. DÉFINISSEZ LE FORMAT\n\"Format : 3 paragraphes courts + liste à puces + call-to-action\"\n\n4. PRÉCISEZ LE TON/STYLE\n\"Ton : professionnel mais accessible, comme si tu parlais à un ami\"\n\n5. DONNEZ DES EXEMPLES\n\"Comme cet exemple : [COLLER UN EXEMPLE]\"\n\n6. DEMANDEZ DES VARIATIONS\n\"Génère 5 variations différentes\"\n\n7. ITÉREZ ET AFFINEZ\nSi le résultat n'est pas parfait, demandez des ajustements :\n\"C'est bien, mais rends-le plus court et plus percutant\"",
      },
      {
        id: "9-3",
        title: "Créer des Gems personnalisés pour automatiser votre business",
        description: "Les Gems : vos assistants IA sur mesure",
        content: "AUDIO_GEMINI_GEMS\n\n💎 CRÉER DES GEMS : ASSISTANTS IA PERSONNALISÉS\n\nQU'EST-CE QU'UN GEM ?\n\nUn Gem est un assistant IA que VOUS créez, avec des instructions spécifiques pour votre business. Une fois créé, il connaît parfaitement votre marque, votre style, vos produits.\n\nAVANTAGES :\n✓ Gain de temps massif\n✓ Cohérence dans votre communication\n✓ Automatisation de tâches répétitives\n✓ Disponible 24/7\n\nCOMMENT CRÉER UN GEM :\n\nÉTAPE 1 : Accéder au Gem Manager\n- Dans Gemini, cliquez sur l'icône \"Gem\"\n- Cliquez sur \"Créer un nouveau Gem\"\n\nÉTAPE 2 : Nommer votre Gem\nExemples :\n- \"Expert Photos Produits\"\n- \"Rédacteur Instagram\"\n- \"Analyste de Données\"\n- \"Assistant Email\"\n\nÉTAPE 3 : Rédiger les instructions\n\nC'est LA partie la plus importante !\n\nSTRUCTURE DES INSTRUCTIONS :\n\n[IDENTITÉ] + [EXPERTISE] + [TÂCHES] + [STYLE] + [CONTRAINTES]\n\nEXEMPLE : GEM RÉDACTEUR INSTAGRAM\n\nNom : \"Rédacteur Instagram Pro\"\n\nInstructions :\n\"Tu es un expert en marketing Instagram spécialisé dans les marques de beauté africaines.\n\nMA MARQUE :\n- Nom : [VOTRE MARQUE]\n- Produits : Cosmétiques naturels pour femmes africaines\n- Valeurs : Authenticité, beauté naturelle, empowerment\n- Ton : Chaleureux, inspirant, proche\n\nQUAND JE TE DEMANDE UN POST, TU CRÉES :\n1. Un hook accrocheur (première ligne)\n2. Un contenu de 150-200 mots\n3. Une histoire ou un conseil\n4. Un call-to-action clair\n5. 15 hashtags ciblés\"\n\n💡 ASTUCE : Créez un Gem pour chaque tâche répétitive !",
      },
      {
        id: "9-4",
        title: "Générer des images professionnelles avec Gemini",
        description: "Créez des visuels pro gratuitement",
        content: "AUDIO_GEMINI_IMAGES\n\n🎨 GÉNÉRER DES IMAGES AVEC GEMINI\n\nGemini peut créer des images directement dans l'interface. C'est GRATUIT et ILLIMITÉ !\n\nTYPES D'IMAGES QUE VOUS POUVEZ CRÉER :\n\n✓ Photos produits\n✓ Images publicitaires\n✓ Logos et icônes\n✓ Illustrations pour réseaux sociaux\n✓ Bannières et couvertures\n✓ Infographies\n\nCOMMENT GÉNÉRER UNE IMAGE :\n\n1. Tapez votre prompt dans Gemini\n2. Ajoutez \"génère une image\" ou \"crée une photo\"\n3. Attendez 10-30 secondes\n4. Téléchargez l'image\n\nPROMPT STRUCTURE :\n\n\"Génère une [TYPE] de [SUJET], [DESCRIPTION DÉTAILLÉE], sur fond [COULEUR], avec éclairage [TYPE], style [STYLE], haute qualité, 4K\"\n\nEXEMPLES CONCRETS :\n\n1. PHOTO PRODUIT :\n\"Génère une photo produit professionnelle d'un rouge à lèvres rouge luxueux avec packaging doré, sur fond beige élégant, avec éclairage studio doux, style e-commerce haut de gamme, haute qualité, 4K\"\n\n2. IMAGE PUBLICITAIRE :\n\"Crée une image publicitaire pour Instagram. Produit : chaussures de sport pour femmes, couleur rose et blanc. Style : dynamique, moderne, inspirant. Fond : gradient coloré. Texte sur l'image : 'NOUVELLE COLLECTION -30%'. Haute qualité, format carré 1080x1080px\"\n\n3. LOGO :\n\"Crée un logo moderne pour une marque de cosmétiques naturels appelée 'Afro Beauty'. Style : minimaliste, élégant. Couleurs : or et vert. Inclure une feuille stylisée. Fond transparent.\"\n\nASTUCES POUR DES IMAGES PARFAITES :\n\n1. SOYEZ TRÈS SPÉCIFIQUE\nPlus de détails = Meilleur résultat\n\n2. TESTEZ PLUSIEURS VARIATIONS\nGénérez 5-10 versions et choisissez la meilleure\n\n3. UTILISEZ DES MOTS-CLÉS PUISSANTS\n- \"professionnel\"\n- \"haute qualité\"\n- \"4K\"\n- \"éclairage studio\"\n- \"réaliste\"\n\n🚀 RÉSULTAT : Des images qui coûteraient 500-1000€ avec un photographe, GRATUITEMENT !",
      },
      {
        id: "9-5",
        title: "Automatiser la création de contenu marketing",
        description: "Posts, emails, scripts : tout en automatique",
        content: "AUDIO_GEMINI_CONTENU\n\n🚀 AUTOMATISER LE CONTENU MARKETING\n\nGemini peut générer TOUT votre contenu marketing en quelques secondes.\n\n1. POSTS INSTAGRAM/FACEBOOK\n\nPrompt :\n\"Crée 7 posts Instagram pour ma marque de bijoux artisanaux. Chaque post doit :\n- Commencer par un hook accrocheur\n- Raconter une histoire\n- Inclure un CTA clair\n- Avoir 15 hashtags ciblés\nCible : femmes africaines 25-45 ans, urbaines, sensibles au luxe accessible\"\n\n2. EMAILS\n\nPrompt :\n\"Rédige une séquence de 5 emails de bienvenue pour mes nouveaux clients qui ont acheté ma formation en ligne sur l'IA. Chaque email doit :\n- Être envoyé à J+0, J+2, J+5, J+7, J+10\n- Apporter de la valeur\n- Créer de l'engagement\n- Mener vers une vente additionnelle\nTon : chaleureux, motivant, professionnel\"\n\n3. SCRIPTS VIDÉO\n\nPrompt :\n\"Crée un script vidéo de 60 secondes pour TikTok/Instagram Reels. Sujet : Comment créer des photos produits avec l'IA. Format : Hook (5 sec) + Problème (10 sec) + Solution (30 sec) + CTA (15 sec). Ton : dynamique, inspirant\"\n\n4. DESCRIPTIONS PRODUITS\n\nPrompt :\n\"Rédige une description produit pour mon site e-commerce. Produit : Crème visage anti-âge aux ingrédients naturels africains. Inclus : bénéfices, ingrédients, mode d'emploi, pourquoi c'est unique. 200 mots. Ton : persuasif mais authentique\"\n\n5. PUBLICITÉS FACEBOOK ADS\n\nPrompt :\n\"Crée 3 variations de texte publicitaire Facebook pour promouvoir mes chaussures pour femmes. Chaque variation doit : Hook + Problème + Solution + Urgence + CTA. 150 mots max. Inclus emojis. Ton : persuasif\"\n\nCALENDRIER DE CONTENU AUTO :\n\nPrompt ULTIME :\n\"Crée un calendrier de contenu pour 30 jours pour ma marque [VOTRE NICHE]. Inclus :\n- 1 post Instagram/jour\n- 3 stories/jour\n- 1 Reel/semaine\n- 2 emails/semaine\nFormat : Tableau avec Date | Type | Sujet | Hook\"\n\n🚀 RÉSULTAT : 1 mois de contenu créé en 5 minutes !",
      },
      {
        id: "9-6",
        title: "Analyser vos données business avec Gemini",
        description: "Transformez vos données en insights actionnables",
        content: "AUDIO_GEMINI_DONNEES\n\n📊 ANALYSER VOS DONNÉES AVEC GEMINI\n\nGemini peut analyser vos données de ventes, engagement, et vous donner des recommandations.\n\nCOMMENT PROCÉDER :\n\n1. Exportez vos données (Excel, CSV)\n2. Copiez-collez dans Gemini\n3. Demandez une analyse\n\nEXEMPLES D'ANALYSES :\n\n1. ANALYSE DE VENTES\n\nPrompt :\n\"Analyse ces données de ventes [COLLER VOS DONNÉES] et donne-moi :\n- Les 3 produits les plus vendus\n- Les tendances par mois\n- Les recommandations d'actions\n- Les opportunités de croissance\nFormat : rapport exécutif avec bullet points\"\n\n2. ANALYSE D'ENGAGEMENT SOCIAL MEDIA\n\nPrompt :\n\"Analyse ces statistiques Instagram [COLLER STATS] :\n- Quel type de contenu performe le mieux ?\n- Quelles heures de publication sont optimales ?\n- Quels hashtags génèrent le plus d'engagement ?\n- Recommandations pour augmenter l'engagement de 50%\"\n\n3. ANALYSE DE CONCURRENCE\n\nPrompt :\n\"Analyse ces 5 concurrents [LISTE] dans le secteur [VOTRE NICHE] en Afrique :\n- Leurs points forts\n- Leurs faiblesses\n- Opportunités pour me différencier\n- Stratégies à copier\n- Prix recommandé pour mes produits\"\n\n4. PRÉVISIONS\n\nPrompt :\n\"Voici mes ventes des 6 derniers mois [DONNÉES]. Prédis mes ventes pour les 3 prochains mois. Explique ta méthode et donne des recommandations pour dépasser ces prévisions.\"\n\n💡 ASTUCE : Créez un Gem \"Analyste Business\" pour automatiser ces analyses !",
      },
      {
        id: "9-7",
        title: "Utiliser les extensions Google pour décupler la puissance",
        description: "Gmail, Drive, YouTube, Maps : tout connecté !",
        content: "AUDIO_GEMINI_EXTENSIONS\n\n🔌 EXTENSIONS GOOGLE : SUPERPUISSANCE\n\nLes extensions connectent Gemini à vos autres outils Google. C'est là que la magie opère !\n\nEXTENSIONS DISPONIBLES :\n\n1. GMAIL\n\nCe que vous pouvez faire :\n- Rédiger des emails\n- Analyser votre boîte de réception\n- Trouver des emails spécifiques\n- Résumer des conversations\n\nPrompt exemple :\n\"Trouve tous les emails de clients insatisfaits dans les 30 derniers jours et résume les problèmes principaux\"\n\n2. GOOGLE DRIVE\n\nCe que vous pouvez faire :\n- Chercher dans vos documents\n- Résumer des fichiers\n- Extraire des informations\n\nPrompt exemple :\n\"Trouve tous mes documents sur la stratégie marketing 2024 et crée un résumé exécutif\"\n\n3. YOUTUBE\n\nCe que vous pouvez faire :\n- Trouver des vidéos\n- Résumer le contenu\n- Extraire les points clés\n\nPrompt exemple :\n\"Trouve les 5 meilleures vidéos sur le marketing digital en Afrique et résume les stratégies principales\"\n\n4. GOOGLE MAPS\n\nCe que vous pouvez faire :\n- Trouver des lieux\n- Planifier des itinéraires\n- Analyser des zones\n\nPrompt exemple :\n\"Trouve les 10 meilleurs emplacements pour ouvrir une boutique de cosmétiques à Abidjan, avec justification\"\n\n5. GOOGLE FLIGHTS\n\nCe que vous pouvez faire :\n- Chercher des vols\n- Comparer les prix\n- Trouver les meilleures offres\n\nPrompt exemple :\n\"Trouve les vols les moins chers de Dakar à Paris pour le mois prochain, flexibilité ±3 jours\"\n\nWORKFLOW COMPLET AVEC EXTENSIONS :\n\n1. Recherche sur YouTube (tendances)\n2. Analyse dans Drive (vos données)\n3. Rédaction d'email (Gmail)\n4. Recherche locale (Maps)\n\nTout ça en UNE conversation avec Gemini !\n\n🚀 C'est comme avoir 5 assistants en un seul !",
      },
      {
        id: "9-8",
        title: "Cas pratiques : Gemini pour différents business",
        description: "E-commerce, services, formations, consulting",
        content: "AUDIO_GEMINI_CAS_PRATIQUES\n\n💼 CAS PRATIQUES PAR TYPE DE BUSINESS\n\n1. E-COMMERCE\n\nUtilisations quotidiennes :\n- Générer photos produits\n- Écrire descriptions produits\n- Créer pubs Facebook/Instagram\n- Analyser ventes\n- Répondre aux clients\n\nWorkflow type :\nMatin : Analyser ventes de la veille\nMidi : Générer contenu social media\nSoir : Répondre aux messages clients\n\nGain de temps : 15h/semaine\n\n2. SERVICES (Coiffure, beauté, consulting)\n\nUtilisations quotidiennes :\n- Créer contenu avant/après\n- Rédiger posts éducatifs\n- Générer visuels promotionnels\n- Automatiser réponses FAQ\n- Créer scripts vidéo\n\nWorkflow type :\nLundi : Calendrier contenu semaine\nChaque jour : 1 post + 3 stories\nVendredi : Analyse engagement\n\nGain de temps : 10h/semaine\n\n3. FORMATIONS EN LIGNE\n\nUtilisations quotidiennes :\n- Créer contenu de cours\n- Générer visuels pédagogiques\n- Écrire emails de nurturing\n- Créer publicités\n- Analyser feedback élèves\n\nWorkflow type :\nCréation : 1 module/jour avec Gemini\nMarketing : Contenu auto généré\nSupport : Réponses auto aux questions\n\nGain de temps : 20h/semaine\n\n4. INFLUENCEUR/CRÉATEUR\n\nUtilisations quotidiennes :\n- Générer idées de contenu\n- Écrire scripts vidéo\n- Créer miniatures\n- Analyser performance\n- Trouver tendances\n\nWorkflow type :\nMatin : Idées contenu semaine\nAprès-midi : Scripts + miniatures\nSoir : Analyse + ajustements\n\nGain de temps : 12h/semaine\n\n💡 QUEL QUE SOIT VOTRE BUSINESS, Gemini peut vous faire gagner 10-20h/semaine !",
      },
      {
        id: "9-9",
        title: "Astuces avancées et raccourcis clavier",
        description: "Devenez un ninja de Gemini",
        content: "AUDIO_GEMINI_ASTUCES\n\n⚡ ASTUCES AVANCÉES\n\n1. CONVERSATIONS MULTIPLES\n\nCréez des conversations séparées pour chaque projet :\n- Conversation \"Marketing\"\n- Conversation \"Produits\"\n- Conversation \"Analyse\"\n\nAvantage : Gemini se souvient du contexte !\n\n2. PROMPTS RÉUTILISABLES\n\nSauvegardez vos meilleurs prompts dans un document :\n- Copier-coller rapide\n- Cohérence garantie\n- Gain de temps massif\n\n3. COMMANDES RAPIDES\n\n\"Continue\" = Gemini continue sa réponse\n\"Plus court\" = Version condensée\n\"Plus long\" = Version détaillée\n\"Reformule\" = Nouvelle version\n\"Explique comme si j'avais 10 ans\" = Simplification\n\n4. COMBINER PLUSIEURS TÂCHES\n\nPlutôt que 3 prompts séparés, combinez :\n\n\"Crée un post Instagram sur [SUJET], puis génère l'image correspondante, puis écris l'email de promotion associé\"\n\n5. UTILISER LES RÉFÉRENCES\n\n\"Comme dans la conversation précédente...\"\n\"En utilisant le même style que...\"\n\"Base-toi sur l'exemple que je t'ai donné...\"\n\n6. EXPORT ET PARTAGE\n\n- Copiez les réponses dans Google Docs\n- Partagez des conversations avec votre équipe\n- Exportez pour archivage\n\n7. MODE VOCAL (Mobile)\n\nSur l'app mobile Gemini :\n- Parlez au lieu de taper\n- Idéal en déplacement\n- Gain de temps x2\n\n8. GEMS POUR WORKFLOWS\n\nCréez des Gems pour vos workflows complets :\n\nGem \"Lancement Produit\" :\n\"Quand je te donne un nouveau produit, tu crées automatiquement :\n1. Description produit\n2. 7 posts Instagram\n3. 3 pubs Facebook\n4. Email de lancement\n5. Script vidéo\"\n\n🎯 RÉSULTAT : Vous devenez 10x plus rapide !",
      },
      {
        id: "9-10",
        title: "Plan d'action : Intégrer Gemini dans votre routine",
        description: "Votre feuille de route pour maîtriser Gemini en 30 jours",
        content: "AUDIO_GEMINI_PLAN_ACTION\n\n📅 PLAN 30 JOURS POUR MAÎtriser GEMINI\n\nSEMAINE 1 : FONDATIONS\n\nJour 1-2 : Configuration\n- Créer compte\n- Activer extensions\n- Tester premières commandes\n\nJour 3-5 : Prompting\n- Apprendre structure prompts\n- Tester 20 prompts différents\n- Sauvegarder les meilleurs\n\nJour 6-7 : Premières automatisations\n- Générer contenu semaine\n- Créer premières images\n\nSEMAINE 2 : GEMS\n\nJour 8-10 : Création Gems\n- Gem Rédacteur Instagram\n- Gem Expert Photos\n- Gem Assistant Email\n\nJour 11-14 : Test et optimisation\n- Utiliser vos Gems quotidiennement\n- Affiner les instructions\n- Mesurer gain de temps\n\nSEMAINE 3 : EXTENSIONS\n\nJour 15-17 : Maîtriser Gmail + Drive\n- Automatiser emails\n- Organiser documents\n\nJour 18-21 : YouTube + Maps\n- Recherche tendances\n- Analyse concurrence\n\nSEMAINE 4 : WORKFLOWS COMPLETS\n\nJour 22-25 : Workflows business\n- Workflow lancement produit\n- Workflow création contenu\n- Workflow analyse\n\nJour 26-28 : Optimisation\n- Identifier tâches répétitives\n- Créer Gems spécifiques\n- Automatiser maximum\n\nJour 29-30 : Bilan et projection\n- Calculer temps gagné\n- Planifier prochaines automatisations\n\nRÉSULTAT ATTENDU APRÈS 30 JOURS :\n\n✅ 10-20h gagnées/semaine\n✅ Contenu créé 10x plus vite\n✅ Qualité professionnelle garantie\n✅ Business automatisé à 80%\n\nCHECKLIST QUOTIDIENNE :\n\n□ Générer contenu du jour (5 min)\n□ Analyser performances (5 min)\n□ Répondre aux clients (10 min)\n□ Créer visuels (10 min)\n\nTOTAL : 30 min/jour au lieu de 3-4h !\n\n🎉 FÉLICITATIONS !\n\nVous avez maintenant TOUTES les clés pour maîtriser Gemini et transformer votre business.\n\nL'IA n'est plus le futur, c'est MAINTENANT.\n\nCeux qui maîtrisent Gemini aujourd'hui auront un avantage MASSIF sur leurs concurrents demain.\n\n🚀 PASSEZ À L'ACTION DÈS MAINTENANT !",
      },
    ],
  },
];

export default function FormationsScreen() {
  const router = useRouter();
  const [selectedFormation, setSelectedFormation] = useState<Formation | null>(null);
  const [selectedModule, setSelectedModule] = useState<Module | null>(null);
  const [showCoachingModal, setShowCoachingModal] = useState(false);
  const [coachingForm, setCoachingForm] = useState({
    nom: "",
    prenom: "",
    email: "",
    question: "",
  });
  const [hasPaid, setHasPaid] = useState(false);

  // Hook de progression
  const {
    getFormationProgress,
    getCompletedModulesCount,
    isModuleComplete,
    markModuleComplete,
    markModuleIncomplete,
  } = useProgress();

  // Créer les players audio
  const audioPrompting = useAudioPlayer(require("@/assets/audio/prompting-importance.mp3"));
  const audioTutorial = useAudioPlayer(require("@/assets/audio/tutorial-photo-ia.mp3"));
  const audioGemini = useAudioPlayer(require("@/assets/audio/gemini-intro.mp3"));
  const audioGeminiModule = useAudioPlayer(require("@/assets/audio/photo-ia-module-gemini.mp3"));
  const audioGemModule = useAudioPlayer(require("@/assets/audio/photo-ia-module-gem.mp3"));
  const audioPromptsModule = useAudioPlayer(require("@/assets/audio/photo-ia-module-prompts.mp3"));
  const audioEconomiesModule = useAudioPlayer(require("@/assets/audio/photo-ia-module-economies.mp3"));
  
  // Audios Vidéo IA
  const audioVideoScripts = useAudioPlayer(require("@/assets/audio/video-ia-module-scripts.mp3"));
  const audioVideoOutils = useAudioPlayer(require("@/assets/audio/video-ia-module-outils.mp3"));
  const audioVideoViraux = useAudioPlayer(require("@/assets/audio/video-ia-module-viraux.mp3"));
  const audioVideoMonetiser = useAudioPlayer(require("@/assets/audio/video-ia-module-monetiser.mp3"));
  
  // Audios E-commerce
  const audioEcomOpportunite = useAudioPlayer(require("@/assets/audio/ecommerce-module-opportunite.mp3"));
  const audioEcomProduits = useAudioPlayer(require("@/assets/audio/ecommerce-module-produits.mp3"));
  const audioEcomBoutique = useAudioPlayer(require("@/assets/audio/ecommerce-module-boutique.mp3"));
  const audioEcomPaiements = useAudioPlayer(require("@/assets/audio/ecommerce-module-paiements.mp3"));
  const audioEcomLivraison = useAudioPlayer(require("@/assets/audio/ecommerce-module-livraison.mp3"));
  const audioEcomFacebookAds = useAudioPlayer(require("@/assets/audio/ecommerce-module-facebook-ads.mp3"));
  
  // Audios Gemini
  const audioGeminiCompte = useAudioPlayer(require("@/assets/audio/gemini-module-compte.mp3"));
  const audioGeminiPrompting = useAudioPlayer(require("@/assets/audio/gemini-module-prompting.mp3"));
  const audioGeminiGems = useAudioPlayer(require("@/assets/audio/gemini-module-gems.mp3"));
  const audioGeminiImages = useAudioPlayer(require("@/assets/audio/gemini-module-images.mp3"));
  const audioGeminiContenu = useAudioPlayer(require("@/assets/audio/gemini-module-contenu.mp3"));
  const audioGeminiDonnees = useAudioPlayer(require("@/assets/audio/gemini-module-donnees.mp3"));
  const audioGeminiExtensions = useAudioPlayer(require("@/assets/audio/gemini-module-extensions.mp3"));
  const audioGeminiCasPratiques = useAudioPlayer(require("@/assets/audio/gemini-module-cas-pratiques.mp3"));
  const audioGeminiAstuces = useAudioPlayer(require("@/assets/audio/gemini-module-astuces.mp3"));
  const audioGeminiPlanAction = useAudioPlayer(require("@/assets/audio/gemini-module-plan-action.mp3"));

  // Vérifier le statut de paiement
  useEffect(() => {
    if (selectedFormation) {
      checkPaymentStatus(selectedFormation.id);
    }
  }, [selectedFormation]);

  const checkPaymentStatus = async (formationId: string) => {
    const paymentStatus = await AsyncStorage.getItem(`payment_${formationId}`);
    setHasPaid(paymentStatus === "completed");
  };

  const handleFormationClick = (formation: Formation) => {
    // Accès direct gratuit à toutes les formations
    setSelectedFormation(formation);
  };
  const [isPlayingPrompting, setIsPlayingPrompting] = useState(false);
  const [isPlayingTutorial, setIsPlayingTutorial] = useState(false);
  const [isPlayingGemini, setIsPlayingGemini] = useState(false);
  const [isPlayingGeminiModule, setIsPlayingGeminiModule] = useState(false);
  const [isPlayingGemModule, setIsPlayingGemModule] = useState(false);
  const [isPlayingPromptsModule, setIsPlayingPromptsModule] = useState(false);
  const [isPlayingEconomiesModule, setIsPlayingEconomiesModule] = useState(false);
  
  // États Vidéo IA
  const [isPlayingVideoScripts, setIsPlayingVideoScripts] = useState(false);
  const [isPlayingVideoOutils, setIsPlayingVideoOutils] = useState(false);
  const [isPlayingVideoViraux, setIsPlayingVideoViraux] = useState(false);
  const [isPlayingVideoMonetiser, setIsPlayingVideoMonetiser] = useState(false);
  
  // États E-commerce
  const [isPlayingEcomOpportunite, setIsPlayingEcomOpportunite] = useState(false);
  const [isPlayingEcomProduits, setIsPlayingEcomProduits] = useState(false);
  const [isPlayingEcomBoutique, setIsPlayingEcomBoutique] = useState(false);
  const [isPlayingEcomPaiements, setIsPlayingEcomPaiements] = useState(false);
  const [isPlayingEcomLivraison, setIsPlayingEcomLivraison] = useState(false);
  const [isPlayingEcomFacebookAds, setIsPlayingEcomFacebookAds] = useState(false);
  
  // États Gemini
  const [isPlayingGeminiCompte, setIsPlayingGeminiCompte] = useState(false);
  const [isPlayingGeminiPrompting, setIsPlayingGeminiPrompting] = useState(false);
  const [isPlayingGeminiGems, setIsPlayingGeminiGems] = useState(false);
  const [isPlayingGeminiImages, setIsPlayingGeminiImages] = useState(false);
  const [isPlayingGeminiContenu, setIsPlayingGeminiContenu] = useState(false);
  const [isPlayingGeminiDonnees, setIsPlayingGeminiDonnees] = useState(false);
  const [isPlayingGeminiExtensions, setIsPlayingGeminiExtensions] = useState(false);
  const [isPlayingGeminiCasPratiques, setIsPlayingGeminiCasPratiques] = useState(false);
  const [isPlayingGeminiAstuces, setIsPlayingGeminiAstuces] = useState(false);
  const [isPlayingGeminiPlanAction, setIsPlayingGeminiPlanAction] = useState(false);

  useEffect(() => {
    return () => {
      audioPrompting.release();
      audioTutorial.release();
      audioGemini.release();
      audioGeminiModule.release();
      audioGemModule.release();
      audioPromptsModule.release();
      audioEconomiesModule.release();
      audioVideoScripts.release();
      audioVideoOutils.release();
      audioVideoViraux.release();
      audioVideoMonetiser.release();
      audioEcomOpportunite.release();
      audioEcomProduits.release();
      audioEcomBoutique.release();
      audioEcomPaiements.release();
      audioEcomLivraison.release();
      audioEcomFacebookAds.release();
      audioGeminiCompte.release();
      audioGeminiPrompting.release();
      audioGeminiGems.release();
      audioGeminiImages.release();
      audioGeminiContenu.release();
      audioGeminiDonnees.release();
      audioGeminiExtensions.release();
      audioGeminiCasPratiques.release();
      audioGeminiAstuces.release();
      audioGeminiPlanAction.release();
    };
  }, []);

  const toggleAudioPrompting = () => {
    if (isPlayingPrompting) {
      audioPrompting.pause();
      setIsPlayingPrompting(false);
    } else {
      audioPrompting.play();
      setIsPlayingPrompting(true);
    }
  };

  const toggleAudioTutorial = () => {
    if (isPlayingTutorial) {
      audioTutorial.pause();
      setIsPlayingTutorial(false);
    } else {
      audioTutorial.play();
      setIsPlayingTutorial(true);
    }
  };

  const toggleAudioGemini = () => {
    if (isPlayingGemini) {
      audioGemini.pause();
      setIsPlayingGemini(false);
    } else {
      audioGemini.play();
      setIsPlayingGemini(true);
    }
  };

  const toggleAudioGeminiModule = () => {
    if (isPlayingGeminiModule) {
      audioGeminiModule.pause();
      setIsPlayingGeminiModule(false);
    } else {
      audioGeminiModule.play();
      setIsPlayingGeminiModule(true);
    }
  };

  const toggleAudioGemModule = () => {
    if (isPlayingGemModule) {
      audioGemModule.pause();
      setIsPlayingGemModule(false);
    } else {
      audioGemModule.play();
      setIsPlayingGemModule(true);
    }
  };

  const toggleAudioPromptsModule = () => {
    if (isPlayingPromptsModule) {
      audioPromptsModule.pause();
      setIsPlayingPromptsModule(false);
    } else {
      audioPromptsModule.play();
      setIsPlayingPromptsModule(true);
    }
  };

  const toggleAudioEconomiesModule = () => {
    if (isPlayingEconomiesModule) {
      audioEconomiesModule.pause();
      setIsPlayingEconomiesModule(false);
    } else {
      audioEconomiesModule.play();
      setIsPlayingEconomiesModule(true);
    }
  };

  // Fonctions toggle Vidéo IA
  const toggleAudioVideoScripts = () => {
    if (isPlayingVideoScripts) {
      audioVideoScripts.pause();
      setIsPlayingVideoScripts(false);
    } else {
      audioVideoScripts.play();
      setIsPlayingVideoScripts(true);
    }
  };

  const toggleAudioVideoOutils = () => {
    if (isPlayingVideoOutils) {
      audioVideoOutils.pause();
      setIsPlayingVideoOutils(false);
    } else {
      audioVideoOutils.play();
      setIsPlayingVideoOutils(true);
    }
  };

  const toggleAudioVideoViraux = () => {
    if (isPlayingVideoViraux) {
      audioVideoViraux.pause();
      setIsPlayingVideoViraux(false);
    } else {
      audioVideoViraux.play();
      setIsPlayingVideoViraux(true);
    }
  };

  const toggleAudioVideoMonetiser = () => {
    if (isPlayingVideoMonetiser) {
      audioVideoMonetiser.pause();
      setIsPlayingVideoMonetiser(false);
    } else {
      audioVideoMonetiser.play();
      setIsPlayingVideoMonetiser(true);
    }
  };

  // Fonctions toggle E-commerce
  const toggleAudioEcomOpportunite = () => {
    if (isPlayingEcomOpportunite) {
      audioEcomOpportunite.pause();
      setIsPlayingEcomOpportunite(false);
    } else {
      audioEcomOpportunite.play();
      setIsPlayingEcomOpportunite(true);
    }
  };

  const toggleAudioEcomProduits = () => {
    if (isPlayingEcomProduits) {
      audioEcomProduits.pause();
      setIsPlayingEcomProduits(false);
    } else {
      audioEcomProduits.play();
      setIsPlayingEcomProduits(true);
    }
  };

  const toggleAudioEcomBoutique = () => {
    if (isPlayingEcomBoutique) {
      audioEcomBoutique.pause();
      setIsPlayingEcomBoutique(false);
    } else {
      audioEcomBoutique.play();
      setIsPlayingEcomBoutique(true);
    }
  };

  const toggleAudioEcomPaiements = () => {
    if (isPlayingEcomPaiements) {
      audioEcomPaiements.pause();
      setIsPlayingEcomPaiements(false);
    } else {
      audioEcomPaiements.play();
      setIsPlayingEcomPaiements(true);
    }
  };

  const toggleAudioEcomLivraison = () => {
    if (isPlayingEcomLivraison) {
      audioEcomLivraison.pause();
      setIsPlayingEcomLivraison(false);
    } else {
      audioEcomLivraison.play();
      setIsPlayingEcomLivraison(true);
    }
  };

  const toggleAudioEcomFacebookAds = () => {
    if (isPlayingEcomFacebookAds) {
      audioEcomFacebookAds.pause();
      setIsPlayingEcomFacebookAds(false);
    } else {
      audioEcomFacebookAds.play();
      setIsPlayingEcomFacebookAds(true);
    }
  };

  // Fonctions toggle Gemini
  const toggleAudioGeminiCompte = () => {
    if (isPlayingGeminiCompte) {
      audioGeminiCompte.pause();
      setIsPlayingGeminiCompte(false);
    } else {
      audioGeminiCompte.play();
      setIsPlayingGeminiCompte(true);
    }
  };

  const toggleAudioGeminiPrompting = () => {
    if (isPlayingGeminiPrompting) {
      audioGeminiPrompting.pause();
      setIsPlayingGeminiPrompting(false);
    } else {
      audioGeminiPrompting.play();
      setIsPlayingGeminiPrompting(true);
    }
  };

  const toggleAudioGeminiGems = () => {
    if (isPlayingGeminiGems) {
      audioGeminiGems.pause();
      setIsPlayingGeminiGems(false);
    } else {
      audioGeminiGems.play();
      setIsPlayingGeminiGems(true);
    }
  };

  const toggleAudioGeminiImages = () => {
    if (isPlayingGeminiImages) {
      audioGeminiImages.pause();
      setIsPlayingGeminiImages(false);
    } else {
      audioGeminiImages.play();
      setIsPlayingGeminiImages(true);
    }
  };

  const toggleAudioGeminiContenu = () => {
    if (isPlayingGeminiContenu) {
      audioGeminiContenu.pause();
      setIsPlayingGeminiContenu(false);
    } else {
      audioGeminiContenu.play();
      setIsPlayingGeminiContenu(true);
    }
  };

  const toggleAudioGeminiDonnees = () => {
    if (isPlayingGeminiDonnees) {
      audioGeminiDonnees.pause();
      setIsPlayingGeminiDonnees(false);
    } else {
      audioGeminiDonnees.play();
      setIsPlayingGeminiDonnees(true);
    }
  };

  const toggleAudioGeminiExtensions = () => {
    if (isPlayingGeminiExtensions) {
      audioGeminiExtensions.pause();
      setIsPlayingGeminiExtensions(false);
    } else {
      audioGeminiExtensions.play();
      setIsPlayingGeminiExtensions(true);
    }
  };

  const toggleAudioGeminiCasPratiques = () => {
    if (isPlayingGeminiCasPratiques) {
      audioGeminiCasPratiques.pause();
      setIsPlayingGeminiCasPratiques(false);
    } else {
      audioGeminiCasPratiques.play();
      setIsPlayingGeminiCasPratiques(true);
    }
  };

  const toggleAudioGeminiAstuces = () => {
    if (isPlayingGeminiAstuces) {
      audioGeminiAstuces.pause();
      setIsPlayingGeminiAstuces(false);
    } else {
      audioGeminiAstuces.play();
      setIsPlayingGeminiAstuces(true);
    }
  };

  const toggleAudioGeminiPlanAction = () => {
    if (isPlayingGeminiPlanAction) {
      audioGeminiPlanAction.pause();
      setIsPlayingGeminiPlanAction(false);
    } else {
      audioGeminiPlanAction.play();
      setIsPlayingGeminiPlanAction(true);
    }
  };

  // Affichage du contenu d'un module
  if (selectedModule) {
    return (
      <ScreenContainer>
        <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
          <View className="flex-1 p-6">
            {/* Header avec bouton retour */}
            <TouchableOpacity
              className="flex-row items-center gap-2 mb-4"
              onPress={() => setSelectedModule(null)}
            >
              <IconSymbol size={24} name="chevron.left" color="#8B6F47" />
              <Text className="text-base text-primary font-semibold">Retour aux modules</Text>
            </TouchableOpacity>

            {/* Contenu du module */}
            <View className="gap-4">
              <Text className="text-2xl font-bold text-foreground">
                {selectedModule.title}
              </Text>

              <Text className="text-sm text-muted">
                {selectedModule.description}
              </Text>

              {/* Audio module prompting */}
              {selectedModule.content === "AUDIO_PROMPTING" ? (
                <View className="gap-4">
                  <View className="bg-primary/10 rounded-2xl p-6 border border-primary/30">
                    <Text className="text-lg font-bold text-foreground mb-4 text-center">
                      🎧 L'art du prompting et son importance
                    </Text>
                    
                    <TouchableOpacity
                      onPress={toggleAudioPrompting}
                      className="bg-primary rounded-2xl p-6 items-center active:opacity-80"
                    >
                      <IconSymbol 
                        size={48} 
                        name={isPlayingPrompting ? "pause.circle.fill" : "play.circle.fill"} 
                        color="#F5F0E8" 
                      />
                      <Text className="text-background font-bold text-lg mt-3">
                        {isPlayingPrompting ? "⏸️ Pause" : "▶️ Écouter le guide"}
                      </Text>
                    </TouchableOpacity>
                    
                    <View className="mt-6">
                      <Text className="text-base font-semibold text-foreground mb-3">
                        Dans ce guide audio, vous allez découvrir :
                      </Text>
                      <Text className="text-sm text-muted leading-relaxed">
                        • Ce qu'est un prompt et pourquoi c'est crucial{"\n"}
                        • Pourquoi 80% de la qualité dépend du prompt{"\n"}
                        • Comment les entrepreneurs économisent des milliers d'euros{"\n"}
                        • La compétence qui va révolutionner votre business
                      </Text>
                    </View>
                  </View>
                </View>
              ) : selectedModule.content === "AUDIO_GEMINI_INTRO" ? (
                <View className="gap-4">
                  <View className="bg-primary/10 rounded-2xl p-6 border border-primary/30">
                    <Text className="text-lg font-bold text-foreground mb-4 text-center">
                      🎧 Pourquoi Gemini est l'outil #1 pour les entrepreneurs africains
                    </Text>
                    
                    <TouchableOpacity
                      onPress={toggleAudioGemini}
                      className="bg-primary rounded-2xl p-6 items-center active:opacity-80"
                    >
                      <IconSymbol 
                        size={48} 
                        name={isPlayingGemini ? "pause.circle.fill" : "play.circle.fill"} 
                        color="#F5F0E8" 
                      />
                      <Text className="text-background font-bold text-lg mt-3">
                        {isPlayingGemini ? "⏸️ Pause" : "▶️ Écouter le guide"}
                      </Text>
                    </TouchableOpacity>
                    
                    <View className="mt-6">
                      <Text className="text-base font-semibold text-foreground mb-3">
                        Dans ce guide audio, vous allez découvrir :
                      </Text>
                      <Text className="text-sm text-muted leading-relaxed">
                        • Pourquoi Gemini est plus puissant que ChatGPT{"\n"}
                        • Comment générer des images pro gratuitement{"\n"}
                        • Les Gems : vos assistants IA personnalisés{"\n"}
                        • Comment automatiser tout votre business avec Gemini
                      </Text>
                    </View>
                  </View>
                </View>
              ) : selectedModule.content.startsWith("AUDIO_GEMINI\n") ? (
                <View className="gap-4">
                  <View className="bg-primary/10 rounded-2xl p-6 border border-primary/30 mb-4">
                    <TouchableOpacity
                      onPress={toggleAudioGeminiModule}
                      className="bg-primary rounded-2xl p-6 items-center active:opacity-80"
                    >
                      <IconSymbol 
                        size={48} 
                        name={isPlayingGeminiModule ? "pause.circle.fill" : "play.circle.fill"} 
                        color="#F5F0E8" 
                      />
                      <Text className="text-background font-bold text-lg mt-3">
                        {isPlayingGeminiModule ? "⏸️ Pause" : "▶️ Écouter le guide"}
                      </Text>
                    </TouchableOpacity>
                  </View>
                  <Text className="text-base text-foreground leading-relaxed whitespace-pre-line">
                    {selectedModule.content.replace("AUDIO_GEMINI\n\n", "")}
                  </Text>
                </View>
              ) : selectedModule.content.startsWith("AUDIO_GEM\n") ? (
                <View className="gap-4">
                  <View className="bg-primary/10 rounded-2xl p-6 border border-primary/30 mb-4">
                    <TouchableOpacity
                      onPress={toggleAudioGemModule}
                      className="bg-primary rounded-2xl p-6 items-center active:opacity-80"
                    >
                      <IconSymbol 
                        size={48} 
                        name={isPlayingGemModule ? "pause.circle.fill" : "play.circle.fill"} 
                        color="#F5F0E8" 
                      />
                      <Text className="text-background font-bold text-lg mt-3">
                        {isPlayingGemModule ? "⏸️ Pause" : "▶️ Écouter le guide"}
                      </Text>
                    </TouchableOpacity>
                  </View>
                  <Text className="text-base text-foreground leading-relaxed whitespace-pre-line">
                    {selectedModule.content.replace("AUDIO_GEM\n\n", "")}
                  </Text>
                </View>
              ) : selectedModule.content.startsWith("AUDIO_PROMPTS\n") ? (
                <View className="gap-4">
                  <View className="bg-primary/10 rounded-2xl p-6 border border-primary/30 mb-4">
                    <TouchableOpacity
                      onPress={toggleAudioPromptsModule}
                      className="bg-primary rounded-2xl p-6 items-center active:opacity-80"
                    >
                      <IconSymbol 
                        size={48} 
                        name={isPlayingPromptsModule ? "pause.circle.fill" : "play.circle.fill"} 
                        color="#F5F0E8" 
                      />
                      <Text className="text-background font-bold text-lg mt-3">
                        {isPlayingPromptsModule ? "⏸️ Pause" : "▶️ Écouter le guide"}
                      </Text>
                    </TouchableOpacity>
                  </View>
                  <Text className="text-base text-foreground leading-relaxed whitespace-pre-line">
                    {selectedModule.content.replace("AUDIO_PROMPTS\n\n", "")}
                  </Text>
                </View>
              ) : selectedModule.content.startsWith("AUDIO_ECONOMIES\n") ? (
                <View className="gap-4">
                  <View className="bg-primary/10 rounded-2xl p-6 border border-primary/30 mb-4">
                    <TouchableOpacity
                      onPress={toggleAudioEconomiesModule}
                      className="bg-primary rounded-2xl p-6 items-center active:opacity-80"
                    >
                      <IconSymbol 
                        size={48} 
                        name={isPlayingEconomiesModule ? "pause.circle.fill" : "play.circle.fill"} 
                        color="#F5F0E8" 
                      />
                      <Text className="text-background font-bold text-lg mt-3">
                        {isPlayingEconomiesModule ? "⏸️ Pause" : "▶️ Écouter le guide"}
                      </Text>
                    </TouchableOpacity>
                  </View>
                  <Text className="text-base text-foreground leading-relaxed whitespace-pre-line">
                    {selectedModule.content.replace("AUDIO_ECONOMIES\n\n", "")}
                  </Text>
                </View>
              ) : selectedModule.content.startsWith("AUDIO_VIDEO_SCRIPTS\n") ? (
                <View className="gap-4">
                  <View className="bg-primary/10 rounded-2xl p-6 border border-primary/30 mb-4">
                    <TouchableOpacity
                      onPress={toggleAudioVideoScripts}
                      className="bg-primary rounded-2xl p-6 items-center active:opacity-80"
                    >
                      <IconSymbol 
                        size={48} 
                        name={isPlayingVideoScripts ? "pause.circle.fill" : "play.circle.fill"} 
                        color="#F5F0E8" 
                      />
                      <Text className="text-background font-bold text-lg mt-3">
                        {isPlayingVideoScripts ? "⏸️ Pause" : "▶️ Écouter le guide"}
                      </Text>
                    </TouchableOpacity>
                  </View>
                  <Text className="text-base text-foreground leading-relaxed whitespace-pre-line">
                    {selectedModule.content.replace("AUDIO_VIDEO_SCRIPTS\n\n", "")}
                  </Text>
                </View>
              ) : selectedModule.content.startsWith("AUDIO_VIDEO_OUTILS\n") ? (
                <View className="gap-4">
                  <View className="bg-primary/10 rounded-2xl p-6 border border-primary/30 mb-4">
                    <TouchableOpacity
                      onPress={toggleAudioVideoOutils}
                      className="bg-primary rounded-2xl p-6 items-center active:opacity-80"
                    >
                      <IconSymbol 
                        size={48} 
                        name={isPlayingVideoOutils ? "pause.circle.fill" : "play.circle.fill"} 
                        color="#F5F0E8" 
                      />
                      <Text className="text-background font-bold text-lg mt-3">
                        {isPlayingVideoOutils ? "⏸️ Pause" : "▶️ Écouter le guide"}
                      </Text>
                    </TouchableOpacity>
                  </View>
                  <Text className="text-base text-foreground leading-relaxed whitespace-pre-line">
                    {selectedModule.content.replace("AUDIO_VIDEO_OUTILS\n\n", "")}
                  </Text>
                </View>
              ) : selectedModule.content.startsWith("AUDIO_VIDEO_VIRAUX\n") ? (
                <View className="gap-4">
                  <View className="bg-primary/10 rounded-2xl p-6 border border-primary/30 mb-4">
                    <TouchableOpacity
                      onPress={toggleAudioVideoViraux}
                      className="bg-primary rounded-2xl p-6 items-center active:opacity-80"
                    >
                      <IconSymbol 
                        size={48} 
                        name={isPlayingVideoViraux ? "pause.circle.fill" : "play.circle.fill"} 
                        color="#F5F0E8" 
                      />
                      <Text className="text-background font-bold text-lg mt-3">
                        {isPlayingVideoViraux ? "⏸️ Pause" : "▶️ Écouter le guide"}
                      </Text>
                    </TouchableOpacity>
                  </View>
                  <Text className="text-base text-foreground leading-relaxed whitespace-pre-line">
                    {selectedModule.content.replace("AUDIO_VIDEO_VIRAUX\n\n", "")}
                  </Text>
                </View>
              ) : selectedModule.content.startsWith("AUDIO_VIDEO_MONETISER\n") ? (
                <View className="gap-4">
                  <View className="bg-primary/10 rounded-2xl p-6 border border-primary/30 mb-4">
                    <TouchableOpacity
                      onPress={toggleAudioVideoMonetiser}
                      className="bg-primary rounded-2xl p-6 items-center active:opacity-80"
                    >
                      <IconSymbol 
                        size={48} 
                        name={isPlayingVideoMonetiser ? "pause.circle.fill" : "play.circle.fill"} 
                        color="#F5F0E8" 
                      />
                      <Text className="text-background font-bold text-lg mt-3">
                        {isPlayingVideoMonetiser ? "⏸️ Pause" : "▶️ Écouter le guide"}
                      </Text>
                    </TouchableOpacity>
                  </View>
                  <Text className="text-base text-foreground leading-relaxed whitespace-pre-line">
                    {selectedModule.content.replace("AUDIO_VIDEO_MONETISER\n\n", "")}
                  </Text>
                </View>
              ) : selectedModule.content.startsWith("AUDIO_ECOM_OPPORTUNITE\n") ? (
                <View className="gap-4">
                  <View className="bg-primary/10 rounded-2xl p-6 border border-primary/30 mb-4">
                    <TouchableOpacity
                      onPress={toggleAudioEcomOpportunite}
                      className="bg-primary rounded-2xl p-6 items-center active:opacity-80"
                    >
                      <IconSymbol 
                        size={48} 
                        name={isPlayingEcomOpportunite ? "pause.circle.fill" : "play.circle.fill"} 
                        color="#F5F0E8" 
                      />
                      <Text className="text-background font-bold text-lg mt-3">
                        {isPlayingEcomOpportunite ? "⏸️ Pause" : "▶️ Écouter le guide"}
                      </Text>
                    </TouchableOpacity>
                  </View>
                  <Text className="text-base text-foreground leading-relaxed whitespace-pre-line">
                    {selectedModule.content.replace("AUDIO_ECOM_OPPORTUNITE\n\n", "")}
                  </Text>
                </View>
              ) : selectedModule.content.startsWith("AUDIO_ECOM_PRODUITS\n") ? (
                <View className="gap-4">
                  <View className="bg-primary/10 rounded-2xl p-6 border border-primary/30 mb-4">
                    <TouchableOpacity
                      onPress={toggleAudioEcomProduits}
                      className="bg-primary rounded-2xl p-6 items-center active:opacity-80"
                    >
                      <IconSymbol 
                        size={48} 
                        name={isPlayingEcomProduits ? "pause.circle.fill" : "play.circle.fill"} 
                        color="#F5F0E8" 
                      />
                      <Text className="text-background font-bold text-lg mt-3">
                        {isPlayingEcomProduits ? "⏸️ Pause" : "▶️ Écouter le guide"}
                      </Text>
                    </TouchableOpacity>
                  </View>
                  <Text className="text-base text-foreground leading-relaxed whitespace-pre-line">
                    {selectedModule.content.replace("AUDIO_ECOM_PRODUITS\n\n", "")}
                  </Text>
                </View>
              ) : selectedModule.content.startsWith("AUDIO_ECOM_BOUTIQUE\n") ? (
                <View className="gap-4">
                  <View className="bg-primary/10 rounded-2xl p-6 border border-primary/30 mb-4">
                    <TouchableOpacity
                      onPress={toggleAudioEcomBoutique}
                      className="bg-primary rounded-2xl p-6 items-center active:opacity-80"
                    >
                      <IconSymbol 
                        size={48} 
                        name={isPlayingEcomBoutique ? "pause.circle.fill" : "play.circle.fill"} 
                        color="#F5F0E8" 
                      />
                      <Text className="text-background font-bold text-lg mt-3">
                        {isPlayingEcomBoutique ? "⏸️ Pause" : "▶️ Écouter le guide"}
                      </Text>
                    </TouchableOpacity>
                  </View>
                  <Text className="text-base text-foreground leading-relaxed whitespace-pre-line">
                    {selectedModule.content.replace("AUDIO_ECOM_BOUTIQUE\n\n", "")}
                  </Text>
                </View>
              ) : selectedModule.content.startsWith("AUDIO_ECOM_PAIEMENTS\n") ? (
                <View className="gap-4">
                  <View className="bg-primary/10 rounded-2xl p-6 border border-primary/30 mb-4">
                    <TouchableOpacity
                      onPress={toggleAudioEcomPaiements}
                      className="bg-primary rounded-2xl p-6 items-center active:opacity-80"
                    >
                      <IconSymbol 
                        size={48} 
                        name={isPlayingEcomPaiements ? "pause.circle.fill" : "play.circle.fill"} 
                        color="#F5F0E8" 
                      />
                      <Text className="text-background font-bold text-lg mt-3">
                        {isPlayingEcomPaiements ? "⏸️ Pause" : "▶️ Écouter le guide"}
                      </Text>
                    </TouchableOpacity>
                  </View>
                  <Text className="text-base text-foreground leading-relaxed whitespace-pre-line">
                    {selectedModule.content.replace("AUDIO_ECOM_PAIEMENTS\n\n", "")}
                  </Text>
                </View>
              ) : selectedModule.content.startsWith("AUDIO_ECOM_LIVRAISON\n") ? (
                <View className="gap-4">
                  <View className="bg-primary/10 rounded-2xl p-6 border border-primary/30 mb-4">
                    <TouchableOpacity
                      onPress={toggleAudioEcomLivraison}
                      className="bg-primary rounded-2xl p-6 items-center active:opacity-80"
                    >
                      <IconSymbol 
                        size={48} 
                        name={isPlayingEcomLivraison ? "pause.circle.fill" : "play.circle.fill"} 
                        color="#F5F0E8" 
                      />
                      <Text className="text-background font-bold text-lg mt-3">
                        {isPlayingEcomLivraison ? "⏸️ Pause" : "▶️ Écouter le guide"}
                      </Text>
                    </TouchableOpacity>
                  </View>
                  <Text className="text-base text-foreground leading-relaxed whitespace-pre-line">
                    {selectedModule.content.replace("AUDIO_ECOM_LIVRAISON\n\n", "")}
                  </Text>
                </View>
              ) : selectedModule.content.startsWith("AUDIO_ECOM_FACEBOOK_ADS\n") ? (
                <View className="gap-4">
                  <View className="bg-primary/10 rounded-2xl p-6 border border-primary/30 mb-4">
                    <TouchableOpacity
                      onPress={toggleAudioEcomFacebookAds}
                      className="bg-primary rounded-2xl p-6 items-center active:opacity-80"
                    >
                      <IconSymbol 
                        size={48} 
                        name={isPlayingEcomFacebookAds ? "pause.circle.fill" : "play.circle.fill"} 
                        color="#F5F0E8" 
                      />
                      <Text className="text-background font-bold text-lg mt-3">
                        {isPlayingEcomFacebookAds ? "⏸️ Pause" : "▶️ Écouter le guide"}
                      </Text>
                    </TouchableOpacity>
                  </View>
                  <Text className="text-base text-foreground leading-relaxed whitespace-pre-line">
                    {selectedModule.content.replace("AUDIO_ECOM_FACEBOOK_ADS\n\n", "")}
                  </Text>
                </View>
              ) : selectedModule.content.startsWith("AUDIO_GEMINI_COMPTE\n") ? (
                <View className="gap-4">
                  <View className="bg-primary/10 rounded-2xl p-6 border border-primary/30 mb-4">
                    <TouchableOpacity
                      onPress={toggleAudioGeminiCompte}
                      className="bg-primary rounded-2xl p-6 items-center active:opacity-80"
                    >
                      <IconSymbol 
                        size={48} 
                        name={isPlayingGeminiCompte ? "pause.circle.fill" : "play.circle.fill"} 
                        color="#F5F0E8" 
                      />
                      <Text className="text-background font-bold text-lg mt-3">
                        {isPlayingGeminiCompte ? "⏸️ Pause" : "▶️ Écouter le guide"}
                      </Text>
                    </TouchableOpacity>
                  </View>
                  <Text className="text-base text-foreground leading-relaxed whitespace-pre-line">
                    {selectedModule.content.replace("AUDIO_GEMINI_COMPTE\n\n", "")}
                  </Text>
                </View>
              ) : selectedModule.content.startsWith("AUDIO_GEMINI_PROMPTING\n") ? (
                <View className="gap-4">
                  <View className="bg-primary/10 rounded-2xl p-6 border border-primary/30 mb-4">
                    <TouchableOpacity
                      onPress={toggleAudioGeminiPrompting}
                      className="bg-primary rounded-2xl p-6 items-center active:opacity-80"
                    >
                      <IconSymbol 
                        size={48} 
                        name={isPlayingGeminiPrompting ? "pause.circle.fill" : "play.circle.fill"} 
                        color="#F5F0E8" 
                      />
                      <Text className="text-background font-bold text-lg mt-3">
                        {isPlayingGeminiPrompting ? "⏸️ Pause" : "▶️ Écouter le guide"}
                      </Text>
                    </TouchableOpacity>
                  </View>
                  <Text className="text-base text-foreground leading-relaxed whitespace-pre-line">
                    {selectedModule.content.replace("AUDIO_GEMINI_PROMPTING\n\n", "")}
                  </Text>
                </View>
              ) : selectedModule.content.startsWith("AUDIO_GEMINI_GEMS\n") ? (
                <View className="gap-4">
                  <View className="bg-primary/10 rounded-2xl p-6 border border-primary/30 mb-4">
                    <TouchableOpacity
                      onPress={toggleAudioGeminiGems}
                      className="bg-primary rounded-2xl p-6 items-center active:opacity-80"
                    >
                      <IconSymbol 
                        size={48} 
                        name={isPlayingGeminiGems ? "pause.circle.fill" : "play.circle.fill"} 
                        color="#F5F0E8" 
                      />
                      <Text className="text-background font-bold text-lg mt-3">
                        {isPlayingGeminiGems ? "⏸️ Pause" : "▶️ Écouter le guide"}
                      </Text>
                    </TouchableOpacity>
                  </View>
                  <Text className="text-base text-foreground leading-relaxed whitespace-pre-line">
                    {selectedModule.content.replace("AUDIO_GEMINI_GEMS\n\n", "")}
                  </Text>
                </View>
              ) : selectedModule.content.startsWith("AUDIO_GEMINI_IMAGES\n") ? (
                <View className="gap-4">
                  <View className="bg-primary/10 rounded-2xl p-6 border border-primary/30 mb-4">
                    <TouchableOpacity
                      onPress={toggleAudioGeminiImages}
                      className="bg-primary rounded-2xl p-6 items-center active:opacity-80"
                    >
                      <IconSymbol 
                        size={48} 
                        name={isPlayingGeminiImages ? "pause.circle.fill" : "play.circle.fill"} 
                        color="#F5F0E8" 
                      />
                      <Text className="text-background font-bold text-lg mt-3">
                        {isPlayingGeminiImages ? "⏸️ Pause" : "▶️ Écouter le guide"}
                      </Text>
                    </TouchableOpacity>
                  </View>
                  <Text className="text-base text-foreground leading-relaxed whitespace-pre-line">
                    {selectedModule.content.replace("AUDIO_GEMINI_IMAGES\n\n", "")}
                  </Text>
                </View>
              ) : selectedModule.content.startsWith("AUDIO_GEMINI_CONTENU\n") ? (
                <View className="gap-4">
                  <View className="bg-primary/10 rounded-2xl p-6 border border-primary/30 mb-4">
                    <TouchableOpacity
                      onPress={toggleAudioGeminiContenu}
                      className="bg-primary rounded-2xl p-6 items-center active:opacity-80"
                    >
                      <IconSymbol 
                        size={48} 
                        name={isPlayingGeminiContenu ? "pause.circle.fill" : "play.circle.fill"} 
                        color="#F5F0E8" 
                      />
                      <Text className="text-background font-bold text-lg mt-3">
                        {isPlayingGeminiContenu ? "⏸️ Pause" : "▶️ Écouter le guide"}
                      </Text>
                    </TouchableOpacity>
                  </View>
                  <Text className="text-base text-foreground leading-relaxed whitespace-pre-line">
                    {selectedModule.content.replace("AUDIO_GEMINI_CONTENU\n\n", "")}
                  </Text>
                </View>
              ) : selectedModule.content.startsWith("AUDIO_GEMINI_DONNEES\n") ? (
                <View className="gap-4">
                  <View className="bg-primary/10 rounded-2xl p-6 border border-primary/30 mb-4">
                    <TouchableOpacity
                      onPress={toggleAudioGeminiDonnees}
                      className="bg-primary rounded-2xl p-6 items-center active:opacity-80"
                    >
                      <IconSymbol 
                        size={48} 
                        name={isPlayingGeminiDonnees ? "pause.circle.fill" : "play.circle.fill"} 
                        color="#F5F0E8" 
                      />
                      <Text className="text-background font-bold text-lg mt-3">
                        {isPlayingGeminiDonnees ? "⏸️ Pause" : "▶️ Écouter le guide"}
                      </Text>
                    </TouchableOpacity>
                  </View>
                  <Text className="text-base text-foreground leading-relaxed whitespace-pre-line">
                    {selectedModule.content.replace("AUDIO_GEMINI_DONNEES\n\n", "")}
                  </Text>
                </View>
              ) : selectedModule.content.startsWith("AUDIO_GEMINI_EXTENSIONS\n") ? (
                <View className="gap-4">
                  <View className="bg-primary/10 rounded-2xl p-6 border border-primary/30 mb-4">
                    <TouchableOpacity
                      onPress={toggleAudioGeminiExtensions}
                      className="bg-primary rounded-2xl p-6 items-center active:opacity-80"
                    >
                      <IconSymbol 
                        size={48} 
                        name={isPlayingGeminiExtensions ? "pause.circle.fill" : "play.circle.fill"} 
                        color="#F5F0E8" 
                      />
                      <Text className="text-background font-bold text-lg mt-3">
                        {isPlayingGeminiExtensions ? "⏸️ Pause" : "▶️ Écouter le guide"}
                      </Text>
                    </TouchableOpacity>
                  </View>
                  <Text className="text-base text-foreground leading-relaxed whitespace-pre-line">
                    {selectedModule.content.replace("AUDIO_GEMINI_EXTENSIONS\n\n", "")}
                  </Text>
                </View>
              ) : selectedModule.content.startsWith("AUDIO_GEMINI_CAS_PRATIQUES\n") ? (
                <View className="gap-4">
                  <View className="bg-primary/10 rounded-2xl p-6 border border-primary/30 mb-4">
                    <TouchableOpacity
                      onPress={toggleAudioGeminiCasPratiques}
                      className="bg-primary rounded-2xl p-6 items-center active:opacity-80"
                    >
                      <IconSymbol 
                        size={48} 
                        name={isPlayingGeminiCasPratiques ? "pause.circle.fill" : "play.circle.fill"} 
                        color="#F5F0E8" 
                      />
                      <Text className="text-background font-bold text-lg mt-3">
                        {isPlayingGeminiCasPratiques ? "⏸️ Pause" : "▶️ Écouter le guide"}
                      </Text>
                    </TouchableOpacity>
                  </View>
                  <Text className="text-base text-foreground leading-relaxed whitespace-pre-line">
                    {selectedModule.content.replace("AUDIO_GEMINI_CAS_PRATIQUES\n\n", "")}
                  </Text>
                </View>
              ) : selectedModule.content.startsWith("AUDIO_GEMINI_ASTUCES\n") ? (
                <View className="gap-4">
                  <View className="bg-primary/10 rounded-2xl p-6 border border-primary/30 mb-4">
                    <TouchableOpacity
                      onPress={toggleAudioGeminiAstuces}
                      className="bg-primary rounded-2xl p-6 items-center active:opacity-80"
                    >
                      <IconSymbol 
                        size={48} 
                        name={isPlayingGeminiAstuces ? "pause.circle.fill" : "play.circle.fill"} 
                        color="#F5F0E8" 
                      />
                      <Text className="text-background font-bold text-lg mt-3">
                        {isPlayingGeminiAstuces ? "⏸️ Pause" : "▶️ Écouter le guide"}
                      </Text>
                    </TouchableOpacity>
                  </View>
                  <Text className="text-base text-foreground leading-relaxed whitespace-pre-line">
                    {selectedModule.content.replace("AUDIO_GEMINI_ASTUCES\n\n", "")}
                  </Text>
                </View>
              ) : selectedModule.content.startsWith("AUDIO_GEMINI_PLAN_ACTION\n") ? (
                <View className="gap-4">
                  <View className="bg-primary/10 rounded-2xl p-6 border border-primary/30 mb-4">
                    <TouchableOpacity
                      onPress={toggleAudioGeminiPlanAction}
                      className="bg-primary rounded-2xl p-6 items-center active:opacity-80"
                    >
                      <IconSymbol 
                        size={48} 
                        name={isPlayingGeminiPlanAction ? "pause.circle.fill" : "play.circle.fill"} 
                        color="#F5F0E8" 
                      />
                      <Text className="text-background font-bold text-lg mt-3">
                        {isPlayingGeminiPlanAction ? "⏸️ Pause" : "▶️ Écouter le guide"}
                      </Text>
                    </TouchableOpacity>
                  </View>
                  <Text className="text-base text-foreground leading-relaxed whitespace-pre-line">
                    {selectedModule.content.replace("AUDIO_GEMINI_PLAN_ACTION\n\n", "")}
                  </Text>
                </View>
              ) : selectedModule.content === "WHATSAPP_LINK" ? (
                <View className="gap-4">
                  <View className="bg-success/10 rounded-3xl p-6 border-2 border-success/30">
                    <View className="items-center mb-6">
                      <View className="w-20 h-20 bg-success rounded-full items-center justify-center mb-4">
                        <Text className="text-5xl">📱</Text>
                      </View>
                      <Text className="text-2xl font-bold text-foreground text-center mb-2">
                        Rejoignez notre groupe WhatsApp !
                      </Text>
                      <Text className="text-base text-muted text-center leading-relaxed">
                        Accédez à tous les tutoriels vidéo, audios et ressources exclusives
                      </Text>
                    </View>

                    <View className="gap-3 mb-6">
                      <View className="flex-row items-center gap-2">
                        <IconSymbol size={20} name="checkmark.circle.fill" color="#22C55E" />
                        <Text className="text-sm text-foreground flex-1">
                          Tutoriels vidéo complets étape par étape
                        </Text>
                      </View>
                      <View className="flex-row items-center gap-2">
                        <IconSymbol size={20} name="checkmark.circle.fill" color="#22C55E" />
                        <Text className="text-sm text-foreground flex-1">
                          Guides audio pour apprendre en déplacement
                        </Text>
                      </View>
                      <View className="flex-row items-center gap-2">
                        <IconSymbol size={20} name="checkmark.circle.fill" color="#22C55E" />
                        <Text className="text-sm text-foreground flex-1">
                          Prompts avancés et astuces exclusives
                        </Text>
                      </View>
                      <View className="flex-row items-center gap-2">
                        <IconSymbol size={20} name="checkmark.circle.fill" color="#22C55E" />
                        <Text className="text-sm text-foreground flex-1">
                          Support et réponses à vos questions
                        </Text>
                      </View>
                    </View>

                    <TouchableOpacity
                      onPress={() => Linking.openURL("https://whatsapp.com/channel/0029VbCC3zx3WHTackO2Nh0B/109")}
                      className="bg-success rounded-2xl py-5 shadow-lg active:opacity-80"
                    >
                      <Text className="text-white font-bold text-center text-xl">
                        💬 Rejoindre le groupe WhatsApp
                      </Text>
                    </TouchableOpacity>
                  </View>
                </View>
              ) : selectedModule.content === "AUDIO_TUTORIAL" ? (
                <View className="gap-4">
                  <View className="bg-primary/10 rounded-2xl p-6 border border-primary/30">
                    <Text className="text-lg font-bold text-foreground mb-4 text-center">
                      🎧 Guide audio : Les 5 étapes pour créer vos photos IA
                    </Text>
                    
                    <TouchableOpacity
                      onPress={toggleAudioTutorial}
                      className="bg-primary rounded-2xl p-6 items-center active:opacity-80"
                    >
                      <IconSymbol 
                        size={48} 
                        name={isPlayingTutorial ? "pause.circle.fill" : "play.circle.fill"} 
                        color="#F5F0E8" 
                      />
                      <Text className="text-background font-bold text-lg mt-3">
                        {isPlayingTutorial ? "⏸️ Pause" : "▶️ Écouter le guide"}
                      </Text>
                    </TouchableOpacity>
                    
                    <View className="mt-6">
                      <Text className="text-base font-semibold text-foreground mb-3">
                        Dans ce guide audio, vous allez apprendre :
                      </Text>
                      <Text className="text-sm text-muted leading-relaxed">
                        • Comment télécharger ChatGPT{"\n"}
                        • Comment télécharger Gemini{"\n"}
                        • Comment créer votre prompt dans ChatGPT{"\n"}
                        • Comment copier le prompt dans Gemini{"\n"}
                        • Comment générer votre photo professionnelle
                      </Text>
                    </View>
                  </View>
                </View>
              ) : (
                <View className="bg-surface rounded-2xl p-5 border border-border mt-2">
                  <Text className="text-base text-foreground leading-relaxed">
                    {selectedModule.content}
                  </Text>
                </View>
              )}
            </View>
          </View>
        </ScrollView>
      </ScreenContainer>
    );
  }

  // Affichage du détail d'une formation
  if (selectedFormation) {
    return (
      <ScreenContainer>
        <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
          <View className="flex-1 p-6">
            {/* Header avec bouton retour */}
            <TouchableOpacity
              className="flex-row items-center gap-2 mb-4"
              onPress={() => setSelectedFormation(null)}
            >
              <IconSymbol size={24} name="chevron.left" color="#8B6F47" />
              <Text className="text-base text-primary font-semibold">Retour</Text>
            </TouchableOpacity>

            {/* Détail de la formation */}
            <View className="gap-4">

              <Text className="text-2xl font-bold text-foreground">
                {selectedFormation.title}
              </Text>

              <View className="flex-row gap-3">
                <View className="bg-surface px-3 py-1 rounded-full">
                  <Text className="text-sm text-muted">{selectedFormation.duration}</Text>
                </View>
                <View className="bg-surface px-3 py-1 rounded-full">
                  <Text className="text-sm text-muted">{selectedFormation.level}</Text>
                </View>
              </View>

              <Text className="text-base text-muted leading-relaxed">
                {selectedFormation.description}
              </Text>

              {/* Encart informatif pour la formation photo IA */}
              {selectedFormation.id === "3" && (
                <View className="bg-primary/10 rounded-xl p-4 border border-primary/30 mt-4">
                  <Text className="text-base font-bold text-foreground mb-2">
                    💡 Pourquoi cette mini formation va transformer votre business
                  </Text>
                  <Text className="text-sm text-muted leading-relaxed mb-2">
                    Les entrepreneurs qui maîtrisent la génération d'images IA économisent entre 500€ et 1000€ par shooting photo. Plus besoin de photographe, de studio ou de modèles !
                  </Text>
                  <Text className="text-sm text-muted leading-relaxed mb-2">
                    En quelques minutes, vous créez des visuels professionnels pour vos produits, votre contenu marketing et vos réseaux sociaux. C'est rapide, gratuit et illimité.
                  </Text>
                  <Text className="text-sm font-semibold text-foreground mt-2">
                    Dans cette mini formation, vous apprenez à créer des photos qui auraient coûté des centaines d'euros avec un photographe.
                  </Text>
                </View>
              )}

              {/* Modules */}
              <View className="mt-4">
                <Text className="text-xl font-bold text-foreground mb-3">Modules de la mini formation</Text>
                <View className="gap-3">
                  {selectedFormation.modules.map((module, index) => {
                    const isComplete = isModuleComplete(selectedFormation.id, module.id);
                    return (
                      <View key={module.id} className="flex-row items-center gap-3">
                        {/* Checkbox pour marquer comme complété */}
                        <TouchableOpacity
                          onPress={() => {
                            if (isComplete) {
                              markModuleIncomplete(selectedFormation.id, module.id, selectedFormation.modules.length);
                            } else {
                              markModuleComplete(selectedFormation.id, module.id, selectedFormation.modules.length);
                              trackEvent('Formation', 'Compléter module', `${selectedFormation.title} - ${module.title}`);
                            }
                          }}
                          className="w-6 h-6 rounded-full border-2 items-center justify-center active:opacity-80"
                          style={{
                            borderColor: isComplete ? '#8B6F47' : '#C9B8A8',
                            backgroundColor: isComplete ? '#8B6F47' : 'transparent',
                          }}
                        >
                          {isComplete && (
                            <Text className="text-background font-bold text-xs">✓</Text>
                          )}
                        </TouchableOpacity>

                        {/* Module */}
                        <TouchableOpacity
                          className="flex-1 bg-surface rounded-xl p-4 border border-border active:opacity-80"
                          onPress={() => {
                            setSelectedModule(module);
                            trackEvent('Formation', 'Démarrer module', `${selectedFormation.title} - ${module.title}`);
                          }}
                        >
                          <View className="flex-row items-center justify-between">
                            <View className="flex-1">
                              <Text className="text-base font-semibold text-foreground">
                                Module {index + 1} : {module.title}
                              </Text>
                              <Text className="text-sm text-muted mt-1">{module.description}</Text>
                            </View>
                            <IconSymbol size={20} name="chevron.right" color="#8B6F47" />
                          </View>
                        </TouchableOpacity>
                      </View>
                    );
                  })}
                </View>
              </View>

              {/* Bouton Coaching Privé */}
              <TouchableOpacity 
                className="bg-primary rounded-2xl p-4 mt-6 active:opacity-80"
                onPress={() => setShowCoachingModal(true)}
              >
                <Text className="text-background font-bold text-center text-lg">
                  👥 Coaching Privé
                </Text>
                <Text className="text-background/90 text-center text-sm mt-1">
                  Accompagnement personnalisé en one-to-one
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </ScreenContainer>
    );
  }

  const handleCoachingSubmit = async () => {
    // Validation
    if (!coachingForm.nom || !coachingForm.prenom || !coachingForm.email || !coachingForm.question) {
      alert("Veuillez remplir tous les champs");
      return;
    }

    // Validation email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(coachingForm.email)) {
      alert("Veuillez entrer un email valide");
      return;
    }

    // Sauvegarder dans AsyncStorage
    try {
      await AsyncStorage.setItem("coaching_request", JSON.stringify({
        ...coachingForm,
        date: new Date().toISOString(),
      }));
      
      // Fermer le modal
      setShowCoachingModal(false);
      
      // Ouvrir Telegram
      const telegramUrl = "https://t.me/+FVWCJsRlXLBiZDI8";
      Linking.openURL(telegramUrl);
      
      // Réinitialiser le formulaire
      setCoachingForm({
        nom: "",
        prenom: "",
        email: "",
        question: "",
      });
    } catch (error) {
      alert("Une erreur s'est produite. Veuillez réessayer.");
    }
  };

  return (
    <ScreenContainer>
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <View className="flex-1 gap-6 p-6">
          {/* Header */}
          <View className="pt-4">
            <Text className="text-3xl font-bold text-foreground">Mini formations</Text>
            <Text className="text-base text-muted mt-2">
              Apprenez à utiliser l'IA pour automatiser vos tâches, créer du contenu et développer votre business plus rapidement
            </Text>
          </View>

          {/* Liste des mini formations */}
          <View className="gap-4">
            {formations.map((formation) => (
              <TouchableOpacity
                key={formation.id}
                className="bg-surface rounded-3xl overflow-hidden shadow-lg border-2 border-border active:opacity-80"
                onPress={() => handleFormationClick(formation)}
              >
                <View className="p-6 gap-3">
                  <View className="flex-row justify-between items-start">
                    <View className="flex-1">
                      <Text className="text-lg font-semibold text-foreground">
                        {formation.title}
                      </Text>
                      <View className="bg-success/20 px-2 py-1 rounded-full self-start mt-2">
                        <Text className="text-xs font-bold text-success">
                          ✓ Gratuit
                        </Text>
                      </View>
                    </View>
                    <IconSymbol size={20} name="chevron.right" color="#C9B8A8" />
                  </View>
                  <Text className="text-sm text-muted leading-relaxed">
                    {formation.description}
                  </Text>
                  <View className="flex-row gap-3 mt-1">
                    <View className="flex-row items-center gap-1">
                      <IconSymbol size={14} name="clock" color="#8B6F47" />
                      <Text className="text-xs text-muted">{formation.duration}</Text>
                    </View>
                    <View className="flex-row items-center gap-1">
                      <IconSymbol size={14} name="chart.bar" color="#8B6F47" />
                      <Text className="text-xs text-muted">{formation.level}</Text>
                    </View>
                  </View>

                  {/* Barre de progression */}
                  <View className="mt-3">
                    <View className="flex-row justify-between items-center mb-2">
                      <Text className="text-xs text-muted">
                        {getCompletedModulesCount(formation.id)}/{formation.modules.length} modules complétés
                      </Text>
                      <Text className="text-xs font-bold text-primary">
                        {getFormationProgress(formation.id)}%
                      </Text>
                    </View>
                    <View className="h-2 bg-border rounded-full overflow-hidden">
                      <View 
                        className="h-full bg-primary rounded-full"
                        style={{ width: `${getFormationProgress(formation.id)}%` }}
                      />
                    </View>
                  </View>
                </View>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      </ScrollView>

      {/* Modal Coaching Privé */}
      <Modal
        visible={showCoachingModal}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setShowCoachingModal(false)}
      >
        <View className="flex-1 bg-black/50 justify-center items-center p-4">
          <View className="bg-background rounded-3xl w-full max-w-md p-6 gap-4">
            {/* Header */}
            <View className="items-center gap-2">
              <Text className="text-2xl font-bold text-foreground">👥 Coaching Privé</Text>
              <Text className="text-sm text-muted text-center">
                Remplissez ce formulaire pour accéder à notre accompagnement personnalisé
              </Text>
            </View>

            {/* Formulaire */}
            <View className="gap-3">
              <View>
                <Text className="text-sm font-semibold text-foreground mb-1">Nom *</Text>
                <TextInput
                  className="bg-surface border border-border rounded-xl p-3 text-foreground"
                  placeholder="Votre nom"
                  value={coachingForm.nom}
                  onChangeText={(text) => setCoachingForm({ ...coachingForm, nom: text })}
                />
              </View>

              <View>
                <Text className="text-sm font-semibold text-foreground mb-1">Prénom *</Text>
                <TextInput
                  className="bg-surface border border-border rounded-xl p-3 text-foreground"
                  placeholder="Votre prénom"
                  value={coachingForm.prenom}
                  onChangeText={(text) => setCoachingForm({ ...coachingForm, prenom: text })}
                />
              </View>

              <View>
                <Text className="text-sm font-semibold text-foreground mb-1">Email *</Text>
                <TextInput
                  className="bg-surface border border-border rounded-xl p-3 text-foreground"
                  placeholder="votre@email.com"
                  keyboardType="email-address"
                  autoCapitalize="none"
                  value={coachingForm.email}
                  onChangeText={(text) => setCoachingForm({ ...coachingForm, email: text })}
                />
              </View>

              <View>
                <Text className="text-sm font-semibold text-foreground mb-1">Votre question *</Text>
                <TextInput
                  className="bg-surface border border-border rounded-xl p-3 text-foreground"
                  placeholder="Quelle est votre question ?"
                  multiline
                  numberOfLines={4}
                  textAlignVertical="top"
                  value={coachingForm.question}
                  onChangeText={(text) => setCoachingForm({ ...coachingForm, question: text })}
                />
              </View>
            </View>

            {/* QR Code Telegram */}
            <View className="items-center gap-2 mt-2">
              <Text className="text-xs text-muted text-center">
                Après validation, vous serez redirigé vers notre groupe Telegram
              </Text>
              <Image
                source={require("@/assets/images/telegram-qr.jpg")}
                style={{ width: 150, height: 150 }}
                resizeMode="contain"
              />
            </View>

            {/* Boutons */}
            <View className="gap-3 mt-2">
              <TouchableOpacity
                className="bg-primary rounded-2xl p-4 active:opacity-80"
                onPress={handleCoachingSubmit}
              >
                <Text className="text-background font-bold text-center text-base">
                  Valider et rejoindre Telegram
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                className="bg-surface rounded-2xl p-4 active:opacity-80"
                onPress={() => setShowCoachingModal(false)}
              >
                <Text className="text-foreground font-semibold text-center text-base">
                  Annuler
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </ScreenContainer>
  );
}
