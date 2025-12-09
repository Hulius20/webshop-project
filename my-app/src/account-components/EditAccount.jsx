import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../api/axiosWithAuth.jsx';

export default function EditAccount() {
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirm, setConfirm] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!oldPassword || !newPassword) {
      alert('Please fill both password fields.');
      return;
    }
    if (newPassword !== confirm) {
      alert('New passwords do not match.');
      return;
    }

    setLoading(true);
    try {
      // backend endpoint should accept old_password and new_password
      await api.post('/api/accounts/change_password/', {
        old_password: oldPassword,
        new_password: newPassword,
      });
      alert('Password changed successfully. Please sign in again.');
      // emit logout so app updates UI and token/header can be cleared by your auth helper
      window.dispatchEvent(new Event('userLoggedOut'));
      // optional: clear local token if you expose a helper (not assumed here)
      navigate('/login');
    } catch (err) {
      console.error('Change password error', err);
      const msg = err?.response?.data || err.message || 'Failed to change password';
      alert(JSON.stringify(msg));
    } finally {
      setLoading(false);
      setOldPassword('');
      setNewPassword('');
      setConfirm('');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="edit-account-form">
      <h3>Change password</h3>

      <label>
        Current password
        <input
          type="password"
          value={oldPassword}
          onChange={(e) => setOldPassword(e.target.value)}
          required
        />
      </label>

      <label>
        New password
        <input
          type="password"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
          required
        />
      </label>

      <label>
        Confirm new password
        <input
          type="password"
          value={confirm}
          onChange={(e) => setConfirm(e.target.value)}
          required
        />
      </label>

      <div style={{ marginTop: 12 }}>
        <button type="submit" disabled={loading}>
          {loading ? 'Saving…' : 'Change password'}
        </button>
      </div>
    </form>
  );
}