import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Homesite from './Pages/homesite/homesite';
import Items from './Pages/Item Page/Items';
import Subscription from './Pages/Subscription Page/Subscription';
import SelectCompany from './Pages/Select Company Page/SelectCompany';
import Appbar from './Pages/AppBar_Item/AppBar';
import CreateCompany from './Pages/CreateCompany/CreateCompany';
import Viewlist from './Pages/View List/Viewlist';
   

function App() {
  return (
    <div>

      <Appbar />
      <BrowserRouter>
        <Routes>
          <Route exact path="/" element={<Homesite />} />
          <Route path="/items" element={<Items />} />
          <Route path="/subscription" element={<Subscription />} />
          <Route path="/selectcompany" element={<SelectCompany />} />
          <Route path="/createacompany" element={<CreateCompany />} />
          <Route path="/view" element={<Viewlist />} />

        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;