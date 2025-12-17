# Backend – Instrucciones de instalación y ejecución

## Requisitos
- Node.js 18 o superior (LTS recomendado).
- SQL Server (local o remoto) accesible desde este servidor.
- Credenciales de base de datos y permisos de conexión.

## Instalación
```bash
cd backend
npm install
```

### Instalación reproducible (lockfile)
- Asegúrate de versionar `package-lock.json` en el repositorio.
- Para instalaciones determinísticas en CI o entornos limpios, usa:
```bash
npm ci
```
`npm ci` instala exactamente las versiones del lockfile, es más rápido y falla si el `package.json` y el lockfile no coinciden.

## Configuración
Crear un archivo `.env` en `backend` con las variables necesarias:
```env
PORT=4000
DB_USER=tu_usuario_sql
DB_PASSWORD=tu_password_sql
DB_SERVER=localhost
DB_NAME=tu_base_de_datos
```

- `PORT`: puerto en el que correrá el backend. El frontend espera `4000` por defecto.
- `DB_SERVER`: para instancias locales puede ser `localhost`, `127.0.0.1` o `MI_PC\\SQLEXPRESS` según tu instalación.
- `DB_NAME`: nombre de la base de datos en SQL Server.

> Nota: La conexión está configurada con `trustServerCertificate: true` y `encrypt: false` para desarrollo local. En entornos productivos, habilita `encrypt: true` y certificados válidos.

## Ejecutar en desarrollo
```bash
npm run dev
```
Inicia con `nodemon` y recarga automática.

> `dotenv` ya está incluido en el proyecto y cargado al inicio, por lo que basta con crear el archivo `.env` (puedes usar [backend/.env.example](backend/.env.example) como base).

## Ejecutar en producción (simple)
```bash
npm start
```

## Endpoints principales
- Autenticación: `/auth`
- Tareas: `/tasks`

## Solución de problemas
- **Error de conexión a BD**: verifica que SQL Server esté iniciado, TCP/IP habilitado, credenciales correctas y que el `DB_SERVER` sea alcanzable.
- **CORS o 404 desde el frontend**: confirma que el backend corre en `http://localhost:4000` (o ajusta el frontend para el puerto configurado).
- **Permisos**: asegúrate de que el usuario de SQL tenga permisos de lectura/escritura sobre `DB_NAME`.
