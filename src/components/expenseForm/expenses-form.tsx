import { createExpenseSchema } from '@/types/schema'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { SolidButton } from '../buttons/buttons'
import { useMoneyContext } from '@/context/store'
import { Spinner } from '../spinner'
import { z } from 'zod'
import { getExpenses } from '@/services/expenses'
import { TypeOfExpense } from '@/types/index.d'
import './styles.modules.css'

export const ExpensesForm = () => {
    const { 
        register, 
        handleSubmit, 
        formState: { errors, isSubmitting }
    } = useForm<z.infer<typeof createExpenseSchema>>({ resolver: zodResolver(createExpenseSchema) })
    const { setOpenModal, setMoney, moneyAvailable } = useMoneyContext()

    
    const onSubmit = async ({ spent, spentName, typeOfExpense }: z.infer<typeof createExpenseSchema>) => {
        const canBeSpent = moneyAvailable - spent >= 0
        if (typeOfExpense === TypeOfExpense.Withdraw && !canBeSpent) {
            return alert("You can't spend more money than the one you currently have")
        }

        await fetch('/api/expenses', {
            method: 'POST',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ spentName, spent, typeOfExpense })
        })
        .then(res => res.json())
        .then(res => res)

        const newState = await getExpenses()
          .then((res) => res)

        setMoney(newState)
        setOpenModal(false)
    }

    return(
        <>
            <form id='expenses-form' className='flex flex-col justify-center gap-5 rounded-xl min-w-[330px] min-h-[290px] max-w-[400px] bg-slate-950 p-5 text-white' onSubmit={handleSubmit(onSubmit)}>
                <div className='flex flex-col gap-1'>
                    <label htmlFor="spentName">Spent Name</label>
                    <input 
                        id='spent-name'
                        className='bg-slate-900 py-1.5 px-2.5 rounded-lg focus:outline-2 focus:outline-primary/50 outline-none' placeholder='Food, Games, etc..' 
                        type="text" 
                        {...register("spentName")}
                    />
                </div>
                {errors.spentName && <p className='text-sm text-red-500'>{errors.spentName.message}</p>}
                <div className='flex flex-col gap-1'>
                    <label htmlFor="spent">Spent Amount</label>
                    <input 
                        id='spent'
                        className='bg-slate-900 py-1.5 px-2.5 rounded-lg focus:outline-2 focus:outline-primary/50 outline-none' 
                        placeholder='$70' 
                        type="number" 
                        step="0.01"
                        {...register("spent", { valueAsNumber: true })}
                    />
                </div>
                <div className='flex flex-col gap-1'>
                    <div>
                        <p className='text-center text-xl font-semibold'>Select The Kind of Expense</p>
                    </div>
                    <section className='flex justify-center gap-4'>
                        <div className='flex gap-2 items-center'>
                            <label htmlFor="typeOfExpense">{TypeOfExpense.Deposit}</label>
                            <input 
                                className='inputRadio' 
                                type="radio"  
                                value={TypeOfExpense.Deposit}
                                {...register("typeOfExpense")}
                            />
                        </div>
                        <div className='flex gap-2 items-center'>
                            <label htmlFor="typeOfExpense">{TypeOfExpense.Withdraw}</label>
                            <input 
                                className='inputRadio' 
                                type="radio" 
                                value={TypeOfExpense.Withdraw}
                                {...register("typeOfExpense")}
                            />
                        </div>
                    </section>
                </div>
                {errors.spent && <p className='text-sm text-red-500'>{errors.spent.message}</p>}
                <SolidButton 
                    className={`${isSubmitting && 'bg-primary/65'} flex justify-center items-center`}
                    type='submit' 
                    size='md'>
                        {
                        !isSubmitting 
                          ? 'Submit' 
                          : <Spinner size="md" />
                        }
                </SolidButton>
            </form>
        </>
    )
}