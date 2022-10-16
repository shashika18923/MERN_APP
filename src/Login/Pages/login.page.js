import { Fragment, useEffect, useState } from "react";
import { Button, Form, Input } from 'antd';
import { UserModel } from "../../Login/Models/user.model";
import axios from "axios";
import { useDispatch } from "react-redux";
import { ADMIN_USER_LEVEL, END_POINT, LOCAL_ENDPOINT, USER_ACTIONS } from "../../MainComponents/redux/actions";
import { toast, ToastContainer } from "react-toastify";


export const LoginPage = () => {

    const [userDetails, setUserDetails] = useState(new UserModel());
    const dispatch = useDispatch();
    const onChanges = (val) => {
        var newUserObj = { ...userDetails, ...val };
        setUserDetails(newUserObj);
    };

    useEffect(() => {
        localStorage.removeItem('userId');
    }, []);

    const onFinish = (values) => {
        axios.post(END_POINT+'user/byUsername/'+userDetails.userName,userDetails).then(res => {
            localStorage.setItem("userId", btoa(res.data._id)); 
            dispatch({ type: USER_ACTIONS.SET_USER, payload:res.data }); 
            (res.data.userLevel === ADMIN_USER_LEVEL) ?  window.open(LOCAL_ENDPOINT+'home/admin', '_self').focus() :  window.open(LOCAL_ENDPOINT+'home', '_self').focus();
            console.log(res.status);
            
    }).catch((err) => toast.error('Username or password incorrect !', { position: toast.POSITION.TOP_RIGHT }));
    };

    return (
        <Fragment>
            <div className="login-card">
                <ToastContainer />
                <div className="container">
                    <h2>Login</h2>
                    <Form name="basic" initialValues={{ remember: true, }} layout="vertical" onFinish={onFinish} autoComplete="off">
                        <Form.Item label="Username" name="userName" rules={[{ required: true, message: 'Please input your username!' }]}>
                            <Input onChange={(e) => onChanges({ userName: e.target.value })} />
                        </Form.Item>
                        <Form.Item label="Password" name="password" rules={[{ required: true, message: 'Please input your password!' }]} >
                            <Input.Password onChange={(e) => onChanges({ password: e.target.value })} />
                        </Form.Item>
                        <Form.Item>
                            <Button type="primary" htmlType="submit">
                                Submit
                            </Button>
                        </Form.Item>
                    </Form>
                </div>
            </div>
        </Fragment>
    );

};
