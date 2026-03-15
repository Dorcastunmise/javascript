
const nums = [10, 20, 30];
const trills = ['hi', 'hello', 'good'];
nums[0] = 99;
function getLastValue(reqArr){
  const ans = reqArr.length - 1; 
  return reqArr[ans];
} 

function arraySwap(reqArr){
  let result = [];
  
  result[0] = reqArr[0]; 
  const lstindex = reqArr.length - 1;
  result[1] = reqArr[lstindex];

  reqArr[0] = result[1]; //first
  reqArr[reqArr.length - 1] = result[0]; //last

  return reqArr;
}

//console.log(getLastValue(trills));
//console.log(arraySwap(nums));

function getAddCount(arrToAdd){
  for(i = 0; i < arrToAdd.length; i++) {
    let num = arrToAdd[i];
    num++;
    arrToAdd[i] = num
    //console.log(num);
  }
  return arrToAdd;
}
getAddCount(nums);

function getCount(){
  for(i = 5; i >= 0 ; i--) {
    //console.log(i);
  }

}
getCount();

let phase = 5;
while(phase > 0) {
  phase--;
  //console.log(phase);
}

let additional = 0;
while(additional < 10 ) {
  additional++;
  //console.log(additional);
}

function addNum(arr, arr2) {
  for( i = 0; i < arr.length; i++){
    arr[i] += arr2[i];
  }
  
  return arr;
}


let nuns = [1, 2, 3];
let similar = [1, 1, 2];
let negativeArr = [19, -6, -2, 0, 4];
//console.log(addNum(nuns, similar));

function countPositive(arr){
  let cnt = 0;
  for(index = 0; index < arr.length; index++) {
    if (arr[index] > 0) cnt++;
  }
  return cnt;
}

//console.log(countPositive(negativeArr));

function minMax(arr){
  let result = {
    min: 0,
    max: 0
  };

  if(arr.length == 0) return result;
  if(arr.length == 1) {
    result.max = arr[0];
    result.min = arr[0];
    return result;
  }

  for (index = 0; index < arr.length; index++) {
    if (arr[index] < result.min) result.min = arr[index];
    if (arr[index] > result.max) result.max = arr[index];
  }

  return result;
}

//console.log(minMax(negativeArr));

function countWords(wordsArr) {
  let res_str = {};
  for (let i = 0; i < wordsArr.length; i++) {
    if(!res_str.hasOwnProperty(wordsArr[i])) {
      res_str[wordsArr[i]] = 1;
    } else {
      res_str[wordsArr[i]]++;
    }
  }
  return res_str;

}

let wordsSample = ['apple', 'grape', 'apple', 'apple'];
console.log(countWords(wordsSample));