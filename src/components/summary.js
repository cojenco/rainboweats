import React, {useState} from 'react';
import axios from 'axios';
// axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';

const Summary = ({uID}) => {
  const timestamp = Date.now();
  const [weekly, setWeekly] = useState([]);


  const onSummaryClick = (event) => {
    console.log('clicked requesting summary');
    const params = {
      'message': uID
    };
    console.log(params);
    // axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
    axios
    .get('https://us-central1-keen-boulder-286521.cloudfunctions.net/callWeeklyColors')
    .then((response) => {
      console.log(response.data);
      setWeekly(response.data.colors);
    })
    .catch((error) => {
      console.log(error.message);
    });
  }

  
  return (
    <section className="container">
      <h3> Summary </h3>
      <button onClick={onSummaryClick} > Get Summary </button>
    </section>
  );
}

export default Summary;