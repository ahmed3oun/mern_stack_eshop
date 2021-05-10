import React, { Fragment , useEffect} from 'react'
import MetaData from './layout/MetaData'
import { useDispatch , useSelector } from "react-redux";
import { getProducts } from "../actions/productActions";
import Product from './layout/Product';


const Home = () => {


    const dispatch = useDispatch()
    const   products  = useSelector(state => state.productsReducer.products)
    const   loading  = useSelector(state => state.productsReducer.loading)
    const   productsCount  = useSelector(state => state.productsReducer.productsCount)
        
    useEffect(() => {
        dispatch(getProducts())
        
    }, [dispatch])
    return (
        
         
        <Fragment>
            <MetaData title={'Buy Best Products Online'}/>
            <h1 id="products_heading">Latest products </h1>
            <section id="products" className="container mt-5">
            <div className="row">
                { loading &&  <h1>LOADING ... </h1> }
                
                { products && products.map(product => <Product key={product._id} product={product} col={4} /> )}
            
            </div>
            
    </section>

        </Fragment>
    )
}

export default Home
