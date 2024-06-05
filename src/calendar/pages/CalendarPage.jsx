import { Calendar } from 'react-big-calendar'


import 'react-big-calendar/lib/css/react-big-calendar.css'
import { Navbar } from "../components/Navbar"
import { localizer } from '../../helpers/calendarLocalizer'
import { getMessagesES } from '../../helpers/getMessages'
import { CalendarEvent } from '../components/CalendarEvent'
import { useState } from 'react'
import { CalendarModal } from '../components/CalendarModal'
import { useUiStore } from '../../store/ui/useUiStore'
import { useCalendarStore  } from '../../store/calendar/useCalendarStore'
import { FabAddNew } from '../components/FabAddNew'
import { FabDelete } from '../components/FabDelete'




export const CalendarPage = () => {


    const { openDateModal, closeDateModal } = useUiStore();
    const { events, setActiveEvent } = useCalendarStore();
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
        openDateModal();
    }


    const onSelect = (event) => {
        setActiveEvent(event);
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
                    events={events}
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
            <FabAddNew></FabAddNew>
            <FabDelete></FabDelete>
        </>
    )
}