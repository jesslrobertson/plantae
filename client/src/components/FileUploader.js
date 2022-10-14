import React, { useContext, useState } from "react";
import { ContentContext } from "../context/ContentProvider";

export default function FileUploader(){
  const { uploadFile, uploadedFile, state } = useContext(ContentContext)
  const [file, setFile] = useState("");
  const [fileName, setFileName] = useState("Choose file");

  const userId = state.user._id


  function onChange(e) {
    setFile(e.target.files[0]);
    setFileName(e.target.files[0].name);
  }

  const handleFileUpload = e => {
    e.preventDefault();

    uploadFile(file, fileName, userId);
  };

  return (
    <div className='file-uploader-box'>
      <form name="file-uploader-form" onSubmit={handleFileUpload}>
      <label>{fileName}</label>
      <input type="file" onChange={onChange} />
      <button type="submit">Upload</button>
      {uploadedFile ? (
        <img src={uploadedFile.filePath} />
      ) : null}
      </form>
    </div>
  );
}
