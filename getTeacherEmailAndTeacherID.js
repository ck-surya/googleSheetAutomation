function getTeacherNameAndEmailId() {
  try {
    const result = fetchCellValues(constant.TEACHER_MASTER_TAB_NAME, constant.TEACHER_EMAIL_AND_ID_REANGE, true);
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