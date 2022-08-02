
export async function GetUserData(id){
    const res = await fetch(`http://localhost:3000/users/${id}`)
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