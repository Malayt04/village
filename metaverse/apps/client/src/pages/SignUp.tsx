import { useState } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Gamepad2, ArrowLeft } from 'lucide-react'
import CTAButton from '../components/CTAButton'
import InputBox from '../components/InputBox'

export default function SignUp() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [role, setRole] = useState('user')

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    // Here you would typically handle the sign-up logic
    console.log('Sign up attempted with:', { email, password, role })
  }

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-indigo-950 via-indigo-900 to-purple-900 text-white">
      <Link to="/" className="p-4 text-purple-300 hover:text-purple-100 transition-colors">
        <ArrowLeft className="inline-block mr-2" size={20} />
        Back to Home
      </Link>
      
      <div className="flex-grow flex items-center justify-center px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="w-full max-w-md"
        >
          <div className="bg-white/10 p-8 rounded-lg shadow-lg backdrop-blur-sm">
            <div className="flex items-center justify-center mb-8">
              <Gamepad2 className="h-12 w-12 text-purple-400 mr-4" />
              <h1 className="text-3xl font-bold">MetaVerse</h1>
            </div>
            
            <h2 className="text-2xl font-semibold mb-6 text-center">Create Your Account</h2>
            
            <form onSubmit={handleSubmit} className="space-y-6">
              <InputBox
                label="Email Address"
                id="email"
                type="email"
                required
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              
              <InputBox
                label="Password"
                id="password"
                type="password"
                required
                placeholder="Create a password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />

              <InputBox
                label="Confirm Password"
                id="confirmPassword"
                type="password"
                required
                placeholder="Confirm your password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />

              <div>
                <label className="block text-sm font-medium text-purple-200 mb-2">Select Role</label>
                <div className="flex space-x-4">
                  <label className="inline-flex items-center">
                    <input
                      type="radio"
                      className="form-radio text-purple-600"
                      name="role"
                      value="user"
                      checked={role === 'user'}
                      onChange={() => setRole('user')}
                    />
                    <span className="ml-2">User</span>
                  </label>
                  <label className="inline-flex items-center">
                    <input
                      type="radio"
                      className="form-radio text-purple-600"
                      name="role"
                      value="admin"
                      checked={role === 'admin'}
                      onChange={() => setRole('admin')}
                    />
                    <span className="ml-2">Admin</span>
                  </label>
                </div>
              </div>
              
              <div>
                <CTAButton type="submit" variant="primary" className="w-full">
                  Sign Up
                </CTAButton>
              </div>
            </form>
            
            <div className="mt-8 border-t border-purple-300/30 pt-6 text-center">
              <p className="text-sm text-purple-200">
                Already have an account?{' '}
                <Link to="/signin" className="font-medium text-purple-300 hover:text-purple-100 transition-colors">
                  Sign in here
                </Link>
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  )
}

