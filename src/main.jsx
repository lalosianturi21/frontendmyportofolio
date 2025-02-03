import './index.css'
import React from 'react'
import ReactDOM from "react-dom/client";
import App from './App.jsx'
import axios from 'axios';
import { Provider } from "react-redux";
import { BrowserRouter } from 'react-router-dom';
import { QueryClientProvider, QueryClient } from "@tanstack/react-query"


const queryClient = new QueryClient ({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
    }
  }
})

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <BrowserRouter> 
      <App />
  </BrowserRouter>
)