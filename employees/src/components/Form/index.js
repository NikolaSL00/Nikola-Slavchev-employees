import "./Form.css";
import { useState } from "react";
import Papa from "papaparse";

const Form = ({ setData }) => {
  const [file, setFile] = useState(null);
  const [error, setError] = useState("");

  const handleFileChange = (e) => {
    setFile(() => e.target.files[0]);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!file) {
      return;
    }

    Papa.parse(file, {
      worker: true,
      complete: function (results) {
        setData(results.data);
      },
      error: function (error) {
        setError(error.message);
      },
    });
  };

  return (
    <form className="form" onSubmit={handleSubmit}>
      <div className="file-container">
        <label className="btn" htmlFor="file">
          Select file
        </label>
        <input id="file" type="file" onChange={handleFileChange} hidden />

        <div className="file-info">{file && `${file.name} - ${file.type}`}</div>
      </div>

      <div className="file-container">
        <button className="btn">Upload</button>
        {error && <p>{error}</p>}
      </div>
    </form>
  );
};

export default Form;
