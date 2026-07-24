# Morphix AI

Morphix AI is an AI-powered image optimization web application designed to make professional image editing simple, fast, and accessible. It provides a clean and intuitive interface that allows users to enhance, transform, and optimize images without requiring advanced editing skills.

## Features

- AI Image Enhancement
- Background Removal
- Image Compression
- Smart Resizing & Cropping
- Passport Photo Generation
- AI Profile Picture Generator
- Instagram Post & Story Formats
- LinkedIn Banner Creator
- YouTube Thumbnail Creator
- Prompt-Based AI Image Transformations
- Before & After Comparison Dashboard
- One-Click Download

Morphix AI aims to simplify AI-powered image editing by combining multiple powerful tools into a single, user-friendly platform, making it ideal for content creators, professionals, students, and everyday users.

---

## 🚀 Phase 1: Core System Architecture & MVP Development

### 1. Technical Infrastructure & Setup
* **Frontend Setup**: Build a clean, responsive web application framework (e.g., React / Next.js) with light/dark mode support and a drag-and-drop file upload interface.
* **Backend Pipeline**: Establish API routes to connect the user interface to AI processing models and cloud storage (e.g., AWS S3 or Cloudflare R2) for temporary asset caching.
* **Image Processing Engine**: Integrate core image manipulation libraries (e.g., Sharp, Canvas API, or OpenCV) for fast local operations (cropping, basic resizing, format conversions).

### 2. Core Feature Implementation
In Phase 1, the focus is on the most essential and frequently used features:
* **AI Image Enhancement**: Integrate baseline AI upscale and sharpening models to restore quality and reduce noise.
* **Background Removal**: Implement automated foreground isolation for crisp subject extraction in one click.
* **Image Compression**: Lossless and lossy compression engine with adjustable quality sliders and format outputs (PNG, JPEG, WebP).
* **Smart Resizing & Cropping**: Preset aspect ratio tools along with basic smart subject-centering.
* **Before & After Comparison Dashboard**: Interactive slider preview allowing users to inspect edits side-by-side prior to export.
* **One-Click Download**: Fast export utility supporting multiple resolution choices.

### 3. User Experience & Interface Fundamentals
* **Upload Hub**: Supports single-image upload with instantaneous file type and size validation.
* **Interactive Canvas**: Responsive viewport for reviewing AI transformations in real time.
* **Processing Feedback**: Loading states and status indicators to keep users informed during AI model execution.

---

## Run Locally

**Prerequisites:** Node.js

1. **Install dependencies:**
   ```bash
   npm install
   ```
2. **Set the API Key:**
   Set the `GEMINI_API_KEY` in `.env.local` to your Gemini API key.
3. **Run the app:**
   ```bash
   npm run dev
   ```

View your app in AI Studio: https://ai.studio/apps/0a9319e6-c7de-4ca2-96e5-e6766d65c3af

