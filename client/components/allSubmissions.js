const AllSubmissions = (props) => {

    let renderData = []
    if (props.data) {
        for (let x of props.data) {
            let a = <tr>
            <td className="px-4 py-4 border border-slate-500">{x.submittedDate}</td>
            <td className="px-4 border text-blue-400 border-slate-500"><a href={x.problemLink}>{x.problemLink}</a></td>
            <td className="px-4 border text-blue-400 border-slate-500">{x.submissionLink}</td>
            <td className="px-4 border border-slate-500">{x.createdDate}</td>
        </tr>
            renderData.push(a)
        }
    }
    return (<div>
        <h1 className="text-4xl font-light text-center my-8">All Submissions</h1>
        <table className="table-auto mx-auto border border-slate-500">
            <thead className="">
                <tr>
                    <th className="px-4 text-black font-thin text-2xl py-4 bg-teal-500">Submitted Date</th>
                    <th className="px-4 text-black font-thin text-2xl py-4 bg-teal-500">Problem Link</th>
                    <th className="px-4 text-black font-thin text-2xl py-4 bg-teal-500">Submission Link</th>
                    <th className="px-4 text-black font-thin text-2xl py-4 bg-teal-500">CreatedDate</th>
                </tr>
            </thead>
            <tbody>
            {renderData}
            </tbody>
        </table>
    </div>);
}

export default AllSubmissions;