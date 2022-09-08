// Function that performs matrix factorization
function matrixFactorization(arrayX){
    const M = arrayX.length     // Users
    const N = arrayX[0].length  // Products
    const K = 2  // Latent features

    var rate = 0.02
    var count = 0

    var userArray = []
    for (var i = 0; i < M; ++i) {
        var columns = []
        for (var j = 0; j < K; ++j) {
            columns[j] = Math.random() * (0.9 - 0.1) + 0.1
        }
        userArray[i] = columns
    }

    var itemArray = []
    for (var i = 0; i < K; ++i) {
        var columns = []
        for (var j = 0; j < N; ++j) {
            columns[j] = Math.random() * (0.9 - 0.1) + 0.1
        }
        itemArray[i] = columns
    }

    while(1){
        if(count > 100){
            break
        }
    
        for (var i = 0; i < M; ++i){
            for (var j = 0; j < N; ++j){
                let Xij = arrayX[i][j]
    
                if(Xij == 0){
                    continue
                }
    
                let predXij = 0
                for (var k = 0; k < K; ++k){
                    predXij += userArray[i][k]*itemArray[k][j]
                }
    
                let eij = Xij - predXij
                
                for (var k = 0; k < K; ++k){
                    predUser = rate*2*eij*itemArray[k][j]
                    predItem = rate*2*eij*userArray[i][k]
                    userArray[i][k] += predUser
                    itemArray[k][j] += predItem
                }
            }
        }
    
        console.log(RMSE(userArray, itemArray, arrayX))
        count += 1
    }
    
    multArray = MatrixMult(userArray, itemArray)
    
    for (var i = 0; i < M; ++i){
        for (var j = 0; j < N; ++j){
            if(multArray[i][j] < 1){
                multArray[i][j] = 1
            }
            else if(multArray[i][j] > 4){
                multArray[i][j] = 4
            }
        }
    }

    return multArray
}


// Function that performs matrix multiplication
function MatrixMult(arr1, arr2) {
    var result = [];
    for (var i = 0; i < arr1.length; i++) {
        result[i] = [];
        for (var j = 0; j < arr2[0].length; j++) {
            result[i][j] =  0;
            for (var k = 0; k < arr1[0].length; k++) {
                result[i][j] += arr1[i][k] * arr2[k][j];
            }
        }
    }
    return result;
}

// Function that calculates the root mean square error
function RMSE(userArray, itemArray, arrayX){
    var sum = 0
    var validCount = 0

    multArray = MatrixMult(userArray, itemArray)

    for (var i = 0; i < arrayX.length; ++i){
        for (var j = 0; j < arrayX[0].length; ++j){
            var Xij = arrayX[i][j]

            if(Xij == 0){
                continue
            }

            sum += Math.pow(Xij - multArray[i][j], 2)
            validCount++
        }
    }
    return (Math.sqrt(sum / validCount))
}

module.exports = {matrixFactorization}