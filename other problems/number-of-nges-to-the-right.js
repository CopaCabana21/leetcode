function count_NGEs(N, arr, queries, indices){

    return indices.map(start => {
        let count = 0;
        for (let i = start + 1; i < arr.length; i++) {
            
            if(arr[i] > arr[start]) count++

        }

        return count;
    })

}


console.log(count_NGEs(8, [3, 4, 2, 7, 5, 8, 10, 6], 2, [0, 5]));
console.log(count_NGEs(8, [3, 4, 2, 7, 5, 8, 10, 6], 2, [0, 5]));