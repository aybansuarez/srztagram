import React from 'react';
import { Image } from 'react-bootstrap';

import logo from '../assets/snaprz.png';


function Logo(props) {
  return (
    <Image src={logo} style={{ width: props.width, filter: 'brightness(0) invert(1)' }} fluid />
  )
}

export default Logo;