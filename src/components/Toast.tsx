import React from 'react';
import { useVolunteer } from '../context/VolunteerContext';
import { CheckCircle2, AlertCircle, Info } from 'lucide-react';

export const Toast: React.FC = () => {
  const { toast } = useVolunteer();

  if (!toast) return null;

  return (
    <div className={`toast ${toast.type || 'success'}`}>
      {toast.type === 'error' ? (
        <AlertCircle size={18} />
      ) : toast.type === 'info' ? (
        <Info size={18} />
      ) : (
        <CheckCircle2 size={18} />
      )}
      <span>{toast.message}</span>
    </div>
  );
};
