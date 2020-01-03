import React, { useEffect } from "react";
import { ListGroup, ListGroupItem, Container, Button } from "reactstrap";
import axios from "axios";

import "./Styles/TaskList.css";

const TaskList = props => {
  useEffect((ueProps = props) => {
    ueProps.fetchData();
  }, []);

  const handleDelete = id => {
    axios
      .delete(`http://localhost:8080/tareas/${id}`)
      .then(function(response) {
        console.log(response);
        props.fetchData();
      })
      .catch(function(error) {
        console.log(error);
      });
  };

  if (props.loading) {
    return <h2>Cargando...</h2>;
  }
  if (props.error) {
    return <h2>Upss, algo extraño sucedio :/</h2>;
  }
  return (
    <Container>
      <ListGroup>
        {props.tasks.map(({ id, nombre }) => {
          return (
            <ListGroupItem key={id} className="spaced-task">
              {nombre}
              <Button
                className="remove-btn"
                color="danger"
                size="sm"
                onClick={() => handleDelete(id)}
              >
                &times;
              </Button>
            </ListGroupItem>
          );
        })}
      </ListGroup>
    </Container>
  );
};

export default TaskList;
