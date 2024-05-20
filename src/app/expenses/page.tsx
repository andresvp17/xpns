'use client'

import { ExpensesTable } from "@/components/expensesTable/table"
import { ExpensesHeader } from '@/components/expensesHeader/header'
import { useSession } from "next-auth/react"
import { useRouter } from "next/navigation"
import { useState } from "react"
import Head from "next/head"

export default function Page () {
    const [loading, setLoading] = useState(true)
    const router = useRouter()
    const { data: session } = useSession({
        required: true,
        onUnauthenticated() {
            router.push('/login')
        }
    })


    if (!session) return null

    return(
        <>
        <Head>
            <title>XPNS | Dashboard</title>
            <meta property="description" content="Check out and create your own expenses here!" />
        </Head>
        <section className="flex flex-col items-center justify-center">
            <ExpensesHeader loading={loading} />
            <ExpensesTable loading={loading} onLoading={setLoading} />
        </section>
        </>
    )
}