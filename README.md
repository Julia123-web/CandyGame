# Candy Game Landing Page

A promotional landing page for an exciting candy-themed game with PIN verification system.

## Description

This is a landing page designed to promote a candy-themed game. Users enter their phone number to receive a PIN code for activation. For testing purposes, the PIN code is returned directly from the trigger-pin API response instead of sending an actual SMS.

## Features

- Clean and attractive landing page design
- Phone number input validation
- PIN code verification system using trigger-pin API
- Instant PIN code display (test mode)
- Responsive design for all devices

## Prerequisites

- Node.js (v14 or higher)
- npm (comes with Node.js)
- Access to trigger-pin API endpoint

## Installation

1. Clone the repository
2. Navigate to the project directory
3. Install dependencies:
```bash
npm install
```

## Running the Landing Page

To start the development server:
```bash
npm run dev
```

The landing page will be available at `http://localhost:5173` (or another port if 5173 is in use).

## Building for Production

To create a production build:
```bash
npm run build
```

The built files will be available in the `dist` directory.

## Technologies Used

- TypeScript
- Vite
- HTML5
- CSS3
- Trigger-pin API integration

## Project Structure

- `/src` - Source code files
- `/public` - Static assets
- `/dist` - Production build (generated after building)

## License

This project is open source and available under the MIT License.
