import { useState } from "react"
import s from '../styles/Home.module.css'
import ss from "../styles/login.module.css"
import moment from "moment"

const AssignedProblems = (props) => {
    console.log(props.data, props.subData)
    let flag = 0
    let notSubmissions = []
    let renderData = []

    const submitHandler = async (event) => {
        event.preventDefault()
        let b = event.target.id
        let c = "button-" + b
        console.log(b,c)
        const d = document.getElementById(c)
        const e = document.getElementById(b)
        const response = await fetch("http://localhost:5000/postAnswers", {
            credentials: 'include',
            headers: { "Content-Type": "application/json" },
            method: "POST",
            body: JSON.stringify({
                problemLink: notSubmissions[b].link,
                solutionLink: d.value,
                submittedDate: moment().format("DoMMMYYYY"),
                createdDate: notSubmissions[b].createdDate,
                name: notSubmissions[b].name
            })
        })
        const result = await response.json()
        if (result.message == 0) {
            console.log("link exists")
        }
        else {

            e.style.display = "none"
        }
        console.log(result)

    }
    if (props.data && props.subData) {
        console.log(props.data, props.subData)
        for (let x of props.data) {
            for (let y = 0; y < props.subData.length; y++) {
                if (x.link == props.subData[y].problemLink) {
                    flag = 1
                }
            }
            if (flag == 0) {
                notSubmissions.push(x)
                console.log("asdfa", notSubmissions)
            }
            flag = 0
        }
    }
    let i = 0;
    for (let x of notSubmissions) {
        let b = <tr>
            <td className="px-4 py-4 border border-slate-500">{x.topic}</td>
            <td className="px-4 border border-slate-500"><a href={x.link}>{x.link}</a></td>
            <td className="px-4 border border-slate-500">{x.name}</td>
            <td className="px-4 border border-slate-500">{x.level}</td>
            <td className="px-4 border border-slate-500">{x.createdDate}</td>
            <td className="px-4 border border-slate-500">{x.submissionDate}</td>
            <td className="px-4 border border-slate-500 text-center">
                <div className="flex">
                    <input id={"button-" + i} type="text" className="border border-slate-700 rounded-md" placeholder="Submission Link" />
                    <button id={i} className="ml-4 px-2 bg-teal-500 w-1/4 mx-auto h-9 rounded" name={x.link} value={x.createdDate} onClick={submitHandler}>Submit</button>
                </div>
            </td>
        </tr>
        i += 1
        renderData.push(b)
    }
    return (<div className="">
        <h1 className="text-4xl font-light text-center my-8">Assigned Problems</h1>
        <table className="table-auto">
            <thead className="">
                <tr className="border  border-slate-500">
                    <th className={`px-4 text-black font-thin text-2xl py-4 bg-teal-500`}>Topic</th>
                    <th className={`px-4 text-black font-thin text-2xl py-4  bg-teal-500`}>Problem Link</th>
                    <th className={`px-4 text-black font-thin text-2xl py-4  bg-teal-500`}>Name</th>
                    <th className={`px-4 text-black  font-thin text-2xl py-4 bg-teal-500`}>Difficulty Level</th>
                    <th className={`px-4 text-black  font-thin text-2xl py-4 bg-teal-500 `}>Assigned Date</th>
                    <th className={`px-4 text-black  font-thin text-2xl py-4 bg-teal-500 `}>Submission Date</th>
                    <th className={`px-4 text-black  font-thin text-2xl py-4 bg-teal-500 `}>Status</th>
                </tr>
            </thead>
            <tbody className="">
                {renderData}
            </tbody>
        </table>

    </div>);
}

export default AssignedProblems;