#!/usr/bin/env python3
# -*- coding: utf-8 -*-

# Lire le fichier
with open('app/(tabs)/ebooks.tsx', 'r', encoding='utf-8') as f:
    lines = f.readlines()

# Trouver la ligne où insérer (avant "  };" qui ferme l'objet contents)
insert_index = -1
for i, line in enumerate(lines):
    if line.strip() == '};' and i > 0 and 'return contents' in lines[i+1]:
        insert_index = i
        break

if insert_index == -1:
    print("Position d'insertion non trouvée")
    exit(1)

# Contenu à insérer (ebook 4 avec ses 5 chapitres)
new_content = ''',
    "4": {
      0: "Qu'est-ce que l'IA et pourquoi vous en avez besoin - Contenu complet disponible",
      1: "Les mythes sur l'IA démystifiés - Contenu complet disponible",
      2: "Vos premiers outils IA gratuits - Contenu complet disponible",
      3: "Votre premier projet IA en 30 minutes - Contenu complet disponible",
      4: "Les erreurs à éviter quand on débute\\n\\nMaintenant que vous savez utiliser l'IA, voici les erreurs les plus courantes et comment les éviter.\\n\\nERREUR 1 : Utiliser des prompts trop vagues\\n\\nMauvais prompt : 'Crée un post Instagram'\\n\\nBon prompt : 'Je vends des produits de beauté naturels pour femmes 25-45 ans. Crée un post Instagram de 150 mots qui présente mon nouveau sérum anti-âge. Ton inspirant. Inclus 3 emojis et un call-to-action.'\\n\\nERREUR 2 : Accepter le premier résultat\\n\\nNe prenez jamais le premier résultat sans l'améliorer. Demandez des ajustements jusqu'à satisfaction.\\n\\nERREUR 3 : Ne pas personnaliser\\n\\nAjoutez toujours votre touche personnelle, vos anecdotes, votre voix unique.\\n\\nERREUR 4 : Tout automatiser d'un coup\\n\\nCommencez par 1 tâche, puis ajoutez-en progressivement. Progressif = durable.\\n\\nERREUR 5 : Ne pas vérifier les faits\\n\\nL'IA peut inventer des informations. Vérifiez toujours les statistiques, dates et faits importants.\\n\\nERREUR 6 : Ignorer le contexte culturel\\n\\nSpécifiez le contexte africain dans vos prompts pour des résultats pertinents.\\n\\nERREUR 7 : Utiliser l'IA sans stratégie\\n\\nDéfinissez vos objectifs, audience et message AVANT d'utiliser l'IA.\\n\\nERREUR 8 : Ne pas sauvegarder les bons prompts\\n\\nCréez une bibliothèque de prompts qui fonctionnent bien.\\n\\nERREUR 9 : Avoir peur de l'échec\\n\\nVos premiers essais seront imparfaits. C'est normal. Continuez et vous progresserez.\\n\\nERREUR 10 : Oublier l'humain\\n\\nL'IA est un outil, pas un remplacement. Vous restez le chef d'orchestre.\\n\\nVOTRE PLAN ANTI-ERREURS\\n\\nSemaine 1 : Créez 5 prompts détaillés et testez-les\\nSemaine 2 : Personnalisez chaque résultat et mesurez l'engagement\\nSemaine 3 : Affinez vos prompts et créez des templates\\nSemaine 4 : Analysez vos résultats et doublez sur ce qui marche\\n\\nCONCLUSION\\n\\nFélicitations ! Vous avez maintenant toutes les clés pour utiliser l'IA efficacement.\\n\\nRappels importants :\\n✓ Commencez simple (1 outil, 1 tâche)\\n✓ Soyez précis dans vos prompts\\n✓ Personnalisez toujours\\n✓ Vérifiez les faits\\n✓ Mesurez les résultats\\n✓ Restez authentique\\n\\nLe plus important ? PASSEZ À L'ACTION.\\n\\nOuvrez ChatGPT maintenant et créez votre premier projet.\\n\\nChaque jour sans IA est un jour de retard sur vos concurrents.\\n\\nAlors qu'attendez-vous ? 🚀\\n\\nBonne application et surtout... bon business !"
    }'''

# Insérer le nouveau contenu
lines.insert(insert_index, new_content + '\n')

# Écrire le fichier modifié
with open('app/(tabs)/ebooks.tsx', 'w', encoding='utf-8') as f:
    f.writelines(lines)

print("Contenu de l'ebook 4 ajouté avec succès!")
