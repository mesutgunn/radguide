'use client'

import { useState, useEffect } from 'react'
import Header from '@/components/layout/Header'
import Breadcrumb from '@/components/layout/Breadcrumb'

type Log = {
  id: string
  scope: string
  action: string
  level: string
  createdAt: string
  user: { name: string | null; email: string } | null
  payloadJson: any
}

export default function LogsPage() {
  const [logs, setLogs] = useState<Log[]>([])
  const [scopeFilter, setScopeFilter] = useState('all')
  const [levelFilter, setLevelFilter] = useState('all')

  useEffect(() => {
    fetchLogs()
  }, [scopeFilter, levelFilter])

  const fetchLogs = async () => {
    const res = await fetch(`/api/admin/logs?scope=${scopeFilter}&level=${levelFilter}`)
    if (res.ok) {
      const data = await res.json()
      setLogs(data.logs)
    }
  }

  const getLevelColor = (level: string) => {
    const colors = {
      info: 'bg-blue-500/20 text-blue-400',
      warn: 'bg-yellow-500/20 text-yellow-400',
      error: 'bg-red-500/20 text-red-400'
    }
    return colors[level as keyof typeof colors] || colors.info
  }

  return (
    <div className="min-h-screen bg-background-dark">
      <Header />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Breadcrumb 
          items={[
            { label: 'Anasayfa', href: '/dashboard' },
            { label: 'Admin', href: '/dashboard' },
            { label: 'Sistem Logları' }
          ]}
        />
        <h1 className="text-3xl font-bold text-white mb-8 mt-6">Sistem Logları</h1>

        <div className="mb-6 flex gap-4">
          <div>
            <label className="block text-sm text-white/60 mb-2">Kapsam</label>
            <select value={scopeFilter} onChange={(e) => setScopeFilter(e.target.value)} className="px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-white">
              <option value="all">Tümü</option>
              <option value="auth">Auth</option>
              <option value="admin">Admin</option>
              <option value="analysis">Analiz</option>
              <option value="reporter">Raportör</option>
              <option value="webhook">Webhook</option>
            </select>
          </div>
          <div>
            <label className="block text-sm text-white/60 mb-2">Seviye</label>
            <select value={levelFilter} onChange={(e) => setLevelFilter(e.target.value)} className="px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-white">
              <option value="all">Tümü</option>
              <option value="info">Info</option>
              <option value="warn">Warning</option>
              <option value="error">Error</option>
            </select>
          </div>
        </div>

        <div className="bg-white/5 border border-white/10 rounded-xl overflow-hidden">
          <table className="w-full">
            <thead className="bg-white/5">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-white/60 uppercase">Zaman</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-white/60 uppercase">Kullanıcı</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-white/60 uppercase">Kapsam</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-white/60 uppercase">Aksiyon</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-white/60 uppercase">Seviye</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/10">
              {logs.map(log => (
                <tr key={log.id} className="hover:bg-white/5">
                  <td className="px-6 py-4 text-white/60 text-sm">
                    {new Date(log.createdAt).toLocaleString('tr-TR')}
                  </td>
                  <td className="px-6 py-4 text-white text-sm">
                    {log.user?.name || log.user?.email || 'Sistem'}
                  </td>
                  <td className="px-6 py-4">
                    <span className="px-2 py-1 bg-white/10 text-white/80 text-xs rounded">
                      {log.scope}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-white/80 text-sm">{log.action}</td>
                  <td className="px-6 py-4">
                    <span className={`px-2 py-1 text-xs font-medium rounded ${getLevelColor(log.level)}`}>
                      {log.level}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
