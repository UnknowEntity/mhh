//var $ = require("jquery");
$(document).ready(function() {
  $("div.stars-inner").each(function() {
    let rating = $(this).attr("rating");
    console.log(rating);
    rating = (rating / 5) * 100;
    $(this).css("width", `${rating}%`);
  });
});
