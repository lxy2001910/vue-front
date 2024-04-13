
import service from ".";

const getAllClassesCourses=()=>{

    return service.post("/user/admin/getAllClassesCourses");
}

const getAllocationTeach=()=>{
    return service.post("/user/admin/getAllocationTeach");
}

const addOrDeleteAllocationTeach=(data)=>{
    return service.post("/user/admin/addOrDelete",data);
}


export {getAllClassesCourses,getAllocationTeach,addOrDeleteAllocationTeach}