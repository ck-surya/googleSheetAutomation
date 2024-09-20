function getTeacherNameAndEmailId() {
  try {
    const result = fetchCellValues(getTeacherMasterTabName(), constant.TEACHER_EMAIL_CELL, true);
    if (result.length === 0) {
      console.log("No teacher data found in the specified range.");
    } else {
      console.log("Teacher data fetched successfully.");
    }
    return result;
  } catch (error) {
    console.error("Error in getTeacherNameAndEmailId:", error.message);
    return [];
  }
}