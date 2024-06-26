import { useDispatch, useSelector } from "react-redux"
import { onAddNewEvent, onDeleteEvent, onSetActiveEvent, onUpdateEvent } from "./calendarSlice";
import { calendarApi } from "../../api/calendarApi";
import { converEventsToDateEvents } from "../../helpers/converEventsToDateEvents";


export const useCalendarStore = () => {

    const dispatch = useDispatch();
    
    const { events, activeEvent } = useSelector( state => state.calendar );
    const { user } = useSelector( state => state.auth );


    const setActiveEvent = ( calendarEvent ) => {
        dispatch( onSetActiveEvent( calendarEvent ) )
    }


    const startSavingEvent = async(calendarEvent) => {
        /* Si se tiene id, se esta actualizando una nota, caso contrario, se esta creando. */
        if (calendarEvent._id) {
            dispatch(onUpdateEvent({...calendarEvent}))
        } else {

            const {data} = await calendarApi.post('/events', calendarEvent);
            console.log({data});

            dispatch(onAddNewEvent({...calendarEvent, _id: data.evento.id, user }))
        }
    }

    const startDeletingEvent = () => {
        dispatch(onDeleteEvent());
    }

    const startLoadingEvents = async() => {

        try {
            const {data} = await calendarApi.get('/events');
            const events = converEventsToDateEvents(data.eventos);
            console.log(events);
        } catch (error) {
            console.log('Error cargando eventos');
            console.log(error);
        }

    }

    return {
        /* propiedades */
        events,
        activeEvent,
        hasEventSelected: !!activeEvent,

        /* metodos */
        setActiveEvent,
        startSavingEvent,
        startDeletingEvent,
        startLoadingEvents
    }
}