

// Find the maximum amount of nodes that can be visited in a flwg (graph/array); 
// If we are at a node list[i], then we can only move to:
//      list[i+1] or list[i-1] an adjecent (to the right or left)
//      OR
//      list[i+2] or list[i-2] the nodes next to an adjecent node (to the right or left)


var apidata = [8, 7, 9, 6, 10, 5, 11, 4, 12, 3, 2, 1, 0, 2 ];
var list = [];
var res = [];

var nrOfBars = apidata.length;

const solution = () => {
    for (let index = 0; index < nrOfBars; index++) {
        list[index] = apidata[index];
    }
    res = findLongestPath([], 8);

    for (let index = 0; index < res.length; index++) {
        console.log(list[res[index]])
    }

}

const findLongestPath = (beseokt, currIndx) => {
    var resFromR1 = [];
    var resFromR2 = [];
    var resFromL1 = [];
    var resFromL2 = [];




    var indxR1 = currIndx + 1;
    var indxR2 = currIndx + 2;
    var indxL1 = currIndx - 1;
    var indxL2 = currIndx - 2;

    var canGoR1 = currIndx + 1 < list.length && !beseokt.includes(indxR1) && list[currIndx + 1] < list[currIndx];
    var canGoR2 = currIndx + 2 < list.length && !beseokt.includes(indxR2) && list[currIndx + 2] < list[currIndx];
    var canGoL1 = currIndx - 1 >= 0 && !beseokt.includes(indxL1) && list[currIndx - 1] < list[currIndx];
    var canGoL2 = currIndx - 2 >= 0 && !beseokt.includes(indxL2) && list[currIndx - 2] < list[currIndx];

    // basis
    if (!canGoR1 && !canGoR2 && !canGoL1 && !canGoL2) {
        beseokt.push(currIndx);
        return beseokt;
    }

    if (canGoR1) {
        var _b = beseokt.slice();
        _b.push(currIndx);
        resFromR1 = findLongestPath(_b, indxR1);
    }

    if (canGoR2) {
        var _b = beseokt.slice();
        _b.push(currIndx);
        resFromR2 = findLongestPath(_b, indxR2);
    }

    if (canGoL1) {
        var _b = beseokt.slice();
        _b.push(currIndx);
        resFromL1 = findLongestPath(_b, indxL1);
    }

    if (canGoL2) {
        var _b = beseokt.slice();
        _b.push(currIndx);
        resFromL2 = findLongestPath(_b, indxL2);
    }

    if (resFromR1.length >= resFromR2.length && resFromR1.length >= resFromL1.length
        && resFromR1.length >= resFromL2.length) {
        return resFromR1;
    } else if (resFromR2.length >= resFromR1.length && resFromR2.length >= resFromL1.length
        && resFromR2.length >= resFromL2.length) {
        return resFromR2;
    } else if (resFromL1.length >= resFromR1.length && resFromL1.length >= resFromR2.length
        && resFromL1.length >= resFromL2.length) {
        return resFromL1;
    } else {
        return resFromL2;
    }


}


solution()