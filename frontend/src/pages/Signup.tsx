import React, { useState } from 'react'
import { registerApi } from '../api/api'
import { useNavigate } from 'react-router-dom'
import toast from 'react-hot-toast'

//Auth user Sign-up page
export default function Signup() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [role, setRole] = useState<'member'|'admin'>('member')
  const navigate = useNavigate()

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      await registerApi({ email, password, role })
      toast.success('Registered. Please login.')
      navigate('/login')
    } catch (err: any) {
      toast.error(err?.error || 'Signup failed')
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="w-full max-w-md bg-white p-8 rounded-lg shadow">
        <h2 className="text-2xl font-semibold mb-4">Sign up</h2>
        <form onSubmit={onSubmit} className="space-y-4">
          <input className="w-full p-2 border rounded" placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} />
          <input type="password" className="w-full p-2 border rounded" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} />
          <select className="w-full p-2 border rounded" value={role} onChange={e => setRole(e.target.value as any)}>
            <option value="member">Member</option>
            <option value="admin">Admin</option>
          </select>
          <button className="w-full bg-green-600 text-white py-2 rounded">Sign up</button>
        </form>
      </div>
    </div>
  )
}
