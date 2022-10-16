import { BrowserRouter, Route, Routes } from "react-router-dom";
import { HomeRelatedRoutes } from "../Home/routes";
import { LoginRelatedRoutes } from "../Login/routes";
import { SignupRelatedRoutes } from "../Signup/routes";
import { UnAuthorized } from "../Unauthorized/pages/unauthorized";

export const MainRoutes = () => (
    <BrowserRouter>
        <Routes>
            <Route index element={<LoginRelatedRoutes/>}/>
            <Route path="signup" element={<SignupRelatedRoutes/>}/>
            <Route path="/home/*" element={<HomeRelatedRoutes/>}/>
            <Route path="/unAuthorized" element={<UnAuthorized/>}/>
        </Routes>
    </BrowserRouter>
)