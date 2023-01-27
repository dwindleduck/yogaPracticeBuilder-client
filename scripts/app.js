//Command Center for Client Side

import { 
    signUp,
    signIn,
    indexPostures,
    indexPractices,
    showPostureById,
    showPracticeById
} from "./api.js"
import {
    onSignUpSuccess,
    onSignInSuccess,
    onFailure,
    onIndexPosturesSuccess,
    onIndexPracticesSuccess,
    clearBody,
    onShowPostureSuccess,
    onShowPracticeSuccess
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
const navNewPracticeButton = document.querySelector("#nav-new-practice-button")



/*----- functions -----*/









/*----- Event Listeners -----*/


signInButton.addEventListener("click", (event) => {
    clearBody()
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
        .then((res) => res.json())
        .then(res => onSignUpSuccess())
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
        .then((res) => res.json())
        .then(res => {
            console.log(res) //returning the token
            onSignInSuccess(res.token)
        })
        .catch(onFailure)
})




navHomeButton.addEventListener("click", (event) => {
    event.preventDefault()
    clearBody()
    landingContainer.classList.remove("hide")
    //IF user is logged in......
    //show 
})





export const showPostureDetails = (event) => {
    event.preventDefault()
    const id = event.target.getAttribute("data-id")
    if (!id) return
    showPostureById(id)
        .then((res) => res.json())
        .then((res) => {
            console.log(res)
            onShowPostureSuccess(res.posture)
        })
        .catch(onFailure)
}

navPosturesButton.addEventListener("click", (event) => {
    event.preventDefault()
    indexPostures()
        .then((res) => res.json())
        .then((res) => {
            onIndexPosturesSuccess(res.postures)
        })
        .catch(onFailure)

      
})

navPracticesButton.addEventListener("click", (event) => {
    event.preventDefault()
    indexPractices()
        .then((res) => res.json())
        .then((res) => {
            onIndexPracticesSuccess(res.practices)
        })
        .catch(onFailure)
})
export const showPracticeDetails = (event) => {
    event.preventDefault()
    const id = event.target.getAttribute("data-id")
    if (!id) return
    showPracticeById(id)
        .then((res) => res.json())
        .then((res) => {
            console.log(res)
            onShowPracticeSuccess(res.practice)
        })
        .catch(onFailure)
}
