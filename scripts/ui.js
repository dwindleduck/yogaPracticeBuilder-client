import { store } from "./store.js"
import {
    showPostureDetails,
    showPracticeDetails,
    showAllPostures,
    showKnownPostures,
    addPostureToKnown,
    showBuiltPractices
} from "./app.js"
import { showPracticeById, showStudent, updatePractice,deletePractice } from "./api.js"

/*----- DOM Elements -----*/

const signInButton = document.querySelector("#sign-in-button")
const signOutButton = document.querySelector("#sign-out-button")

const pageTitleContainer = document.querySelector("#page-title-container")
const landingContainer = document.querySelector("#landing-container")
const signInAndUpContainer = document.querySelector("#sign-in-and-up-container")
const signInForm = document.querySelector("#sign-in-form")
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
    landingContainer.classList.add("hide")
    signInAndUpContainer.classList.add("hide")
    posturesContainer.classList.remove("hide")
    posturesContainer.innerHTML = ""
    practicesContainer.innerHTML = ""
    practiceBuilderContainer.innerHTML = ""
    pageTitleContainer.innerHTML = ""
    editPracticeContainer.innerHTML = ""
    sequenceContainer.innerHTML = ""
    detailsContainer.classList.add("hide")
    posturesContainer.classList.remove("editing")
    sequenceContainer.classList.remove("editing")
    editorWrapper.classList.remove("editing")
}

export const onFailure = (error) => {
    //console.log(error)
    messageContainer.innerHTML = `
        <h3>You've got an error!</h3>
        <p>${error}</p>
    `
}
export const onSignInFailure = (error) => {
    messageContainer.innerHTML = `
        <h3>Oh no!</h3>
        <p>Your email or password are incorrect, please try again</p>
    `
}
export const onUnauthorized = (error) => {
    clearBody()
    messageContainer.innerHTML = `
    <p>Only registered users can do that!</p>    
    <p>Please sign in or create an account to continue</p>
    `
    signInAndUpContainer.classList.remove("hide")
    //back button
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
    // messageContainer.innerText = "Signed In!"

    signInButton.classList.add("hide")
    signOutButton.classList.remove("hide")

    landingContainer.classList.remove("hide")
    notLoggedInUserMessageContainer.classList.add("hide")
    loggedInUserMessageContainer.classList.remove("hide")
    showStudent()
        .then(res => res.json())
        .then(res => {
            loggedInUserMessageContainer.innerHTML = `
                <h2>Welcome, ${res.student.name}!</h2>
                <p>You know ${res.student.knownPostures.length} postures!</p>
                </div>
            `
        })
        .catch(onFailure)
}




/*--------------------*/
/*----- Postures -----*/
/*--------------------*/

const writePageTitle = (pageTitle) => {
    clearBody()
    const title = document.createElement("h2")
    title.innerText = pageTitle
    pageTitleContainer.appendChild(title)

 //...have buttons inactive if on that page
    
    if(pageTitle === "Postures") {
        //button for All that calls showAllPostures
        const allButton = document.createElement("button")
        allButton.textContent = "All"
        allButton.addEventListener("click", event => {
            showAllPostures()
        })
        pageTitleContainer.appendChild(allButton)
        //button for Known that calls indexKnownPostures
        const knownButton = document.createElement("button")
        knownButton.textContent = "Known"
        knownButton.addEventListener("click", event => {
            messageContainer.innerHTML = ""
            showKnownPostures()
        })
        pageTitleContainer.appendChild(knownButton)
    }
}

export const onIndexPosturesSuccess = (postures) => {
    writePageTitle("Postures")

    

    postures.forEach(posture => {
        const postureWrapper = document.createElement("div")
        postureWrapper.classList.add("posture-wrapper")
    

        const info = document.createElement('div')
        info.innerHTML = `
        <h3>${posture.name}</h3>
        <h4>${posture.translation}</h4>
        <p>${posture.description}</p>
        <img />
        `
        postureWrapper.appendChild(info)

        const detailsButton = document.createElement("button")
        detailsButton.textContent = "Details"
        detailsButton.setAttribute("data-id", posture._id)
        detailsButton.addEventListener("click", event => {
            messageContainer.innerHTML = ""
            showPostureDetails(event)
        })
        postureWrapper.appendChild(detailsButton)

        const knownButton = document.createElement("button")
        knownButton.textContent = "Add to Known"
        knownButton.setAttribute("data-id", posture._id)
        knownButton.addEventListener("click", event => {
            messageContainer.innerHTML = ""
            //add this posture to knownPostures
            addPostureToKnown(posture)
        })
        postureWrapper.appendChild(knownButton)

        posturesContainer.appendChild(postureWrapper)
    })
}

export const onIndexKnownPosturesSuccess = (postures, practiceId, sequence, isEditing) => {
    //Maybe add to "selectFromKnownPostures" container instead of posturesContainer???
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

        const postureInfo = document.createElement('div')
        postureInfo.innerHTML = `
        <h3>${posture.name}</h3>
        <h4>${posture.translation}</h4>
        <p>${posture.description}</p>
        <img />
        `
        postureWrapper.appendChild(postureInfo)
        
        if(isEditing) {
            //button to add posture to sequence 
            const addToSequenceButton = document.createElement("button")
            addToSequenceButton.textContent = "Add to Sequence"
            addToSequenceButton.setAttribute("data-id", posture._id)
            // addToSequenceButton.setAttribute("data-event", "add-to-sequence")
            addToSequenceButton.addEventListener("click", event => {
                //add posture to sequence
                const selectedPostureId = event.target.getAttribute("data-id")

         
                const updatedSequence = sequence
                updatedSequence.push(posture)

                const practiceData = {
                    practice: {
                        sequence: updatedSequence
                    }
                }
                //console.log(practiceData)

                //call api fetch 
                updatePractice(practiceId, practiceData)
                    .then(() => {
                        //update the dom
                        showSequence(practiceId)
                        
                    })
                    .catch(onFailure)

                

            })
            postureWrapper.appendChild(addToSequenceButton)
        }


        //Details Button
        const detailsButton = document.createElement("button")
        detailsButton.textContent = "Details"
        detailsButton.setAttribute("data-id", posture._id)
        detailsButton.addEventListener("click", event => {
          if(isEditing) {
                editPracticeContainer.classList.add("hide")
                sequenceContainer.classList.add("hide")
                posturesContainer.classList.add("hide")
                messageContainer.innerHTML = ""
            
                //create a button to go back...
                const keepEditing = document.createElement("button")
                keepEditing.textContent = "Keep Editing"
                keepEditing.classList.add("back-button")
                messageContainer.appendChild(keepEditing)
                keepEditing.addEventListener("click", () => {
                    messageContainer.innerHTML = ""
                    detailsContainer.innerHTML = ""
                    detailsContainer.classList.add("hide")
                    editPracticeContainer.classList.remove("hide")
                    sequenceContainer.classList.remove("hide")
                    posturesContainer.classList.remove("hide")
                })
            
            }
            showPostureDetails(event)
        })
        postureWrapper.appendChild(detailsButton)
        posturesContainer.appendChild(postureWrapper)
    })
}

export const onShowPostureSuccess = (posture) => {
    //clearBody()
    posturesContainer.classList.add("hide")
    detailsContainer.classList.remove("hide")
    detailsContainer.innerHTML = ""
    const div = document.createElement('div')
    div.innerHTML = `
        <h3>${posture.name}</h3>
        <p>${posture.translation}</p>
        <p>${posture.portionOfPractice}</p>
        <p>${posture.description}</p>
        <img />
    `
    //<p>${posture.instructions}</p>
    detailsContainer.appendChild(div)
}





/*---------------------*/
/*----- Practices -----*/
/*---------------------*/
export const onIndexPracticesSuccess = (practices) => {
    clearBody()
    const title = document.createElement("h2")
    title.innerText = "Practices"
    practicesContainer.classList.remove("hide")
    practicesContainer.appendChild(title)

    practices.forEach(practice => {
        const div = document.createElement('div')
        div.innerHTML = `
            <h3>${practice.name}</h3>
            <p>${practice.description}</p>
            <img />
        `
        practicesContainer.appendChild(div)
        
        const detailsButton = document.createElement("button")
        detailsButton.textContent = "Details"
        detailsButton.setAttribute("data-id", practice._id)
        detailsButton.addEventListener("click", event => {
            practicesContainer.classList.add("hide")
            /////////////
            //button for back to Find a Practice

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
        practicesContainer.appendChild(detailsButton)

        //IF practice.author === user
        // const editButton = document.createElement("button")
        // editButton.textContent = "Edit"
        // editButton.setAttribute("data-id", practice._id)
        // editButton.addEventListener("click", event => {
        //     //showEditPage(event)
        // })
        // practicesContainer.appendChild(editButton)

        
    })
}
export const onIndexBuiltPracticesSuccess = (practices) => {
    clearBody()
    const title = document.createElement("h2")
    title.innerText = "My Practices"
    //maybe this should go in the pageTitleContainer
    practicesContainer.classList.remove("hide")
    practicesContainer.appendChild(title)

//button for my built practices
//button for favorited practices




    practices.forEach(practice => {
        const div = document.createElement('div')
        div.innerHTML = `
            <h3>${practice.name}</h3>
            <p>${practice.style}</p>
            <p>${practice.description}</p>
            <img />
        `
        practicesContainer.appendChild(div)
        
        const detailsButton = document.createElement("button")
        detailsButton.textContent = "Details"
        detailsButton.setAttribute("data-id", practice._id)
        detailsButton.addEventListener("click", event => {
            //keep practicesContainer as is, but hide it
            practicesContainer.classList.add("hide")

            //button for "Back to My Practices"
            //??show messageContainer

            const backToMyPractices = document.createElement("button")
            backToMyPractices.textContent = "Back to My Practices"
            backToMyPractices.classList.add("back-button")
            messageContainer.appendChild(backToMyPractices)
            backToMyPractices.addEventListener("click", () => {
                /////////////////////////////
                
                practicesContainer.classList.remove("hide")
                detailsContainer.classList.add("hide")
                detailsContainer.innerHTML = ""
                messageContainer.innerHTML = ""

            })


            showPracticeDetails(event)
        })
        practicesContainer.appendChild(detailsButton)


        const editButton = document.createElement("button")
        editButton.textContent = "Edit"
        editButton.setAttribute("data-id", practice._id)
        editButton.addEventListener("click", event => {
            //console.log(practice._id)

            practicesContainer.classList.add("hide")

            const backToMyPractices = document.createElement("button")
            backToMyPractices.textContent = "Back to My Practices"
            backToMyPractices.classList.add("back-button")
            messageContainer.appendChild(backToMyPractices)
            backToMyPractices.addEventListener("click", () => {
                ///////////////////////////////////////
                //need to refresh the list of practicesto catch any changes that have been made
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
        practicesContainer.appendChild(editButton)

        
    })
}

export const onShowPracticeSuccess = (practice) => {
    //clearBody()
    //do the same thing I did to onShowPostureSuccess
    //practicesContainer.classList.add("hide")
    detailsContainer.innerHTML = ""
    


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
    
    detailsContainer.appendChild(div)
    detailsContainer.classList.remove("hide")
}


/*-------------------------------*/
/*----- Forms: Create, Edit -----*/
/*-------------------------------*/
export const showCreatePracticeForm = () => {
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

const showSequence = (practiceId) => {
    
    
    sequenceContainer.innerHTML = ""

    const theSequence = []
    //console.log(`practiceId: ${practiceId}`)

    showPracticeById(practiceId)
        .then(res => res.json())
        .then(res => {
            
            const sectionTitle = document.createElement("h3")
            sectionTitle.innerText = "Sequence"
            sectionTitle.classList.add("section-title")
            sequenceContainer.appendChild(sectionTitle)

            res.practice.sequence.forEach(posture => {
                theSequence.push(posture)
            })

            

            for(let i=0; i<theSequence.length; i++) {
                const sequenceWrapper = document.createElement("div")
                sequenceWrapper.classList.add("sequence-wrapper")
                //name
                const name = document.createElement("h4")
                name.innerText = theSequence[i].name
                //sequenceContainer.appendChild(name)
                sequenceWrapper.appendChild(name)
                //details button
                const detailsButton = document.createElement("button")
                detailsButton.textContent = "Details"
                detailsButton.setAttribute("data-id", theSequence[i]._id)
                detailsButton.addEventListener("click", event => {
                    editPracticeContainer.classList.add("hide")
                    sequenceContainer.classList.add("hide")
                    posturesContainer.classList.add("hide")
                    messageContainer.innerHTML = ""
                    //create a button to go back...
                    const keepEditing = document.createElement("button")
                    keepEditing.textContent = "Keep Editing"
                    keepEditing.classList.add("back-button")
                    messageContainer.appendChild(keepEditing)
                    keepEditing.addEventListener("click", () => {
                        messageContainer.innerHTML = ""
                        detailsContainer.innerHTML = ""
                        detailsContainer.classList.add("hide")
                        editPracticeContainer.classList.remove("hide")
                        sequenceContainer.classList.remove("hide")
                        posturesContainer.classList.remove("hide")
                    })
                    showPostureDetails(event)
                })
                
                sequenceWrapper.appendChild(detailsButton)

                sequenceContainer.appendChild(sequenceWrapper)
            
            }
            
        })
        .catch(onFailure)
    //console.log(`before return${theSequence}`)
    return theSequence
}  

//export const showEditForm = (practice) => {
export const showEditForm = (practiceId) => {
    

    showPracticeById(practiceId)
        .then(res => res.json())
        .then(res => {
            

            //console.log(res.practice)
            
            //clearBody()
            practiceBuilderContainer.innerHTML = ""
            editPracticeContainer.innerHTML = ""
            editPracticeContainer.classList.remove("hide")
            posturesContainer.classList.remove("hide")
            sequenceContainer.classList.remove("hide")


            const title = document.createElement("h2")
            title.innerText = res.practice.name
            editPracticeContainer.appendChild(title)
        
            editPracticeContainer.innerHTML += `
                <button data-event="delete" data-id="${res.practice._id}">Delete this Practice</button>
            
                <form id="editForm" data-id="${res.practice._id}">
                    
                    <input type="text" name="name" value="${res.practice.name}" />
                    <input type="text" name="style" value="${res.practice.style}" />
                    <textarea name="description">${res.practice.description}</textarea>
                    <input type="submit" value="Save" />
                </form>
            `
            //show practice.sequence
            //returns the sequence
            //console.log(showSequence(practice._id))
            //console.log(practice._id)
            const sequence = showSequence(res.practice._id)
            //console.log(sequence)
        
            //show users known postures
            showKnownPostures(res.practice._id, sequence, true) //expecting isEditing = true
        })
        .catch(onFailure)
}




/*----------------*/
/*----- Edit -----*/
/*----------------*/
editPracticeContainer.addEventListener("submit", (event) => {
    event.preventDefault()
	const id = event.target.getAttribute("data-id")
	
	const practiceData = {
		practice: {
			name: event.target['name'].value,
			style: event.target['style'].value,
			description: event.target['description'].value,
            
		},
	}
	if (!id) return
    updatePractice(id, practiceData)
		.then(showEditForm(id))//needs a practiceId
		.catch(onFailure)

})

editPracticeContainer.addEventListener('click', (event) => {
	const id = event.target.getAttribute('data-id')
	const buttonAction = event.target.getAttribute("data-event")

	if (buttonAction === "delete" && id) {
		//console.log("clicked delete button")
        deletePractice(id)
			.then(showBuiltPractices)//direct back to my practices
			.catch(onFailure)
	} 

   


})





