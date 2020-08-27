import React from 'react';
import {useDropzone} from 'react-dropzone';
const fs = require('fs');
const { Storage } = require('@google-cloud/storage');
const storage = new Storage();

function Upload (props) {
  const {acceptedFiles, getRootProps, getInputProps} = useDropzone();

  
  const files = acceptedFiles.map(file => (
    <li key={file.path}>
      {file.path} - {file.size} bytes
    </li>
  ));

  const onUploadClick = () => {
    console.log('preparing to upload')
    if (acceptedFiles.length) {
      console.log('detect files')
      // do something: make an http call to the uploadfile function I wrote
    }
  }
  

  return (
    <section className="container">
      <div {...getRootProps({className: 'dropzone'})}>
        <input {...getInputProps()} />
        <p>Drag 'n' drop some files here, or click to select files</p>
      </div>
      <button onClick={onUploadClick} > UPLOAD </button>
      <aside>
        <h4>Files</h4>
        <ul>{files}</ul>
      </aside>
    </section>
  );
}

export default Upload;