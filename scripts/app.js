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
    onGetPosturesSuccess
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
const showKnownPostures = (practiceId, sequence, isEditing) => {
    getKnownPostures()
        .then((res) => res.json())
        .then((res) => {
            onGetPosturesSuccess(res.postures, practiceId, sequence, isEditing)
        })
        .catch(onUnauthorized)
}
const showPostureDetails = (event) => {
    const id = event.target.getAttribute("data-id")
    if (!id) return
    getPostureById(id)
        .then((res) => res.json())
        .then((res) => {
            onShowPostureSuccess(res.posture)
        })
        .catch(onUnauthorized)
}
const addOrRemovePostureFromKnown = (postureData) => {
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
        onShowPracticesSuccess(res.practices)
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
            onShowEditFormSuccess()
            showSequence(res.practice.sequence)
            showKnownPostures(res.practice._id, res.practice.sequence, true) //expecting isEditing = true
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
// backButton.addEventListener("click", (event) => {
//     event.preventDefault()

// })

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
        console.log("showAllPosturesButton")
        // messageContainer.innerHTML = ""
        // posturesListContainer.classList.remove("hide")
        // postureDetailsContainer.classList.add("hide")
        showAllPostures()
    }
    else if (buttonAction === "show-known-postures") {
        console.log("showKnownPosturesButton")
        // messageContainer.innerHTML = ""
        // editorWrapper.classList.remove("hide")
        // detailsContainer.innerHTML = ""
        // detailsContainer.classList.add("hide")
        showKnownPostures()
    }


    // add nav functionality for practices (all, built, favorites)



})



/*----- Postures -----*/

posturesListContainer.addEventListener("click", (event) => {
    const id = event.target.getAttribute("data-id")
	const buttonAction = event.target.getAttribute("data-event")
    
    if(buttonAction === "known-toggle") {
        console.log("addPostureToKnownToggle")
        messageContainer.innerHTML = ""
        addOrRemovePostureFromKnown(id)
    }

    if(buttonAction === "show-details") {
        console.log("showPostureDetailsButton")
    }


})


