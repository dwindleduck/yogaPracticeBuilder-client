//Command Center for Client Side
import {store} from "./store.js"
import { 
    signUp,
    signIn,
    getStudent,
    getAllPostures,
    getPractices,
    getPostureById,
    getPracticeById,
    getKnownPostures,
    addOrRemoveKnownPosture,
    getBuiltPractices,
    createPractice
} from "./api.js"
import {
    // onSignUpSuccess,
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

const signInOrOutToggle = document.querySelector("#sign-in-or-out-toggle")
const toggleSignUp = document.querySelector("#toggle-sign-up")
const toggleSignIn = document.querySelector("#toggle-sign-in")


const signInForm = document.querySelector("#sign-in-form")
const demoLoginButton = document.querySelector("#demo-login")
const signUpForm = document.querySelector("#sign-up-form")

const landingContainer = document.querySelector("#landing-container")
const signInAndUpContainer = document.querySelector("#sign-in-and-up-container")
const signInContainer = document.querySelector("#sign-in-container")
const signUpContainer = document.querySelector("#sign-up-contatiner")

const homeButton = document.querySelector("#home-button")
const navPracticeButton = document.querySelector("#nav-practice-button")
const navCreateButton = document.querySelector("#nav-create-button")
const navPostureLibraryButton = document.querySelector("#nav-posture-library-button")

const messageContainer = document.querySelector("#message-container")

const loggedInUserMessageContainer = document.querySelector("#logged-in-user-message-container")
const notLoggedInUserMessageContainer = document.querySelector("#not-logged-in-user-message-container")


/*---------------------*/
/*----- Functions -----*/
/*---------------------*/


/*---------------------*/
/*------ Students ------*/
// SignUp --initiates--> SignIn
// SignIn --initiates--> getStudentData
// getStudentData --initiates--> saveStudent
/*---------------------*/

export const saveStudent = (res) => {
    store.usersName = res.student.name
    store.knownPostures = res.student.knownPostures
    store.favoritedPractices = res.student.favoritedPractices
}
export const getStudentData = () => {
    getStudent()
        .then((res) => res.json())
        .then(res => {
            saveStudent(res)
        })
        .catch(onFailure)
}
export const signInStudent = (studentData) => {
    const formattedData = {
        credentials: {
            email: studentData.credentials.email,
            password: studentData.credentials.password
        }
    }
    signIn(formattedData)
        .then((res) => res.json())
        .then(res => {
            //res only has the token, store it
            store.userToken = res.token
            // after successful signIn, getStudentData()
            getStudentData()
        })
        .then(res => {
            onSignInSuccess()
        })
        .catch(onSignInFailure)
}






/*------ Postures ------*/
export const showPostureDetails = (event) => {
    const id = event.target.getAttribute("data-id")
    if (!id) return
    getPostureById(id)
        .then((res) => res.json())
        .then((res) => {
            onShowPostureSuccess(res.posture)
        })
        .catch(onUnauthorized)
}
export const showAllPostures = () => {
    getAllPostures()
        .then((res) => res.json())
        .then((res) => {
            onIndexPosturesSuccess(res.postures)
        })
        .catch(onFailure)
}
export const showKnownPostures = (practiceId, sequence, isEditing) => {
    getKnownPostures()
    .then((res) => res.json())
    .then((res) => {
        onIndexKnownPosturesSuccess(res.postures, practiceId, sequence, isEditing)
    })
    .catch(onUnauthorized)
}
export const addPostureToKnown = (postureData) => {
    getKnownPostures()
        .then((res) => res.json())
        .then((res) => {
            const knownPostures = res.postures
            
            //IF the posture is already known
            if (knownPostures.filter(posture => posture._id === postureData._id).length > 0){
                messageContainer.innerHTML = "You already know this posture!"
            } else {
                //add it to known
               addOrRemoveKnownPosture(postureData)
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
    getPracticeById(id)
        .then((res) => res.json())
        .then((res) => {
            onShowPracticeSuccess(res.practice)
        })
        .catch(onUnauthorized)
}
const showPractices = () => {
    getPractices()
    .then((res) => res.json())
    .then((res) => {
        onIndexPracticesSuccess(res.practices)
    })
    .catch(onFailure)
}
export const showBuiltPractices = () => {
    getBuiltPractices()
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

/*----- Header / Nav -----*/

homeButton.addEventListener("click", (event) => {
    event.preventDefault()
    clearBody()
    landingContainer.classList.remove("hide")
})
navPracticeButton.addEventListener("click", (event) => {
    event.preventDefault()
    showBuiltPractices()
})
navCreateButton.addEventListener("click", (event) => {
    event.preventDefault()
    showPractices()
})
navPostureLibraryButton.addEventListener("click", (event) => {
    event.preventDefault()
    showAllPostures()
})





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

toggleSignUp.addEventListener("click", (event) => {
    event.preventDefault()
    signInContainer.classList.add("hide")
    signUpContainer.classList.remove("hide")
})
toggleSignIn.addEventListener("click", (event) => {
    event.preventDefault()
    signUpContainer.classList.add("hide")
    signInContainer.classList.remove("hide")
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
        .then(res => {
            // after successful sign up, auto sign in
            signInStudent(studentData)
        })
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
    signInStudent(studentData)
})
demoLoginButton.addEventListener("click", (event) => {
    event.preventDefault()
    const demoLoginData = {
        credentials: {
            email: "demo@demo.demo",
            password: "demodemodemo"
        }
    }
    signInStudent(demoLoginData)
})

