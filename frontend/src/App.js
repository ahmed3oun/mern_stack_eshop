import './App.css'
import Home from './Components/Home';
import Footer from './Components/layout/Footer'
import Header from './Components/layout/Header'
import {BrowserRouter  as Router , Route } from 'react-router-dom'


function App() {
    return (
        <Router>
            <div className="App" >
                <Header/>
                <div class="container container-fluid">
                    <Route path="/" component={Home}/>
                </div>
                <Footer/>
            </div>
        </Router>
    );
}

export default App;