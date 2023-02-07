import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/router"

const SignUp = () => {
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const router = useRouter()

    const signupHandler = async (event) => {
        event.preventDefault()
        const response = await fetch("http://localhost:5000/mentorRegister", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            credentials: 'include',
            body: JSON.stringify({
                name: name,
                email: email,
                password: password
            })
        })
        const result = await response.json()
        if(result.message == 'yes'){
            router.push('/mentor/login')
        }
    }

    return (<>
        <div className="h-screen flex flex-col w-1/5 mx-auto justify-center">
            <div>
                <h1 className="text-center text-7xl font-light mb-6">Sign Up</h1>
                <p className="text-center text-xl font-light mb-8">Please Enter your details</p>
            </div>
            <input className="border h-12 rounded-md text-xl mb-4 border-slate-400" type='text' placeholder="name" onChange={e => setName(e.target.value)} />
            <input className="border h-12 rounded-md text-xl mb-4 border-slate-400" type='text' placeholder="email" onChange={e => setEmail(e.target.value)} />
            <input className="border h-12 rounded-md text-xl mb-4 border-slate-400" type='password' placeholder="password" onChange={e => setPassword(e.target.value)} />
            <button className="bg-teal-500 px-6 mt-4 text-xl mx-auto h-10 rounded" onClick={signupHandler}>SignUp</button>
            <div className="flex justify-center mt-5">
                <p className="mr-1 text-xl font-thin">Already Have An Account?</p><Link href="/mentor/login" className="text-teal-500 text-xl">Click Here</Link>
            </div>
        </div>
    </>);
}

export default SignUp;