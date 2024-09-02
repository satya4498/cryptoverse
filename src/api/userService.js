import axios from 'axios'

const url = process.env.REACT_APP_HOST

export const getUser = async (user)=> {
    try{
        const uri = `${url}/api/v1/user`
        const res = await axios.request({
            method: 'GET',
            url: uri,
            headers: {
              'Content-Type': 'application/json',
              'Allow-Origin': '*'
            },
            credentials: 'include',
            // withCredentials:true,
            params: user, // Sending data in the query parameters (standard for GET)
            // data: user // Sending data in the body (non-standard for GET)
          });
        console.log(res)
        return res.data;
    }catch(err){
        console.error(err);
        return null;
    }
}