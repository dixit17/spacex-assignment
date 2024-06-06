# SpaceX  UI
## Overview </br>
The SpaceX UI provides an interface to view and search for SpaceX launches. Users can search for specific launches using a search bar with fuzzy search capabilities, and refine the results using filters based on launch success, failure, and upcoming status.

## Features
- Search: Search launches using a search bar with fuzzy search capabilities. </br>
- Filters: Apply filters to refine the results based on launch status (success, failure, upcoming). </br>
- Infinite Scrolling: Load more data as the user scrolls down. </br>
- Retry Mechanism: In case of a data fetch error, users can retry loading the data. </br>

## Technologies Used
- React: JavaScript library for building user interfaces. </br>
- Material-UI: React component library for implementing Google's Material Design. </br>
- Axios: Promise-based HTTP client for making requests to the backend API. </br>
- Fuse.js: Lightweight fuzzy-search library for search functionality. </br>

## Getting Started
### Prerequisites
Make sure you have the following installed on your system: </br>

Node.js: v12 or later  </br>
npm: v6 or later  </br>

### Installation
Clone the repository: </br>
git clone https://github.com/your-username/spacex-launches-ui.git </br>

cd spacex-ui </br>
Install the dependencies: </br>

npm install </br>
incase on conflict try  npm install --save --legacy-peer-deps </br>

## Set up environment variables:
Create a .env file in the root directory and add the following:

REACT_APP_API_URL=http://localhost:3005/api
Make sure the REACT_APP_API_URL points to the backend API URL.

## Running the Application
To start the application, run:

npm start
This will start the development server and open the application in your default web browser at http://localhost:3000.


# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

