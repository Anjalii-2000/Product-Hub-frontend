import Home from './pages/Home/Home';
import SingleProduct from "./pages/Product/SingleProduct";
import './index.css'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import CategoryDetail from './pages/CategoryDetailPage/CategoryDetailPage';
import Category from './pages/Category/Category';
import Favourties from './pages/Favourites/Favourties';
import LoginPage from './pages/Auth/LoginPage';
import RegisterPage from './pages/Auth/RegisterPage';
import Dashboard from "./pages/Dashboard/Dashboard";
import PrivateRoute from "./Components/PrivateRoute";
import Seller from './pages/Dashboard/Seller';
import Customer from './pages/Dashboard/Customer';
import CustomerHome from './Components/Customer/CustomerHome/CustomerHome';
import CustomerProduct from './Components/Customer/products/CustomerProduct';
import CustomerCart from './pages/Customer/CustomerCart';
import CustomerWishlist from './pages/Customer/CustomerWishlist'
import CustomerEditProfile from './Components/Customer/CustomerEditProfile/CustomerEditProfile';
import Success from './pages/Payment/Success';
import Cancel from './pages/Payment/Cancel';


function App() {
  return (
    <>

      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/product/:id" element={<SingleProduct />} />
          <Route path='/categorydetailpage/:id' element={<CategoryDetail />} />
          <Route path='/category' element={<Category />} />
          <Route path='/category/:id' element={<Category />} />
          <Route path='/favourites' element={<Favourties />} />
          <Route path='/login' element={<LoginPage />} />
          <Route path='/register' element={<RegisterPage />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/dashboard/seller" element={<PrivateRoute role="seller">
            <Seller />
          </PrivateRoute>
          } />
          <Route path='/dashboard/customer/product' element={<PrivateRoute role="customer"><CustomerProduct /> </PrivateRoute>} />
          <Route path="/dashboard/customer" element={
            <PrivateRoute role="customer">
              <Customer />
            </PrivateRoute>
          } >
            <Route index element={<CustomerHome />} />
            <Route path='/dashboard/customer/customercart' element={<CustomerCart />} />
            <Route path='/dashboard/customer/customerwishlist' element={<CustomerWishlist />} />
          </Route>
          
          <Route path='/dashboard/customer/editprofile' element={<CustomerEditProfile />} />
          <Route path='/payment-success' element={<Success />} />
          <Route path='/payment-cancel' element={<Cancel />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;