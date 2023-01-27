import { store } from './store.js'

export const signUp = (data) => {
    return fetch("http://localhost:8000/sign-up", {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
}
export const signIn = (data) => {
    return fetch("http://localhost:8000/sign-in", {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
}
export const showStudent = () => {
    return fetch(`http://localhost:8000/student`, { 
        headers: {
            'Authorization': `Bearer ${store.userToken}`,
        },
    })
}




export const indexPostures = () => {
    return fetch("http://localhost:8000/postures")
}

export const showPostureById = (id) => {
    return fetch(`http://localhost:8000/postures/${id}`, { 
        headers: {
            'Authorization': `Bearer ${store.userToken}`,
        },
    })
}

export const indexKnownPostures = () => {
    return fetch(`http://localhost:8000/known`, { 
        headers: {
            'Authorization': `Bearer ${store.userToken}`,
        },
    })
}



export const indexPractices = () => {
    return fetch("http://localhost:8000/practices")
}
export const showPracticeById = (id) => {
    return fetch(`http://localhost:8000/practices/${id}`, { 
        headers: {
            'Authorization': `Bearer ${store.userToken}`,
        },
    })
}