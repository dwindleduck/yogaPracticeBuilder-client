import { store } from "./store.js"
import {
    showPostureDetails,
    showPracticeDetails,
    showAllPostures,
    showKnownPostures,
    addPostureToKnown
} from "./app.js"
import { showStudent } from "./api.js"

/*----- DOM Elements -----*/
const landingContainer = document.querySelector("#landing-container")
const signInAndUpContainer = document.querySelector("#sign-in-and-up-container")
const signInForm = document.querySelector("#sign-in-form")
const signUpForm = document.querySelector("#sign-up-form")
const messageContainer = document.querySelector("#message-container")
const loggedInUserMessageContainer = document.querySelector("#logged-in-user-message-container")
const notLoggedInUserMessageContainer = document.querySelector("#not-logged-in-user-message-container")

const posturesContainer = document.querySelector("#postures-container")
const practicesContainer = document.querySelector("#practices-container")
const practiceBuilderContainer = document.querySelector("#practice-builder-container")



/*--------------------*/
/*----- Fuctions -----*/
/*--------------------*/

export const clearBody = () => {
    messageContainer.innerHTML = ""
    landingContainer.classList.add("hide")
    signInAndUpContainer.classList.add("hide")
    posturesContainer.innerHTML = ""
    practicesContainer.innerHTML = ""
    practiceBuilderContainer.innerHTML = ""
}

export const onFailure = (error) => {
    messageContainer.innerHTML = `
        <h3>You've got an error!</h3>
        <p>${error}</p>
    `
}




/*----------------------*/
/*----- Sign In/Up -----*/
/*----------------------*/

export const onSignUpSuccess = () => {
    messageContainer.innerText = "Thanks for creating an account! Please sign in with the password you just created"
    signUpForm.classList.add("hide")
}

export const onSignInSuccess = (userToken) => {
    clearBody()
    store.userToken = userToken
    messageContainer.innerText = "Signed In!"
    landingContainer.classList.remove("hide")
    notLoggedInUserMessageContainer.classList.add("hide")
    loggedInUserMessageContainer.classList.remove("hide")
    showStudent()
        .then(res => res.json())
        .then(res => {
            loggedInUserMessageContainer.innerHTML = `
                <h2>Welcome ${res.student.name}!</h2>
                <div>Most Recently Posted Practice</div>
                <div>Number of built practices and link to list</div>
                <div>
                <p>You know ${res.student.knownPostures.length} postures</p>
                <p>See your list</p>
                <p>Add more postures from the library</p>
                </div>
            `
        })
        .catch(onFailure)
}



/*--------------------*/
/*----- Postures -----*/
/*--------------------*/

export const onIndexPosturesSuccess = (postures) => {
    clearBody()
    const title = document.createElement("h2")
    title.innerText = "Postures"
    posturesContainer.appendChild(title)

 //have buttons inactive if on that page

    //button for All that calls showAllPostures
    const allButton = document.createElement("button")
    allButton.textContent = "All"
    allButton.addEventListener("click", event => {
        showAllPostures()
    })
    posturesContainer.appendChild(allButton)
    //button for Known that calls indexKnownPostures
    const knownButton = document.createElement("button")
    knownButton.textContent = "Known"
    knownButton.addEventListener("click", event => {
        showKnownPostures()
    })
    posturesContainer.appendChild(knownButton)

    postures.forEach(posture => {
        const infoButton = document.createElement('div')
        infoButton.innerHTML = `
        <h3>${posture.name}</h3>
        <h4>${posture.translation}</h4>
        <p>${posture.description}</p>
        <img />
        `
        posturesContainer.appendChild(infoButton)

        const detailsButton = document.createElement("button")
        detailsButton.textContent = "Details"
        // details.classList.add("btn")
        detailsButton.setAttribute("data-id", posture._id)
        detailsButton.addEventListener("click", event => {
            showPostureDetails(event)
        })
        posturesContainer.appendChild(detailsButton)

        const knownButton = document.createElement("button")
        knownButton.textContent = "Add to Known"
        knownButton.setAttribute("data-id", posture._id)
        knownButton.addEventListener("click", event => {
            //add this posture to knownPostures
            addPostureToKnown(posture)
        })
        posturesContainer.appendChild(knownButton)

    })
}


export const onShowPostureSuccess = (posture) => {
    clearBody()

    const div = document.createElement('div')
    div.innerHTML = `
        <h3>${posture.name}</h3>
        <p>${posture.translation}</p>
        <p>${posture.portionOfPractice}</p>
        <p>${posture.description}</p>
        <img />
    `
    //<p>${posture.instructions}</p>
    posturesContainer.appendChild(div)
}





/*---------------------*/
/*----- Practices -----*/
/*---------------------*/
export const onIndexPracticesSuccess = (practices) => {
    clearBody()
    const title = document.createElement("h2")
    title.innerText = "Practices"
    practicesContainer.appendChild(title)

    practices.forEach(practice => {
        const div = document.createElement('div')
        const btn = document.createElement("button")
        btn.textContent = "Details"
        btn.classList.add("btn")
        btn.setAttribute("data-id", practice._id)
        btn.addEventListener("click", event => {
            showPracticeDetails(event)
        })

        div.innerHTML = `
            <h3>${practice.name}</h3>
            <p>${practice.description}</p>
            <img />
        `
        practicesContainer.appendChild(div)
        practicesContainer.appendChild(btn)
    })
}

export const onShowPracticeSuccess = (practice) => {
    clearBody()

    const div = document.createElement('div')
    div.innerHTML = `
        <h3>${practice.name}</h3>
        <p>${practice.description}</p>
        <p>${practice.style}</p>
        <img />
        <h4>Sequence</h4>
    `
    practice.sequence.forEach(posture => {
        const addToSequence = document.createElement('div')
        addToSequence.innerHTML = `
            <h3>${posture.name}</h3>
            <p>${posture.translation}</p>
        `
        div.appendChild(addToSequence)
    })
    practicesContainer.appendChild(div)
}

export const showCreatePracticeForm = () => {
    clearBody()
    const title = document.createElement("h2")
    title.innerText = "Create a New Practice"
    practiceBuilderContainer.appendChild(title)

    const createPracticeForm = document.createElement("div")
    createPracticeForm.innerHTML = `
        <form id="create-new-practice-form">
            <input type="text" name="name" placeholder="name" />
            <input type="text" name="description" placeholder="description" />
            <input type="text" name="style" placeholder="style" />
            <input type="submit" value="Save this Practice" />
        </form>
    `
    practiceBuilderContainer.appendChild(createPracticeForm)
}





