import axios from "axios";
import React, { useState } from "react";

const Test = () => {
  const [file, setFile] = useState(null);

  const onSubmit = async (e) => {
    e.preventDefault();
    const fd = new FormData();
    fd.append("image", file);
    console.log(file);
    axios({
      method: "POST",
      url: "/api/uploads",
      data: fd,
    }).then((res) => {
      console.log(res.data);
    });
  };

  return (
    <div>
      <form onSubmit={onSubmit} encType="multipart/form-data">
        <input
          type="file"
          onChange={(e) => setFile(e.target.files[0])}
          name="image"
        />
        <input type="submit" value="Submit" />
      </form>
    </div>
  );
};

export default Test;
