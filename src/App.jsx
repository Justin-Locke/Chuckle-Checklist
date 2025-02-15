import { useState } from "react"
import { useEffect } from "react"
import { postNewJoke } from "./services/jokeService"
import stevePic from "./assets/steve.png"
import "./App.css"


export const App = () => {

  const [jokeInput, setJokeInput] = useState("")
  const [savedJoke, setSavedJoke] = useState("")


  useEffect(() => {
    if (savedJoke.trimStart()) {
      postNewJoke(savedJoke)
    }
    
    setJokeInput("")
    console.log("saved Joke event triggered")
  }, [savedJoke])

  return <>
    <div className="app-container">
      <div className="app-heading">
      <div className="app-heading-circle">
   <img className="app-logo" src={stevePic} alt="Good job Steve" />
 </div>
        <h1 className="app-heading-text">Chuckle Checklist</h1>
      </div>
        <h2>Add Joke</h2>

      <div className="joke-add-form">
        <input
        className="joke-input"
        type="text"
        value={jokeInput}
        placeholder="New One Liner"
        onChange={(event) => {
          setJokeInput(event.target.value);
        }}
      />
      <button
        className="joke-input-submit"
        onClick={() => {
          setSavedJoke(jokeInput)
        }}>Add</button>
      </div>
    
  </div>
  </>
}
