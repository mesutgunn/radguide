'use client'

import { useState, useEffect } from 'react'
import Header from '@/components/layout/Header'
import Breadcrumb from '@/components/layout/Breadcrumb'
import { useRouter } from 'next/navigation'

type User = {
  id: string
  name: string | null
  email: string
  role: string
  createdAt: string
  _count?: {
    protocols: number
    analysisJobs: number
    reportRecords: number
  }
}

export default function UsersPage() {
  const router = useRouter()
  const [users, setUsers] = useState<User[]>([])
  const [loading, setLoading] = useState(true)
  const [showModal, setShowModal] = useState(false)
  const [editingUser, setEditingUser] = useState<User | null>(null)
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    role: 'TEKNIKER'
  })

  useEffect(() => {
    fetchUsers()
  }, [])

  const fetchUsers = async () => {
    try {
      const res = await fetch('/api/admin/users')
      if (res.ok) {
        const data = await res.json()
        setUsers(data.users)
      }
    } catch (error) {
      console.error('Kullanıcılar yüklenemedi:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    try {
      const url = editingUser
        ? `/api/admin/users/${editingUser.id}`
        : '/api/admin/users'

      const res = await fetch(url, {
        method: editingUser ? 'PATCH' : 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      })

      if (res.ok) {
        setShowModal(false)
        setEditingUser(null)
        setFormData({ name: '', email: '', password: '', role: 'TEKNIKER' })
        fetchUsers()
      } else {
        const data = await res.json()
        alert(data.error || 'İşlem başarısız')
      }
    } catch (error) {
      alert('Bir hata oluştu')
    }
  }

  const handleDelete = async (id: string) => {
    if (!confirm('Bu kullanıcıyı silmek istediğinizden emin misiniz?')) return

    try {
      const res = await fetch(`/api/admin/users/${id}`, {
        method: 'DELETE'
      })

      if (res.ok) {
        fetchUsers()
      }
    } catch (error) {
      alert('Silme işlemi başarısız')
    }
  }

  const openEditModal = (user: User) => {
    setEditingUser(user)
    setFormData({
      name: user.name || '',
      email: user.email,
      password: '',
      role: user.role
    })
    setShowModal(true)
  }

  const openCreateModal = () => {
    setEditingUser(null)
    setFormData({ name: '', email: '', password: '', role: 'TEKNIKER' })
    setShowModal(true)
  }

  const getRoleBadge = (role: string) => {
    const colors = {
      ADMIN: 'bg-red-500/20 text-red-400 border-red-500/30',
      TEKNIKER: 'bg-blue-500/20 text-blue-400 border-blue-500/30',
      RAPORTOR: 'bg-green-500/20 text-green-400 border-green-500/30'
    }
    return colors[role as keyof typeof colors] || colors.TEKNIKER
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-background-dark flex items-center justify-center">
        <div className="text-white">Yükleniyor...</div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background-dark">
      <Header />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Breadcrumb 
          items={[
            { label: 'Anasayfa', href: '/dashboard' },
            { label: 'Admin', href: '/dashboard' },
            { label: 'Kullanıcı Yönetimi' }
          ]}
        />
        <div className="flex justify-between items-center mb-8 mt-6">
          <div>
            <h1 className="text-3xl font-bold text-white">Kullanıcı Yönetimi</h1>
            <p className="text-white/60 mt-2">Toplam {users.length} kullanıcı</p>
          </div>
          <button
            onClick={openCreateModal}
            className="px-4 py-2 bg-primary text-background-dark font-bold rounded-lg hover:bg-primary/90"
          >
            + Yeni Kullanıcı
          </button>
        </div>

        <div className="bg-white/5 border border-white/10 rounded-xl overflow-hidden">
          <table className="w-full">
            <thead className="bg-white/5">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-white/60 uppercase">Ad Soyad</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-white/60 uppercase">Email</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-white/60 uppercase">Rol</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-white/60 uppercase">Kayıt Tarihi</th>
                <th className="px-6 py-3 text-right text-xs font-medium text-white/60 uppercase">İşlemler</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/10">
              {users.map((user) => (
                <tr key={user.id} className="hover:bg-white/5">
                  <td className="px-6 py-4 text-white">{user.name}</td>
                  <td className="px-6 py-4 text-white/80">{user.email}</td>
                  <td className="px-6 py-4">
                    <span className={`px-2 py-1 text-xs font-medium rounded border ${getRoleBadge(user.role)}`}>
                      {user.role}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-white/60 text-sm">
                    {new Date(user.createdAt).toLocaleDateString('tr-TR')}
                  </td>
                  <td className="px-6 py-4 text-right space-x-2">
                    <button
                      onClick={() => openEditModal(user)}
                      className="px-3 py-1 bg-blue-500/20 text-blue-400 rounded hover:bg-blue-500/30"
                    >
                      Düzenle
                    </button>
                    <button
                      onClick={() => handleDelete(user.id)}
                      className="px-3 py-1 bg-red-500/20 text-red-400 rounded hover:bg-red-500/30"
                    >
                      Sil
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {showModal && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
            <div className="bg-background-dark border border-white/10 rounded-xl p-6 w-full max-w-md">
              <h2 className="text-xl font-bold text-white mb-4">
                {editingUser ? 'Kullanıcı Düzenle' : 'Yeni Kullanıcı'}
              </h2>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-white/80 mb-2">Ad Soyad</label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    required
                    className="w-full px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-white"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-white/80 mb-2">Email</label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    required
                    className="w-full px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-white"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-white/80 mb-2">
                    Şifre {editingUser && '(boş bırakılırsa değişmez)'}
                  </label>
                  <input
                    type="password"
                    value={formData.password}
                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                    required={!editingUser}
                    className="w-full px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-white"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-white/80 mb-2">Rol</label>
                  <select
                    value={formData.role}
                    onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                    className="w-full px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-white"
                  >
                    <option value="TEKNIKER">Tekniker</option>
                    <option value="RAPORTOR">Raportör</option>
                    <option value="ADMIN">Admin</option>
                  </select>
                </div>
                <div className="flex gap-2 pt-4">
                  <button
                    type="submit"
                    className="flex-1 py-2 bg-primary text-background-dark font-bold rounded-lg hover:bg-primary/90"
                  >
                    {editingUser ? 'Güncelle' : 'Oluştur'}
                  </button>
                  <button
                    type="button"
                    onClick={() => setShowModal(false)}
                    className="flex-1 py-2 bg-white/10 text-white rounded-lg hover:bg-white/20"
                  >
                    İptal
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
