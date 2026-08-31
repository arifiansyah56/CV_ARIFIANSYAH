import React, { useState, useEffect } from 'react';
import { doc, getDoc, setDoc, collection, getDocs, deleteDoc, updateDoc } from 'firebase/firestore';
import { db } from '../lib/firebase';
import { useAuth } from '../lib/AuthContext';
import { usePortfolioData } from '../hooks/usePortfolioData';
import { Check, LogOut, Save, AlertCircle, Users, Plus, Trash2, Database, Eye, Edit2, X } from 'lucide-react';
import { VisualEditor } from './VisualEditor';

export const AdminDashboard = () => {
  const { user, userRole, login, logout } = useAuth();
  const { data: currentData, loading: dataLoading } = usePortfolioData();
  
  // Editor states
  const [formData, setFormData] = useState<any>(null);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  
  // Tab states
  const [activeTab, setActiveTab] = useState<'editor' | 'users'>('editor');
  
  // User Management states
  const [usersList, setUsersList] = useState<{username: string, role: string}[]>([]);
  const [newUsername, setNewUsername] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [newUserRole, setNewUserRole] = useState<'admin' | 'editor'>('editor');
  const [editingUser, setEditingUser] = useState<string | null>(null);
  const [editPassword, setEditPassword] = useState('');
  const [editRole, setEditRole] = useState<'admin' | 'editor'>('editor');
  
  // Auth states
  const [loginId, setLoginId] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [authError, setAuthError] = useState('');
  const [isAuthenticating, setIsAuthenticating] = useState(false);

  useEffect(() => {
    if (!dataLoading && currentData) {
      // Create deep copy for editing
      setFormData(JSON.parse(JSON.stringify(currentData)));
    }
  }, [currentData, dataLoading]);

  const fetchUsers = async () => {
    try {
      const snap = await getDocs(collection(db, 'custom_users'));
      setUsersList(snap.docs.map(d => ({ username: d.id, role: d.data().role })));
    } catch (e) {
      console.error("Failed to fetch users", e);
    }
  };

  useEffect(() => {
    if (userRole === 'admin' && activeTab === 'users') {
      fetchUsers();
    }
  }, [userRole, activeTab]);

  const handleCustomLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!loginId || !loginPassword) return;

    setAuthError('');
    setIsAuthenticating(true);
    try {
      const formattedUsername = loginId.toLowerCase().trim();
      const userDoc = await getDoc(doc(db, 'custom_users', formattedUsername));
      
      if (userDoc.exists()) {
        const data = userDoc.data();
        if (data.password === loginPassword) {
          login(formattedUsername, data.role as 'admin' | 'editor');
        } else {
          setAuthError("Password salah.");
        }
      } else {
        // Fallback: If it's the very first time and admin types admin/admin123, bootstrap the system
        if (formattedUsername === 'admin' && loginPassword === 'admin123') {
          await setDoc(doc(db, 'custom_users', 'admin'), {
            password: 'admin123',
            role: 'admin',
            _securityToken: 'portfolio_admin_2024'
          });
          login('admin', 'admin');
        } else {
          setAuthError("Username tidak ditemukan.");
        }
      }
    } catch (err: any) {
      console.error("Login error", err);
      setAuthError("Terjadi kesalahan sistem. Pastikan koneksi internet stabil.");
    } finally {
      setIsAuthenticating(false);
    }
  };

  const handleSave = async () => {
    if (!formData) return;
    try {
      setSaving(true);
      setError('');
      setSuccess(false);
      
      await setDoc(doc(db, 'portfolio', 'data'), {
        ...formData,
        _securityToken: 'portfolio_admin_2024'
      });
      
      setSuccess(true);
      setTimeout(() => setSuccess(false), 3000);
    } catch (e: any) {
      setError(e.message || "Gagal menyimpan data.");
    } finally {
      setSaving(false);
    }
  };

  const handleAddUser = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newUsername || !newPassword) return;
    try {
      await setDoc(doc(db, 'custom_users', newUsername.toLowerCase().trim()), { 
        password: newPassword,
        role: newUserRole, 
        addedAt: new Date().toISOString(),
        _securityToken: 'portfolio_admin_2024'
      });
      setNewUsername('');
      setNewPassword('');
      fetchUsers();
    } catch (err: any) {
      alert("Error menambahkan pengguna: " + err.message);
    }
  };

  const handleEditUser = (username: string, role: string) => {
    setEditingUser(username);
    setEditRole(role as 'admin' | 'editor');
    setEditPassword(''); // Kosongkan agar bisa diisi baru, atau abaikan
  };

  const submitEditUser = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingUser) return;
    try {
      const updateData: any = { role: editRole };
      if (editPassword) {
        updateData.password = editPassword;
      }
      await updateDoc(doc(db, 'custom_users', editingUser), updateData);
      setEditingUser(null);
      setEditPassword('');
      fetchUsers();
    } catch (err: any) {
      alert("Error mengupdate pengguna: " + err.message);
    }
  };

  const handleRemoveUser = async (usernameToRemove: string) => {
    if (usernameToRemove === 'admin') {
      alert("Tidak bisa menghapus akun admin utama!");
      return;
    }
    if (window.confirm(`Yakin ingin menghapus akses untuk ${usernameToRemove}?`)) {
      try {
        await deleteDoc(doc(db, 'custom_users', usernameToRemove));
        fetchUsers();
      } catch (err: any) {
        alert("Error menghapus pengguna: " + err.message);
      }
    }
  };

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50 dark:bg-slate-950 p-4 transition-colors">
        <div className="bg-white dark:bg-slate-900 p-8 rounded-xl shadow-xl max-w-md w-full">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">Admin Panel</h2>
            <p className="text-slate-500 dark:text-slate-400 text-sm">
              Silakan login dengan Username dan Password Anda.
            </p>
          </div>
          
          <form onSubmit={handleCustomLogin} className="space-y-4">
            {authError && (
              <div className="p-3 bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 text-sm rounded-lg border border-red-100 dark:border-red-900/50 flex items-start gap-2">
                <AlertCircle className="w-5 h-5 shrink-0 mt-0.5" />
                <span>{authError}</span>
              </div>
            )}
            
            <div>
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Username</label>
              <input 
                type="text" 
                value={loginId}
                onChange={(e) => setLoginId(e.target.value)}
                required
                className="w-full px-4 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg outline-none focus:ring-2 focus:ring-orange-500 text-slate-900 dark:text-white"
                placeholder="Masukkan username"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Password</label>
              <input 
                type="password" 
                value={loginPassword}
                onChange={(e) => setLoginPassword(e.target.value)}
                required
                className="w-full px-4 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg outline-none focus:ring-2 focus:ring-orange-500 text-slate-900 dark:text-white"
                placeholder="••••••••"
              />
            </div>
            
            <button 
              type="submit"
              disabled={isAuthenticating}
              className="w-full mt-2 bg-slate-900 hover:bg-slate-800 dark:bg-white dark:hover:bg-slate-100 text-white dark:text-slate-900 font-semibold py-3 px-4 rounded-lg transition-colors flex items-center justify-center gap-3 disabled:opacity-70 shadow-sm"
            >
              {isAuthenticating ? 'Memproses...' : 'Login'}
            </button>
          </form>
          
          <p className="mt-6 text-xs text-center text-slate-400">
            *Untuk percobaan pertama, gunakan username <strong>admin</strong> dan password <strong>admin123</strong>
          </p>
        </div>
      </div>
    );
  }

  if (!userRole) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50 dark:bg-slate-950 p-4 transition-colors">
        <div className="bg-white dark:bg-slate-900 p-8 rounded-xl shadow-xl max-w-md w-full text-center">
          <AlertCircle className="w-12 h-12 text-red-500 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">Akses Ditolak</h2>
          <p className="text-slate-600 dark:text-slate-400 mb-6">Akun Anda tidak memiliki hak akses sistem ini.</p>
          <button 
            onClick={logout}
            className="text-slate-500 hover:text-slate-700 dark:hover:text-slate-300 flex items-center justify-center gap-2 mx-auto"
          >
            <LogOut className="w-4 h-4" /> Sign out
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 p-4 md:p-8 transition-colors flex flex-col">
      <div className="max-w-6xl w-full mx-auto flex-1 flex flex-col">
        <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
          <div>
            <h1 className="text-3xl font-bold text-slate-900 dark:text-white">Admin Dashboard</h1>
            <p className="text-slate-600 dark:text-slate-400 mt-1">Kelola data portofolio dan hak akses admin.</p>
          </div>
          <div className="flex flex-wrap items-center justify-center gap-3">
            <a 
              href="#"
              onClick={() => {
                window.location.hash = '';
              }}
              className="flex items-center gap-2 bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 px-4 py-2 rounded-lg transition-colors font-medium text-sm border border-slate-200 dark:border-slate-700"
              title="Lihat Website"
            >
              <Eye className="w-4 h-4" />
              <span>Lihat Website</span>
            </a>
            <span className="text-sm font-medium text-slate-700 dark:text-slate-300 bg-white dark:bg-slate-800 px-3 py-2 rounded-lg shadow-sm border border-slate-200 dark:border-slate-700">
              {user.username}
            </span>
            <button 
              onClick={logout}
              className="p-2 text-slate-500 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-950/30 rounded-lg transition-colors bg-white dark:bg-slate-800 shadow-sm border border-slate-200 dark:border-slate-700"
              title="Sign out"
            >
              <LogOut className="w-5 h-5" />
            </button>
          </div>
        </div>
        
        <div className="flex space-x-1 mb-6 bg-slate-200/50 dark:bg-slate-800/50 p-1 rounded-lg w-full max-w-sm">
          <button
            onClick={() => setActiveTab('editor')}
            className={`flex-1 flex items-center justify-center gap-2 py-2 px-3 text-sm font-medium rounded-md transition-colors ${
              activeTab === 'editor' 
                ? 'bg-white dark:bg-slate-700 text-slate-900 dark:text-white shadow-sm' 
                : 'text-slate-500 hover:text-slate-700 dark:hover:text-slate-300'
            }`}
          >
            <Database className="w-4 h-4" /> Data Editor
          </button>
          {userRole === 'admin' && (
            <button
              onClick={() => setActiveTab('users')}
              className={`flex-1 flex items-center justify-center gap-2 py-2 px-3 text-sm font-medium rounded-md transition-colors ${
                activeTab === 'users' 
                  ? 'bg-white dark:bg-slate-700 text-slate-900 dark:text-white shadow-sm' 
                  : 'text-slate-500 hover:text-slate-700 dark:hover:text-slate-300'
              }`}
            >
              <Users className="w-4 h-4" /> Manage Users
            </button>
          )}
        </div>

        {activeTab === 'editor' && (
          <div className="bg-white dark:bg-slate-900 rounded-xl shadow-lg border border-slate-200 dark:border-slate-800 overflow-hidden flex flex-col flex-1 min-h-[65vh]">
            <div className="p-4 border-b border-slate-200 dark:border-slate-800 flex justify-between items-center bg-slate-50 dark:bg-slate-900/50">
              <h3 className="font-semibold text-slate-700 dark:text-slate-300">Editor Visual</h3>
              <button 
                onClick={handleSave}
                disabled={saving || dataLoading}
                className="bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-md font-medium text-sm flex items-center gap-2 transition-colors disabled:opacity-50"
              >
                {saving ? (
                  <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                ) : success ? (
                  <><Check className="w-4 h-4" /> Disimpan</>
                ) : (
                  <><Save className="w-4 h-4" /> Simpan Perubahan</>
                )}
              </button>
            </div>
            
            {error && (
              <div className="p-3 bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 text-sm border-b border-red-100 dark:border-red-900/50">
                {error}
              </div>
            )}
            <div className="flex-1 p-0 md:p-4 overflow-hidden">
              {dataLoading ? (
                <div className="flex h-full items-center justify-center text-slate-500">Memuat data...</div>
              ) : (
                <VisualEditor data={formData} onChange={setFormData} />
              )}
            </div>
          </div>
        )}

        {activeTab === 'users' && userRole === 'admin' && (
          <div className="bg-white dark:bg-slate-900 rounded-xl shadow-lg border border-slate-200 dark:border-slate-800 overflow-hidden">
            <div className="p-4 md:p-6 border-b border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/50">
              <h3 className="font-semibold text-slate-800 dark:text-slate-200 mb-2">Tambah Pengguna Baru</h3>
              <p className="text-sm text-slate-500 dark:text-slate-400 mb-4">
                Tambahkan username dan password untuk rekan yang diperbolehkan mengelola portofolio.
              </p>
              
              <form onSubmit={handleAddUser} className="flex flex-col md:flex-row gap-3 max-w-3xl">
                <input
                  type="text"
                  value={newUsername}
                  onChange={(e) => setNewUsername(e.target.value.replace(/\s+/g, '').toLowerCase())}
                  placeholder="Username (tanpa spasi)"
                  required
                  className="flex-1 px-4 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none text-slate-900 dark:text-white transition-colors text-sm"
                />
                <input
                  type="text"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  placeholder="Password"
                  required
                  className="flex-1 px-4 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none text-slate-900 dark:text-white transition-colors text-sm"
                />
                <select
                  value={newUserRole}
                  onChange={(e) => setNewUserRole(e.target.value as 'admin' | 'editor')}
                  className="px-4 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none text-slate-900 dark:text-white transition-colors text-sm cursor-pointer"
                >
                  <option value="admin">Admin</option>
                  <option value="editor">Editor</option>
                </select>
                <button 
                  type="submit"
                  className="bg-slate-900 hover:bg-slate-800 dark:bg-white dark:hover:bg-slate-100 text-white dark:text-slate-900 px-4 py-2 rounded-lg font-medium text-sm flex items-center justify-center gap-2 transition-colors shrink-0"
                >
                  <Plus className="w-4 h-4" /> Tambah
                </button>
              </form>
            </div>
            
            <div className="p-0">
              <ul className="divide-y divide-slate-100 dark:divide-slate-800/50">
                {usersList.map(u => (
                  <li key={u.username} className="p-4 flex flex-col md:flex-row md:items-center justify-between gap-4 hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors group">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-slate-600 dark:text-slate-400 font-semibold text-sm uppercase">
                        {u.username.charAt(0)}
                      </div>
                      <div>
                        <p className="text-sm font-medium text-slate-700 dark:text-slate-300">{u.username}</p>
                        <p className="text-xs text-slate-500 capitalize">{u.role}</p>
                      </div>
                    </div>
                    
                    {editingUser === u.username ? (
                      <form onSubmit={submitEditUser} className="flex flex-col md:flex-row items-center gap-2 w-full md:w-auto">
                        <input
                          type="text"
                          value={editPassword}
                          onChange={(e) => setEditPassword(e.target.value)}
                          placeholder="Password baru (opsional)"
                          className="w-full md:w-48 px-3 py-1.5 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none text-slate-900 dark:text-white transition-colors text-sm"
                        />
                        <select
                          value={editRole}
                          onChange={(e) => setEditRole(e.target.value as 'admin' | 'editor')}
                          className="w-full md:w-auto px-3 py-1.5 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none text-slate-900 dark:text-white transition-colors text-sm cursor-pointer"
                        >
                          <option value="admin">Admin</option>
                          <option value="editor">Editor</option>
                        </select>
                        <div className="flex gap-1 w-full md:w-auto justify-end">
                          <button
                            type="submit"
                            className="p-1.5 text-white bg-green-500 hover:bg-green-600 rounded-md transition-colors"
                            title="Simpan"
                          >
                            <Check className="w-4 h-4" />
                          </button>
                          <button
                            type="button"
                            onClick={() => setEditingUser(null)}
                            className="p-1.5 text-slate-500 bg-slate-200 hover:bg-slate-300 dark:bg-slate-800 dark:hover:bg-slate-700 rounded-md transition-colors"
                            title="Batal"
                          >
                            <X className="w-4 h-4" />
                          </button>
                        </div>
                      </form>
                    ) : (
                      <div className="flex items-center gap-2 opacity-100 md:opacity-0 md:group-hover:opacity-100 transition-opacity">
                        <button
                          onClick={() => handleEditUser(u.username, u.role)}
                          className="p-2 text-slate-400 hover:text-blue-500 hover:bg-blue-50 dark:hover:bg-blue-950/30 rounded-lg transition-colors"
                          title="Edit Akun"
                        >
                          <Edit2 className="w-4 h-4" />
                        </button>
                        {u.username !== 'admin' && (
                          <button
                            onClick={() => handleRemoveUser(u.username)}
                            className="p-2 text-slate-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-950/30 rounded-lg transition-colors"
                            title="Cabut Akses"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        )}
                      </div>
                    )}
                  </li>
                ))}
                
                {usersList.length === 0 && (
                  <li className="p-8 text-center text-slate-500 dark:text-slate-400 text-sm">
                    Belum ada pengguna tambahan.
                  </li>
                )}
              </ul>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
