/*

Write a search function that takes a target number and a sorted and circularly rotated array.
    Return the index of the number if it is found, return -1 if not found.

    arr = [6, 7, 8, 10, 12, 13, 15, 1, 2, 3, 4]

search(8, arr) => 2
search(1, arr) => 7
search(9, arr) => -1*/

/*
6, 7, 8, 10, 12

13

15, 1, 2, 3, 4


15, 1

2

3, 4*/

const arr = [6, 7, 8, 10, 12, 13, 15, 1, 2, 3, 4];

function search(item, arr) {
    return findIndex(item, arr, 0, arr.length - 1);
}

function findIndex(item, arr, firstIndex, lastIndex) {
    let middleIndex = Math.floor((firstIndex + lastIndex) / 2)
    //is first array sorted and element is in ?
    if (arr[firstIndex] < arr[middleIndex - 1] && (arr[firstIndex] <= item && arr[middleIndex - 1] >= item)) {
        return findIndexInSortedArray(item, arr, firstIndex, lastIndex, middleIndex)
    }
    //is second array sorted and element is in ?
    else if (arr[middleIndex + 1] < arr[lastIndex] && (arr[middleIndex + 1] <= item && arr[lastIndex] >= item)) {
        return findIndexInSortedArray(item, arr, firstIndex, lastIndex, middleIndex)
    }
    else {
        //first, last and middle index controls
        let indexControlResult = indexControl(firstIndex, lastIndex, middleIndex, arr, item)
        if (indexControlResult || indexControlResult === 0) return indexControlResult

        //search for unsorted array part
        return arr[firstIndex] > arr[middleIndex - 1] ?  findIndex(item, arr, firstIndex, middleIndex - 1) :
            (arr[middleIndex + 1] > arr[lastIndex] ? findIndex(item, arr, middleIndex + 1, lastIndex) : -1)
    }
}

function indexControl(firstIndex, lastIndex, middleIndex, arr, item) {
    if (item === arr[firstIndex]) {
        return firstIndex
    } else if (item === arr[lastIndex]) {
        return lastIndex
    } else if (item === arr[middleIndex]) {
        return middleIndex
    }else if (firstIndex > lastIndex || lastIndex < middleIndex || middleIndex < firstIndex) {
        return -1
    }
}

function findIndexInSortedArray(item, arr, firstIndex, lastIndex, middleIndex) {
    while (firstIndex < lastIndex) {
        //first, last and middle index controls
        let indexControlResult = indexControl(firstIndex, lastIndex, middleIndex, arr, item)
        if (indexControlResult || indexControlResult === 0) return indexControlResult

        else if (arr[middleIndex] > item) {
            lastIndex = middleIndex - 1
            middleIndex = Math.floor((firstIndex + lastIndex) / 2)
        } else {
            firstIndex = middleIndex + 1;
            middleIndex = Math.floor((firstIndex + lastIndex) / 2)
        }
    }
    return -1
}


console.log(search(6, arr))