import s from "../styles/Home.module.css"
import ss from "../styles/login.module.css"
import 'react-circular-progressbar/dist/styles.css';
import { buildStyles, CircularProgressbar } from 'react-circular-progressbar';

const TrackerStats = (props) => {
    let a = []
    if (props.data) {
        let b = <div className={`rounded-2xl py-10 flex flex-col  ${ss.thBackground}  basis-1/3 ml-3 flex-none`}>
            <h1 className="text-center mb-6 text-4xl">Tracker Stats</h1>
            <h1 className="text-center mb-2 text-xl">Total Problems Assigned: {" " + props.data.assigned}</h1>
            <h1 className="text-center mb-2 text-xl">Total Problems Solved: {" " + props.data.solved}</h1>
            <h1 className="text-center mb-2 text-xl">Total Problems Remaining: {" " + props.data.assigned-props.data.solved}</h1>
            <div className={`${s.circularProgressbar}`}>
            <div style={{ width: 200, height: 200 }} className="mx-auto mt-4">
                <CircularProgressbar value={Math.round(props.data.solved / props.data.assigned * 100)} text={`${Math.round(props.data.solved / props.data.assigned * 100)}%`}
                    styles={buildStyles({
                        pathColor: `#2563eb`,
                        textColor: '#2563eb',
                        trailColor: '#d6d6d6',
                        backgroundColor: '#3e98c7'
                    })}
                />
            </div>
                    </div>
        </div>
        a.push(b)
    }
    return (<>
        {a}
    </>);
}

export default TrackerStats;