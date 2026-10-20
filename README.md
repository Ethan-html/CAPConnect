# Cadet Connect — Profile Frontend Demo

A responsive profile-only demo built with Next.js App Router, React, TypeScript, Tailwind CSS, and Lucide React icons. The design is Instagram-inspired and has no banner image.

## Run locally

1. Install Node.js 20.9 or newer.
2. Run `npm install`.
3. Run `npm run dev`.
4. Open http://localhost:3000.

## Demo interactions

- Desktop sidebar starts icon-only, centered, and expands on hover or keyboard focus to reveal labels.
- Mobile navigation remains fixed at the bottom.
- Follow toggles state and updates the sample follower count.
- Message opens a demo composer; sending only shows a local confirmation.
- The personal profile dropdown lets the user choose a supported social platform and shows that platform's icon and sample handle.
- Overview includes profile details and sample awards/qualifications with Verified, Pending Review, Self-Reported, and Rejected states.
- Experience is a vertical timeline. Add a flight position, duty position, or both; up to five positions are supported in the demo.
- Posts use an Instagram-style square grid and like buttons update the sample counts.
- Light/dark theme follows the computer's `prefers-color-scheme` setting automatically.

## Important

This is a frontend-only prototype with fictional sample data. It has no authentication, database, real messaging, or publishing. It is not an official Civil Air Patrol service. Do not put real minors' information into this demo.

## Libraries

- Next.js App Router + React + TypeScript
- Tailwind CSS
- Lucide React icons
- Custom CSS components with a shadcn/ui-inspired visual style
