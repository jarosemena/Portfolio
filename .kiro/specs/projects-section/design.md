# Design Document - Projects Section

## Overview

La sección de proyectos es un componente React que muestra una galería visual de proyectos realizados por el desarrollador. Sigue la arquitectura establecida en el portafolio, utilizando TypeScript para type safety, CSS modules para estilos, y JSON para almacenamiento de datos. El componente se integra perfectamente con los componentes existentes (Skills, Experience) y reutiliza el componente LazyLoad para optimización de carga de imágenes.

## Architecture

### Component Structure

```
src/
├── components/
│   └── projects/
│       ├── index.ts              # Barrel export
│       ├── projects.tsx          # Main component
│       ├── projects.css          # Component styles
│       └── types.ts              # TypeScript interfaces
├── data/
│   └── projects.json             # Project data
public/
└── images/
    └── projects/                 # Project images
        ├── project1.jpg
        ├── project2.jpg
        └── ...
```

### Integration Points

- **App.tsx**: El componente Projects se importará y renderizará entre Skills y Footer
- **LazyLoad Component**: Se reutilizará para carga diferida de imágenes de proyectos
- **CSS Variables**: Se utilizarán las variables CSS globales existentes para mantener consistencia visual
- **JSON Data Loading**: Seguirá el patrón de importación directa usado en Skills y Experiences

## Components and Interfaces

### TypeScript Interfaces (types.ts)

```typescript
export interface Technology {
  name: string;
}

export interface Project {
  id: string;
  name: string;
  description: string;
  imageUrl: string;
  projectUrl?: string;
  technologies: Technology[];
  year?: string;
  featured?: boolean;
}

export interface ProjectsProps {
  projects: Project[];
}

export interface ProjectCardProps {
  project: Project;
}
```

### Main Component (projects.tsx)

**Projects Component**
- Responsabilidad: Contenedor principal que carga datos y renderiza la galería
- Props: Ninguna (carga datos internamente desde JSON)
- Estado: 
  - `imageLoadStates`: Map<string, boolean> para tracking de carga de imágenes
  - `imageErrors`: Map<string, boolean> para tracking de errores de carga
- Renderiza: Grid de ProjectCard components

**ProjectCard Component**
- Responsabilidad: Renderizar una tarjeta individual de proyecto
- Props: `ProjectCardProps`
- Estado:
  - `imageLoaded`: boolean para estado de carga de imagen
  - `imageError`: boolean para manejo de errores de imagen
- Características:
  - Lazy loading de imágenes usando el componente LazyLoad
  - Placeholder cuando la imagen falla
  - Hover effects para interactividad
  - Click handler para abrir projectUrl en nueva pestaña

### Component Hierarchy

```
Projects
├── ProjectCard (multiple)
│   ├── LazyLoad
│   │   └── img
│   ├── h3 (project name)
│   ├── p (project description)
│   └── div.technologies
│       └── span.technology (multiple)
```

## Data Models

### JSON Structure (projects.json)

```json
{
  "projects": [
    {
      "id": "1",
      "name": "E-Commerce Platform",
      "description": "Full-stack e-commerce solution with React, Node.js, and PostgreSQL",
      "imageUrl": "/images/projects/ecommerce.jpg",
      "projectUrl": "https://example.com/project",
      "technologies": [
        { "name": "React" },
        { "name": "Node.js" },
        { "name": "PostgreSQL" }
      ],
      "year": "2023",
      "featured": true
    }
  ]
}
```

### Field Descriptions

- **id**: Identificador único del proyecto (requerido)
- **name**: Nombre del proyecto (requerido)
- **description**: Descripción breve del proyecto (requerido)
- **imageUrl**: Ruta relativa a la imagen desde public/ (requerido)
- **projectUrl**: URL del proyecto en vivo o repositorio (opcional)
- **technologies**: Array de tecnologías utilizadas (requerido, puede estar vacío)
- **year**: Año de realización (opcional)
- **featured**: Indica si es un proyecto destacado (opcional)

## Correctness Properties

*A property is a characteristic or behavior that should hold true across all valid executions of a system-essentially, a formal statement about what the system should do. Properties serve as the bridge between human-readable specifications and machine-verifiable correctness guarantees.*

### Property 1: Project data loading and validation

*For any* projects JSON file, when the component loads the data, all projects with required fields (id, name, description, imageUrl) should be successfully parsed and rendered without errors.

**Validates: Requirements 3.1, 3.2**

### Property 2: Image lazy loading consistency

*For any* project with a valid imageUrl, the LazyLoad component should be used to defer image loading until the image is near the viewport, maintaining consistent behavior with other sections.

**Validates: Requirements 1.4**

### Property 3: Click interaction for projects with URLs

*For any* project card, if projectUrl is defined and non-empty, clicking the card should open the URL in a new tab; if projectUrl is undefined or empty, clicking should have no effect.

**Validates: Requirements 2.1, 2.3**

### Property 4: Image error handling

*For any* project image that fails to load, the system should display a placeholder with the first character of the project name without breaking the layout or throwing errors.

**Validates: Requirements 1.5**

### Property 5: Technology badges rendering

*For any* project with technologies array, each technology should be rendered as a styled badge; if the technologies array is empty, the technologies section should not be rendered.

**Validates: Requirements 5.1, 5.3, 5.4**

### Property 6: Responsive grid layout

*For any* viewport width, the projects grid should adapt: displaying multiple columns on desktop (3 columns for width > 1024px, 2 columns for 768px-1024px) and a single column on mobile (width < 768px).

**Validates: Requirements 1.3**

### Property 7: Hover state for clickable cards

*For any* project card with a defined projectUrl, hovering should apply visual feedback (transform, shadow, cursor change); cards without projectUrl should not show hover effects.

**Validates: Requirements 2.2, 2.4**

## Error Handling

### Image Loading Errors

- **Strategy**: Try-catch en el handler de error de imagen
- **Fallback**: Mostrar placeholder con inicial del nombre del proyecto
- **Logging**: Console.error con información del proyecto y URL de imagen
- **User Experience**: El layout se mantiene intacto, no se rompe la galería

### JSON Parsing Errors

- **Strategy**: Try-catch al importar el JSON
- **Fallback**: Array vacío de proyectos, mostrar mensaje informativo
- **Logging**: Console.error con detalles del error de parsing
- **User Experience**: La sección se renderiza vacía con mensaje "No projects available"

### Missing Required Fields

- **Strategy**: Validación en tiempo de renderizado
- **Fallback**: Filtrar proyectos inválidos antes de renderizar
- **Logging**: Console.warn para cada proyecto con campos faltantes
- **User Experience**: Solo se muestran proyectos válidos

### Invalid URLs

- **Strategy**: Validación básica de URL antes de abrir
- **Fallback**: No abrir enlace si URL es inválida
- **Logging**: Console.warn con URL inválida
- **User Experience**: Card no es clickeable si URL es inválida

## Testing Strategy

### Unit Testing

Se utilizará Jest y React Testing Library para unit tests, siguiendo el patrón establecido en el proyecto.

**Test Cases:**

1. **Component Rendering**
   - Renderiza correctamente con datos válidos
   - Renderiza mensaje cuando no hay proyectos
   - Renderiza placeholder cuando imagen falla

2. **User Interactions**
   - Click en card con URL abre nueva pestaña
   - Click en card sin URL no hace nada
   - Hover en card con URL muestra efectos visuales

3. **Data Handling**
   - Carga correctamente datos desde JSON
   - Filtra proyectos con campos faltantes
   - Maneja arrays vacíos de tecnologías

### Property-Based Testing

Se utilizará **fast-check** como librería de property-based testing para TypeScript/JavaScript. Cada property-based test debe ejecutar un mínimo de 100 iteraciones.

**Property Tests:**

1. **Property 1: Project data loading and validation**
   - Tag: `**Feature: projects-section, Property 1: Project data loading and validation**`
   - Generator: Proyectos con campos requeridos aleatorios
   - Assertion: Todos los proyectos válidos se renderizan sin errores

2. **Property 2: Image lazy loading consistency**
   - Tag: `**Feature: projects-section, Property 2: Image lazy loading consistency**`
   - Generator: Proyectos con URLs de imagen aleatorias
   - Assertion: LazyLoad component se usa para todas las imágenes

3. **Property 3: Click interaction for projects with URLs**
   - Tag: `**Feature: projects-section, Property 3: Click interaction for projects with URLs**`
   - Generator: Proyectos con y sin projectUrl
   - Assertion: Click behavior correcto según presencia de URL

4. **Property 4: Image error handling**
   - Tag: `**Feature: projects-section, Property 4: Image error handling**`
   - Generator: Proyectos con URLs de imagen inválidas
   - Assertion: Placeholder se muestra sin romper layout

5. **Property 5: Technology badges rendering**
   - Tag: `**Feature: projects-section, Property 5: Technology badges rendering**`
   - Generator: Proyectos con arrays de tecnologías de longitud variable
   - Assertion: Badges se renderizan correctamente o sección se omite

6. **Property 6: Responsive grid layout**
   - Tag: `**Feature: projects-section, Property 6: Responsive grid layout**`
   - Generator: Diferentes anchos de viewport
   - Assertion: Grid adapta número de columnas según viewport

7. **Property 7: Hover state for clickable cards**
   - Tag: `**Feature: projects-section, Property 7: Hover state for clickable cards**`
   - Generator: Proyectos con y sin projectUrl
   - Assertion: Hover effects solo en cards con URL

### Integration Testing

- Verificar integración con App.tsx
- Verificar que LazyLoad funciona correctamente con imágenes de proyectos
- Verificar que estilos CSS no entran en conflicto con otros componentes

## CSS Design Patterns

### Grid Layout

```css
.projects-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 2rem;
  padding: 2rem;
}

@media (max-width: 768px) {
  .projects-grid {
    grid-template-columns: 1fr;
    gap: 1.5rem;
  }
}
```

### Card Styling

- Seguir el patrón de `.skill-card` de la sección Skills
- Border radius consistente con otros componentes
- Box shadow para profundidad
- Transition suave para hover effects
- Cursor pointer solo cuando hay projectUrl

### Technology Badges

- Reutilizar estilos de `.technology` de la sección Experience
- Inline-flex layout para wrapping automático
- Padding y margin consistentes
- Color scheme que coincida con el tema del portafolio

### Color Scheme

- Utilizar variables CSS existentes:
  - `--primary-color`
  - `--secondary-color`
  - `--text-color`
  - `--background-color`
  - `--card-background`

## Performance Considerations

### Image Optimization

- Usar LazyLoad para carga diferida
- Recomendar imágenes optimizadas (WebP cuando sea posible)
- Tamaño recomendado: 800x600px o aspect ratio 4:3
- Compresión recomendada: 80% quality

### Rendering Optimization

- Usar React.memo para ProjectCard si es necesario
- Keys únicas basadas en project.id
- Evitar re-renders innecesarios con useCallback para handlers

### Bundle Size

- Import directo del JSON (tree-shaking friendly)
- CSS modules para evitar estilos globales innecesarios
- Reutilizar componentes existentes (LazyLoad)

## Accessibility

### Semantic HTML

- Usar `<section>` para el contenedor principal
- Usar `<article>` para cada ProjectCard
- Usar `<h2>` para el título de la sección
- Usar `<h3>` para nombres de proyectos

### ARIA Attributes

- `aria-label` en cards clickeables: "View project: {projectName}"
- `role="button"` en cards clickeables
- `aria-hidden="true"` en elementos decorativos

### Keyboard Navigation

- Cards clickeables deben ser accesibles con Tab
- Enter/Space debe activar el click en cards clickeables
- Focus visible para navegación por teclado

### Alt Text

- Imágenes deben tener alt descriptivo: "{projectName} screenshot"
- Placeholder debe tener aria-label descriptivo

## Future Enhancements

1. **Filtrado por tecnología**: Permitir filtrar proyectos por tecnología utilizada
2. **Modal con detalles**: Click en card abre modal con más información
3. **Animaciones de entrada**: Stagger animation cuando los cards aparecen
4. **Sorting options**: Ordenar por año, nombre, o featured
5. **Search functionality**: Búsqueda por nombre o descripción
6. **Lightbox para imágenes**: Ver imágenes en tamaño completo
