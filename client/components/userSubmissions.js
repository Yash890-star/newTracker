import s from '../styles/login.module.css'

const UserSubmissions = (props) => {
    console.log("asdfasdf",props)
    let a = []
    let tdata = []
    if (props.data) {
        tdata = <tr className='border bg-teal-500 border-slate-500'>
            <th className={`px-4 text-black font-thin text-2xl py-4`}>ProblemLink</th>
            <th className={`px-4 text-black font-thin text-2xl py-4`}>SubmissionLink</th>
            <th className={`px-4 text-black font-thin text-2xl py-4`}>CreatedDate</th>
            <th className={`px-4 text-black font-thin text-2xl py-4`}>SubmittedDate</th>
        </tr>
        for (let x of props.data) {
            console.log(x)
            let b = <tr>
            <td className="px-4 border text-blue-400 border-slate-500"><a href={x.problemLink}>{x.problemLink}</a></td>
            <td className="px-4 border text-blue-400 border-slate-500">{x.submissionLink}</td>
            <td className="px-4 py-4 border border-slate-500">{x.createdDate}</td>
            <td className="px-4 border border-slate-500">{x.submittedDate}</td>
        </tr>
                a.push(b)
        }
    }
    return (<>
        <h1 className="text-center text-4xl font-thin mt-8">{props.data ? props.data[0].user + "Submissions" : ''} </h1>
        <table className="table-auto mx-auto my-8">
            <thead>
                {tdata}
            </thead>
        {a}
        </table>
        <div className="mb-10">

        </div>
    </>);
}

export default UserSubmissions;