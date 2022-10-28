import React, { useState } from "react";
import { WebcamCapture } from "../Webcam/Webcam";

const Home = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  const submitForm = () => {
    alert("Form submitted");
    setName("");
    setEmail("");
  };

  return (
    <div className="flex flex-col text-center w-full m-0 ">
      <h1 className="text-center align-middle font-bold text-xl p-5">
        Fill up this form!
      </h1>
      <div className="flex bg-gray-200 border-2 align-middle w-full h-full flex-col rounded-md p-5">
        <form className="form">
          <div className="flex flex-col">
          <WebcamCapture />
          </div>
          <button className="m-4 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};
export default Home;
