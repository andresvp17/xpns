'use client'

import { useSession } from "next-auth/react"
import { cn } from "@/lib/utils"

interface Props {
    image?: string
    fallback?: React.ReactNode
    username: string | undefined | null
    size?: 'sm' | 'md' | 'lg'
}

export const Avatar = ({ size = 'sm' }: Props) => {
    const { data: session } = useSession()
    const sizeVariants = {
        sm: 'w-10 h-10',
        md: 'w-15 h-15 text-2xl',
        lg: 'w-20 h-20 text-3xl'
    }

    return(
        <article className="flex flex-col items-center gap-1">
            {session?.user?.image == null ? (
                <span className={cn(`flex items-center justify-center ${sizeVariants[size as keyof typeof sizeVariants]} rounded-full aspect-square uppercase bg-primary text-black`)}>{session?.user?.name?.toString()[0]}</span>
            ) : (
                // eslint-disable-next-line @next/next/no-img-element
                <img 
                    className={cn(`${sizeVariants[size as keyof typeof sizeVariants]} rounded-full aspect-square object-cover`)}
                    src={session?.user?.image} 
                    alt="icon of user"
                 />
            )}
            <p className={`font-semibold text-black dark:text-white ${size === 'sm' ? 'text-sm' : 'text-base'}`}>{session?.user?.name ?? 'Not Specified'}</p>
        </article>
    )
}