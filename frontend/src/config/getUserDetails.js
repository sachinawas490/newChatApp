import axios from "axios";

async function userInfo(token) {
    try {
        const response = await axios.get('http://localhost:5000/user/userInfo', {
            headers: {
                'Authorization':`Bearer ${token}`
            }
        })
        if (response.status===200) {
            return response.data.user;
        } else {
            return null;
        }
    } catch (error) {
        console.log(error);
    }
}

export default userInfo;