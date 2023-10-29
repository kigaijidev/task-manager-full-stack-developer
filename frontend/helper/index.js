import VueJwtDecode from 'vue-jwt-decode'

const getCookie = (cname) => {
    let name = cname + "=";
    let ca = document.cookie.split(';');
    for(let i = 0; i < ca.length; i++) {
      let c = ca[i];
      while (c.charAt(0) == ' ') {
        c = c.substring(1);
      }
      if (c.indexOf(name) == 0) {
        return c.substring(name.length, c.length);
      }
    }
    return "";
}

const JwtDecode = (jwt) => {
    return VueJwtDecode.decode(jwt)
} 

const getDateFormat = (date) => {
  const fDate = new Date(date);
  if(!fDate){
    return "";
  }
  return `${fDate.getDate()} / ${fDate.getMonth()} / ${fDate.getFullYear()}`
} 

export {
    getCookie,
    JwtDecode,
    getDateFormat,
}