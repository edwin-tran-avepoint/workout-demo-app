# Test App

This is a JavaScript application built with Node.js. This README provides instructions for setting up and running the project. This project mainly implement workout app with drag and drop function.

## Getting Started

### Prerequisites

- Node.js (version 12.x or higher recommended)
- npm (comes with Node.js)

### Setup

1. Clone this repository
2. Install dependencies:

```bash
npm install
```

### Running the Application

Start the development server:

```bash
npm start
```

The application should open in your default browser. If not, visit [http://localhost:3000](http://localhost:3000).

## Available Scripts

In the project directory, you can run:

### `npm test`

Runs the test suite.

### `npm run build`

Builds the app for production to the `build` folder.

## Data Storage

This application uses a two-tier storage approach:

### Initial Data

- Initial workout data is stored in the `/public` folder
- The application loads this data on first run

### User Updates

- Any changes made by users are saved to the browser's localStorage
- This allows user data to persist between sessions without requiring a backend database
- Data is automatically loaded from localStorage when returning to the application

To reset to initial data, clear your browser's localStorage for this domain.