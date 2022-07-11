window.onload = function() {

    // Get references to elements on the page.
    var form = document.getElementById('message-form');
    var messageField = document.getElementById('message');
    var messagesList = document.getElementById('messages');
    
    // Handle messages sent by the server.
    sendMessage = function(message) {
      messagesList.innerHTML = ""
      messagesList.innerHTML += '<li class="received">' + message + '</li>';
    };

    sendErrorMessage = function(errorMessage){
      messagesList.innerHTML = ""
      messagesList.innerHTML += '<li class="received" style="color: red;">' + errorMessage + '</li>';
    }
  
    function checkTime(intTime) {
      try{
        time = parseInt(intTime)
        if (time < 10) {
          time = "0" + time
        };  // add zero in front of numbers < 10
        return time;
      }catch(error){
        console.log(error)
      }
    }

    
    function convertStrTimesToIntTimes(splitTimes){
      splitTimesInSeconds = []
      for(var i = 0; i < splitTimes.length; i++){
          minutesAndSeconds = splitTimes[i].split(":")
          str_minutes = minutesAndSeconds[0]
          str_seconds = minutesAndSeconds[1]
          try{
            minutes = parseInt(str_minutes)
            seconds = parseInt(str_seconds)
            
            minutesAndSeconds = minutes * 60
            minutesAndSeconds += seconds 
            
            splitTimesInSeconds.push(minutesAndSeconds)
          }catch(error){
            console.log("ConversionError: Str to Int Conversion Error")
          }
      }
      return splitTimesInSeconds
    }

    function convertSecondsToMinutes(seconds){
      var strTotalTime = ''

      var minutes = Math.floor(seconds / 60) 
      var intMilliseconds = 0
      var strMinutes = minutes.toString();
      var strMilliseconds = ''
      var remainder = seconds % 60
      var millisecondsFactional = 0;

      if(remainder > 0){
          strRemainder = Math.floor(remainder).toString()
          strTotalTime = strMinutes + ":" + checkTime(strRemainder)
          millisecondsFactional = remainder % 1
          if(millisecondsFactional > 0){
            console.log("strTotalTime: " + strTotalTime);
            intMilliseconds = 60 * millisecondsFactional
            strMilliseconds = Math.ceil(intMilliseconds).toString()
            strTotalTime += ":" + checkTime(strMilliseconds)
          }
          else{
            strTotalTime += ":00"
          }
      }
      else{
        strTotalTime = strMinutes + ":00:00"
      }
      return strTotalTime 
    }

    function calculateMeanSplitTimes(splitTimes){
      var totalTime = 0;
      var numberOfSplits = 0;
      var meanSplitTimeInSeconds = 0;

      for(var i = 0; i < splitTimes.length; i++){
        totalTime += splitTimes[i]
        numberOfSplits = splitTimes.length
      }
      meanSplitTimeInSeconds = totalTime / numberOfSplits

      return convertSecondsToMinutes(meanSplitTimeInSeconds)
    }
  
    

    // Send a message when the form is submitted.
    form.onsubmit = function(e) {
      e.preventDefault();
  
      // Retrieve the message from the textarea.
      var splitTimesMessage = messageField.value;
      var splitTimesArr = splitTimesMessage.split(" ");
      
      // Clear out the message field.
      messageField.value = '';

      splitTimesArrLength = splitTimesArr.length
      var cliSplitTimes = []
      if(splitTimesArrLength > 1){
        for(var i = 1; i < splitTimesArrLength; i++){
          cliSplitTimes.push(splitTimesArr[i])
        }
        intTimes = convertStrTimesToIntTimes(cliSplitTimes)

        var avgSplitTime = calculateMeanSplitTimes(intTimes); 
        console.log("Mean split time: ");
        console.log(avgSplitTime);
        // Send the message through the WebSocket.
        if(avgSplitTime.includes("NaN")){
          sendErrorMessage("Invalid input, make sure to only enter numeric values. Please try again...");
        }else{
          sendMessage("Mean split time: " + avgSplitTime);
        }
     
      }
        
      else{
        sendMessage("Please enter your running split times in the following format MM:SS, with each separated by a space");
      }

      return false;
    };
};