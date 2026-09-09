# Mash Edits - Professional Photography & Videography Portfolio

## Overview

This is a complete, production-ready portfolio website for Mash Edits, a professional photography and videography studio. The site features a premium dark theme, smooth animations, and a fully functional portfolio system with multiple categories and galleries.

## Features

### 🎨 Design
- **Premium Dark Theme**: Elegant dark background with gold accents
- **Responsive Design**: Perfect on desktop, tablet, and mobile devices
- **Smooth Animations**: Subtle, professional transitions and scroll effects
- **High-End Typography**: Clean, modern sans-serif fonts with proper hierarchy
- **Beautiful Spacing**: Generous padding and breathing room throughout

### 📸 Portfolio Features

#### Categories
- **Weddings**: Complete wedding stories with detailed galleries
- **Events**: Corporate, birthday, and celebration events
- **Portraits**: Individual, couple, family, and professional headshots
- **Videos**: Wedding films, event videos, music videos, commercials
- **Drone**: Aerial photography and cinematography
- **Livestream**: Virtual event broadcasting

#### Functionality
- **Category Filters**: Real-time filtering of projects by type
- **Featured Work Section**: Homepage showcase of best projects
- **Full-Screen Lightbox Gallery**: Professional image viewing experience
  - Next/Previous navigation
  - Keyboard navigation (Arrow keys, Escape)
  - Mobile swipe support
  - Image counter and titles
- **Project Modals**: Detailed project views with:
  - Hero image
  - Project metadata (location, date, couple names, etc.)
  - Multiple gallery sections
  - Wedding story sections (Getting Ready, Ceremony, Reception, etc.)
- **Video Modals**: Professional embedded video player

### 🚀 Performance
- **Lazy Loading**: Images load only when needed
- **Optimized Images**: Proper sizing and compression
- **Smooth Scrolling**: Hardware-accelerated animations
- **Mobile-First**: Fast loading on all devices

### 📱 Responsive
- Desktop (1200px+)
- Tablet (768px - 1199px)
- Mobile (320px - 767px)

## File Structure

```
mash-edits/
├── index.html           # Homepage with featured work
├── portfolio.html       # Full portfolio page
├── styles.css           # Complete styling (single file)
├── portfolio-data.js    # Project data structure
├── script.js            # Shared functionality
├── portfolio.js         # Portfolio page specific JS
└── README.md            # This file
```

## How to Use

### Adding/Editing Projects

All portfolio content is managed in `portfolio-data.js`. To add or edit projects:

```javascript
// Add a new project to the portfolioData array
const portfolioData = [
    {
        id: 'unique-id',                              // Unique identifier
        title: 'Project Title',                       // Project name
        category: 'weddings',                         // Category
        type: 'wedding',                              // Type (wedding, event, portrait, video, drone, livestream)
        location: 'Location, City',                   // Location
        date: 'Date',                                 // Date
        coverImage: 'image-url.jpg',                  // Cover image URL
        description: 'Short description',             // Short description
        coupleNames: 'Names',                         // (Weddings only)
        weddingType: 'Wedding Style',                 // (Weddings only)
        introduction: 'Detailed introduction',        // Long description
        galleryImages: [
            { url: 'image-url.jpg', title: 'Image Title' }
        ],
        galleryStories: [
            {
                section: 'Section Name',
                images: [
                    { url: 'image-url.jpg', title: 'Image Title' }
                ]
            }
        ],
        videoUrl: 'https://www.youtube.com/embed/...' // (Videos only)
    }
];

// Select 6 projects for Featured Work on homepage
const featuredProjects = [
    portfolioData[0],
    portfolioData[1],
    // ... select your 6 best
];
```

### Customizing Colors

Edit the CSS variables in `styles.css`:

```css
:root {
    --primary-dark: #0a0e27;
    --secondary-dark: #141627;
    --tertiary-dark: #1a1f3a;
    --accent-gold: #d4af37;
    --accent-light: #f5f5f5;
    --text-primary: #ffffff;
    --text-secondary: #b8b8b8;
}
```

### Updating Navigation Links

Edit the navigation in both `index.html` and `portfolio.html`:

```html
<li><a href="index.html#contact" class="nav-link">Contact</a></li>
```

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

## Performance Tips

1. **Optimize Images**: Use WebP format with JPG fallback
2. **Image Sizes**:
   - Cover images: 800x600px (web), 1200x900px (display)
   - Gallery images: 1200x800px (display), 2400x1600px (lightbox)
3. **Lazy Loading**: Automatic for images with `loading="lazy"`
4. **Caching**: Set appropriate cache headers on your server

## SEO

- Semantic HTML structure
- Descriptive meta tags
- Image alt text
- Proper heading hierarchy
- Schema.org structured data (can be added)

## Customization Guide

### Changing Accent Color

1. Update CSS variables in `styles.css`
2. Find and replace `#d4af37` with your color

### Adding Social Media Links

```html
<div class="social-links">
    <a href="https://instagram.com/yourusername" aria-label="Instagram">Instagram</a>
    <a href="https://youtube.com/@yourchannel" aria-label="YouTube">YouTube</a>
    <a href="https://facebook.com/yourpage" aria-label="Facebook">Facebook</a>
</div>
```

### Adding Contact Form

Replace the contact section with your form service (Formspree, Netlify Forms, etc.):

```html
<section id="contact" class="contact">
    <div class="container">
        <form action="https://formspree.io/f/YOUR_ID" method="POST">
            <input type="email" name="email" placeholder="Your Email" required>
            <textarea name="message" placeholder="Your Message" required></textarea>
            <button type="submit">Send Message</button>
        </form>
    </div>
</section>
```

## Testing Checklist

- ✅ All category filters work
- ✅ Project cards display correctly
- ✅ VIEW GALLERY buttons open modals
- ✅ Full-screen lightbox displays images
- ✅ Next/Previous navigation works
- ✅ Keyboard navigation (arrows, escape)
- ✅ Mobile swipe support
- ✅ Videos play in modal
- ✅ Featured Work section on homepage
- ✅ Navigation links work
- ✅ Mobile responsive layout
- ✅ All animations smooth

## Deployment

### On Bolt.host
1. Upload all files to your public directory
2. Ensure `.html`, `.css`, and `.js` files are in the root
3. Set `index.html` as the default page
4. Test on multiple devices

### On Other Hosts
1. Verify `.js` files are being served correctly
2. Check MIME types for stylesheets
3. Test cross-origin issues if using external images

## Troubleshooting

**Images not loading**
- Check image URLs are correct and accessible
- Verify CORS headers if using external domain

**Filters not working**
- Check browser console for errors
- Verify `portfolio-data.js` is loaded

**Modals not opening**
- Ensure `portfolio.js` is loaded
- Check for JavaScript errors in console

**Mobile issues**
- Test viewport meta tag
- Check media queries in `styles.css`

## License

This portfolio website is designed for Mash Edits. All design and code are proprietary.

## Support

For technical issues or customizations, contact your web developer.

---

**Mash Edits** - Professional Photography & Videography
Created with attention to detail and premium design principles.
