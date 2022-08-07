import { BASE_URL, GET_USER_URL } from "./Path";

export async function GetUserData(id){
    const res = await fetch(BASE_URL + GET_USER_URL.UserDetails + id)
    return await res.json()
  }

export async function GetAllUsers(){
    const res = await fetch(BASE_URL + GET_USER_URL.UserDetails)
    return await res.json()
}
export async function GetUserPending(){
    const res = await fetch(BASE_URL + GET_USER_URL.UserPending)
    return await res.json()
}

export async function PostAsync(url, body){
    const options = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify( body )
    };

    const res = await fetch(url, options)
    return res
}

export async function PatchAsync(url, body){
    const options = {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify( body )
    };

    const res = await fetch(url, options)
    return res
}

