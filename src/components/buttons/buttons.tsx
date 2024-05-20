import { type  ComponentProps, forwardRef } from 'react'
import { cn } from '@/utils/cn'

type ButtonProps = ComponentProps<'button'> & {
    size?: 'sm' | 'md' | 'lg'
}

// eslint-disable-next-line react/display-name
export const SolidButton = forwardRef<
HTMLButtonElement,
ButtonProps>(
    ({ className, size = 'md', ...props }, ref) => {
        const sizeVariants = {
            sm: 'text-sm py-1 px-4',
            md: 'text-base py-2 px-5',
            lg: 'text-lg py-2.5 px-7'
          }
    
        return (
            <button ref={ref} className={cn(`${sizeVariants[size as keyof typeof sizeVariants]} bg-primary text-slate-950 font-semibold border-transparent md:hover:bg-primary/80 dark:md:hover:bg-primary/90 rounded-lg transition-colors`, className)} {...props} />
        )
    }
)