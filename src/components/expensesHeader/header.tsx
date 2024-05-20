'use client'

import { createPortal } from "react-dom"
import { DropDownMenu, DropDownItem } from "../dropMenu/drop-down-menu"
import { SolidButton } from "../buttons/buttons"
import { useMoneyContext } from "@/context/store"
import { sortByDate, sortBySpent } from '@/lib/utils'
import { Filters, Expense, TypeOfExpense } from "@/types/index.d"
import { Modal } from '@/components/modal/modal'
import { ExpensesForm } from "../expenseForm/expenses-form"
import { useEffect } from "react"
import { Spinner } from "../spinner"

interface Props {
    loading: boolean
}

export const ExpensesHeader = ({ loading }: Props) => {
    const { 
        money, 
        setMoney, 
        openModal, 
        setOpenModal, 
        moneyAvailable, 
        setMoneyAvailable } = useMoneyContext()
    
    useEffect(() => {
        const salaryDisccounted = money.reduce((acc, { spent, typeOfExpense }) => {
            if (typeOfExpense === TypeOfExpense.Withdraw) {
                return acc - spent
            }
            return acc + spent
        }, 0)
    
        setMoneyAvailable(salaryDisccounted)
    }, [money, setMoneyAvailable])

    const filterExpenses = ({ kindOfSearch }: { kindOfSearch: Filters }) => () => {
        const filteringFunctions: { [key in Filters]: () => Expense[] } = {
            [Filters.Date]: () => money.sort(sortByDate),
            [Filters.Spent]: () => sortBySpent(money),
        }

        return [...filteringFunctions[kindOfSearch]()]
    }
           
    return(
            <header className="flex flex-col w-full max-w-[900px] mb-10">
                <div className="mb-5">
                    <h1 className={`${loading ? 'flex justify-center items-center min-h-[100px]' : ''} text-5xl md:text-8xl text-black dark:text-white text-center`}>{loading ? <Spinner color="yellow" /> : `Available: $${moneyAvailable}`}</h1>
                </div>
                <section className="flex justify-center gap-2">
                <DropDownMenu>
                    <DropDownItem onClick={() => setMoney(filterExpenses({ kindOfSearch: Filters.Date }))}>Date</DropDownItem>
                    <DropDownItem onClick={() => setMoney(filterExpenses({ kindOfSearch: Filters.Spent }))}>Quantity</DropDownItem>
                </DropDownMenu>
                <SolidButton id="create-expense" onClick={() => setOpenModal(true)} size="md">Add Expense</SolidButton>
                </section>
                {createPortal(
                    <Modal show={openModal} onClose={setOpenModal}>
                        <ExpensesForm />
                    </Modal>,
                    window.document.body
                )}
            </header>
    )
}