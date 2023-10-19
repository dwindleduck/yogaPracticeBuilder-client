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
const backButton = document.querySelector("#back-button")


const messageContainer = document.querySelector("#message-container")

const loggedInUserMessageContainer = document.querySelector("#logged-in-user-message-container")
const notLoggedInUserMessageContainer = document.querySelector("#not-logged-in-user-message-container")


const showAllPosturesButton = document.querySelector("#all-postures-button")
const showKnownPosturesButton = document.querySelector("#known-postures-button")
const showPostureDetailsButtons = document.querySelectorAll(".posture-details-button")
const addPostureToKnownToggles = document.querySelectorAll(".add-or-remove-known-posture-button")
const addPostureToSequenceButtons = document.querySelectorAll(".add-posture-to-sequence-button")



const editorWrapper = document.querySelector("#editor-wrapper")
const detailsContainer = document.querySelector("#details-container")

const sequenceContainer = document.querySelector("#sequence-container")
const posturesContainer = document.querySelector("#postures-container")
const practicesContainer = document.querySelector("#practices-container")
const practiceBuilderContainer = document.querySelector("#practice-builder-container")
const editPracticeContainer = document.querySelector("#edit-practice-container")

const showPracticeDetailsButtons = document.querySelectorAll(".practice-details-button")
const editPracticeButtons = document.querySelectorAll(".edit-practice-button")




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
// TODO: write updateStudent()

// TODO: write deleteStudent()




/*----------------------*/
/*------ Postures ------*/
/*----------------------*/
export const showAllPostures = () => {
    getAllPostures()
        .then((res) => res.json())
        .then((res) => {
            // onIndexPosturesSuccess(res.postures)
            onGetPosturesSuccess(res.postures)
        })
        .catch(onFailure)
}
export const showKnownPostures = (practiceId, sequence, isEditing) => {
    getKnownPostures()
        .then((res) => res.json())
        .then((res) => {
            onGetPosturesSuccess(res.postures, practiceId, sequence, isEditing)
        })
        .catch(onUnauthorized)
}
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
export const addOrRemovePostureFromKnown = (postureData) => {
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
export const showBuiltPractices = () => {
    getBuiltPractices()
    .then((res) => res.json())
    .then((res) => {
        onShowPracticesSuccess(res.practices)
    })
    .catch(onUnauthorized)
}
const showFavoritePractices = () => {

}
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
backButton.addEventListener("click", (event) => {
    event.preventDefault()

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

/*----- Postures -----*/
showAllPosturesButton.addEventListener("click", (event) => {
    console.log("showAllPosturesButton")
    messageContainer.innerHTML = ""
            editorWrapper.classList.remove("hide")
            detailsContainer.classList.add("hide")
            showAllPostures()
})
showKnownPosturesButton.addEventListener("click", event => {
    console.log("showKnownPosturesButton")
    messageContainer.innerHTML = ""
    editorWrapper.classList.remove("hide")
    detailsContainer.innerHTML = ""
    detailsContainer.classList.add("hide")
    showKnownPostures()
})
showPostureDetailsButtons.forEach(button => {
    console.log("showPostureDetailsButton")
    button.addEventListener("click", event => {
        editorWrapper.classList.add("hide")
        messageContainer.innerHTML = ""
        if(isEditing) {
            editPracticeContainer.classList.add("hide")
            editorWrapper.classList.add("hide")
            editorWrapper.classList.remove("editing")
            sequenceContainer.classList.add("hide")
            sequenceContainer.classList.remove("editing")
            posturesContainer.classList.add("hide")
            posturesContainer.classList.remove("editing")
            messageContainer.style.display = "none"


            //button to go back
            // TODO: move this out to Back Button
            const keepEditing = document.createElement("button")
            keepEditing.textContent = "Keep Editing"
            keepEditing.classList.add("back-button")

            detailsContainer.innerHTML = ""
            detailsContainer.appendChild(keepEditing)

            keepEditing.addEventListener("click", () => {
                messageContainer.style.display = "flex" //?block
                detailsContainer.innerHTML = ""
                detailsContainer.classList.add("hide")
                editPracticeContainer.classList.remove("hide")
                editorWrapper.classList.remove("hide")
                editorWrapper.classList.add("editing")
                sequenceContainer.classList.remove("hide")
                posturesContainer.classList.remove("hide")
                sequenceContainer.classList.add("editing")
                posturesContainer.classList.add("editing")
            })
        }
        showPostureDetails(event)
    })
})
addPostureToKnownToggles.forEach(button => {
    console.log("addPostureToKnownToggle")
    button.addEventListener("click", event => {
        messageContainer.innerHTML = ""
        addOrRemovePostureFromKnown(posture)
    })
})
addPostureToSequenceButtons.forEach(button => {
    button.addEventListener("click", event => {
        //add posture to sequence
        const selectedPostureId = event.target.getAttribute("data-id")
    
        const updatedSequence = sequence
        updatedSequence.push(posture)
    
        const practiceData = {
            practice: {
                sequence: updatedSequence
            }
        }
        updatePractice(practiceId, practiceData)
            .then(() => {
                showSequence(updatedSequence)
            })
            .catch(onFailure)
    })
})

/*----- Practices -----*/
showPracticeDetailsButtons.forEach(button => {
    button.addEventListener("click", event => {
        practicesContainer.classList.add("hide")

        // TODO: Separate out this Back Button
        // backToMyPractices.textContent = "Back to My Practices"
        const backToFindPractice = document.createElement("button")
        backToFindPractice.textContent = "Back"
        backToFindPractice.classList.add("back-button")
        messageContainer.appendChild(backToFindPractice)
        backToFindPractice.addEventListener("click", () => {
            practicesContainer.classList.remove("hide")
            detailsContainer.classList.add("hide")
            detailsContainer.innerHTML = ""
            messageContainer.innerHTML = ""

        })
        showPracticeDetails(event)
    })
})
editPracticeButtons.forEach(button => {
    button.addEventListener("click", event => {
        practicesContainer.classList.add("hide")

        const backToMyPractices = document.createElement("button")
        backToMyPractices.textContent = "Back to My Practices"
        backToMyPractices.classList.add("back-button")
        messageContainer.appendChild(backToMyPractices)

        backToMyPractices.addEventListener("click", () => {
            showBuiltPractices()

            practicesContainer.classList.remove("hide")
            editPracticeContainer.classList.add("hide")
            posturesContainer.classList.add("hide")
            sequenceContainer.classList.add("hide")
            editPracticeContainer.innerHTML = ""
            messageContainer.innerHTML = ""
        })
        showEditForm(practice._id)
    })

})

/*----- Edit -----*/
editPracticeContainer.addEventListener("submit", (event) => {
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
            showEditForm(id)//needs a practiceId
        })
		.catch(onFailure)
})
editPracticeContainer.addEventListener("click", (event) => {
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