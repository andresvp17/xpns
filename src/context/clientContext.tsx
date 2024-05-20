import { useState, createContext, useContext, useEffect } from 'react'

export const ClientContext = createContext<boolean>(false)

export const ClientContextProvider = ({ children }: { children: React.ReactNode }) => {
    const [isClient, setIsClient] = useState(false)
    useEffect(() => setIsClient(true), [])

    return(
        <ClientContext.Provider value={isClient}>
            {children}
        </ClientContext.Provider>
    )
}

export const useIsClient = () => useContext(ClientContext)