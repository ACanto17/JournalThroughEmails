 function gettingEntry(unreadMessagesCount, messages, previousMessageDate) {
    var addDate = false;
    var isThought = false;
    var imageAttachment = null;
    var title = null;
    var isDream = null;
     
    Logger.log('gettingEntry(): '+"Total of unread messages: "+unreadMessagesCount);
   // Gets email threads
   var threads = GmailApp.getInboxThreads(0,unreadMessagesCount+1);
   
   // Gets thread previous to unread messages
   var prevoiousThread = threads[unreadMessagesCount].getMessages()[0];
   
   for(var i = 0; i <unreadMessagesCount; i++){
     var message = threads[i].getMessages()[0];
     var sender = message.getFrom();
     
     if(sender == 'no-reply@accounts.google.com' ){
       threads[i].markRead();
       return;
     }
   
    // Getting bodies and dates of messages
     var subject = message.getSubject();    
     var body1 = message.getBody();
     Logger.log("Subject: "+subject);
  
     // Turn HTML into a string
     body1 = getTextFromHtml(body1);
     
     // Get datte
     var date = message.getDate();
     // Getting attachments of messages
     imageAttachment = message.getAttachments()[0];
     
     //Mark message as read
     threads[i].markRead();
    
   // Checks if it is a thought
         var patt1 = '#thoughts';
         var pat12 = '#thought';
         var testThought = body1.search(patt1);
         var testThought2 = body1.search(pat12);
         if (testThought != -1 || testThought2 != -1){
           isThought = true;
           Logger.log('gettingEntry(): '+"It is a thought");
           body1 = body1.replace(patt1,'');
           } else if (testThought2 != -1){
           isThought = true;
           Logger.log('gettingEntry(): '+"The message is a thought");
           body1 = body1.replace(pat12,'');
         } 
         
     // Checks if it is a dream 
          var dreamTag = '#dream'; 
          var dreamTest = body1.search(dreamTag); 
          if(dreamTest != -1){
            isDream = true;
            Logger.log('gettingEntry(): '+ "The message is a is a dream");
            body1 = body1.replace(dreamTag,'');
          }      
         
      // Checks if date stamp is requested 
          var patt2 = '#date'; 
          var testDate = body1.search(patt2); 
          if(testDate != -1){
            addDate = true;
            Logger.log('gettingEntry(): '+ "Date stamp requested");
            body1 = body1.replace(patt2,'');
          }
          
   
   // Gets message title, if included
   if (subject != ""){
     title = subject;
    
   }    
   
   // Triming text
   body1 = body1.trim();
   
   // Instantiating message object
   var messageToken = new MessageObject(body1, date, imageAttachment, isThought, addDate, title, isDream);
   
   // Appending message objects to array
     messages.push(messageToken);
     
   // Appending date of message prevous to read messages
     previousMessageDate.push(prevoiousThread.getDate());
   }
 }
