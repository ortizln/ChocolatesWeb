# Carga variables del .env y ejecuta la app
Get-Content .env | ForEach-Object {
    if ($_ -match '^([^=]+)=(.*)$') {
        [Environment]::SetEnvironmentVariable($matches[1], $matches[2])
    }
}
cd backend
.\mvnw spring-boot:run
