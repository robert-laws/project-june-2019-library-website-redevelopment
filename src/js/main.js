// javascript needed to get bootstrap initialized correctly
window.exports = {};

function whatSearchingHelp(target) {
  (function ($) {
      var t = "#" + target + "What";
      if ($(t).hasClass('d-none')) {
        $(t).removeClass('d-none');
      } else {
        $(t).addClass('d-none');
      }
  })(jQuery);
}

(function ($) {
  $('#hoyaSearchText').keypress(function (event) {
    const keycode = (event.keyCode ? event.keyCode : event.which);
    let searchTypeValue = document.querySelector("#hoyaSearchType").value;
    let searchTextValue = document.querySelector("#hoyaSearchText").value;
    if (keycode == '13') {
      goSearch(searchTypeValue, searchTextValue);
      return false;
    }
  });
})(jQuery);

(function ($) {
  $('#databasesText').keypress(function (event) {
    let keycode = (event.keyCode ? event.keyCode : event.which);
    let search =  document.querySelector("#databasesText").value;
    if (keycode == '13') {
      goSearchOther('databases', search);
      return false;
    }
  });
})(jQuery);

(function ($) {
  $('#journalsText').keypress(function (event) {
    let keycode = (event.keyCode ? event.keyCode : event.which);
    let search =  document.querySelector("#journalsText").value;
    if (keycode == '13') {
      goSearchOther('journals', search);
      return false;
    }
  });
})(jQuery);

(function ($) {
  $('#googleScholarText').keypress(function (event) {
    let keycode = (event.keyCode ? event.keyCode : event.which);
    let search =  document.querySelector("#googleScholarText").value;
    if (keycode == '13') {
      goSearchOther('google-scholar', search);
      return false;
    }
  });
})(jQuery);

(function ($) {
  $('#courseReservesText').keypress(function (event) {
    let keycode = (event.keyCode ? event.keyCode : event.which);
    let search =  document.querySelector("#courseReservesText").value;
    if (keycode == '13') {
      goSearchOther('course-reserves', search);
      return false;
    }
  });
})(jQuery);

function goSearch(focus, text) {
  if (text) {
    (function ($) {
      switch (focus) {
        case 'everything':
          focus = 'Everything&search_scope=GT_and_CI';
          break;
        case 'course-reserves':
          focus = 'CourseReserves&search_scope=CourseReserves';
          break;
      }
      searchString = `https://wrlc-gu.primo.exlibrisgroup.com/discovery/search?query=any,contains,${text}&tab=${focus}&vid=01WRLC_GUNIV:QATAR&lang=en&offset=0`;
      window.location.href = searchString;
    })(jQuery);
  } else {
      // do nothing
  }
}

function goSearchOther(type, text) {
  if (text) {
    (function ($) {
      let searchString = ''
      switch (type) {
        case 'databases':
          searchString = `https://guides.qatar.georgetown.edu/az.php?q=${text}`;
          break;
        case 'journals':
          searchString = `https://wrlc-gu.primo.exlibrisgroup.com/discovery/jsearch?query=any,contains,${text}&tab=jsearch_slot&vid=01WRLC_GUNIV:QATAR&lang=en&offset=0`;
          break;
        case 'google-scholar':
          searchString = `https://scholar.google.com/scholar?hl=en&as_sdt=0%2C9&q=${text}`;
          break;
        case 'course-reserves':
          searchString = `https://wrlc-gu.primo.exlibrisgroup.com/discovery/search?query=any,contains,${text}&tab=CourseReserves&search_scope=CourseReserves&sortby=rank&vid=01WRLC_GUNIV:QATAR`;
          break;
      }      
      window.location.href = searchString;
    })(jQuery);
  } else {
      // do nothing
  }
}

function getHours() {
  // termNow is either semester or summer
  var term = "semester";
  var hours = "";
  var dateNow = new Date();
  var month = dateNow.getMonth() + 1;
  var day = dateNow.getDate();
  var year = dateNow.getFullYear();
  var todayDate = month + "/" + day + "/" + year;

  // check if there's any exceptions....
  hours = findExceptionHours(todayDate);

  // if no exceptions, get hours based on term
  if (hours == "") {
    var termHours = getTermHours(term);
    hours = findSemesterHours(termHours);
  }

  return hours;
}

function findExceptionHours(todayDate) {
  var hours = "";
  var exDates = getExceptionHours();

  for (var i = 0; i < exDates.length; i++) {
    if (exDates[i].date == todayDate) {
      hours = "Today's Hours: " + exDates[i].hours;
    }
  }

  return hours;
}

function findSemesterHours(semesterHours) {
  var dateNow = new Date();
  var dayOfWeek = dateNow.getDay();
  var hours = "";

  for (var i = 0; i < semesterHours.length; i++) {
    if (semesterHours[i].day == dayOfWeek) {
      hours = "Today's Hours: " + semesterHours[i].hours;
    }
  }

  return hours;
}

function getTermHours(term) {
  hours = [];
  if (term == "semester") {
    hours = getSemesterHours();
  } else if (term == "summer") {
    hours = getSummerHours();
  }
  return hours;
}

function getDateToday() {
  var dateNow = new Date();
  var day = dateNow.getDate();
  var year = dateNow.getFullYear();
  var dayOfWeek = dateNow.getDay();
  var todayDate = month + "/" + day + "/" + year;

  return todayDate;
}

function getExceptionHours() {
  var exceptions = [{
      date: '6/3/2019',
      hours: 'Closed'
    },
    {
      date: '6/11/2019',
      hours: '8am - 5pm'
    },
    {
      date: '6/27/2019',
      hours: '8am - 5pm'
    }
  ];
  return exceptions;
}

function getSemesterHours() {
  var hours = [{
      day: "0",
      hours: "8am - 10:45pm"
    },
    {
      day: "1",
      hours: "8am - 10:45pm"
    },
    {
      day: "2",
      hours: "8am - 10:45pm"
    },
    {
      day: "3",
      hours: "8am - 10:45pm"
    },
    {
      day: "4",
      hours: "8am - 7pm"
    },
    {
      day: "5",
      hours: "Closed"
    },
    {
      day: "6",
      hours: "3pm - 10:45pm"
    }
  ];
  return hours;
}

function getSummerHours() {
  var hours = [{
      day: "0",
      hours: "9am - 4pm"
    },
    {
      day: "1",
      hours: "9am - 4pm"
    },
    {
      day: "2",
      hours: "9am - 4pm"
    },
    {
      day: "3",
      hours: "9am - 4pm"
    },
    {
      day: "4",
      hours: "9am - 4pm"
    },
    {
      day: "5",
      hours: "Closed"
    },
    {
      day: "6",
      hours: "Closed"
    }
  ];
  return hours;
}

// inserts current hours into quick links area - function location in the footer block
(function ($) {
  $(document).ready(function () {
    if(document.querySelector("#library-hours")) {
      var finalHours = getHours();
      document.querySelector("#library-hours").innerText = finalHours;
    }
  });
})(jQuery);