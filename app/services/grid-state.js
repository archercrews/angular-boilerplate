(function(){
'use strict';

angular
  .module('myApp')
  .service('gridState', gridStateService);

    gridStateService.$inject = ['Tile'];
    function gridStateService(Tile) {
      var grid = [
        [new Tile(0,0), new Tile(1,0), new Tile(2,0)],
        [new Tile(0,1), new Tile(1,1), new Tile(2,1)],
        [new Tile(0,2), new Tile(1,2), new Tile(2,2)]
      ];
      var service = {
        grid: grid,
        tileChanged: function(tile){
          // Switches the clicked tile
          tile.toggle();

          var tiles = _.flatten(grid);

          _.each(getSurroundingCoordinates(tile), function(coordinate) {
              var otherTile = _.find(tiles, function(t) {
                return t.x == coordinate.x && t.y == coordinate.y;
              });
              if(otherTile){
                otherTile.toggle();
              }
          });
        }
      };
      function getSurroundingCoordinates(tile){
        var surroundingCoordinates = [];

         surroundingCoordinates.push({ x: tile.x -1, y: tile.y });
         surroundingCoordinates.push({ x: tile.x +1, y: tile.y });
         surroundingCoordinates.push({ x: tile.x, y: tile.y -1 });
         surroundingCoordinates.push({ x: tile.x, y: tile.y +1 });

         return surroundingCoordinates;
      };


      return service;
    }
})();
