function getTeacherNameAndEmailId() {
  try {
    const result = fetchCellValues(constants.TEACHER_MASTER_TAB_NAME, constants.TEACHER_EMAIL_AND_ID_REANGE, true);
    if (result.length === 0) {
      Logger.log("No teacher data found in the specified range.");
    } else {
      Logger.log("Teacher data fetched successfully.");
    }
    return result;
  } catch (error) {
    console.error("Error in getTeacherNameAndEmailId:", error.message);
    return [];
  }
}