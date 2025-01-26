import './App.css';
import WeatherReport from './pages/WeatherReport.tsx';
import { BrowserRouter, Routes } from 'react-router-dom';
import { Route } from 'react-router';
import Favorites from './pages/Favorites.tsx';

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<WeatherReport />} />
          <Route path="/favorites" element={<Favorites />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
