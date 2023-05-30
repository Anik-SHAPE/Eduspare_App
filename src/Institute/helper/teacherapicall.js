import {API} from "../../backend";


//Create Content
export const createContent = (userId, token, instituteId, institute) => {
    return fetch(`${API}/content-create/user/${userId}/${instituteId}`,{
        method: "POST",
        headers:{
            Accept: "application/json",
            "Content-type" : "application/json",
            Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(institute)
    })
    .then(response => {
        return response.json()
    })
    .catch(err => console.log("err"))
};


//Get All Contents
export const getAllContentByClassRoom = (userId, token, instituteId) => {
    return fetch(`${API}/content-all/user/${userId}/${instituteId}`, {
        method: "GET",
        headers:{
          Accept: "application/json",
          Authorization: `Bearer ${token}`
      },
    }).then(response => {
        return response.json()
    })
    .catch(err => console.log("err"))
};


//Get a Content
export const getContent = (userId, token, instituteId, contentId) => {
    return fetch(`${API}/content-get/user/${userId}/${contentId}`, {
        method: "GET",
        headers: {
            Accept: "application/json",
            Authorization: `Bearer ${token}`
        },
    }).then(response => {
        return response.json()
    })
    .catch(err => console.log("err"))
}


//Delete Content
export const deleteContent = (userId, token, instituteId, contentId) => {
    return fetch(`${API}content-delete/user/${userId}/${instituteId}/${contentId}`, {
        method: "DELETE",
        headers: {
            Accept: "application/json",
            Authorization: `Bearer ${token}`
        }
    })
    .then(response => {
        return response.json()
    })
    .catch(err => console.log("error"))
}

export const updateContent=(userId,token,instituteId,contentId, contentbody)=>{
    return fetch(`${API}/content-update/user/${userId}/${instituteId}/${contentId}`,{
        method:"PUT",
        headers:{
            Accept: "application/json",
            "Content-type" : "application/json",
            Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(contentbody)
    }).then(response=>{
        return response.json()
    })
    .catch(err => console.log("error"));
}


export const createNote=(userId,token,contentId,notes)=>{
    return fetch(`${API}/user-content/note-create/${userId}/${contentId}`,{
        method: "POST",
        headers:{
            Accept: "application/json",
            "Content-type" : "application/json",
            Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(notes)
    }).then(response => {
        return response.json()
    })
    .catch(err => console.log("err"))
};

export const getAllNote=(userId,token,contentId)=>{
    return fetch(`${API}/user-content/note-get-all/${userId}/${contentId}`, {
        method: "GET",
        headers:{
          Accept: "application/json",
          "Content-type" : "application/json",
          Authorization: `Bearer ${token}`
      },
    }).then(response => {
        return response.json()
    })
    .catch(err => console.log("err"))
};

export const getNote=(userId,token,noteId)=>{
   return fetch(`${API}/user-content/note-get/${userId}/${noteId}`, {
        method: "GET",
        headers: {
            Accept: "application/json",
            "Content-type" : "application/json",
            Authorization: `Bearer ${token}`
        },
    }).then(response => {
        return response.json()
    })
    .catch(err => console.log("err"));
};

export const updateNote=(userId,token,noteId,note)=>{
    return fetch(`${API}/user-content/note-update/${userId}/${noteId}`,{
        method:"PUT",
        headers:{
            Accept: "application/json",
            "Content-type" : "application/json",
            Authorization: `Bearer ${token}`
        },
        body:JSON.stringify(note)
    }).then(response=>{
        return response.json()
    })
    .catch(err => console.log("error"));
};

export const deleteNote=(userId,token,contentId,noteId)=>{
    return fetch(`${API}/user-content/note-delete/${userId}/${contentId}/${noteId}`, {
        method: "DELETE",
        headers: {
            Accept: "application/json",
            Authorization: `Bearer ${token}`
        }
    })
    .then(response => {
        return response.json()
    })
    .catch(err => console.log("error"))
};


//planner
export const createPlanner=(userId,token,instituteId,planner)=>{
    return fetch(`${API}/user/planner-create/${userId}/${instituteId}`,{
        method: "POST",
        headers:{
            Accept: "application/json",
            "Content-type" : "application/json",
            Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(planner)
    }).then(response => {
        return response.json()
    })
    .catch(err => console.log("err"))
};

export const getPlanner=(userId,token,instituteId,plannerId)=>{
    return fetch(`${API}/user/planner-get/${userId}/${instituteId}/${plannerId}`, {
         method: "GET",
         headers: {
             Accept: "application/json",
             "Content-type" : "application/json",
             Authorization: `Bearer ${token}`
         },
     }).then(response => {
         return response.json()
     })
     .catch(err => console.log("err"));
 };
 

export const getAllPlanner=(userId,token,instituteId)=>{
    return fetch(`${API}/user/planner-all/${userId}/${instituteId}`, {
        method: "GET",
        headers:{
          Accept: "application/json",
          "Content-type" : "application/json",
          Authorization: `Bearer ${token}`
      },
    }).then(response => {
        return response.json()
    })
    .catch(err => console.log("err"))
};

export const updatePlanner=(userId,token,instituteId,plannerId,planner)=>{
    return fetch(`${API}/user/planner-update/${userId}/${instituteId}/${plannerId}`,{
        method:"PUT",
        headers:{
            Accept: "application/json",
            "Content-type" : "application/json",
            Authorization: `Bearer ${token}`
        },
        body:JSON.stringify(planner)
    }).then(response=>{
        return response.json()
    })
    .catch(err => console.log("error"));
};

export const deletePlanner=(userId,token,instituteId,plannerId)=>{
    return fetch(`${API}/user/planner-delete/${userId}/${instituteId}/${plannerId}`, {
        method: "DELETE",
        headers: {
            Accept: "application/json",
            Authorization: `Bearer ${token}`
        }
    })
    .then(response => {
        return response.json()
    })
    .catch(err => console.log("error"))
};


export const assignContentToPlanner=(userId,token,plannerId,planner)=>{
    return fetch(`${API}/planner-user/assign-contents/${userId}/${plannerId}`,{
        method: "POST",
        headers:{
            Accept: "application/json",
            "Content-type" : "application/json",
            Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(planner)
    }).then(response => {
        return response.json()
    })
    .catch(err => console.log("err"))
};

export const removeContentFromPlanner=(userId,token,plannerId,contentId)=>{
    return fetch(`${API}/planner-user/content-remove/${userId}/${plannerId}/${contentId}`,{
        method: "POST",
        headers:{
            Accept: "application/json",
            "Content-type" : "application/json",
            Authorization: `Bearer ${token}`
        }
    }).then(response => {
        return response.json()
    })
    .catch(err => console.log("err"))
};


export const getAllContentByPlanner=(userId,token,plannerId)=>{
    return fetch(`${API}/planner-user/get-all-contents/${userId}/${plannerId}`, {
        method: "GET",
        headers:{
          Accept: "application/json",
          "Content-type" : "application/json",
          Authorization: `Bearer ${token}`
      },
    }).then(response => {
        return response.json()
    })
    .catch(err => console.log("err"))
};

//create Batch 
export const createBatch=(userId,token,instituteId,batch)=>{
  return fetch(`${API}/institute/batch-create/${userId}/${instituteId}`,{
    method: "POST",
    headers:{
        Accept: "application/json",
        "Content-type" : "application/json",
        Authorization: `Bearer ${token}`
    },
    body: JSON.stringify(batch)
}).then(response => {
    return response.json()
})
.catch(err => console.log("err"))
};

//GET Batch 
export const getBatch=(userId,token,instituteId,batchId)=>{
    return fetch(`${API}/institute/batch-get/${userId}/${instituteId}/${batchId}`, {
        method: "GET",
        headers: {
            Accept: "application/json",
            "Content-type" : "application/json",
            Authorization: `Bearer ${token}`
        },
    }).then(response => {
        return response.json()
    })
    .catch(err => console.log("err"));
};

//get All Batch 
export const getAllBatch=(userId,token,instituteId)=>{
    return fetch(`${API}/institute/batch-getall/${userId}/${instituteId}`, {
        method: "GET",
        headers:{
          Accept: "application/json",
          "Content-type" : "application/json",
          Authorization: `Bearer ${token}`
      },
    }).then(response => {
        return response.json()
    })
    .catch(err => console.log("err"))
};


//update Batch 
export const updateBatch=(userId,token,instituteId,batchId,batch)=>{
    return fetch(`${API}/institute/batch-update/${userId}/${instituteId}/${batchId}`,{
        method:"PUT",
        headers:{
            Accept: "application/json",
            "Content-type" : "application/json",
            Authorization: `Bearer ${token}`
        },
        body:JSON.stringify(batch)
    }).then(response=>{
        return response.json()
    })
    .catch(err => console.log("error"));
};


//delete Batch 
export const deleteBatch=(userId,token,instituteId,batchId)=>{
    return fetch(`${API}/institute/batch-delete/${userId}/${instituteId}/${batchId}`, {
        method: "DELETE",
        headers: {
            Accept: "application/json",
            Authorization: `Bearer ${token}`
        }
    })
    .then(response => {
        return response.json()
    })
    .catch(err => console.log("error"))
};

//Planner assign to batch 
export const assignPlannerToBatch=(userId,token,batchId,plannerId,planner)=>{
    return fetch(`${API}/institute/assign-planner/${userId}/${batchId}/${plannerId}`,{
        method: "POST",
        headers:{
            Accept: "application/json",
            "Content-type" : "application/json",
            Authorization: `Bearer ${token}`
        },
        body:JSON.stringify(planner)
      
    }).then(response => {
        return response.json()
    })
    .catch(err => console.log("err"))
};


//remove planner from batch 
export const removePlannerFromBatch=(userId,token,batchId)=>{
    
    return fetch(`${API}/institute/pop-planner/${userId}/${batchId}`,{
        method: "POST",
        headers:{
            Accept: "application/json",
            "Content-type" : "application/json",
            Authorization: `Bearer ${token}`
        }
    }).then(response => {
        return response.json()
    })
    .catch(err => console.log("err"))

};


//Get Scheduler
export const getScheduler=(userId, token, schedulerId)=> {
    
    return fetch(`${API}/user-batch-schedular/${userId}/${schedulerId}`, {
        method: "GET",
        headers:{
            Accept: "application/json",
            "Content-type" : "application/json",
            Authorization: `Bearer ${token}`
        }
    }).then(response => {
        return response.json()
    })
    .catch(err => console.log("err")) 
}


// Get All Events
export const getAllEventByScheduler=(userId, token, schedulerId)=> {
    
    return fetch(`${API}/user-get-event-scheduler-all/${userId}/${schedulerId}`, {
        method: "GET",
        headers:{
            Accept: "application/json",
            "Content-type" : "application/json",
            Authorization: `Bearer ${token}`
        }
    }).then(response => {
        return response.json()
    })
    .catch(err => console.log("err")) 
}

//Pending
export const getAllEventsFromBatchs=(userId,token,batchs)=>{
    return fetch(`${API}/user-events-schedulers/${userId}`, {
        method: "POST",
        headers:{
            Accept: "application/json",
            "Content-type" : "application/json",
            Authorization: `Bearer ${token}`
        },
        body:JSON.stringify(batchs)
    }).then(response => {
        return response.json()
    })
    .catch(err => console.log("err")) 
};

// Update Event
export const updateEvent = (userId, token, eventId, event) => {
    
    return fetch(`${API}/user-event-postpond/${userId}/${eventId}`, {
        method: "PUT",
        headers:{
            Accept: "application/json",
            "Content-type" : "application/json",
            Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(event)
    })
    .then(response => {
        return response.json()
    })
    .catch(err => console.log("err")) 
}

// Get Event
export const getEvent = (userId, token, eventId) => {
    
    return fetch(`${API}/user-event-get/${userId}/${eventId}`, {
        method: "GET",
        headers:{
            Accept: "application/json",
            Authorization: `Bearer ${token}`
        }
    }).then(response => {
        return response.json()
    })
    .catch(err => console.log("err")) 
}


//Assign Event
export const assignEvent = (userId, token, batchId, eventId) => {

    return fetch(`${API}/user-event-assign/${userId}/${batchId}/${eventId}`, {
        method: "POST",
        headers:{
            Accept: "application/json",
            "Content-type" : "application/json",
            Authorization: `Bearer ${token}`
        }
    }).then(response => {
        return response.json()
    })
    .catch(err => console.log("err")) 
}

//Remove Event
export const removeEvent = (userId, token, batchId, eventId) => {

    return fetch(`${API}/user-event-pop/${userId}/${batchId}/${eventId}`, {
        method: "DELETE",
        headers:{
            Accept: "application/json",
            "Content-type" : "application/json",
            Authorization: `Bearer ${token}`
        }
    }).then(response => {
        return response.json()
    })
    .catch(err => console.log("err")) 
}

//createPackage
export const createPackage = (userId, token, instituteId, packagebody) => {
    return fetch(`${API}/create-pakage-user/${userId}/${instituteId}`, {
        method: "POST",
        headers: {
            Accept: "application/json",
            "Content-type" : "application/json",
            Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(packagebody)
    })
    .then(response => {
        return response.json()
    })
    .catch(err => console.log("err")) 
}


//getAllPackage
export const getAllPackage = (userId, token, instituteId) => {
    return fetch(`${API}/get-pakage-all-user/${userId}/${instituteId}`, {
        method: "GET",
        headers: {
            Accept: "application/json",
            Authorization: `Bearer ${token}`
        },
    })
    .then(response => {
        return response.json()
    })
    .catch(err => console.log("err")) 
}


//getPackage
export const getPackage = (userId, token, packageId) => {
    return fetch(`${API}/get-pakage-user/${userId}/${packageId}`, {
        method: "GET",
        headers: {
            Accept: "application/json",
            Authorization: `Bearer ${token}`
        }
    })
    .then(response => {
        return response.json()
    })
    .catch(err => console.log("err")) 
}


//update Package
export const updatePackage = (userId, token, packageId) => {
    return fetch(`${API}/update-pakage-user/${userId}/${packageId}`, {
        method: "PUT",
        headers: {
            Accept: "application/json",
            Authorization: `Bearer ${token}`
        }
    })
    .then(response => {
        return response.json()
    })
    .catch(err => console.log("err")) 
}

//replace Content
export const replaceClassTopic = (userId, token, batchId, contentId, eventId) => {
    return fetch(`${API}/user-class-replace-topic-batch-event/${userId}/${batchId}/${contentId}/${eventId}`, {
        method: "POST",
        headers: {
            Accept: "application/json",
         //   "Content-type" : "application/json",
            Authorization: `Bearer ${token}`
        }
    })
    .then(response => {
        return response.json()
    })
    .catch(err => console.log("err"))
}


//get All Pending Classes
export const getAllPandingClass = (userId, token, batchId) => {
    return fetch(`${API}/institute-batch-pending-class-all/${userId}/${batchId}`, {
        method: "GET",
        headers: {
            Accept: "application/json",
            Authorization: `Bearer ${token}`
        }
    })
    .then(response => {
        return response.json()
    })
    .catch(err => console.log("err"))
}


//Assign pending Class
export const assignPendingClassToHomeWork = (userId, token, batchId, contentId) => {
    return fetch(`${API}/user-assign-hw-from-panding-class/${userId}/${batchId}/${contentId}`, {
        method: "POST",
        headers: {
            Accept: "application/json",
            Authorization: `Bearer ${token}`
        },
    })
    .then(response => {
        return response.json()
    })
    .catch(err => console.log("err"))
}

//Create Institute Teacher
export const createTeacher = (userId, token, InstituteId, teachercreate) => {
    return fetch(`${API}/create-ins-teacher/${userId}/${InstituteId}`, {
        method: "POST",
        headers: {
            Accept:"application/json",
            "Content-type" : "application/json",
            Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(teachercreate)
    })
    .then(response => {
        return response.json()
    })
    .catch(err => console.log("err"))
}