function getMappedTeacherIdAndEmail() {
  const teacherInfo = getTeacherNameAndEmailId();
  return mappedIdAndEmail(teacherInfo)
}

function mappedIdAndEmail(data) {
  const object = {}
  data.map((el) => {
    if (el.length) {
      object[el[constants.TEACHER_ID_INDEX_IN_EMAIL_AND_ID_DATA]] = el[constants.TEACHER_EMAIL_INDEX_IN_EMAIL_AND_ID_DATA]
    }
  })
  return object
}