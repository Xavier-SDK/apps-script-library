#!/bin/bash
# Script pour surveiller et synchroniser automatiquement les fichiers vers Apps Script
# Utilise clasp push --watch pour surveiller les changements

# Charger la configuration des projets
PROJECTS_FILE=".clasp-projects.json"

if [ ! -f "$PROJECTS_FILE" ]; then
    echo "❌ Fichier de configuration $PROJECTS_FILE introuvable"
    exit 1
fi

# Pour le watch, on utilise un seul projet à la fois
# Par défaut, on prend le premier projet de la liste
if command -v jq &> /dev/null; then
    # Utiliser jq pour parser le JSON
    project_name=$(jq -r '.projects | keys[0]' "$PROJECTS_FILE")
    script_id=$(jq -r ".projects[\"$project_name\"].scriptId" "$PROJECTS_FILE")
    source_file=$(jq -r ".projects[\"$project_name\"].sourceFile" "$PROJECTS_FILE")
else
    # Fallback: utiliser TVA
    project_name="TVA"
    script_id="1E9s8sErZAolahBT7pHR7EsmekAp5b_ZkAIKQ3cCzp13Zk6MKh2wSYQlL"
    source_file="scripts/TVA.gs"
fi

echo "👀 Mode Watch - Surveillance de $project_name"
echo "   Source: $source_file"
echo "   Script ID: $script_id"
echo ""
echo "⚠️  Le script va surveiller les changements et synchroniser automatiquement."
echo "   Appuyez sur Ctrl+C pour arrêter."
echo ""

# Créer un répertoire temporaire pour le watch
temp_dir="sync-temp-watch"
mkdir -p "$temp_dir"

# Fonction de nettoyage à l'arrêt
cleanup() {
    echo ""
    echo "🛑 Arrêt du mode watch..."
    rm -rf "$temp_dir"
    exit 0
}

# Capturer Ctrl+C
trap cleanup SIGINT SIGTERM

# Copier le fichier source vers le répertoire temporaire
if [ ! -f "$source_file" ]; then
    echo "❌ Fichier source introuvable: $source_file"
    rm -rf "$temp_dir"
    exit 1
fi

cp "$source_file" "$temp_dir/"

# Copier appsscript.json si présent
if [ -f "appsscript.json" ]; then
    cp "appsscript.json" "$temp_dir/"
fi

# Créer un .clasp.json temporaire pour ce projet
cat > "$temp_dir/.clasp.json" << EOF
{
  "scriptId": "$script_id",
  "rootDir": "."
}
EOF

# Aller dans le répertoire temporaire et lancer le watch
cd "$temp_dir"
echo "🔄 Lancement du mode watch..."
echo ""

# Lancer clasp push --watch
clasp push --watch

# Si on arrive ici (normalement on ne devrait pas), nettoyer
cd ..
rm -rf "$temp_dir"

