import UserNavbar from "@/components/userNavbar";
import AllSubmissions from "@/components/allSubmissions";
import { useEffect, useState } from "react";
import AssignedProblems from "@/components/assignedProblems";

const Problems = () => {
    const [problems, setProblems] = useState()
    const [submissions, setSubmissions] = useState()
    useEffect(() => {
        fetch('http://localhost:5000/getProblems', {
            credentials: 'include'
        }).then(response => response.json()).then((data) => {
            setProblems(data)
            console.log(data)
        }
        )
        fetch('http://localhost:5000/getSubmissions', {
            credentials: 'include'
        }).then(response => response.json()).then(
            data => setSubmissions(data)
            )
    }, [])

    return (<>
        <UserNavbar />
        <div className="flex flex-col w-full justify-center mx-auto">
            <div className="mx-auto">
                <AssignedProblems data={problems} subData={submissions} />
            </div>
            <div className="mx-auto">
                <AllSubmissions data={submissions} />
            </div>
        </div>
    </>);
}

export default Problems;