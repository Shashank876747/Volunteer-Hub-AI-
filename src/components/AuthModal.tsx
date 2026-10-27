import React, { useState } from 'react';
import { useVolunteer } from '../context/VolunteerContext';
import { X, LogIn, UserPlus, LogOut } from 'lucide-react';

export const AuthModal: React.FC = () => {
  const { 
    isAuthModalOpen, 
    setIsAuthModalOpen, 
    profile, 
    loginUser, 
    logoutUser, 
    showToast 
  } = useVolunteer();

  const [isRegister, setIsRegister] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  if (!isAuthModalOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) {
      showToast('Please enter an email', 'error');
      return;
    }

    if (isRegister) {
      loginUser(email, name || 'Volunteer Member');
      showToast('Demo account created and signed in!');
    } else {
      loginUser(email, name || 'Volunteer Member');
      showToast('Signed in to demo session!');
    }
    setIsAuthModalOpen(false);
  };

  return (
    <div className="modal-backdrop" onClick={() => setIsAuthModalOpen(false)}>
      <div className="modal" style={{ maxWidth: '440px' }} onClick={e => e.stopPropagation()}>
        <div className="modal-head">
          <div>
            <h3>{profile.isLoggedIn ? 'Account Session' : isRegister ? 'Join Volunteer Hub' : 'Volunteer Sign In'}</h3>
            <p>{profile.isLoggedIn ? 'Manage your browser session' : 'Connect with non-profits in your neighborhood'}</p>
          </div>
          <button className="close-btn" onClick={() => setIsAuthModalOpen(false)} aria-label="Close">
            <X size={18} />
          </button>
        </div>

        {profile.isLoggedIn ? (
          <div style={{ display: 'grid', gap: '16px' }}>
            <div style={{ background: '#f5f8f3', padding: '16px', borderRadius: '12px' }}>
              <strong style={{ display: 'block', fontSize: '14px', color: 'var(--ink)' }}>
                {profile.name}
              </strong>
              <small style={{ color: 'var(--muted)', fontSize: '12px' }}>{profile.email}</small>
              <div style={{ marginTop: '8px', fontSize: '11px', color: 'var(--green)', fontWeight: 700 }}>
                ● Active demo volunteer profile
              </div>
            </div>

            <p style={{ fontSize: '11px', color: 'var(--muted)', margin: 0 }}>
              Note: This client-side demo preserves your volunteer signups and preferences in local storage.
            </p>

            <div style={{ display: 'flex', gap: '10px', marginTop: '10px' }}>
              <button 
                className="btn btn-danger full-width"
                onClick={() => {
                  logoutUser();
                  setIsAuthModalOpen(false);
                }}
              >
                <LogOut size={14} />
                <span>Sign Out</span>
              </button>
              <button 
                className="btn btn-light full-width"
                onClick={() => setIsAuthModalOpen(false)}
              >
                Done
              </button>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit}>
            <div style={{ display: 'grid', gap: '14px' }}>
              {isRegister && (
                <div className="field">
                  <label>Full Name</label>
                  <input
                    type="text"
                    placeholder="Morgan Taylor"
                    value={name}
                    onChange={e => setName(e.target.value)}
                    required={isRegister}
                  />
                </div>
              )}

              <div className="field">
                <label>Email Address</label>
                <input
                  type="email"
                  placeholder="volunteer@example.org"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  required
                />
              </div>

              <div className="field">
                <label>Password</label>
                <input
                  type="password"
                  placeholder="••••••••"
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                />
              </div>

              <button type="submit" className="btn btn-primary full-width" style={{ marginTop: '10px' }}>
                {isRegister ? <UserPlus size={15} /> : <LogIn size={15} />}
                <span>{isRegister ? 'Create Account' : 'Sign In'}</span>
              </button>

              <div style={{ textAlign: 'center', fontSize: '11px', color: 'var(--muted)', marginTop: '8px' }}>
                {isRegister ? 'Already have an account? ' : "Don't have an account yet? "}
                <button
                  type="button"
                  className="text-link"
                  onClick={() => setIsRegister(!isRegister)}
                >
                  {isRegister ? 'Sign In' : 'Sign Up'}
                </button>
              </div>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};
