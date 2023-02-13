import { useState, useEffect } from "react"
import { useNavigate, useParams } from 'react-router-dom'
import { getGame, updateGame, getGameTypes } from '../../managers/GameManager.js'


export const UpdateGameForm = () => {
    const navigate = useNavigate()
    const { gameId } = useParams()
    const [gameTypes, setGameTypes] = useState([])

    /*
        Since the input fields are bound to the values of
        the properties of this state variable, you need to
        provide some default values.
    */
    const [currentGame, setCurrentGame] = useState({
        name: "",
        game_type: {},
        max_players: 0,
        gameTypeId: 0 // set new property to store pk integer from gameType object returned from database
    })

    useEffect(() => {
        getGameTypes().then(res => setGameTypes(res))
        getGame(gameId).then(res => {
            // get response from server then set value of key gameTypeId to pk int of game_type object
            res.gameTypeId = res.game_type.id
            setCurrentGame(res)
        })
    }, 
    [gameId])

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
                <label className="label">Game Type:</label>
                    <select name="game_type" required className="form-control" 
                    // set current value to gameTypeId int. 
                    value={currentGame.gameTypeId} onChange={(evt) => {const copy = {...currentGame}
                    copy.gameTypeId = parseInt(evt.target.value)
                    setCurrentGame(copy)}}
                    >{gameTypes.map(gameType => ( <option
                                    name={gameType.type}
                                    value={gameType.id}
                                    key={`gameType--${gameType.id}`}
                                >{gameType.type}</option>
                            ))
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
                        game_type: currentGame.gameTypeId,
                        max_players: currentGame.max_players
                    }

                    // Send POST request to your API
                    updateGame(gameId, game)
                        .then(() => navigate("/games"))
                }}
                className="btn btn-primary">Update</button>
        </form>
    )
}