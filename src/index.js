import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import reportWebVitals from './reportWebVitals';

// custom routing
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Train from "./pages/Train"
import Main from "./pages/Main"

export default function App() {
  return (
    <BrowserRouter>
      <Routes >
        <Route path="/" element={<Main />} />
        <Route path="/train/trains" element={<Home />} />
        <Route path="/train/trains/123" element={<Train />} />

      </Routes>
    </BrowserRouter>
  );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();