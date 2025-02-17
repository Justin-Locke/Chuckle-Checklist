import stevePic from "./assets/steve.png"
import { useState } from "react"
import { useEffect } from "react"
import { deleteJoke, getAllJokes, postNewJoke, updateJoke } from "./services/jokeService"
import "./App.css"



export const App = () => {

  const [jokeInput, setJokeInput] = useState("")
  const [jokeToSave, setJokeToSave] = useState("")
  const [allJokes, setAllJokes] = useState([])
  const [untoldJokes, setUntoldJokes] = useState([])
  const [toldJokes, setToldJokes] = useState([])
  const [jokeToUpdate, setJokeToUpdate] = useState(null)
  const [lastUpdatedJoke, setLastUpdatedJoke] = useState(null)
  const [jokeToDelete, setJokeToDelete] = useState(null)
  
  const fetchJokes = () => {
    getAllJokes().then(jokesArray => {
      setAllJokes(jokesArray)
      console.log("All Jokes Set")
    })
  }

  const handleSaveJoke = async () => {
    if (jokeToSave.trimStart()) {
      try {
        await postNewJoke(jokeToSave)
        setJokeInput("")
        setLastUpdatedJoke(jokeToSave)
      } catch (error) {
        console.error("Error saving joke:", error)
      }
  }
}

  const handleJokeToldChange = async (joke) => {
    
    if (joke) {
      const updatedJoke = {
        ...joke,
        told: !joke.told
      }
      
      try {
        await updateJoke(updatedJoke);
        setLastUpdatedJoke(updatedJoke);
        console.log("Joke just updated.")
      } catch (error) {
        console.error("Error updating joke:", error);
      }
      
    }
    
  }

  const handleDeleteJoke = async () => {
    if (jokeToDelete) {
      try {
        await deleteJoke(jokeToDelete)
        setLastUpdatedJoke(jokeToDelete)
      } catch (error) {
        console.error("Error deleting joke:", error)
      }
    }
  }

  useEffect(() => {
    handleDeleteJoke(jokeToDelete)
    
  }, [jokeToDelete])

  useEffect(() => {
    handleJokeToldChange(jokeToUpdate)
  }, [jokeToUpdate])

  useEffect(() => {
    fetchJokes();
  }, [lastUpdatedJoke])

  useEffect(() => {
    const toldJokes = allJokes.filter(
      (joke) => joke.told === true
    )
    const untoldJokes = allJokes.filter(
      (joke) => joke.told === false
    )
    setToldJokes(toldJokes)
    setUntoldJokes(untoldJokes)
  }, [allJokes])

  useEffect(() => {
    handleSaveJoke()
  }, [jokeToSave])

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
          setJokeToSave(jokeInput)
        }}>Add</button>
      </div>
    <div className="joke-lists-container">
      <div className="joke-list-container">
        <h2>Untold
          <span className="untold-count">{untoldJokes.length}</span>
        </h2>
        {untoldJokes.map(joke => {
          return (
            <li className="joke-list-item" key={joke.id}>
              <p className="joke-list-item-text">{joke.text}</p>
              <div>
                <button
                className="joke-list-action-delete"
                onClick={() => setJokeToDelete(joke)}
                ><i className="fa-regular fa-trash-can" />

                </button>
                <button 
                className="joke-list-action-toggle"
                onClick={() => setJokeToUpdate(joke)}
                ><i className="fa-regular fa-face-smile" /></button>
              </div>
            </li>
          )
        })}

      </div>
      <div className="joke-list-container">
        <h2>Told
          <span className="told-count">{toldJokes.length}</span>
        </h2>
        {toldJokes.map(joke => {
          return (
            <li className="joke-list-item" key={joke.id}>
              <p className="joke-list-item-text">{joke.text}</p>
              <div>
                <button
                className="joke-list-action-delete"
                onClick={() => setJokeToDelete(joke)}
                ><i className="fa-regular fa-trash-can" />

                </button>
                <button 
                className="joke-list-action-toggle"
                onClick={() => setJokeToUpdate(joke)}
                ><i className="fa-regular fa-face-meh" /></button>
              </div>
            </li>
          )
        })}
      </div>

    </div>
  </div>
  </>
}

