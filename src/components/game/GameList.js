import React, { useEffect, useState } from "react"
import { getGames } from "../../managers/GameManager.js"

export const GameList = (props) => {
    const [ games, setGames ] = useState([])

    useEffect(() => {
        getGames().then(data => setGames(data))
    }, [])

    return (
        <article className="games">
            {
                games.map(game => {
                    return <section key={`game--${game.id}`} className="game">
                        <h3 className="game__name">{game.name}</h3>
                        <div className="game__players">up to {game.max_players} players </div>
                    </section>
                })
            }
        </article>
    )
}