/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */
     $(document).ready(function() {


      const tweetData = {
        "user": {
          "name": "Newton",
          "avatars": "https://i.imgur.com/73hZDYK.png",
            "handle": "@SirIsaac"
          },
        "content": {
            "text": "If I have seen further it is by standing on the shoulders of giants"
          },
        "created_at": 1461116232227
     }
    
      const data = [
        {
          "user": {
            "name": "Newton",
            "avatars": "https://i.imgur.com/73hZDYK.png"
            ,
            "handle": "@SirIsaac"
          },
          "content": {
            "text": "If I have seen further it is by standing on the shoulders of giants"
          },
          "created_at": 1461116232227
        },
        {
          "user": {
            "name": "Descartes",
            "avatars": "https://i.imgur.com/nlhLi3I.png",
            "handle": "@rd" },
          "content": {
            "text": "Je pense , donc je suis"
          },
          "created_at": 1461113959088
        }
      ]

      //For each tweet object, render and prepend tweet element
      const renderTweets = function(tweets) {         
        for (const tweet of tweets) {
          console.log(tweet)
          const newTweet = createTweetElement(tweet);
          $('#tweet-container').prepend(newTweet);
        }
      }
       //Create dynamic tweet element using DB
      const createTweetElement = function(tweets) {
        console.log(tweets);
        let $tweet = $(`<article class="tweet">
        <header >
          <div class="imgandname"> 
            <img src="${tweetData.user.avatars}"/>
            <span class="username">${tweetData.user.name}</span>
          </div>
          <span class="userhandle">${tweetData.user.handle}</span>
        </header>
        <h3>${tweetData.content.text}</h3>
        <footer>
          <h5>${timeago.format(tweetData.created_at)} </h5>
          <div class="icons">
            <i class="fas fa-flag"></i>
            <i class="fas fa-retweet"></i>
            <i class="fas fa-heart"></i>
          </div>
        </footer>
      </article>`)
      // let tweetElement = $tweet.append('#tweet-container');
      // return tweetElement;
      return $tweet
      }
      renderTweets(data);
    });
    

      