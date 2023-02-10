import { useState, useEffect } from "react"
import { useNavigate } from 'react-router-dom'
import { createGame, getGameTypes } from '../../managers/GameManager.js'


export const GameForm = () => {
    const navigate = useNavigate()
    const [gameTypes, setGameTypes] = useState([])

    /*
        Since the input fields are bound to the values of
        the properties of this state variable, you need to
        provide some default values.
    */
    const [currentGame, setCurrentGame] = useState({
        name: "",
        gameTypeId: 0,
        max_players: 0
    })

    useEffect(() => {
        // TODO: Get the game types, then set the state
        getGameTypes().then(data => setGameTypes(data))
    }, [])

    const changeGameState = (domEvent) => {
        // TODO: Complete the onChange function
        const copy = {...currentGame}
        copy[domEvent.target.name] = domEvent.target.value
        setCurrentGame(copy)
    }

    return (
        <form className="gameForm">
            <h2 className="gameForm__title">Register New Game</h2>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="name">Name: </label>
                    <input type="text" name="name" required autoFocus className="form-control"
                        value={currentGame.name}
                        onChange={changeGameState}
                    />
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="max_players">Max Number of Players: </label>
                    <input type="text" name="max_players" required autoFocus className="form-control"
                        value={currentGame.max_players}
                        onChange={(evt) => {const copy = {...currentGame}
                        copy.max_players = parseInt(evt.target.value)
                        setCurrentGame(copy)}}
                    />
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                <label htmlFor="gameTypeId">Game Type:</label>
                    <select required autoFocus className="gameTypeList" value={currentGame.gameTypeId} onChange={(evt) => {const copy = {...currentGame}
                    copy.gameTypeId = parseInt(evt.target.value)
                    setCurrentGame(copy)}}
                    ><option name="gameTypeId" className="gameType">Select Game Type</option>
                        {gameTypes.map(gameType => {
                                return <option
                                    name="gameTypeId"
                                    className="form-control"
                                    value={gameType.id}
                                    key={`gameType--${gameType.id}`}
                                >{gameType.type}</option>
                            }
                            )
                        }
                    </select>
                </div>
            </fieldset>

            <button type="submit"
                onClick={evt => {
                    // Prevent form from being submitted
                    evt.preventDefault()

                    const game = {
                        name: currentGame.name,
                        game_type: parseInt(currentGame.gameTypeId),
                        max_players: currentGame.max_players
                    }

                    // Send POST request to your API
                    createGame(game)
                        .then(() => navigate("/games"))
                }}
                className="btn btn-primary">Create</button>
        </form>
    )
}