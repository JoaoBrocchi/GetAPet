import Styles from "./Message.module.css"
import {useState,useEffect} from "react"
import bus from "../../utils/bus"
function Message(){
    const [visibility,setVisibility] = useState(false)
    const [message,setTmessage] = useState("")
    const [type,setType] = useState("")
    useEffect(()=>{
        bus.addListener("flash",({message,type})=>{
            setVisibility(true)
            setTmessage(message)
            setType(type)
            
            setTimeout(()=>{
                setVisibility(false)
            },4000)
        })
    }, [])
    return (
        visibility && (
            <div className={`${Styles.message}  ${Styles[type]}`}>{message}</div>
        )
    )
}

export default Message;