function updateIndVAvailability(teacherTab, slot, course, studentsCount, courseMapWithAvailableSlot) {
  if (studentsCount === 0) {
    if (courseMapWithAvailableSlot && courseMapWithAvailableSlot.indV) {
      if (courseMapWithAvailableSlot.indV[course] !== undefined) {
        courseMapWithAvailableSlot.indV[course].push(teacherTab + "_" + slot + "_" + course);
      } else {
        console.log("Course does not exist in indV: " + course);  
      }
    } else {
      console.log("courseMapWithAvailableSlot or indV is not defined");  
    }
  }
}