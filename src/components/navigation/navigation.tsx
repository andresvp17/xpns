'use client'

import Link from "next/link"
import { useSession, signOut } from "next-auth/react"
import { SolidButton } from "../buttons/buttons"
import { Avatar } from "../avatar/avatar"
import { usePathname } from "next/navigation"

export const Navigation = () => {
    const { data: session } = useSession()
    const path = usePathname()

    const ROUTES = {
        root: "/",
        xpns: "/expenses"
    }

    return(
        !session
        ? null
        : <nav className={`p-6 mb-5 md:mb-0`}>
            <ul className="flex justify-center items-center gap-3">
                <li>
                    <Link className={`${path === ROUTES.root ? 'text-yellow-600 dark:text-primary' : 'dark:text-white'} font-semibold text-black md:hover:bg-primary md:hover:text-black transition-colors py-1.5 px-3 rounded-md`} href={"/"}>Home</Link>
                </li>
                <li>
                    <Link className={`${path === ROUTES.xpns ? 'text-yellow-600 dark:text-primary' : 'dark:text-white'} font-semibold text-black md:hover:bg-primary md:hover:text-black transition-colors py-1.5 px-3 rounded-md`} href={"/expenses"}>XPNS</Link>
                </li>
                {session && (
                    <li>
                        <SolidButton size="sm" onClick={() => signOut({ redirect: true, callbackUrl: '/' })}>Log Out</SolidButton>
                    </li>
                )}
                {session && (
                    <li className="ml-auto hidden md:block">
                        <Avatar
                            image="https://i.pinimg.com/564x/14/67/38/146738430f7eb90b60853bcb67071493.jpg"
                            username={session.user.name}
                        />
                    </li>
                )}
            </ul>
        </nav>
    )
}