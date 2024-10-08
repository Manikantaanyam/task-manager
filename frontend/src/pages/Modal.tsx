import React from "react";

const Modal = ({ children, onClose }) => {
  return (
    <div className="">
      <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
        <div className="bg-white w-[400px] h-[250px] rounded-md shadow-lg p-6 relative">
          <button
            onClick={onClose}
            className="absolute text-2xl pr-4 top-2 right-2 text-gray-500 hover:text-gray-700"
          >
            &times; {/* Close icon */}
          </button>
          {children}
        </div>
      </div>
    </div>
  );
};

export default Modal;
