function getMappedTeacherIdAndEmail() {
  const teacherInfo = getTeacherNameAndEmailId();
  return mappedIdAndEmail(teacherInfo)
}


function mappedIdAndEmail(data){
  const object = {}
  data.map((el)=>{
    if(el.length){
      object[el[1]] = el[0]
    }
  })
  return object
}