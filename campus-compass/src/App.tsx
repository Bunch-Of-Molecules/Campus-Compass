import {useEffect} from "react";
import {useState} from "react";

import './App.css';

import MapView from './Components/MapView';
import Ribbon from './Components/Ribbon';
import Auth from './Components/Auth';

function App() {

    const [token, setToken] = useState(localStorage.getItem('token'));

    useEffect(() => {
        fetch('http://localhost:3000/locations')
            .then(res => res.json())
            .then(data => {
                console.log('Locations:', data);
            });
    }, []);

    const handleLogout = () => {
        localStorage.removeItem('token');
        setToken(null);
    };

    return (
        <div className="appContainer">
            <Ribbon />

            {!token ? (
                <Auth setToken={setToken} />
            ) : (
                <MapView onLogout={handleLogout} />
            )}
        </div>
    );
}

export default App;