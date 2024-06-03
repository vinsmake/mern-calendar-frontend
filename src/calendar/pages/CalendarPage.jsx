import { Calendar } from 'react-big-calendar'


import 'react-big-calendar/lib/css/react-big-calendar.css'
import { Navbar } from "../components/Navbar"
import { localizer } from '../../helpers/calendarLocalizer'
import { addHours } from 'date-fns'
import { getMessagesES } from '../../helpers/getMessages'
import { CalendarEvent } from '../components/CalendarEvent'
import { useState } from 'react'
import { CalendarModal } from '../components/CalendarModal'



const myEventsList = [{
    title: 'Cumpleaños vinsmake',
    notes: 'Comprar pastel',
    start: new Date(),
    end: addHours(new Date(), 2),
    bgolor: '#fafafa',
    user: {
        id: '1',
        name: 'vinsmake'
    }
}]

export const CalendarPage = () => {


    /* onViewChanged state */
    const [lastView, setLastView] = useState(localStorage.getItem('lastView') || 'week');


    const eventStyleGetter = (event, start, end, isSelected) => {
        const style = {
            backgroundColor: '#347CF7',
            borderRadius: '0px',
            opacity: 0.8,
            color: 'white'
        }
        return {
            style
        }
    }


    const onDoubleClick = (event) => {
        console.log({ doubleClick: event });
    }


    const onSelect = (event) => {

    }


    /* almacenamos en localStorage para mantener la view */
    const onViewChanged = (event) => {
        localStorage.setItem('lastView', event);
        setLastView(event);
    }




    return (
        <>
            <Navbar />
            <div>
                <Calendar
                    culture='es'
                    localizer={localizer}
                    events={myEventsList}
                    defaultView={lastView}
                    startAccessor="start"
                    endAccessor="end"
                    style={{ height: 'calc(100vh - 80px)' }}
                    messages={getMessagesES()}
                    eventPropGetter={eventStyleGetter}
                    components={{
                        event: CalendarEvent
                    }}
                    onDoubleClickEvent={onDoubleClick}
                    onSelectEvent={onSelect}
                    onView={onViewChanged}
                />
            </div>
            <CalendarModal></CalendarModal>
        </>
    )
}