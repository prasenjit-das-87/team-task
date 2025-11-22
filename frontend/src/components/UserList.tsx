import React from 'react'
import { deleteUserApi } from '../api/api'
import toast from 'react-hot-toast'

//User List (Admin can see only)
export default function UserList({ users, onRefetch }: { users: any[]; onRefetch: () => void }) {
  const onDelete = async (id: string) => {
    if (!confirm('Delete this user?')) return
    try {
      await deleteUserApi(id)
      toast.success('User deleted')
      onRefetch()
    } catch (err: any) {
      toast.error(err?.error || 'Delete failed')
    }
  }

  return (
    <div className="bg-white p-4 rounded shadow">
      <h3 className="font-semibold mb-3">Team Members</h3>
      <ul className="space-y-2">
        {users.map(u => (
          <li key={u._id} className="flex items-center justify-between">
            <div>
              <div className="font-medium">{u.name || u.email}</div>
              {u.email && <div className="text-sm text-gray-500">{u.email}</div>}
            </div>
            <div>
              <button className="px-2 py-1 bg-red-500 text-white rounded" onClick={() => onDelete(u._id)}>Delete</button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  )
}
