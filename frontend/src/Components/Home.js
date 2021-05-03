import React, { Fragment } from 'react'
import MetaData from './layout/MetaData'
const Home = () => {
    return (
        <Fragment>
            <MetaData title={'Buy Best Products Online'}/>
            <h1 id="products_heading">Latest products </h1>
            <section id="products" className="container mt-5">
            <div className="row">
                <div className="col-sm-12 col-md-6 col-lg-3 my-3">
                <div className="card p-3 rounded">
                    <img
                    className="card-img-top mx-auto"
                    src="https://m.media-amazon.com/images/I/61pBvlYVPxL._AC_UY218_.jpg"
                    />
                    <div className="card-body d-flex flex-column">
                    <h5 className="card-title">
                        <a href="">AmazonBasics High-Speed HDMI Cable</a>
                    </h5>
                    <div className="ratings mt-auto">
                        <i className="fa fa-star"></i>
                        <i className="fa fa-star"></i>
                        <i className="fa fa-star"></i>
                        <i className="fa fa-star-half-o"></i>
                        <i className="fa fa-star-o"></i>
                        <span id="no_of_reviews">(5 Reviews)</span>
                    </div>
                    <p className="card-text">$75.56</p>

                    <a type="button" href="#" id="view_btn" className="btn btn-block">View Details</a>
                    </div>
                </div>
                </div>

                
            </div>
    </section>
        </Fragment>
    )
}

export default Home
