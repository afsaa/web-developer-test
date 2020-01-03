import React, { useState } from "react";
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  Form,
  FormGroup,
  Label,
  Input
} from "reactstrap";
import axios from "axios";

const NewTaskModal = props => {
  const { buttonLabel, className } = props;

  const [modal, setModal] = useState(false);
  const [newTask, setNewTask] = useState({});

  const toggle = () => {
    setNewTask({});
    setModal(!modal);
  };

  const handleChange = e => {
    setNewTask({ ...newTask, [e.target.name]: e.target.value });
  };

  const handleSubmit = e => {
    e.preventDefault();
    const newTaskData = {
      nombre: newTask.nombre,
      prioridad: parseInt(newTask.prioridad),
      fecha_venc: newTask.fecha_venc
    };
    axios
      .post("http://localhost:8080/tareas", newTaskData)
      .then(function(response) {
        console.log(response);
        toggle();
        props.fetchData();
      })
      .catch(function(error) {
        console.log(error);
      });
  };

  return (
    <div>
      <Button color="primary" onClick={toggle} className="m-3">
        {buttonLabel}
      </Button>
      <Modal isOpen={modal} toggle={toggle} className={className}>
        <ModalHeader toggle={toggle}>Agregar Nueva Tarea</ModalHeader>
        <ModalBody>
          <Form onSubmit={handleSubmit}>
            <FormGroup>
              <Label for="nombre">Descripcion</Label>
              <Input
                type="text"
                name="nombre"
                id="nombre"
                placeholder="Tu tarea"
                onChange={handleChange}
              />
            </FormGroup>
            <FormGroup>
              <Label for="prioridad">Prioridad</Label>
              <Input
                type="number"
                name="prioridad"
                id="prioridad"
                placeholder="1"
                onChange={handleChange}
              />
            </FormGroup>
            <FormGroup>
              <Label for="fecha_venc">Fecha de vencimiento</Label>
              <Input
                type="date"
                name="fecha_venc"
                id="fecha_venc"
                placeholder="1"
                onChange={handleChange}
              />
            </FormGroup>
            <Button color="primary" onClick={handleSubmit}>
              Agregar Tarea
            </Button>
            <Button color="secondary" onClick={toggle} className="mx-2">
              Cancelar
            </Button>
          </Form>
        </ModalBody>
      </Modal>
    </div>
  );
};

export default NewTaskModal;
