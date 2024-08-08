import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Homesite from './Pages/homesite/homesite';
import Items from './Pages/Item Page/Items';
import Subscription from './Pages/Subscription Page/Subscription';

function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route exact path="/" element={<Homesite />} />
          <Route path="/items" element={<Items />} />
          <Route path="/subscription" element={<Subscription />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
