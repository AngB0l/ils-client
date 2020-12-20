import './App.css';
import { BrowserRouter as Router } from 'react-router-dom';
import Routes from "./routes";


function App() {
    return (
        // <div className="App">
        //     <MainLayout></MainLayout>
        // </div>
        <div>
            <Router>
                <Routes />
            </Router>
        </div>
    );
}

export default App;


