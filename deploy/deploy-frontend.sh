#!/bin/bash
# ============================================================
# deploy-frontend.sh
# Construye los frontends Angular y los copia al webroot
# Sirve bajo subpath /chocolateswebb
# Dominio: http://192.168.100.215/chocolateswebb
# ============================================================
set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "$0")" && pwd)"
PROJECT_ROOT="$(dirname "$SCRIPT_DIR")"
PUBLIC_DIR="$PROJECT_ROOT/frontend/public-site"
ADMIN_DIR="$PROJECT_ROOT/frontend/admin-panel"

# Directorio donde nginx servira los archivos
# Ajusta segun tu instalacion de nginx
NGINX_WEBROOT="${NGINX_WEBROOT:-/usr/share/nginx/html}"
DEST_PUBLIC="$NGINX_WEBROOT/chocolateswebb"
DEST_ADMIN="$NGINX_WEBROOT/chocolateswebb/admin"

echo "=========================================="
echo "  Chocolates Web - Deploy Frontend"
echo "=========================================="
echo "[*] Webroot: $NGINX_WEBROOT"
echo "[*] Public:  $DEST_PUBLIC"
echo "[*] Admin:   $DEST_ADMIN"
echo ""

# 1. Instalar dependencias si no existen
if [ ! -d "$PUBLIC_DIR/node_modules" ]; then
  echo "[*] Instalando dependencias del frontend publico..."
  cd "$PUBLIC_DIR"
  npm install
fi

if [ ! -d "$ADMIN_DIR/node_modules" ]; then
  echo "[*] Instalando dependencias del panel admin..."
  cd "$ADMIN_DIR"
  npm install
fi

# 2. Construir frontend publico con base-href para subpath
echo "[*] Construyendo frontend publico (base-href=/chocolateswebb/)..."
cd "$PUBLIC_DIR"
npx ng build --configuration=production --base-href=/chocolateswebb/
echo "[+] Build publico completado"

# 3. Construir panel admin con base-href para subpath
echo "[*] Construyendo panel admin (base-href=/chocolateswebb/admin/)..."
cd "$ADMIN_DIR"
npx ng build --configuration=production --base-href=/chocolateswebb/admin/
echo "[+] Build admin completado"

# 4. Copiar archivos al webroot de nginx
echo "[*] Copiando archivos a $NGINX_WEBROOT ..."

sudo mkdir -p "$DEST_PUBLIC"
sudo mkdir -p "$DEST_ADMIN"

if [ -d "$PUBLIC_DIR/dist/browser" ]; then
  sudo cp -r "$PUBLIC_DIR/dist/browser/"* "$DEST_PUBLIC/"
elif [ -d "$PUBLIC_DIR/dist" ]; then
  sudo cp -r "$PUBLIC_DIR/dist/"* "$DEST_PUBLIC/"
fi

if [ -d "$ADMIN_DIR/dist/browser" ]; then
  sudo cp -r "$ADMIN_DIR/dist/browser/"* "$DEST_ADMIN/"
elif [ -d "$ADMIN_DIR/dist" ]; then
  sudo cp -r "$ADMIN_DIR/dist/"* "$DEST_ADMIN/"
fi

echo "[+] Archivos copiados correctamente"
echo ""
echo "=========================================="
echo "  Frontend desplegado correctamente"
echo "  Publico: http://192.168.100.215/chocolateswebb/"
echo "  Admin:   http://192.168.100.215/chocolateswebb/admin/"
echo "=========================================="
