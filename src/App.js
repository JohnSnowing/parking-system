import "./App.css";
import Layout from "./components/Layout/Layout";
import { Routes, Route } from "react-router-dom";
import React from "react";

import ParkingManagement from "./pages/parking/ParkingManagement";
import CarParkedList from "./pages/parking/CarParkedList";
import NewGate from "./pages/parking/NewGate";

function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/" exact element={<ParkingManagement />} />
        <Route path="/parked-cars" element={<CarParkedList />} />
        <Route path="/new-gate" element={<NewGate />} />
      </Routes>
    </Layout>
  );
}

export default App;
