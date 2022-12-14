import {useParams} from 'react-router-dom';
import {useState, useEffect} from 'react';
import axiosConfig from './axiosConfig';
import {useNavigate} from 'react-router-dom';
import TopMenu from "../Menu/TopMenu";
const EditCourse =()=>{
    const {tutor_id} = useParams();
    const [course,setCourse] = useState({});
    const [subject,setSubject] = useState({});
    const[medium,setMedium]=useState("");
    const[division,setDivision]=useState("");
    const[msg,setMsg]=useState("");
    const Submit=(event)=>{
        event.preventDefault();
        var data={ subject:subject, medium:medium, division:division};
        axiosConfig.post(`/editCourse/${tutor_id}`,data)
        .then((rsp)=>
        {        
            setCourse(rsp.data);
            setMsg(rsp.data.msg);
        },(err)=>{
        }) 
    }
    const navigate= useNavigate();
    useEffect(()=>
    {
        console.log(localStorage.getItem("_authToken"))
        if(!localStorage.getItem("_authToken")){
            navigate("/adminlogin");
        }
        axiosConfig.get(`/course/${tutor_id}`)
        .then((rsp)=>{          
            setSubject(rsp.data.subject);
            setMedium(rsp.data.medium);
            setDivision(rsp.data.division);
        },(err)=>{
            debugger;
        }) 
    },[]);
    return(
        <div align='center'>
         <TopMenu/> 
            <h1>Edit Course</h1>
        <form onSubmit={Submit}>
            <span>{msg}</span><br/>
            Subject : <input type="text" onChange={(e)=>setSubject(e.target.value)} value={subject}/><br/><br/>
            Medium: <input type="text" onChange={(e)=>setMedium(e.target.value)} value={medium}/><br/><br/>
            Division : <input type="text" onChange={(e)=>setDivision(e.target.value)} value={division}/><br/><br/>
            <input type="submit" value="Submit"/>
        </form>
        </div>
    )
}

export default EditCourse;