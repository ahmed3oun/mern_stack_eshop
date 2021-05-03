import './App.css'
import Home from './Components/Home';
import Footer from './Components/layout/Footer'
import Header from './Components/layout/Header'

function App() {
    return (
        <div className="App" >
            <Header/>
            <Home/>
            <Footer/>
        </div>
    );
}

export default App;