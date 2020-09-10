import React, {useState} from 'react';
import axios from 'axios';
import Color from './color';
import './summary.css';
import { PieChart } from 'react-minimal-pie-chart';
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';

const Summary = ({uID}) => {
  const timestamp = Date.now();
  const [weekly, setWeekly] = useState([]);
  const [chart, setChart] = useState(false);
  const [summaryMessage, setSummaryMessage] = useState('');
  

  const onSummaryClick = (event) => {
    if (uID) {
      console.log('clicked requesting summary');
      const params = {
        'message': uID
      };

      axios
      .get(`https://us-central1-keen-boulder-286521.cloudfunctions.net/callWeeklyColors?message=${uID}`)
      .then((response) => {
        // console.log(response.data.colors);
        setWeekly(response.data.colors);

        if (response.data.colors.length === 0) {
          setSummaryMessage('No rainbow in sight. Please upload your daily meals first.')
          setChart(false)
        } else {
          setChart(true);
        };
      })
      .catch((error) => {
        console.log(error.message);
      });
    } else {
      setSummaryMessage('Please sign in with Google pop-up first')
      setChart(false)
    }
  }

  let allColorsResults = weekly.sort((a, b) => b.red - a.red || a.green - b.green);
  allColorsResults = weekly.map((color) => {
    const key = Date.now();
    return (
      <Color key={key} red={color.red} green={color.green} blue={color.blue} fraction={color.pixel_fraction} />
    );
  })

  // Converting RGB to Hue 0~360 degree to better categorize colors
  // Reference: https://medium.com/@donatbalipapp/colours-maths-90346fb5abda
  let hues = [];
  let color;
  for (color of weekly) {
    const r = color.red / 255;
    const g = color.green / 255;
    const b = color.blue / 255;
    const fraction = color.pixel_fraction.toFixed();
    let h = 0;

    if (r >= g && g >= b) {
      h = 60 * ((g-b)/(r-b));
    } else if (g > r && r >= b) {
      h = 60 * (2 - (r-b)/(g-b));
    } else if (g >= b && b > r) {
      h = 60 * (2 + (b-r)/(g-r));
    } else if (b > g && g > r) {
      h = 60 * (4 - (g-r)/(b-r));
    } else if (b > r && r >= g) {
      h = 60 * (4 + (r-g)/(b-g));
    } else if (r >= b && b > g) {
      h = 60 * (6 - (b-g)/(r-g));
    };

    hues.push(h.toFixed());
  }

  // CATEGORIZING COLORS into Red & Pink, Orange& Yellow, Green, Blue& Purple
  // CATEGORIZING COLORS BASED ON HUE (their position in the color wheel)
  // red & pink: 0-30 / 300-360
  // orange & yellow: 30 - 120
  // green: 120 - 210
  // blue & purple: 210 - 300
  let groups = {
    'redPink': 0,
    'orangeYellow': 0,
    'greenish': 0,
    'bluePurple': 0,
  }

  let hue;
  for (hue of hues) {
    if (hue >= 30 && hue < 120) {
      groups.orangeYellow += 1;
    } else if (hue >= 120 && hue < 210) {
      groups.greenish += 1;
    } else if (hue >= 210 && hue < 300) {
      groups.bluePurple += 1;
    } else if (hue >= 300 && hue <= 360) {
      groups.redPink += 1;
    } else if (hue >= 0 && hue < 30) {
      groups.redPink += 1;
    }
  }
  // console.log('color groups');
  // console.log(groups);

  const data = [
    { title: 'RED & PINK', value: groups.redPink, color: '#ff6f57' },
    { title: 'ORANGE & YELLOW', value: groups.orangeYellow, color: '#FDD218' },
    { title: 'GREEN', value: groups.greenish, color: '#A7D13C' },
    { title: 'BLUE & PURPLE', value: groups.bluePurple, color: '#b367b1' },
  ]

  // FIND color category with least consumption, and this is the color to recommend more bites
  // const minColor = Object.keys(groups).reduce((a, b) => groups[a] < groups[b] ? a : b);
  const minColor = data.reduce((a, b) => a.value < b.value ? a : b);
  const moreFood = COLORFOODS[minColor.title];
 


  return (
    <section className="container">

      <button onClick={onSummaryClick} className="btn btn-info btn-block"> SUMMARY </button>

      {chart ? 
      <div>
        <section className="w-50 container align-self-center justify-content-center align-items-center my-5">
          <PieChart
            data={data}
            animate={true}
            animationDuration={500}
            animationEasing="ease-out"
            center={[50, 50]}
            labelPosition={65}
            lengthAngle={360}
            lineWidth={65}
            paddingAngle={0}
            radius={50}
            startAngle={0}
            viewBoxSize={[100, 100]}
            label={({ dataEntry }) => `${Math.round(dataEntry.percentage)} %`}
            labelStyle={{
              fontSize: "0.1rem",
              fontColor: "#FFFFFF",
            }}
          />
        </section>
        <section className="recommend-box my-5" >  
          <h3>Add more {minColor.title} to your plate!</h3>
          <h4>{moreFood}</h4>
          <h5 className="blue-font">The best way to get more vitamins, minerals and nutrients is to eat a variety of colorful fruits and veggies.</h5>      
        </section>
      </div>

       : <p className="my-3"> {summaryMessage} </p> }


      {/* <section className="d-flex flex-wrap"> {allColorsResults} </section> */}
    </section>
  );
}

export default Summary;


const COLORFOODS = {
  'RED & PINK': 'apples, beets, cherries, grapefruit, pomegranates, red radishes, red peppers, tomatoes',
  'ORANGE & YELLOW': 'apricots, carrots, corn, lemons, oranges, pumpkins, squash, tangerines, yams',
  'GREEN': 'asparagus, avocados, broccoli, celery, green peppers, kale, kiwi, peas, spinach, zucchini',
  'BLUE & PURPLE': 'blackberries, blueberries, eggplant, grapes, plums, purple onions, red cabbage, red onions',
}