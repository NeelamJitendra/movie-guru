import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from "../Header/Header";
import BookingPage from "../ReservePage/ReservePage";
import AdminPage from "../AdminPage/AdminPage";

const Main = () => {
    
    return (
        <div>
            <Header/>
            <Router>
                <Routes>
                <Route exact path="/"element={<BookingPage/>}/>
                <Route exact path="/Admin" element={<AdminPage/>}/>
                </Routes>
            </Router>
        </div>
    )
};

export default Main;