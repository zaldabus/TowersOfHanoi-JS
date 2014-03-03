(function (root) {
  var Hanoi = root.Hanoi = (root.Hanoi || {});

  var Game = Hanoi.Game = function (displayStacks) {
    this.displayStacks = displayStacks;
    this.towers = [[3, 2, 1], [], []];
    this.firstclick = undefined;
    this.secondclick = undefined;
  };

  Game.prototype.handleClick = function ($clickStack) {
    if (this.firstclick) {
      this.secondclick = $clickStack;
      var secondId = parseInt(this.secondclick.attr("id"));
      var firstId = parseInt(this.firstclick.attr("id"));
      if(this.move(firstId, secondId)){
        this.render();
      }
      if(this.isWon()){
        console.log("Secret win!")
      }
      this.firstclick = undefined;
      this.secondclick = undefined;
    } else {
     this.firstclick = $clickStack;
     //highlight first tower
    }
  }

  Game.prototype.isWon = function () {
    // move all the discs to the last tower
    return (this.towers[2].length == 3) || (this.towers[1].length == 3);
  };

  Game.prototype.isValidMove = function (startTowerIdx, endTowerIdx) {
    var startTower = this.towers[startTowerIdx];
    var endTower = this.towers[endTowerIdx];

    if (startTower.length === 0) {
      return false;
    } else if (endTower.length == 0) {
      return true;
    } else {
      var topStartDisc = startTower[startTower.length - 1];
      var topEndDisc = endTower[endTower.length - 1];
      return topStartDisc < topEndDisc;
    }
  };

  Game.prototype.move = function (startTowerIdx, endTowerIdx) {
    if (this.isValidMove(startTowerIdx, endTowerIdx)) {
      this.towers[endTowerIdx].push(this.towers[startTowerIdx].pop());
      return true;
    } else {
      return false;
    }
  };

  Game.prototype.render = function(){
    var $disc = $(this.firstclick.children().not('.invisible')[0]);
    var $place = $(this.secondclick.children().filter('.invisible').last());

    var discSize = $disc.attr('class');

    $place.removeClass('invisible').addClass(discSize);
    $disc.removeClass(discSize).addClass('invisible');
  }


  $(document).ready(function(){
    var Game = new root.Hanoi.Game($('div'));
    $('div').on("click", "ul", function() {
      var $clickedStack = $(this)
      Game.handleClick($clickedStack);
    });
  })

})(this);

// this.Hanoi.Game is a constructor function, so we instantiate a new object, then run it.
