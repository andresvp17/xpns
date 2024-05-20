'use client'

import { SignUpForm } from "@/components/login/sign-up-form";
import Head from "next/head";

export default function Page () {
    return (
        <>
        <Head>
            <title>XPNS | Sign Up</title>
            <meta property="description" content="If you do not have an account yet, you can register here!" />
            <meta property="og:title" content="XPNS | Sign Up"/>
            <meta property="og:description" content="If you do not have an account yet, you can register here!" />
        </Head>
        <div className="flex justify-center items-center h-[80vh]">
            <SignUpForm />
        </div>
        </>
    )
}