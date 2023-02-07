import s from "../styles/Home.module.css"
import ss from "../styles/login.module.css"

const UserDetailsCard = (props) => {
    let a = []
    if (props.data) {
        let b = <>
            <div className="px-4 pb-4">
        <div className="grid grid-cols-2 mt-4">
                <h1 className="mt-2 text-center text-xl">Date Of Birth:</h1>
                <input className="border border-slate-400 rounded-md text-xl mb-4" placeholder={props.data.dob} disabled/>
                <h1 className="mt-2 text-center text-xl">Year:</h1>
                <input className="border border-slate-400 rounded-md text-xl mb-4" placeholder={props.data.year} disabled/>
                <h1 className="mt-2 text-center text-xl">Department:</h1>
                <input className="border border-slate-400 rounded-md text-xl mb-4" placeholder={props.data.dept} disabled/>
                <h1 className="mt-2 text-center text-xl">10th School:</h1>
                <input className="border border-slate-400 rounded-md text-xl mb-4" placeholder={props.data.tenthSchool} disabled/>
                <h1 className="mt-2 text-center text-xl">10th Board:</h1>
                <input className="border border-slate-400 rounded-md text-xl mb-4" placeholder={props.data.tenthBoard} disabled/>
                <h1 className="mt-2 text-center text-xl">12th School:</h1>
                <input className="border border-slate-400 rounded-md text-xl mb-4" placeholder={props.data.tweSchool} disabled/>
                <h1 className="mt-2 text-center text-xl">12th Board:</h1>
                <input className="border border-slate-400 rounded-md text-xl mb-4" placeholder={props.data.tweBoard} disabled/>
                <h1 className="mt-2 text-center text-xl">CutOff:</h1>
                <input className="border border-slate-400 rounded-md text-xl mb-4" placeholder={props.data.cutoff} disabled/>
                <h1 className="mt-2 text-center text-xl">Address:</h1>
                <input className="border border-slate-400 rounded-md text-xl mb-4" placeholder={props.data.address} disabled/>
            </div>
        </div>
        </>
        a.push(b)

    }
    return (<div className={` ${ss.thBackground} mt-4 rounded-xl`}>
        <h1 className="text-center text-4xl my-8">Student Details</h1>
        {a}
    </div>);
}

export default UserDetailsCard;