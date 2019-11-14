import instence from './http'
//register
function register(url,data) {
    return instence.post(url,data)
}

//login
function login(url,data) {
   return instence.post(url,data);
}
//getdata
function queryDetail(url,data) {
    return instence.get(url,data);
}
export {register,login,queryDetail}