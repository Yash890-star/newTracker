import { useEffect, useState } from "react"

const DateWiseSubmissions = () => {

    const [data, setData] = useState()
    const [selected, setSelected] = useState("8thFeb2023")
    let select = []
    let table = []

    useEffect(() => {
        fetch('http://localhost:5000/getDateWiseSubmissions', {
            credentials: 'include'
        }).then(res => res.json()).then(
            jsondata => setData(jsondata)
        ).catch()
    }, [])


    if (data) {
        let d = []
        let c;
        for (let x in data) {
            c = <option value={x}>{x}</option>
            d.push(c)
        }
        let b = <select name="dates" id="dates" onChange={e => setSelected(e.target.value)}>
            <option>select</option>
            {d}
        </select>;
        select.push(b)
    }
    return (<>
        <h1 className="text-4xl text-center my-10">Previous Assignments</h1>
        <div className="text-center my-10">
            {select}
        </div>
        <table className="table-auto text-center mx-auto my-10">
            <thead className="">
                <tr className="border  border-slate-500">
                    <th className={`px-4 text-black font-thin text-2xl py-4 bg-teal-500`}>user</th>
                    <th className={`px-4 text-black font-thin text-2xl py-4  bg-teal-500`}>Problem Link</th>
                    <th className={`px-4 text-black  font-thin text-2xl py-4 bg-teal-500`}>Submission Link</th>
                    <th className={`px-4 text-black  font-thin text-2xl py-4 bg-teal-500 `}>Created Date</th>
                </tr>
            </thead>
            <tbody>
                {data && selected != "8thFeb2023" ? data[selected].map((val, i) => {
                    return (
                        <tr>
                            <td className="px-4 py-4 border border-slate-500">{val.user}</td>
                            <td className="px-4 border border-slate-500 text-blue-500"><a href={val.problemLink}>{val.problemLink}</a></td>
                            <td className="px-4  border border-slate-500 text-blue-500"><a href={val.submissionLink}>{val.submissionLink}</a></td>
                            <td className="px-4  border border-slate-500">{val.createdDate}</td>
                        </tr>
                    )
                }) : <tr>
                    <td>loading</td>
                    <td>loading</td>
                    <td>loading</td>
                    <td>loading</td>
                </tr>}
            </tbody>
        </table>
    </>);
}

export default DateWiseSubmissions;