import Navbar from "@/components/Navbar";
import SubmissionsCard from "@/components/submissionsCard";
import moment from "moment/moment";
import { useEffect, useState } from "react";
import DateWiseSubmissions from "@/components/dateWiseSubmissions";

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
            <div className="text-center mt-8 text-4xl font-light">
                {date} Submissions
            </div>
            <SubmissionsCard data={todaySubmission} />
        </div>
        <div className="mb-20">

        </div>
        <DateWiseSubmissions/>
    </>);
}

export default Submissions;