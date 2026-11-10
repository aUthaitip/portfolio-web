# Portfolio Website 🚀

Welcome to my personal portfolio website! This is a modern, premium, and fully responsive portfolio built for a Frontend / Full Stack Developer. It showcases my skills, experiences, and featured projects with a clean, minimal, and warm aesthetic.

## 🌟 What This Project Does (Features)

- **Sanity CMS Integration**: The content (Profile, Experiences, Projects) is managed dynamically via Sanity Studio.
- **Dual-Language Support (i18n)**: Seamlessly switch between Thai (TH) and English (EN) using URL-based routing (`/th`, `/en`).
- **Interactive Contact Form**: A fully functional contact form validated with Zod & React Hook Form, submitting data directly to a Google Sheet via a custom API.
- **Smooth Animations**: Uses Framer Motion for beautiful page reveals, fade-ups, and hover effects.
- **Modern UI Components**: Built with Tailwind CSS and Shadcn/ui for accessible and highly customizable components.
- **Optimized for SEO**: Fast page loads and best practices provided by Next.js 16 App Router.

## 🛠️ Tech Stack

- **Framework**: Next.js 16 (App Router)
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
## Resume refresh and design projects

Projects, profile photos, and contact links come from Sanity. The Hero and About career text use the reviewed bilingual resume in `data/resume.ts`, so the confirmed graduate status, five-month internship summary, target roles, education, and GPA 3.00 appear immediately. The content-sync script can also publish these reviewed updates to the CMS when a write token is configured.

1. Configure `NEXT_PUBLIC_SANITY_PROJECT_ID` and `NEXT_PUBLIC_SANITY_DATASET` in `.env.local`.
2. Run `npm run resume:sync` to preview the proposed content updates. The script matches existing projects by title, slug, or website URL and preserves their media, detailed content, and existing slugs. PawPlan keeps its existing website and repository links.
3. To publish the reviewed updates, add `SANITY_API_WRITE_TOKEN` to `.env.local` and run `npm run resume:sync -- --apply`. Keep this token server-only. Duplicate matches or unpublished drafts stop the update for review.

To add a Figma project, open `/studio`, create a Project, choose **UI/UX Design**, and fill in the title, slug, summary, screenshot, and **Figma Design / Prototype URL**. Use the detailed content to explain the problem, your role, user flows, and design decisions. Publish to show it on the website. Existing projects without a type continue to display as websites.
