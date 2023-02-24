import UserNavbar from "@/components/userNavbar"
import UserCard from "@/components/userCard"
import Leetcode from "@/components/leetcode"
import TrackerStats from "@/components/trackerStats"
import Socials from "@/components/socials"
import s from "../../../styles/Home.module.css"
import UserDetailsCard from "@/components/userDetailsCard"
import { useEffect, useState } from "react"

const Dashboard = () => {
    const [userData, setUserData] = useState()
    const [leetCodeData, setLeetCodeData] = useState()
    const [userDetails, setUserDetails] = useState()
    const [trackerStats, setTrackerStats] = useState()
    useEffect(() => {
        fetch('http://localhost:5000/getUserData', {
            credentials: 'include'
        }).then(response => response.json()).then(
            data => setUserData(data)
        )
        fetch('http://localhost:5000/leetcode', {
            credentials: 'include'
        }).then(response => response.json()).then(
            data => setLeetCodeData(data)
        )
        fetch('http://localhost:5000/getDetails', {
            credentials: 'include'
        }).then(response => response.json()).then(
            data => setUserDetails(data)
        )
        fetch('http://localhost:5000/problemsStatus', {
            credentials: 'include'
        }).then(response => response.json()).then(
            data => setTrackerStats(data)
        )
    }, [])
    // console.log(trackerStats)
    return (<>
        <div>
            <UserNavbar />
            <div className={`${s.container} w-2/3 mt-10 mx-auto`}>
                <UserCard data={userData} />
                {leetCodeData ? <Leetcode data={leetCodeData} /> : <p className="text-center">Loading pls wait</p>}
                <TrackerStats data={trackerStats} />
            </div>
            <div className={`${s.gridHelper}`}>
                <UserDetailsCard data={userDetails} />
                <Socials data={userDetails}/>
            </div>
        </div>
    </>);
}

export default Dashboard;