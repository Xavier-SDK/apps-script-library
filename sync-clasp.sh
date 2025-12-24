#!/bin/bash
# Script de synchronisation des fichiers vers Apps Script
# Synchronise chaque script dans son propre projet Apps Script

# Charger la configuration des projets
PROJECTS_FILE=".clasp-projects.json"

if [ ! -f "$PROJECTS_FILE" ]; then
    echo "❌ Fichier de configuration $PROJECTS_FILE introuvable"
    exit 1
fi

# Fonction pour synchroniser un projet
sync_project() {
    local project_name=$1
    local script_id=$2
    local source_file=$3
    
    echo ""
    echo "📦 Synchronisation de $project_name..."
    echo "   Source: $source_file"
    echo "   Script ID: $script_id"
    
    # Créer un répertoire temporaire pour ce projet
    local temp_dir="sync-temp-$project_name"
    mkdir -p "$temp_dir"
    
    # Copier le fichier source vers le répertoire temporaire
    if [ ! -f "$source_file" ]; then
        echo "   ⚠️  Fichier source introuvable: $source_file"
        return 1
    fi
    
    cp "$source_file" "$temp_dir/"
    
    # Si c'est le projet TVA, copier aussi IBAN.gs dans le même projet
    if [ "$project_name" = "TVA" ]; then
        if [ -f "scripts/IBAN.gs" ]; then
            cp "scripts/IBAN.gs" "$temp_dir/"
            echo "   📄 IBAN.gs ajouté au projet"
        fi
    fi
    
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
    
    # Synchroniser avec clasp
    cd "$temp_dir"
    echo "   🔄 Push vers Apps Script..."
    clasp push --force
    cd ..
    
    # Nettoyer
    rm -rf "$temp_dir"
    
    echo "   ✅ $project_name synchronisé"
}

# Parser le JSON et synchroniser chaque projet
# Note: Cette version simple fonctionne avec jq si disponible, sinon avec une approche basique
if command -v jq &> /dev/null; then
    # Utiliser jq pour parser le JSON
    project_names=$(jq -r '.projects | keys[]' "$PROJECTS_FILE")
    
    for project_name in $project_names; do
        script_id=$(jq -r ".projects[\"$project_name\"].scriptId" "$PROJECTS_FILE")
        source_file=$(jq -r ".projects[\"$project_name\"].sourceFile" "$PROJECTS_FILE")
        
        sync_project "$project_name" "$script_id" "$source_file"
    done
else
    # Fallback: synchroniser TVA manuellement
    echo "⚠️  jq non disponible, synchronisation manuelle de TVA"
    sync_project "TVA" \
        "1E9s8sErZAolahBT7pHR7EsmekAp5b_ZkAIKQ3cCzp13Zk6MKh2wSYQlL" \
        "scripts/TVA.gs"
fi

echo ""
echo "✅ Synchronisation terminée"
