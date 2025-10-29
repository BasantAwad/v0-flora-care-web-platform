# FloraCare: The AI-Powered Community for Smart Plant Parenting

*Automatically synced with your [v0.app](https://v0.app) deployments*

[![Deployed on Vercel](https://img.shields.io/badge/Deployed%20on-Vercel-black?style=for-the-badge&logo=vercel)](https://vercel.com/basantawads-projects/v0-flora-care-web-platform)
[![Built with v0](https://img.shields.io/badge/Built%20with-v0.app-black?style=for-the-badge)](https://v0.app/chat/projects/fSD2RISAPY2)

## Overview

FloraCare is a comprehensive web platform designed to empower both novice and expert plant owners in successfully nurturing their indoor and outdoor greenery. The core value proposition lies in integrating cutting-edge Artificial Intelligence (AI) for real-time plant and health recognition with a dynamic, supportive community environment.

Upon uploading an image, the system instantly identifies the plant species and provides hyper-specific, contextual care instructions (adjusted for user location, seasonality, and plant life stage). Furthermore, FloraCare allows continuous health monitoring, detecting early signs of distress (pests, disease, nutrient deficiency) and offering guided solutions.

Beyond automated intelligence, the platform fosters a strong sense of community through interactive forums, shared "My Garden" dashboards, and location-based resources, including a Local Plant Store Finder. The overall experience is designed to be engaging, reliable, and user-friendly, turning plant care from a chore into a rewarding, gamified experience.

## Features

### Plant Identification & Diagnosis
- Upload plant images for AI-based species recognition.
- Generate contextual care instructions based on plant type, season, and user location.
- Detect plant distress (e.g., disease, pests, nutrient deficiency) via image analysis.
- Provide treatment suggestions and link to relevant care guides.

### Personalized Dashboard
- Display all user plants, their health status, growth history, and care logs.
- Provide reminders and notifications for watering, repotting, etc.
- Enable quick access to care history and AI recommendations.

### Community & Forum
- Create and reply to discussion threads.
- Search and filter by plant type or issue.
- Admin moderation of user-generated content.
- User profiles with avatars, bios, and activity logs.

### Location-Based Services
- Map functionality to find nearby nurseries, greenhouses, or stores.
- Suggest location-specific plants and care routines.
- Integrated Local Plant Store Finder.

### Gamification & Engagement
- Award points and badges for posting, plant uploads, and community engagement.
- Display achievement progress on the user dashboard.
- Encourage long-term app interaction.

### Notification System
- Timely alerts about care schedules or seasonal changes.
- Notifications for community replies or badges earned.

### User Account & Profile Management
- Secure registration, login, and logout.
- Save user preferences and personal plant data.
- Profile editing and password management.

### Admin Controls
- Forum moderation and content management.
- Monitor system health, users, and plant data records.
- Database maintenance and version control.

## Non-Functional Requirements

- **Performance**: Image recognition and diagnosis within 3–5 seconds; dashboard loads in under 2 seconds.
- **Scalability**: Supports thousands of concurrent users with modular microservice architecture.
- **Security**: Encrypted HTTPS communication, role-based access (Admin, Registered User, Guest), GDPR-like compliance.
- **Reliability**: ≥99.5% uptime, automatic backups, fault tolerance for AI services.
- **Usability**: Responsive UI for desktop, tablet, mobile; intuitive navigation and clear feedback.
- **Maintainability**: Clean modular code with CI/CD via GitHub Actions, version control on GitHub, logging and monitoring.
- **Compatibility**: Modern browsers (Chrome, Edge, Safari); integrations with external APIs (e.g., Google Maps, AI models).

## Tech Stack

- **Frontend**: Next.js 16, React 18, TypeScript
- **Styling**: Tailwind CSS, Radix UI components
- **AI Integration**: Google Generative AI
- **Testing**: Vitest (unit), Playwright (e2e)
- **Deployment**: Vercel
- **CI/CD**: GitHub Actions
- **Other Libraries**: React Hook Form, Zod, Lucide React, Recharts, etc.

## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/your-username/v0-flora-care-web-platform.git
   cd v0-flora-care-web-platform
   ```

2. Install dependencies:
   ```bash
   npm install
   # or
   pnpm install
   ```

3. Set up environment variables (e.g., API keys for Google Generative AI).

4. Run the development server:
   ```bash
   npm run dev
   ```

5. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Usage

- **Development**: Use `npm run dev` to start the local server.
- **Building**: Run `npm run build` to create a production build.
- **Testing**: Execute `npm test` for unit and e2e tests.
- **Linting**: Use `npm run lint` to check code quality.

## Deployment

Your project is live at:

**[https://vercel.com/basantawads-projects/v0-flora-care-web-platform](https://vercel.com/basantawads-projects/v0-flora-care-web-platform)**

Changes are automatically synced from [v0.app](https://v0.app) and deployed via Vercel.

## Contributing

1. Fork the repository.
2. Create a feature branch: `git checkout -b feature/your-feature`.
3. Commit changes: `git commit -m 'Add your feature'`.
4. Push to the branch: `git push origin feature/your-feature`.
5. Open a pull request.

## License

This project is licensed under the MIT License.

---

This repository stays in sync with your deployed chats on [v0.app](https://v0.app). Any changes you make to your deployed app will be automatically pushed to this repository from [v0.app](https://v0.app).

## How It Works

1. Create and modify your project using [v0.app](https://v0.app).
2. Deploy your chats from the v0 interface.
3. Changes are automatically pushed to this repository.
4. Vercel deploys the latest version from this repository.
