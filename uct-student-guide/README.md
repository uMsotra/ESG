# UCT Student Guide

## Overview

The UCT Student Guide is a web-based platform designed to assist students in navigating their academic journey with interactive tools like quizzes, podcasts, and chatbots. The guide provides valuable resources, including quizzes for knowledge assessment and a certificate generation system for users who achieve certain milestones.

## Table of Contents

- [Installation](#installation)
- [Project Structure](#project-structure)
- [Usage](#usage)
- [Key Features](#key-features)
- [File Descriptions](#file-descriptions)
- [License](#license)

## Installation

### Prerequisites

Make sure you have the following installed on your machine:

- Node.js (v14 or higher)
- npm (v6 or higher)

### Steps

1. Clone the repository:

   ```bash
   git clone https://gitlab.cs.uct.ac.za/lthmat005
   ```

2. Navigate to the project directory:

   ```bash
   cd uct-student-guide
   ```

3. Install dependencies:

   ```bash
   npm install
   ```

4. Start the development server:

   ```bash
   npm run dev
   ```

## Project Structure

```
uct-student-guide/
├── .vscode/                # VS Code configuration
├── node_modules/           # Dependencies
├── public/                 # Public assets (e.g., logos, fonts)
├── src/                    # Source files
│   ├── pages/              # React components (e.g., Quiz, Certificate)
│   ├── App.jsx             # Main App component
│   ├── index.jsx           # ReactDOM rendering
│   └── styles.css          # Global CSS file
├── .gitignore              # Git ignore file
├── eslint.config.js        # ESLint configuration
├── index.html              # Base HTML template
├── package-lock.json       # Auto-generated npm lock file
├── package.json            # Project metadata and dependencies
├── README.md               # Project documentation (you are here)
└── vite.config.js          # Vite configuration for bundling
```

## Usage

### Running the Project

After starting the development server with `npm run dev`, open your browser and navigate to:

```
http://localhost:3000
```

### Quizzes

- The Quiz feature allows students to take interactive quizzes on various topics. Each category can be completed separately.
- Users can earn a certificate by achieving a score of 100 points or more, and they can view or download the certificate once eligible.

### Certificate

- The Certificate page displays a personalized certificate with the user's name and score.
- The certificate can be downloaded in PNG format.

### Podcasts & Chatbot

- Podcasts are available for students to listen to educational and motivational content.
- The Chatbot provides an interactive assistant to answer student queries.

## Key Features

- **Quizzes with Real-Time Scores**: Each category in the quiz tracks progress independently, and users can earn points toward a certificate.
- **Certificate Generation**: Once eligible, users can view or download a certificate with their name and score.
- **Interactive Chatbot**: A conversational chatbot assists students in finding resources and answering questions.
- **Educational Podcasts**: Users can listen to podcasts for additional guidance and motivation.
- **Firebase Integration**: User authentication and data persistence using Firebase.

## File Descriptions

### /src/pages/

- `Certificate.jsx`: Component to display and generate certificates based on the user's score. Allows downloading the certificate as an image.
- `Quiz.jsx`: Main component for the quiz. Tracks score per category, shows questions, and handles certificate eligibility.
- `Quiz.css`: Stylesheet for the quiz, adding futuristic and interactive visuals.
- `Chatbot.jsx`: Implements the chatbot for helping users with navigation and information.
- `Home.jsx`: The homepage of the application.
- `Login.jsx`: Handles user login using Firebase Authentication.
- `Register.jsx`: Allows new users to register an account.
- `Podcast.jsx`: Displays the podcasts section with audio playback options.

### Other Files

- `vite.config.js`: Configuration file for Vite, which is the build tool used.
- `package.json`: Contains metadata about the project and lists the dependencies required.
- `.gitignore`: Specifies which files and directories should be ignored by Git.

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Future Enhancements

- Add more quiz categories and content.
- Enhance the chatbot's capabilities with more sophisticated natural language understanding.
- Implement personalized learning paths based on quiz performance.


