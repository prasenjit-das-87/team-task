import React, { useState, useContext } from 'react';
import { loginApi } from '../api/api';
import { AuthContext } from '../context/AuthContext';
import { useNavigate, Link } from 'react-router-dom';
import toast from 'react-hot-toast';

//Auth user login page
export default function Login(){
  const auth = useContext(AuthContext)!;
  const navigate = useNavigate();
  const [email,setEmail]=useState('');
  const [password,setPassword]=useState('');

  const onSubmit=async(e:React.FormEvent)=>{
    e.preventDefault();
    try{
      const res = await loginApi({ email, password });
      auth.login(res.token, res.user);
      navigate('/dashboard');
    }catch(err:any){
      toast.error(err?.error || 'Login failed');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="w-full max-w-md bg-white p-8 rounded-lg shadow">
        <h2 className="text-2xl font-semibold mb-4">Login</h2>
        <form onSubmit={onSubmit} className="space-y-4">
          <input className="w-full p-2 border rounded" placeholder="Email" value={email} onChange={e=>setEmail(e.target.value)} />
          <input type="password" className="w-full p-2 border rounded" placeholder="Password" value={password} onChange={e=>setPassword(e.target.value)} />
          <button className="w-full bg-blue-600 text-white py-2 rounded">Login</button>
        </form>
        <p className="mt-4 text-sm">Don't have an account? <Link className="text-blue-600" to="/signup">Sign up</Link></p>
      </div>
    </div>
  );
}
