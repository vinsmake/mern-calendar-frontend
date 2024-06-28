import { useDispatch, useSelector } from "react-redux"
import { onAddNewEvent, onDeleteEvent, onLoadEvents, onSetActiveEvent, onUpdateEvent } from "./calendarSlice";
import { calendarApi } from "../../api/calendarApi";
import { converEventsToDateEvents } from "../../helpers/converEventsToDateEvents";
import { ca } from "date-fns/locale/ca";
import Swal from "sweetalert2";


export const useCalendarStore = () => {

    const dispatch = useDispatch();
    
    const { events, activeEvent } = useSelector( state => state.calendar );
    const { user } = useSelector( state => state.auth );


    const setActiveEvent = ( calendarEvent ) => {
        dispatch( onSetActiveEvent( calendarEvent ) )
    }


    const startSavingEvent = async(calendarEvent) => {


        try {
        /* Si se tiene id, se esta actualizando una nota, caso contrario, se esta creando. */
        if (calendarEvent.id) {
            await calendarApi.put(`/events/${calendarEvent.id}`, calendarEvent);
            dispatch(onUpdateEvent({...calendarEvent}))
            return;
        } 

            const {data} = await calendarApi.post('/events', calendarEvent);
            console.log({data});
            dispatch(onAddNewEvent({...calendarEvent, id: data.evento.id, user }))
        } catch (error) {
            console.log(error);
            Swal.fire('error al guardar', error.response.data.msg, 'error')
        }


        
    }


    const startDeletingEvent = async() => {
        try {
            await calendarApi.delete(`/events/${ activeEvent.id }` );
            dispatch( onDeleteEvent() );
        } catch (error) {
            console.log(error);
            Swal.fire('Error al eliminar', error.response.data.msg, 'error');
        }

    }


    const startLoadingEvents = async() => {
        try {
            
            const { data } = await calendarApi.get('/events');
            const events = converEventsToDateEvents( data.eventos );
            dispatch( onLoadEvents( events ) );


        } catch (error) {
          console.log('Error cargando eventos');
          console.log(error)
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