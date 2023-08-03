import React, { useContext, useEffect, useState } from "react";
import { UilPlus } from "@iconscout/react-unicons";
import "./home.css";
import Card from "../../components/card/Card";
import NewNote from "../../components/newNoteModal/NewNote";
import Modal from "react-modal";
import { taskContext } from "../../helpers/TaskProvider";
import axios from "axios";
import { userRequest } from "../../apicall";
import LogOut from "../../components/logOut/LogOut";

Modal.setAppElement("#root");

const Home = () => {
  const [toggleModal, setToggleModal] = useState(false);
  const [tasks, setTasks] = useState([]);
  const { userId } = useContext(taskContext);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await userRequest.post("getTasks", { id: userId });
        setTasks(res.data);
      } catch (err) {
        console.log(err);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="wrapper">
      <div className="logOut">
        <LogOut />
      </div>

      <li
        className="add-box"
        onClick={() => {
          setToggleModal(true);
        }}
      >
        <div className="icon">
          <UilPlus className="uil uil-plus" />
        </div>
        <p>{tasks.length === 0 ? "Create new task" : "Add new task"}</p>
      </li>

      {tasks.map((item, index) => {
        return (
          <Card
            key={item._id}
            item={item}
            index={index}
            tasks={tasks}
            setTasks={setTasks}
          />
        );
      })}

      <NewNote
        isOpenModal={toggleModal}
        setIsOpenModal={setToggleModal}
        tasks={tasks}
        setTasks={setTasks}
      />
    </div>
  );
};

export default Home;
