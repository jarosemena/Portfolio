# Notas de Migración - Reorganización de Archivos

## Cambios Realizados

### 1. Estructura de Carpetas
- ✅ Creada carpeta `src/data/` para centralizar todos los JSON de datos
- ✅ Creada carpeta `src/assets/icons/` para almacenar iconos de skills

### 2. Archivos Movidos
- `src/components/aboutme/aboutme.json` → `src/data/aboutme.json`
- `src/components/experiences/experience.json` → `src/data/experiences.json`
- `src/components/skills/skills.json` → `src/data/skills.json`

### 3. Imports Actualizados
- ✅ `src/components/skills/skills.tsx`
- ✅ `src/components/aboutme/aboutme.tsx`
- ✅ `src/components/experiences/getexperienceData.ts`

### 4. Configuración de Tests
- ✅ Actualizado `jest.config.ts` para permitir imports de JSON correctamente
- ✅ Removido el mapeo `'\\.json$': 'identity-obj-proxy'` que causaba conflictos

## Estado de Tests

### Tests Existentes
Los siguientes tests NO requieren cambios:
- ✅ `JsonPortfolioRepository.test.ts` - Usa `public/data/portfolio.json` (no afectado)
- ✅ No existen tests específicos para los componentes `skills`, `experiences`, o `aboutme`

### Verificación Recomendada
Ejecutar los tests con:
```bash
npm run test
```

## Archivos que NO se Movieron
- `public/data/portfolio.json` - Usado por `JsonPortfolioRepository`, mantiene su ubicación original

## Próximos Pasos

### 1. Agregar Iconos
Colocar los siguientes archivos SVG en `src/assets/icons/`:
- dotnet.svg
- csharp.svg
- sqlserver.svg
- oracle.svg
- azure.svg
- kubernetes.svg
- docker.svg
- python.svg
- react.svg
- aspnet.svg
- microservices.svg
- cicd.svg
- git.svg
- xamarin.svg
- scrum.svg
- pm.svg
- api.svg

### 2. Verificar Funcionamiento
```bash
npm run dev
```
Verificar que:
- La sección "About Me" se muestre correctamente
- La sección "Experience" se muestre correctamente
- La sección "Skills" se muestre correctamente (una vez agregados los iconos)

## Notas Técnicas
- Los componentes ahora importan desde `../../data/[archivo].json`
- Los iconos se referencian desde `/src/assets/icons/[nombre].svg`
- La configuración de Jest ahora permite imports nativos de JSON
