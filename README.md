# Yoga Practice Builder - Client Repo

Collect postures that you know and use them to build a yoga sequence.
This app is meant to help students build a home practice and to be used by teachers to construct sequences for class.

- [Deployed App](https://dwindleduck.github.io/yogaPracticeBuilder-client/)
- [Back End Repo](https://github.com/dwindleduck/yogaPracticeBuilder-server)

## Improvements made since initial project build and presentation:
- Updated API endpoints in a v2 release, maintained functionality of the v1 configuration
- Implemented pagination on response data for multiple GET requests
- Set up development / production environments
- Updated how the frontend stores and uses data
- Cleaned up the sign in process, adding demo login functionality
- Clarified function location in the frontend code based on separation of concerns
- Clarified event listeners using event delegation
- Restructured the HTML and simplified the navigation menu
- Cleaned up notices and alerts to the user


## Technologies Used
### Backend
- JavaScript
- Node.js
- Express
- Mongoose, MongoDb
- Heroku, MongoDb Atlas
- Postman
- Render

### Frontend
- JavaScript
- HTML
- CSS
- Figma

## Routes Table
| NAME    |         PATH           | HTTP VERB |        PURPOSE              | PERMISSIONS |
| :---    |    :----               |   :---:   |        :----                |    :----    |
| Sign Up | /sign-up               | POST      | Register new account        |             |
| Sign In | /sign-in               | POST      | Sign in user                |             |
| Index   | /postures              | GET       | List all postures           |             |
| Show    | /postures/:id          | GET       | Show posture by ID          | user        |
| Update  | /postures/add-known    | PATCH     | Add posture to Known        | user        |
| Update  | /postures/remove-known | PATCH     | Remove posture from Known   | user        |
| Create  | /practices             | POST      | Create new practice         | user        |
| Index   | /practices             | GET       | List all practices          |             |
| Index   | /practices/author      | GET       | Show user's built practices | author      |
| Show    | /practices/:id         | GET       | Show practice by ID         | user        |
| Update  | /practices/:id         | PATCH     | Update practice by ID       | author      |
| Delete  | /practices/:id         | DELETE    | Delete practice by ID       | author      |


### Planning: ERD & Wireframes
![ERD & Wireframes](./assets/YPB_ERD_Wireframes.png)

## User Stories
### MVP/Version 1
- As a user I want to be able to sign in
- As a user I want to be able to see a landing page with navigation buttons
- As a user I want to be able to see a list of all postures in the library
- As a user I want to be able to see posture details - *restricted to logged in user*
- As a user I want to be able to see a list of my known postures - *restricted to logged in user*
- As a user I want to be able to select postures from the library to add to my list of known postures - *restricted to logged in user*
- As a user I want to be able to see a list of all practices posted by all users
- As a user I want to be able to see the details of a practice - *restricted to logged in user*
- As a user I want to be able to build a new practice - *restricted to logged in user*
- As a user I want to be able to see a list of the practices I have built - *restricted to logged in user*
- As a user I want to be able to add postures to a sequence - *restricted to logged in user*
- As a user I want to be able to update a practice I created - *restricted to logged in user*
- As a user I want to be able to delete a practice I created - *restricted to logged in user*

### Version 2
- As a user I want to be able to add new (unique) postures to the library
- As a user I want to be able to see the most recently posted practice on my landing page
- As a user I want to be able to favorite a practice to try later
- As a user I want to be able to filter the list of practices by tags
- As a user I want to be able to find a practice with a specific posture in the sequence
- As a user I want to be able to build a new practice from a list of templates

### Version 3 (Ice Box)
- As a user I want a timed autoplay step through of the sequence
- As a user I want audio instructions during playback
- As a user I want to be able to print a sequence

### Production Screenshots
![Landing](./assets/landing.png)
![Sign In](./assets/sign.png)
![Postures](./assets/postures.png)
![Posture Details](./assets/postureDetails.png)
![Create](./assets/create.png)
![Edit](./assets/edit.png)
![Practices](./assets/builtPractices.png)
![Practice Details](./assets/practiceDetails.png)