# 📸 Image Assets & Photography Guide

Your portfolio image folder structure and usage guide.

---

## **📁 Folder Structure Created**

```
public/images/
├── bio/              # Professional headshots & bio photos
├── photography/      # Your photography portfolio
├── design/           # Graphic design work samples
├── projects/         # Project screenshots & mockups
└── logos/            # Client logos & brand assets
```

---

## **1. Bio Photos** 📷

### **Location:** `public/images/bio/`

**Recommended files:**
- `headshot-primary.jpg` - Main professional headshot (square, min 800x800px)
- `headshot-casual.jpg` - Casual/friendly variant
- `headshot-action.jpg` - Working/in-action photo
- `about-hero.jpg` - Full-width hero image for About page (min 1920x600px)

### **Usage Example:**
```tsx
// About page header
<div className="about-hero">
  <img src="/images/bio/about-hero.jpg" alt="Jacob Darling" />
</div>

// Inline bio photo
<img 
  src="/images/bio/headshot-primary.jpg" 
  alt="Jacob Darling - Marketing Strategist"
  className="bio-photo"
/>
```

### **Best Practices:**
- Use professional, well-lit photos
- Square crop for consistency (1:1 ratio)
- Optimize file size (keep under 500KB)
- Use `.jpg` for photos, `.png` for transparency

---

## **2. Photography Portfolio** 📸

### **Location:** `public/images/photography/`

**Suggested organization:**
```
photography/
├── commercial/
│   ├── project-01.jpg
│   └── project-02.jpg
├── product/
│   ├── product-01.jpg
│   └── product-02.jpg
└── event/
    ├── event-01.jpg
    └── event-02.jpg
```

### **Create Photography Gallery Component:**

I can build a photography gallery page that showcases your work from the Lightroom album. Let me create it:

```tsx
// Usage in Photography page
import PhotoGallery from "../components/gallery/PhotoGallery";

const photos = [
  {
    src: "/images/photography/commercial/project-01.jpg",
    title: "Commercial Photography",
    category: "Commercial",
  },
  // ... more photos
];

<PhotoGallery photos={photos} />
```

---

## **3. Graphic Design Work** 🎨

### **Location:** `public/images/design/`

**Suggested organization:**
```
design/
├── branding/
│   ├── logo-graston.png
│   └── brand-guidelines.jpg
├── print/
│   ├── brochure-01.jpg
│   └── poster-01.jpg
├── digital/
│   ├── banner-ad-01.jpg
│   └── social-media-01.jpg
└── packaging/
    └── product-box-01.jpg
```

### **Usage Example:**
```tsx
// Design showcase grid
<div className="design-grid">
  {designs.map(design => (
    <div className="design-item">
      <img src={design.image} alt={design.title} />
      <h3>{design.title}</h3>
      <p>{design.description}</p>
    </div>
  ))}
</div>
```

---

## **4. Project Screenshots** 💻

### **Location:** `public/images/projects/`

**Recommended naming:**
- `clinical-compass-hero.jpg` - Main project screenshot
- `clinical-compass-detail-01.jpg` - Detail shots
- `pricing-tool-mobile.jpg` - Mobile views
- `roi-calculator-desktop.jpg` - Desktop views

### **Usage in Case Studies:**
```tsx
// Case study detail page
<img 
  src="/images/projects/clinical-compass-hero.jpg"
  alt="Clinical Compass Application Interface"
  className="project-screenshot"
/>
```

---

## **5. Client Logos & Brands** 🏢

### **Location:** `public/images/logos/`

**Format guidelines:**
- Use `.png` or `.svg` for logos
- Include transparent backgrounds
- Provide multiple sizes if needed

### **Usage Example:**
```tsx
// Client logo grid
<div className="clients-grid">
  <img src="/images/logos/graston-logo.png" alt="Graston Technique" />
  <img src="/images/logos/pike-medical.png" alt="Pike Medical" />
</div>
```

---

## **📸 Integrating Your Lightroom Album**

### **Option 1: Embed the Lightroom Gallery (Easiest)**

Create a Photography page with embedded album:

```tsx
// pages/Photography.tsx
const Photography = () => {
  return (
    <main className="photography-page">
      <h1>Photography Portfolio</h1>
      <div className="lightroom-embed">
        <iframe 
          src="https://lightroom.adobe.com/embed/shares/f5ddb4cab0ca4bcc95b17fa13ab992bd/slideshow?background_color=%232D2D2D&color=%23999999"
          frameBorder="0"
          style={{
            width: '100%',
            height: '600px',
            border: 'none'
          }}
        />
      </div>
    </main>
  );
};
```

### **Option 2: Export & Host Locally (Better Performance)**

1. **Export photos from Lightroom:**
   - Export as JPEG
   - Quality: 80-90%
   - Max dimension: 1920px
   - Sharpen for screen

2. **Organize in `/public/images/photography/`**

3. **Create custom gallery** (I can build this for you)

---

## **🎨 Adding Design Work to Portfolio**

### **Recommended Sections:**

1. **Branding Projects**
   - Logo designs
   - Brand guidelines
   - Business cards

2. **Print Collateral**
   - Brochures
   - Flyers
   - Posters

3. **Digital Assets**
   - Social media graphics
   - Email templates
   - Web banners

### **Create a Design Portfolio Page:**

```tsx
// pages/Design.tsx
const designProjects = [
  {
    id: "graston-branding",
    title: "Graston Technique Branding",
    category: "Branding",
    image: "/images/design/branding/graston-brand.jpg",
    description: "Complete brand identity redesign",
  },
  // ... more projects
];
```

---

## **📏 Image Specifications**

### **Bio Photos:**
- Format: JPEG
- Min size: 800x800px (1:1 ratio)
- File size: < 300KB
- Quality: 85%

### **Hero Images:**
- Format: JPEG
- Size: 1920x600px (16:5 ratio)
- File size: < 500KB
- Quality: 80%

### **Project Screenshots:**
- Format: PNG (for UI) or JPEG (for photos)
- Max width: 1920px
- File size: < 800KB
- Include mobile versions

### **Design Work:**
- Format: JPEG or PNG
- Size: 1200x900px (4:3 ratio) recommended
- File size: < 600KB
- High quality: 90%

---

## **🚀 Quick Start Checklist**

### **Step 1: Gather Your Photos**
- [ ] Professional headshot
- [ ] Casual/action photos
- [ ] Export best photography work
- [ ] Save design portfolio pieces
- [ ] Collect project screenshots

### **Step 2: Optimize Images**
Use tools like:
- **TinyPNG** - Compress without quality loss
- **Squoosh** - Google's image optimizer
- **ImageOptim** (Mac) - Batch compression

### **Step 3: Organize by Folder**
- [ ] Place bio photos in `/public/images/bio/`
- [ ] Add photography to `/public/images/photography/`
- [ ] Add design work to `/public/images/design/`
- [ ] Add project screenshots to `/public/images/projects/`

### **Step 4: Update Portfolio Pages**
- [ ] Add headshot to About page
- [ ] Create Photography gallery page (I can build this)
- [ ] Create Design portfolio section
- [ ] Add screenshots to case studies

---

## **🎯 Next Steps**

**Want me to create:**
1. ✅ Photography gallery page with your Lightroom album
2. ✅ Design portfolio showcase page
3. ✅ Enhanced About page with bio photos
4. ✅ Image optimization script

**Tell me which you'd like and I'll build them!**

---

## **💡 Pro Tips**

1. **Consistent Aspect Ratios:** Use same ratios across similar content
2. **WebP Format:** Consider converting to WebP for 30% smaller files
3. **Lazy Loading:** Already implemented in React for better performance
4. **Alt Text:** Always include descriptive alt text for SEO
5. **Responsive Images:** Provide multiple sizes for different screens

---

## **📝 Example File Names**

**Good:**
- `headshot-jacob-darling-2024.jpg`
- `graston-clinical-compass-hero.png`
- `branding-project-healthcare-logo.jpg`

**Bad:**
- `IMG_1234.jpg`
- `Screen Shot 2024-01-01.png`
- `untitled.jpg`

**Use descriptive names for better SEO and organization!**
