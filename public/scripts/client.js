/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */
     $(document).ready(function() {


    //   const tweetData = {
    //     "user": {
    //       "name": "Newton",
    //       "avatars": "https://i.imgur.com/73hZDYK.png",
    //         "handle": "@SirIsaac"
    //       },
    //     "content": {
    //         "text": "If I have seen further it is by standing on the shoulders of giants"
    //       },
    //     "created_at": 1461116232227
    //  }
    
    //   const data = [
    //     {
    //       "user": {
    //         "name": "Newton",
    //         "avatars": "https://i.imgur.com/73hZDYK.png"
    //         ,
    //         "handle": "@SirIsaac"
    //       },
    //       "content": {
    //         "text": "If I have seen further it is by standing on the shoulders of giants"
    //       },
    //       "created_at": 1461116232227
    //     },
    //     {
    //       "user": {
    //         "name": "Descartes",
    //         "avatars": "https://i.imgur.com/nlhLi3I.png",
    //         "handle": "@rd" },
    //       "content": {
    //         "text": "Je pense , donc je suis"
    //       },
    //       "created_at": 1461113959088
    //     }
    //   ]

      //Event handler for new tweets
      $('#post-tweet').submit(function(event){
      event.preventDefault()
      const text = $('#tweet-text').val()

      // Form validation to ensure tweet text exists and doesn't exceed character limit
      if (text === null || text === "") {
      alert("Please enter a tweet. We want to hear you hum.");
    } else {
      $.ajax({
        url : '/tweets',         
        type : 'POST',         
        data : $(this).serialize(),       
         success : function(result){             
           loadTweet()      
           }   
            });
      
    }
      
      }) 

      

    // $.post('/tweets', serializedData)

  // })

      //For each tweet object, render and prepend tweet element
      
      const renderTweets = function(tweets) {         
        for (const tweet of tweets) {
          console.log(tweet)
          const newTweet = createTweetElement(tweet);
          $('#tweet-container').prepend(newTweet);
        }
      }

      //This methods takes string URL and sends "GET" request to load all data and renders them.

      const loadTweet = function() {
        console.log("hi");
        $.ajax({        
          url : '/tweets',         
          type : 'GET',
        })                             
          .then(function(results){             
            renderTweets(results); 
            console.log(results);      
           });
            
             }
             //Call to load past tweets onto page
      loadTweet();
            

      

    
       //Create dynamic tweet element using DB

      const createTweetElement = function(tweets) {
        console.log(tweets);
        let $tweet = $(`<article class="tweet">
        <header >
          <div class="imgandname"> 
            <img src="${tweets.user.avatars}"/>
            <span class="username">${tweets.user.name}</span>
          </div>
          <span class="userhandle">${tweets.user.handle}</span>
        </header>
        <h3>${tweets.content.text}</h3>
        <footer>
          <h5>${timeago.format(tweets.created_at)} </h5>
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
      // renderTweets(data);
    })
    
      