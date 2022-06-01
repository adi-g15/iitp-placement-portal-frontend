import Image from 'next/image'
import AuthContext from '@/context/AuthContext'
import { useContext, useState, useEffect } from 'react'
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

import Link from 'next/link'

export default function SignUpStudent() {
  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [role, setRole] = useState('student')

  const { register, error } = useContext(AuthContext)

  const handleSubmit = (e) => {
    e.preventDefault()

    if (password !== confirmPassword) {
      toast.error('Passwords do not match!')
      return
    }

    register({ username, email, password, role })
  }

  return (
    <>
      <div className='min-h-full flex flex-col justify-center py-12 sm:px-6 lg:px-8'>
        <div className='sm:mx-auto sm:w-full sm:max-w-md'>
          <div className='mx-auto text-center'>
            <Image
              className='mx-auto'
              width={100}
              height={100}
              alt='IIT Patna'
              src='/images/logo.svg'
            />
          </div>

          <h2 className='mt-6 text-center text-3xl font-extrabold text-gray-900'>
            Training and Placement Cell
          </h2>
          <h2 className='text-center font-extrabold text-3xl uppercase'>
            IIT Patna
          </h2>
          <p className='mt-2 text-center text-sm text-gray-600'>
            New Student Registration Or{' '}
            <Link href='/'>
              <a className='font-medium text-indigo-600 hover:text-indigo-500'>
                Login
              </a>
            </Link>
          </p>
        </div>

        <div className='mt-8 sm:mx-auto sm:w-full sm:max-w-md'>
          <div className='bg-gray-50 py-8 px-4 shadow sm:rounded-lg sm:px-10'>
            <form
              className='space-y-6'
              action='#'
              method='POST'
              onSubmit={handleSubmit}
            >
              <div>
                <label
                  htmlFor='username'
                  className='block text-sm font-medium text-gray-700'
                >
                  Username
                </label>
                <div className='mt-1'>
                  <input
                    value={username}
                    onChange={(e) => setUsername(e.target.value.toLowerCase())}
                    id='username'
                    name='username'
                    type='text'
                    autoComplete='username'
                    required
                    className='appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm'
                  />
                </div>
              </div>

              <div>
                <label
                  htmlFor='email'
                  className='block text-sm font-medium text-gray-700'
                >
                  Email
                </label>
                <div className='mt-1'>
                  <input
                    value={email}
                    onChange={(e) => setEmail(e.target.value.toLowerCase())}
                    id='email'
                    name='email'
                    type='text'
                    autoComplete='email'
                    required
                    className='appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm'
                  />
                </div>
              </div>

              <div>
                <label
                  htmlFor='password'
                  className='block text-sm font-medium text-gray-700'
                >
                  Password
                </label>
                <div className='mt-1'>
                  <input
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    id='password'
                    name='password'
                    type='password'
                    autoComplete='current-password'
                    required
                    className='appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm'
                  />
                </div>
              </div>

              <div>
                <label
                  htmlFor='confirmPassword'
                  className='block text-sm font-medium text-gray-700'
                >
                  Confirm Password
                </label>
                <div className='mt-1'>
                  <input
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    id='confirmPassword'
                    name='confirmPassword'
                    type='password'
                    autoComplete='current-password'
                    required
                    className='appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm'
                  />
                </div>
              </div>

              <div>
                <button
                  type='submit'
                  className='w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500'
                >
                  Register
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  )
}
