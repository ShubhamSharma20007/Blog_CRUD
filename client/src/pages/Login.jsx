import React, { useState ,useContext } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import {UserContext} from "../Context/userContext"
const Login = () => {
    const navigate = useNavigate();
    const {setCurrentUser} = useContext(UserContext)
    const [value, setValue] = useState({
        email: '',
        password: ''
    });
    const [error, setError] = useState('');

    function handleChange(e) {
        setValue((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    }

    async function postData(e) {
        e.preventDefault();
        try {
            const url = `http://localhost:4000/v1/api/users/login`;
            const res = await axios.post(url, {
                email: value.email,
                password: value.password
            });
            const result = await res.data;
     
            if (res.data.success === true) {
                alert('User login successfully');
                setValue({ email: '', password: '' });
                setCurrentUser(result)
                window.location.href = window.location.origin;
             
            } else {
                setError('Invalid email or password');
            }
        } catch (error) {
         
            setError(error.messaga);
    }}
    return (
        <div>
            <section className="bg-gray-50 dark:bg-gray-900">
                <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
                    <p className="flex items-center mb-6 text-2xl font-semibold text-gray-900 dark:text-white">
                        <img className="w-8 h-8 mr-2" src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/logo.svg" alt="logo" />
                    </p>
                    <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
                        <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                                Login
                            </h1>
                            {error && <div className="text-red-500">{error}</div>}
                            <form className="space-y-4 md:space-y-6" onSubmit={postData}>
                                <div>
                                    <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your email</label>
                                    <input type="email" name="email" onChange={handleChange} value={value.email} id="email" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="name@company.com" required />
                                </div>
                                <div>
                                    <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Password</label>
                                    <input type="password" name="password" onChange={handleChange} value={value.password} id="password" placeholder="••••••••" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required />
                                </div>
                                <button type="submit" className="w-full text-white bg-zinc-700 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">Login</button>
                                <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                                    Already Registered? <Link to="/register" className="font-medium text-primary-600 hover:underline dark:text-primary-500">Login here</Link>
                                </p>
                            </form>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}

export default Login;
