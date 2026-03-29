import { useState, useEffect } from 'react'
import { getContactMessages, deleteContactMessage } from '../api'
import toast from 'react-hot-toast'

export function AdminContacts() {
  const [messages, setMessages] = useState([])
  const [loading, setLoading] = useState(true)

  const load = () => {
    setLoading(true)
    getContactMessages()
      .then((r) => setMessages(r.data))
      .finally(() => setLoading(false))
  }

  useEffect(load, [])

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this message?')) return
    try {
      await deleteContactMessage(id)
      toast.success('Message deleted')
      load()
    } catch {
      toast.error('Could not delete message')
    }
  }

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="font-display text-3xl font-bold text-[#f5f0e8]">Contact Messages</h1>
        <p className="font-body text-[#a09890] mt-1">{messages.length} total messages</p>
      </div>

      {loading ? (
        <p className="text-[#a09890]">Loading...</p>
      ) : messages.length === 0 ? (
        <p className="text-[#a09890]">No messages yet.</p>
      ) : (
        <div className="flex flex-col gap-4">
          {messages.map((msg) => (
            <div key={msg.id} className="bg-[#141210] border border-earth-800/30 rounded-xl p-6">
              <div className="flex items-start justify-between gap-4 flex-wrap mb-3">
                <div>
                  <h2 className="font-body font-semibold text-[#f5f0e8] text-lg">{msg.name}</h2>
                  <div className="flex gap-4 mt-1 text-sm font-body text-[#a09890]">
                    <span>{msg.email}</span>
                    <span>·</span>
                    <span>{new Date(msg.sent_at).toLocaleDateString()}</span>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <span className="font-body text-xs px-3 py-1 rounded-full bg-[#1a1815] border border-earth-800/40 text-[#a09890]">
                    {msg.subject}
                  </span>
                  <button
                    onClick={() => handleDelete(msg.id)}
                    className="font-body text-xs text-red-500 hover:text-red-400 transition-colors"
                  >
                    Delete
                  </button>
                </div>
              </div>
              <div className="pt-3 border-t border-earth-800/20">
                <p className="font-body text-sm text-[#c4bfb4] leading-relaxed">{msg.message}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}