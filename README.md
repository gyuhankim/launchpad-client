# LaunchPad.gg

## Table of Contents
- [Introduction](#introduction)
- [Tech Stack](#tech-stack)
- [Goals](#goals)
- [Live Site](#live-site)
- [Server Repo](#server-repo)
- [Components](#components)
- [Screenshots](#screenshots)

## Introduction
### LaunchPad is a simple webapp that displays all future video game releases
A webapp designed to spotlight upcoming video game release dates. Building value for users by providing one singular source with a clean and simple interface to view and track the games they're most excited for.

## Tech Stack
* React
* Redux
* UnderscoreJS
* [IGDB API](https://igdb.github.io/api/)

## Goals
### The goals for LaunchPad is to:
1) Spotlight upcoming video game release dates
2) Enable users to track their most anticipated games by favorite-ing them
3) Get users excited by displaying trailers, screenshots and recent news surrounding their favorite upcoming games

## Live Site
[LaunchPad.gg](https://mysterious-sands-19667.herokuapp.com/ "LaunchPad.gg")

## Server Repo
[LaunchPad Server Repo](https://github.com/gyuhankim/launchpad-server "LaunchPad Server Repo")

## Components
Component | Purpose |
--- | --- |
Nav | Top bar containing nav links |
Toolbar | Displays search bar and updates state with the input value |
GameList | Main view containing logic for fetching games from DB, filtering and processing of fetched games and infinite scroll logic |
GamePage | View for selected game containing additional information |
LoginPage | Responsible for displaying the login form |
LoginForm | Handles form submission and user authentication |
RegistrationPage | Responsible for displaying the registration form |
RegistrationForm | Handles form submission and POSTs new user to backend |
Onboarding | Initial user onboarding splash screen |
FavoritesList | Similar to GameList component but filters based on users' favorites |

## Screenshots
### User Onboarding
![alt text](screenshots/onboarding.png "Description goes here")

### Game List View
![alt text](screenshots/game-list-view.png "Description goes here")

### Game List View 2
![alt text](screenshots/game-list-view-2.png "Description goes here")

### Favorites List
![alt text](screenshots/favorites-list-view.png "Description goes here")

### Game Detail View
![alt text](screenshots/game-detail-view.png "Description goes here")

### Registration Page
![alt text](screenshots/register-view.png "Description goes here")

### Login Page
![alt text](screenshots/login-view.png "Description goes here")
