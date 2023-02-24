import { useRouter } from 'next/router'
import Link from 'next/link'
import s from "../styles/Home.module.css"

const Navbar = () => {
    const router = useRouter()
    const logoutHandler = async () => {
        const result = await fetch('http://localhost:5000/logout', {
            method: "POST",
            credentials: 'include'
        })
        const message = await result.json()
        console.log(message)
        if(message.body == "success"){
            router.push('/mentor/login')
        }
    }

    return (<div className={`${s.text} w-screen text-2xl bg-teal-500 text-white`}>
        <div className='flex w-2/3 mx-auto py-8 text-black justify-around bg-teal-500'>
            <Link href="/mentor/dashboard/graph">Graph</Link>
            <Link href="/mentor/dashboard/submissions">Submissions</Link>
            <Link href="/mentor/dashboard/studentData">UserProfile</Link>
            <Link href="/mentor/dashboard/addquestions">Add Questions</Link>
            <button className='justify-self-end' onClick={logoutHandler}>Logout</button>
        </div>
    </div>);
}

export default Navbar;