import { store } from "./store.js"

/*----- DOM Elements -----*/
const signInOrOutToggle = document.querySelector("#sign-in-or-out-toggle")
const mainNav = document.querySelector("#main-nav")

const pageTitleContainer = document.querySelector("#page-title-container")
const landingContainer = document.querySelector("#landing-container")
const signInAndUpContainer = document.querySelector("#sign-in-and-up-container")
const signUpForm = document.querySelector("#sign-up-form")
const messageContainer = document.querySelector("#message-container")
const loggedInUserMessageContainer = document.querySelector("#logged-in-user-message-container")
const notLoggedInUserMessageContainer = document.querySelector("#not-logged-in-user-message-container")

const newPracticeFormContatiner = document.querySelector("#create-new-practice-form-container")

const posturesListContainer = document.querySelector("#postures-list-container")
const postureDetailsContainer = document.querySelector("#posture-details-container")

const practicesListContainer = document.querySelector("#practices-list-container")
const practiceDetailsContainer = document.querySelector("#practice-details-container")

const sequenceContainer = document.querySelector("#sequence-container")


/*--------------------*/
/*----- Fuctions -----*/
/*--------------------*/
export const clearBody = () => {
    messageContainer.innerHTML = ""
    messageContainer.classList.add("hide")

    landingContainer.classList.add("hide")
    signInAndUpContainer.classList.add("hide")

    pageTitleContainer.innerHTML = ""

    newPracticeFormContatiner.innerHTML = ""
    newPracticeFormContatiner.classList.add("hide")

    posturesListContainer.innerHTML = ""
    posturesListContainer.classList.add("hide")

    postureDetailsContainer.innerHTML = ""
    postureDetailsContainer.classList.add("hide")

    practicesListContainer.innerHTML = ""
    practicesListContainer.classList.add("hide")
    

    practiceDetailsContainer.innerHTML = ""
    practiceDetailsContainer.classList.add("hide")
    practiceDetailsContainer.classList.remove("editing")
    practiceDetailsContainer.classList.remove("unsaved-changes")

    sequenceContainer.innerHTML = ""
    sequenceContainer.classList.add("hide")
    sequenceContainer.classList.remove("editing")
}

/*-----------------------------*/
/*----- Handle for Failue -----*/
/*-----------------------------*/
export const onFailure = (error) => {
    console.error(error)
    messageContainer.innerHTML = `
        <h4>You've got an error!</h4>
        <p>${error}</p>
    `
    messageContainer.classList.remove("hide")
}
export const onSignInFailure = (error) => {
    console.error(error)
    messageContainer.innerHTML = `
        <h4>Oh no!</h4>
        <p>Your email or password are incorrect, please try again</p>
    `
    messageContainer.classList.remove("hide")
}
export const onSignUpFailure = (error) => {
    console.error(error)
    messageContainer.innerHTML = `
        <h4>Sign-up failed.</h4>
        <p>Please enter a valid and unique email address</p>
    `
    messageContainer.classList.remove("hide")
}
export const onUnauthorized = (error) => {
    console.error(error)
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
export const showPostureList = (postures, isEditing, practiceId) => {

    posturesListContainer.classList.remove("hide")
    posturesListContainer.innerHTML = ""

    


    if(postures.length===0){
        posturesListContainer.innerHTML = "No postures to display"
    } else {
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
            detailsButton.setAttribute("data-event", "show-details")
            detailsButton.classList.add("posture-details-button")
            postureWrapper.appendChild(detailsButton)


        // if(!isEditing){
            const knownButton = document.createElement("button")
            knownButton.setAttribute("data-id", posture._id)
            knownButton.classList.add("add-or-remove-known-posture-button")

            // if the posture is known, mark the button as known
            if(store.knownPostures.filter(knownPosture => knownPosture._id === posture._id).length > 0){
                knownButton.textContent = "Known"
                knownButton.setAttribute("data-event", "remove-known")
            }
            else {
                knownButton.textContent = "Unknown"
                knownButton.setAttribute("data-event", "add-known")
            }
            postureWrapper.appendChild(knownButton)
        // }
            posturesListContainer.appendChild(postureWrapper)
        })
    }

}
export const showKnownPosturesList = (postures, isEditing, practiceId) => {
    posturesListContainer.classList.remove("hide")
    posturesListContainer.innerHTML = ""

    if(postures.length===0){
        posturesListContainer.innerHTML = "No Known Postures"
    } else {
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
            detailsButton.setAttribute("data-event", "show-details")
            detailsButton.classList.add("posture-details-button")
            postureWrapper.appendChild(detailsButton)

            // TODO: need option to remove posture from knownPostures
            
            if(isEditing) {
                //button to add posture to sequence 
                const addToSequenceButton = document.createElement("button")
                addToSequenceButton.textContent = "Add to Sequence"
                addToSequenceButton.setAttribute("data-id", posture._id)
                addToSequenceButton.setAttribute("data-destination", practiceId)
                addToSequenceButton.setAttribute("data-event", "add-posture-to-sequence-button")
                addToSequenceButton.classList.add("add-posture-to-sequence-button")
                postureWrapper.appendChild(addToSequenceButton)
            }
            posturesListContainer.appendChild(postureWrapper)

        })
    }
}
export const onGetPosturesSuccess = (postures, isEditing) => {

    clearBody()
    const title = document.createElement("h2")
    title.innerText = "Postures"
    pageTitleContainer.appendChild(title)
    
    //button for All that calls showAllPostures
    const allButton = document.createElement("button")
    allButton.textContent = "All"
    allButton.classList.add("all-postures-button")
    allButton.setAttribute("data-event", "show-all-postures")
    pageTitleContainer.appendChild(allButton)

    //button for Known that calls indexKnownPostures
    const knownButton = document.createElement("button")
    knownButton.textContent = "Known"
    knownButton.classList.add("known-postures-button")
    knownButton.setAttribute("data-event", "show-known-postures")
    pageTitleContainer.appendChild(knownButton)



    // if(isEditing) {
    //     editorWrapper.classList.add("editing")
    //     posturesContainer.classList.add("editing")
    //     sequenceContainer.classList.add("editing")

    //     const sectionTitle = document.createElement("h3")
    //     sectionTitle.innerText = "Known Postures"
    //     sectionTitle.classList.add("section-title")
    //     posturesContainer.appendChild(sectionTitle)
    // }


    showPostureList(postures, isEditing)

}
export const onShowPostureSuccess = (posture) => {
    messageContainer.innerHTML = ""
    posturesListContainer.classList.add("hide")
    practiceDetailsContainer.classList.add("hide")
    postureDetailsContainer.classList.remove("hide")

    const closeDetailsButton = document.createElement("button")
    closeDetailsButton.textContent = "Close Details"
    closeDetailsButton.setAttribute("data-id", posture._id)
    closeDetailsButton.setAttribute("data-event", "close-details")
    closeDetailsButton.classList.add("posture-details-button")
   
    const postureDetails = document.createElement("div")
    postureDetails.appendChild(closeDetailsButton)


    postureDetails.innerHTML += `
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
    postureDetailsContainer.appendChild(postureDetails)
}

/*---------------------*/
/*----- Practices -----*/
/*---------------------*/

export const showSequence = (sequence, isEditing) => {
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
        detailsButton.setAttribute("data-event", "posture-details-button")
        detailsButton.classList.add(".posture-details-button")
        sequenceWrapper.appendChild(detailsButton)

        if(isEditing){
            // remove from sequence button
            const removeFromSequenceButton = document.createElement("button")
            removeFromSequenceButton.textContent = "Remove"
            removeFromSequenceButton.setAttribute("data-id", theSequence[i]._id)
            removeFromSequenceButton.setAttribute("data-index", i)
            removeFromSequenceButton.setAttribute("data-event", "remove-from-sequence-button")
            removeFromSequenceButton.classList.add(".remove-from-sequence-button")
            sequenceWrapper.appendChild(removeFromSequenceButton)
        }

        sequenceContainer.appendChild(sequenceWrapper)
    }
    sequenceContainer.classList.remove("hide")
    practiceDetailsContainer.appendChild(sequenceContainer)
}  
export const onShowPracticesSuccess = (practices, isEditing) => {
    practicesListContainer.innerHTML = ""
    pageTitleContainer.innerHTML = ""

    // clearBody()
    const title = document.createElement("h2")
    title.innerText = "Practices"
    practicesListContainer.classList.remove("hide")
    practicesListContainer.appendChild(title)

    //button for All Practices
    const allButton = document.createElement("button")
    allButton.textContent = "All"
    allButton.classList.add("all-practices-button")
    allButton.setAttribute("data-event", "show-all-practices")
    pageTitleContainer.appendChild(allButton)

    //button for Built Practices
    const builtButton = document.createElement("button")
    builtButton.textContent = "Built"
    builtButton.classList.add("built-practices-button")
    builtButton.setAttribute("data-event", "show-built-practices")
    pageTitleContainer.appendChild(builtButton)

    // buttton for Favorite Practices
    // 
    // 
    // 
    // 

    if(practices.length===0) {
        const practiceWrapper = document.createElement("div")
        // practiceWrapper.classList.add("practice-wrapper")
        const practiceInfo = document.createElement("div")

        // TODO: add in a link to create a new practice
        practiceInfo.innerHTML = `
            <h3>You have not built any Practices yet!</h3>
        `
        const firstNewPracticeButton = document.createElement("button")
        firstNewPracticeButton.textContent = "Create your first Practice"
        firstNewPracticeButton.classList.add("first-new-practice-button")
        firstNewPracticeButton.setAttribute("data-event", "first-new-practice-button")
        practiceInfo.appendChild(firstNewPracticeButton)
        practiceWrapper.appendChild(practiceInfo)
        practicesListContainer.appendChild(practiceWrapper)
    } else {
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
            detailsButton.setAttribute("data-event", "show-details")
            detailsButton.classList.add("practice-details-button")
            practiceWrapper.appendChild(detailsButton)
        
            // Edit Practice Button
            // TODO: check if the user is the author, show edit button
            if(isEditing) {
                const editButton = document.createElement("button")
                editButton.textContent = "Edit"
                editButton.setAttribute("data-id", practice._id)
                editButton.setAttribute("data-event", "edit-practice-button")
                editButton.classList.add("edit-practice-button")
                practiceWrapper.appendChild(editButton)
            }
            practicesListContainer.appendChild(practiceWrapper)
        })
    }
}
export const onShowPracticeSuccess = (practice) => {
    practicesListContainer.classList.add("hide")
    // practiceDetailsContainer.innerHTML = ""
    // practiceDetailsContainer.classList.remove("hide")

    const closeDetailsButton = document.createElement("button")
    closeDetailsButton.textContent = "Close Details"
    closeDetailsButton.setAttribute("data-id", practice._id)
    closeDetailsButton.setAttribute("data-event", "close-details")
    closeDetailsButton.classList.add("practice-details-button")


    const practiceInfo = document.createElement("div")
    practiceInfo.appendChild(closeDetailsButton)

    practiceInfo.innerHTML += `
        <h3>${practice.name}</h3>
    `
    if (practice.author){
    practiceInfo.innerHTML += `
        <p>Author: ${practice.author.name}</p>
    `}
    practiceInfo.innerHTML += `
        <p>Style: ${practice.style}</p>
        <p>Description: ${practice.description}</p>
        <img />
    `
    practiceDetailsContainer.classList.remove("hide")
    practiceDetailsContainer.appendChild(practiceInfo)

    showSequence(practice.sequence)
}

/*-------------------------------*/
/*----- Forms: Create, Edit -----*/
/*-------------------------------*/
export const showNewPracticeForm = () => {
    clearBody()
    const title = document.createElement("h2")
    title.innerText = "Create a New Practice"
    newPracticeFormContatiner.appendChild(title)

    const createPracticeForm = document.createElement("div")
    createPracticeForm.innerHTML = `
        <form id="create-new-practice-form">
            <input type="text" name="name" placeholder="name" required/>
            <input type="text" name="style" placeholder="style" required/>
            <textarea name="description" placeholder="description" required></textarea>
            <input type="submit" value="Next" />  
        </form>
    `
    newPracticeFormContatiner.appendChild(createPracticeForm)
    newPracticeFormContatiner.classList.remove("hide")
}
export const onShowEditFormSuccess = (res) => {
    
    practicesListContainer.classList.add("hide")
    practiceDetailsContainer.innerHTML = ""
    
    const title = document.createElement("h2")
    title.innerText = `Editing: ${res.practice.name}`

    practiceDetailsContainer.appendChild(title)
    practiceDetailsContainer.innerHTML += `
        <button data-event="delete" data-id="${res.practice._id}">Delete this Practice</button>
    
        <form id="editForm" data-id="${res.practice._id}">
            
            <input type="text" id="name" name="name" value="${res.practice.name}" />
            
            <input type="text" id="style" name="style" value="${res.practice.style}" />
            
            <textarea id="description" name="description">${res.practice.description}</textarea>
            <input type="submit" value="Save" />
        </form>
    `
    practiceDetailsContainer.classList.remove("hide")
}

export const onDeletePracticeSuccess = () => {
    clearBody()
    messageContainer.classList.remove("hide")
    messageContainer.innerHTML = "Practice successfully deleted"

    // button for redirect after delete
    const redirectButton = document.createElement("button")
    redirectButton.textContent = "My Built Practices"
    // redirectButton.setAttribute("data-id", practice._id)
    redirectButton.setAttribute("data-event", "redirect-after-delete")
    redirectButton.classList.add("redirect-after-delete")
    practiceDetailsContainer.appendChild(redirectButton)

    practiceDetailsContainer.classList.remove("hide")
    practiceDetailsContainer.classList.remove("unsaved-changes")
}