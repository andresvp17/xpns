import { useMoneyContext } from '@/context/store'
import { SetStateAction, useEffect, type Dispatch } from 'react'
import { getExpenses } from '@/services/expenses'
import { Spinner } from '../spinner'
import { TypeOfExpense } from '@/types/index.d'
import { DeleteExpenseForm } from '../deleteExpenseForm'
import { ExpensesRange } from '../expensesRange/expenses-range'
import { useSearchParams } from 'next/navigation'
import { XPNS_PER_PAGE } from '@/lib/consts'

interface Props {
  loading: boolean
  onLoading: Dispatch<SetStateAction<boolean>>
}

export const ExpensesTable = ({ loading, onLoading }: Props) => {
  const { setMoney, money } = useMoneyContext()
  const params = useSearchParams()

  const slicedData = (data: typeof money) => {
    const page = Number(params.get('page'))
    if (page === 1) return data.slice(0, XPNS_PER_PAGE)

    return data.slice((page * XPNS_PER_PAGE) - XPNS_PER_PAGE)
  }

  const filteredExpenses = slicedData(money)

  useEffect(() => {
    getExpenses()
      .then((response) => {
        setMoney(response)
        onLoading(false)
      })
  }, [onLoading, setMoney])

  if (loading) return <Spinner color='yellow' />

  return (
    filteredExpenses.length === 0 && !loading
      ? <div className='dark:text-white h-[50vh] flex justify-center items-center'>
        <h1 className='text-3xl sm:text-5xl md:text-6xl font-bold'>No Expenses Yet... 😮</h1>
        </div>
      : <>
        <table className='w-[90%] max-w-[900px] mb-5'>
          <thead>
            <tr className='text-black dark:text-white text-xl border-b-2 border-primary [&>th]:p-3'>
              <th>Spent Name</th>
              <th>Spent</th>
              <th>Date</th>
              <th className='hidden sm:block'>Time</th>
            </tr>
          </thead>
          <tbody className='text-black dark:text-white'>
            {filteredExpenses.map(({ id, typeOfExpense, spentName, spent, creationDate, creationTime }) => (
              <tr key={id} className='[&>th]:font-normal [&>th]:p-3 [&>th]:md:hover:bg-primary/10 [&>th]:transition-colors border-b-2 border-primary '>
                <th className='relative truncate max-w-[150px]'>{spentName}</th>
                <th>{typeOfExpense === TypeOfExpense.Deposit ? '+' : '-'}{spent}</th>
                <th className='truncate'>{creationDate}</th>
                <th className='hidden sm:block'>{creationTime}</th>
                <th>{typeOfExpense === TypeOfExpense.Withdraw && <DeleteExpenseForm id={id} />}</th>
              </tr>
            ))}
          </tbody>
        </table>
        <ExpensesRange data={money} currentPage={Number(params.get('page'))} />
      </>
  )
}
