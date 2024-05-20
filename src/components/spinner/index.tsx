import { type ComponentProps } from 'react'
import { cn } from '@/utils/cn'

type Props = ComponentProps<'span'> & {
  size?: 'sm' | 'md' | 'lg'
  color?: 'yellow' | 'black'
}

export const Spinner = ({ className, size = 'md', color = 'yellow', ...props }: Props) => {
  const sizeVariants = {
    sm: 'w-4 h-4',
    md: 'w-6 h-6',
    lg: 'w-10 h-10'
  }

  const colorVariants = {
    yellow: 'primary',
    black: 'black'
  }

  return (
    <span
      className={cn(`${sizeVariants[size]} border-4 border-${colorVariants[color]} border-r-transparent animate-spin rounded-full`, className)}
      {...props}
    />
  )
}
