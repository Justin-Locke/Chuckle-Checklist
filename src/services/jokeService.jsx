export const postNewJoke = (newJokeText) => {

    const newJoke = {

        text: newJokeText,
        told: false
    }
    
    return fetch("http://localhost:8088/jokes", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(newJoke)
    });


}

export const getAllJokes = async () => {
    return fetch("http://localhost:8088/jokes").then((res => res.json()))
}

export const updateJoke = (updatedJoke) => {

    return fetch(`http://localhost:8088/jokes/${updatedJoke.id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(updatedJoke)
    })

}

export const deleteJoke = (jokeToDelete) => {

    return fetch(`http://localhost:8088/jokes/${jokeToDelete.id}`, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json"
        }
    })
}
