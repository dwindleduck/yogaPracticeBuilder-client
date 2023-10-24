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
    // getKnownPostures,
    addOrRemoveKnownPosture,
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
    showPostureList
} from "./ui.js"

/*----- DOM Elements -----*/

const homeButton = document.querySelector("#home-button")
const signInOrOutToggle = document.querySelector("#sign-in-or-out-toggle")
const navPracticeButton = document.querySelector("#nav-practice-button")
const navCreateButton = document.querySelector("#nav-create-button")
const navPostureLibraryButton = document.querySelector("#nav-posture-library-button")

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

const showAllPosturesButton = document.querySelector("#all-postures-button")



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
const getStudentData = () => {
    getStudent()
        .then((res) => res.json())
        .then(res => {
            saveStudent(res)
        })
        .catch(onFailure)
}
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

// TODO: write deleteStudent()


/*----------------------*/
/*------ Postures ------*/
/*----------------------*/
const showAllPostures = () => {
    getAllPostures()
        .then((res) => res.json())
        .then((res) => {
            onGetPosturesSuccess(res.postures)
        })
        .catch(onFailure)
}
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
const addOrRemovePostureFromKnown = (postureData) => {
    addOrRemoveKnownPosture(postureData)
        .then((res) => {
            // res.json()
            // TODO: handle for success
            messageContainer.innerHTML = "Known Postures updated"
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
        onShowPracticesSuccess(res.practices)
    })
    .catch(onFailure)
}
const showBuiltPractices = () => {
    getBuiltPractices()
    .then((res) => res.json())
    .then((res) => {
        onShowPracticesSuccess(res.practices, true)
    })
    .catch(onUnauthorized)
}
const showFavoritePractices = () => {

}
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
            onShowEditFormSuccess(res)
            // Also show the sequence and known postures
            showSequence(res.practice.sequence)

            // need to pass along full posture info, not just the id
            showPostureList(store.knownPostures, true)
         })
        .catch(onFailure)
}

/*---------------------------*/
/*---------------------------*/
/*----- Event Listeners -----*/
/*---------------------------*/
/*---------------------------*/


/*----- Header / Nav -----*/
homeButton.addEventListener("click", (event) => {
    event.preventDefault()
    clearBody()
    landingContainer.classList.remove("hide")
})
navPracticeButton.addEventListener("click", (event) => {
    event.preventDefault()
    showAllPractices()
})
navCreateButton.addEventListener("click", (event) => {
    event.preventDefault()
    showNewPractice()
})
navPostureLibraryButton.addEventListener("click", (event) => {
    event.preventDefault()
    showAllPostures()
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

/*----- Page Title nav -----*/

pageTitleContainer.addEventListener("click", (event) => {
	const buttonAction = event.target.getAttribute("data-event")
    
    if(buttonAction === "show-all-postures") {
        showAllPostures()
    }
    else if (buttonAction === "show-known-postures") {
        showPostureList(store.knownPostures)
        // showKnownPostures()
    }
    else if (buttonAction === "show-all-practices") {
        showAllPractices()
    }
    else if (buttonAction === "show-built-practices") {
        showBuiltPractices()
    }
    // else if (buttonAction === "show-favorite-practices") {
    //     // 
    // }
})

/*----- Postures -----*/

posturesListContainer.addEventListener("click", (event) => {
    const postureId = event.target.getAttribute("data-id")
	const buttonAction = event.target.getAttribute("data-event")
    const postureData = {
        posture: postureId
    }

    
    if(buttonAction === "known-toggle-add") {
        messageContainer.innerHTML = ""
        // event.target.innerText = "Unknown"
        store.knownPostures.push(postureId)
        addOrRemovePostureFromKnown(postureData)
    }
    if(buttonAction === "known-toggle-remove") {
        messageContainer.innerHTML = ""
        // event.target.innerText = "Known"
        const postureIndex = store.knownPostures.indexOf(postureId)
        store.knownPostures.splice(postureIndex, 1)
        addOrRemovePostureFromKnown(postureData)
    }

    if(buttonAction === "show-details") {
        console.log("showPostureDetailsButton")

        
        showPostureDetails(event)
    }
    if(buttonAction === "add-posture-to-sequence-button") {
        console.log("add-posture-to-sequence-button")
        console.log("NOT IMPLEMENTED")

        // const updatedSequence = sequence
        // updatedSequence.push(posture)
    
        // const practiceData = {
        //     practice: {
        //         sequence: updatedSequence
        //     }
        // }
        // updatePractice(practiceId, practiceData)
        //     .then(() => {
        //         showSequence(updatedSequence)
        //     })
        //     .catch(onFailure)

    }
})
postureDetailsContainer.addEventListener("click", (event) => {
    const postureId = event.target.getAttribute("data-id")
	const buttonAction = event.target.getAttribute("data-event")

    if(buttonAction === "close-details") {
        console.log("closeDetails button")

        messageContainer.innerHTML = ""
        postureDetailsContainer.classList.add("hide")
        postureDetailsContainer.innerHTML = ""
        posturesListContainer.classList.remove("hide")
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
        console.log("Edit Practice Button")
        showEditForm(practiceId)
    }

})
practiceDetailsContainer.addEventListener("click", event => {
    const practiceId = event.target.getAttribute("data-id")
	const buttonAction = event.target.getAttribute("data-event")
    
    if(buttonAction === "close-details") {
        console.log("closeDetails button")
    
        messageContainer.innerHTML = ""
        practiceDetailsContainer.classList.add("hide")
        practiceDetailsContainer.innerHTML = ""

        practicesListContainer.classList.remove("hide")
    }
})

/*----- Edit -----*/
practiceDetailsContainer.addEventListener("submit", (event) => {
    event.preventDefault()
    const id = event.target.getAttribute("data-id")
    
    const practiceData = {
        practice: {
            name: event.target["name"].value,
            style: event.target["style"].value,
            description: event.target["description"].value,
        },
    }
    if (!id) return
    updatePractice(id, practiceData)
        .then(() => {
            console.log("Practice updated")
            showEditForm(id)//needs a practiceId
        })
        .catch(onFailure)
})
practiceDetailsContainer.addEventListener("click", (event) => {
    const id = event.target.getAttribute("data-id")
    const buttonAction = event.target.getAttribute("data-event")
    if (buttonAction === "delete" && id) {
        deletePractice(id)
            .then(() => {
                showBuiltPractices()//direct back to my practices
            })
            .catch(onFailure)
    } 
})