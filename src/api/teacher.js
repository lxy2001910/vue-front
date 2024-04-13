import service from ".";

const createHomework = (data) => {
  return service.post("/homework/createHomework", data);
};


const findClassesCourseByUserId=(data)=>{
  return service.get(`/user//teacherPersonalClassCourse/teacherId=${data}`)
}



export { createHomework, findClassesCourseByUserId };
