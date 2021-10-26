/*Script for working hours cafe*/
function opening_hours() {
  let date = new Date();
  let options = {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  };
  let opening;

  let opening_hours = [
    {
      /*restaurant 1*/
      days: [["Mon", "Tue", "Wed"], ["Thu", "Fri", "Sat"], ["Sun"]],
      hours: [[9, 24], [17, 24], [null]],
    },
    {
      /*restaurant 2*/
      days: [["Mon", "Tue", "Wed"], ["Thu", "Fri", "Sat"], ["Sun"]],
      hours: [[14, 15], [null], [15, 17]],
    },
    {
      /*restaurant 3*/
      days: [["Mon", "Tue", "Wed"], ["Thu", "Fri", "Sat"], ["Sun"]],
      hours: [[11, 14], [18, 19], [11, 23]],
    },
  ];

  function write_hours(hour) {
    let hours;
    if (hour[0] === null) {
      hours = "close";
    } else {
      hours = hour[0] + "h-" + hour[1] + "h";
    }
    return hours;
  }

  function write_days(day) {
    let days = "";
    for (let y = 0; y < day.length - 1; y++) {
      days = days + day[y] + ", ";
    }
    return days + day[day.length - 1];
  }

  for (let i = 0; i < document.querySelectorAll(".restaurant").length; i++) {
    /*set opening hours of each restaurant, based on the opening_hours[] array, x being the schedule line*/
    for (let x = 0; x < document.querySelectorAll(".restaurant")[i].querySelectorAll(".days").length; x++) {
        document.querySelectorAll(".restaurant")[i].querySelectorAll(".days")[x].innerHTML = write_days(opening_hours[i].days[x]);
        document.querySelectorAll(".restaurant")[i].querySelectorAll(".hours")[x].innerHTML = write_hours(opening_hours[i].hours[x]);
        if (opening == "close" || !opening) {
        opening_check(opening_hours[i].days[x], opening_hours[i].hours[x]);
      }
    }
    document.querySelectorAll(".current_date")[i].innerHTML = "Today is " + date.toLocaleDateString("in-ID", options);
    document.querySelectorAll(".current_time")[i].innerHTML = ", time " + pad2(date.getHours()) + "h" + pad2(date.getMinutes());
    document.querySelectorAll(".open_check")[i].innerHTML = "So the restaurant is " + opening;
    opening = null;
  }

  /*function to check if the restaurant is open given the opening hours compared to the current date and time*/
  function opening_check(days, hour) {
    if (days.includes(string_day(date.getDay()))) {
      if (date.getHours() >= hour[0] && date.getHours() < hour[1]) {
        opening = "open";
      } else {
        opening = "close";
      }
    } else {
      opening = "close";
    }
  }

  function string_day(day_index) {
    let day;
    switch (day_index) {
      case 0:
        day = "Sun";
        break;
      case 1:
        day = "Mon";
        break;
      case 2:
        day = "Tue";
        break;
      case 3:
        day = "Wed";
        break;
      case 4:
        day = "Thu";
        break;
      case 5:
        day = "Fri";
        break;
      case 6:
        day = "Sat";
        break;
    }
    return day;
  }
}

function pad2(number) {
  return (number < 10 ? "0" : "") + number;
}

/*Script for storing user reservation form in localstorage*/
function saveData() {
  let name = document.getElementById("name").value;
  let email = document.getElementById("email").value;
  let phone = document.getElementById("phone").value;
  let guests = document.getElementById("guests").value;
  let time = document.getElementById("rsvTime").value;
  let dateRes = document.getElementById("rsvDate").value;
  let message = document.getElementById("message").value;

  let user_records = new Array();
  user_records = JSON.parse(localStorage.getItem("users"))?JSON.parse(localStorage.getItem("users")):[]

  user_records.push({
    "name": name,
    "email": email,
    "phone": phone,
    "guests": guests,
    "time": time,
    "date": dateRes,
    "message": message
  })
  localStorage.setItem("users", JSON.stringify(user_records));
  alert("Reservation successfully made");
}
