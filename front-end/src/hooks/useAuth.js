import api from "../utils/api"
import useFlashMessage from "./useFlashMessage"
import {useState,useEffect} from "react"
import { useNavigate} from "react-router-dom"



export default function useAuth(){
    const { setFlashMessage} = useFlashMessage()
    const [authenticathed,setAuthenticathed] = useState(false)
    const navigate = useNavigate()
    useEffect(()=>{
        const token = localStorage.getItem("token")
        if(token){
            api.defaults.headers.authorization =  `Bearer ${JSON.parse(token)}`
            setAuthenticathed(true)
        }
    })

    async function register(user){
        let msgText = "cadastro realizado com sucesso"
        let msgType = "success"
        try {
            const data = await api.post("/user/register",user).then((response)=>{
                return response.data
            })
            await authUser(data)
        } catch (error) {
            console.log(error)
            msgText = error.response.data.message
            msgType = "error"
        }
        setFlashMessage(msgText,msgType)
    }
    async function authUser(data){
        setAuthenticathed(true)
        localStorage.setItem("token",JSON.stringify(data.token))
        navigate("/")
    }
    function logout(){
        const msgText = "Logout realizado com sucesso"
        const msgType = "success"
        setAuthenticathed(false)
        localStorage.removeItem("token")
        api.defaults.headers.Authorization = undefined
        navigate("/")
        setFlashMessage(msgText,msgType)
    }
    async function login(user){
        let msgText = "logado com sucesso"
        let msgType = "success"
        try {
            const data = await api.post("/user/login",user).then((response)=>{
                return response.data
            })
            await authUser(data)
        } catch (error) {
            console.log(error)
            msgText = error.response.data.message
            msgType = "error"
        }
        setFlashMessage(msgText,msgType)
    }

    return {register,authenticathed,logout,login}
}