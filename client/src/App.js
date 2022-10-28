import "./App.css";
// import AllCameras from "./AllCameras";
// import Webcam from "react-webcam";
// import Cam from "./WebcamCapture";
import Home from "./components/Home/Home";
const App = () => {
  // let formData = new FormData();
  // const onFileChange = (e) => {
  //   console.log(e.target.files[0]);
  //   if (e.target && e.target.files[0]) {
  //     formData.append("file", e.target.files[0]);
  //   }
  // };
  return (
    <div>
      <Home />
    </div>
    // <div className="App border-2 p-10 m-10 shadow-lg">
    /* <div className=" flex flex-col items-center justify-center h-full w-full">
        <div className="mb-6 items-center m-5 ">
          <input
            className="mx-5"
            type="file"
            name="file_upload"
            onChange={onFileChange}
          />
        </div>
        <div>
          <button className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
            Submit Data
          </button>
        </div>
      </div> */

    /* </div> */
  );
};

export default App;
