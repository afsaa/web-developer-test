import React, { useState, useEffect } from "react";
import { Redirect } from "react-router-dom";
import AppNavbar from "../AppNavbar";
import TaskAlert from "../TaskAlert";
import TaskList from "../TaskList";
import NewTaskModal from "../NewTaskModal";
import { Container } from "reactstrap";
import axios from "axios";

const Home = props => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const userId = localStorage.getItem("userId");

  async function fetchData() {
    setLoading(true);
    try {
      const res = await axios.get("http://localhost:8080/tareas");
      setTasks(res.data);
      setLoading(false);
    } catch (error) {
      setError(error);
      setLoading(false);
    }
  }

  const logOut = () => {
    localStorage.removeItem("userId");
    localStorage.removeItem("username");
    localStorage.removeItem("password");
  };

  if (!userId) {
    return <Redirect push to="/" />;
  }

  return (
    <React.Fragment>
      <TaskAlert />
      <AppNavbar logOut={logOut} />
      <h2 className="m-3 text-center">Tareas</h2>
      <Container>
        <TaskList
          tasks={tasks}
          loading={loading}
          error={error}
          fetchData={fetchData}
        />
        <NewTaskModal fetchData={fetchData} buttonLabel="Agregar Tarea" />
      </Container>
    </React.Fragment>
  );
};

export default Home;
