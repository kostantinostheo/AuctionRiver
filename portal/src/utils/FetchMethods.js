import { getToken, decodeToken } from "./Common";
import { userType } from "./Const";


export async function GetUserData(id){
    const res = await fetch(`http://localhost:3000/users/${id}`)
    return await res.json()
  }
  
export async function HandleLogin(url, body){
    const options = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify( body )
    };

    const res = await fetch(url, options)

    if(res.status === 400){
        alert('Your email or password is invalid')
    }

    const data = await res.json()

    if(data.token){
        localStorage.setItem('token', data.token)
        alert('Login Succesful')
        
        let decoded = decodeToken(getToken())
        
        if(decoded.userType === userType.User)
            window.location.href = '/'
        else
            window.location.href = '/register'
        
        //delete this when dashboards for user are ready
        localStorage.removeItem('token')
    }
    else{
        alert('User Login Failed')
    }

}