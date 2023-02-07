import s from "../styles/login.module.css"

const UserCard = (props) => {
    let a = []
    if(props.data){
        // console.log(props)
        let b = <div className={`rounded-2xl py-10 flex flex-col  ${s.thBackground}  basis-1/3 ml-3 flex-none`}>
            <h1 className='text-center text-4xl'>PROFILE</h1><br />
            <h1 className="text-center text-xl mt-2">Name: {" "+props.data.name}</h1>
            <h1 className='text-center text-xl mt-2'>Register No:{" "+props.data.regNo}</h1>
            <h1 className='text-center text-xl mt-2'>Email: {" "+props.data.email}</h1>
            <h1 className='text-center text-xl mt-2'>Mentor: {" "+props.data.mentor}</h1><br />
            <button className='mx-auto bg-teal-600 px-4 py-2 rounded-lg mt-4'>Logout</button>
        </div>
        a.push(b)
    }
    return (<>
        {a}
    </>);
}

export default UserCard;