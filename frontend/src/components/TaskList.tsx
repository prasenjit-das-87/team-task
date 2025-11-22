import React, { useState } from 'react'
import { assignTask, updateTaskStatus, deleteTaskApi, updateTaskApi } from '../api/api'
import toast from 'react-hot-toast'

//Task list for All type users
export default function TaskList({ tasks, users, onRefetch, currentUser }: { tasks: any[]; users: any[]; onRefetch: ()=>void; currentUser:any }) {
  const [editing, setEditing] = useState<any>(null)

  //Task Assign
  const onAssign = async (taskId:string, assigneeId:string|null) => {
    try { await assignTask(taskId, assigneeId); toast.success('Assigned'); onRefetch() } catch (err:any) { toast.error(err?.error||'Assign failed') }
  }

  //Task Status Change
  const onStatus = async (taskId:string, status:string) => {
    try { await updateTaskStatus(taskId, status); toast.success('Status updated'); onRefetch() } catch (err:any) { toast.error(err?.error||'Update failed') }
  }

  const startEdit = (task:any) => setEditing(task)
  const closeEdit = () => setEditing(null)

  //Task Save
  const saveEdit = async () => {
    if (!editing) return
    try {
      await updateTaskApi(editing._id, { title: editing.title, description: editing.description, status: editing.status, assignee: editing.assignee?._id || null })
      toast.success('Task updated')
      closeEdit()
      onRefetch()
    } catch (err:any) { toast.error(err?.error || 'Update failed') }
  }

  //Task Delete
  const confirmDelete = async (taskId:string) => {
    if (!confirm('Delete this task?')) return
    try { await deleteTaskApi(taskId); toast.success('Task deleted'); onRefetch() } catch (err:any) { toast.error(err?.error||'Delete failed') }
  }

  return (
    <div className="space-y-4">
      {tasks.map(t => (
        <div key={t._id} className="bg-white p-4 rounded shadow">
          <div className="flex justify-between items-start">
            <div>
              <div className="font-semibold">{t.title}</div>
              <div className="text-sm text-gray-500">{t.description}</div>
              <div className="text-sm text-gray-500">Assignee: {t.assignee ? (t.assignee.name || t.assignee.email) : '—'}</div>
            </div>

            <div className="flex items-center gap-2">
              <select value={t.status} onChange={e => onStatus(t._id, e.target.value)} className="p-1 border rounded">
                <option value="todo">To do</option>
                <option value="in-progress">In progress</option>
                <option value="done">Done</option>
              </select>

              {currentUser?.role === 'admin' && (
                <>
                  <select value={t.assignee?._id || ''} onChange={e => onAssign(t._id, e.target.value || null)} className="p-1 border rounded">
                    <option value="">Unassigned</option>
                    {users.map(u => <option key={u._id} value={u._id}>{u.name || u.email}</option>)}
                  </select>

                  <button onClick={() => startEdit(t)} className="px-2 py-1 bg-yellow-400 rounded">Edit</button>
                  <button onClick={() => confirmDelete(t._id)} className="px-2 py-1 bg-red-500 text-white rounded">Delete</button>
                </>
              )}
            </div>
          </div>
        </div>
      ))}

      {editing && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded shadow w-96">
            <h3 className="mb-2 font-semibold">Edit Task</h3>
            <input className="w-full p-2 border mb-2" value={editing.title} onChange={e => setEditing({...editing, title: e.target.value })} />
            <textarea className="w-full p-2 border mb-2" value={editing.description || ''} onChange={e => setEditing({...editing, description: e.target.value })} />
            <div className="flex justify-end gap-2">
              <button onClick={closeEdit} className="px-3 py-1">Cancel</button>
              <button onClick={saveEdit} className="px-3 py-1 bg-blue-600 text-white rounded">Save</button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
