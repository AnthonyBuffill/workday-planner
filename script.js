$(function () {
 
  function displayCurrentDay() {
    
    let currentDate = dayjs().format('dddd, MMMM D');
    
    console.log('Current Hour:', dayjs().hour());
    $('#currentDay').text(currentDate);
  }

  
  function updateTimeBlocks() {
    const currentHour = dayjs().hour();
  
    $('.time-block').each(function () {
      
      let blockHour = parseInt($(this).attr('id').replace('hour-', ''), 10);
  
      console.log('Block Hour:', blockHour);
      console.log('Current Hour:', currentHour);
  
      if (blockHour < currentHour) {
        $(this).removeClass('present').addClass('past');
      } 
       else if (blockHour === currentHour) {
        $(this).removeClass('future').addClass('present');
      }
       else {
        $(this).removeClass('present').addClass('future');
      }
    });
  }

  
  function storeEntry() {
    
    let entryId = $(this).parent().attr('id');
    let entryText = $(this).siblings('.description').val();

    localStorage.setItem(entryId, entryText);
  }

  
  function loadEntrys() {
    $('.time-block').each(function () {
     
      let storedId = $(this).attr('id');
      let savedEntry = localStorage.getItem(storedId);

      if (savedEntry) {
        $(this).find('.description').val(savedEntry);
      }
    });
  }

  
  $('.saveBtn').on('click', storeEntry);

  
  displayCurrentDay();
  updateTimeBlocks();
  loadEntrys();

  
  setInterval(function () {
    updateTimeBlocks();
  }, 60000);
});