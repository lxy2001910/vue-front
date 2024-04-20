import service from '.'

const findStudentHomework = (data) => {
  return service.get(`/homework//studentHomework/classId=${data}`)
}

export { findStudentHomework }