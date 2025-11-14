# Portfolio de Camila Rueda

Portfolio profesional de UX/UI Designer y Senior Frontend Developer, con animaciones y transiciones modernas.

## 🎨 Características

- ✨ **Diseño minimalista moderno** con paleta de colores personalizada
- 🎭 **Animaciones 3D** y efectos interactivos con Framer Motion
- 📱 **Totalmente responsive** - optimizado para móvil, tablet y desktop
- 🎯 **Sistema de diseño semántico** siguiendo metodología profesional
- ⚡ **Rendimiento optimizado** con Next.js 14 y Turbopack
- 🎨 **Tokens semánticos HSL** para fácil personalización de colores
- ♿ **Accesible** con soporte para prefers-reduced-motion

## 🎨 Paleta de Colores

- **Primary (Violeta):** `#D797EE`
- **Accent (Lima):** `#EAFE61`
- **Secondary (Azul):** `#9BC3FF`
- **Soft Background:** `#F5E8FC`
- **Base:** Blanco predominante con colores en detalles

## 🚀 Tecnologías Utilizadas

- **Framework:** Next.js 14 (App Router)
- **Lenguaje:** TypeScript
- **Estilos:** Tailwind CSS v4
- **Animaciones:** Framer Motion
- **Componentes:** Class Variance Authority (CVA)
- **Iconos:** Lucide React

## 📁 Estructura del Proyecto

```
portfolio/
├── app/
│   ├── layout.tsx          # Layout principal con metadata
│   ├── page.tsx            # Página principal
│   └── globals.css         # Sistema de tokens semánticos
├── components/
│   ├── ui/                 # Componentes UI reutilizables
│   │   ├── button.tsx
│   │   ├── card.tsx
│   │   ├── navbar.tsx
│   │   └── footer.tsx
│   └── sections/           # Secciones del portfolio
│       ├── hero.tsx
│       ├── about.tsx
│       ├── projects.tsx
│       ├── skills.tsx
│       └── contact.tsx
├── lib/
│   └── utils.ts            # Utilidades (cn para clases)
└── public/
    └── projects/           # Imágenes de proyectos
```

## 🎬 Secciones

1. **Hero** - Introducción impactante con efectos 3D y parallax
2. **About** - Sobre mí con características destacadas
3. **Projects** - 4 proyectos destacados:
   - Legere
   - Te-Visito
   - Clon de Airbnb
   - Pausa Activa
4. **Skills** - Habilidades técnicas con barras animadas
5. **Contact** - Formulario de contacto con validaciones

## 🛠️ Instalación y Uso

### Desarrollo

```bash
# Instalar dependencias
npm install

# Iniciar servidor de desarrollo
npm run dev
```

Abre [http://localhost:3000](http://localhost:3000) en tu navegador.

### Build para Producción

```bash
# Crear build optimizado
npm run build

# Iniciar en modo producción
npm start
```

## ✏️ Personalización

### Actualizar Información Personal

1. **Hero Section** (`components/sections/hero.tsx`):
   - Nombre y título
   - Bio/descripción
   - Links de redes sociales

2. **Proyectos** (`components/sections/projects.tsx`):
   - Reemplazar placeholders con imágenes reales en `public/projects/`
   - Actualizar URLs de Behance y GitHub
   - Modificar descripciones y tags

3. **Contacto** (`components/sections/contact.tsx`):
   - Email, teléfono, ubicación
   - Integrar con servicio de email (ej: EmailJS, SendGrid)

4. **Footer** (`components/ui/footer.tsx`):
   - Links de redes sociales

### Modificar Colores

Todos los colores están definidos en `app/globals.css` usando tokens semánticos HSL:

```css
:root {
  --primary: 285 72% 76%;    /* #D797EE */
  --accent: 68 92% 66%;      /* #EAFE61 */
  --secondary: 214 100% 81%; /* #9BC3FF */
  --soft-bg: 285 70% 95%;    /* #F5E8FC */
}
```

## 📝 Tareas Pendientes

- [ ] Agregar imágenes reales de proyectos
- [ ] Completar información personal (email, teléfono, links)
- [ ] Conectar formulario de contacto con servicio de email
- [ ] Agregar más proyectos desde Behance
- [ ] Optimizar imágenes para web
- [ ] Configurar analytics (Google Analytics, Vercel Analytics)
- [ ] Agregar favicon personalizado
- [ ] Configurar dominio personalizado

## 🎨 Sistema de Diseño

Este portfolio sigue la **Universal UI/UX Design Methodology** que incluye:

- Arquitectura de tokens semánticos (HSL)
- Sistema de variantes para componentes
- Spacing consistente (8px base unit)
- Typography hierarchy responsive
- Animaciones optimizadas para rendimiento
- Soporte para prefers-reduced-motion

## 📄 Licencia

Este proyecto es personal y está diseñado específicamente para Camila Rueda.

---

**Diseñado y Desarrollado con ❤️ por Camila Rueda**
