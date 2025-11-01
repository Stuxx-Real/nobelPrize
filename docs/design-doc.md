# Nobel Prize Explorer

## Overview
Nobel Prize Explorer is an Angular-based web application that displays Nobel Prizes and laureates. based on the user selection.  
Users can browse prizes by category and year, view detailed laureate information, and navigate seamlessly through routes.

## Application Structure
- **AppComponent** – Root component handling overall layout and navigation.
- **PrizeListComponent** – Displays list of Nobel prizes with year & category selection and also includes pagination and filters.
- **LaureateDetailComponent** – Shows laureate details in separate route.
- **PageNotFoundComponent** – Handles undefined routes (404).

## Data Flow
- Once the user is landed to the main screen (Prize screen) and selects a date or category.
- Fetches data from the Nobel Prize API.
- Uses services to manage API communication and store fetched results.
- Uses Angular routing for navigation between pages on click on the laureate names.

## UI Design
- Built with **Bootstrap** for responsive design.
- Includes navigation bar and dropdown for categories.
- Clean, minimal UI inspired by the official Nobel Prize website.

## Future Enhancements
- to implement the alphabetical order filter for the laureate names once after fetching the data.
- Country based search for the prize winners.
- Add more navbar elements related to the nobel prizes (how many of the nobel prizes are given in seach field from the starting date to till)
- Add download button the laureate screen to download single person details.
- Add download button in the main screen to download all the result of a search