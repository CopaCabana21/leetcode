var isValid = function(s) {

    let chars = Array.from(s);
    let remain = [chars.pop()];
    let current;
    let closing = {'{':'}', '(':')', '[':']'};

    for (let i = chars.length-1; i >= 0; i--) {
        // console.log('chars: ', chars);
        // console.log('remain:', remain);
        current = chars.pop();

        if(['{','(','['].includes(current)){
            if(remain.pop()===closing[current]){
                continue;
            }else{
                return false
            }
        }

        remain.push(current);
    }

    return remain.length == 0;

};

console.log(isValid("["));