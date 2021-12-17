/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */
$(document).ready(function () {

  const loadTweetsURL = "http://localhost:8080/tweets";

  //Use escape function to prevent vulnerabilities from XSS
  const escape = function (str) {
    let div = document.createElement("div");
    div.appendChild(document.createTextNode(str));
    return div.innerHTML;
  };

  //Event handler for new tweets
  $('#post-tweet').submit(function (event) {
    event.preventDefault()
    const text = $('#tweet-text').val()
    console.log(text);

    // Form validation to ensure tweet text exists and doesn't exceed character limit
    if (text === null || text === "") {
      $("#tweet-input").prepend(createErrorElement("Please enter a tweet. We want to hear you hum."));
      $("#error-message").slideDown(1000).hide(3500);
      return;
    }
    if (text.length > 140) {
      $("#tweet-input").prepend(createErrorElement("Tweet is too long. Please reduce no of chars to 140."));
      $("#error-message").slideDown(1000).hide(3500);
      return;
    }
    $.ajax({
      url: '/tweets',
      type: 'POST',
      data: $(this).serialize(),
      success: function (result) {
        $("#tweet-text").val("");
        $("#counter").val(140);
        loadTweet(loadTweetsURL);
      }
    });
  })


  //For each tweet object, render and prepend tweet element

  const renderTweets = function (tweets) {
    for (const tweet of tweets) {
      console.log(tweet)
      const newTweet = createTweetElement(tweet);
      $('#tweet-container').prepend(newTweet);
    }
  }

  //This methods takes string URL and sends "GET" request to load all data and renders them.

  const loadTweet = function () {
    console.log("hi");
    $.ajax({
      url: '/tweets',
      type: 'GET',
    })
      .then(function (results) {
        renderTweets(results);
        console.log(results);
      });

  }

  //Call to load past tweets onto page
  loadTweet();

  // This method takes error and renders that into a div element to display.
  const createErrorElement = function (data) {
    const errorElement = `
      <div class="error-message" id="error-message">
      <span class="error-text"> ${data}</span>
      </div>`;

    return errorElement;
  };

  // This method takes String tweet and validates and returns object based on that.
  const validateForm = function (tweet) {
    if (!tweet) {
      return { error: "Please enter valid tweet.", data: null };
    }
    if (tweet && tweet.length > 140) {
      return {
        error: "Tweet is too long. Please reduce no of chars to 140.",
        data: null,
      };
    }
    return { error: null, data: null };
  };

  //Create dynamic tweet element using DB

  const createTweetElement = function (tweets) {
    let $tweet = $(`<article class="tweet">
        <header >
          <div class="imgandname"> 
            <img src="${tweets.user.avatars}"/>
            <span class="username">${tweets.user.name}</span>
          </div>
          <span class="userhandle">${tweets.user.handle}</span>
        </header>
        <h3>${escape(tweets.content.text)}</h3>
        <footer class="tweet-footer">
          <h5>${timeago.format(tweets.created_at)} </h5>
          <div>
            <i class="fas fa-flag"></i>
            <i class="fas fa-retweet"></i>
            <i class="fas fa-heart"></i>
          </div>
        </footer>
      </article>`)
    return $tweet
  }
})



