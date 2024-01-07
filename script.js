$(function () {
  // Function to display the current day
  function displayCurrentDay() {
    let currentDate = dayjs().format('dddd, MMMM D');
    console.log('Current Hour:', dayjs().hour());
    $('#currentDay').text(currentDate);
  }

  // Function to update time block colors based on current time
  function updateTimeBlocks() {
    const currentHour = dayjs().hour();
  
    $('.time-block').each(function () {
      // Extract blockHour from the id attribute
      let blockHour = parseInt($(this).attr('id').replace('hour-', ''), 10);
  
      console.log('Block Hour:', blockHour);
      console.log('Current Hour:', currentHour);
  
      if (blockHour < currentHour) {
        $(this).removeClass('present').addClass('past');
      } else if (blockHour === currentHour) {
        $(this).removeClass('future').addClass('present');
      } else {
        $(this).removeClass('present').addClass('future');
      }
    });
  }

  // Function to save events to local storage
  function saveEvent() {
    var eventId = $(this).parent().attr('id');
    var eventText = $(this).siblings('.description').val();

    localStorage.setItem(eventId, eventText);
  }

  // Function to load events from local storage
  function loadEvents() {
    $('.time-block').each(function () {
      var eventId = $(this).attr('id');
      var savedEvent = localStorage.getItem(eventId);

      if (savedEvent) {
        $(this).find('.description').val(savedEvent);
      }
    });
  }

  // Event listener for save button
  $('.saveBtn').on('click', saveEvent);

  // Initial setup
  displayCurrentDay();
  updateTimeBlocks();
  loadEvents();

  // Set interval to update time blocks every minute
  setInterval(function () {
    updateTimeBlocks();
  }, 60000);
});