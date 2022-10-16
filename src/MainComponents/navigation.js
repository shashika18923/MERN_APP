import { Fragment } from "react";

export const Navigation = ({logout}) => {

    const Logout = () => {
        logout();
    }

    return(
        <Fragment>
            <ul className="ul">
                <li class="active li">MERN Application</li>
                <li class="li" onClick={() => Logout()} style={{float:"right"}}>Logout</li>
            </ul>
        </Fragment>
    );
}