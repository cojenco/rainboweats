import React, {useState} from 'react';
import axios from 'axios';
import './upload2.css';
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';

function Upload2 ({uID}) {
  const timestamp = Date.now();
  const [upload, setUpload] = useState(false);
  const [uploadMessage, setUploadMessage] = useState('');

  const onUploadClick = (event) => {
    const file = document.querySelector('input[type=file]').files[0];
    if (upload && uID) {
      console.log("hey hey")
      const reader = new FileReader();
      console.log('this is file');
      console.log(file);
      console.log(file.name);
      const data = reader.readAsDataURL(file);
      // const data = reader.readAsArrayBuffer(file);
      // const uint8View = new Uint8Array(file);
  
      reader.onload = function(e) {
        // console.log(e.target.result);
        const fileInput = e.target.result.split(',')[1];
        const params = {
          'uID': uID,
          'file': fileInput,
          'imageName': `${timestamp}.jpg`,
        };
        console.log(params);
  
        axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
        axios
        .post('https://us-central1-keen-boulder-286521.cloudfunctions.net/testNode1', params)
        .then((response) => {
          console.log(response.data);
          setUploadMessage(`${file.name} successfully uploaded`);
        })
        .catch((error) => {
          console.log(error.message);
        });
      }

      setUpload(false);

    } else if (!uID) {
      setUploadMessage('Please sign in with Google pop-up first');
    } else if (!upload) {
      setUploadMessage('No file chosen');
    }
  };

  
  const onUploadChange = (event) => {
    event.preventDefault();
    setUpload(true);
    setUploadMessage('File chosen');
  };

  
  return (
    <section className="container">
      <label className="btn btn-outline-info btn-block upload-label-tag">
        <span>Upload an image of your dish </span>
        <input type="file" className="upload-input-tag" onChange={onUploadChange} ></input>
      </label>
      
      <button onClick={onUploadClick} className="btn btn-info btn-block"> UPLOAD </button>
      <p className="my-3"> {uploadMessage} </p>
    </section>
  );
}

export default Upload2;