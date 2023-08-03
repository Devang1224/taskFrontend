import React, { useContext, useState } from "react";
import "./card.css";
import { UilEllipsisH } from "@iconscout/react-unicons";
import { UilPen } from "@iconscout/react-unicons";
import { UilTrash } from "@iconscout/react-unicons";
import { UilTimes } from "@iconscout/react-unicons";
import { format } from "date-fns";
import { userRequest } from "../../apicall";
import EditModal from "../editModal/EditModal";
import ViewModel from "../viewNoteModel/ViewModel";
import { taskContext } from "../../helpers/TaskProvider";

const Card = ({ item, index, tasks, setTasks }) => {
  const [toggleMenu, setToggleMenu] = useState(false);
  const [toggleEditModal, setToggleEditModal] = useState(false);
  const [viewNoteModal, setViewNoteModal] = useState(false);
  const [isCompleted, setIsCompleted] = useState(item.isCompleted);
  const { userId } = useContext(taskContext);

  const handleClick = (e) => {
    setToggleMenu((prev) => !prev);
  };

  // handling delete
  const handleDelete = async () => {
    try {
      const res = await userRequest.post("deletetask", {
        userId,
        taskId: item._id,
      });

      setTasks((prev) => {
        const newTasks = [...prev];
        newTasks.splice(index, 1);
        return newTasks;
      });
    } catch (err) {
      console.log(err);
    }
  };

  // to mark incomplete or not completed
  const handleComplete = async () => {
    try {
      const res = await userRequest.post("updateTasksStatus", {
        userId,
        taskId: item._id,
        isCompleted: isCompleted,
      });

      setIsCompleted((prev) => !prev);

      setTasks((prev) =>
        prev.map((task) =>
          task._id === item._id
            ? {
                ...task,
                isCompleted: !isCompleted,
              }
            : task
        )
      );
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <li className={`task ${isCompleted ? "taskCompleted" : ""}`}>
      <div className="details" onClick={() => setViewNoteModal(true)}>
        <p>{item.title}</p>
        <p>{item.description}</p>
      </div>

      <div className="bottom-content">
        <span>{format(new Date(item.createdAt), "MMM d, yyyy")}</span>
        <div className="settings">
          <UilEllipsisH className="i" onClick={handleClick} />
          <ul className={`menu  ${toggleMenu ? "show" : ""}`}>
            <UilTimes className="menuclose" onClick={handleClick} />
            <li
              onClick={() => {
                setToggleEditModal(true);
                setToggleMenu(false);
              }}
            >
              <UilPen className="i" />
              Edit
            </li>
            <li onClick={handleDelete}>
              <UilTrash className="i" />
              Delete
            </li>
          </ul>
        </div>
        <button
          className={`${isCompleted ? "notCompleted" : "completed"}`}
          onClick={handleComplete}
        >
          {isCompleted ? "Mark Incomplete" : "Complete"}
        </button>
      </div>

      <EditModal
        item={item}
        toggleEditModal={toggleEditModal}
        setToggleEditModal={setToggleEditModal}
        tasks={tasks}
        setTasks={setTasks}
      />

      <ViewModel
        item={item}
        setViewNoteModal={setViewNoteModal}
        viewNoteModal={viewNoteModal}
      />
    </li>
  );
};

export default Card;
