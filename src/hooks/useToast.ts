import { useContext } from 'react';
import { ToastContext } from '../providers/toastContext';

export function useToast() {
  return useContext(ToastContext);
}
