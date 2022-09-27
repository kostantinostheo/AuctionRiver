import base64 from 'base-64';
import exportFromJSON from 'export-from-json'

/**
 * Return the token if exists, else null
 */
export const getToken = () => {
    return localStorage.getItem('token') || null;
};

/**
 * Returns true if token exists, else false
 */
export const tryGetToken = () => {
  let res = false
  localStorage.getItem('token') != null ? res = true : res = false
  return res
};

/**
 * Logouts user.
 */
export const logout = () => {
  localStorage.removeItem('token')
  window.location.reload()
};

/**
 * Finds the users token and decodes it. 
 * @returns the decoded token or null
 */
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

export function jsonToXml(data, exportType){

  const fileName = 'auctions'

  exportFromJSON({ data, fileName, exportType })
}

var gen_nums = [];
export function in_array(array, el) {
    for(var i = 0 ; i < array.length; i++) 
        if(array[i] === el) return true;
    return false;
}

export function get_rand(array) {
    var rand = array[Math.floor(Math.random()*array.length)];
    if(!in_array(gen_nums, rand)) {
        gen_nums.push(rand); 
        return rand;
    }
    return get_rand(array);
}