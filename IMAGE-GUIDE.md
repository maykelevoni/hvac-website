# Image Guide - Mafair HVAC Website

This document describes all the images used in the Mafair HVAC website and how to replace them with your own photos.

## Current Images (Unsplash)

The website currently uses professional stock photos from Unsplash. All images are free to use with the Unsplash license.

### Hero Section
**Location**: [Home.jsx](src/pages/Home.jsx) Line 6
**CSS**: [index.css](src/styles/index.css) Line 125
**Current Image**: HVAC technician working on outdoor unit
**URL**: `https://images.unsplash.com/photo-1621905251189-08b45d6a269e`
**Size**: 1600x900 (16:9 aspect ratio)
**Purpose**: Full-width background for hero section with overlay

---

### Service Cards

#### 1. Central Air Conditioning
**Location**: [Home.jsx](src/pages/Home.jsx) Line 33
**Current Image**: Modern air conditioning unit
**URL**: `https://images.unsplash.com/photo-1631545806609-7e7ee83c8b1f`
**Size**: 400x300 (4:3 aspect ratio)

#### 2. Mini Split Systems
**Location**: [Home.jsx](src/pages/Home.jsx) Line 43
**Current Image**: Mini split AC unit on wall
**URL**: `https://images.unsplash.com/photo-1635947430863-6b5685b76c9d`
**Size**: 400x300 (4:3 aspect ratio)

#### 3. Slim Ductless
**Location**: [Home.jsx](src/pages/Home.jsx) Line 53
**Current Image**: Ductless HVAC installation
**URL**: `https://images.unsplash.com/photo-1621905251918-48416bd8575a`
**Size**: 400x300 (4:3 aspect ratio)

#### 4. Rooftop Units
**Location**: [Home.jsx](src/pages/Home.jsx) Line 63
**Current Image**: Commercial rooftop HVAC unit
**URL**: `https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122`
**Size**: 400x300 (4:3 aspect ratio)

#### 5. Air Handlers
**Location**: [Home.jsx](src/pages/Home.jsx) Line 73
**Current Image**: Industrial air handler equipment
**URL**: `https://images.unsplash.com/photo-1581094794329-c8112a89af12`
**Size**: 400x300 (4:3 aspect ratio)

#### 6. Repair & Maintenance
**Location**: [Home.jsx](src/pages/Home.jsx) Line 83
**Current Image**: Technician performing maintenance
**URL**: `https://images.unsplash.com/photo-1621905252507-b35492cc74b4`
**Size**: 400x300 (4:3 aspect ratio)

---

### About Section
**Location**: [Home.jsx](src/pages/Home.jsx) Line 99
**Current Image**: HVAC professional at work with tools
**URL**: `https://images.unsplash.com/photo-1581578731548-c64695cc6952`
**Size**: 600x400 (3:2 aspect ratio)
**Purpose**: Shows professionalism and expertise

---

## How to Replace Images

### Option 1: Replace with Local Images

1. Add your images to the `public/images/` directory
2. Update the image URLs in the code:

```jsx
// Before
<img src="https://images.unsplash.com/photo-..." alt="..." />

// After
<img src="/images/your-image.jpg" alt="..." />
```

### Option 2: Use Different Unsplash Images

Visit [Unsplash.com](https://unsplash.com) and search for:
- "HVAC installation"
- "air conditioning"
- "heating system"
- "HVAC technician"
- "mini split"
- "commercial HVAC"

Copy the image URL and add `?w=400&h=300&fit=crop` for service cards or `?w=1600&h=900&fit=crop` for hero.

### Option 3: Use Your Own Company Photos

**Recommended for Best Results!**

Take or use existing photos of:
1. Your team installing HVAC systems
2. Completed installations (before/after)
3. Your technicians at work
4. The types of equipment you install
5. Happy customers (with permission)
6. Your service vehicles

**Image Requirements:**
- **Hero**: Minimum 1920x1080, landscape orientation
- **Service Cards**: Minimum 800x600, 4:3 ratio preferred
- **About Image**: Minimum 1200x800, 3:2 ratio preferred
- **Format**: JPG or PNG
- **Size**: Optimize images to under 500KB each for faster loading

---

## Image Optimization Tips

1. **Compress images** before uploading
   - Use tools like TinyPNG, Squoosh, or ImageOptim
   - Target: 100-300KB per image

2. **Use appropriate sizes**
   - Don't upload 5MB original photos
   - Resize to the maximum display size

3. **Add descriptive alt text**
   - Helps with SEO
   - Improves accessibility
   - Example: `alt="Mafair HVAC technician installing mini split system in New Jersey home"`

4. **Keep aspect ratios consistent**
   - Service cards look best at 4:3 ratio
   - Hero images should be 16:9 for widescreen

---

## Using Your Own Image CDN

If you have many images, consider using:
- **Cloudinary** (free tier available)
- **ImgIX**
- **AWS S3 + CloudFront**

These services provide:
- Automatic optimization
- Responsive image sizes
- Faster loading times
- Image transformations on-the-fly

---

## Need Help?

- **Finding images**: [Unsplash](https://unsplash.com), [Pexels](https://pexels.com)
- **Compressing**: [TinyPNG](https://tinypng.com), [Squoosh](https://squoosh.app)
- **Editing**: [Photopea](https://photopea.com) (free online Photoshop alternative)

---

## Current Image Credits

All images currently from [Unsplash](https://unsplash.com) - Free to use under the [Unsplash License](https://unsplash.com/license).
