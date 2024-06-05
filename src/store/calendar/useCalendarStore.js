import { useDispatch, useSelector } from "react-redux"
import { onAddNewEvent, onDeleteEvent, onSetActiveEvent, onUpdateEvent } from "./calendarSlice";


export const useCalendarStore = () => {

    const dispatch = useDispatch();
    
    const { events, activeEvent } = useSelector( state => state.calendar );


    const setActiveEvent = ( calendarEvent ) => {
        dispatch( onSetActiveEvent( calendarEvent ) )
    }


    const startSavingEvent = async(calendarEvent) => {

        /* Si se tiene id, se esta actualizando una nota, caso contrario, se esta creando. */
        if (calendarEvent._id) {
            dispatch(onUpdateEvent({...calendarEvent}))
        } else {
            dispatch(onAddNewEvent({...calendarEvent, _id : new Date().getTime()}))
        }
    }

    const StartDeletingEvent = () => {
        dispatch(onDeleteEvent());
    }

    return {
        /* propiedades */
        events,
        activeEvent,
        hasEventSelected: !!activeEvent,

        /* metodos */
        setActiveEvent,
        startSavingEvent,
        StartDeletingEvent
    }
}