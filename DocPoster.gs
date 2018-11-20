function postingEntry(messages, previousMessage){
   Logger.log('postingEntry(): ' + "postingEntry was called");

  // Reversing arrays so they can display the messages in ascending order
   messages.reverse();
   
  // Open a document by ID.
  var doc = DocumentApp.openById('1FanCmEyv8iBUmvXzegg1VbDULla4YSjxSz3agz5S7XY');
  
  for(var i = 0; i< messages.length; i++){
    var currentMessage = messages[i];
    
    // If the message is a thought, post entry in thoughts doc
    if (currentMessage.isThought == true){
      doc = DocumentApp.openById('1_TgHUEy5OEftO1-VIZu84DkeKEpDejaUAvSmXs58y8E');
    } 
    // If the message is a dream, post entry in Dreams doc
    else if(currentMessage.isDream == true){
      doc = DocumentApp.openById('1hiAK6yggWwrC9t-spa2QAswYhesLQiaPpCEG_PpdNhY');
    }
  
  
    var body = doc.getBody();
    var date = currentMessage.date;
    const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    var month = monthNames[date.getMonth()];
    const dayNames = ['Sunday', 'Monday', 'Tuesday', 'Wednesday','Thursday', 'Friday', 'Saturday'];
    var weekDay = dayNames[date.getDay()];
    var dateDay = date.getDate();
    var year = date.getYear();
    
    var Lmonth = monthNames[previousMessage.getMonth()];
    var LdateDay = previousMessage.getDate();
    var Lyear = previousMessage.getYear();
    
    if(currentMessage.addDate == true || !((LdateDay == dateDay) &&(Lmonth == month)&&(Lyear == year))){
    // Append date of entry
    var monthDayYear = body.appendParagraph(weekDay +', '+ month+ " "+ dateDay + ", "+ year);
    monthDayYear.setHeading(DocumentApp.ParagraphHeading.HEADING3);
    monthDayYear.setAlignment(DocumentApp.HorizontalAlignment.RIGHT);
    body.appendHorizontalRule();
    }
    
   //    body.appendHorizontalRule();

    
    // Get local hours and minutes
    var localeSpecificTime = date.toLocaleTimeString();   
    var localTimeParagraph;
    
    
     // Append title to the document, if included
     
   if(currentMessage.title != null){
    var docTitle = body.appendParagraph(currentMessage.title + " - "+ localeSpecificTime);
    docTitle.setHeading(DocumentApp.ParagraphHeading.HEADING4);
   } else{
    localTimeParagraph = body.appendParagraph(localeSpecificTime);
    localTimeParagraph.setHeading(DocumentApp.ParagraphHeading.HEADING4);
   }
    
    var image = currentMessage.image;
    
    // If there is an image then ...
    if(image != null){
    
      // Append image
      var newImage= body.appendImage(image);
      newImage.setWidth(newImage.getWidth()*0.1);
      newImage.setHeight(newImage.getHeight() *0.1);
    

    } // If not then... 
    else {
      // Appending entry
  //    body.appendParagraph(currentMessage.text);
      var par = body.appendParagraph(currentMessage.text);
      par.setHeading(DocumentApp.ParagraphHeading.NORMAL);

    }
    
   }
   }
