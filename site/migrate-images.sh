#!/usr/bin/env bash
# =====================================================================
#  West Coast Arcades — rapatriement des images dans /img
#  À lancer UNE FOIS depuis le dossier du site :
#      bash migrate-images.sh
#  Ce que fait le script :
#   1. télécharge toutes les images encore hébergées sur westcoastarcades.fr
#      dans le dossier /img (à la racine du site) ;
#   2. réécrit toutes les pages .html pour pointer vers /img (chemins locaux).
#  Après ça, le site est 100% autonome (plus aucune dépendance à WordPress).
#
#  Compatible macOS (sed BSD). Sur Linux, voir la note en bas.
# =====================================================================
set -u
cd "$(dirname "$0")"
mkdir -p img

echo "==> Collecte des URLs d'images…"
grep -rhoE 'https://www\.westcoastarcades\.fr/wp-content/uploads/[^"'"'"' )>]+' . --include='*.html' \
  | sed 's/?.*$//' | sort -u > img/_urls.txt
echo "    $(wc -l < img/_urls.txt) images à récupérer."

echo "==> Téléchargement dans /img…"
ok=0; fail=0
while IFS= read -r url; do
  [ -z "$url" ] && continue
  fn="$(basename "$url")"
  if [ -f "img/$fn" ]; then ok=$((ok+1)); continue; fi
  if curl -fsSL "$url" -o "img/$fn"; then ok=$((ok+1)); else echo "    ECHEC: $url"; fail=$((fail+1)); fi
done < img/_urls.txt
echo "    OK: $ok  |  échecs: $fail"

echo "==> Réécriture des pages vers /img…"
# Pages à la racine -> img/fichier
for f in *.html; do
  [ -e "$f" ] || continue
  sed -i '' -E 's#https://www\.westcoastarcades\.fr/wp-content/uploads/[0-9]{4}/[0-9]{2}/([^"'"'"' )>?]+)(\?[^"'"'"' )>]*)?#img/\1#g' "$f"
done
# Pages dans /blog -> ../img/fichier
if [ -d blog ]; then
  for f in blog/*.html; do
    [ -e "$f" ] || continue
    sed -i '' -E 's#https://www\.westcoastarcades\.fr/wp-content/uploads/[0-9]{4}/[0-9]{2}/([^"'"'"' )>?]+)(\?[^"'"'"' )>]*)?#../img/\1#g' "$f"
  done
fi

echo "==> Terminé. Vérifie le site, puis déploie (voir SETUP.md)."
echo "    NOTE Linux : remplacer  sed -i ''  par  sed -i  (sans les deux quotes) dans ce script."
