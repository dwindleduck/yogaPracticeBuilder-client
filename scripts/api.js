import { store } from "./store.js"

// const BASE_URL = "https://yoga-practice-builder-server.onrender.com/v2"
const BASE_URL = "http://127.0.0.1:8000/v2"

/*----------------------*/
/*----- Sign In/Up -----*/
/*----------------------*/
export const signUp = (data) => {
    return fetch(BASE_URL + "/sign-up", {
        method: "POST",
        headers: {
            "Accept": "application/json",
            "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
    })
}
export const signIn = (data) => {
    return fetch(BASE_URL + "/sign-in", {
        method: "POST",
        headers: {
            "Accept": "application/json",
            "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
    })
}
/*-------------------*/
/*----- Student -----*/
/*-------------------*/
// Currently Unsed
export const getStudent = () => {
    return fetch(BASE_URL + "/student", { 
        headers: {
            "Authorization": `Bearer ${store.userToken}`,
        },
    })
}

// TODO:
// updateStudent
// 
// 
// 

// TODO:
// deleteStudent
// 
// 
// 


/*--------------------*/
/*----- Postures -----*/
/*--------------------*/

// TODO:
// createPosture
// 
// 
// 

// Get All Postures
// return data contains limited details
// return data is paginated
export const getAllPostures = () => {
    return fetch(BASE_URL + "/postures")
}
// Currently Unused
// export const getKnownPostures = () => {
//     return fetch(BASE_URL + `/postures/known`, { 
//         headers: {
//             "Authorization": `Bearer ${store.userToken}`,
//         },
//     })
// }
// Get One Posture
// return data contains full details
export const getPostureById = (id) => {
    return fetch(BASE_URL + `/postures/${id}`, { 
        headers: {
            "Authorization": `Bearer ${store.userToken}`,
        },
    })
}
// Add a posture to the user's list of Known Postures
export const addKnownPosture = (data) => {
    return fetch(BASE_URL + `/postures/add-known`, {
        method: "PATCH",
        headers: {
            "Accept": "application/json",
            "Content-Type": "application/json",
            "Authorization": `Bearer ${store.userToken}`,
        },
        body: JSON.stringify(data)
    })
}
// Remove a posture from the user's list of Known Postures
export const removeKnownPosture = (data) => {
    return fetch(BASE_URL + `/postures/remove-known`, {
        method: "PATCH",
        headers: {
            "Accept": "application/json",
            "Content-Type": "application/json",
            "Authorization": `Bearer ${store.userToken}`,
        },
        body: JSON.stringify(data)
    })
}

// TODO:
// updatePosture ()
// 
// 
// 



// TODO:
// deletePosture ()
// 
// 
// 


/*---------------------*/
/*----- Practices -----*/
/*---------------------*/
// Create a new Practice
export const createPractice = (data) => {
    return fetch(BASE_URL + `/practices`, {
        method: "POST",
        headers: {
            "Accept": "application/json",
            "Content-Type": "application/json",
            "Authorization": `Bearer ${store.userToken}`
        },
        body: JSON.stringify(data)
    })
}
// Get All Practices
// returns paginated data
export const getPractices = () => {
    return fetch(BASE_URL + "/practices")
}
// Get the user's Built Practices
// returns paginated data
export const getBuiltPractices = () => {
    return fetch(BASE_URL + `/practices/author`, { 
        headers: {
            "Authorization": `Bearer ${store.userToken}`,
        },
    })
}

// get favoritePractices
// 
// 
// 
// 

// Get one practice with all details
export const getPracticeById = (id) => {
    return fetch(BASE_URL + `/practices/${id}`, { 
        headers: {
            "Authorization": `Bearer ${store.userToken}`,
        },
    })
}

// updateFavoritePractices
// 
// 
// 
// 

// Update a Practice (user must be author)
export const updatePractice = (id, data) => {
    return fetch(BASE_URL + `/practices/${id}`, {
        method: "PATCH",
        headers: {
            "Accept": "application/json",
            "Content-Type": "application/json",
            "Authorization": `Bearer ${store.userToken}`,
        },
        body: JSON.stringify(data)
    })
}
// Delete a Practice (user must be author)
export const deletePractice = (id) => {
    return fetch(BASE_URL + `/practices/${id}`, {
        headers: {
            "Authorization": `Bearer ${store.userToken}`,
        },
        method: "DELETE"
    })
}