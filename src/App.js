import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Homesite from './Pages/homesite/homesite';
import Items from './Pages/Item Page/Items';
import Subscription from './Pages/Subscription Page/Subscription';
import SelectCompany from './Pages/Select Company Page/SelectCompany';
import Appbar from './Pages/AppBar_Item/AppBar';
import CreateCompany from './Pages/CreateCompany/CreateCompany';
import Viewlist from './Pages/View List/Viewlist';
import Field from './Pages/Billpage/field';
import Bill from './Pages/Billpage/bill';
import PageFormat from './Pages/Billpage/page';
import Sales from './Pages/salesPage/sale';
import Login from './Pages/loginPage/LoginPage';
import RegisterPage from './Pages/loginPage/Register/RegisterPage';
import ActivationPage from './Pages/loginPage/Activation/ActivationPage';
import ForgetPassword from './Pages/loginPage/password/forgetPassword';
import Salelist from './Pages/salesPage/salelist/salelist';
import AccountList from './Pages/CreateAccountPage/AccountList';
import AccountViewList from './Pages/CreateAccountPage/AccountList/AccountViewList';


function App() {
  return (
    <div>
      <BrowserRouter>
          <Routes>
            <Route exact path="/"  element={<Login/>}/>
            <Route path="/Register" element={<RegisterPage/>}/>
            <Route path="/forgetpassword" element={<ForgetPassword/>}/>
            <Route path="/Activation" element={<ActivationPage/>}/>
            <Route path="/home" element={<Homesite />} />
            <Route path="/items" element={<Items />} />
            <Route path="/subscription" element={<Subscription />} />
            <Route path="/selectcompany" element={<SelectCompany />} />
            <Route path="/createacompany" element={<CreateCompany />} />
            <Route path='/field' element={<Field />}></Route>
            <Route path='/bill' element={<Bill />}></Route>
            <Route path="/view" element={<Viewlist />} />
            <Route path='/page' element={<PageFormat />}></Route>
            <Route path='/sale' element={<Sales />}></Route>
            <Route path='/salelist' element={<Salelist />}></Route>
            <Route path='/accountlist' element={<AccountList/>}></Route>
            <Route path='/accountviewlist' element={<AccountViewList/>}></Route>
          </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
