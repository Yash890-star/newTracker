import { AiFillLinkedin } from "react-icons/ai";
import { AiFillGithub } from "react-icons/ai";
import s from "../styles/login.module.css"

const Socials = (props) => {
    let a = []
    if (props.data) {
        let b = <div className="">
            <div className="flex items-center justify-center">
                <AiFillGithub className="self-end mr-4 my-4" size={40}/>
                <h1 className="text-center mt-8 text-xl">{" " + props.data.github}</h1>
            </div>
            <div className="flex items-center justify-center">
                <AiFillLinkedin className="self-end mr-4 my-4" size={40}/>
                <h1 className="text-center mt-1 text-xl">{" " + props.data.linkedIn}</h1>
            </div>
        </div>
        a.push(b)
    }
    return (<div className={`rounded-2xl ${s.thBackground} mt-4 ml-3`}>
        <h1 className="text-center text-4xl mt-8">Social Links</h1>
        {a}
    </div>);
}

export default Socials;