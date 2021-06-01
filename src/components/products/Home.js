import React, { useEffect, useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import { connect } from "react-redux";
import Listitem from "./Listitem";
import "../css/home.css";
import Loader from "../layout/Loader";
import Jumbotron from "../layout/Jumbotron";
import Slider from "../layout/Slider";
import {
  getProducts,
  fetchNextSetOfData,
  addtoCart,
  getCart,
} from "../../actions/productActions";

const Home = ({
  getProducts,
  products,
  loading,
  fetchNextSetOfData,
  getCart,
}) => {
  const [skip, setSkip] = useState(10);

  useEffect(() => {
    getProducts();
    getCart();
    // eslint-disable-next-line
  }, []);

  if (!products || loading) {
    return <Loader />;
  }

  const fetchData = () => {
    const limit = 10;
    fetchNextSetOfData(limit, skip);
    setSkip(skip + 10);
  };

  return (
    <>
      <Jumbotron />
      <div>
        <Slider />
      </div>
      <InfiniteScroll
        dataLength={products.length}
        //This is important field to render the next data
        next={fetchData}
        hasMore={true}
        loader={<h4>Loading...</h4>}
        endMessage={
          <p style={{ textAlign: "center" }}>
            <b>Yay! You have seen it all</b>
          </p>
        }
      >
        <div>
          <ul id='product-ul'>
            {products &&
              products.length &&
              products.map((product) => {
                return <Listitem key={product._id} product={product} />;
              })}
          </ul>
        </div>
      </InfiniteScroll>

      <a href='#main-img'>
        <i className='fas fa-arrow-up  up-arrow'></i>
      </a>
    </>
  );
};

const mapStateToProps = (state) => ({
  products: state.product.products,
  loading: state.product.loading,
});

export default connect(mapStateToProps, {
  getProducts,
  fetchNextSetOfData,
  addtoCart,
  getCart,
})(Home);
