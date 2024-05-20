import Link from 'next/link'
import { Session } from 'next-auth'

interface Props {
  userInfo: Session | null
}

const UserNotLogin = () => {
  return (
    <header className='flex flex-col items-center justify-center gap-5 h-[80vh]'>
      <h1 style={{ textShadow: '#f3f660 1px 0px 20px' }} className='text-8xl md:text-9xl font-bold tracking-wider text-black dark:text-white drop-shadow-2xl'>XPNS</h1>
      <p className='text-xl md:text-2xl md:w-[45ch] text-center text-black dark:text-white'>Know where your money goes noting the expenses you have everyday!</p>
      <Link href='/expenses' className='py-2 px-5 text-lg bg-primary text-slate-950 font-semibold border-transparent md:hover:bg-primary/90 rounded-lg transition-colors' type='button'>Go to Expenses</Link>
    </header>
  )
}

const UserLoogedIn = ({ username }: { username: string | null | undefined }) => {
  return (
    <header className='flex flex-col items-center justify-center gap-5 h-[80vh]'>
      <h1 style={{ textShadow: '#f3f660 1px 0px 20px' }} className='text-5xl md:text-7xl text-center font-bold tracking-wider text-black dark:text-white drop-shadow-2xl'>Welcome to XPNS, {username}!</h1>
      <p className='text-xl md:text-2xl md:w-[45ch] text-center text-black dark:text-white'>Check how your expenses have been these days</p>
      <Link href='/expenses' className='py-2 px-5 text-lg bg-primary text-slate-950 font-semibold border-transparent md:hover:bg-primary/90 rounded-lg transition-colors' type='button'>Go to Expenses</Link>
    </header>
  )
}

export const Header = ({ userInfo }: Props) => {
  return (
    (userInfo == null)
      ? <UserNotLogin />
      : <UserLoogedIn username={userInfo?.user?.name} />
  )
}
