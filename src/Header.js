import React, { Component } from 'react';
import './index.css';

class Header extends Component {
    render(){
        return(
          <div className="Header">
            <h1 className="text-center pb-1">React Number Guessing Game</h1>
            <p className="p-2">Random number selected between 1 and 100. See if you can guess it in 10 turns or fewer.</p>
          </div>
        );
    }
}

export default Header;