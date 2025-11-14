# 📋 Próximos Pasos para Personalizar tu Portfolio

Camila, tu portfolio base está listo y corriendo en **http://localhost:3000**. Aquí está la guía completa para personalizarlo con tu información.

## 🎯 Tareas Prioritarias

### 1. Actualizar Información Personal

#### Hero Section (`components/sections/hero.tsx`)

Busca y reemplaza:
```tsx
// Línea ~82: Actualiza tu título profesional
<span className="block gradient-text mt-2">
  UX/UI Designer  // Cambia esto a tu título preferido
</span>

// Línea ~89-91: Actualiza tu bio
<p>
  Senior Frontend Developer crafting beautiful, user-centered digital
  experiences with pixel-perfect precision and seamless interactions.
</p>

// Línea ~123-126: Actualiza tus links de redes sociales
{[
  { icon: Github, href: "TU_LINK_GITHUB", label: "GitHub" },
  { icon: Linkedin, href: "TU_LINK_LINKEDIN", label: "LinkedIn" },
  { icon: Behance, href: "TU_LINK_BEHANCE", label: "Behance" },
  { icon: Mail, href: "#contact", label: "Email" },
]}
```

#### About Section (`components/sections/about.tsx`)

Busca y reemplaza (línea ~86-91):
```tsx
<p className="text-lg md:text-xl text-[hsl(var(--muted-foreground))] max-w-3xl mx-auto leading-relaxed">
  // Escribe tu descripción personal aquí
  I'm a passionate UX/UI Designer and Senior Frontend Developer...
</p>
```

#### Contact Section (`components/sections/contact.tsx`)

Busca la variable `contactInfo` (línea ~83-95):
```tsx
const contactInfo = [
  {
    icon: Mail,
    label: "Email",
    value: "TU_EMAIL@example.com",  // ⬅️ ACTUALIZAR
    href: "mailto:TU_EMAIL@example.com",  // ⬅️ ACTUALIZAR
  },
  {
    icon: Phone,
    label: "Phone",
    value: "TU_TELEFONO",  // ⬅️ ACTUALIZAR
    href: "tel:TU_TELEFONO",  // ⬅️ ACTUALIZAR
  },
  {
    icon: MapPin,
    label: "Location",
    value: "Tu Ciudad, País",  // ⬅️ ACTUALIZAR
    href: null,
  },
];
```

#### Footer (`components/ui/footer.tsx`)

Actualiza los links de redes sociales (línea ~6-11):
```tsx
const socialLinks = [
  { icon: Github, href: "TU_LINK_GITHUB", label: "GitHub" },
  { icon: Linkedin, href: "TU_LINK_LINKEDIN", label: "LinkedIn" },
  { icon: Behance, href: "TU_LINK_BEHANCE", label: "Behance" },
  { icon: Mail, href: "#contact", label: "Email" },
];
```

### 2. Agregar Imágenes de Proyectos

#### Paso 1: Preparar las imágenes

1. Exporta las imágenes de tus proyectos desde Behance
2. Optimiza las imágenes (recomendado: 1200x800px, formato WebP o JPEG)
3. Nombra las imágenes:
   - `legere.jpg` o `legere.webp`
   - `te-visito.jpg` o `te-visito.webp`
   - `airbnb-clone.jpg` o `airbnb-clone.webp`
   - `pausa-activa.jpg` o `pausa-activa.webp`

#### Paso 2: Colocar las imágenes

Guarda las imágenes en: `public/projects/`

#### Paso 3: Descomentar el código de imágenes

En `components/sections/projects.tsx`, busca el comentario (alrededor de línea 87-93):

```tsx
{/* Uncomment when you have real images: */}
{/* <Image
  src={project.image}
  alt={project.title}
  fill
  className="object-cover"
/> */}
```

Elimina los comentarios para activar las imágenes:

```tsx
<Image
  src={project.image}
  alt={project.title}
  fill
  className="object-cover"
/>
```

### 3. Actualizar Links de Proyectos

En `components/sections/projects.tsx`, busca el array `projects` (línea ~13-54) y actualiza:

```tsx
const projects = [
  {
    id: 1,
    title: "Legere",
    description: "TU_DESCRIPCION_DEL_PROYECTO", // ⬅️ ACTUALIZAR
    tags: ["UX/UI Design", "React", "TypeScript", "Tailwind CSS"],
    image: "/projects/legere.jpg",
    gradient: "from-[hsl(var(--primary))] to-[hsl(var(--secondary))]",
    behanceUrl: "TU_LINK_BEHANCE_LEGERE", // ⬅️ ACTUALIZAR
    githubUrl: "TU_LINK_GITHUB_LEGERE", // ⬅️ ACTUALIZAR (o "#" si no aplica)
  },
  // Repite para Te-Visito, Airbnb Clone, y Pausa Activa
];
```

También actualiza el link de "View All Projects" (línea ~177):
```tsx
<Button
  variant="outline"
  size="lg"
  onClick={() =>
    window.open("TU_PERFIL_BEHANCE_COMPLETO", "_blank") // ⬅️ ACTUALIZAR
  }
>
```

### 4. Personalizar Skills

En `components/sections/skills.tsx`, actualiza las habilidades y niveles (línea ~9-43):

```tsx
const skillCategories = [
  {
    title: "Design Tools",
    skills: [
      { name: "Figma", level: 95 },  // ⬅️ Ajusta los niveles según tu experiencia
      { name: "Adobe XD", level: 90 },
      // Agrega o quita herramientas según uses
    ],
    color: "hsl(var(--primary))",
  },
  // ... más categorías
];
```

## 🚀 Conectar Formulario de Contacto

Actualmente el formulario simula el envío. Para hacerlo funcional:

### Opción 1: EmailJS (Recomendado - Gratis)

1. Crea cuenta en [EmailJS](https://www.emailjs.com/)
2. Instala: `npm install @emailjs/browser`
3. En `components/sections/contact.tsx`, reemplaza el `handleSubmit` con:

```tsx
import emailjs from '@emailjs/browser';

const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();
  if (!validateForm()) return;

  setIsSubmitting(true);

  try {
    await emailjs.send(
      'TU_SERVICE_ID',
      'TU_TEMPLATE_ID',
      {
        from_name: formState.name,
        from_email: formState.email,
        subject: formState.subject,
        message: formState.message,
      },
      'TU_PUBLIC_KEY'
    );
    setSubmitSuccess(true);
    setFormState({ name: "", email: "", subject: "", message: "" });
  } catch (error) {
    console.error('Error:', error);
    alert('Error al enviar el mensaje');
  } finally {
    setIsSubmitting(false);
  }
};
```

### Opción 2: Vercel Serverless Function

1. Crea `api/contact.ts` en la carpeta `app`
2. Usa Nodemailer o SendGrid

## 🎨 Personalización Adicional

### Cambiar Colores

Si quieres ajustar los colores, edita `app/globals.css`:

```css
:root {
  /* Tus colores actuales */
  --primary: 285 72% 76%;     /* #D797EE - Violeta */
  --accent: 68 92% 66%;       /* #EAFE61 - Lima */
  --secondary: 214 100% 81%;  /* #9BC3FF - Azul */
  --soft-bg: 285 70% 95%;     /* #F5E8FC - Lila claro */
}
```

Para cambiar un color:
1. Convierte tu nuevo color HEX a HSL en [esta herramienta](https://www.htmlcolors.com/hex-to-hsl)
2. Reemplaza los valores en formato: `H S% L%`

### Agregar Más Proyectos

En `components/sections/projects.tsx`, agrega más objetos al array `projects`:

```tsx
{
  id: 5,
  title: "Nuevo Proyecto",
  description: "Descripción del proyecto...",
  tags: ["Tag1", "Tag2"],
  image: "/projects/nuevo-proyecto.jpg",
  gradient: "from-[hsl(var(--primary))] to-[hsl(var(--accent))]",
  behanceUrl: "link",
  githubUrl: "link",
}
```

## 📱 Deploy (Producción)

### Vercel (Recomendado - Gratis)

1. Instala Vercel CLI: `npm i -g vercel`
2. Ejecuta: `vercel`
3. Sigue las instrucciones
4. Tu portfolio estará en: `https://tu-nombre.vercel.app`

### Netlify

1. Crea cuenta en [Netlify](https://www.netlify.com/)
2. Conecta tu repositorio Git
3. Deploy automático

## ✅ Checklist Final

Antes de deployar, verifica:

- [ ] Información personal actualizada (nombre, título, bio)
- [ ] Links de redes sociales funcionando
- [ ] Imágenes de proyectos agregadas
- [ ] Descripciones de proyectos actualizadas
- [ ] Links de Behance/GitHub de proyectos
- [ ] Email de contacto actualizado
- [ ] Formulario de contacto funcional
- [ ] Skills personalizadas
- [ ] Metadata SEO actualizada en `app/layout.tsx`
- [ ] README.md personalizado
- [ ] Favicon agregado (opcional)

## 🆘 Soporte

Si necesitas ayuda con alguno de estos pasos, revisa:
- **README-PORTFOLIO.md** - Documentación técnica completa
- **design.md** - Metodología del sistema de diseño
- Busca "⬅️ ACTUALIZAR" en los archivos para encontrar todos los puntos a personalizar

---

**¡Tu portfolio está listo para brillar! 🌟**
