import { useAuth } from '@/hooks/useAuth'
import React from 'react'
import { useForm } from 'react-hook-form'

const Login = () => {
  const { register, handleSubmit, formState: { errors } } = useForm()
  const { mutate, isPending } = useAuth()

  const loginHandler = (data) => {
    console.log(data)
    mutate(data)
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-linear-to-br from-slate-50 to-blue-100 p-4">
      <div className="w-full max-w-md">
        
        <div className="bg-white/80 backdrop-blur-lg rounded-2xl shadow-xl border border-white p-8">
          
          <div className="text-center mb-10">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-600 rounded-xl shadow-lg mb-4">
              <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
            </div>
            <h2 className="text-3xl font-bold text-gray-900 tracking-tight">Welcome Back</h2>
            <p className="text-gray-500 mt-2">
              New here? <a href="#" className="text-blue-600 font-semibold hover:underline">Create an account</a>
            </p>
          </div>

          <form onSubmit={handleSubmit(loginHandler)} className="space-y-5">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1 ml-1">Email Address</label>
              <input
                {...register("email", { required: "Email is required" })}
                type="email"
                placeholder="name@company.com"
                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all outline-none bg-white/50"
              />
              {errors.email && <p className="text-red-500 text-xs mt-1 ml-1">{errors.email.message}</p>}
            </div>

            <div>
              <div className="flex justify-between mb-1 ml-1">
                <label className="text-sm font-semibold text-gray-700">Password</label>
                <a href="#" className="text-xs font-semibold text-blue-600 hover:text-blue-700">Forgot?</a>
              </div>
              <input
                {...register("password", { required: "Password is required" })}
                type="password"
                placeholder="••••••••"
                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all outline-none bg-white/50"
              />
              {errors.password && <p className="text-red-500 text-xs mt-1 ml-1">{errors.password.message}</p>}
            </div>

            <div className="flex items-center ml-1">
              <input 
                id="remember" 
                type="checkbox" 
                className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500" 
              />
              <label htmlFor="remember" className="ml-2 text-sm text-gray-600">Keep me logged in</label>
            </div>

            <button
              type="submit"
              disabled={isPending}
              className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-blue-300 text-white font-bold py-3 px-4 rounded-xl transition-all duration-200 transform active:scale-[0.98] shadow-lg shadow-blue-200 flex items-center justify-center"
            >
              {isPending ? (
                <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
              ) : "Sign In"}
            </button>
          </form>

          <div className="relative my-8">
            <div className="absolute inset-0 flex items-center"><span className="w-full border-t border-gray-200"></span></div>
            <div className="relative flex justify-center text-xs uppercase"><span className="bg-white px-2 text-gray-400">Secure Encrypted Login</span></div>
          </div>
        </div>
        
        <p className="text-center text-gray-400 text-xs mt-8">
          &copy; 2026 Your Brand Inc. All rights reserved.
        </p>
      </div>
    </div>
  )
}

export default Login