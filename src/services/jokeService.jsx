export const postNewJoke = (newJokeText) => {

    const newJoke = {

        text: newJokeText,
        told: false
    }
    
    fetch("http://localhost:8088/jokes", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(newJoke)
    });

    console.log("New Joke Added To Database")

}

export const getAllJokes = () => {
    return fetch("http://localhost:8088/jokes").then((res => res.json()))
}