import React, { InputHTMLAttributes } from 'react'
import { cn } from '../lib/utils'

interface InputBoxProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string
}

const InputBox: React.FC<InputBoxProps> = ({ label, id, className, ...props }) => {
  return (
    <div>
      <label htmlFor={id} className="block text-sm font-medium text-purple-200 mb-1">
        {label}
      </label>
      <input
        id={id}
        className={cn(
          "w-full px-3 py-2 bg-white/20 border border-purple-300/30 rounded-md text-white placeholder-purple-300 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent",
          className
        )}
        {...props}
      />
    </div>
  )
}

export default InputBox

