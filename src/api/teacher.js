/*
 * @Author: 星忆 2500798479@qq.com
 * @Date: 2024-04-14 01:19:30
 * @LastEditors: 星忆 2500798479@qq.com
 * @LastEditTime: 2024-04-15 14:50:33
 * @FilePath: \up-cloud-front\src\api\teacher.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import service from '.'

const createHomework = (data) => {
  return service.post('/homework/createHomework', data)
}

const findteacherPublicHomework=(data)=>{
  return service.get(`/homework/teacherPublicHomework/teacherId=${data}`)
}

const findClassesCourseByUserId = (data) => {
  return service.get(`/user/teacherPersonalClassCourse/teacherId=${data}`)
}



export { createHomework, findClassesCourseByUserId,findteacherPublicHomework }
