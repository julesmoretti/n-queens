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

  // creates an array of length n with 0 for each index
  var arrayGen = function(value){
    var array = [];
    for( var i = 0; i < value; i++ ){
      array.push(0);
    }
    return array;
  }

  // creates a board by pushing n arrayGen to an empty array
  var boardGen = function(value){
    var board = [];
    for( var i = 0; i < value; i++ ){
      board.push( arrayGen(value) );
    }
    return board;
  }

  var board = boardGen(n);  // creates a board of n array assigned to board

  // changes all the value of the major central diagonal to 1
  var matrixSol = function(depth){
    if( depth !== 0 ) {
      for( var i = 0; i < n; i++ ){
        board[i][i] = 1;
      }
    }
    return board;
  }

  // invoke matrixSol and assign it to solution
  var solution = matrixSol(n);

  console.log('Single solution for ' + n + ' rooks:', JSON.stringify(solution));
  return solution;  // returns a single solution for n rooks
};



// return the number of nxn chessboards that exist, with n rooks placed such that none of them can attack each other
window.countNRooksSolutions = function(n) {

  var solutionCount = 0;  // stores number of solved board solutions

  var board = new Board({n:n});  // creates a new board of size n

  // recursive function that takes the original board, a row start and a total number of cols (n)
  var findSolution = function(board, cols, row){

    // if row is equal to cols then we reached the end of a board test
    // in which case we increase our solutionCount by one and keep going
    if ( row === cols ){
      solutionCount++
      return;
    }

    // iterate n times - as cols and n is the same thing
    for( var i = 0; i < cols; i++ ){
      board.togglePiece(row, i);  // togglePiece current location from 0 to 1

      // if no rook conflict found then recurse in.
      if ( !board.hasAnyRooksConflicts() ){
        findSolution(board, cols, row+1);
      }

      board.togglePiece(row, i);  // togglePiece current location from 1 to 0
    }
  }

  findSolution(board, n, 0);  // invoke findSolution to affect solutionCount

  console.log('Number of solutions for ' + n + ' rooks:', solutionCount)
  return solutionCount;  // returns the Number of solutions for n rooks
};

// return a matrix (an array of arrays) representing a single nxn chessboard, with n queens placed such that none of them can attack each other
window.findNQueensSolution = function(n) {

  var count = 0;  // stores number of queens placed on board

  var board = new Board({n:n});  // creates a new board of size n
  var emptyBoard = board.rows();  // copies to emptyBoard a stripped out of attributes board.

  var found = false;  // variable that keeps track see if a solution has been found.

  // recursive function that takes the original board, a row start and a total number of cols (n)
  var findSolution = function(board, row, cols){
    // if count is same as n then we have a solution board
    // return a board stripped of attribute properties
    if( count >= n ){
      found = true;
      return board.rows();
    }

    // on the other hand if count failed and the amount of row is the same as cols then we reached the end of a board test
    // reset our queens count and get out of recursion
    if (row === cols ){
      count = 0;
      return null;
    }

    // iterate n times - as cols and n is the same thing
    for( var i = 0; i < cols; i++ ){
      board.togglePiece(row, i);  // togglePiece current location from 0 to 1
      count++;  // keep track of number of queens on the board

      // if no queen's conflict found then recurse in.
      if ( !board.hasAnyQueensConflicts() ){
        var potentialSolution = findSolution(board, row+1, cols);

        // checks to see if a potential solution has been found if so return a board.
        if( potentialSolution ){
          return potentialSolution;
        }
      }

      board.togglePiece(row, i);  // togglePiece current location from 1 to 0
      count--;  // keep track of number of queens on the board
    }
  }

  var solution = findSolution(board, 0, n);  // invoke findSolution to affect solutionCount

  // checks if anything was found, and if not assigns solution to an empty board
  if ( !found ) {
    solution = emptyBoard;
  }

  console.log('Single solution for ' + n + ' queens:', JSON.stringify(solution));
  return solution;  // returns a single solution for n queens
};


// return the number of nxn chessboards that exist, with n queens placed such that none of them can attack each other
window.countNQueensSolutions = function(n) {

  var count = 0;  // stores number of queens placed on board
  var solutionCount = 0;  // stores number of solved board solutions

  var board = new Board({n:n});  // creates a new board of size n

  // recursive function that takes the original board, a row start and a total number of cols (n)
  var findSolution = function(board, row, cols){
    // if count is same as n then we have a solution board
    // colutionCount stores number of solution boards and then return out
    if( count >= n ){
      solutionCount++
      return;
    }

    // on the other hand if count failed and the amount of row is the same as cols then we reached the end of a board test
    // reset our queens count and get out of recursion
    if (row === cols ){
      count = 0;
      return;
    }

    // iterate n times - as cols and n is the same thing
    for( var i = 0; i < cols; i++ ){

      board.togglePiece(row, i);  // togglePiece current location from 0 to 1
      count++;  // keep track of number of queens on the board

      // if no queen's conflict found then recurse in.
      if ( !board.hasAnyQueensConflicts() ){
        findSolution(board, row+1, cols);
      }

      board.togglePiece(row, i);  // togglePiece current location from 1 to 0
      count--;  // keep track of number of queens on the board
    }
  }

  findSolution(board, 0, n);  // invoke findSolution to affect solutionCount

  console.log('Number of solutions for ' + n + ' queens:', solutionCount);
  return solutionCount;  // returns a number of solutions for n queens
};