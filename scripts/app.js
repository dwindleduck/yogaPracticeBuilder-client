//Command Center for Client Side

import { 
    signUp,
    signIn
} from "./api.js"


/*----- DOM Elements -----*/

const signInForm = document.querySelector("#sign-in-form")
const signUpForm = document.querySelector("#sign-up-form")





/*----- functions -----*/









/*----- Event Listeners -----*/

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
