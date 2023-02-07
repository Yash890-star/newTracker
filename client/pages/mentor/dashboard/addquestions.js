import Navbar from "@/components/Navbar";
import moment from "moment";
import { useState } from "react";

const AddQuestions = () => {
    const [link, setLink] = useState('')
    const [level, setLevel] = useState('easy')
    const [submissionDate, setSubmissionDate] = useState('')
    const [topic, setTopic] = useState()
    const addQuestionHandler = async (event) => {
        event.preventDefault()
        const mentorEmailResponse = await fetch("http://localhost:5000/getMentor",
            { credentials: 'include' })
        const mentorEmail = await mentorEmailResponse.json()
        const response = await fetch("http://localhost:5000/addProblem", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            credentials: 'include',
            body: JSON.stringify({
                mentor: mentorEmail.mentor,
                link: link,
                level: level,
                createdDate: moment().format("DoMMMYYYY"),
                submissionDate: submissionDate,
                topic: topic,
            })
        })
        const result = await response.json()
        console.log(result)
    }
    return (<div className="">
        <Navbar />
        <h1 className="text-center font-light text-4xl my-10">Assign New Problem</h1>
        <div className="flex justify-center items-center">
            <input className="border border-slate-700 rounded-md mr-8 w-48" placeholder="Problem Link" type="text" onChange={e => setLink(e.target.value)} />
            <select name="level" className="w-24 border border-slate-700 h-11 rounded-md" onChange={e => setLevel(e.target.value)}>
                <option value="easy">easy</option>
                <option value="medium">medium</option>
                <option value="hard">hard</option>
            </select>
        </div>
        <div className="flex flex-col w-screen">
            <input placeholder="Topic" className="mx-auto border border-slate-700 rounded-md w-80 my-4" onChange={e => setTopic(e.target.value)}/>
            <input placeholder="DDMMMYYYY - SubmissionDate" className="mx-auto border border-slate-700 rounded-md w-80 mb-4" onChange={e => setSubmissionDate(e.target.value)}/>
            <button className="bg-teal-500 h-11 px-4 rounded text-center w-1/8 mx-auto" onClick={addQuestionHandler}>Submit</button>
        </div>
    </div>);
}

export default AddQuestions;