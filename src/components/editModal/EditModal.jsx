import React, { useContext, useState } from "react";
import Modal from "react-modal";
import "./editmodal.css";
import { UilTimes } from "@iconscout/react-unicons";
import { userRequest } from "../../apicall";
import { taskContext } from "../../helpers/TaskProvider";

const EditModal = ({
  item,
  toggleEditModal,
  setToggleEditModal,
  tasks,
  setTasks,
}) => {
  const [editedTitle, setEditedTitle] = useState(item.title);
  const [editedDesc, setEditedDesc] = useState(item.description);
  const { userId } = useContext(taskContext);

  const handleEditNote = async (e) => {
    e.preventDefault();

    try {
      const res = await userRequest.post("updatetask", {
        userId,
        taskId: item._id,
        title: editedTitle,
        description: editedDesc,
      });

      setTasks((prevTasks) =>
        prevTasks.map((task) =>
          task._id === item._id
            ? {
                ...task,
                title: editedTitle,
                description: editedDesc,
              }
            : task
        )
      );
    } catch (err) {
      console.log(err);
    } finally {
      setToggleEditModal(false);
    }
  };

  return (
    <Modal
      isOpen={toggleEditModal}
      className="editmodal"
      style={{
        overlay: {
          backgroundColor: "rgba(0, 0, 0, 0.158)",
          backdropFilter: "blur(1px)",
          zIndex: 100,
        },
      }}
    >
      <header>
        <p>Edit Note</p>
        <UilTimes
          className="closeModal"
          onClick={() => {
            setToggleEditModal(false);
          }}
        />
      </header>

      <form onSubmit={handleEditNote}>
        <div className="editmodaltitle">
          <label>Title</label>
          <input
            type="text"
            name="title"
            required
            onChange={(e) => {
              setEditedTitle(e.target.value);
            }}
            value={editedTitle}
          />
        </div>
        <div className="editmodaldescription">
          <label>Description</label>
          <textarea
            name="description"
            onChange={(e) => {
              setEditedDesc(e.target.value);
            }}
            value={editedDesc}
          ></textarea>
        </div>

        <button type="submit">Edit Task</button>
      </form>
    </Modal>
  );
};

export default EditModal;
