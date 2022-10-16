import { Fragment, useEffect, useState } from "react";
import { Form, Space, Spin } from 'antd';
import { UserModel } from "../../Login/Models/user.model";
import axios from "axios";
import { ToastContainer, toast } from 'react-toastify';
import { AES } from 'crypto-js'
import 'react-toastify/dist/ReactToastify.css';
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { SECURITY_KEY } from "../../MainComponents/redux/actions";
import { Link } from "react-router-dom";

export const SignupPage = () => {

    const SignupSchema = yup.object().shape({
        fullName: yup.string().nullable().required("Required"),
        email: yup.string().nullable().required("Required"),
        password: yup.string().nullable().min(4).max(20).required("Required"),
        address: yup.string().nullable().required("Required"),
        userName: yup.string().nullable().required("Required").min(4).max(20),
        phoneNo: yup.string().nullable().required("Required").min(1).max(10)
    });

    const { register, handleSubmit, formState: { errors }, } = useForm({
        resolver: yupResolver(SignupSchema),
    });
    const [userObj, setUserObj] = useState(new UserModel());
    const [showPreLoader, setShowPreLoader] = useState(true);

    useEffect(() => {
        setShowPreLoader(false);
    }, [userObj])

    const onSubmit = () => {
        axios.post('http://localhost:4000/user/add/', userObj).then(res => { toast.success('Success Notification !', { position: toast.POSITION.TOP_RIGHT }); })
            .catch((err) => toast.error('Something went wrong...!', { position: toast.POSITION.TOP_RIGHT }));
    };
    const onChanges = (val) => {
        var newUserObj = { ...userObj, ...val };
        setUserObj(newUserObj);
    };

    return (
        <Fragment>
            <ToastContainer />
            <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="card">
                        <div className="container">
                        <h2>Sign up </h2>
                        <Form labelCol={{ span: 8 }} wrapperCol={{ span: 16 }}>
                            <div labelCol={{ span: 8 }}>
                                <Form.Item label="Full Name" >
                                    <input type="text" className="text-field" {...register("fullName", { required: "Required", onChange: (e) => onChanges({ fullName: e.target.value }) })} />
                                    {errors.fullName && <p className="error">{errors.fullName.message}</p>}
                                </Form.Item>
                            </div>
                            <div labelCol={{ span: 8 }}>
                                <Form.Item label="Address" >
                                    <input type="text" className="text-field" {...register("address", { required: "Required", onChange: (e) => onChanges({ address: e.target.value }) })} />
                                    {errors.address && <p className="error">{errors.address.message}</p>}
                                </Form.Item>
                            </div>
                            <div>
                                <Form.Item label="Email" >
                                    <input type="text" className="text-field" {...register("email", { required: "Required", onChange: (e) => onChanges({ email: e.target.value }) })} />
                                    {errors.email && <p className="error">{errors.email.message}</p>}
                                </Form.Item>
                            </div>
                            {showPreLoader && <Space className="spin-center" size="middle">
                                <Spin size="large" spinning={showPreLoader} />
                            </Space>}
                            <div>
                                <Form.Item label="Phone" >
                                    <input type="text" className="text-field" {...register("phoneNo", { required: "Required", onChange: (e) => onChanges({ phoneNo: e.target.value }) })} />
                                    {errors.phoneNo && <p className="error">{errors.phoneNo.message}</p>}
                                </Form.Item>
                            </div>
                            <div>
                                <Form.Item label="Username" >
                                    <input type="text" className="text-field" {...register("userName", { required: "Required", onChange: (e) => onChanges({ userName: e.target.value }) })} />
                                    {errors.userName && <p className="error">{errors.userName.message}</p>}
                                </Form.Item>
                            </div>
                            <div>
                                <Form.Item label="Password" >
                                    <input type="text" className="text-field" {...register("password", { required: "Required", onChange: (e) => onChanges({ password: AES.encrypt(e.target.value, SECURITY_KEY).toString() }) })} />
                                    {errors.password && <p className="error">{errors.password.message}</p>}
                                </Form.Item>
                            </div>
                            <div>
                                <Form.Item >
                                    <Link to="/" className="center-href-sign">To Login</Link>
                                </Form.Item>
                            </div>
                            </Form>
                            <div className="bottom">
                                <input type="submit" className="ant-btn-primary-back"/>
                            </div>
                        </div>
                    </div>
                
            </form>
        </Fragment>
    );
};
