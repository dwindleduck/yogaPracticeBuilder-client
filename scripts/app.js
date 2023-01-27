//Command Center for Client Side

import { 
    signUp,
    signIn,
    indexPostures,
    indexPractices,
    showPostureById,
    showPracticeById,
    indexKnownPostures,
    updateKnownPostures,
    indexBuiltPractices
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
const navPracticesButton = document.querySelector("#nav-practices-button")
const navFindPracticesButton = document.querySelector("#nav-find-practices-button")
const navNewPracticeButton = document.querySelector("#nav-new-practice-button")
const navPosturesButton = document.querySelector("#nav-postures-button")










/*----------------------*/
/*----- Sign In/Up -----*/
/*----------------------*/

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


/*--------------------*/
/*----- Postures -----*/
/*--------------------*/
//MOVE THIS TO UI.JS
export const showPostureDetails = (event) => {
    //event.preventDefault()
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



export const showAllPostures = () => {
    indexPostures()
        .then((res) => res.json())
        .then((res) => {
            onIndexPosturesSuccess(res.postures)
        })
        .catch(onFailure)
}
export const showKnownPostures = () => {
    indexKnownPostures()
    .then((res) => res.json())
    .then((res) => {
        onIndexPosturesSuccess(res.postures)
    })
    .catch(onFailure)
}



//might need to get the whole posture, not just ID...
export const addPostureToKnown = (postureData) => {
    indexKnownPostures()
        .then((res) => res.json())
        .then((res) => {
            const knownPostures = res.postures
            console.log(knownPostures)
            console.log(postureData)
            if (knownPostures.filter(posture => posture._id === postureData._id).length > 0){
                console.log("You already know this posture!")
            } else {
                console.log("ok add it to known")

            
                console.log(knownPostures)
               // console.log(JSON.stringify(knownPostures))
               updateKnownPostures(postureData)
                // updateKnownPostures(knownPostures)
                    .then(console.log)//update the dom
                    .catch(onFailure)
            }
        })
        .catch(onFailure)
}



/*---------------------*/
/*----- Practices -----*/
/*---------------------*/


//MOVE THIS TO UI.JS
export const showPracticeDetails = (event) => {
    //event.preventDefault()
    const id = event.target.getAttribute("data-id")
    if (!id) return
    showPracticeById(id)
        .then((res) => res.json())
        .then((res) => {
            console.log(res.practice)
            onShowPracticeSuccess(res.practice)
        })
        .catch(onFailure)
}


const showPractices = () => {
    indexPractices()
    .then((res) => res.json())
    .then((res) => {
        onIndexPracticesSuccess(res.practices)
    })
    .catch(onFailure)
}

const showBuiltPractices = () => {
    indexBuiltPractices()
    .then((res) => res.json())
    .then((res) => {
        onIndexPracticesSuccess(res.practices)
    })
    .catch(onFailure)
}

/*---------------*/
/*----- Nav -----*/
/*---------------*/

navHomeButton.addEventListener("click", (event) => {
    event.preventDefault()
    clearBody()
    landingContainer.classList.remove("hide")
    //IF user is logged in......
    //show 
})



navPracticesButton.addEventListener("click", (event) => {
    showBuiltPractices()
})

navFindPracticesButton.addEventListener("click", (event) => {
    showPractices()
})

navPosturesButton.addEventListener("click", (event) => {
    showAllPostures()
})
