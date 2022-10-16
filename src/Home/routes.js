import React,{ Fragment } from "react";
import { Route, Routes } from "react-router-dom";
import { AdminHomePage } from "./pages/home.admin";
import {  HomePage } from "./pages/homeNew";

export const HomeRelatedRoutes = () => {
    return(
        <Fragment>
            <Routes>
                <Route index element={<HomePage/>} />
                <Route path="/admin" element={<AdminHomePage/>} />
                <Route path="/:id" element={<HomePage/>} />
            </Routes>
        </Fragment>
    );
};
