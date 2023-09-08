import { InputHTMLAttributes } from 'react';

// interface InputProps extends
export interface TInputProps extends InputHTMLAttributes<HTMLInputElement> {
  name: string;
  type: 'email' | 'password' | 'text' | 'search' | 'number' | 'date' | 'radio';
  className?: string;
  required: boolean;
  children?: React.ReactNode;
  value?: string;
  onChange?: () => void;
  text: string;
}
