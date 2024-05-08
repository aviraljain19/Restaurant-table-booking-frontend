import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./components/HomePage/Home";
import Reservation from "./components/ReservationPage/Reservation"; // Import your reservation page component
import Navbar from "./components/Navbar/Navbar";
import Login from "./components/Forms/Login";
import Register from "./components/Forms/Register";
import AddTable from "./components/Forms/AddTable";
import SelectTable from "./components/ReservationPage/selectTable";
import AddReservation from "./components/ReservationPage/Reservation";

const App = () => {
  return (
    <Router>
      <Navbar />
      <div>
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/add-table" element={<AddTable />} />
          <Route path="/select-table" element={<SelectTable />} />
          <Route path="/reservation/:tableId" element={<AddReservation />} />
          <Route path="/reservation" element={<Reservation />} />

          {/* Add more routes as needed */}
        </Routes>
      </div>
    </Router>
  );
};

export default App;
