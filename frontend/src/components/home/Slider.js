import React, { Component } from 'react';

class Slider extends Component{
  render () {
    return (

      <section className="slide1">
        <div className="wrap-slick1">
          <div className="slick1">
            <div className="item-slick1 item1-slick1" style={{backgroundImage: 'url("/static/images/master-slide-02.jpg")'}}>
              <div className="wrap-content-slide1 sizefull flex-col-c-m p-l-15 p-r-15 p-t-150 p-b-170">
                <span className="caption1-slide1 m-text1 t-center animated visible-false m-b-15" data-appear="fadeInDown">
                  Women Collection 2018
                </span>
                <h2 className="caption2-slide1 xl-text1 t-center animated visible-false m-b-37" data-appear="fadeInUp">
                  New arrivals
                </h2>
                <div className="wrap-btn-slide1 w-size1 animated visible-false" data-appear="zoomIn">
                  {/* Button */}
                  <a href="product.html" className="flex-c-m size2 bo-rad-23 s-text2 bgwhite hov1 trans-0-4">
                    Shop Now
                  </a>
                </div>
              </div>
            </div>
            <div className="item-slick1 item2-slick1" style={{backgroundImage: 'url("/static/images/master-slide-03.jpg")'}}>
              <div className="wrap-content-slide1 sizefull flex-col-c-m p-l-15 p-r-15 p-t-150 p-b-170">
                <span className="caption1-slide1 m-text1 t-center animated visible-false m-b-15" data-appear="rollIn">
                  Women Collection 2018
                </span>
                <h2 className="caption2-slide1 xl-text1 t-center animated visible-false m-b-37" data-appear="lightSpeedIn">
                  New arrivals
                </h2>
                <div className="wrap-btn-slide1 w-size1 animated visible-false" data-appear="slideInUp">
                  {/* Button */}
                  <a href="product.html" className="flex-c-m size2 bo-rad-23 s-text2 bgwhite hov1 trans-0-4">
                    Shop Now
                  </a>
                </div>
              </div>
            </div>
            <div className="item-slick1 item3-slick1" style={{backgroundImage: 'url("/static/images/master-slide-04.jpg")'}}>
              <div className="wrap-content-slide1 sizefull flex-col-c-m p-l-15 p-r-15 p-t-150 p-b-170">
                <span className="caption1-slide1 m-text1 t-center animated visible-false m-b-15" data-appear="rotateInDownLeft">
                  Women Collection 2018
                </span>
                <h2 className="caption2-slide1 xl-text1 t-center animated visible-false m-b-37" data-appear="rotateInUpRight">
                  New arrivals
                </h2>
                <div className="wrap-btn-slide1 w-size1 animated visible-false" data-appear="rotateIn">
                  {/* Button */}
                  <a href="product.html" className="flex-c-m size2 bo-rad-23 s-text2 bgwhite hov1 trans-0-4">
                    Shop Now
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }
};

export default Slider;