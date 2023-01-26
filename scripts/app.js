//Command Center for Client Side

import { 
    signUp,
    signIn,
    indexPostures
} from "./api.js"
import {
    onSignUpSuccess,
    onSignInSuccess,
    onFailure,
    onIndexPosturesSuccess
} from "./ui.js"


/*----- DOM Elements -----*/
const signInButton = document.querySelector("#sign-in-button")
const signInForm = document.querySelector("#sign-in-form")
const signUpForm = document.querySelector("#sign-up-form")
const landingContainer = document.querySelector("#landing-container")
const signInAndUpContainer = document.querySelector("#sign-in-and-up-container")
const navHomeButton = document.querySelector("#nav-home-button")
const navPosturesButton = document.querySelector("#nav-postures-button")
const navPracticesButton = document.querySelector("#nav-practices-button")
const navPracticeButton = document.querySelector("#nav-practice-button")

const posturesContainer = document.querySelector("#postures-container")
const practicesContainer = document.querySelector("#practices-container")



/*----- functions -----*/









/*----- Event Listeners -----*/


signInButton.addEventListener("click", (event) => {
    landingContainer.classList.add("hide")
    signInAndUpContainer.classList.remove("hide")
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
    .then(onSignUpSuccess)
    .catch(onFailure)
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
    .then(onSignInSuccess)
    .catch(onFailure)
})

navHomeButton.addEventListener("click", (event) => {
    landingContainer.classList.remove("hide")
    signInAndUpContainer.classList.add("hide")
})

navPosturesButton.addEventListener("click", (event => {
    signInAndUpContainer.classList.add("hide")
    landingContainer.classList.remove("hide")

    indexPostures()
        .then((res) => res.json())
        .then((res) => {
            onIndexPosturesSuccess(res.postures)
        })
        .catch(onFailure)
}))