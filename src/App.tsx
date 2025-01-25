import './App.css';
import WeatherReport from './pages/WeatherReport.tsx';
import { BrowserRouter, Routes } from 'react-router-dom';
import { Route } from 'react-router';
import SearchHistory from './pages/SearchHistory.tsx';

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<WeatherReport />} />
          <Route path="/history" element={<SearchHistory />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
