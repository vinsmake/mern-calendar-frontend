import { useCalendarStore } from "../../store/calendar/useCalendarStore"

export const FabDelete = () => {

    const {StartDeletingEvent, hasEventSelected} = useCalendarStore();

    const handleClickDelete = () => {
        StartDeletingEvent();
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