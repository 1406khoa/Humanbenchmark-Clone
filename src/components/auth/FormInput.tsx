import React, { ReactNode } from 'react';

interface FormInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  icon: ReactNode;
}

export function FormInput({ icon, ...props }: FormInputProps) {
  return (
    <div className="relative">
      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
        {icon}
      </div>
      <input
        {...props}
        className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-sm transition-colors"
      />
    </div>
  );
}