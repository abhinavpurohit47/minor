import React, { useState } from "react";
import Webcam from "react-webcam";
import axios from "axios";

const videoConstraints = {
  width: 220,
  height: 200,
  facingMode: "user",
};

export const WebcamCapture = () => {
  const [image, setImage] = useState("");
  const webcamRef = React.useRef(null);
  const [emotion, setEmotion] = useState("");

  const capture = React.useCallback(() => {
    const imageSrc = webcamRef.current.getScreenshot();
    setImage(imageSrc);
    const imageData = webcamRef.current.getScreenshot();
    console.log(imageData);
    axios
      .post("http://localhost:5000/after", {
        image: imageData.substring(22),
      })
      .then((response) => {
        console.log(response.data["result"]);

        setEmotion(response.data["result"]);
      });
  });

  return (
    <div className="flex">
      <div className="flex-col p-5 flex">
        {image === "" ? (
          <Webcam
            audio={false}
            height={200}
            ref={webcamRef}
            screenshotFormat="image/jpeg"
            width={220}
            videoConstraints={videoConstraints}
          ></Webcam>
        ) : (
          <img src={image} alt="img" />
        )}
      </div>
      <div>
        {image !== "" ? (
          <button
            onClick={(e) => {
              e.preventDefault();
              setImage("");
            }}
            className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            Retake Image
          </button>
        ) : (
          <button
            onClick={(e) => {
              e.preventDefault();
              capture();
            }}
            className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            Capture
          </button>
        )}
      </div>
      <div>{emotion === "" ? <div></div> : <h1>{emotion}</h1>}</div>
    </div>
  );
};
