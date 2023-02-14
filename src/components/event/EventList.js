import { useEffect, useState } from "react"
import { getEvents, deleteEvent, leaveEvent, joinEvent } from "../../managers/EventManager.js"
import { useNavigate, Link } from "react-router-dom"

export const EventList = (props) => {
    const navigate = useNavigate()
    const [ events, setEvents ] = useState([])

    const getAllEvents = () => {
        getEvents().then(data => setEvents(data))
    }

    useEffect(() => {
        getAllEvents()
    }, [])

    const handleDelete = (id) => {
        deleteEvent(id).then(() => {
            {getAllEvents()}
             }) 
    }

    const handleJoin = (id) => {
        joinEvent(id).then(() => {
            {getAllEvents()}
             }) 
    }

    const handleLeave = (id) => {
        leaveEvent(id).then(() => {
            {getAllEvents()}
             }) 
    }

    return (
        <>
        <button className="btn btn-2 btn-sep icon-create"
            onClick={() => {
                navigate({ pathname: "/events/new" })
            }}
            >Create New Event</button>
        <article className="events">
            {
                events.map(event => {
                    return <section key={`event--${event.id}`} className="event">
                        <h3 className="event__name">{event.name}</h3>
                        <div className="event__date">Date: {event.date} </div>
                        <div className="event__time">Time: {event.time} </div>
                        {
                        event.joined ?
                        // TODO: create the Leave button
                        <button onClick={ () => { handleLeave(event.id) } }>Leave Event</button>
                        :
                        // TODO: create the Join button
                        <button onClick={ () => { handleJoin(event.id) } }>Join Event</button>
                        }
                    
                        <button><Link to={`/events/edit/${event.id}`}>Edit Event</Link></button>
                        <button className="btn"
            onClick={() => {
                handleDelete(event.id)
            }}>Delete Event</button>
                    </section>
                })
            }
        </article></>
    )
}