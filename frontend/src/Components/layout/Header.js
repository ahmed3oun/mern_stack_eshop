import React, { Fragment } from 'react'
import  '../../App.css'
import { Link, Route } from "react-router-dom";
import Search from './Search'

const Header = () => {
    return (
        <Fragment>
            <nav className="navbar row">
              <div className="col-12 col-md-3">
                    <div className="navbar-brand" style={{display : "inline-block"}}>
                        <Link to="/">
                        <img src="/images/logo.png" style={{width:160 , height:50 }} />
                        <h4><i style={{ color : '#febd69', paddingLeft:'32px'}}>E-Shop</i></h4>
                        </Link>
                    </div>
              </div>
                    
              
              <div className="col-12 col-md-6 mt-2 mt-md-0">
                  <Route render={({ history }) => <Search history={history} />} />
              </div>

              <div className="col-12 col-md-3 mt-4 mt-md-0 text-center">
                <Link to="/login" className="btn" id="login_btn">Login</Link>

                <span id="cart" className="ml-3">Cart</span>
                <span className="ml-1" id="cart_count">2</span>
              </div>
            </nav>
    </Fragment>
    )
}

export default Header;