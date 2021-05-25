import axios from 'axios'   
import {  ALL_PRODUCTS_FAIL, ALL_PRODUCTS_REQUEST,ALL_PRODUCTS_SUCCESS, CLEAR_ERRORS,
            PRODUCT_DETAILS_FAIL,PRODUCT_DETAILS_REQUEST,PRODUCT_DETAILS_SUCCESS} from "../constants/productConstants";
 export const getProducts = (keyword = '',currentPage = 1 ,price)=> async (dispatch)=> {
     try {
         dispatch({
            type:ALL_PRODUCTS_REQUEST
         })
         const link = `/products?keyword=${keyword}&page=${currentPage}&price[lte]=${price[1]}&price[gte]=${price[0]}`;
         const result  = await axios.get(link)
         
         dispatch({
             type : ALL_PRODUCTS_SUCCESS,
             payload : {
                 products : result.data.products ,
                 productsCount : result.data.productsCount ,
                 resPerPage : result.data.resPerPage
                        }
             
         })
     } catch (error) {
         dispatch({
             type : ALL_PRODUCTS_FAIL,
             payload : error.message
         })
     }
 }
 export const getProductDetails = (id) => async (dispatch) => {
        try{dispatch({
            type : PRODUCT_DETAILS_REQUEST
        })
        const result = await axios.get(`/products/${id}`)
        dispatch({
            type : PRODUCT_DETAILS_SUCCESS,
            payload : result.data.product
        })}catch(error){
            dispatch({
                type : PRODUCT_DETAILS_FAIL,
                payload : error.message
            })
        }


 }
 export const clearErrors = ()=> async (dispatch)=>{
     dispatch({
         type: CLEAR_ERRORS
     })

 }