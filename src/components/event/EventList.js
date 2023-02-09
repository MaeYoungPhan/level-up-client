import React, { useEffect, useState } from "react"
import { getEvents } from "../../managers/EventManager.js"

export const EventList = (props) => {
    const [ events, setEvents ] = useState([])

    useEffect(() => {
        getEvents().then(data => setEvents(data))
    }, [])

    return (
        <article className="events">
            {
                events.map(event => {
                    return <section key={`event--${event.id}`} className="event">
                        <h3 className="event__name">{event.name}</h3>
                        <div className="event__date">Date: {event.date} </div>
                        <div className="event__time">Time: {event.time} </div>
                    </section>
                })
            }
        </article>
    )
}