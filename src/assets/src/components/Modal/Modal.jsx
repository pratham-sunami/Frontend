import React, { useEffect, useRef, useState } from "react";

const Modal = () => {
  const modalRef = useRef();
  const buttonRef = useRef()
  const [isOpen, setIsOpen] = useState(true);

  const closeModal = () => {
    setIsOpen(false);
  };

  const handleOpen = () => {
    setIsOpen(true);
  };

  useEffect(() => {
    const cb = (e) => {
        console.log(e)

      if (!modalRef?.current?.contains(e.target) && !buttonRef?.current?.contains(e.target)) {
        closeModal();
      }
    };
    document.addEventListener("click", cb);

    return () => {
      document.removeEventListener("click",cb)
    }
  }, [modalRef, closeModal]);

  

  return (
    <>
      {isOpen && (
        <div
          aria-label="Modal"
          tabIndex={0}
          ref={modalRef}
          style={{
            border: "1px solid black",
            padding: "2rem",
            display: "flex",
            alignItems: "center",
            margin: "auto",
          }}
        >
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Placeat
            soluta quo deleniti ipsa, dolor laboriosam nesciunt ullam, earum
            optio nemo corrupti dignissimos dolorum impedit quae officia atque.
            Eos, quia ipsam.
          </p>
          <button onClick={closeModal}>Close</button>
        </div>
      )}

      <button ref={buttonRef} style={{ margin: "5rem" }}  onClick={handleOpen}>
        Open Modal
      </button>
    </>
  );
};

export default Modal;
