import AdminDashboard from "./screens/admin/AdminDashboard";

import AdminLogin from "./screens/admin/AdminLogin";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Home from "./screens/userinterface/Home";
import FooterComponent from "./components/userinterface/FooterComponent";
import ProductPageComponent from "./screens/userinterface/ProductPageComponent"
import SideBarComponent from "./components/userinterface/SideBarComponent";
import FilteredProductListComponent from "./components/userinterface/FilteredProductListComponent";

import PlusMinusComponent from "./components/userinterface/PlusMinusComponent";

import LogInScreen from './screens/userinterface/LogInScreen';
import FilterPage from "./screens/userinterface/FilterPage";
import ConfirmOrder from "./components/userinterface/ConfirmOrder";
import Carts from "./screens/userinterface/Carts"




function App() {
  return (
    <div className="App">

      {/* <Categories title="Add New Category" logo="logo.png" /> */}

      {/* <DisplayAllCategory  title="Edit Category" logo="logo.png"  /> */}
      {/* <Brands title="Add Brands" logo="logo.png"   /> */}
      {/* <DisplayAllBrands title="Edit Category" logo="logo.png" /> */}


      <Router>

        <Routes>

          <Route element={<AdminLogin />} path={'/adminlogin'} />

          <Route element={<AdminDashboard />} path={'/admindashboard/*'} />
          <Route element={<Home />} path={'/home'} />

          <Route element={<ProductPageComponent />} path={'/productpage'} />

          <Route element={<SideBarComponent />} path={'/sidebar'} />

          <Route element={<FilteredProductListComponent />} path={'/filterProducts'} />

          {/* <Route element={<Tried />} path={'/filterpage'} /> */}
          <Route element={<FilterPage/>} path={'/filterpage/:pattern'} />
          <Route element={<PlusMinusComponent />} path={'/plusminuscomponent'} />

          {/* <Route element={<Carts/>} path={'/cart'} /> */}
          <Route element={<LogInScreen/>} path={'/loginscreen'} />
          <Route  element={<ConfirmOrder/>} path={'/confirmorder'} />
          <Route element ={<Carts/>} path={'/cart'} />
         

        </Routes>

      </Router>

    </div>
  );
}


export default App;
