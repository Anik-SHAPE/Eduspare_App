import {API} from "../../backend";

export const getUser = (userId) => {
    return fetch(`${API}/user-get/${userId}`,{
        method: "GET",
        headers:{
          Accept: "application/json",
          // Authorization: `Bearer ${token}`
      },
    })
    .then(response => {
        return response.json();
    })
    .catch(err => console.log(err));
  }