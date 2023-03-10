import { useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import s from "../../styles/login.module.css"

const Login = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [loggedIn, setLoggedIn] = useState(false)
    const router = useRouter()

    const loginHandler = async (event) => {
        event.preventDefault()
        const response = await fetch("http://localhost:5000/login", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            credentials: 'include',
            body: JSON.stringify({
                email: email,
                password: password,
                loggedIn: loggedIn
            })
        })
        const result = await response.json()
        if(result.message == 'yes'){
            router.push('/student/dashboard/problems')
        }
        else{
            let elem = document.getElementById('incorrect')
            console.log(elem)
            elem.innerHTML = "Incorrect credentials pls try again"
        }
    }

    const loggedInHandler = () => {
        setLoggedIn((state) => {
            if(state){
                setLoggedIn(false)
            }
            else{
                setLoggedIn(true)
            }
        })
    }

    return (<>
        <div className={`${s.container} h-screen flex flex-col w-1/5 mx-auto justify-center`}>
            <div>
                <h1 className="text-center text-7xl font-light mb-8">Login</h1>
                <p className="text-center text-2xl mb-8 font-light">Please Enter your login details</p>
            </div>
            <div className="justify-center flex flex-col">
                <input type="email" className="border h-12 text-xl rounded-md mb-4 border-slate-400" placeholder="Email" onChange={e => setEmail(e.target.value)} />
                <input type="password" className="border h-12 text-xl rounded-md mb-4 border-slate-400" placeholder="Password" onChange={e => setPassword(e.target.value)} />
                <div className="flex justify-center items-center mb-5">
                    <p className="font-thin mr-3 text-xl">Click to Stay Logged In</p>
                    <input type="checkbox" onClick={loggedInHandler}/>
                </div>
                <button className="bg-teal-500 px-6 mx-auto h-10 text-black rounded mt-2 mb-4 text-xl" onClick={loginHandler}>Login</button>
            </div>
            <div className="text-center text-red-600" id="incorrect"></div>
            <div className="flex justify-center mt-5">
                <p className="mr-1 font-thin text-xl">Dont Have An Account?</p><Link href="/student/signup" className="text-teal-500 text-xl">Click Here</Link>
            </div>
        </div>
    </>);
}

export default Login;