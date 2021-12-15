/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

$(() => {

    const loadTweetsURL = "http://localhost:8080/tweets";
    /**
     * Entered tweet is converted to HTML and returned.
     * @param {String} str
     * @returns HTML
     */
    const escape = function(str) {
      let div = document.createElement("div");
      div.appendChild(document.createTextNode(str));
      return div.innerHTML;
    };
  
    /**
     * THis method takes tweet object and returns String literal by rendering tweet element into HTML.
     * @param {Object} data
     * @returns
     */
    const createTweetElement = function(data) {
      const tweet = `
    <article class="article">
    <header class="tweet-header">
      <div class="tweet-profile-pic">
        <img src="${data.user.avatars}">
        <span>${data.user.name}</span>
      </div>
      <div class="watemark">
        ${data.user.handle}
      </div>
    </header>
      <div>
      <p>${escape(data.content.text)}</p>
      </div>
      <div class="divider">
      </div>
    <footer class="tweet-footer">
      <div>
        ${timeago.format(data.created_at)}
      </div>
      <div>
        <i class="fa-solid fa-flag"></i>
        <i class="fa-solid fa-retweet"></i>
        <i class="fa-solid fa-heart"></i>
      </div>
    </footer>
  </article>`;
  
      return tweet;
    };

