# Guide de contribution

Merci de votre intérêt pour contribuer à **IA Business Academy** ! Ce document fournit des directives pour faciliter votre contribution au projet et garantir une collaboration harmonieuse avec l'équipe et la communauté.

## Table des matières

- [Code de conduite](#code-de-conduite)
- [Comment contribuer](#comment-contribuer)
- [Configuration de l'environnement de développement](#configuration-de-lenvironnement-de-développement)
- [Processus de contribution](#processus-de-contribution)
- [Standards de code](#standards-de-code)
- [Tests](#tests)
- [Documentation](#documentation)
- [Commit et Pull Request](#commit-et-pull-request)

## Code de conduite

En participant à ce projet, vous acceptez de respecter notre code de conduite. Nous attendons de tous les contributeurs qu'ils fassent preuve de respect, d'empathie et de professionnalisme dans toutes leurs interactions. Les comportements inacceptables incluent le harcèlement, les commentaires offensants, et toute forme de discrimination. Toute violation du code de conduite sera traitée sérieusement et pourra entraîner l'exclusion du projet.

## Comment contribuer

Il existe plusieurs façons de contribuer au projet **IA Business Academy**, selon vos compétences et vos intérêts.

### Signaler des bugs

Si vous découvrez un bug dans l'application, ouvrez une issue sur GitHub en incluant les informations suivantes : une description claire et concise du problème, les étapes pour reproduire le bug, le comportement attendu versus le comportement observé, des captures d'écran si pertinent, et votre environnement (OS, version de Node.js, version d'Expo).

### Proposer de nouvelles fonctionnalités

Pour proposer une nouvelle fonctionnalité, ouvrez d'abord une issue pour discuter de votre idée avec l'équipe. Expliquez le problème que la fonctionnalité résout, décrivez la solution proposée, et mentionnez les alternatives que vous avez envisagées. Cette discussion préalable permet de valider l'intérêt de la fonctionnalité avant d'investir du temps dans son développement.

### Améliorer la documentation

La documentation est essentielle pour faciliter l'utilisation et la contribution au projet. Vous pouvez corriger les fautes de frappe, clarifier les explications, ajouter des exemples, traduire la documentation dans d'autres langues, ou créer des tutoriels vidéo. Toute amélioration de la documentation est la bienvenue.

### Contribuer au code

Pour contribuer au code, suivez le processus décrit dans la section [Processus de contribution](#processus-de-contribution). Assurez-vous de respecter les standards de code et d'ajouter des tests pour toute nouvelle fonctionnalité.

## Configuration de l'environnement de développement

Pour configurer votre environnement de développement local, suivez ces étapes détaillées.

### Prérequis

Avant de commencer, installez les outils suivants sur votre machine :

- **Node.js** version 18 ou supérieure (recommandé : version LTS)
- **pnpm** version 9.12.0 ou supérieure
- **Git** pour le contrôle de version
- **Expo Go** sur votre appareil mobile (iOS ou Android)

### Installation

Forkez le dépôt sur GitHub en cliquant sur le bouton "Fork" en haut à droite de la page du projet. Clonez ensuite votre fork sur votre machine locale :

```bash
git clone https://github.com/votre-username/ia-business-academy.git
cd ia-business-academy
```

Installez toutes les dépendances du projet :

```bash
pnpm install
```

Lancez le serveur de développement :

```bash
pnpm dev
```

Ouvrez l'application **Expo Go** sur votre téléphone et scannez le QR code affiché dans le terminal pour tester l'application.

## Processus de contribution

Le processus de contribution suit un workflow Git standard pour garantir la qualité et la traçabilité du code.

### Étape 1 : Créer une branche

Créez une nouvelle branche pour votre contribution. Utilisez un nom descriptif qui reflète le type de modification et son objectif :

```bash
git checkout -b feature/nom-de-la-fonctionnalite
git checkout -b fix/correction-du-bug
git checkout -b docs/amelioration-documentation
```

### Étape 2 : Effectuer vos modifications

Effectuez vos modifications en respectant les standards de code du projet. Testez vos modifications localement pour vous assurer qu'elles fonctionnent correctement. Ajoutez des tests unitaires pour toute nouvelle fonctionnalité ou correction de bug.

### Étape 3 : Committer vos changements

Committez vos changements avec des messages clairs et descriptifs. Suivez la convention de commit décrite dans la section [Commit et Pull Request](#commit-et-pull-request).

```bash
git add .
git commit -m "feat: ajouter un système de badges pour les formations complétées"
```

### Étape 4 : Pousser votre branche

Poussez votre branche vers votre fork sur GitHub :

```bash
git push origin feature/nom-de-la-fonctionnalite
```

### Étape 5 : Ouvrir une Pull Request

Ouvrez une Pull Request (PR) sur le dépôt principal en fournissant une description détaillée de vos modifications. Incluez les informations suivantes : le contexte et la motivation de la PR, une description des changements effectués, les issues liées (si applicable), des captures d'écran ou vidéos pour les modifications visuelles, et une checklist confirmant que vous avez testé vos modifications et mis à jour la documentation.

### Étape 6 : Revue de code

L'équipe examinera votre Pull Request et pourra demander des modifications. Soyez réactif aux commentaires et apportez les ajustements nécessaires. Une fois la PR approuvée, elle sera fusionnée dans la branche principale.

## Standards de code

Le projet suit des standards de code stricts pour garantir la cohérence et la maintenabilité du code.

### Style de code

Le projet utilise **Prettier** pour le formatage automatique du code et **ESLint** pour l'analyse statique. Avant de committer, exécutez toujours :

```bash
pnpm format
pnpm lint
```

### Conventions de nommage

Respectez les conventions de nommage suivantes pour garantir la cohérence du code.

| Élément | Convention | Exemple |
|---------|------------|---------|
| Fichiers | kebab-case | `use-progress.ts` |
| Composants | PascalCase | `ScreenContainer.tsx` |
| Hooks | camelCase avec préfixe `use` | `useProgress` |
| Fonctions | camelCase | `markModuleComplete` |
| Constantes | UPPER_SNAKE_CASE | `PROGRESS_KEY` |
| Interfaces | PascalCase | `FormationProgress` |

### Structure des composants

Les composants React doivent suivre cette structure standard :

```typescript
import { View, Text } from "react-native";
import { useState } from "react";

interface MonComposantProps {
  title: string;
  onPress?: () => void;
}

export function MonComposant({ title, onPress }: MonComposantProps) {
  const [state, setState] = useState(false);

  const handlePress = () => {
    // Logique
    onPress?.();
  };

  return (
    <View>
      <Text>{title}</Text>
    </View>
  );
}
```

### TypeScript

Utilisez TypeScript de manière stricte. Évitez les types `any` et préférez les types explicites. Définissez des interfaces pour les props des composants et les structures de données. Utilisez les types génériques quand c'est approprié.

## Tests

Les tests sont essentiels pour garantir la qualité et la stabilité du code. Chaque nouvelle fonctionnalité doit être accompagnée de tests unitaires.

### Exécuter les tests

Pour exécuter tous les tests du projet :

```bash
pnpm test
```

Pour exécuter les tests en mode watch :

```bash
pnpm test --watch
```

### Écrire des tests

Les tests doivent être placés dans des dossiers `__tests__` à côté des fichiers testés. Utilisez **Vitest** pour écrire vos tests. Voici un exemple de structure de test :

```typescript
import { describe, it, expect, beforeEach } from 'vitest';
import { maFonction } from '../ma-fonction';

describe('maFonction', () => {
  beforeEach(() => {
    // Configuration avant chaque test
  });

  it('devrait retourner le résultat attendu', () => {
    const resultat = maFonction('input');
    expect(resultat).toBe('output attendu');
  });

  it('devrait gérer les cas d\'erreur', () => {
    expect(() => maFonction(null)).toThrow();
  });
});
```

### Couverture de tests

Visez une couverture de tests d'au moins 80% pour le code critique. Les hooks, les utilitaires, et la logique métier doivent être particulièrement bien testés.

## Documentation

La documentation doit être mise à jour chaque fois que vous ajoutez ou modifiez une fonctionnalité.

### Documentation du code

Ajoutez des commentaires JSDoc pour les fonctions et composants complexes :

```typescript
/**
 * Marque un module comme complété et met à jour la progression.
 * 
 * @param formationId - L'identifiant de la formation
 * @param moduleId - L'identifiant du module
 * @param totalModules - Le nombre total de modules dans la formation
 * @returns Une promesse qui se résout quand la progression est sauvegardée
 */
async function markModuleComplete(
  formationId: string,
  moduleId: string,
  totalModules: number
): Promise<void> {
  // Implémentation
}
```

### Documentation utilisateur

Si votre contribution affecte l'utilisation de l'application, mettez à jour le fichier `README.md` avec les nouvelles informations. Ajoutez des captures d'écran ou des vidéos si nécessaire pour illustrer les nouvelles fonctionnalités.

## Commit et Pull Request

Suivez ces conventions pour les messages de commit et les Pull Requests.

### Convention de commit

Utilisez la convention **Conventional Commits** pour vos messages de commit. Le format est le suivant :

```
<type>(<scope>): <description>

[corps optionnel]

[pied de page optionnel]
```

Les types de commit acceptés sont :

| Type | Description |
|------|-------------|
| `feat` | Nouvelle fonctionnalité |
| `fix` | Correction de bug |
| `docs` | Modification de documentation |
| `style` | Formatage, point-virgules manquants, etc. |
| `refactor` | Refactorisation du code |
| `test` | Ajout ou modification de tests |
| `chore` | Tâches de maintenance |
| `perf` | Amélioration de performance |

Exemples de messages de commit :

```bash
feat(formations): ajouter un système de badges pour les formations complétées
fix(progress): corriger le calcul du pourcentage de progression
docs(readme): mettre à jour les instructions d'installation
refactor(hooks): simplifier la logique du hook useProgress
test(progress): ajouter des tests pour les cas limites
```

### Description de Pull Request

Votre Pull Request doit inclure une description claire et complète. Utilisez ce template :

```markdown
## Description

Brève description des changements effectués.

## Motivation et contexte

Pourquoi ces changements sont-ils nécessaires ? Quel problème résolvent-ils ?

## Type de changement

- [ ] Bug fix (correction non-breaking)
- [ ] Nouvelle fonctionnalité (ajout non-breaking)
- [ ] Breaking change (modification qui affecte les fonctionnalités existantes)
- [ ] Documentation

## Comment cela a-t-il été testé ?

Décrivez les tests que vous avez effectués.

## Checklist

- [ ] Mon code respecte les standards du projet
- [ ] J'ai effectué une auto-revue de mon code
- [ ] J'ai commenté les parties complexes du code
- [ ] J'ai mis à jour la documentation
- [ ] Mes changements ne génèrent pas de nouveaux warnings
- [ ] J'ai ajouté des tests qui prouvent que ma correction/fonctionnalité fonctionne
- [ ] Les tests unitaires passent localement
- [ ] J'ai vérifié que mon code compile sans erreur
```

## Questions et support

Si vous avez des questions sur le processus de contribution ou besoin d'aide, n'hésitez pas à :

- Ouvrir une issue sur GitHub avec le label "question"
- Rejoindre le groupe Telegram de la communauté
- Contacter l'équipe via le formulaire de coaching privé

Merci de contribuer à **IA Business Academy** et d'aider à rendre l'IA accessible à tous les entrepreneurs !

---

**Dernière mise à jour : Janvier 2026**
