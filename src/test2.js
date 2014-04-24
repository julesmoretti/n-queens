var numberOfSolutions = function(n){

  if (n === 0){
    return undefined;
  }

  // Creates an array of n index with value 0 in each index.
  var ArrayGen = function(value){
    var array = [];
    for( var i = 0; i < value; i++ ){
      array.push(0);
    }
    return array;
  }

  // Creates a board of n arrays.
  var boardGen = function(value){
    var board = [];
    for( var i = 0; i < value; i++ ){
      board.push(ArrayGen(value));
    }
    return board;
  }

  // Checks a column for duplicate of value 1.
  var hasColConflictAt = function(board, colIndex) {
    var array = board[colIndex];
    if( array.length > 1 ){
      for( var i = 0; i < array.length - 1; i++ ){
        var a = board[i];
        for( var j = i + 1 ; j < array.length; j++ ){
          var b = board[j];
          if( ( a[colIndex] === 1 ) && ( a[colIndex] === b[colIndex] ) ){
            return true;
          }
        }
      }
    }
    return false;
  }

  // Checks a board for column duplicates of value 1.
  var hasAnyColConflicts = function(array) {
    // console.log(array);
    for( var i = 0; i < array.length; i++ ){
      var colCheck = hasColConflictAt(array, i);
      if( colCheck === true ){
        return true;
      }
    }

    return false;
  }

  // board creation
  var board = boardGen(n);

  // combination count;
  var result = 0;

  // Recursive board iterations.
  var solution = function(depth){
    if ( depth !== 1 ) {
      for (var i = 0; i < n; i++ ){
        var colIndex = n - (depth);
        // console.log(colIndex);
        board[colIndex][i] = 1;
        if( !hasAnyColConflicts(board) ){
          solution( depth - 1);
        }
        board[colIndex][i] = 0;
      }
    } else {
      console.log("board");
      console.log(board);
      result++;
      console.log("result value is: ", result);
    }
    // console.log(result);
    return;
  };

  solution(n);
  return result;
}

var test = numberOfSolutions(3);
console.log("Test is: ", test);
