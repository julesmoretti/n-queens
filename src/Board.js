// This file is a Backbone Model (don't worry about what that means)
// It's part of the Board Visualizer
// The only portions you need to work on are the helper functions (below)

(function() {

  window.Board = Backbone.Model.extend({

    initialize: function (params) {
      if (_.isUndefined(params) || _.isNull(params)) {
        console.log('Good guess! But to use the Board() constructor, you must pass it an argument in one of the following formats:');
        console.log('\t1. An object. To create an empty board of size n:\n\t\t{n: %c<num>%c} - Where %c<num> %cis the dimension of the (empty) board you wish to instantiate\n\t\t%cEXAMPLE: var board = new Board({n:5})', 'color: blue;', 'color: black;','color: blue;', 'color: black;', 'color: grey;');
        console.log('\t2. An array of arrays (a matrix). To create a populated board of size n:\n\t\t[ [%c<val>%c,%c<val>%c,%c<val>%c...], [%c<val>%c,%c<val>%c,%c<val>%c...], [%c<val>%c,%c<val>%c,%c<val>%c...] ] - Where each %c<val>%c is whatever value you want at that location on the board\n\t\t%cEXAMPLE: var board = new Board([[1,0,0],[0,1,0],[0,0,1]])', 'color: blue;', 'color: black;','color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: grey;');
      } else if (params.hasOwnProperty('n')) {
        this.set(makeEmptyMatrix(this.get('n')));
      } else {
        this.set('n', params.length);
      }
    },

    rows: function() {
      return _(_.range(this.get('n'))).map(function(rowIndex) {
        return this.get(rowIndex);
      }, this);
    },

    togglePiece: function(rowIndex, colIndex) {
      this.get(rowIndex)[colIndex] = + !this.get(rowIndex)[colIndex];
      this.trigger('change');
    },

    _getFirstRowColumnIndexForMajorDiagonalOn: function(rowIndex, colIndex) {
      return colIndex - rowIndex;
    },

    _getFirstRowColumnIndexForMinorDiagonalOn: function(rowIndex, colIndex) {
      return colIndex + rowIndex;
    },

    hasAnyRooksConflicts: function() {
      return this.hasAnyRowConflicts() || this.hasAnyColConflicts();
    },

    hasAnyQueenConflictsOn: function(rowIndex, colIndex) {
      return (
        this.hasRowConflictAt(rowIndex) ||
        this.hasColConflictAt(colIndex) ||
        this.hasMajorDiagonalConflictAt(this._getFirstRowColumnIndexForMajorDiagonalOn(rowIndex, colIndex)) ||
        this.hasMinorDiagonalConflictAt(this._getFirstRowColumnIndexForMinorDiagonalOn(rowIndex, colIndex))
      );
    },

    hasAnyQueensConflicts: function() {
      return this.hasAnyRooksConflicts() || this.hasAnyMajorDiagonalConflicts() || this.hasAnyMinorDiagonalConflicts();
    },

    _isInBounds: function(rowIndex, colIndex) {
      return (
        0 <= rowIndex && rowIndex < this.get('n') &&
        0 <= colIndex && colIndex < this.get('n')
      );
    },


/*
         _             _     _
     ___| |_ __ _ _ __| |_  | |__   ___ _ __ ___ _
    / __| __/ _` | '__| __| | '_ \ / _ \ '__/ _ (_)
    \__ \ || (_| | |  | |_  | | | |  __/ | |  __/_
    |___/\__\__,_|_|   \__| |_| |_|\___|_|  \___(_)

 */
    /*=========================================================================
    =                 TODO: fill in these Helper Functions                    =
    =========================================================================*/

    // ROWS - run from left to right
    // --------------------------------------------------------------
    //
    // test if a specific row on this board contains a conflict

    hasRowConflictAt: function(rowIndex) {
      var array = this.get(rowIndex);

      if( array.length > 1 ){
        for( var i = 0; i < array.length - 1; i++ ){
          for( var j = i + 1 ; j < array.length; j++ ){
            if( ( array[i] === 1 ) && ( array[i] === array[j] ) ){
              return true;
            }
          }
        }
      }

      return false;
    },


    // test if any rows on this board contain conflicts
    hasAnyRowConflicts: function() {
      var numbOfRow = this.get('n');

      for( var i = 0; i < numbOfRow; i++ ){
        var rowCheck = this.hasRowConflictAt(i);
        if( rowCheck === true ){
          return true;
        }
      }

      return false;
    },


    // COLUMNS - run from top to bottom
    // --------------------------------------------------------------
    //
    // test if a specific column on this board contains a conflict
    hasColConflictAt: function(colIndex) {
      var array = this.get(colIndex);
      if( array.length > 1 ){
        for( var i = 0; i < array.length - 1; i++ ){
          var a = this.get(i);
          for( var j = i + 1 ; j < array.length; j++ ){
            var b = this.get(j);
            if( ( a[colIndex] === 1 ) && ( a[colIndex] === b[colIndex] ) ){
              return true;
            }
          }
        }
      }

      return false;
    },

    // test if any columns on this board contain conflicts
    hasAnyColConflicts: function() {
      var numbOfCol = this.get('n');

      for( var i = 0; i < numbOfCol; i++ ){
        var colCheck = this.hasColConflictAt(i);
        if( colCheck === true ){
          return true;
        }
      }

      return false;
    },



    // Major Diagonals - go from top-left to bottom-right
    // --------------------------------------------------------------
    //
    // test if a specific major diagonal on this board contains a conflict
    hasMajorDiagonalConflictAt: function(majorDiagonalColumnIndexAtFirstRow) {
      var temp = this.get(0)
      var board = []

      for( var x = 0; x < temp.length; x++ ){
        temp = this.get(x);
        board.push(temp);
      }

      var n = board.length;
      var a = 0;
      var b = majorDiagonalColumnIndexAtFirstRow;

      var counter = 0;
      for( var i = 0; i < n; i++ ){

        if( board[a][b] === 1 ){
          if( b >= 0 || b < n ){
            counter++;
            if( counter > 1 ){
              return true;
            }
          }
        }
        a++;
        b++;
      }

      return false; // fixme
    },

    // test if any major diagonals on this board contain conflicts
    hasAnyMajorDiagonalConflicts: function() {
      var temp = this.get(0)
      var board = []

      for( var x = 0; x < temp.length; x++ ){
        temp = this.get(x);
        board.push(temp);
      }

      var n = board.length;

      var start = 1 - n;
      for( var i = start; i < n; i++ ){
        if( this.hasMajorDiagonalConflictAt(i) ){
          return true;
        }
      }

      return false; // fixme
    },

    // Minor Diagonals - go from top-right to bottom-left
    // --------------------------------------------------------------
    //
    // test if a specific minor diagonal on this board contains a conflict
    hasMinorDiagonalConflictAt: function(minorDiagonalColumnIndexAtFirstRow) {
      var temp = this.get(0)
      var board = []

      for( var x = 0; x < temp.length; x++ ){
        temp = this.get(x);
        board.push(temp);
      }

      var n = board.length;

      var a = 0;
      var b = minorDiagonalColumnIndexAtFirstRow;

      var counter = 0;
      for( var i = 0; i < n; i++ ){

        if( board[a][b] === 1 ){
          if( b >= 0 || b < n ){
            counter++;
            if( counter > 1 ){
              return true;
            }
          }
        }
        a++;
        b--;
      }

      return false; // fixme
    },

    // test if any minor diagonals on this board contain conflicts
    hasAnyMinorDiagonalConflicts: function() {
      var temp = this.get(0)
      var board = []

      for( var x = 0; x < temp.length; x++ ){
        temp = this.get(x);
        board.push(temp);
      }

      var n = board.length;

      var cap = ( n * 2 ) - 2;

      for( var i = 0; i < cap; i++ ){
        if( this.hasMinorDiagonalConflictAt(i) ){
          return true;
        }
      }

      return false; // fixme
    }

    /*--------------------  End of Helper Functions  ---------------------*/


  });

  var makeEmptyMatrix = function(n) {
    return _(_.range(n)).map(function() {
      return _(_.range(n)).map(function() {
        return 0;
      });
    });
  };

}());

// hasMinorDiagonalConflictAt(0);