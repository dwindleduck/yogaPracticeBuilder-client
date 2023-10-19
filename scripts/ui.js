import { store } from "./store.js"

/*----- DOM Elements -----*/
const signInOrOutToggle = document.querySelector("#sign-in-or-out-toggle")
const pageTitleContainer = document.querySelector("#page-title-container")
const landingContainer = document.querySelector("#landing-container")
const signInAndUpContainer = document.querySelector("#sign-in-and-up-container")
const signUpForm = document.querySelector("#sign-up-form")
const messageContainer = document.querySelector("#message-container")
const loggedInUserMessageContainer = document.querySelector("#logged-in-user-message-container")
const notLoggedInUserMessageContainer = document.querySelector("#not-logged-in-user-message-container")
const sequenceContainer = document.querySelector("#sequence-container")
const posturesContainer = document.querySelector("#postures-container")
const practicesContainer = document.querySelector("#practices-container")
const practiceBuilderContainer = document.querySelector("#practice-builder-container")
const editPracticeContainer = document.querySelector("#edit-practice-container")
const editorWrapper = document.querySelector("#editor-wrapper")
const detailsContainer = document.querySelector("#details-container")




/*--------------------*/
/*----- Fuctions -----*/
/*--------------------*/
export const clearBody = () => {
    messageContainer.innerHTML = ""
    messageContainer.classList.add("hide")
    landingContainer.classList.add("hide")
    signInAndUpContainer.classList.add("hide")
    posturesContainer.classList.remove("hide")
    posturesContainer.innerHTML = ""
    practicesContainer.innerHTML = ""
    practiceBuilderContainer.innerHTML = ""
    pageTitleContainer.innerHTML = ""
    editPracticeContainer.innerHTML = ""
    sequenceContainer.innerHTML = ""
    detailsContainer.innerHTML = ""
    detailsContainer.classList.add("hide")
    posturesContainer.classList.remove("editing")
    sequenceContainer.classList.remove("editing")
    editorWrapper.classList.remove("editing")
}

/*-----------------------------*/
/*----- Handle for Failue -----*/
/*-----------------------------*/
export const onFailure = (error) => {
    messageContainer.innerHTML = `
        <h4>You've got an error!</h4>
        <p>${error}</p>
    `
    messageContainer.classList.remove("hide")
}
export const onSignInFailure = (error) => {
    messageContainer.innerHTML = `
        <h4>Oh no!</h4>
        <p>Your email or password are incorrect, please try again</p>
    `
    messageContainer.classList.remove("hide")
}
export const onSignUpFailure = (error) => {
    messageContainer.innerHTML = `
        <h4>Sign-up failed.</h4>
        <p>Please enter a valid and unique email address</p>
    `
    messageContainer.classList.remove("hide")
}
export const onUnauthorized = (error) => {
    clearBody()
    messageContainer.innerHTML = `
        <h4>Only registered users can do that!</h4>
        <p>Please sign in or create an account to continue</p>
    `

    messageContainer.classList.remove("hide")
    signInAndUpContainer.classList.remove("hide")
}

/*----------------------*/
/*----- Sign In/Up -----*/
/*----------------------*/
export const onSignInSuccess = () => {
    clearBody()
    signInOrOutToggle.innerHTML = "Sign Out"
    signInOrOutToggle.setAttribute("data-event", "Sign Out")


    landingContainer.classList.remove("hide")
    notLoggedInUserMessageContainer.classList.add("hide")
    loggedInUserMessageContainer.classList.remove("hide")

    loggedInUserMessageContainer.innerHTML = `
        <h2>Welcome, ${store.usersName}!</h2>
        <p>You know ${store.knownPostures.length} postures!</p>
        <p>Look through the library of postures and collect the ones you know.</p>
        <p>Create practices of your own and find new practices to try.</p>
        <p>But no matter what, keep breathing.</p>
        </div>
    `
}
export const onSignOutSuccess = () => {
    signInOrOutToggle.setAttribute("data-event", "Sign In")
    signInOrOutToggle.innerHTML = "Sign In"

    clearBody()
    
    messageContainer.innerHTML = "You've been logged out"
    messageContainer.classList.remove("hide")

    notLoggedInUserMessageContainer.classList.remove("hide")
    loggedInUserMessageContainer.classList.add("hide")

    signInAndUpContainer.classList.remove("hide")
    signUpForm.classList.remove("hide")
}

/*--------------------*/
/*----- Postures -----*/
/*--------------------*/
export const onGetPosturesSuccess = (postures, practiceId, sequence, isEditing) => {
    clearBody()
    const title = document.createElement("h2")
    title.innerText = "Postures"
    pageTitleContainer.appendChild(title)
    
    //button for All that calls showAllPostures
    const allButton = document.createElement("button")
    allButton.textContent = "All"
    allButton.classList.add("all-postures-button")
    pageTitleContainer.appendChild(allButton)

    //button for Known that calls indexKnownPostures
    const knownButton = document.createElement("button")
    knownButton.textContent = "Known"
    knownButton.classList.add("known-postures-button")
    pageTitleContainer.appendChild(knownButton)


    editorWrapper.classList.remove("hide")
    posturesContainer.classList.remove("hide")
    posturesContainer.innerHTML = ""
    if(isEditing) {
        editorWrapper.classList.add("editing")
        posturesContainer.classList.add("editing")
        sequenceContainer.classList.add("editing")

        const sectionTitle = document.createElement("h3")
        sectionTitle.innerText = "Known Postures"
        sectionTitle.classList.add("section-title")
        posturesContainer.appendChild(sectionTitle)
    }

    postures.forEach(posture => {
        const postureWrapper = document.createElement("div")
        postureWrapper.classList.add("posture-wrapper")

        const postureInfo = document.createElement("div")
        postureInfo.innerHTML = `
            <h3>${posture.name}</h3>
            <h4>${posture.translation}</h4>
            <p>${posture.description}</p>
            <img />
            `
        postureWrapper.appendChild(postureInfo)


        const detailsButton = document.createElement("button")
        detailsButton.textContent = "Details"
        detailsButton.setAttribute("data-id", posture._id)
        detailsButton.classList.add("posture-details-button")
        postureWrapper.appendChild(detailsButton)

        const knownButton = document.createElement("button")
        knownButton.textContent = "Add to Known"
        knownButton.setAttribute("data-id", posture._id)
        knownButton.classList.add("add-or-remove-known-posture-button")
        postureWrapper.appendChild(knownButton)

        if(isEditing) {
            //button to add posture to sequence 
            const addToSequenceButton = document.createElement("button")
            addToSequenceButton.textContent = "Add to Sequence"
            addToSequenceButton.setAttribute("data-id", posture._id)
            addToSequenceButton.classList.add("add-posture-to-sequence-button")
            postureWrapper.appendChild(addToSequenceButton)
        }

        posturesContainer.appendChild(postureWrapper)
    })

}
export const onShowPostureSuccess = (posture) => {
    editorWrapper.classList.add("hide")
    posturesContainer.classList.add("hide")
    detailsContainer.classList.remove("hide")
    const postureDetails = document.createElement("div")
    postureDetails.innerHTML = `
        <h3>Details: ${posture.name}</h3>
        <p>Translation: ${posture.translation}</p>
        <p>Portion of Practice: ${posture.portionOfPractice}</p>
        <p>Description: ${posture.description}</p>
        <img />
        <h4>Instructions</h4>
        <p>Breath: ${posture.instructions.breath}</p>
        <p>Time to spend: ${posture.instructions.timeToSpend}</p>
        <p>Gaze: ${posture.instructions.gaze}</p>
        <p>Bandha activation: ${posture.instructions.bandha}</p>
    `
detailsContainer.appendChild(postureDetails)
}

/*---------------------*/
/*----- Practices -----*/
/*---------------------*/
export const onShowPracticesSuccess = (practices, isEditing) => {
    clearBody()
    const title = document.createElement("h2")
    title.innerText = "Practices"
    practicesContainer.classList.remove("hide")
    practicesContainer.appendChild(title)

    // TODO: Add in category nav: All, Built, Favorties

    practices.forEach(practice => {
        const practiceWrapper = document.createElement("div")
        practiceWrapper.classList.add("practice-wrapper")

        const practiceInfo = document.createElement("div")
        practiceInfo.innerHTML = `
            <h3>${practice.name}</h3>
            <p>Style: ${practice.style}</p>
            <p>Description: ${practice.description}</p>
            <img />
        `
        practiceWrapper.appendChild(practiceInfo)

        // Practice Details Button
        const detailsButton = document.createElement("button")
        detailsButton.textContent = "Details"
        detailsButton.setAttribute("data-id", practice._id)
        detailsButton.classList.add("practice-details-button")
        practiceWrapper.appendChild(detailsButton)
       
        // Edit Practice Button
        // TODO: check if the user is the author, show edit button
        if(isEditing) {
            const editButton = document.createElement("button")
            editButton.textContent = "Edit"
            editButton.setAttribute("data-id", practice._id)
            editButton.classList.add("edit-practice-button")
            practiceWrapper.appendChild(editButton)
        }
        practicesContainer.appendChild(practiceWrapper)
    })
}
export const onShowPracticeSuccess = (practice) => {
    detailsContainer.innerHTML = ""

    const practiceInfo = document.createElement("div")
    practiceInfo.innerHTML = `
        <h3>${practice.name}</h3>
        <p>Author: ${practice.author.name}</p>
        <p>Style: ${practice.style}</p>
        <p>Description: ${practice.description}</p>
        <img />
        <h4>Sequence</h4>
    `

    showSequence(practice.sequence)

    detailsContainer.appendChild(practiceInfo)
    detailsContainer.classList.remove("hide")
}

/*-------------------------------*/
/*----- Forms: Create, Edit -----*/
/*-------------------------------*/
export const showNewPracticeForm = () => {
    clearBody()
    const title = document.createElement("h2")
    title.innerText = "Create a New Practice"
    practiceBuilderContainer.appendChild(title)

    const createPracticeForm = document.createElement("div")
    createPracticeForm.innerHTML = `
        <form id="create-new-practice-form">
            <input type="text" name="name" placeholder="name" required/>
            <input type="text" name="style" placeholder="style" required/>
            <textarea name="description" placeholder="description" required></textarea>
            <input type="submit" value="Next" />  
        </form>
    `
    practiceBuilderContainer.appendChild(createPracticeForm)
}
export const showSequence = (sequence) => {
    // TODO: restrict some of this for isEditing
    
    sequenceContainer.innerHTML = ""
    const theSequence = []

    const sectionTitle = document.createElement("h3")
    sectionTitle.innerText = "Sequence"
    sectionTitle.classList.add("section-title")
    sequenceContainer.appendChild(sectionTitle)

    sequence.forEach(posture => {
        theSequence.push(posture)
    })

    for(let i=0; i<theSequence.length; i++) {
        const sequenceWrapper = document.createElement("div")
        sequenceWrapper.classList.add("sequence-wrapper")
        //name
        const name = document.createElement("h4")
        name.innerText = theSequence[i].name
        sequenceWrapper.appendChild(name)
        //details button
        const detailsButton = document.createElement("button")
        detailsButton.textContent = "Details"
        detailsButton.setAttribute("data-id", theSequence[i]._id)
        detailsButton.classList.add(".posture-details-button")

        sequenceWrapper.appendChild(detailsButton)
        sequenceContainer.appendChild(sequenceWrapper)
    }
}  
export const onShowEditFormSuccess = () => {
    practiceBuilderContainer.innerHTML = ""
    editPracticeContainer.innerHTML = ""
    editPracticeContainer.classList.remove("hide")
    posturesContainer.classList.remove("hide")
    sequenceContainer.classList.remove("hide")

    const title = document.createElement("h2")
    title.innerText = `Editing: ${res.practice.name}`
    editPracticeContainer.appendChild(title)
    editPracticeContainer.innerHTML += `
        <button data-event="delete" data-id="${res.practice._id}">Delete this Practice</button>
    
        <form id="editForm" data-id="${res.practice._id}">
            
            <input type="text" id="name" name="name" value="${res.practice.name}" />
            
            <input type="text" id="style" name="style" value="${res.practice.style}" />
            
            <textarea id="description" name="description">${res.practice.description}</textarea>
            <input type="submit" value="Save" />
        </form>
    `
}