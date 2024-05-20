'use client'

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { SolidButton } from "../buttons/buttons";
import { z } from "zod";
import Link from "next/link"
import { useRouter } from "next/navigation";
import { Spinner } from "../spinner";

const formSchema = z.object({
    username: z
      .string()
      .min(4, "Username must at least 4 characters long")
      .max(60, "Username must be 60 characters long or less"),
    email: z
      .string()
      .min(1, "Email is required")
      .email("Invalid Email"),
    password: z
      .string()
      .min(1, 'Password is required')
      .min(8, 'Password must have than 8 characters'),
  confirmPassword: z
      .string()
      .min(1, 'Password confirmation is required'),
  })

export const SignUpForm = () => {
    const router = useRouter()
    const { handleSubmit, register, formState: { isSubmitting } } = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            username: '',
            email: '',
            password: '',
            confirmPassword: '',
        }
    })

    const onSubmit = async ({ email, password, username }: z.infer<typeof formSchema>) => {
        const response = fetch("/api/auth/user", {
            method: 'POST',
            headers: {
                "Content-Type": "application/json" 
            },
            body: JSON.stringify({
                username,
                password,
                email
            })
        })

        if ((await response).ok) {
            router.push('/login')
        }
      };

      
    return (
        <form 
            className="flex flex-col justify-center gap-5 rounded-xl min-w-[330px] min-h-[390px] max-w-[400px] bg-slate-950 p-5 text-white"
            onSubmit={handleSubmit(onSubmit)}
        >
            <input
                className="bg-slate-900 py-1.5 px-2.5 rounded-lg focus:outline-2 focus:outline-primary/50 outline-none"
                placeholder="Insert your username..."
                autoComplete="off"
                {...register("username", {
                    required: true
                })}
            />
            <input
                className="bg-slate-900 py-1.5 px-2.5 rounded-lg focus:outline-2 focus:outline-primary/50 outline-none"
                placeholder="example@email.com"
                autoComplete="off"
                {...register("email", {
                    required: true,
                })}
            />
            <input
                className="bg-slate-900 py-1.5 px-2.5 rounded-lg focus:outline-2 focus:outline-primary/50 outline-none"
                placeholder="Insert your password..."
                type="password"
                {...register("password", {
                    required: true
                })}
            />
            <input
                className="bg-slate-900 py-1.5 px-2.5 rounded-lg focus:outline-2 focus:outline-primary/50 outline-none"
                placeholder="Confirm your password..."
                type="password"
                {...register("confirmPassword", {
                    required: true
                })}
            />
            <SolidButton 
                    className={`${isSubmitting && 'bg-primary/65'} flex justify-center items-center`} 
                    type='submit' 
                    size='md'>
                        {
                        !isSubmitting 
                          ? 'Sign Up' 
                          : <Spinner size="md" />
                        }
                </SolidButton>
            <p className='text-center text-sm text-white mt-2'>If you don&apos;t have an account, please&nbsp;
                <Link className='text-primary md:hover:underline' href='/login'>
                    Sign in
                </Link>
            </p>
        </form>    
    )
}