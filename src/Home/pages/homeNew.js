import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { Form, Space, Spin } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { Fragment, useEffect, useState } from "react";
import { UserModel } from "../../Login/Models/user.model";
import { AES } from "crypto-js";
import CryptoJS from "crypto-js";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import { END_POINT, SECURITY_KEY, USER_ACTIONS } from "../../MainComponents/redux/actions";
import { useParams } from "react-router-dom";
import { isUndefined } from "lodash";
import { Navigation } from "../../MainComponents/navigation";

export const HomePage = () => {
    const SignupSchema = yup.object().shape({
        fullName: yup.string().nullable().required("Required"),
        email: yup.string().nullable().required("Required"),
        password: yup.string().nullable().min(4).max(20).required("Required"),
        address: yup.string().nullable().required("Required"),
        userName: yup.string().nullable().required("Required").min(4).max(20),
        phoneNo: yup.string().nullable().required("Required").min(4).max(10)
    });


    const { register, handleSubmit, formState: { errors }, } = useForm({
        resolver: yupResolver(SignupSchema),
    });
    const [userObj, setUserObj] = useState(new UserModel());
    const [showPreLoader, setShowPreLoader] = useState(true);
    const { user } = useSelector(({ user }) => ({ user }));
    const dispatch = useDispatch();

    let { id } = useParams();

    useEffect(() => {
        isUndefined(id) && setUserObj(user);
        isUndefined(id) && setShowPreLoader(false);
    }, [user]);

    useEffect(() => {
        id && axios.get(END_POINT + 'user/' + id).then((res) => setUserObj(res.data));
    }, [id]);

    useEffect(() => {
        (user === null && userObj.fullName === '') && window.location.replace('/unAuthorized');
        setShowPreLoader(false);
    }, [userObj])

    const onSubmit = (value) => {
        setShowPreLoader(true);
        axios.post(END_POINT + 'user/update/' + (id ? id : atob(localStorage.getItem('userId'))), userObj).then(res => { toast.success('Success Notification !', { position: toast.POSITION.TOP_RIGHT }); })
            .then(() => { dispatch({ type: USER_ACTIONS.LOGOUT_USER, payload: userObj }); dispatch({ type: USER_ACTIONS.SET_USER, payload: userObj }); })
            .finally(() => { setShowPreLoader(false); });
    };

    const onChanges = (val) => {
        var newUserObj = { ...userObj, ...val };
        setUserObj(newUserObj);
    };

    const Logout = () => {
        dispatch({ type: USER_ACTIONS.LOGOUT_USER, payload: userObj });
        localStorage.removeItem('userId');
        window.location.replace('/');
    }

    const Back = () => {
        window.location.replace('/home/admin');
    }

    return (
        <Fragment>
            <ToastContainer />
            <Navigation logout={() => Logout()} />
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="card">
                    {userObj?.userName && <div className="container">
                        <Form labelCol={{ span: 8 }} wrapperCol={{ span: 16 }}>
                            <h2>Edit User Details</h2>
                            <div>
                                <Form.Item label="Full Name" >
                                    <input type="text" className="text-field" {...register("fullName", { required: "Required", value: userObj.fullName, onChange: (e) => onChanges({ fullName: e.target.value }) })} />
                                    {errors.fullName && <p className="error">{errors.fullName.message}</p>}
                                </Form.Item>
                            </div>
                            <div>
                                <Form.Item label="Address  " >
                                    <input type="text" className="text-field" {...register("address", { required: "Required", value: userObj.address, onChange: (e) => onChanges({ address: e.target.value }) })} />
                                    {errors.address && <p className="error">{errors.address.message}</p>}
                                </Form.Item>
                            </div>
                            <div>
                                <Form.Item label="Email" >
                                    <input type="text" className="text-field" {...register("email", { required: "Required", value: userObj.email, onChange: (e) => onChanges({ email: e.target.value }) })} />
                                    {errors.email && <p className="error">{errors.email.message}</p>}
                                </Form.Item>
                            </div>
                            {showPreLoader && <Space className="spin-center" size="middle">
                                <Spin size="large" spinning={showPreLoader} />
                            </Space>}
                            <div>
                                <Form.Item label="Phone" >
                                    <input type="text" className="text-field" {...register("phoneNo", { required: "Required", value: userObj.phoneNo, onChange: (e) => onChanges({ phoneNo: e.target.value }) })} />
                                    {errors.phoneNo && <p className="error">{errors.phoneNo.message}</p>}
                                </Form.Item>
                            </div>
                            <div>
                                <Form.Item label="Username" >
                                    <input type="text" className="text-field" {...register("userName", { required: "Required", value: userObj.userName, onChange: (e) => onChanges({ userName: e.target.value }) })} />
                                    {errors.userName && <p className="error">{errors.userName.message}</p>}
                                </Form.Item>
                            </div>
                            <div>
                                <Form.Item label="Password" >
                                    <input type="text" className="text-field" {...register("password", { required: "Required", value: AES.decrypt(user.password.toString(), SECURITY_KEY).toString(CryptoJS.enc.Utf8), onChange: (e) => onChanges({ password: AES.encrypt(e.target.value, SECURITY_KEY).toString() }) })} />
                                    {errors.password && <p className="error">{errors.password.message}</p>}
                                </Form.Item>
                            </div>
                        </Form>
                        <div className="bottom">
                            {!isUndefined(id) && <input type="button" className="ant-btn-primary-back" value="Back" onClick={() => Back()} />}
                            <input className="ant-btn-primary-n" type="submit" />
                        </div>
                    </div>}
                </div>
            </form>
        </Fragment >
    );

};
