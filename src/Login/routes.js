import React,{ Fragment } from "react";
import { Route, Routes } from "react-router-dom";
import { LoginPage } from "./Pages/login.page";


export const LoginRelatedRoutes = () => {
    return(
        <Fragment>
            <Routes>
                <Route path="" element={<LoginPage/>} />
            </Routes>
        </Fragment>
    );
};
