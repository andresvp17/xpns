'use client'

import { LoginForm } from '@/components/login/form'
import Head from 'next/head'

export default function Page () {
  return (
    <>
      <Head>
        <title>XPNS | Login</title>
        <meta property='description' content='Log in with your credentials!' />
      </Head>
      <div className='flex justify-center items-center h-screen'>
        <LoginForm />
      </div>
    </>
  )
}
