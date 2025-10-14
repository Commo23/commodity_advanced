# 🎯 **GUIDE : Configuration des Devises et Direction des Flux**

## 📋 **Nouvelles Fonctionnalités Ajoutées**

J'ai ajouté deux nouvelles fonctionnalités importantes au Strategy Builder :

1. **🎯 Choix de la Devise Domestique/Étrangère**
2. **📊 Détermination de la Direction des Flux (Receivable/Payable)**

---

## 🎯 **1. Choix de la Devise Domestique/Étrangère**

### **Fonctionnalité**
L'utilisateur peut maintenant choisir quelle devise de la paire est considérée comme **domestique** et laquelle est **étrangère** pour les calculs de taux d'intérêt.

### **Interface**
- **Sélecteur de devise domestique** : Dropdown avec options "Base" ou "Quote"
- **Labels dynamiques** : Les taux d'intérêt s'adaptent automatiquement
- **Indicateur visuel** : Affichage clair de la devise domestique sélectionnée

### **Impact sur les Calculs**
- **Taux domestique** : Appliqué à la devise sélectionnée comme domestique
- **Taux étranger** : Appliqué à l'autre devise
- **Formules de pricing** : Utilisent les bons taux selon la sélection

### **Exemple**
```
Paire: EUR/USD
- Si "Quote" (USD) est domestique → Domestic Rate = USD Rate, Foreign Rate = EUR Rate
- Si "Base" (EUR) est domestique → Domestic Rate = EUR Rate, Foreign Rate = USD Rate
```

---

## 📊 **2. Direction des Flux (Receivable/Payable)**

### **Fonctionnalité**
L'utilisateur peut maintenant spécifier si chaque volume de devise est :
- **📥 Receivable** : Vous recevez cette devise
- **📤 Payable** : Vous payez cette devise

### **Interface**
- **Boutons toggle** : Pour chaque devise (Base et Quote)
- **Indicateurs visuels** : Couleurs et icônes pour distinguer receivable/payable
- **Résumé de configuration** : Affichage clair de la configuration complète

### **Indicateurs Visuels**
- **📥 Receivable** : Bouton bleu avec icône "recevoir"
- **📤 Payable** : Bouton rouge avec icône "payer"
- **Labels colorés** : Vert pour receivable, rouge pour payable

---

## 🎨 **Interface Utilisateur**

### **Section "Currency Configuration & Flow Direction"**
```
┌─────────────────────────────────────────────────────────────┐
│ 🛡️ Currency Configuration & Flow Direction                 │
├─────────────────────────────────────────────────────────────┤
│ Domestic Currency Selection:                                │
│ [Base (EUR) ▼] [Quote (USD) ▼]                             │
│ Current: USD is domestic                                    │
│                                                             │
│ Volume Flow Direction:                                      │
│ EUR Volume: [📥 Receivable] [📤 Payable]                   │
│ USD Volume: [📥 Receivable] [📤 Payable]                   │
│                                                             │
│ Configuration Summary:                                      │
│ • Domestic Currency: USD (for interest rate calculations)  │
│ • EUR Flow: receivable (you receive EUR)                   │
│ • USD Flow: payable (you pay USD)                          │
└─────────────────────────────────────────────────────────────┘
```

### **Labels Dynamiques des Taux**
```
Domestic Rate (%) - USD ℹ️    [Slider] [Input]
Foreign Rate (%) - EUR ℹ️     [Slider] [Input]
```

### **Volumes avec Indicateurs**
```
EUR Volume 📥 receivable     [Input Field]
USD Volume 📤 payable        [Input Field]
```

---

## 🔧 **Configuration Technique**

### **Nouveaux Champs dans FXStrategyParams**
```typescript
interface FXStrategyParams {
  // ... existing fields ...
  
  // New fields
  domesticCurrency: string;    // 'base' or 'quote'
  baseVolumeDirection: 'receivable' | 'payable';
  quoteVolumeDirection: 'receivable' | 'payable';
}
```

### **Valeurs par Défaut**
```typescript
{
  domesticCurrency: 'quote',           // Quote currency is domestic by default
  baseVolumeDirection: 'receivable',   // Base currency is receivable by default
  quoteVolumeDirection: 'payable'      // Quote currency is payable by default
}
```

### **Compatibilité Ascendante**
- ✅ **Anciens scénarios** : Nouveaux champs ajoutés automatiquement avec valeurs par défaut
- ✅ **Sauvegarde** : Tous les nouveaux champs sont sauvegardés dans localStorage
- ✅ **Chargement** : Anciens scénarios chargés avec configuration par défaut

---

## 📊 **Exemples d'Utilisation**

### **Exemple 1 : Importateur Européen**
```
Paire: EUR/USD
Domestic Currency: EUR (Base)
EUR Flow: receivable (reçoit des euros)
USD Flow: payable (paye des dollars)

Configuration:
• Domestic Rate = EUR Rate
• Foreign Rate = USD Rate
• EUR Volume = receivable
• USD Volume = payable
```

### **Exemple 2 : Exportateur Américain**
```
Paire: EUR/USD
Domestic Currency: USD (Quote)
EUR Flow: receivable (reçoit des euros)
USD Flow: receivable (reçoit des dollars)

Configuration:
• Domestic Rate = USD Rate
• Foreign Rate = EUR Rate
• EUR Volume = receivable
• USD Volume = receivable
```

### **Exemple 3 : Trader Cross-Currency**
```
Paire: GBP/JPY
Domestic Currency: GBP (Base)
GBP Flow: payable (paye des livres)
JPY Flow: receivable (reçoit des yens)

Configuration:
• Domestic Rate = GBP Rate
• Foreign Rate = JPY Rate
• GBP Volume = payable
• JPY Volume = receivable
```

---

## 🎯 **Avantages pour l'Utilisateur**

### **1. Flexibilité Maximale**
- ✅ **Choix libre** de la devise domestique
- ✅ **Configuration précise** des flux
- ✅ **Adaptation** à tous les scénarios de trading

### **2. Clarté des Calculs**
- ✅ **Labels dynamiques** qui s'adaptent
- ✅ **Indicateurs visuels** clairs
- ✅ **Résumé de configuration** toujours visible

### **3. Expérience Utilisateur**
- ✅ **Interface intuitive** avec boutons toggle
- ✅ **Feedback visuel** immédiat
- ✅ **Configuration persistante** sauvegardée

### **4. Précision des Stratégies**
- ✅ **Calculs corrects** selon la configuration
- ✅ **Hedging adapté** aux flux réels
- ✅ **Analyse de risque** précise

---

## 🔄 **Synchronisation et Persistance**

### **Sauvegarde Automatique**
- ✅ **localStorage** : Configuration sauvegardée automatiquement
- ✅ **Supabase** : Synchronisation avec la base de données
- ✅ **Scénarios** : Nouveaux champs inclus dans les scénarios sauvegardés

### **Chargement des Scénarios**
- ✅ **Scénarios existants** : Chargés avec valeurs par défaut
- ✅ **Nouveaux scénarios** : Configuration complète sauvegardée
- ✅ **Compatibilité** : Anciens scénarios fonctionnent toujours

---

## 🧪 **Test des Fonctionnalités**

### **Étapes de Test**
1. **Sélectionner une paire de devises** (ex: EUR/USD)
2. **Choisir la devise domestique** (Base ou Quote)
3. **Configurer les directions de flux** (Receivable/Payable)
4. **Vérifier les labels** des taux d'intérêt
5. **Vérifier les indicateurs** sur les volumes
6. **Sauvegarder un scénario** et le recharger
7. **Vérifier la persistance** de la configuration

### **Résultats Attendus**
- ✅ **Labels dynamiques** : Taux s'adaptent à la sélection
- ✅ **Indicateurs visuels** : Couleurs et icônes correctes
- ✅ **Résumé** : Configuration affichée clairement
- ✅ **Sauvegarde** : Configuration persistante
- ✅ **Calculs** : Utilisation des bons taux

---

## 📝 **Notes Techniques**

### **Gestion des États**
```typescript
// Mise à jour des paramètres
setParams({
  ...params,
  domesticCurrency: 'base', // ou 'quote'
  baseVolumeDirection: 'receivable', // ou 'payable'
  quoteVolumeDirection: 'payable'    // ou 'receivable'
});
```

### **Rendu Conditionnel**
```typescript
// Labels dynamiques
{params.domesticCurrency === 'base' ? params.currencyPair?.base : params.currencyPair?.quote}

// Indicateurs visuels
className={`text-xs px-1 py-0.5 rounded ${
  params.baseVolumeDirection === 'receivable' 
    ? 'bg-green-100 text-green-700' 
    : 'bg-red-100 text-red-700'
}`}
```

---

## ✅ **Statut de l'Implémentation**

- ✅ **Interface utilisateur** : Complète et intuitive
- ✅ **Gestion des états** : Implémentée
- ✅ **Compatibilité ascendante** : Assurée
- ✅ **Sauvegarde** : Fonctionnelle
- ✅ **Tests** : Aucune erreur de linting
- ✅ **Documentation** : Complète

**🎉 Les nouvelles fonctionnalités sont prêtes et permettent une configuration précise des devises et des flux dans le Strategy Builder !**
