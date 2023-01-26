const landingContainer = document.querySelector("#landing-container")
const signInAndUpContainer = document.querySelector("#sign-in-and-up-container")
const signInForm = document.querySelector("#sign-in-form")
const signUpForm = document.querySelector("#sign-up-form")
const messageContainer = document.querySelector("#message-container")
const loggedInUserMessageContainer = document.querySelector("#logged-in-user-message-container")
const notLoggedInUserMessageContainer = document.querySelector("#not-logged-in-user-message-container")

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

export const onSignInSuccess = () => {
    messageContainer.innerText = "Signed In!"
    signInAndUpContainer.classList.add("hide")
    landingContainer.classList.remove("hide")
    loggedInUserMessageContainer.classList.remove("hide")
    notLoggedInUserMessageContainer.classList.add("hide")
}

export const onIndexPosturesSuccess = (postures) => {

    //posturesContainer.appendChild()
}