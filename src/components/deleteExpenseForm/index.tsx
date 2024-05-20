import { SolidButton } from '../buttons/buttons'
import { Modal } from '../modal/modal'
import { useForm } from 'react-hook-form'
import { getExpenses } from '@/services/expenses'
import { useMoneyContext } from '@/context/store'
import { Spinner } from '../spinner'
import { useState } from 'react'
import { TrashIcon } from '../icons'

interface Props {
  id: number
}

export const DeleteExpenseForm = ({ id }: Props) => {
  const { handleSubmit, formState: { isSubmitting } } = useForm()
  const [show, setShow] = useState(false)
  const { setMoney } = useMoneyContext()

  const onSubmit = async () => {
    await fetch('/api/expenses', {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ expenseID: id })
    })

    const newExpenses = await getExpenses()
      .then((res) => res)

    setMoney(newExpenses)
    setShow(false)
  }

  return (
    <>
      <button onClick={() => setShow(true)} className='bg-red-500 p-1 rounded-md md:hover:bg-red-600 md:transition-colors'>
        <TrashIcon />
      </button>
      {
            show &&
              <Modal show={show} onClose={setShow}>
                <form onSubmit={handleSubmit(onSubmit)} className='flex flex-col justify-center items-center gap-5 rounded-xl min-w-[330px] min-h-[200px] max-w-[400px] bg-slate-950 p-5 text-white'>
                  <p className='text-center text-xl font-bold'>Are you sure you want to delete this expense? 🤔</p>
                  <div className='flex gap-2'>
                    <SolidButton onClick={() => setShow(false)} size='md'>No</SolidButton>
                    <SolidButton className='flex justify-center items-center bg-red-500 md:hover:bg-red-700 dark:md:hover:bg-red-700' size='md'>
                      {isSubmitting ? <Spinner color='black' /> : 'Yes'}
                    </SolidButton>
                  </div>
                </form>
              </Modal>
        }
    </>
  )
}
