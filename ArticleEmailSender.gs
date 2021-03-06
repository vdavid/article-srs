var ArticleEmailSender = function(options) {
  options = options || {};
  
  /**
  * Builds an HTML email body from the given set of articles.
  *
  * @param {Object[]} articles
  * @return {string} The full assembled HTML.
  */
  this.convertArticlesToHtml = function(articles) {
    const body = articles.reduce(function(result, article) {
        const categoryHeader = (article.category === result.lastCategory)
            ? ''
            : (result.lastCategory ? '</ul>\n' : '') + getCategoryHeader(article.category);
        
        return {html: result.html + categoryHeader + convertArticleToHtml(article),
                lastCategory: article.category};
      }, {html: '', lastCategory: ''}).html + '</ul>';
    
    return assembleEmailHeader() + body + assembleEmailFooter();
  }
  
  function assembleEmailHeader() {
    const css = '    li { list-style:none; margin-left:0; border-left:4px solid; padding-left:5px; margin-bottom:2px; }\n'
    + 'li.rating1 { border-left-color:#cc4125; }\n'
    + 'li.rating2 { border-left-color:#D86735; }\n'
    + 'li.rating3 { border-left-color:#E58D45; }\n'
    + 'li.rating4 { border-left-color:#F2B355; }\n'
    + 'li.rating5 { border-left-color:#ffd966; }\n'
    + 'li.rating6 { border-left-color:#D8D57C; }\n'
    + 'li.rating7 { border-left-color:#D4D16F; }\n'
    + 'li.rating8 { border-left-color:#BFCD73; }\n'
    + 'li.rating9 { border-left-color:#A9C978; }\n'
    + 'li.rating10 { border-left-color:#93c47d; }\n';
    
    return '<html><head><style>' + css + '</style></head><body>';
  }
  
  function getCategoryHeader(category) {
    return '<h2>' + category.charAt(0).toUpperCase() + category.substring(1) + '</h2>\n'
      + '<ul>\n';
  }
  
  function convertArticleToHtml(article) {
    /* Pre-formats parts of the line of data */
    const titleLink = '<strong><a href="' + article.url + '">' + escapeHtml(article.title) + '</a></strong>';
    const authorInfo = (article.authors[0] ? (' <em>by ' + article.authors.join(', ') + '</em>') : '');
    const objectiveProperties = [];
    if (article.publicationDate) { objectiveProperties.push(article.publicationDate.toISOString().substring(0, 10)); }
    if (article.minutes) { objectiveProperties.push(article.minutes + ' minutes'); }
    const subjectiveProperties = ['Read date: ' + article.readDate.toISOString().substring(0, 10), 'Rating: ' + article.rating + ' / 10'];
    const pocketUrl = "https://getpocket.com/edit?url=" + article.url;
    
    /* Assembles <li> */
    return '<li class="rating' + article.rating + '">' + titleLink + authorInfo + (objectiveProperties.length ? (' (' + objectiveProperties.join(', ') + ')') : '') + '<br />'
    + escapeHtml(article.review) + '<br />'
    + '<em>(' + subjectiveProperties.join(', ') + ')</em> — <a class="pocketLink" href="' + pocketUrl + '">Add to Pocket</a></li>\n'
  }
  
  function assembleEmailFooter() {
    return '</body></html>';
  }
  
  function escapeHtml(string) {
     return string.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
  }
  
  /**
  * Sends an email from "Article SRS bot" to the given recipients and content
  * 
  * @param {string[]} recipients Email addresses of recipients
  * @param {string} body HTML body to send.
  */
  this.sendEmail = function(recipients, body) {
    const senderName = 'Article SRS bot';
    const subject = '[Article digest] Your daily article reviews for ' + (new Date()).toISOString().substring(0, 10);
    MailApp.sendEmail('', subject, '', {
      name: senderName,
      htmlBody: body,
      bcc: recipients.join(',')
    });
  }
}
