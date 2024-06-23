// src/Bullet.js
/*
import React from 'react';*/
import bulletImgSrc from './assets/bullet.png';/*
import styled, { css, keyframes } from 'styled-components';

const Bullet = ({ x, y, angle }) => {
  const style = {
    position: 'absolute',
    left: `${x}px`,
    top: `${y}`,
    width: '5px',
    height: '10px',
    
    transform: `rotate(${angle}deg)`,
    animation: ( ) => css`${rotateAnimation} 2s linear infinite`
  };

  const rotateAnimation = keyframes`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`;
  

  return <div className='bullet' style={style}><img src={bulletImgSrc} alt="" />{angle}</div>;
};

export default Bullet;
*/

import React, { useEffect, useState } from 'react';
import './App.css'; // Import CSS for styling

const Bullet = ({ x, y, ox, oy, angle }) => {
  const [isVisible, setIsVisible] = useState(true);
  const [position, setPosition] = useState({ x: ox, y: oy });

  useEffect(() => {
    handleClick();
    setTimeout(function () {
      setIsVisible(false)
    }, 300);
  }, []);

  const handleClick = () => {
    // Example: Change position to animate
    setPosition({ x: x, y: y }); // Example final position
  };

  const style = {
    transform: `rotate(${angle}rad)`
  };

  return (
    <>
    {
      isVisible && (
      <div className="sliding-square" style={{ transform: `translate(${position.x}px, ${position.y}px)` }} onClick={handleClick} >
        <img style={style} src={bulletImgSrc} />
      </div>
    )
    
    }
    </>
  );
};

export default Bullet;

