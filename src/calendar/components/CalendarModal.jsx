import { useState } from "react";
import Modal from "react-modal"
import './modal.css'
import { addHours } from "date-fns";
import "react-datepicker/dist/react-datepicker.css";
import ReactDatePicker from "react-datepicker";


const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
  },
};

// Make sure to bind modal to your appElement (https://reactcommunity.org/react-modal/accessibility/)
Modal.setAppElement('#root');

export const CalendarModal = () => {

  const [isOpen, setIsOpen] = useState(true);

  const [formValues, setFormValues] = useState({
    title: 'Vinsmake',
    notes: 'My note',
    start: new Date(),
    end: addHours(new Date(), 2)
  });

  const onInputChange = ({ target }) => {
    setFormValues({
      ...formValues,
      [target.name]: target.value
    })
  }

  const onDateChanged = (event, changing ) => {
    setFormValues({
      ...formValues,
      [changing]: event
    })
  } 


  const onCloseModal = () => {
    setIsOpen(false);
  }


  return (
    <Modal
      className="modal"
      overlayClassName="modal-fondo"
      closeTimeoutMS={200}
      isOpen={isOpen}
      onRequestClose={onCloseModal}
      style={customStyles}
    >
      <h1> Nuevo evento </h1>
      <hr />
      <form className="container">

        <div className="form-group mb-2 row">
          <label>Fecha y hora inicio</label>
          <ReactDatePicker
            selected={formValues.start}
            className="form-control"
            onChange={(event) => onDateChanged(event, 'start')}
            dateFormat={'Pp'}
          ></ReactDatePicker>
        </div>

        <div className="form-group mb-2 row">
          <label>Fecha y hora fin</label>
          <ReactDatePicker
          minDate={formValues.start}
            selected={formValues.end}
            className="form-control"
            onChange={(event) => onDateChanged(event, 'end')}
            dateFormat={'Pp'}
          ></ReactDatePicker>
        </div>

        <hr />
        <div className="form-group mb-2 row">
          <label>Titulo y notas</label>
          <input
            type="text"
            className="form-control"
            placeholder="Título del evento"
            name="title"
            autoComplete="off"
            value={formValues.title}
            onChange={onInputChange}
          />
          <small id="emailHelp" className="form-text text-muted">Una descripción corta</small>
        </div>

        <div className="form-group mb-2 row">
          <textarea
            type="text"
            className="form-control"
            placeholder="Notas"
            rows="5"
            name="notes"
            value={formValues.notes}
            onChange={onInputChange}
          ></textarea>
          <small id="emailHelp" className="form-text text-muted">Información adicional</small>
        </div>

        <button
          type="submit"
          className="btn btn-outline-primary btn-block"
        >
          <i className="far fa-save"></i>
          <span> Guardar</span>
        </button>

      </form>
    </Modal>
  )
}