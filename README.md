# First Up Financial - MVP

A subscription-based Fintech platform with consumer protection tools and partner integrations.

## Features

- **Hold Harmless Engine**: PDF generation for liability waivers using Puppeteer
- **Consumer Protection Hub**: Centralized access to credit freeze links for all major agencies
- **Partner Portal**: Mock KYB verification and partner selection
- **Payment Gateway**: Mock subscription and payment processing

## Tech Stack

### Backend
- Node.js + Express + TypeScript
- SQLite database
- Puppeteer for PDF generation
- JWT authentication

### Frontend
- React + TypeScript
- Vite
- TailwindCSS
- Framer Motion
- Lucide Icons

## Setup Instructions

### Prerequisites
- Node.js 18+ installed
- npm or yarn

### Installation

1. **Install Backend Dependencies**
```bash
cd server
npm install
```

2. **Install Frontend Dependencies**
```bash
cd client
npm install
```

### Running the Application

**Option 1: Using the batch file (Windows)**
```bash
start.bat
```

**Option 2: Manual startup**

Terminal 1 (Backend):
```bash
cd server
npx ts-node src/app.ts
```

Terminal 2 (Frontend):
```bash
cd client
npm run dev
```

The application will be available at:
- Frontend: http://localhost:5173
- Backend API: http://localhost:3001

## Project Structure

```
FirstUpFinancial/
├── server/                 # Backend API
│   ├── src/
│   │   ├── app.ts         # Main Express server
│   │   ├── database.ts    # SQLite setup
│   │   ├── routes/        # API routes
│   │   ├── services/      # Business logic
│   │   ├── data/          # Static data
│   │   └── templates/     # PDF templates
│   └── package.json
├── client/                 # Frontend React app
│   ├── src/
│   │   ├── App.tsx        # Main app component
│   │   ├── pages/         # Page components
│   │   ├── components/    # Reusable components
│   │   └── lib/           # Utilities
│   └── package.json
├── start.bat              # Startup script
└── package.json           # Root package.json
```

## Usage Flow

1. Navigate to `/waiver` to sign the liability agreement
2. View `/dashboard` for the Consumer Protection Hub
3. Access `/partners` to see integration partners

## License

MIT
