import React,{ Fragment } from "react";
import { Route, Routes } from "react-router-dom";
import { SignupPage } from "./page/signup";

export const SignupRelatedRoutes = () => {
    return(
        <Fragment>
            <Routes>
                <Route index element={<SignupPage/>} />
            </Routes>
        </Fragment>
    );
};
