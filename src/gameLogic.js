//check through the four winning conditions
export function analyseInputs(playersInputs = []){

    let winData = {
        gameWon: false,
        winner: null,
        winMethod: ""
    }

    //--SCAN THROUGH ROWS
    for(let row = 0; row < playersInputs.length; row++){
        for(let i = 0; i < playersInputs[row].length; i++){
            if(playersInputs[row][i] == null || (i < (playersInputs[row].length - 1) && playersInputs[row][i] != playersInputs[row][i+1]))//as long as there is a cell in front, check if the current cell value is the same as the next, if it isn't, escape the loop
                break;

            if(i == (playersInputs[row].length - 1)){//check if this is the end of the loop
                //if the loop gets to the end of the current row without breaking at any point then that means every cell matches on the current row
                winData.gameWon = true;
                winData.winner = playersInputs[row][i];
                winData.winMethod = `Row ${row + 1}`;

                return winData;
            }
        }
    };

    //--SCAN THROUGH COLUMNS
    for(let col = 0; col < playersInputs.length; col++){//for every column, check all the rows
        for(let row = 0; row < playersInputs.length; row++){
            if(playersInputs[row][col] == null || (row < (playersInputs.length - 1)  && playersInputs[row][col] != playersInputs[row + 1][col])) //as long as there is a row below, check if the current cell value is the same as the one directly below in the next row, if it isn't, escape the loop
                break;
            
            if(row == (playersInputs.length - 1)){//check if this is the end of the loop
                //if the loop gets to the end of the playersInputs rows count without breaking at any point then that means every cell matches on the current column
                winData.gameWon = true;
                winData.winner = playersInputs[row][col];
                winData.winMethod = `Column ${col + 1}`;
                
                return winData;
            }
        }
    }

    //for diagonals, we do not need to check every cell, we only have to check the next diagonal cell
    
    //--SCAN THROUGH DIAGONALLY - FROM TOP-LEFT
    for(let i = 0; i < playersInputs.length; i++){
        //NOTE!!: disgonal cells from the upper-left have the same row and column ids spanning through the length of the n x n matrix)
        if(playersInputs[i][i] == null || (i < (playersInputs.length - 1) && playersInputs[i][i] != playersInputs[i + 1][i + 1])) //as long as there is a cell after this in the diagonal direction, check if the current cell value is the same as the next diagonally, if it isn't, escape the loop
            break;
        
        if(i == (playersInputs.length - 1)){//check if this is the end of the loop
            //if the loop gets to the end of the playersInputs rows count without breaking at any point then that means every cell matches diagonally in this direction
            winData.gameWon = true;
            winData.winner = playersInputs[i][i];
            winData.winMethod = `Left Diagonal`;

            return winData;
        }
    }

    //--SCAN THROUGH DIAGONALLY - FROM TOP-RIGHT
    for(let row = 0; row < playersInputs.length; row++){
        //NOTE!!: On disgonal cells from the upper-right, we are ascending on the rows but descending on the columns
        const col = playersInputs.length - 1 - row;
        if(playersInputs[row][col] == null || (row < (playersInputs.length - 1) && playersInputs[row][col] != playersInputs[row + 1][col - 1])) //as long as there is a cell after this in the diagonal direction, check if the current cell value is the same as the next diagonally, if it isn't, escape the loop
            break;

        if(row == (playersInputs.length - 1)){//check if this is the end of the loop
            //if the loop gets to the end of the playersInputs rows count without breaking at any point then that means every cell matches diagonally in this direction
            winData.gameWon = true;
            winData.winner = playersInputs[row][col];
            winData.winMethod = `Right Diagonal`;

            return winData;
        }
    }
    
    return winData;
}