import React, {useState} from 'react';
import axios from 'axios';
import Color from './color';
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';

const Summary = ({uID}) => {
  const timestamp = Date.now();
  const [weekly, setWeekly] = useState([]);


  const onSummaryClick = (event) => {
    console.log('clicked requesting summary');
    const params = {
      'message': uID
    };

    axios
    .get(`https://us-central1-keen-boulder-286521.cloudfunctions.net/callWeeklyColors?message=${uID}`)
    .then((response) => {
      console.log(response.data);
      setWeekly(response.data.colors);
    })
    .catch((error) => {
      console.log(error.message);
    });
  }

  const allColorsResults = weekly.map((color) => {
    const key = Date.now();
    return (
      <Color key={key} red={color.red} green={color.green} blue={color.blue} fraction={color.pixel_fraction} />
    );
  })

  
  return (
    <section className="container">
      <h3> Summary </h3>
      <button onClick={onSummaryClick} > Get Summary </button>

      <section className="d-flex flex-wrap"> {allColorsResults} </section>
    </section>
  );
}

export default Summary;