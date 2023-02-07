import Navbar from "@/components/Navbar";
import SubmissionsCard from "@/components/submissionsCard";
import UserSubmissions from "@/components/userSubmissions";
import moment from "moment/moment";
import { useEffect, useState } from "react";

const Submissions = () => {
    const [email, setEmail] = useState()
    const [mentor, setMentor] = useState()
    const [userSubmissions ,setUserSubmissions] = useState()
    const [todaySubmission, setTodaySubmission] = useState()
    useEffect(() => {
        fetch("http://localhost:5000/getMentor", {
            credentials: 'include'
        }).then(response => response.json()).then(
            data => {
                setMentor(data.mentor)
                console.log(data)
            }
        )

    }, [])
    useEffect(() => {
        const date = moment().format("DoMMMYYYY")
        fetch("http://localhost:5000/getTodaySubmission", {
            credentials: 'include',
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                date: date,
                mentor: mentor
            })
        }).then(response => response.json()).then(
            data => setTodaySubmission(data)
        )
    }, [mentor])

    const dataHandler = async (event) => {
        event.preventDefault()
        const studentData = await fetch('http://localhost:5000/getStudentSubmission', {
            credentials: 'include',
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                email: email
            })
        })
        const data = await studentData.json()
        setUserSubmissions(data)
    }
    let date = moment().format("DoMMMYYYY")
    return (<>
        <div>
            <Navbar />
            <div className="w-screen text-center mt-10">
                <input className="border border-slate-900 rounded-md mr-4" placeholder="User Email" type='text' onChange={e => setEmail(e.target.value)} />
                <button className="bg-teal-500 mx-auto h-11 px-4 rounded" onClick={dataHandler}>Submit</button>
            </div>
            <UserSubmissions data={userSubmissions}/>
            <div className="text-center mt-8 text-4xl font-light">
                {date}
            </div>
            <SubmissionsCard data={todaySubmission} />
        </div>
        <div className="mb-20">

        </div>
    </>);
}

export default Submissions;