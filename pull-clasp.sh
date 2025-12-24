#!/bin/bash
# Script pour récupérer les modifications depuis Apps Script vers local
# Récupère chaque projet individuellement

# Charger la configuration des projets
PROJECTS_FILE=".clasp-projects.json"

if [ ! -f "$PROJECTS_FILE" ]; then
    echo "❌ Fichier de configuration $PROJECTS_FILE introuvable"
    exit 1
fi

# Fonction pour récupérer un projet
pull_project() {
    local project_name=$1
    local script_id=$2
    local source_file=$3
    
    echo ""
    echo "📥 Récupération de $project_name..."
    echo "   Script ID: $script_id"
    echo "   Destination: $source_file"
    
    # Créer un répertoire temporaire pour ce projet
    local temp_dir="sync-temp-$project_name"
    mkdir -p "$temp_dir"
    
    # Créer un .clasp.json temporaire pour ce projet
    cat > "$temp_dir/.clasp.json" << EOF
{
  "scriptId": "$script_id",
  "rootDir": "."
}
EOF
    
    # Récupérer depuis Apps Script
    cd "$temp_dir"
    echo "   🔄 Pull depuis Apps Script..."
    clasp pull
    cd ..
    
    # Copier les fichiers récupérés vers la destination
    # Chercher tous les fichiers .js (sauf appsscript.json)
    local js_files=$(find "$temp_dir" -name "*.js" -not -name "appsscript.json" | head -1)
    
    if [ -n "$js_files" ]; then
        # Prendre le premier fichier .js trouvé
        local js_file=$(echo "$js_files" | head -1)
        local js_filename=$(basename "$js_file" .js)
        
        # Convertir .js en .gs et copier vers la destination
        cp "$js_file" "$source_file"
        echo "   ✓ Fichier récupéré: $js_filename.js → $source_file"
    elif [ -f "$temp_dir/${source_file##*/}.js" ]; then
        # Fallback: chercher avec le nom attendu
        local basename=$(basename "$source_file" .gs)
        cp "$temp_dir/${basename}.js" "$source_file"
        echo "   ✓ $source_file mis à jour"
    elif [ -f "$temp_dir/${source_file##*/}" ]; then
        cp "$temp_dir/${source_file##*/}" "$source_file"
        echo "   ✓ $source_file mis à jour"
    else
        echo "   ⚠️  Aucun fichier trouvé dans le projet"
        echo "   📋 Fichiers disponibles dans $temp_dir:"
        ls -la "$temp_dir" || true
    fi
    
    # Nettoyer
    rm -rf "$temp_dir"
    
    echo "   ✅ $project_name récupéré"
}

# Parser le JSON et récupérer chaque projet
if command -v jq &> /dev/null; then
    # Utiliser jq pour parser le JSON
    project_names=$(jq -r '.projects | keys[]' "$PROJECTS_FILE")
    
    for project_name in $project_names; do
        script_id=$(jq -r ".projects[\"$project_name\"].scriptId" "$PROJECTS_FILE")
        source_file=$(jq -r ".projects[\"$project_name\"].sourceFile" "$PROJECTS_FILE")
        
        pull_project "$project_name" "$script_id" "$source_file"
    done
else
    # Fallback: récupérer TVA manuellement
    echo "⚠️  jq non disponible, récupération manuelle de TVA"
    pull_project "TVA" \
        "1E9s8sErZAolahBT7pHR7EsmekAp5b_ZkAIKQ3cCzp13Zk6MKh2wSYQlL" \
        "scripts/TVA.gs"
fi

echo ""
echo "✅ Récupération terminée"
