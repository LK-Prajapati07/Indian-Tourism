import { useRegister } from '@/hooks/useAuth'
import React from 'react'
import { useForm } from 'react-hook-form'


const Register = () => {
  const { register, handleSubmit, watch, formState: { errors } } = useForm({
    defaultValues: { role: 'tourist' }
  })
  const { mutate, isPending } = useRegister()

  const password = watch("password", "")

  const onSubmit = (data) => {

    mutate(data)
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-linear-to-br from-slate-100 to-blue-200 p-6">
      <div className="w-full max-w-2xl bg-white/90 backdrop-blur-md rounded-3xl shadow-2xl p-8 border border-white">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-black text-gray-800">Create Account</h2>
          <p className="text-gray-500">Join our community today</p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="grid grid-cols-1 md:grid-cols-2 gap-6">
          
          
          <div className="md:col-span-2">
            <label className="block text-sm font-bold text-gray-700 mb-1">Full Name</label>
            <input
              {...register("fullName", { required: "Full name is required" })}
              className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-blue-500 outline-none"
              placeholder="Lalit Kumar Prajapati"
            />
            {errors.fullName && <p className="text-red-500 text-xs mt-1">{errors.fullName.message}</p>}
          </div>

          
          <div>
            <label className="block text-sm font-bold text-gray-700 mb-1">Email</label>
            <input
              {...register("email", { required: "Email is required" })}
              type="email"
              className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-blue-500 outline-none"
              placeholder="lalit123@gmail.com"
            />
          </div>

          
          <div>
            <label className="block text-sm font-bold text-gray-700 mb-1">Phone Number</label>
            <input
              {...register("phone", { required: "Phone is required" })}
              type="tel"
              className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-blue-500 outline-none"
              placeholder="8864835581"
            />
          </div>

          
          <div>
            <label className="block text-sm font-bold text-gray-700 mb-1">Country</label>
            <input
              {...register("country", { required: "Country is required" })}
              className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-blue-500 outline-none"
              placeholder="India"
            />
          </div>

          
          <div>
            <label className="block text-sm font-bold text-gray-700 mb-1">I am a...</label>
            <select
              {...register("role")}
              className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-blue-500 outline-none bg-white"
            >
              <option value="tourist">tourist</option>
              <option value="serviceProvider">serviceProvider</option>
            </select>
          </div>

          
          <div>
            <label className="block text-sm font-bold text-gray-700 mb-1">Password</label>
            <input
              {...register("password", { required: "Required", minLength: 6 })}
              type="password"
              className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-blue-500 outline-none"
              placeholder="••••••••"
            />
          </div>

          
          <div>
            <label className="block text-sm font-bold text-gray-700 mb-1">Confirm Password</label>
            <input
              {...register("confirm", { 
                validate: v => v === password || "Match failed" 
              })}
              type="password"
              className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-blue-500 outline-none"
              placeholder="••••••••"
            />
          </div>

          <div className="md:col-span-2 mt-4">
            <button
              disabled={isPending}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 rounded-xl shadow-lg transition-transform active:scale-95 disabled:bg-gray-400"
            >
              {isPending ? "Registering..." : "Create Account"}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default Register