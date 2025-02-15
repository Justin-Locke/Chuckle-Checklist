import { useState } from "react"
import { useEffect } from "react"
import "./App.css"
import { postNewJoke } from "./services/jokeService"


export const App = () => {

  const [jokeInput, setJokeInput] = useState()
  const [savedJoke, setSavedJoke] = useState()


  useEffect(() => {
    if (savedJoke) {
      postNewJoke(savedJoke)
    }
  }, [savedJoke])

  return <>
    <div className="app-container">
      <div className="app-heading">
        <h1 className="app-heading-text">Chuckle Checklist</h1>
      </div>
        <h2>Add Joke</h2>

      <div className="joke-add-form">
        <input
        className="joke-input"
        type="text"
        placeholder="New One Liner"
        onChange={(event) => {
          setJokeInput(event.target.value);
        }}
      />
      <button
        className="joke-input-submit"
        onClick={() => {
          setSavedJoke(jokeInput.trimStart())
        }}>Add</button>
      </div>
    
  </div>
  </>
}
