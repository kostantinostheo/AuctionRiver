import base64 from 'base-64';

export const getToken = () => {
    return localStorage.getItem('token') || null;
  };
  export const logout = () => {
    localStorage.removeItem('token')
    window.location.reload()
  };
export const decodeToken = () => {
  const parts = getToken().split('.');
  let decodedToken = base64.decode(parts[1]);
  decodedToken = JSON.parse(decodedToken);
  return decodedToken
}

export function ConvertToLocalDate(responseDate) {
  let dateComponents = responseDate.split('T');
  return new Date(dateComponents[0]).toLocaleDateString("el-GR")
}

export const universitiesList = ["ΕΚΠΑ", "ΠΑΠΠΕΙ", "ΠΑΔΑ"]