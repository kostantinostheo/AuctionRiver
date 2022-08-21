import { BASE_URL, GET_ITEM_URL, GET_USER_URL } from "./Path";

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


//#region Items

export async function GetAllItems(filter){
    const res = await fetch(BASE_URL + GET_ITEM_URL.AllItems+filter)
    return await res.json()
}
export async function GetItemDetails(id){
    const res = await fetch(BASE_URL + GET_ITEM_URL.AllItems + id)
    return await res.json()
}
export async function GetAllItemsSorted(url, body){
    return PostAsync(url, body)
}
//#endregion


export async function PostAsync(url, body){
    console.log(url)
    const options = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify( body )
    };

    const res = await fetch(url, options)
    return res.json()
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

