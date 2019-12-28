var isTrucate = true;
function SeeMore(e) {
  if (isTrucate) {
    $("div.book-description").removeClass("Text-Truncate");
    $(e.target).text("Less");
    isTrucate = false;
  } else {
    $("div.book-description").addClass("Text-Truncate");
    $(e.target).text("More");
    isTrucate = true;
  }
}

function SeeMoreReview(e) {
  var id = e.target.id;
  var ReviewSelector = `p#${id}`;
  var isReviewTrucate = $(ReviewSelector).hasClass("Text-Truncate");
  if (isReviewTrucate) {
    $(ReviewSelector).removeClass("Text-Truncate");
    $(e.target).text("Less");
    isTrucate = false;
  } else {
    $(ReviewSelector).addClass("Text-Truncate");
    $(e.target).text("More");
    isTrucate = true;
  }
}

function WantToRead(e) {
  var target = e.target;
  $(target)
    .addClass("btn-light text-warning font-weight-bold")
    .removeClass("btn-success border-right");
}
