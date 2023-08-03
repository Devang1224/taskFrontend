import React, { useContext, useState } from "react";
import Modal from "react-modal";
import { UilTimes } from "@iconscout/react-unicons";
import "./newnotemodal.css";
import { userRequest } from "../../apicall";
import { taskContext } from "../../helpers/TaskProvider";

const NewNote = ({ isOpenModal, setIsOpenModal, setTasks, tasks }) => {
  const [newTask, setNewTask] = useState({});
  const { userId } = useContext(taskContext);

  const handleOnChange = (e) => {
    setNewTask({
      ...newTask,
      [e.target.name]: e.target.value,
      userId,
    });
  };

  // adding new notes
  const handleAddNote = async (e) => {
    e.preventDefault();

    try {
      const res = await userRequest.post("addnewtask", newTask);
      setTasks((prev) => [res.data, ...tasks]);
    } catch (err) {
      console.log(err);
    } finally {
      setIsOpenModal(false);
    }
  };

  return (
    <Modal
      isOpen={isOpenModal}
      className="content"
      style={{
        overlay: {
          backgroundColor: "rgba(0, 0, 0, 0.51)",
          backdropFilter: "blur(2px)",
          zIndex: 100,
        },
      }}
    >
      <header>
        <p>Add a new task</p>
        <UilTimes
          className="closeModal"
          onClick={() => {
            setIsOpenModal(false);
          }}
        />
      </header>

      <form onSubmit={handleAddNote}>
        <div className="row title">
          <label>Title</label>
          <input type="text" name="title" onChange={handleOnChange} required />
        </div>
        <div className="row description">
          <label>Description</label>
          <textarea name="description" onChange={handleOnChange}></textarea>
        </div>

        <button type="submit">Add Task</button>
      </form>
    </Modal>
  );
};

export default NewNote;
