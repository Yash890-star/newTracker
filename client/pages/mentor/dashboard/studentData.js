import Navbar from "@/components/Navbar";
import UserSubmissions from "@/components/userSubmissions";
import UserCard from "@/components/userCard";
import Leetcode from "@/components/leetcode";
import TrackerStats from "@/components/trackerStats";
import UserDetailsCard from "@/components/userDetailsCard";
import s from "../../../styles/Home.module.css"
import Socials from "@/components/socials";
import { useState, useEffect } from "react";

const StudentData = () => {
    const [regNo, setRegNo] = useState()
    const [userSubmissions, setUserSubmissions] = useState()
    const [userData, setUserData] = useState()
    const [leetCodeData, setLeetCodeData] = useState()
    const [userDetails, setUserDetails] = useState()
    const [trackerStats, setTrackerStats] = useState()
    const dataHandler = async (event) => {
        event.preventDefault()
        const studentData = await fetch('http://localhost:5000/getStudent', {
            credentials: 'include',
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                regNo: regNo
            })
        })
        fetch('http://localhost:5000/leetcode', {
            credentials: 'include'
        }).then(response => response.json()).then(
            data => setLeetCodeData(data)
        )
        const data = await studentData.json()
        setUserSubmissions(data)
    }
    console.log(userSubmissions)
    return ( <>
        <Navbar />
        <div className="w-screen text-center mt-10">
                <input className="border border-slate-900 rounded-md mr-4" placeholder="User Email" type='text' onChange={e => setRegNo(e.target.value)} />
                <button className="bg-teal-500 mx-auto h-11 px-4 rounded" onClick={dataHandler}>Submit</button>
        </div>
        <div className="w-screen text-center mt-10">
        <div className={`${s.container} w-2/3 mt-10 mx-auto`}>
                {userSubmissions !== undefined ? <UserCard data={userSubmissions.student} /> : ""}
                {userSubmissions !== undefined ?<Leetcode data={leetCodeData} /> : ""}
                {userSubmissions !== undefined ?<TrackerStats data={userSubmissions.problems} /> : ""}
            </div>
            <div className={`${s.gridHelper}`}>
            {userSubmissions !== undefined ?<UserDetailsCard data={userSubmissions.details} /> : ""}
            {userSubmissions !== undefined ?<Socials data={userSubmissions.details}/> : ""}
            </div>
        </div>
        {userSubmissions !== undefined ?<UserSubmissions data={userSubmissions.submissionData}/> : ""}
    </> );
}
 
export default StudentData;