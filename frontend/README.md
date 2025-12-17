# Frontend – Instrucciones de instalación y ejecución

## Requisitos
- Node.js 18 o superior (LTS recomendado).

## Instalación
```bash
cd frontend
npm install
```

### Instalación reproducible (lockfile)
- Versiona `package-lock.json` en el repositorio para asegurar instalaciones consistentes.
- En CI o en máquinas limpias, prefiere:
```bash
npm ci
```
Esto instalará exactamente las versiones definidas en el lockfile y evitará desviaciones.

Esto instalará todas las dependencias declaradas (incluye `axios`, `react-router-dom`, `zustand`). Si alguna faltara, instálala explícitamente:
```bash
npm i axios react-router-dom zustand
```

## Desarrollo
```bash
npm run dev
```
Levanta el servidor de Vite y abre la app en el navegador.

## Build y Preview
```bash
npm run build
npm run preview
```
Genera la build de producción y la sirve localmente para verificación.

## Lint
```bash
npm run lint
```

## Configuración del API
El `baseURL` del cliente HTTP se toma de `VITE_API_URL`.

1) Copia el ejemplo y ajusta:
```bash
cp .env.example .env
```
2) Edita `VITE_API_URL` en `.env`:
```env
VITE_API_URL=http://localhost:4000
```

Si no defines `VITE_API_URL`, usará `http://localhost:4000` por defecto.

## Solución de problemas
- **CORS o errores 401**: confirma que el backend está levantado y que el token se guarda correctamente en `localStorage`.
- **No carga datos**: verifica que `baseURL` apunte al puerto correcto del backend.
- **Puerto ocupado**: si Vite o backend reportan conflicto de puertos, cambia el puerto del backend (`PORT` en `.env`) o el de Vite mediante opciones de `vite.config.js`.

## Dependencias clave
- **axios**: cliente HTTP.
- **react-router-dom**: enrutamiento de la app.
- **zustand**: estado global ligero.
