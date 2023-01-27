import { store } from "./store.js"
import {showPostureDetails, showPracticeDetails} from "./app.js"

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


export const clearBody = () => {
    messageContainer.innerHTML = ""
    landingContainer.classList.add("hide")
    signInAndUpContainer.classList.add("hide")
    posturesContainer.innerHTML = ""
    practicesContainer.innerHTML = ""
    practiceBuilderContainer.classList.add("hide")
}


export const onFailure = (error) => {
    messageContainer.innerHTML = `
        <h3>You've got an error!</h3>
        <p>${error}</p>
    `
}

export const onSignUpSuccess = () => {
    messageContainer.innerText = "Thanks for creating an account! Please sign in with the password you just created"
    signUpForm.classList.add("hide")
}

export const onSignInSuccess = (userToken) => {
    clearBody()
    store.userToken = userToken
    messageContainer.innerText = "Signed In!"
    landingContainer.classList.remove("hide")
    loggedInUserMessageContainer.classList.remove("hide")
    notLoggedInUserMessageContainer.classList.add("hide")
}

export const onIndexPosturesSuccess = (postures) => {
    clearBody()
    const title = document.createElement("h2")
    title.innerText = "Postures"
    posturesContainer.appendChild(title)

    postures.forEach(posture => {
        const div = document.createElement('div')
        const btn = document.createElement("button")
        btn.textContent = "Details"
        btn.classList.add("btn")
        btn.setAttribute("data-id", posture._id)
        btn.addEventListener("click", event => {
            showPostureDetails(event)
        })

        div.innerHTML = `
            <h3>${posture.name}</h3>
            <h4>${posture.translation}</h4>
            <p>${posture.description}</p>
            <img />
        `
        posturesContainer.appendChild(div)
        posturesContainer.appendChild(btn)
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
        <p>${practice.sequence}</p>
        <img />
    `
    practicesContainer.appendChild(div)
}
