import { BASE_URL, GET_ITEM_URL, GET_MESSAGE_URL, GET_USER_URL } from "./Path";

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

export async function GetAllItems(){
    const res = await fetch(BASE_URL + GET_ITEM_URL.AllItems)
    return await res.json()
}
export async function GetSellerItems(id){
    const res = await fetch(BASE_URL + GET_ITEM_URL.GetSellerItems + id)
    return await res.json()
}
<<<<<<< HEAD
=======
export async function GetBoughtItems(id){
    const res = await fetch(BASE_URL + GET_ITEM_URL.GetBoughtItems + id)
    return await res.json()
}
>>>>>>> develop
export async function GetItemDetails(id){
    const res = await fetch(BASE_URL + GET_ITEM_URL.AllItems + id)
    return await res.json()
}
<<<<<<< HEAD
=======
export async function ItemIsAvailable(id){
    const res = await fetch(BASE_URL + GET_ITEM_URL.AllItems + id)
    const data =  await res.json()
    return data.isAvailable
}
export async function ItemSeller(id, seller){
    const res = await fetch(BASE_URL + GET_ITEM_URL.AllItems + id)
    const data =  await res.json()
    return data.sellerId === seller
}
>>>>>>> develop
export async function GetAllItemsSorted(url, body){
    return PostAsync(url, body)
}
//#endregion

export async function GetAllMessages(id){
    const res = await fetch(BASE_URL + GET_MESSAGE_URL.AllMessages + id)
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
export async function PostAsyncFile(url, body){
    const options = {
        method: 'POST',
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
export async function DeleteAsync(url){
    const options = {
        method: 'DELETE',
    };

    const res = await fetch(url, options)
    return res
}

