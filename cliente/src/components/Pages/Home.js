import React, { useState } from "react";
import AppNavbar from "../AppNavbar";
import TaskAlert from "../TaskAlert";
import TaskList from "../TaskList";
import NewTaskModal from "../NewTaskModal";
import { Container } from "reactstrap";
import axios from "axios";

const Home = () => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

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

  return (
    <div>
      <AppNavbar isLoggedIn={isLoggedIn} />
      <TaskAlert />
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
    </div>
  );
};

export default Home;
