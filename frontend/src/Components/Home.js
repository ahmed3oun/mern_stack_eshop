import React, { Fragment , useEffect, useState} from 'react'
import MetaData from './layout/MetaData'
import Pagination from 'react-js-pagination'
import { useDispatch , useSelector } from "react-redux";
import { getProducts } from "../actions/productActions";
import Product from './product/Product';
import Loader from './layout/Loader';
import { useAlert } from 'react-alert';
import Slider from 'rc-slider'
import 'rc-slider/assets/index.css'

const { createSliderWithTooltip } = Slider
const Range = createSliderWithTooltip(Slider.Range)

const Home = ({match}) => {

    const [currentPage, setCurrentPage] = useState(1)
    const [price , setPrice] = useState([1 , 1000])

    const dispatch = useDispatch()
    const { products , loading , productsCount , error , resPerPage} = useSelector(state => state.productsReducer)
    //const products = useSelector(state => state.productsReducer)

    const alert = useAlert()

    const keyword = match.params.keyword

    
    useEffect(() => {
     error ? alert.error('Something gone wrong') : dispatch(getProducts(keyword,currentPage,price))
    }, [dispatch,alert,error,keyword,currentPage, price])

    function setCurrentPageNo(pageNumber) {
        setCurrentPage(pageNumber)
    }

    return (
        
        
        <Fragment>
            {loading ? <Loader/> : ( 
                <Fragment>
                    
                    <MetaData title={'Buy Best Products Online'}/>
                    <h1 id="products_heading">Latest products </h1>
                    <section id="products" className="container mt-5">
                        <div className="row"> 
                        {keyword ? (
                                <Fragment>
                                    <div className="col-6 col-md-3 mt-5 mb-5">
                                        <div className="px-5">
                                            <Range
                                                marks={{
                                                    1: `$1`,
                                                    1000: `$1000`
                                                }}
                                                min={1}
                                                max={1000}
                                                defaultValue={[1,1000]}
                                                tipFormatter={value => `$${value}`}
                                                tipProps={{
                                                    placement: "top",
                                                    visible: true
                                                }}
                                                value={price}
                                                onChange={price => setPrice(price)}
                                            />
                                            </div>
                                        </div>
                                        <div className="col-6 col-md-9">
                                            <div className="row">
                                                {products.map(product => (
                                                    <Product  product={product} col={4} />
                                                ))}
                                            </div>
                                        </div>
                                </Fragment>
                            ) : (
                                     products.map(product => (
                                        <Product key={product._id} product={product} col={3} />
                                    ))
                                )}



                        </div>
                    </section>
                </Fragment>)}
                
                        <div className="d-flex justify-content-center mt-5">
                            <Pagination
                                activePage="2"
                                itemsCountPerPage={resPerPage}
                                totalItemsCount={productsCount}
                                onChange={setCurrentPageNo}
                                nextPageText={'Next'}
                                prevPageText={'Prev'}
                                firstPageText={'First'}
                                lastPageText={'Last'}
                                itemClass="page-item"
                                linkClass="page-link"
                            />
                        </div>
                    
        </Fragment>

        
    )
}

export default Home
