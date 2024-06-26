import { useCalendarStore } from "../../store/calendar/useCalendarStore"

export const FabDelete = () => {

    const {startDeletingEvent, hasEventSelected} = useCalendarStore();

    const handleClickDelete = () => {
        startDeletingEvent();
    }


    return (
        <button
        style={{
            display: hasEventSelected ? "" : 'none'
        }}
            className="btn btn-danger fab-danger"
            onClick={handleClickDelete}
        >
            <i className="fas fa-trash-alt"></i>
        </button>
    )
}