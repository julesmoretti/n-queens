/*           _
   ___  ___ | |_   _____ _ __ ___
  / __|/ _ \| \ \ / / _ \ '__/ __|
  \__ \ (_) | |\ V /  __/ |  \__ \
  |___/\___/|_| \_/ \___|_|  |___/

*/

// hint: you'll need to do a full-search of all possible arrangements of pieces!
// (There are also optimizations that will allow you to skip a lot of the dead search space)
// take a look at solversSpec.js to see what the tests are expecting


// return a matrix (an array of arrays) representing a single nxn chessboard, with n rooks placed such that none of them can attack each other

window.findNRooksSolution = function(n) {
  if( n === 0 ){
    return undefined;
  }

  var ArrayGen = function(value){
    var array = [];
    for( var i = 0; i < value; i++ ){
      array.push(0);
    }
    return array;
  }

  var boardGen = function(value){
    var board = [];
    for( var i = 0; i < value; i++ ){
      board.push( ArrayGen(value) );
    }
    return board;
  }

  var board = boardGen(n);

  var matrixSol = function(depth){
    if( depth !== 0 ) {
      for( var i = 0; i < n; i++ ){
        board[i][i] = 1;
      }
    }
    return board;
  }
  var solution = matrixSol(n);

  console.log('Single solution for ' + n + ' rooks:', JSON.stringify(solution));
  return solution;
};



// return the number of nxn chessboards that exist, with n rooks placed such that none of them can attack each other
window.countNRooksSolutions = function(n) {

  var solutionCount = 0;

  var board = new Board({n:n});

  var findSolution = function(board, cols, row){

    if (row === cols ){
      solutionCount++
      return;
    }

    for( var i = 0; i < cols; i++ ){
      board.togglePiece(row, i);

      if ( !board.hasAnyRooksConflicts() ){
        findSolution(board, cols, row+1);
      }

      board.togglePiece(row, i);
    }
  }

  findSolution(board, n, 0);

  // console.log('Number of solutions for ' + n + ' rooks:', solutionCount)
  return solutionCount;
  // if (n === 0){
  //   return undefined;
  // }

  // // Creates an array of n index with value 0 in each index.
  // var ArrayGen = function(value){
  //   var array = [];
  //   for( var i = 0; i < value; i++ ){
  //     array.push(0);
  //   }
  //   return array;
  // }

  // // Creates a board of n arrays.
  // var boardGen = function(value){
  //   var board = [];
  //   for( var i = 0; i < value; i++ ){
  //     board.push(ArrayGen(value));
  //   }
  //   return board;
  // }

  // // Checks a column for duplicate of value 1.
  // var hasColConflictAt = function(board, colIndex) {
  //   var array = board[colIndex];
  //   if( array.length > 1 ){
  //     for( var i = 0; i < array.length - 1; i++ ){
  //       var a = board[i];
  //       for( var j = i + 1 ; j < array.length; j++ ){
  //         var b = board[j];
  //         if( ( a[colIndex] === 1 ) && ( a[colIndex] === b[colIndex] ) ){
  //           return true;
  //         }
  //       }
  //     }
  //   }
  //   return false;
  // }

  // // Checks a board for column duplicates of value 1.
  // var hasAnyColConflicts = function(array) {
  //   // console.log(array);
  //   for( var i = 0; i < array.length; i++ ){
  //     var colCheck = hasColConflictAt(array, i);
  //     if( colCheck === true ){
  //       return true;
  //     }
  //   }

  //   return false;
  // }

  // // board creation
  // var board = boardGen(n);

  // // combination count;
  // var result = 0;

  // // Recursive board iterations.
  // var solution = function(depth){
  //   if ( depth !== 1 ) {
  //     for (var i = 0; i < n; i++ ){
  //       var colIndex = n - (depth);
  //       // console.log(colIndex);
  //       board[colIndex][i] = 1;
  //       if( !hasAnyColConflicts(board) ){
  //         solution( depth - 1);
  //       }
  //       board[colIndex][i] = 0;
  //     }
  //   } else {
  //     console.log("board");
  //     console.log(board);
  //     result++;
  //     console.log("result value is: ", result);
  //   }
  //   // console.log(result);
  //   return;
  // };

  // solution(n);

  // console.log('Single solution for ' + n + ' rooks:', JSON.stringify(result));
  // return result;
};

// return a matrix (an array of arrays) representing a single nxn chessboard, with n queens placed such that none of them can attack each other
window.findNQueensSolution = function(n) {
  var count = 0;

  var board = new Board({n:n});
  var emptyBoard = board.rows();

  var found = false;

  var findSolution = function(board, row, cols){
    if( count >= n ){
      found = true;
      return board.rows();
    }

    if (row === cols ){
      count = 0;
      return null;
    }

    for( var i = 0; i < cols; i++ ){
      board.togglePiece(row, i);
      count++;

      if ( !board.hasAnyQueensConflicts() ){
        var potentialSolution = findSolution(board, row+1, cols);
        if( potentialSolution ){
          return potentialSolution;
        }
      }

      board.togglePiece(row, i);
      count--;
    }
  }

  var solution = findSolution(board, 0, n);

  if ( !found ) {
    solution = emptyBoard;
  }

  console.log('Single solution for ' + n + ' queens:', JSON.stringify(solution));
  return solution;
};


// return the number of nxn chessboards that exist, with n queens placed such that none of them can attack each other
window.countNQueensSolutions = function(n) {
  var count = 0;
  var solutionCount = 0;

  var board = new Board({n:n});

  var findSolution = function(board, row, cols){
    if( count >= n ){
      solutionCount++
      return;
    }

    if (row === cols ){
      count = 0;
      return;
    }

    for( var i = 0; i < cols; i++ ){
      // togglePiece: function(rowIndex, colIndex)
      board.togglePiece(row, i);
      count++;

      if ( !board.hasAnyQueensConflicts() ){
        findSolution(board, row+1, cols);
      }

      board.togglePiece(row, i);
      count--;
    }
  }

  findSolution(board, 0, n);

  console.log('Number of solutions for ' + n + ' queens:', solutionCount);
  return solutionCount;
};