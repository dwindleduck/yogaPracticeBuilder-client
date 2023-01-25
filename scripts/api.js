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