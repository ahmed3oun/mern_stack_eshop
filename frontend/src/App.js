import './App.css'
import Home from './Components/Home';
import Footer from './Components/layout/Footer'
import Header from './Components/layout/Header'
import {BrowserRouter  as Router , Route } from 'react-router-dom'
import ProductDetails from './Components/product/ProductDetails';
import Login from './Components/user/Login';


function App() {
    return (
        <Router>
            <div className="App" >
                <Header/>
                <div class="container container-fluid">
                    <Route path="/" component={Home} exact/>
                    <Route path="/search/:keyword" component={Home} />
                    <Route path="/product/:id"  component={ProductDetails} exact/>
                    <Route path="/login/"  component={Login} exact/>
                    
                </div>
                <Footer/>
            </div>
        </Router>
    );
}

export default App;