const SubmissionsCard = (props) => {
    const a = []
    if (props.data) {
        for (let x of props.data) {
            console.log(x)
            let b = <tr>
            <td className="px-4 py-4 border-slate-500 border">{x.createdDate}</td>
            <td className="px-4 border border-slate-500 text-blue-400"><a href={x.problemLink}>{x.problemLink}</a></td>
            <td className="px-4 border border-slate-500 text-blue-400"><a href={x.submissionLink}>{x.submissionLink}</a></td>
            <td className="px-4 border border-slate-500">{x.user}</td>
        </tr>
            a.push(b)
        }
    }
    return (<>
        <table className="table-auto mx-auto mt-10">
            <thead className="">
                <tr className="border border-slate-500">
                    <th className="px-4 text-black font-thin text-2xl py-4 bg-teal-500">Created Date</th>
                    <th className="px-4 text-black font-thin text-2xl py-4 bg-teal-500">Problem Link</th>
                    <th className="px-4 text-black font-thin text-2xl py-4 bg-teal-500">Submission Link</th>
                    <th className="px-4 text-black font-thin text-2xl py-4 bg-teal-500">User</th>
                </tr>
            </thead>
            <tbody>
                {a}
            </tbody>
        </table>
    </>);
}

export default SubmissionsCard;