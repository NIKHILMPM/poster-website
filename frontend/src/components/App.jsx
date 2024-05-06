import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './Home';
import Login from './Login';
import Signup from './Signup';
import { Productpage } from './Productpage';
import { Cart } from './Cart';
import { Productview } from './Productview';
import { Checkout } from './Checkout';
import { Userorders } from './Userorders';
import {Slide} from './Slide';
import { OrderHistory } from './OrderHistory';



const App = () => {
  return (
    <div>
      <Router>
        <Routes>
          <Route index element={<Home />} />
          <Route path="/home" element={<Home />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route path="/products" element={<Productpage />} />
          <Route path="/cart" element={<Cart/>} />
          <Route path="/productview/:id" element={<Productview/>} />
          <Route path="/checkout" element={<Checkout/>} />
          <Route path="/orders" element={<Userorders/>} />
          <Route path="/slide" element={<Slide/>} />
          <Route path="/orderHistory" element={<OrderHistory/>} />


        </Routes>
      </Router>
    </div>
  );
};

export default App;
