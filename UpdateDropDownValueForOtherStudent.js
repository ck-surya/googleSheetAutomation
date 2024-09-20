function updateOtherVAvailability(course, studentsCount, courseMappedWithTotalSeat, teacherTab, slot, courseMapWithAvailableSlot) {
  courseMappedWithTotalSeat.forEach(mappedRow => {
    if (mappedRow[0] === course.trim() && mappedRow[1] > studentsCount) {
      courseMapWithAvailableSlot.otherV[course].push(teacherTab + "_" + slot + "_" + course);
    } else {

    }
  });
}