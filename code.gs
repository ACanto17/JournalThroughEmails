
function JournalEntry() { 
  
  // Array with new messages
  var messages = [];
  var previousMessageDate = [];
  
  // Gets number of unread mesages
  var unreadMessagesCount = GmailApp.getInboxUnreadCount();
  
  if (unreadMessagesCount<1) return;
  
  // Running methods
  gettingEntry(unreadMessagesCount,messages, previousMessageDate);
  postingEntry(messages, previousMessageDate[0]);
}
   
  
 
