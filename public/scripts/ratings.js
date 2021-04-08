// const likeUrl = 'http://localhost:8080/resources/ratings'

$(document).ready(function() {

  // $(".like").on("submit", function(event) {
  //   console.log(event);
  //   console.log('something#########')
  //   event.preventDefault();
  //   //event.stopPropagation();
  //   const $likeValue = $('#like-button-value');
  //   console.log('888888888888888', $likeValue.val('false'))
  //   console.log('likesValue', $likeValue.val())

  //   const data = $(this).serialize();
  //   return $.ajax({
  //     url: likeUrl,
  //     method: "POST",
  //     data: data
  //   }).then(function(data) {
  //     console.log('POST ajax callback called');
  //     console.log('ajax-data:',data);
  //     $likeValue.addClass('like-color');
  //     return $likeValue.val();
  //   }).catch(error => {
  //       console.error(error)
  //   })

  // });

  $(".get-average").click(function() {
    let id = $(this).data('resource');
    const that = this;
    // let $appen = $(this).data('re');
    // let $avgRate = $(this).siblings(".average-rating").find(".get-average");
    console.log(id);
    console.log('this', $(this).siblings(".average-rating").find(".get-average"),'this')
    $.ajax({
      url: '/resources/ratings/avg',
      method: 'POST',
      data: {
        id
      }
    }).then(function(data) {
      let rating = Math.round(data.avgratings * 10) / 10;
      $(that).siblings(".average-rating").empty();
      $(that).siblings(".average-rating").append(`<p>Average rating: ${rating}</p>`)
      // $appen.append(`<p>Average rating: ${rating}</p>`)
    })
  })
});
