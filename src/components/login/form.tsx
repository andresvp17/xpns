import { SolidButton } from '../buttons/buttons'
import { signIn, useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { formLoginSchema } from '@/types/schema'
import { zodResolver } from '@hookform/resolvers/zod'
import { Spinner } from '../spinner'
import Link from 'next/link'

export const LoginForm = () => {
  const router = useRouter()
  const { data: session } = useSession()
  const { handleSubmit, register, formState: { isSubmitting } } = useForm<z.infer<typeof formLoginSchema>>({
    resolver: zodResolver(formLoginSchema),
    defaultValues: {
      email: '',
      password: ''
    }
  })

  if (session != null) router.push('/expenses')

  const onSubmit = async (values: z.infer<typeof formLoginSchema>) => {
    const signInData = await signIn('credentials', {
      email: values.email,
      password: values.password,
      redirect: false
    })

    if (signInData?.error) {
      console.log(signInData.error)
    } else {
      router.push('/expenses')
    }
  }

  return (
    <section className='flex flex-col gap-5'>
      <form
        className='flex flex-col justify-center gap-5 rounded-xl min-w-[330px] min-h-[390px] max-w-[400px] bg-slate-950 p-5 text-white'
        onSubmit={handleSubmit(onSubmit)}
      >
        <div className='flex flex-col'>
          <label htmlFor='email'>Email</label>
          <input
            className='bg-slate-900 py-1.5 px-2.5 rounded-lg focus:outline-2 focus:outline-primary/50 outline-none'
            placeholder='example@email.com'
            autoComplete='off'
            role='email'
            id='email'
            {...register('email', {
              required: true
            })}
          />
        </div>
        <div className='flex flex-col'>
          <label htmlFor='password'>Password</label>
          <input
            className='bg-slate-900 py-1.5 px-2.5 rounded-lg focus:outline-2 focus:outline-primary/50 outline-none'
            placeholder='Insert your password...'
            type='password'
            role='password'
            id='password'
            {...register('password', {
              required: true
            })}
          />
        </div>
        <SolidButton
          role='submitButton'
          disabled={isSubmitting}
          className={`${isSubmitting && 'bg-primary/65'} flex justify-center items-center`}
          size='md'
          id='submit-button'
        >
          {!isSubmitting ? 'Sign In' : <Spinner color='black' />}
        </SolidButton>
        <p className='text-center text-sm text-white mt-2'>If you do not have an account, please&nbsp;
          <Link className='text-primary md:hover:underline' href='/signUp'>
            Sign Up
          </Link>
        </p>
      </form>
    </section>
  )
}
