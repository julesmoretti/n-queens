var board = [ [ 0, 0, 0 ], [ 0, 0, 0 ], [ 0, 0, 1 ] ];

  // checking for board to be bigger then 1
  // if( array.length > 1){

    var counter = 0;

    var checkWithin = function(original, rowIndex, colIndex){
      while( rowIndex >= 0 ){
        var newColIndex = original - colIndex;
        // console.log(board[rowIndex][colIndex]);
        var temp = board[rowIndex][colIndex];
        console.log(temp);
        if( temp === 1 ){
          counter++;
        }
        var a = rowIndex - 1;
        var b = colIndex - 1;
        checkWithin(a,b);
      }
      return;
    }
var test = checkWithin(2, 2, 2);
console.log(test);


          // // console.log(board[rowIndex][colIndex], 'the board index value');
          // console.log("it is a 1");
          // // counter++
          //   // counter check
          //   // if( counter > 1 ){
          //   //   console.log(counter, 'the counter before return')
          //   //   return true;
          //   }
          // // checkWithin(rowIndex-1,colIndex-1);