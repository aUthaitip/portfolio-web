# Portfolio Website 🚀

Welcome to my personal portfolio website! This is a modern, premium, and fully responsive portfolio built for a Frontend / Full Stack Developer. It showcases my skills, experiences, and featured projects with a clean, minimal, and warm aesthetic.

## 🌟 What This Project Does (Features)

- **Sanity CMS Integration**: The content (Profile, Experiences, Projects) is managed dynamically via Sanity Studio.
- **Dual-Language Support (i18n)**: Seamlessly switch between Thai (TH) and English (EN) using URL-based routing (`/th`, `/en`).
- **Interactive Contact Form**: A fully functional contact form validated with Zod & React Hook Form, submitting data directly to a Google Sheet via a custom API.
- **Smooth Animations**: Uses Framer Motion for beautiful page reveals, fade-ups, and hover effects.
- **Modern UI Components**: Built with Tailwind CSS and Shadcn/ui for accessible and highly customizable components.
- **Optimized for SEO**: Fast page loads and best practices provided by Next.js 15 App Router.

## 🛠️ Tech Stack

- **Framework**: Next.js 15 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **UI Components**: shadcn/ui, Lucide React
- **Animations**: Framer Motion
- **CMS**: Sanity
- **Form Handling**: React Hook Form, Zod

## 🚀 How to Run Locally

Follow these steps to set up and run the project on your local machine:

### 1. Clone the repository
```bash
git clone <your-repo-url>
cd portfolio-web
```

### 2. Install dependencies
Make sure you have Node.js installed, then run:
```bash
npm install
```

### 3. Setup Environment Variables
Create a `.env.local` file in the root directory and add your credentials. It should look like this:
```env
# Sanity project connection variables
NEXT_PUBLIC_SANITY_PROJECT_ID="your_sanity_project_id"
NEXT_PUBLIC_SANITY_DATASET="production"
NEXT_PUBLIC_SANITY_API_VERSION="2024-01-01"

# Google Sheet API for Contact Form
GOOGLE_SHEET_API="your_google_sheet_api_endpoint"
```

### 4. Start the Development Server
```bash
npm run dev
```
The website will be available at [http://localhost:3000](http://localhost:3000).

### 5. Access Sanity Studio
To manage the content (add projects, update experiences, edit profile), navigate to the built-in CMS:
[http://localhost:3000/studio](http://localhost:3000/studio)

## 🎨 Design Philosophy
The design language focuses on minimalism, elegance, and professionalism. It embraces generous whitespace, warm background tones, and a cohesive color palette that feels welcoming and premium.