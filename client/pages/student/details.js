import { use, useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link"

const Details = () => {
    const [dob, setDob] = useState()
    const [yos, setYos] = useState()
    const [dept, setDept] = useState()
    const [tenS, setTenS] = useState()
    const [tewS, setTewS] = useState()
    const [tenB, setTenB] = useState()
    const [tewB, setTewB] = useState()
    const [cutoff, setCuttoff] = useState()
    const [add, setAdd] = useState()
    const [leetCode, setLeetCode] = useState()
    const [linkedIn, setLinkedIn] = useState()
    const [github, setGithub] = useState()
    const router = useRouter()

    const detailHandler = async (event) => {
        event.preventDefault()
        const response = await fetch('http://localhost:5000/postDetails', {
            credentials: 'include',
            headers: { "Content-Type": "application/json" },
            method: "POST",
            body: JSON.stringify({
                user: "user2@user.com",
                dob: dob,
                year: yos,
                dept: dept,
                tenthSchool: tenS,
                tenthBoard: tenB,
                tweSchool: tewS,
                tweBoard: tewB,
                cutoff: cutoff,
                address: add,
                leetCode: leetCode,
                github: github,
                linkedIn: linkedIn
            })
        })
        const data = await response.json()
        console.log(data)
        router.push('/student/login')
    }
    console.log("adsfnasd")
    return (
        <>
            <h1 className="text-center text-5xl font-thin mt-48 mb-12">Please Complete Your Profile</h1>
            <div className="grid grid-cols-2 w-1/2 mx-auto place-content-center">
                <div className="grid grid-cols-2 text-right my-2">
                    <label className="mr-6 my-auto text-xl">Date Of Birth</label>
                    <input onChange={e => setDob(e.target.value)} placeholder="' DD/MM/YY '" className="border italic border-slate-700 rounded-md mr-4" />
                </div>
                <div className="grid grid-cols-2 text-right my-2">
                    <label className="mr-6 my-auto text-xl">Year of Study</label>
                    <input onChange={e => setYos(e.target.value)} placeholder="' 3RD '" className="border italic border-slate-700 rounded-md mr-4" />
                </div>
                <div className="grid grid-cols-2 text-right my-2">
                    <label className="mr-6 my-auto text-xl">Department</label>
                    <input onChange={e => setDept(e.target.value)} placeholder="' CSE '" className="border italic border-slate-700 rounded-md mr-4" />
                </div>
                <div className="grid grid-cols-2 text-right my-2">
                    <label className="mr-6 my-auto text-xl">10th School Name</label>
                    <input onChange={e => setTenS(e.target.value)} placeholder="' ABC School '" className="border italic border-slate-700 rounded-md mr-4" />
                </div>
                <div className="grid grid-cols-2 text-right my-2">
                    <label className="mr-6 my-auto text-xl">10th Board</label>
                    <input onChange={e => setTenB(e.target.value)} placeholder="' CBSE Board '" className="border italic border-slate-700 rounded-md mr-4" />
                </div>
                <div className="grid grid-cols-2 text-right my-2">
                    <label className="mr-6 my-auto text-xl">12th School Name</label>
                    <input onChange={e => setTewS(e.target.value)} placeholder="' ABC School '" className="border italic border-slate-700 rounded-md mr-4" />
                </div>
                <div className="grid grid-cols-2 text-right my-2">
                    <label className="mr-6 my-auto text-xl">12th Board</label>
                    <input onChange={e => setTewB(e.target.value)} placeholder="' CBSE Board '" className="border italic border-slate-700 rounded-md mr-4" />
                </div>
                <div className="grid grid-cols-2 text-right my-2">
                    <label className="mr-6 my-auto text-xl">12th Cutoff Mark</label>
                    <input onChange={e => setCuttoff(e.target.value)} placeholder="' 123 '" className="border italic border-slate-700 rounded-md mr-4" />
                </div>
                <div className="grid grid-cols-2 text-right my-2">
                    <label className="mr-6 my-auto text-xl">LeetCode Link</label>
                    <input onChange={e => setLeetCode(e.target.value)} placeholder="' www.lee..../Username '" className="border italic border-slate-700 rounded-md mr-4" />
                </div>
                <div className="grid grid-cols-2 text-right my-2">
                    <label className="mr-6 my-auto text-xl">Address</label>
                    <input onChange={e => setAdd(e.target.value)} placeholder="' 123St, Chennai '" className="border italic border-slate-700 rounded-md mr-4" />
                </div>
                <div className="grid grid-cols-2 text-right my-2">
                    <label className="mr-6 my-auto text-xl">GitHub Link</label>
                    <input onChange={e => setGithub(e.target.value)} placeholder="' www.git.../UserName '" className="border italic border-slate-700 rounded-md mr-4" />
                </div>
                <div className="grid grid-cols-2 text-right my-2">
                    <label className="mr-6 my-auto text-xl">LinkedIn Link</label>
                    <input onChange={e => setLinkedIn(e.target.value)} placeholder="' www.link.../abc '" className="border italic border-slate-700 rounded-md mr-4" />
                </div>
            </div>
            <div className="w-screen text-center">
                <button onClick={detailHandler} className="bg-teal-500 mx-auto h-12 px-10 my-8 text-xl rounded text-center">Submit</button>
            </div>
        </>);
}

export default Details;