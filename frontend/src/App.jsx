import { Routes, Route } from 'react-router-dom';
import LandingPage from './pages/landing-page';
import MainPage from './pages/main';


function App() {

    return (
        <div className="App">
            <Routes>
                <Route path='/dashboard'
                    element={<MainPage />} />
                <Route path='/' element={<LandingPage />} />
            </Routes>
        </div>
    )
}

export default App
