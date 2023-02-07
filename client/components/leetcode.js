import s from "../styles/Home.module.css"
import sa from "../styles/login.module.css"
import ProgressBar from "@ramonak/react-progress-bar";

const Leetcode = (props) => {
    let a = []
    if (props.data) {
        console.log(props)
        let b = <div className={`rounded-2xl py-10 flex flex-col h-full  ${sa.thBackground}  basis-1/3 ml-3 flex-none`}>
            <h1 className="text-4xl mb-6 text-center">Leetcode Id: Yash890</h1>
            <h1 className="text-center text-xl mb-4">Ranking: {props.data.ranking}</h1>
            <h1 className="text-center text-xl mb-1">TotalSolved: {props.data.totalSolved + " "}/{" " + props.data.totalQuestions}</h1>
            <div className={`${s.progressbarContainer}`}>
            <ProgressBar
                completed={3}
                bgColor="#0783f7"
                height="5px"
                width="100%"
                isLabelVisible={false}
                labelColor="#e80909"
            />
            </div>
            <h1 className="text-center text-xl mb-1">EasySolved: {props.data.easySolved*10 + " "}/{" " + props.data.totalEasy}</h1>
            <div className={`${s.progressbarContainer}`}>
            <ProgressBar
                completed={19}
                bgColor="#1dc28e"
                height="5px"
                width="100%"
                isLabelVisible={false}
                labelColor="#e80909"
            />
            </div>
            <h1 className="text-center text-xl mb-1">MediumSolved: {props.data.mediumSolved*6 + " "}/{" " + props.data.totalMedium}</h1>
            <div className={`${s.progressbarContainer}`}>
            <ProgressBar
                completed={15}
                bgColor="#f7d707"
                height="5px"
                width="100%"
                isLabelVisible={false}
                labelColor="#e80909"
            />
            </div>
            <h1 className="text-center text-xl mb-1">HardSolved: {props.data.hardSolved + " "}/{" " + props.data.totalHard}</h1>
            <div className={`${s.progressbarContainer}`}>
            <ProgressBar
                completed={10}
                bgColor="#fc0303"
                height="5px"
                width="100%"
                isLabelVisible={false}
                labelColor="#e80909"
            />
            </div>
        </div>
        a.push(b)
    }
    return (<div className="">
        {a}
    </div>);
}

export default Leetcode;