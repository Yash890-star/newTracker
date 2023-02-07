import { useRouter } from 'next/router'
import Link from 'next/link'
import s from "../styles/Home.module.css"

const UserNavbar = () => {
    const router = useRouter()
    const logoutHandler = async () => {
        const result = await fetch('http://localhost:5000/logout', {
            method: "POST",
            credentials: 'include'
        })
        const message = await result.json()
        console.log(message)
        if(message.body == "success"){
            router.push('/student/login')
        }
    }
    return (<>
        <div className={`${s.text} w-screen text-2xl bg-teal-500 text-white`}>
            <div className='flex w-1/3 mx-auto py-8 text-black justify-around bg-teal-500'>
                <Link href="/student/dashboard/problems">PROBLEMS</Link>
                <Link href="/student/dashboard/dashboard">PROFILE</Link>
                <button><a href='https://leetcode.com/Yash890/'>LEETCODE</a></button>
                <button className='justify-self-end' onClick={logoutHandler}>LOGOUT</button>
            </div>
        </div>
    </>);
}

export default UserNavbar;