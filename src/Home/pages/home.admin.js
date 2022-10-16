import { Space, Table } from "antd";
import Column from "antd/lib/table/Column";
import axios from "axios";
import { isEmpty } from "lodash";
import { Fragment, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast, ToastContainer } from "react-toastify";
import { Navigation } from "../../MainComponents/navigation";
import { ADMIN_USER_LEVEL, END_POINT, USER_ACTIONS } from "../../MainComponents/redux/actions";


export const AdminHomePage = () => {
    const[userList, setUserList] = useState({});
    const { user } = useSelector(({ user }) => ({ user }));
    const dispatch = useDispatch();

    useEffect(() => {
        axios.get(END_POINT+'user').then(res => setUserList(res.data)).catch((err) => toast.error('Something went worng !', { position: toast.POSITION.TOP_RIGHT }));;
    }, []);

    useEffect(() => {
        console.log(localStorage.getItem('userId'));
        user && (((user.userLevel !== ADMIN_USER_LEVEL) ) && window.location.replace('/unAuthorized'));
        (localStorage.getItem('userId') === null) && window.location.replace('/unAuthorized');
    }, [user]);

    const rowClicked = (value) => {
        window.open('http://localhost:3000/home/'+ value, '_blank').focus();
    }
    const Logout = () => {
        dispatch({ type: USER_ACTIONS.LOGOUT_USER, payload:user });
        window.location.replace('/');
        
    }


    return  (
        <Fragment>
            <Navigation logout={() => Logout()}/>
            <div className="card">
                <ToastContainer />
                <div className="container">
                <h2>User Listing</h2>
                    {!isEmpty(userList) && <Table dataSource={userList} pagination={{ pageSize: 10 }}>
                        <Column title="Full Name" dataIndex="fullName" key="fullName" />
                        <Column title="Address" dataIndex="address" key="fullName" />
                        <Column title="Email" dataIndex="email" key="fullName" />
                        <Column title="Phone" dataIndex="phoneNo" key="fullName" />
                        <Column title="Action" key="action" render={(_, record) => (<Space size="middle"><span onClick={() => rowClicked(record._id)}>Edit</span></Space>)} />
                    </Table>}
                </div>
            </div>
        </Fragment>
    );

};

