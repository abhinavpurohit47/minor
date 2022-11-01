import { React, useState } from "react";
import axios from "axios";
import { API_ENDPOINT } from "../../utils/constants";
function Upload() {
  const [emotion, setEmotion] = useState("");
  const [createObjectURL, setCreateObjectURL] = useState(null);
  const uploadImage = async (e) => {
    const file = e.target.files[0];
    setCreateObjectURL(URL.createObjectURL(file));
    const imageData = await convertBase64(file);
    console.log(imageData);
    axios
      .get(
        `${API_ENDPOINT}/after?base64Image=${encodeURIComponent(
          imageData.substring(23)
        )}`
      )
      .then((response) => {
        console.log(response.data["result"]);
        setEmotion(response.data["result"]);
      })
      .catch((e) => {
        console.log(e);
      });
  };
  const convertBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const fileReader = new FileReader();
      fileReader.readAsDataURL(file);
      fileReader.onload = () => {
        resolve(fileReader.result);
      };
      fileReader.onerror = (error) => {
        reject(error);
      };
    });
  };
  return (
    <div>
      <div className="flex border-2 shadow-lg">
        <input
          type="file"
          onChange={(e) => {
            uploadImage(e);
          }}
        />
      </div>
      <div>
        {" "}
        <img src={createObjectURL} />
      </div>
      <div>{emotion === "" ? <div></div> : <h1>{emotion}</h1>}</div>
    </div>
    // </div>
  );
}

export default Upload;
