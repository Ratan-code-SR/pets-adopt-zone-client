import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import router from './Route/Route';
import { RouterProvider } from "react-router-dom";
import ContextProvider from './components/Provider/ContextProvider';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

// Create a new QueryClient instance
const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ContextProvider>
      <QueryClientProvider client={queryClient}>
        <div className='max-w-screen-xl mx-auto'>
          <RouterProvider router={router} />
        </div>
      </QueryClientProvider>
    </ContextProvider>
  </React.StrictMode>
);
