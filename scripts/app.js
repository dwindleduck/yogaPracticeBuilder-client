//Command Center for Client Side
import {store} from "./store.js"
import { 
    signUp,
    signIn,
    indexPostures,
    indexPractices,
    showPostureById,
    showPracticeById,
    indexKnownPostures,
    updateKnownPostures,
    indexBuiltPractices,
    createPractice
} from "./api.js"
import {
    onSignUpSuccess,
    onSignInSuccess,
    onFailure,
    onIndexPosturesSuccess,
    onIndexPracticesSuccess,
    clearBody,
    onShowPostureSuccess,
    onShowPracticeSuccess,
    showCreatePracticeForm,
    onIndexBuiltPracticesSuccess,
    showEditForm,
    onIndexKnownPosturesSuccess,
    onSignInFailure,
    onUnauthorized,
    onSignUpFailure
} from "./ui.js"

/*----- DOM Elements -----*/
//const signInButtons = document.querySelectorAll(".sign-in-button")
const signInOrOutToggle = document.querySelector("#sign-in-or-out-toggle")
//const signOutButton = document.querySelector("#sign-out-button")
const signInForm = document.querySelector("#sign-in-form")
const signUpForm = document.querySelector("#sign-up-form")
const landingContainer = document.querySelector("#landing-container")
const signInAndUpContainer = document.querySelector("#sign-in-and-up-container")
const navHomeButton = document.querySelector("#nav-home-button")
const navMyPracticesButton = document.querySelector("#nav-my-practices-button")
const navFindPracticesButton = document.querySelector("#nav-find-practices-button")
const navNewPracticeButton = document.querySelector("#nav-new-practice-button")
const navPosturesButton = document.querySelector("#nav-postures-button")
const messageContainer = document.querySelector("#message-container")
const loggedInUserMessageContainer = document.querySelector("#logged-in-user-message-container")
const notLoggedInUserMessageContainer = document.querySelector("#not-logged-in-user-message-container")


/*---------------------*/
/*----- Functions -----*/
/*---------------------*/

/*------ Postures ------*/
export const showPostureDetails = (event) => {
    const id = event.target.getAttribute("data-id")
    if (!id) return
    showPostureById(id)
        .then((res) => res.json())
        .then((res) => {
            onShowPostureSuccess(res.posture)
        })
        .catch(onUnauthorized)
}
export const showAllPostures = () => {
    indexPostures()
        .then((res) => res.json())
        .then((res) => {
            onIndexPosturesSuccess(res.postures)
        })
        .catch(onFailure)
}
export const showKnownPostures = (practiceId, sequence, isEditing) => {
    indexKnownPostures()
    .then((res) => res.json())
    .then((res) => {
        onIndexKnownPosturesSuccess(res.postures, practiceId, sequence, isEditing)
    })
    .catch(onUnauthorized)
}
export const addPostureToKnown = (postureData) => {
    indexKnownPostures()
        .then((res) => res.json())
        .then((res) => {
            const knownPostures = res.postures
            
            //IF the posture is already known
            if (knownPostures.filter(posture => posture._id === postureData._id).length > 0){
                messageContainer.innerHTML = "You already know this posture!"
            } else {
                //add it to known
               updateKnownPostures(postureData)
                    .then(() => {
                        messageContainer.innerHTML = "Added to your list of known postures!"
                    })
                    .catch(onFailure)
            }
        })
        .catch(onUnauthorized)
}

/*----- Practices -----*/
export const showPracticeDetails = (event) => {
    const id = event.target.getAttribute("data-id")
    if (!id) return
    showPracticeById(id)
        .then((res) => res.json())
        .then((res) => {
            onShowPracticeSuccess(res.practice)
        })
        .catch(onUnauthorized)
}
const showPractices = () => {
    indexPractices()
    .then((res) => res.json())
    .then((res) => {
        onIndexPracticesSuccess(res.practices)
    })
    .catch(onFailure)
}
export const showBuiltPractices = () => {
    indexBuiltPractices()
    .then((res) => res.json())
    .then((res) => {
        onIndexBuiltPracticesSuccess(res.practices)
    })
    .catch(onUnauthorized)
}
const showCreatePractice = () => {
    //show the form
    showCreatePracticeForm()
    const form = document.querySelector("#create-new-practice-form")
    form.addEventListener("submit", (event) => {
        event.preventDefault()

        const practiceData = {
            practice: {
                name: event.target["name"].value,
                description: event.target["description"].value,
                style: event.target["style"].value,
			},
        }
        createPractice(practiceData)
        .then((res) => res.json())
        .then((res) => {
            showEditForm(res.practice._id)
        })
        .catch(onUnauthorized)
    })
}



/*---------------------------*/
/*----- Event Listeners -----*/
/*---------------------------*/

/*----- Sign In/Up -----*/
signInOrOutToggle.addEventListener("click", (event) => {
    const dataEvent = event.target.getAttribute("data-event")
    if(dataEvent === "Sign Out") {
        signInOrOutToggle.setAttribute("data-event", "Sign In")
        signInOrOutToggle.innerHTML = "Sign In"
        store.userToken = ""
        clearBody()
        
        messageContainer.innerHTML = "You've been logged out"

        notLoggedInUserMessageContainer.classList.remove("hide")
        loggedInUserMessageContainer.classList.add("hide")

        signInAndUpContainer.classList.remove("hide")
        signUpForm.classList.remove("hide")
    }
    else if (dataEvent === "Sign In") {
        event.preventDefault()
        clearBody()
        signInAndUpContainer.classList.remove("hide")
    }
    
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
        //then call signIn()
        .catch(onSignUpFailure)
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
            //res has the token
            onSignInSuccess(res.token)
        })
        .catch(onSignInFailure)
})

/*----- Nav -----*/
navHomeButton.addEventListener("click", (event) => {
    event.preventDefault()
    clearBody()
    landingContainer.classList.remove("hide")
})
navMyPracticesButton.addEventListener("click", (event) => {
    event.preventDefault()
    showBuiltPractices()
})
navFindPracticesButton.addEventListener("click", (event) => {
    event.preventDefault()
    showPractices()
})
navPosturesButton.addEventListener("click", (event) => {
    event.preventDefault()
    showAllPostures()
})
navNewPracticeButton.addEventListener("click", (event) => {
    event.preventDefault()
    showCreatePractice()
})
