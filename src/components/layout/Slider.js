import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import "../css/carosel.css";

const Slider = ({ products }) => {
  const [images, setImages] = useState([]);

  useEffect(() => {
    setImages(products.slice(0, 10));
    //eslint-disable-next-line
  }, []);

  return (
    <div
      id='carouselExampleCaptions'
      className='carousel slide mt-5 mb-5 main-color'
      data-ride='carousel'
    >
      <h5 className='text-center text-muted'>
        {" "}
        <b>Latest in the Store</b>{" "}
      </h5>
      <div className='carousel-inner'>
        <div className='carousel-item active  text-center custom-slider '>
          <div className='d-flex justify-content-center'>
            {images &&
              images.length > 0 &&
              images.slice(0, 5).map((image) => {
                return (
                  <Link
                    to={`/product-details/${image._id}`}
                    className='myitem'
                    key={image._id}
                  >
                    <img src={image.image} className='image' alt='' />{" "}
                    <span className='text-dark'>
                      {image.title.slice(0, 15)}...
                    </span>
                  </Link>
                );
              })}
          </div>
        </div>
        <div className='carousel-item text-center custom-slider '>
          <div className='d-flex justify-content-center'>
            {images &&
              images.length > 0 &&
              images.slice(5).map((image) => {
                return (
                  <Link
                    to={`/product-details/${image._id}`}
                    className='myitem'
                    key={image._id}
                  >
                    <img src={image.image} className='image' alt='' />{" "}
                    <span className='text-dark'>
                      {image.title.slice(0, 15)}...
                    </span>
                  </Link>
                );
              })}
          </div>
        </div>
      </div>
      <a
        className='carousel-control-prev'
        href='#carouselExampleCaptions'
        role='button'
        data-slide='prev'
      >
        <i className='fas fa-chevron-circle-left fa-2x text-dark'></i>
        <span className='sr-only'>Previous</span>
      </a>
      <a
        className='carousel-control-next'
        href='#carouselExampleCaptions'
        role='button'
        data-slide='next'
      >
        <i className='fas fa-chevron-circle-right fa-2x text-dark'></i>
        <span className='sr-only'>Next</span>
      </a>
    </div>
  );
};

const mapStateToProps = (state) => ({
  products: state.product.products,
});

export default connect(mapStateToProps)(Slider);
