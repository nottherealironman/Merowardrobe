import React, { Component } from 'react';
import HeaderDesktop from './header/HeaderDesktop';
import HeaderMobile from './header/HeaderMobile';
import MenuMobile from './header/MenuMobile';

class Header extends Component{
  render () {
    return (
      <header className="header1">
          <HeaderDesktop/>
          <HeaderMobile/>
          <MenuMobile/>   
      </header>
    );
  }
};

export default Header;