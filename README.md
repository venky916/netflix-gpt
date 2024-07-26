# Netflix GPT

Netflix GPT is a feature-rich web application that replicates the Netflix frontend experience with additional AI-powered movie suggestions using GPT technology. This project is built using React, TailwindCSS, Firebase, Redux, and integrates with the TMDB API for movie data and Gemini AI API for GPT-based recommendations.

## Features

- **Project Setup**
  - Created a React app using Create React App.
  - Configured TailwindCSS for styling.

- **Authentication**
  - Created login and signup forms with custom form validation.
  - Implemented Firebase setup for authentication.
  - Deployed the app to production.
  - Created SignUp user accounts and implemented sign-in user API.
  - Added sign-in with Google feature.
  - Implemented sign-out feature.
  - Unsubscribed from the onAuthStateChange callback.
  - Redirected user on sign-in or sign-out, solving bugs related to authentication state.

- **State Management**
  - Created a Redux store with `userSlice` for managing user state.
  - Created `movieSlice` for managing movie data.
  - Created `gptSlice` for managing GPT-based movie suggestions data.

- **Movie Data**
  - Registered TMDB API, created an app, and obtained an access token.
  - Fetched data from TMDB "now playing" movies list API using a custom hook.
  - Fetched data for trailer videos and updated the store.
  - Embedded YouTube videos, set them to autoplay and mute.
  - Built movie lists and movie cards using TMDB Image CDN.
  - Added custom hooks for popular movies, upcoming movies, and top-rated movies.

- **GPT Integration**
  - Created a GPT search page with a search bar.
  - Added a multi-language feature to the GPT search page.
  - Registered Gemini AI API and obtained an API key.
  - Fetched GPT movie suggestions from TMDB.
  - Reused MovieList component to create movie suggestion containers.
  - Added API polling for movie suggestions.
  - Recommended movies based on the searched movies.

- **UI and UX**
  - Designed main container and secondary container with TailwindCSS.
  - Made the browse page visually appealing with TailwindCSS.
  - Built a responsive UI.
  - Implemented a proper folder structure.
  - Added a shimmer effect for loading states.
  - Added a modal to display movie info and trailer on clicking a movie card.

- **Environment and Deployment**
  - Added environment variables in a `.env` file and included it in `.gitignore`.

## Getting Started

### Prerequisites

- Node.js
- npm or yarn
- Firebase account
- TMDB API key
- Gemini AI API key

### Installation

1. Clone the repository:
   ``` bash
   git clone https://github.com/yourusername/netflix-gpt.git
   cd netflix-gpt 
   ```

2. Install dependencies:
    ``` bash 
    npm install 
    ```

3. Create a .env file and add your API keys:
    ``` bash 
    REACT_APP_FIREBASE_API_KEY=your_firebase_api_key
    REACT_APP_TMDB_API_KEY=your_tmdb_api_key
    REACT_APP_GEMINI_AI_API_KEY=your_gemini_ai_api_key
    ``` 
4. Start the development server:
    ``` bash 
    npm start
    ```

# Deployment
To deploy the app to production, use the following  
    command:
        ``` bash
        npm run build
        ```
    
# Contributing
Contributions are welcome! Please open an issue or submit a pull request for any improvements or bug fixes.

# License
This project is licensed under the MIT License.

This README file covers the main aspects of your project and provides clear instructions for getting started and contributing. Let me know if you need any changes or additional information!
