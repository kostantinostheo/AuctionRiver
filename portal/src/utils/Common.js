import base64 from 'base-64';

export const getToken = () => {
    return localStorage.getItem('token') || null;
  };
  export const logout = () => {
    localStorage.removeItem('token')
    window.location.reload()
  };
export const decodeToken = () => {
  
  if(!getToken())
    return null
    
  const parts = getToken().split('.');
  let decodedToken = base64.decode(parts[1]);
  decodedToken = JSON.parse(decodedToken);
  return decodedToken
}

export function LocalDate() {
  const today = new Date();
  const yyyy = today.getFullYear();
  let mm = today.getMonth() + 1; // Months start at 0!
  let dd = today.getDate();
  
  if (dd < 10) dd = '0' + dd;
  if (mm < 10) mm = '0' + mm;
  const date = dd + '/' + mm + '/' + yyyy
  return date
}

export const universitiesList = ["ΕΚΠΑ", "ΠΑΠΠΕΙ", "ΠΑΔΑ"]