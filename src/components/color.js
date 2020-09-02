import React, {useState} from 'react';

const Color = ({red, green, blue, fraction}) => {

  const rgb_color = `(${red}, ${green}, ${blue})`;
  console.log(rgb_color);
  const width = (fraction * 100).toFixed(1);

  const styles = {
    height: '20vh',
    width: `${width}vw`,
    backgroundColor: `rgb${rgb_color}`,
    display: 'inline',
  }

  
  return (
    <section className="colorBlock" style={styles}>
    </section>
  );
}

export default Color;