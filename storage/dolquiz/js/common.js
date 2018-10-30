//jQuery가 로딩되어 있어야 함
function loadQuiz(cardAll) {
  var url = "https://jinh0park.github.io/storage/cardimg-cropped/";


  var choicesIndex = _.sampleSize(_.range(cardCount), 9);
  var cards = []
  for (i in choicesIndex) {
    var card = cardAll[choicesIndex[i]];
    cards.push([choicesIndex[i], card.id, card.name]);
  }
  var answerCard = cards[Math.floor(Math.random() * 9)];
  $("#name").html('<b> Q.' + answerCard[2] + '</b>');

  $(".thumb").each(function(index, item) {
    $(item).attr("src", url + cards[index][1] + ".png").attr("card-id", cards[index][0])
  });
};

function preloadImages(){
  var url = "https://jinh0park.github.io/storage/cardimg-cropped/";
  for(i in cardAll){
    var img = new Image();
    img.src = url + cardAll[i].id + ".png";
  }
}

function loadAllCards(){
  var cardAll
  $.ajax({
    dataType: 'json',
    url: './cards.collectible.json',
    data: '',
    async: false,
    success: function(data) {
      cardAll = data;
    }
  });
  return cardAll;
}
