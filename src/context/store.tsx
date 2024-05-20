'use client'

import { createContext, useState, Dispatch, SetStateAction, useContext } from 'react'
import { Expense } from '@/types'

interface ContextProps {
  money: Expense[] | []
  moneyAvailable: number
  setMoneyAvailable: Dispatch<SetStateAction<number>>
  setMoney: Dispatch<SetStateAction<Expense[] | []>>
  openModal: boolean
  setOpenModal: Dispatch<SetStateAction<boolean>>
}

const MoneyContext = createContext<ContextProps>({
  money: [],
  moneyAvailable: 0,
  setMoneyAvailable: () => {},
  setMoney: () => {},
  openModal: false,
  setOpenModal: () => {}
})

const MoneyContextProvider = ({ children }: { children: React.ReactNode }) => {
  const [money, setMoney] = useState<Expense[] | []>([])
  const [openModal, setOpenModal] = useState(false)
  const [moneyAvailable, setMoneyAvailable] = useState(0)

  return (
    <MoneyContext.Provider value={{
      money,
      setMoney,
      openModal,
      setOpenModal,
      moneyAvailable,
      setMoneyAvailable
    }}
    >
      {children}
    </MoneyContext.Provider>
  )
}

const useMoneyContext = () => useContext(MoneyContext)

export {
  useMoneyContext,
  MoneyContextProvider
}
