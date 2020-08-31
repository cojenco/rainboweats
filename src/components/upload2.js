import React from 'react';


function Upload2 (props) {

  function previewFile() {
    const preview = document.querySelector('img');
    const file = document.querySelector('input[type=file]').files[0];
    const reader = new FileReader();
  
    reader.addEventListener("load", function () {
      // convert image file to base64 string
      preview.src = reader.result;
    }, false);
  
    if (file) {
      reader.readAsDataURL(file);
    }
  }

  const onUploadClick = (event) => {
    const preview = document.querySelector('img');
    const file = document.querySelector('input[type=file]').files[0];
    const reader = new FileReader();
    console.log('this is file');
    console.log(file);

    reader.onload = function(e) {
      console.log(e.target);
      console.log('e.target.result');
      console.log(e.target.result);
    }
  
    const data = reader.readAsDataURL(file);
    // const data = reader.readAsArrayBuffer(file);

    // https://developer.mozilla.org/en-US/docs/Web/API/FileReader/readAsDataURL
    // The blob's result cannot be directly decoded as Base64 without first removing the Data-URL declaration preceding the Base64-encoded data. To retrieve only the Base64 encoded string, first remove data:*/*;base64, from the result.
    // call cloud function 
  
    // do something: make an http call to the uploadfile function I wrote
    }

  
  return (
    <section className="container">
      <input type="file" onchange="previewFile()"></input>
      <img src="" height="200" alt="Image preview..."/>
      <button onClick={onUploadClick} > UPLOAD </button>
    </section>
  );
}

export default Upload2;