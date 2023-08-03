import React from "react";
import Modal from "react-modal";
import "./viewnote.css";
import { UilTimes } from "@iconscout/react-unicons";

const ViewModel = ({ item, viewNoteModal, setViewNoteModal }) => {
  return (
    <Modal
      isOpen={viewNoteModal}
      className="viewnotemodal"
      style={{
        overlay: {
          backgroundColor: "rgba(0, 0, 0, 0.158)",
          backdropFilter: "blur(1px)",
          zIndex: 100,
        },
      }}
    >
      <header>
        <p>Task</p>
        <UilTimes
          className="closeModal"
          onClick={() => {
            setViewNoteModal(false);
          }}
        />
      </header>

      <div className="detailsContainer">
        <div className="title">
          <label>Title</label>
          <p>{item.title}</p>
        </div>
        <div className="description">
          <label>Description</label>
          <p>{item.description}</p>
        </div>
      </div>
    </Modal>
  );
};

export default ViewModel;
