import { useState, useEffect } from "react"
import { useNavigate, useParams } from 'react-router-dom'
import { getGames } from '../../managers/GameManager.js'
import { getEvent, updateEvent } from '../../managers/EventManager.js'


export const UpdateEventForm = () => {
    const navigate = useNavigate()
    const { eventId } = useParams()
    const [games, setGames] = useState([])

    /*
        Since the input fields are bound to the values of
        the properties of this state variable, you need to
        provide some default values.
    */
    const [currentEvent, setCurrentEvent] = useState({
        name: "",
        description: "",
        date: "",
        time: "",
        location: "",
        game: {},
        gameId: 0,
    })

    useEffect(() => {
        getGames().then(res => setGames(res))
        getEvent(eventId).then(res => {
            // get response from server then set value of key gameTypeId to pk int of game_type object
            res.gameId = res.game.id
            setCurrentEvent(res)
        })
    }, 
    [eventId])

    const changeEventState = (domEvent) => {
        // TODO: Complete the onChange function
        const copy = {...currentEvent}
        copy[domEvent.target.name] = domEvent.target.value
        setCurrentEvent(copy)
    }

    return (
        <form className="eventForm">
            <h2 className="eventForm__title">Create New Event</h2>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="name">Event Name: </label>
                    <input type="text" name="name" required autoFocus className="form-control"
                        value={currentEvent.name}
                        onChange={changeEventState}
                    />
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="description">Event Description: </label>
                    <input type="text" name="description" required autoFocus className="form-control"
                        value={currentEvent.description}
                        onChange={changeEventState}
                    />
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="date">Event Date: </label>
                    <input type="date" name="date" required autoFocus className="form-control"
                        value={currentEvent.date}
                        onChange={changeEventState}
                    />
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="time">Event Time: </label>
                    <input type="time" name="time" required autoFocus className="form-control"
                        value={currentEvent.time}
                        onChange={changeEventState}
                    />
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="location">Event Location: </label>
                    <input type="text" name="location" required autoFocus className="form-control"
                        value={currentEvent.location}
                        onChange={changeEventState}
                    />
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                <label className="label">Game:</label>
                    <select required autoFocus className="gameList" value={currentEvent.gameId} onChange={(evt) => {const copy = {...currentEvent}
                    copy.gameId = parseInt(evt.target.value)
                    setCurrentEvent(copy)}}
                    >
                        {games.map(game => (<option
                                    name={game.name}
                                    className="form-control"
                                    value={game.id}
                                    key={`game--${game.id}`}
                                >{game.name}</option>
                            ))
                        }
                    </select>
                </div>
            </fieldset>

            <button type="submit"
                onClick={evt => {
                    // Prevent form from being submitted
                    evt.preventDefault()

                    const event = {
                        name: currentEvent.name,
                        description: currentEvent.description,
                        date: currentEvent.date,
                        time: currentEvent.time,
                        location: currentEvent.location,
                        game: currentEvent.gameId
                    }

                    // Send POST request to your API
                    updateEvent(eventId, event)
                        .then(() => navigate("/events"))
                }}
                className="btn btn-primary">Update</button>
        </form>
    )
}