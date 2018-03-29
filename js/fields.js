function addFields(){
// Number of inputs to create

var number = document.getElementById("employeeAmount").value;
// Container <div> where dynamic content will be placed
var container = document.getElementById("container");
// Clear previous contents of the container
while (container.hasChildNodes()) {
    container.removeChild(container.lastChild);
}
container.appendChild(document.createElement("br"));
for (i=0;i<number;i++){
    // Append a node with a random text
    container.appendChild(document.createTextNode((i+1) + ". Employee Name: "));
    // Create an <input> element, set its type and name attributes
    var input = document.createElement("input");
    input.type = "text";
    input.name = "employee" + i;
    input.id = "employee" + i;
    container.appendChild(input);
    // Append a line break
    container.appendChild(document.createElement("br"));

    // Append a node with a random text
    container.appendChild(document.createTextNode(" Employee Availability: "));
    container.appendChild(document.createElement("br"));
    // Create an <input> element, set its type and name attributes

    var input = document.createElement("input");
    input.type = "checkbox";
    input.name = "monAvail" + i;
    input.id = "monAvail" + i;
    input.checked = true;
    container.appendChild(input);
    container.appendChild(document.createTextNode(" Mon "));

    var input = document.createElement("input");
    input.type = "checkbox";
    input.name = "tuesAvail" + i;
    input.id = "tuesAvail" + i;
    input.checked = true;
    container.appendChild(input);
    container.appendChild(document.createTextNode(" Tue "));

    var input = document.createElement("input");
    input.type = "checkbox";
    input.name = "wedAvail" + i;
    input.id = "wedAvail" + i;
    input.checked = true;
    container.appendChild(input);
    container.appendChild(document.createTextNode(" Wed "));

    var input = document.createElement("input");
    input.type = "checkbox";
    input.name = "thurAvail" + i;
    input.id = "thurAvail" + i;
    input.checked = true;
    container.appendChild(input);
    container.appendChild(document.createTextNode(" Thur "));

    var input = document.createElement("input");
    input.type = "checkbox";
    input.name = "friAvail" + i;
    input.id = "friAvail" + i;
    input.checked = true;
    container.appendChild(input);
    container.appendChild(document.createTextNode(" Fri "));

    var input = document.createElement("input");
    input.type = "checkbox";
    input.name = "satAvail" + i;
    input.id = "satAvail" + i;
    input.checked = true;
    container.appendChild(input);
    container.appendChild(document.createTextNode(" Sat "));

    var input = document.createElement("input");
    input.type = "checkbox";
    input.name = "sunAvail" + i;
    input.id = "sunAvail" + i;
    input.checked = true;
    container.appendChild(input);
    container.appendChild(document.createTextNode(" Sun "));

    // Append a line break
    container.appendChild(document.createElement("br"));
    container.appendChild(document.createElement("br"));
}
    var button = document.createElement("input");
    button.type = "button";
    button.value = "NEXT";
    button.className = "btn btn-primary";
    button.onclick = function() {submit()}; // ADD FUNCTION HERE
    container.appendChild(button);
    container.appendChild(document.createElement("br"));
    container.appendChild(document.createElement("br"));
}

function submit() {
  var openHour = parseInt(document.getElementById("openHour").value);
  var openMinutes = document.getElementById("openMinutes").value;
  var closeHour = parseInt(document.getElementById("closeHour").value) + 12;
  var closeMinutes = document.getElementById("closeMinutes").value;
  //Check Boxes
  var availMonday = document.getElementById("Monday").checked;
  var availTuesday = document.getElementById("Tuesday").checked;
  var availWednesday = document.getElementById("Wednesday").checked;
  var availThursday = document.getElementById("Thursday").checked;
  var availFriday = document.getElementById("Friday").checked;
  var availSaturday = document.getElementById("Saturday").checked;
  var availSunday = document.getElementById("Sunday").checked;

  // Make a list of days open to iterate through
  var openDays = [];
  if (availMonday) {
    openDays.push("Monday");
  }
  if (availTuesday) {
    openDays.push("Tuesday");
  }
  if (availWednesday) {
    openDays.push("Wednesday");
  }
  if (availThursday) {
    openDays.push("Thursday");
  }
  if (availFriday) {
    openDays.push("Friday");
  }
  if (availSaturday) {
    openDays.push("Saturday");
  }
  if (availSunday) {
    openDays.push("Sunday");
  }

  // Finds total hours and divdes by 8 to find number of full shifts in a day
  var needList = [];
  var total = closeHour - openHour;
  var numOfShifts = parseInt(total/8);

  // Iterates through all days store is open
  for (i=0; i < openDays.length; i++) {
    // Creates ShiftNeed for all full length shifts
    var day = openDays[i];
    for (j = 0; j < numOfShifts; j++) {
      let newShift = new ShiftNeed(day, openHour + (8*j), openHour + (8*(j+1)));
      needList.push(newShift);
    }

    // Creates any remainder shifts
    if (total%8 != 0) {
      let newShift = new ShiftNeed(day, closeHour - (total%8), closeHour);
      needList.push(newShift);
    }

  }

  // Test for shift creation
  // for (i=0; i < needList.length; i++) {
  //   alert(needList[i].getDayOfWeek() + " " + needList[i].getStartTime() + " " + needList[i].getEndTime());
  // }

  // Find total number of employees
  var numOfEmployee = 0
  var employeeList = []
  while (document.getElementById("employee" + numOfEmployee)) {
    tempName = document.getElementById("employee" + numOfEmployee).value;
    tempAvail = [];
    if (document.getElementById("monAvail" + numOfEmployee).checked) {
      tempAvail.push("Monday");
    }
    if (document.getElementById("tuesAvail" + numOfEmployee).checked) {
      tempAvail.push("Tuesday");
    }
    if (document.getElementById("wedAvail" + numOfEmployee).checked) {
      tempAvail.push("Wednesday");
    }
    if (document.getElementById("thurAvail" + numOfEmployee).checked) {
      tempAvail.push("Thursday");
    }
    if (document.getElementById("friAvail" + numOfEmployee).checked) {
      tempAvail.push("Friday");
    }
    if (document.getElementById("satAvail" + numOfEmployee).checked) {
      tempAvail.push("Saturday");
    }
    if (document.getElementById("sunAvail" + numOfEmployee).checked) {
      tempAvail.push("Sunday");
    }
    let newEmployee = new Employee(tempName, tempAvail);
    employeeList.push(newEmployee)
    numOfEmployee++;
  }
  // Test for employee creation
  // for (i=0; i < numOfEmployee; i++) {
  //   alert(employeeList[i].getName() + " " + employeeList[i].getAvail());
  // }
}

class ShiftNeed {

  constructor(dayOfWeek, startTime, endTime) {
    this.dayOfWeek = dayOfWeek;
    this.startTime = startTime;
    this.endTime = endTime;
  }

  getDayOfWeek() {
    return this.dayOfWeek;
  }

  getStartTime() {
    return this.startTime;
  }

  getEndTime() {
    return this.endTime;
  }

  setDayOfWeek(newDayofWeek) {
    this.dayOfWeek = newDayofWeek;
  }

  setStartTime(newStartTime) {
    this.startTime = newStartTime;
  }

  setEndTime(newEndTime) {
    this.endTime = newEndTime;
  }
// Qualifications go here
}

class Employee {

  constructor(name, availList) {
    this.name = name;
    this.availList = availList;
  }
  getName() {
    return this.name;
  }
  getAvail() {
    return this.availList;
  }

}
