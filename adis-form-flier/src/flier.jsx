import React, { useEffect, useState } from "react";
import FlierImage from "./assets/flier.jpg";
import axios from "axios";
import domtoimage from "dom-to-image";

const Flier = () => {
  const apiURL = import.meta.env.VITE_REACT_APP_BASE_URL;
  let data = JSON.parse(localStorage.getItem("ADIS_USER"));
  const [pic, setPic] = useState();
  const [name, setName] = useState("");

  const getUserInfoForFlier = () => {
    let id = data.id;
    let info;
    const url = `${apiURL}/${id}`;
    axios.get(url).then((response) => {
      console.log(response, "response from getting user data");
      info = response.data;
      setPic(info.image);
      setName(info.name);
    });
  };

  useEffect(() => {
    getUserInfoForFlier();
  }, []);

  const handleDownload = () => {
    const node = document.getElementById("flier-content");

    domtoimage.toBlob(node).then(function (blob) {
      const link = document.createElement("a");
      link.href = URL.createObjectURL(blob);
      link.download = "flier.png";
      link.click();
    });
  };
  return (
    <div className="flex flex-col items-center justify-center mt-[200px] md:mt-10 bg-transparent">
      <div className="relative" id="flier-content">
        <div className="w-[350px] h-[350px] md:w-[500px] md:h-[500px]">
          <img src={FlierImage} />
        </div>
        <div className="w-[150px] md:w-[250px] flex flex-col items-center justify-center bg-green-70 absolute bottom-3 md:bottom-[35px] left-2 md:-right-0 md:-left-2">
          {pic && (
            <img
              src={pic}
              alt="User Profile"
              className="w-[100px] md:w-[152px] h-[150px] md:h-[200px] rounded-t-full"
            />
          )}
          <p className="font-semibold text-white text-xs p-2">{name}</p>
        </div>
      </div>
      <div
        className="h-[60px] bg-purple-900 flex items-center justify-center font-semibold text-white rounded w-[350px] md:w-[500px] my-10 cursor-pointer"
        onClick={handleDownload}
      >
        Download
      </div>
    </div>
  );
};

export default Flier;
