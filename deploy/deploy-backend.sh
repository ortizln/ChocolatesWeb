#!/bin/bash
# ============================================================
# deploy-backend.sh
# Despliega el backend (Spring Boot) en Docker
# La BD es NATIVA (NO en Docker)
# ============================================================
set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "$0")" && pwd)"
PROJECT_ROOT="$(dirname "$SCRIPT_DIR")"
BACKEND_DIR="$PROJECT_ROOT/backend"
ENV_FILE="${1:-$SCRIPT_DIR/.env.production}"

echo "=========================================="
echo "  Chocolates Web - Deploy Backend"
echo "=========================================="

# 1. Verificar entorno
if [ ! -f "$ENV_FILE" ]; then
  echo "[!] Archivo .env no encontrado: $ENV_FILE"
  echo "    Copia desde .env.production y ajusta:"
  echo "    cp $SCRIPT_DIR/.env.production $ENV_FILE"
  exit 1
fi
echo "[+] Usando entorno: $ENV_FILE"

# 2. Verificar conexion a BD (opcional)
DB_HOST=$(grep -oP '^DB_HOST=\K.*' "$ENV_FILE" || echo "192.168.100.215")
DB_PORT=$(grep -oP '^DB_PORT=\K.*' "$ENV_FILE" || echo "5432")
echo "[*] Verificando base de datos en $DB_HOST:$DB_PORT ..."
if command -v pg_isready &>/dev/null; then
  if pg_isready -h "$DB_HOST" -p "$DB_PORT" -q; then
    echo "[+] Base de datos disponible"
  else
    echo "[!] Advertencia: No se pudo conectar a la BD en $DB_HOST:$DB_PORT"
  fi
else
  echo "[*] pg_isready no disponible, se asume que la BD esta accesible"
fi

# 3. Crear directorio de uploads
mkdir -p "$BACKEND_DIR/uploads"

# 4. Construir y levantar contenedor
echo "[*] Construyendo imagen Docker..."
cd "$PROJECT_ROOT"
docker compose -f "$SCRIPT_DIR/docker-compose.backend.yml" --env-file "$ENV_FILE" build

echo "[*] Deteniendo contenedor anterior (si existe)..."
docker compose -f "$SCRIPT_DIR/docker-compose.backend.yml" --env-file "$ENV_FILE" down --remove-orphans 2>/dev/null || true

echo "[*] Levantando contenedor..."
docker compose -f "$SCRIPT_DIR/docker-compose.backend.yml" --env-file "$ENV_FILE" up -d

echo "[+] Backend desplegado correctamente"
echo "    Logs: docker compose -f $SCRIPT_DIR/docker-compose.backend.yml logs -f spring-app"
echo "    API:  http://192.168.100.215:8080/api/v1"
