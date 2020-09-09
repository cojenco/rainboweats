import React from 'react';
import axios from 'axios';
import './upload2.css';
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';

function Upload2 ({uID}) {
  const timestamp = Date.now();
  console.log (`this is timestamp ${timestamp}`);

  const onUploadClick = (event) => {
    const preview = document.querySelector('img');
    const file = document.querySelector('input[type=file]').files[0];
    const reader = new FileReader();
    console.log('this is file');
    console.log(file);
    console.log(file.name);

    reader.onload = function(e) {
      console.log(e.target);
      console.log('e.target.result');
      console.log(e.target.result);
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
      })
      .catch((error) => {
        console.log(error.message);
      });
    }
  
    const data = reader.readAsDataURL(file);
    // const data = reader.readAsArrayBuffer(file);
    const uint8View = new Uint8Array(file);
    console.log('uint8View');
    console.log(uint8View);
    }

  
  return (
    <section className="container">
      <label class="btn btn-outline-info btn-block upload-label-tag">
        <span>Upload an image of your meal </span>
        <input type="file" className="upload-input-tag"></input>
      </label>
      
      <button onClick={onUploadClick} className="btn btn-info btn-block"> UPLOAD </button>
    </section>
  );
}

export default Upload2;