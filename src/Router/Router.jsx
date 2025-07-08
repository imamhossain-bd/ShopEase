import React from 'react';
import { createBrowserRouter } from 'react-router-dom';
import Root from '../Layout/Root';
import CartPage from '../Pages/CartPage/CartPage';
import CartPageDetails from '../Pages/CartPage/CartPageDetails';
import Home from '../Pages/Home/Home';
import AddProduct from '../Pages/AddProduct/AddProduct';

const Router = createBrowserRouter([
  {
    path: '/',
    element: <Root />,
    children:[
        {
            path: '/',
            element:<Home></Home>
        },
      {
        path: '/cartpage',
        element: <CartPage />
      },
      {
        path: '/product/:id',
        element: <CartPageDetails />
      },
      {
        path: '/products',
        element: <AddProduct></AddProduct>
      }
    ]
  }
]);

export default Router;
