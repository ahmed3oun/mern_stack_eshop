import axios from 'axios'   
import {  ALL_PRODUCTS_FAIL, ALL_PRODUCTS_REQUEST,ALL_PRODUCTS_SUCCESS, CLEAR_ERRORS} from "../constants/productConstants";
 export const getProducts = ()=> async (dispatch)=> {
     try {
         dispatch({
            type:ALL_PRODUCTS_REQUEST
         })
         const result  = await axios.get('/products')
         console.log(result.data)
         
         dispatch({
             type : ALL_PRODUCTS_SUCCESS,
             payload : {products : result.data.products , productsCount : result.data.productsCount}
         })
     } catch (error) {
         dispatch({
             type : ALL_PRODUCTS_FAIL,
             payload : error.response.data.message
         })
     }
 }

 export const clearErrors = ()=> async (dispatch)=>{
     dispatch({
         type: CLEAR_ERRORS
     })

 }