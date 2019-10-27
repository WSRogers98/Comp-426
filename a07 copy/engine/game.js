/*
Add your code for Game here
 */
// helping source: https://rosettacode.org/wiki/2048#Java
export default class Game{
    constructor(size){
        this.size =size;
        this.fullSize= this.size*this.size;
        this.winArr = [];
        this.loseArr = [];
        this.moveArr= [];
        this.gameState ={
            board: new Array(this.size*this.size).fill(0),
            score: 0,
            won: false,
            over: false,
          }
          // generate an object for array elements to track if they are used
          // I dont think I use this 2D array anywhere but I dont know if I did so I am too scared to delete it
          this.pieces= new Array(this.size);
          for(let i =0; i< this.size;i++){
            this.pieces[i] = new Array(this.size).fill(new piece(0));
          }
          //set current highest and win condition
          this.highest=0
          this.win=2048
          this.randomvalue()
          this.randomvalue()
      //    this.setupNewGame()
    }
// method to create a random board piece
randomvalue(){
    let test= true;
    for(let i=0; i<this.fullSize; i++){
        if(this.gameState.board[i]==0){
            test=false;
            break;
        }
    }
    if(test==false){
  let val=  Math.floor(Math.random() * 101);
  var position =0;
  var boardsize= this.size* this.size
  var pieceval= 0;
  if(val >=90){
pieceval=4;
  }else{
      pieceval=2;
  }
//find position may or may not need to have a size+1
while (true){
position =Math.floor(Math.random() * (boardsize+1));
if(this.gameState.board[position]==0){
break;
}
}
this.gameState.board[position]= pieceval;
this.pieces[Math.floor(position/this.size)][position%this.size] = new piece(pieceval)
}
}
loadGame(gameState){
this.gameState= gameState;
}
setupNewGame(){
    this.gameState.board= new Array(this.size*this.size).fill(0);
    this.gameState.score= 0;
    this.gameState.won= false;
    this.gameState.over= false;
    for(let i =0; i< this.size;i++){
        this.pieces[i] = new Array(this.size).fill(new piece(0));
      }
    this.randomvalue()
    this.randomvalue()
  /*
  this.gameState.board[0]=0
  this.gameState.board[1]=0
  this.gameState.board[2]=0
  this.gameState.board[3]=0
  this.gameState.board[4]=8
  this.gameState.board[5]=4
  this.gameState.board[6]=2
  this.gameState.board[7]=8
  this.gameState.board[8]=8
  this.gameState.board[9]=4
  this.gameState.board[10]=0
  this.gameState.board[11]=0
  this.gameState.board[12]=0
  this.gameState.board[13]=16
  this.gameState.board[14]=0
  this.gameState.board[15]=0
*/
 
}
move(direction){
    let duplicate= true;
    let arraycopy=[...this.gameState.board];

if(direction == "up"){
    let column =0;
    let row =0;
    let k=0;
    let temp=0;
    //i is column j is row
    // pull everything together then combine then pull again
//pull everything up the first time
for(let i =0; i<this.size; i++){
    column=i;
    for(let j =0; j<this.fullSize; j+=this.size){
        row=j;
        k = row+column;
        temp =k;
      
       if(this.gameState.board[k]==0){        
            while(temp < this.fullSize){
                if(this.gameState.board[temp] !==0){
                    this.gameState.board[k]=this.gameState.board[temp];
                    this.gameState.board[temp]=0;
                    break;
                   }
                temp+=this.size;   
            }     
    }

    }
}
//combine all possible
k=0;
for(let z =0; z<this.size; z++){
    for(let y =0; y<this.fullSize; y++){
 
        if(this.gameState.board[k]==this.gameState.board[k+this.size] && this.gameState.board[k]!== 0 && k+this.size <this.fullSize){
        this.gameState.board[k]+=this.gameState.board[k+this.size];
        this.gameState.score+=this.gameState.board[k];
        this.gameState.board[k+this.size]=0;
       }
       k++;
    }
}
//pull everything up again
for(let i =0; i<this.size; i++){
    column=i;
    for(let j =0; j<this.fullSize; j+=this.size){
        row=j;
        k = row+column;
        temp =k;
     
       if(this.gameState.board[k]==0){        
      while(temp < this.fullSize){
                if(this.gameState.board[temp] !==0){
                    this.gameState.board[k]=this.gameState.board[temp];
                    this.gameState.board[temp]=0;
                    break;
                   }
                temp+=this.size;
            }     
    }
    }
}
for(let t=0; t<this.fullSize;t++){
    if(arraycopy[t] != this.gameState.board[t]){
        duplicate=false;
        break;
    }
}
if(duplicate==false){
this.randomvalue();
}
//console.log(this.toString());
}
if(direction == "down"){
    let k=0;
    let temp=0;
    //i is column j is row
    // pull everything together then combine then pull again


// first pull all numbers down
k = this.fullSize-1
    for(let i =0; i<this.size; i++){
    for(let j =this.fullSize; j>0; j-=this.size){
        temp =k;
     //   console.log('column= '+i)
     //   console.log('row= '+j)
     //   console.log('temp: '+temp);
       if(this.gameState.board[k]==0){   
      //     console.log('zero found at: ' +k)     
      while(temp >= 0){
                if(this.gameState.board[temp] !==0){
       //             console.log('switch found at temp=  '+temp)
                    this.gameState.board[k]=this.gameState.board[temp];
                    this.gameState.board[temp]=0;
                    break;
                   }
                temp-=this.size;
            }
       
    }
    k--
    }
}
//console.log('after pull board one'+ '\n'+this.toString());
k=this.fullSize;
//combine  all
for(let z =0; z<this.size; z++){
     // may need to change to  y>0
    for(let y =this.fullSize; y>0; y--){
        if(this.gameState.board[k]==this.gameState.board[k-this.size] && this.gameState.board[k]!== 0 && k-this.size >=0){
        this.gameState.board[k]+=this.gameState.board[k-this.size];
        this.gameState.score+=this.gameState.board[k];
        this.gameState.board[k-this.size]=0;
       }
       k--
    }
}
//console.log('after combine board'+ '\n'+this.toString());
//pull everything down again
k = this.fullSize-1
for(let i =0; i<this.size; i++){
    for(let j =this.fullSize; j>0; j-=this.size){
        temp =k;
       if(this.gameState.board[k]==0){        
      while(temp >= 0){
                if(this.gameState.board[temp] !==0){
                    this.gameState.board[k]=this.gameState.board[temp];
                    this.gameState.board[temp]=0;
                    break;
                   }
                temp-=this.size;
            }      
    }
    k--;
    }
}
for(let t=0; t<this.fullSize;t++){
    if(arraycopy[t] != this.gameState.board[t]){
        duplicate=false;
        break;
    }
}
if(duplicate==false){
this.randomvalue();
}
//console.log(this.toString());  
}
if(direction == "right"){
    let column =0;
    let row =0;
    let k=0;
    let temp=0;
    //i is column j is row
    // pull everything together then combine then pull again
    for(let j =0; j<this.fullSize; j+=this.size){
        row=j;
        for(let i =this.size-1; i>=0; i--){
            column=i;
        k = row+column;
        temp =k;
       if(this.gameState.board[k]==0){     
            while(temp >= row){
                if(this.gameState.board[temp] !==0){
                    this.gameState.board[k]=this.gameState.board[temp];
                    this.gameState.board[temp]=0;
                    break;
                   }
                temp--;   
            }     
    }
    
    }
    }

k=(this.fullSize-1)
temp=this.fullSize-this.size
for(let y =0; y<this.fullSize; y+=this.size){
for(let z =this.size; z>0; z--){
        if(this.gameState.board[k]==this.gameState.board[k-1] && this.gameState.board[k]!== 0 && k-1 >=temp){
        this.gameState.board[k]+=this.gameState.board[k-1];
        this.gameState.score+=this.gameState.board[k];
        this.gameState.board[k-1]=0;
       }
       k--;
    }
    temp-=this.size;
}


for(let j =0; j<this.fullSize; j+=this.size){
    row=j;
    for(let i =this.size-1; i>=0; i--){
        column=i;
    k = row+column;
    temp =k;
  
   if(this.gameState.board[k]==0){     
        while(temp >= row){
            if(this.gameState.board[temp] !==0){
                this.gameState.board[k]=this.gameState.board[temp];
                this.gameState.board[temp]=0;
                break;
               }
            temp--;   
        }     
}

}
}
for(let t=0; t<this.fullSize;t++){
    if(arraycopy[t] != this.gameState.board[t]){
        duplicate=false;
        break;
    }
}
if(duplicate==false){
this.randomvalue();
}
//console.log(this.toString())
}


if(direction == "left"){
    let column =0;
    let row =0;
    let k=0;
    let temp=0;
    //i is column j is row
    // pull everything together then combine then pull again
    for(let j =0; j<this.fullSize; j+=this.size){
        row=j;
        for(let i =0; i<this.size; i++){
            column=i;
        k = row+column;
        temp =k;
      
       if(this.gameState.board[k]==0){     
            while(temp <=row+this.size-1){
                if(this.gameState.board[temp] !==0){
                    this.gameState.board[k]=this.gameState.board[temp];
                    this.gameState.board[temp]=0;
                    break;
                   }
                temp++;   
            }     
    }
    
    }
    }
k=0;
temp=this.size;
for(let y =0; y<this.fullSize; y++){
for(let z =0; z<this.size; z++){
        if(this.gameState.board[k]==this.gameState.board[k+1] && this.gameState.board[k]!== 0 && k+1 <temp&& k+1<this.fullSize){
        this.gameState.board[k]+=this.gameState.board[k+1];
        this.gameState.score+=this.gameState.board[k];
        this.gameState.board[k+1]=0;
       }
       k++
    }
    temp+=this.size;
}
for(let j =0; j<this.fullSize; j+=this.size){
    row=j;
    for(let i =0; i<this.size; i++){
        column=i;
    k = row+column;
    temp =k;
  
   if(this.gameState.board[k]==0){     
        while(temp <=row+this.size-1){
            if(this.gameState.board[temp] !==0){
                this.gameState.board[k]=this.gameState.board[temp];
                this.gameState.board[temp]=0;
                break;
               }
            temp++;   
        }     
}

}
}
for(let t=0; t<this.fullSize;t++){
    if(arraycopy[t] != this.gameState.board[t]){
        duplicate=false;
        break;
    }
}
if(duplicate==false){
this.randomvalue();
}
//console.log(this.toString());  
}
for(let r=0; r<this.fullSize;r++){
    if(this.gameState.board[r]==2048){
        this.gameState.won=true;
        this.winArr.forEach(element => {
            element(this.getGameState());
        });
        break;
    }
}
let full= true;
let moveavailable=false;
    for(let y=0;y<this.fullSize;y++){
        if(this.gameState.board[y]==0){
            full=false;
            break;
        }
    }
    if(full==true){
    for(let q=0;q<this.fullSize;q++){
    if((this.gameState.board[q]==this.gameState.board[q+1]&&(q+1)%4!==0 )||(this.gameState.board[q]==this.gameState.board[q-1]&& q%4!==0)||this.gameState.board[q]==this.gameState.board[q-this.size]||this.gameState.board[q]==this.gameState.board[q+this.size]){
       moveavailable=true;
        break;
    }
}
if(moveavailable==false &&full==true){
    this.gameState.over=true;
    this.loseArr.forEach(element => {
        element(this.getGameState());
    });
}
    }
this.moveArr.forEach(element => {
    element(this.getGameState());
});
}

onMove(callback){
    this.moveArr[this.moveArr.length] = callback
}
onLose(callback){
    this.loseArr[this.loseArr.length] = callback
}
getGameState(){
return this.gameState;
}
onWin(callback){
this.winArr[this.winArr.length] = callback
}
// turn board to ascii
toString(){
    let s ='';
    for(let i =0; i < this.gameState.board.length; i++){
        if (i% this.size === 0){
            s+= '\n'
        }
        s+= this.gameState.board[i] + ' '
    }
    s+= '\n' + 'Score: ' + this.gameState.score + '\n'
    s+= '\n' + 'Won: ' + this.gameState.won + ', Over: ' + this.gameState.over
    return s;
    }
}
export class piece{
    constructor(value){
        this.value=value;
        this.used=false;
}
}
