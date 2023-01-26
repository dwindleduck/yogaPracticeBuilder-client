//Command Center for Client Side

import { 
    signUp,
    signIn
} from "./api.js"


/*----- DOM Elements -----*/
const signInButton = document.querySelector("#sign-in-button")
const signInForm = document.querySelector("#sign-in-form")
const signUpForm = document.querySelector("#sign-up-form")
const landingContainer = document.querySelector("#landing-container")
const signInAndUpContainer = document.querySelector("#sign-in-and-up-container")
const homeButton = document.querySelector("#home-button")





/*----- functions -----*/









/*----- Event Listeners -----*/


signInButton.addEventListener("click", (event) => {
    landingContainer.classList.add("hide")
    signInAndUpContainer.classList.remove("hide")
})

homeButton.addEventListener("click", (event) => {
    landingContainer.classList.remove("hide")
    signInAndUpContainer.classList.add("hide")
})

signUpForm.addEventListener("submit", (event) => {
    event.preventDefault()
    const studentData = {
        credentials: {
            name: event.target["name"].value,
            email: event.target["email"].value,
            password: event.target["password"].value
        }
    }
    signUp(studentData)
    .then(console.log)
    .catch(console.error)
})

signInForm.addEventListener("submit", (event) => {
    event.preventDefault()
    const studentData = {
        credentials: {
            email: event.target["email"].value,
            password: event.target["password"].value
        }
    }
    signIn(studentData)
    .then(console.log)
    .catch(console.error)
})
