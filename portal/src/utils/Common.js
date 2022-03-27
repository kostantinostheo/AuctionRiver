import base64 from 'base-64';

export const getToken = () => {
    return localStorage.getItem('token') || null;
  };

export const decodeToken = () => {
  const parts = getToken().split('.');
  let decodedToken = base64.decode(parts[1]);
  decodedToken = JSON.parse(decodedToken);
  return decodedToken
}

export async function getUserData(id){
  const res = await fetch(`http://localhost:3000/users/${id}`)
  return await res.json()
}

export function ConvertToLocalDate(responseDate) {
  let dateComponents = responseDate.split('T');
  return new Date(dateComponents[0]).toLocaleDateString("el-GR")
}

export const universitiesList = ["ΕΚΠΑ", "ΠΑΠΠΕΙ", "ΠΑΔΑ"]