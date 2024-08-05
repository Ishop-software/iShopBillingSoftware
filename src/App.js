import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Items from './Pages/Item Page/Items';

function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route exact path="/" element={<Items />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
