import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axiosClient from '../axios-client.js';
import { toast } from 'react-toastify';
import { useDispatch, useSelector } from 'react-redux';
import { signInStart,signInSuccess,signInFailure } from '../redux/user/userSlice.js';

const SignIn = () => {
  const [formData, setFormData] = useState({});
  const {loading,error} = useSelector((state) => state.user);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value
    });
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      dispatch(signInStart());
      const res = await axiosClient.post("/auth/signin", formData);
      
      if (res.data.success) {
        dispatch(signInSuccess(res.data.data));
        toast.success(res.data.message);
        navigate("/");
      }
      else{
        dispatch(signInFailure(res.data.message));
        toast.error(res.data.message);
      }
    } catch (error) {
      dispatch(signInFailure(error.message));
      toast.error("Error!");
    }
  }


  return (
    <div className="p-3 max-w-lg mx-auto">
      <h1 className="text-3xt text-center font-semibold my-7">Sign In</h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <input onChange={handleChange} type="email" placeholder="Email" id="email" className="border p-3 rounded-lg" />
        <input onChange={handleChange} type="password" placeholder="Password" id="password" className="border p-3 rounded-lg" />
        <button disabled={loading} className="bg-slate-700 text-white p-3 rounded-lg uppercase hover:opacity-95 disabled:opacity-80">
          {loading ? 'Loading...' : "Sign In"}
        </button>
      </form>
      <div className="flex gap-2 mt-5">
        <p>Dont have an account?</p>
        <Link to="/sign-up">
          <span className="text-blue-700">Sign Up</span>
        </Link>
      </div>
    </div>
  )
}

export default SignIn;
