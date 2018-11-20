// Handles HTML tags 
 function getTextFromHtml(html) {
       html=html.replace(/<\/div>/ig, '\n');
       html=html.replace(/<\/li>/ig, '\n');
       html=html.replace(/<li>/ig, '  *');
       html=html.replace(/<\/ul>/ig, '\n');
       html=html.replace(/<\/p>/ig, '\n');
       html=html.replace(/<br\/?>/ig, '');
       html=html.replace(/<[^>]+>/ig, '');
       html=html.replace(/&#39;/g, "'");
       html=html.replace(/&quot;/g, '"');
       html=html.replace(/&nbsp;/g, "\n\n");
       return html;
       Logger.log('getTextFromHtml(): '+ 'called');


}
