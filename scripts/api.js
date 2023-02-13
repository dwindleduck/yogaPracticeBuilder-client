import { store } from "./store.js"

// visually clear comments!

/*----------------------*/
/*----- Sign In/Up -----*/
/*----------------------*/
export const signUp = (data) => {
    return fetch("http://localhost:8000/sign-up", {
        method: "POST",
        headers: {
            "Accept": "application/json",
            "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
    })
}
export const signIn = (data) => {
    return fetch("http://localhost:8000/sign-in", {
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
export const showStudent = () => {
    return fetch(`http://localhost:8000/student`, { 
        headers: {
            "Authorization": `Bearer ${store.userToken}`,
        },
    })
}
export const indexKnownPostures = () => {
    return fetch(`http://localhost:8000/known`, { 
        headers: {
            "Authorization": `Bearer ${store.userToken}`,
        },
    })
}
export const updateKnownPostures = (data) => {
    return fetch(`http://localhost:8000/student/updateKnown`, {
        method: "PATCH",
        headers: {
            "Accept": "application/json",
            "Content-Type": "application/json",
            "Authorization": `Bearer ${store.userToken}`,
        },
        body: JSON.stringify(data)
    })
}
export const indexBuiltPractices = () => {
    return fetch(`http://localhost:8000/built`, { 
        headers: {
            "Authorization": `Bearer ${store.userToken}`,
        },
    })
}
/*--------------------*/
/*----- Postures -----*/
/*--------------------*/
export const indexPostures = () => {
    return fetch("http://localhost:8000/postures")
}
export const showPostureById = (id) => {
    return fetch(`http://localhost:8000/postures/${id}`, { 
        headers: {
            "Authorization": `Bearer ${store.userToken}`,
        },
    })
}
/*---------------------*/
/*----- Practices -----*/
/*---------------------*/
export const indexPractices = () => {
    return fetch("http://localhost:8000/practices")
}
export const showPracticeById = (id) => {
    return fetch(`http://localhost:8000/practices/${id}`, { 
        headers: {
            "Authorization": `Bearer ${store.userToken}`,
        },
    })
}
export const createPractice = (data) => {
    return fetch(`http://localhost:8000/practices`, {
        method: "POST",
        headers: {
            "Accept": "application/json",
            "Content-Type": "application/json",
            "Authorization": `Bearer ${store.userToken}`
        },
        body: JSON.stringify(data)
    })
}
export const updatePractice = (id, data) => {
    return fetch(`http://localhost:8000/practices/${id}`, {
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
    return fetch(`http://localhost:8000/practices/${id}`, {
        headers: {
            "Authorization": `Bearer ${store.userToken}`,
        },
        method: "DELETE"
    })
}