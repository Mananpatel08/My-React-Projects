import React, {useState} from 'react';
import { Link, useNavigate } from "react-router-dom";
import { authServices } from '../../services/authServices';
import { Loader } from '../Loader/Loader';

export const SignUp = () => {
  const navigate = useNavigate();
  const [ formData, setFormData ] = useState({
    name: "",
    email: "",
    password: "",
    avatar:"",
  });
  const [errors, setErrors] = useState({});
    

  const validateForm = () => {
    const newErrors = {};
    if (!formData.email.trim()) {
      console.log("email is empppppppppty")
      newErrors.email = "email is required";
    }
    if (!formData.password) {
      newErrors.password = "Password is required";
    } else if (formData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }
    setErrors(newErrors);
    console.log(Object.keys(newErrors).length)
    return Object.keys(newErrors).length === 0;
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target;
  
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;
    
    try {
      const res =  await authServices.register(
        formData.name, 
        formData.email,
        formData.password,
        formData.avatar
      );

      console.log(res)
      
      navigate("/login");
    } catch(error) {
      const errorMessage = error.response?.data?.message;
      setErrors({
        api: errorMessage,
      });
    }
  };
  

  return (
    <div className="w-100 my-5 py-5 d-flex justify-content-center align-items-center">
        <div className="loginMain w-75 d-flex flex-column justify-content-center align-items-center border border-3 rounded-2 p-5">
              <h3 className="fw-bold text-primary zoom-out ">Sign Up</h3>
              <form action="" onSubmit={handleSubmit} className='w-100 px-4 d-flex flex-column justify-content-center align-items-center'>

                <div className='d-flex gap-5 w-100 mt-2 zoom-out'>
                  <p className='w-50'>
                    <label className="fw-bold" htmlFor="email">First Name</label><br />
                    <input 
                      onChange={handleInputChange} 
                      value={formData.name}
                      name='name'
                      className='w-100 p-3 rounded-3 border bg-light' 
                      type="text" />
                  </p>
                  <p className='w-50'>
                    <label className="fw-bold" htmlFor="password">Avatar</label><br />
                    <input 
                      onChange={handleInputChange} 
                      value={formData.avatar} 
                      name='avatar' 
                      className='w-100 p-3 rounded-3 border bg-light' 
                      type="text" />
                  </p>
                </div>
                <div className='d-flex gap-5 w-100 mt-2 zoom-out'>
                  <p className='w-50'>
                    <label className="fw-bold" htmlFor="email">Email Address</label><br />
                    <input 
                      onChange={handleInputChange} 
                      value={formData.email} 
                      name='email' 
                      className='w-100 p-3 rounded-3 border bg-light' 
                      type="email" />
                      <span className='text-danger'>
                        {errors.email && <p className="error ms-1">{errors.email}</p>}  
                      </span>
                  </p>
                  <p className='w-50'>
                    <label className="fw-bold" htmlFor="password">Password</label><br />
                    <input 
                      onChange={handleInputChange} 
                      value={formData.password} 
                      name='password' 
                      className='w-100 p-3 rounded-3 border bg-light' 
                      type="Password" />
                    <span className='text-danger'>  
                      {errors.password && <p className="error ms-1">{errors.password}</p>}
                      {errors.api && ( <p className="error ms-1">{errors.api}</p>)}
                    </span>
                  </p>
                </div>

                <div className="d-flex flex-column gap-3 w-25 mt-3 zoom-out">
                  <button className='btn btn-primary p-2' type='submit'>Sign Up</button>
                  <button className='btn bg-black text-white p-2'  onClick={()=>navigate("/login")}>Login</button>
                </div>

              </form>
        </div>
    </div>
  )
}