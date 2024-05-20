import { Expense } from '@/types'
import { lengthOfRange } from '@/lib/utils'

interface Props {
  data: Expense[] | []
  currentPage: number
}

export const ExpensesRange = ({ data, currentPage }: Props) => {
  const pages = lengthOfRange(data, currentPage)

  const handleClick = (page: number | string) => {
    if (typeof page === 'string') return

    const url = new URL(window.location.href)

    if (url.searchParams.get('page')) {
      url.searchParams.set('page', String(page))
    } else {
      url.searchParams.append('page', String(page))
    }

    window.history.pushState({}, '', url)
  }

  return (
    <section className='flex gap-2 p-2'>
      {pages.map((number, index) => (
        <button onClick={() => handleClick(number)} className='px-2 py-0.5 w-7 h-7 bg-primary rounded-sm' key={index}>{number}</button>
      ))}
    </section>
  )
}
