//Command Center for Client Side
import {store} from "./store.js"
import { 
    signUp,
    signIn,
    // getStudent,
    getAllPostures,
    getPractices,
    getPostureById,
    getPracticeById,
    // getKnownPostures,
    addKnownPosture,
    removeKnownPosture,
    getBuiltPractices,
    createPractice,
    updatePractice,
    deletePractice
} from "./api.js"
import {
    onSignInSuccess,
    onSignOutSuccess,
    onFailure,
    onShowPracticesSuccess,
    clearBody,
    onShowPostureSuccess,
    onShowPracticeSuccess,
    showNewPracticeForm,
    showSequence,
    onSignInFailure,
    onUnauthorized,
    onSignUpFailure,
    onGetPosturesSuccess,
    onShowEditFormSuccess,
    showKnownPosturesList,
    onDeletePracticeSuccess
} from "./ui.js"

/*----- DOM Elements -----*/
const siteTitle = document.querySelector("#site-title")
const signInOrOutToggle = document.querySelector("#sign-in-or-out-toggle")
const mainNav = document.querySelector("#main-nav")
const messageContainer = document.querySelector("#message-container")

const signInAndUpContainer = document.querySelector("#sign-in-and-up-container")
const signInContainer = document.querySelector("#sign-in-container")
const signUpContainer = document.querySelector("#sign-up-contatiner")
const signUpForm = document.querySelector("#sign-up-form")
const signInForm = document.querySelector("#sign-in-form")
const demoLoginButton = document.querySelector("#demo-login")
const toggleSignUp = document.querySelector("#toggle-sign-up")
const toggleSignIn = document.querySelector("#toggle-sign-in")

const landingContainer = document.querySelector("#landing-container")
const pageTitleContainer = document.querySelector("#page-title-container")

const posturesListContainer = document.querySelector("#postures-list-container")
const postureDetailsContainer = document.querySelector("#posture-details-container")

const practicesListContainer = document.querySelector("#practices-list-container")
const practiceDetailsContainer = document.querySelector("#practice-details-container")

const sequenceContainer = document.querySelector("#sequence-container")

/*---------------------*/
/*---------------------*/
/*----- Functions -----*/
/*---------------------*/
/*---------------------*/


/*---------------------*/
/*------ Students ------*/
// SignUp --initiates--> SignIn
// SignIn --initiates--> getStudentData
// getStudentData --initiates--> saveStudent
/*---------------------*/

const saveStudent = (res) => {
    store.userToken = res.token
    store.usersName = res.student.name
    store.knownPostures = res.student.knownPostures
    store.favoritedPractices = res.student.favoritedPractices
}
// Not using this function yet
// const getStudentData = () => {
//     getStudent()
//         .then((res) => res.json())
//         .then(res => {
//             saveStudent(res)
//         })
//         .catch(onFailure)
// }
const signInStudent = (studentData) => {
    const formattedData = {
        credentials: {
            email: studentData.credentials.email,
            password: studentData.credentials.password
        }
    }
    signIn(formattedData)
        .then((res) => res.json())
        .then(res => {
            saveStudent(res)
            onSignInSuccess()    
        })
        .catch(onSignInFailure)
}
const signUpStudent = (studentData) => {
    signUp(studentData)
        .then((res) => res.json())
        .then(res => {
            // after successful sign up, auto sign in
            signInStudent(studentData)
        })
        .catch(onSignUpFailure)
}
// TODO: write updateStudent()
// 
// 
// 
// 

// TODO: write deleteStudent()
// 
// 
// 
// 
// 

/*----------------------*/
/*------ Postures ------*/
/*----------------------*/
const showAllPostures = () => {
    getAllPostures()
        .then((res) => res.json())
        .then((res) => {
            store.workingPosturesList = res.postures
            onGetPosturesSuccess(res.postures)
        })
        .catch(onFailure)
}
// Not using this function yet
// const showKnownPostures = (practiceId, sequence, isEditing) => {
//     getKnownPostures()
//         .then((res) => res.json())
//         .then((res) => {
//             // practiceId, sequence,
//             onGetPosturesSuccess(res.postures, isEditing)
//         })
//         .catch(onUnauthorized)
// }
const showPostureDetails = (event) => {
    const id = event.target.getAttribute("data-id")
    if (!id) return
    getPostureById(id)
        .then((res) => res.json())
        .then((res) => onShowPostureSuccess(res.posture))
        .catch(onUnauthorized)
}
const addPostureToKnown = (postureData) => {
    addKnownPosture(postureData)
        .then((res) => {
            // res.json()
            // TODO: handle for success
            messageContainer.innerHTML = "Posture added to Known"
            messageContainer.classList.remove("hide")
        })
        .catch(onFailure)
}
const removePostureFromKnown = (postureData) => {
    removeKnownPosture(postureData)
        .then((res) => {
            // res.json()
            // TODO: handle for success
            messageContainer.innerHTML = "Posture removed from Known"
            messageContainer.classList.remove("hide")
        })
        .catch(onFailure)
}
/*---------------------*/
/*----- Practices -----*/
/*---------------------*/
const showAllPractices = () => {
    getPractices()
    .then((res) => res.json())
    .then((res) => {
        clearBody()
        onShowPracticesSuccess(res.practices)
    })
    .catch(onFailure)
}
const showBuiltPractices = () => {
    getBuiltPractices()
    .then((res) => res.json())
    .then((res) => {
        clearBody()
        onShowPracticesSuccess(res.practices, true)
    })
    .catch(onUnauthorized)
}
// TODO:
// const showFavoritePractices = () => {
// 
// 
// 
// }
const showPracticeDetails = (event) => {
    const id = event.target.getAttribute("data-id")
    if (!id) return
    getPracticeById(id)
        .then((res) => res.json())
        .then((res) => {
            onShowPracticeSuccess(res.practice)
        })
        .catch(onUnauthorized)
}
const showNewPractice = () => {
    //show the form
    showNewPracticeForm()
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
const showEditForm = (practiceId) => {
    getPracticeById(practiceId)
        .then(res => res.json())
        .then(res => {
            clearBody()
            // store the sequence for editing
            store.sequenceBuilderContainer = res.practice.sequence

            // show the edit form
            onShowEditFormSuccess(res)

            // Also show the sequence and known postures
            showSequence(store.sequenceBuilderContainer, true)

            // passing along full posture info, not just the id
            showKnownPosturesList(store.knownPostures, true, res.practice._id)
         })
        .catch(onFailure)
}

/*---------------------------*/
/*---------------------------*/
/*----- Event Listeners -----*/
/*---------------------------*/
/*---------------------------*/


/*----- Header / Nav -----*/
siteTitle.addEventListener("click", (event) => {
    event.preventDefault()
    clearBody()
    landingContainer.classList.remove("hide")
})
mainNav.addEventListener("click", (event) => {
    event.preventDefault()
    const dataEvent = event.target.getAttribute("data-event")

    if (dataEvent === "practice") {
        showAllPractices()
    }
    else if (dataEvent === "create"){
        showNewPractice()
    }
    else if (dataEvent === "posture-library") {
        showAllPostures()
    }
})


/*----- Sign In/Up -----*/
signInOrOutToggle.addEventListener("click", (event) => {
    const dataEvent = event.target.getAttribute("data-event")
    if(dataEvent === "Sign Out") {
        store.userToken = ""
        onSignOutSuccess()
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
    signUpStudent(studentData)
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
landingContainer.addEventListener("click", (event) => {
    event.preventDefault()
    const dataEvent = event.target.getAttribute("data-event")
    
    if (dataEvent === "sign-in-button"){
        clearBody()
        signInAndUpContainer.classList.remove("hide")
    }
})
messageContainer.addEventListener("click", (event) => {
    event.preventDefault()
    const dataEvent = event.target.getAttribute("data-event")
    
    if (dataEvent === "sign-in-button"){
        clearBody()
        signInAndUpContainer.classList.remove("hide")
    }
})
/*----- Page Title nav -----*/

pageTitleContainer.addEventListener("click", (event) => {
	const buttonAction = event.target.getAttribute("data-event")
    
    if(buttonAction === "show-all-postures") {
        showAllPostures()
    }
    else if (buttonAction === "show-known-postures") {
        showKnownPosturesList(store.knownPostures, false, null)
    }
    else if (buttonAction === "show-all-practices") {
        showAllPractices()
    }
    else if (buttonAction === "show-built-practices") {
        showBuiltPractices()
    }
    // TODO:
    // else if (buttonAction === "show-favorite-practices") {
    //     // 
    // }
})

/*----- Postures -----*/

posturesListContainer.addEventListener("click", (event) => {
    const postureId = event.target.getAttribute("data-id")
    const practiceId = event.target.getAttribute("data-destination")
	const buttonAction = event.target.getAttribute("data-event")
    const postureData = {
        posture: postureId
    }
    
    if(buttonAction === "add-known") {
        messageContainer.innerHTML = ""
        event.target.textContent = "Known"

        const postureInfo = store.workingPosturesList.filter(posture => posture._id === postureId)
        store.knownPostures.push(postureInfo[0])
        addPostureToKnown(postureData)
    }
    if(buttonAction === "remove-known") {
        messageContainer.innerHTML = ""
        event.target.textContent = "Unknown"
        const postureIndex = store.knownPostures.indexOf(postureId)
        store.knownPostures.splice(postureIndex, 1)
        removePostureFromKnown(postureData)
    }
    if(buttonAction === "show-details") {
        showPostureDetails(event)
    }
    if(buttonAction === "add-posture-to-sequence-button") {
        const foundPosture = store.knownPostures.filter(knownPosture => knownPosture._id === postureId)[0]
        if(foundPosture) {
            store.sequenceBuilderContainer.push(foundPosture)
            showSequence(store.sequenceBuilderContainer, true)
            // Logic for "Unsaved Changes"
            practiceDetailsContainer.classList.add("unsaved-changes")
            messageContainer.innerHTML = "You have made unsaved changes to this sequence."
            messageContainer.classList.remove("hide")
        }
    }
})
sequenceContainer.addEventListener("click", (event) => {
    const postureIndex = event.target.getAttribute("data-index")
    const postureId = event.target.getAttribute("data-id")
	const buttonAction = event.target.getAttribute("data-event")
    // details button
    if(buttonAction === "posture-details-button") {
        showPostureDetails(event)
    }
    // remove from sequence button
    if(buttonAction === "remove-from-sequence-button") {
        store.sequenceBuilderContainer.splice(postureIndex, 1)
        showSequence(store.sequenceBuilderContainer, true)
        // Logic for "Unsaved Changes"
        practiceDetailsContainer.classList.add("unsaved-changes")
        messageContainer.innerHTML = "You have made unsaved changes to this sequence."
        messageContainer.classList.remove("hide")
    }
})
postureDetailsContainer.addEventListener("click", (event) => {
    const postureId = event.target.getAttribute("data-id")
	const buttonAction = event.target.getAttribute("data-event")

    if(buttonAction === "close-details") {
        messageContainer.innerHTML = ""
        postureDetailsContainer.classList.add("hide")
        postureDetailsContainer.innerHTML = ""
    }
})

/*----- Practices -----*/
practicesListContainer.addEventListener("click", (event) => {
    const practiceId = event.target.getAttribute("data-id")
	const buttonAction = event.target.getAttribute("data-event")
    
    if(buttonAction === "show-details") {
        showPracticeDetails(event)
    }
    if(buttonAction === "edit-practice-button") {
        showEditForm(practiceId)
    }
    if(buttonAction === "first-new-practice-button") {
        showNewPractice()
    }
})
practiceDetailsContainer.addEventListener("change", (event) => {
    // Logic for "Unsaved Changes"
    practiceDetailsContainer.classList.add("unsaved-changes")
    messageContainer.innerHTML = "You have made unsaved changes to this sequence."
    messageContainer.classList.remove("hide")
})
practiceDetailsContainer.addEventListener("submit", (event) => {
    event.preventDefault()
    const practiceId = event.target.getAttribute("data-id")
    
    const practiceData = {
        practice: {
            name: event.target["name"].value,
            style: event.target["style"].value,
            description: event.target["description"].value,
            sequence: store.sequenceBuilderContainer
        },
    }
    if (!practiceId) return
    updatePractice(practiceId, practiceData)
        .then(() => {
            practiceDetailsContainer.classList.remove("unsaved-changes")
            messageContainer.classList.remove("hide")
            messageContainer.innerHTML = "Practice details successfully updated"
        })
        .catch(onFailure)
})
practiceDetailsContainer.addEventListener("click", (event) => {
    const practiceId = event.target.getAttribute("data-id")
    const buttonAction = event.target.getAttribute("data-event")
    
    if(buttonAction === "close-details") {
        messageContainer.innerHTML = ""
        practiceDetailsContainer.classList.add("hide")
        practiceDetailsContainer.innerHTML = ""
        practicesListContainer.classList.remove("hide")
        sequenceContainer.classList.add("hide")
        sequenceContainer.innerHTML = ""
    }

    if (buttonAction === "delete" && practiceId) {
        deletePractice(practiceId)
            .then(() => {
                onDeletePracticeSuccess()
            })
            .catch(onFailure)
    } 
    if(buttonAction === "redirect-after-delete") {
        showBuiltPractices()//direct back to my practices
    }
})