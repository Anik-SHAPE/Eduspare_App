import {API} from "../../backend";

//Create User
export const createUser = (userId, token, user) => {
    return fetch (`${API}/user-create/${userId}`,{
      method: "POST",
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${token}`
      },
      body: user
  })
  .then(response => {
    return response.json();
  })
  .catch(err => console.log(err));
}

//Create City
export const createCity = (userId, token, city) => {
  return fetch (`${API}/city-create/user/${userId}`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-type" : "application/json",
      Authorization: `Bearer ${token}`
    },
    body: JSON.stringify(city)
  })
 .then(response => {
   return response.json();
 })
 .catch(err => console.log(err));
}


//Get All Cities
export const getAllCity = (userId, token) => {
  return fetch(`${API}/city-getall/user/${userId}`,{
      method: "GET",
      headers:{
        Accept: "application/json",
        Authorization: `Bearer ${token}`
    },
  }).then(response =>{
      return response.json()
  })
  .catch(err => console.log(err))
}


//Delete City
export const removeCity = (userId, token, cityId) => {
  return fetch(`${API}/city-delete/user/${userId}/${cityId}`, {
    method: "DELETE",
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${token}`
    },
  })
  .then(() => {
    console.log("City Deleted Succesfully");
  })
  .catch(err => console.log(err));
}


//Create Subject
export const createSubject = (userId, token, subject) => {
  return fetch (`${API}/subject-create/user/${userId}`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${token}`
    },
    body:subject
  })
 .then(response => {
   return response.json();
 })
 .catch(err => console.log(err));
}

//Get All Subjects
export const getAllSubject = (userId, token) => {
  return fetch(`${API}/subject-getall/user/${userId}`,{
      method: "GET",
      headers:{
        Accept: "application/json",
        Authorization: `Bearer ${token}`
    },
  }).then(response =>{
      return response.json()
  })
  .catch(err => console.log(err))
}

//Delete Subject
export const deleteSubject = (userId, token, subjectId) => {
  return fetch(`${API}/subject-delete/user/${userId}/${subjectId}`, {
    method: "DELETE",
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${token}`
    }
  })
    .then(() => {
      // return response.json();
      console.log('successfull');
    })
    .catch(err => console.log(err));
};


// Create Grade
export const createGrade = (userId, token, grade) => {
  return fetch (`${API}/grade-create/user/${userId}`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-type" : "application/json",
      Authorization: `Bearer ${token}`
    },
    body: JSON.stringify(grade)
  })
 .then(response => {
   return response.json();
 })
 .catch(err => console.log(err));
}


//Get All Grades
export const getAllGrade = (userId, token) => {
  return fetch(`${API}/grade-getall/user/${userId}`,{
      method: "GET",
      headers:{
        Accept: "application/json",
        "Content-type" : "application/json",
        Authorization: `Bearer ${token}`
    },
  }).then(response =>{
      return response.json()
  })
  .catch(err => console.log(err))
}


//Delete Grade
export const deleteGrade = (userId, token, gradeId) => {
  return fetch(`${API}/grade-delete/user/${userId}/${gradeId}`, {
    method: "DELETE",
    headers: {
      Accept: "application/json",
      "Content-type" : "application/json",
      Authorization: `Bearer ${token}`
    }

  })
    .then(() => {
      // return response.json();
      console.log('successfull');
    })
    .catch(err => console.log(err));
};


//Create Institute
export const registerInstitute = (institute) => {
  return fetch(`${API}/register-institute`, {
    method: "POST",
    header: {
      Acccept: "application/json"
    },
    body: institute
  })
  .then(response => {
    return response.json()
  })
  .catch(err => console.log(err));
} 


export const getAllInstitute = (userId, token) => {
  return fetch(`${API}/institute-all/${userId}`,{
    method: "GET",
    headers:{
      Accept: "application/json",
      Authorization: `Bearer ${token}`
    },
  }).then(response =>{
      return response.json()
  })
  .catch(err => console.log(err))
}

export const getInstitute = (userId, token, instituteId) => {
  return fetch(`${API}/teacher-institute-user/${userId}/${instituteId}`,{
    method: "GET",
    headers:{
      Accept: "application/json",
      Authorization: `Bearer ${token}`
    },
  }).then(response =>{
      return response.json()
  })
  .catch(err => console.log(err))
}

export const instituteUpdate = (userId, token, instituteId, institute) => {
  return fetch(`${API}/teacher-institute-update/user/${userId}/${instituteId}`,{
    method: "PUT",
    headers:{
      Accept: "application/json",
      Authorization: `Bearer ${token}`
    },
    body: institute
  })
  .then(response =>{
      return response.json()
  })
  .catch(err => console.log(err))
}


export const assignInsituteAdmin = (instituteId, instituteAdmin) => {
  return fetch(`${API}/assign-institute-admin/${instituteId}`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-type" : "application/json"
    },
    body:  JSON.stringify(instituteAdmin) 
  })
  .then(response =>{
    return response.json()
  })
  .catch(err => console.log(err))
}

