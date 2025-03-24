import { BrowserRouter, Route, Routes, useNavigate } from "react-router-dom";
import Home from "./Pages/Home";
import Register from "./Pages/Register";
import Login from "./Pages/Login";
import Profile from "./Pages/Profile";
import Dashboard from "./Pages/Dashboard";
import PrivateRoute from "./Pages/PrivateRoute";
import AddUserPage from "./Pages/AddUserPage";
import AddOrderPage from "./Pages/AddOrderPage";
import Navbar from "./components/Navbar";
import OrderDetailsPage from "./Pages/OrdersDetailsPage";
import OrderListPage from "./Pages/OrderListPage";
// import Navbar from "./components/Navbar";
function App() {

  
  return (
    <div className="dark:bg-black dark:text-white h-screen">
      <BrowserRouter>
        {/* <Navbar/> */}
          {/* <Navbar/> */}
        <Routes>
          <Route path="/" element={<Home/>} />
          <Route path="/register" element={<Register/>} />
          <Route path="/login" element={<Login/>} />
          <Route path="/" element={<PrivateRoute/>}>
          <Route path="profile" element={<Profile/>} />
          <Route path="dashboard" element={<Dashboard/>} />
          <Route path="user/:id" element={<AddUserPage/>} />
          <Route path="addorder" element={<AddOrderPage/>} />
          <Route path="orderlist" element={<OrderListPage/>} />

          <Route path="orders/:id" element={<OrderDetailsPage />} />

          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
