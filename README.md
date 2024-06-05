# SpaceX Launches API and UI

This project provides a Node.js service and a frontend UI for fetching and displaying SpaceX launches. The service uses Express.js to handle HTTP requests and Axios to fetch data from the SpaceX API. The UI is built with modern web technologies to provide a user-friendly interface for interacting with the launch data.

## Table of Contents

- [Installation](#installation)
- [Usage](#usage)
- [API Endpoints](#api-endpoints)
- [UI](#ui)

### Prerequisites

- Node.js and npm installed on your machine
- Git installed on your machine

## Installation
Backend Service</br>
Navigate to the spacex-service directory and install the dependencies:</br>
cd spacex-service </br>
npm install

Frontend UI</br>
Navigate to the ui directory and install the dependencies:</br>
cd ../spacex-ui</br>
npm install

## Usage
Backend Service </br>
To start the backend service, navigate to the service directory and run:</br>
npm start </br>
The backend service will start on http://localhost:3005.

Frontend UI </br>
To start the frontend UI, navigate to the ui directory and run: </br>
npm start </br>
The frontend UI will start on http://localhost:3000.

## API Endpoints
The backend service exposes the following API endpoints: </br>
GET /api/launches:
Fetches a list of SpaceX launches with optional query parameters:
 - limit: Number of results to return (default: 50)
 - offset: Number of results to skip (default: 0)
 - success: Filter by successful launches (true or false)
 - failure: Filter by failed launches (true or false)
- upcoming: Filter by upcoming launches (true or false)
Example request: </br>
curl "http://localhost:3005/api/launches?limit=10&success=true"

UI </br>
The frontend UI offers an interface for viewing and searching SpaceX launches. </br>
You can utilize the search bar, which uses the Fuse.js library for fuzzy searching, to find specific launches. 
Additionally, filters are available to refine the results based on criteria such as launch success, failure, and upcoming status.



### Clone the Repository

```bash
git clone https://github.com/dixit17/spacex-assignment.git
