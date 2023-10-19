import { store } from "./store.js"

// const BASE_URL = "https://yoga-practice-builder-server.onrender.com"
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

export const getStudent = () => {
    return fetch(BASE_URL + "/student", { 
        headers: {
            "Authorization": `Bearer ${store.userToken}`,
        },
    })
}

// TODO:
// updateStudent



// TODO:
// deleteStudent





/*--------------------*/
/*----- Postures -----*/
/*--------------------*/

// TODO:
// createPosture





export const getAllPostures = () => {
    return fetch(BASE_URL + "/postures")
}

export const getPostureById = (id) => {
    return fetch(BASE_URL + "/postures/${id}", { 
        headers: {
            "Authorization": `Bearer ${store.userToken}`,
        },
    })
}

export const getKnownPostures = () => {
    return fetch(BASE_URL + `/known`, { 
        headers: {
            "Authorization": `Bearer ${store.userToken}`,
        },
    })
}
export const addOrRemoveKnownPosture = (data) => {
    return fetch(BASE_URL + `/student/updateKnown`, {
        method: "PATCH",
        headers: {
            "Accept": "application/json",
            "Content-Type": "application/json",
            "Authorization": `Bearer ${store.userToken}`,
        },
        body: JSON.stringify(data)
    })
}

// updatePosture



// deletePosture





/*---------------------*/
/*----- Practices -----*/
/*---------------------*/

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

export const getPractices = () => {
    return fetch(BASE_URL + "/practices")
}

export const getBuiltPractices = () => {
    return fetch(BASE_URL + `/built`, { 
        headers: {
            "Authorization": `Bearer ${store.userToken}`,
        },
    })
}

// get favoritePractices




export const getPracticeById = (id) => {
    return fetch(BASE_URL + `/practices/${id}`, { 
        headers: {
            "Authorization": `Bearer ${store.userToken}`,
        },
    })
}

// updateFavoritePractices





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
export const deletePractice = (id) => {
    return fetch(BASE_URL + `/practices/${id}`, {
        headers: {
            "Authorization": `Bearer ${store.userToken}`,
        },
        method: "DELETE"
    })
}