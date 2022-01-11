function choose(arr, size ){
    var allResult = [];
  
    (function(arr, size, result){
      var arrLen = arr.length;
      if(size > arrLen){
        return;
      }
      if(size == arrLen){
        allResult.push([].concat(result, arr))
      }else{
        for(var i =0 ; i < arrLen; i++){
          var newResult = [].concat(result);
          newResult.push(arr[i]);
  
          if(size == 1){
            allResult.push(newResult);
          }else{
            var newArr = [].concat(arr);
            newArr.splice(0, i +　1);
            arguments.callee(newArr, size - 1, newResult);
          }
        }
      }
    })(arr, size, []);
  
    return allResult;
  }
  
  function showResult(result){
    console.log('The number of result sets: ' + result.length );
    for(var i=0 , len = result.length;i < len; i++){
      console.log(result[i]);
    }
  }
  
  
  var arr = ['姬光','王子', '三桂','科长'];
  
  showResult(choose(arr, 3));
  //showResult(queue(arr, 4));