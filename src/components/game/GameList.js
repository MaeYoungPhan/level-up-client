import { useEffect, useState } from "react"
import { useNavigate, Link } from 'react-router-dom'
import { getGames, deleteGame } from "../../managers/GameManager.js"

export const GameList = (props) => {
    const [ games, setGames ] = useState([])

    const navigate = useNavigate()

    const getAllGames = () => {
        getGames().then(data => setGames(data))
    }

    useEffect(() => {
        getAllGames()
    }, [])

    const handleDelete = (id) => {
        deleteGame(id).then(() => {
            {getAllGames()}
             }) 
    }

    return (
        <>
            <button className="btn btn-2 btn-sep icon-create"
            onClick={() => {
                navigate({ pathname: "/games/new" })
            }}
            >Register New Game</button>
            <article className="games">
                {
                    games.map(game => {
                        return <section key={`game--${game.id}`} className="game">
                            <h3 className="game__name">{game.name}</h3>
                            <div className="game__players">up to {game.max_players} players </div>
                            <button><Link to={`/games/edit/${game.id}`}>Edit Game</Link></button>
                            <button className="btn btn-2 btn-sep icon-create"
            onClick={() => {
                handleDelete(game.id)
            }}>Delete Game</button>
                        </section>
                    })
                }
            </article>
        </>
    )
}