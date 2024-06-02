import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import router from './Route/Route';
import { RouterProvider } from "react-router-dom";
import ContextProvider from './components/Provider/ContextProvider';

ReactDOM.createRoot(document.getElementById("root")).render(

  <React.StrictMode>
    <ContextProvider>
      <RouterProvider router={router} />
    </ContextProvider>
  </React.StrictMode>

);




