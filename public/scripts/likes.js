const likeUrl = "http://localhost:8080/resources/likes";

$(document).ready(function () {
  // const $textLengthError = $('#text-length-error');

  // const likeResources = function(tweets) {

  //   $tweetContainer.empty();

  //   for (const tweet of tweets) {
  //     let createdTweet = createTweetElement(tweet)
  //     $tweetContainer.prepend(createdTweet);
  //     console.log('file is running');
  //   }
  // }

  $(".like").on("submit", function (event) {
    //console.log('something#########')
    event.preventDefault();
    //event.stopPropagation();
    console.log($(event.target).find(".fa-heart"));
    const $likeValue = $("#like-button-value");
    //console.log('888888888888888', $likeValue.val('false'))
    //console.log('likesValue', $likeValue.val())
    // const getLikesValue = () => {

    //   if ($likeValue.val() === 'true') {
    //     return $likeValue.val('false');
    //   } else {
    //     return $likeValue.val('true');
    //   }
    // };
    // const $characterCount = $(this).find(".counter")

    // if ($tweetText.val().length > 140) {
    //   $textLengthError.slideDown();
    //   return;
    // }

    // if ($tweetText.val() === null || $tweetText.val() === '') {
    //   $emptyTextError.slideDown();
    //   return;
    // }
    // if ($("#completed-task").val() === 0) {
    //   console.log('it worked')
    // }
    const data = $(this).serialize();
    return $.ajax({
      url: likeUrl,
      method: "POST",
      data: data,
    })
      .then(function (data) {
        console.log("POST ajax callback called");
        console.log("ajax-data:", data);
        console.log("this---", $(this));
        $(event.target).find(".fa-heart").addClass("like-color");
        console.log($likeValue, "likevalue**********");
        return $likeValue.val();
      })
      .catch((error) => {
        console.error(error);
      });
  });
});
