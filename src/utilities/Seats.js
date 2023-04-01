class SeatsLayout{
    constructor(numSeats, rowCount){
        this.numSeats = numSeats
        this.rowCount = rowCount
        this.layout = []
    }

    init(){
        let numRows = Math.ceil(this.numSeats / this.rowCount)
        for (let i=0; i<numRows; i++){
            //will set the empt to 1 so that I can find max adjcent seats 
            this.layout.push(new Array(this.rowCount).fill(1))
        }
    }

    selectSeat(row, column){
        this.layout[row][column] = 1
    }


    findMaxSubarray(arr) {
        let maxLen = 0;
        let maxStart = -1;
        let currentLen = 0;
        let currentStart = -1;
        for (let i = 0; i < arr.length; i++) {
            if (arr[i] === 1) {
            if (currentStart === -1) {
                currentStart = i;
            }
            currentLen++;
            } else {
            if (currentLen > maxLen) {
                maxLen = currentLen;
                maxStart = currentStart;
            }
            currentLen = 0;
            currentStart = -1;
            }
        }
    
        // Check if the last subarray is the longest
        if (currentLen > maxLen) {
            maxLen = currentLen;
            maxStart = currentStart;
        }
        
        return [maxStart, maxLen];
    }

    findRealPosition(idx, totalSeats, rowCount){
        const rowIdx = Math.ceil(totalSeats/rowCount)-1
        const colIdx = totalSeats % rowCount
        return [rowIdx, colIdx]
    }

    bookNoOfSeats(n){
        // only 7 can be booked in one go
        // we have to maximize the max seats together first ==> sub array problem ==> flatten the layout
        if(n < 8){
            let allSeats = this.layout.flat()
            let allSeatsBooked = []

            // maximum adjacent cells
            let[start, length] = this.findMaxSubarray(allSeats)

            allSeatsBooked = [...allSeats.slice(start, start+length)]

            let seatsLeft = n - length
            if(seatsLeft!==0){
                for(let k = start+length+1; k < allSeats.length; k++ ){
                    if(allSeatsBooked.length < 8){
                        if(allSeats[k]===1){
                            allSeatsBooked.push(k)
                        }
                    }else{
                        break
                    }
                }
            }
            // book the actual seats
            for(let idx of allSeatsBooked){
                let [rowIdx,colIdx] = this.findRealPosition(idx, this.numSeats, this.rowCount)
                this.selectSeat(rowIdx, colIdx)
            }
        }

        return this.layout 
    }

}

export default SeatsLayout