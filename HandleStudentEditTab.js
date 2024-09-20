function handleStudentTabEdits(e, column, row, editedValue) {
  if (column >= 13 && column <= 16) {
    //console.log("Checking indv");
    handleIndV(e, column, row, editedValue);
  }
  getDropDownValues();
}

function handleIndV(e, column, row, editedValue) {
  try {
    if (isCellTrue("Student", row)) {
      const [tabName, editedSlot, editedCourse] = editedValue.split("_");
      const tab = getTab(tabName);

      if (!tab) {
        throw new Error(`Tab "${tabName}" not found.`);
      }

      const data = tab.getDataRange().getValues();
      processDataEntries(data, editedSlot, editedCourse, tab);
    } else {
      console.log(`Cell L${row} is not true, no update made.`);
    }
  } catch (error) {
    console.error("Error in handleIndV:", error.message);
  }
}

function isCellTrue(sheetName, row) {
  return getCellValue(sheetName, "L" + row) === true;
}

function processDataEntries(data, editedSlot, editedCourse, tab) {
  let entryFound = false;
  data.forEach((rowData, index) => {
    if (index === 0) return; // Skip header row  

    const slot = rowData[0];
    const course = rowData[1];

    if (slot === editedSlot && course === editedCourse) {
      entryFound = true;
      updateValuesInTab(tab, index, course);
    }
  });

  if (!entryFound) {
    console.log(`No matching slot/course found for ${editedSlot} and ${editedCourse} in tab ${tab.getName()}.`);
  }
}

function updateValuesInTab(tab, index, course) {
  const courseMappedWithTotalSeat = getMapForCourseSlot();

  if (!courseMappedWithTotalSeat) {
    throw new Error("Course mapping data not found.");
  }

  courseMappedWithTotalSeat.forEach((courseRow) => {
    if (courseRow[0] === course) {
      const repeatValue = courseRow[1];
      const range = tab.getRange("D" + (index + 1) + ":" + getColumnFromIndex(2 + repeatValue) + (index + 1));
      const valueToSet = repeatValue > 0 ? Array(repeatValue).fill("___") : [];
      range.setValues([valueToSet]);
      getDropDownValues();
    }
  });
}