//Oyundaki tum kareler secilir
let tiles = document.querySelectorAll(".tile");
//Siranin hangi oyuncuda oldugunu gosteren alan secilir
let playerTurn = document.querySelector(".player__turn");
let gameResult = document.querySelector(".game-result__text");
//Oyun sonucunu gosteren alan
let playAgainArea = document.querySelector(".invisible");
//Oyun bittiginde tum karelerin icini sifirlayan butonu sectik
let restart = document.querySelector("#btn__restart");
let player = "X";
let isGameOver = false;

//Oyun basladiginda siranin hangi oyuncuda oldugunu soyluyoruz
playerTurn.innerHTML = `${player}'s turn`;

//Kazanma kombinasyonlariyla oyunun mevcut durumu karsilastirilir ve kazanan belirlenir.
const checkWin = () => {
  let isPlayerWon = false;

  //yatayda kazanma durumu
  const h1 =
    tiles[0].innerHTML === tiles[1].innerHTML &&
    tiles[0].innerHTML === tiles[2].innerHTML &&
    tiles[0].innerHTML !== "";
  const h2 =
    tiles[3].innerHTML === tiles[4].innerHTML &&
    tiles[3].innerHTML === tiles[5].innerHTML &&
    tiles[3].innerHTML !== "";
  const h3 =
    tiles[6].innerHTML === tiles[7].innerHTML &&
    tiles[6].innerHTML === tiles[8].innerHTML &&
    tiles[6].innerHTML !== "";
  //duseyde kazanma durumu
  const v1 =
    tiles[0].innerHTML === tiles[3].innerHTML &&
    tiles[0].innerHTML === tiles[6].innerHTML &&
    tiles[0].innerHTML !== "";
  const v2 =
    tiles[1].innerHTML === tiles[4].innerHTML &&
    tiles[1].innerHTML === tiles[7].innerHTML &&
    tiles[1].innerHTML !== "";
  const v3 =
    tiles[2].innerHTML === tiles[5].innerHTML &&
    tiles[2].innerHTML === tiles[8].innerHTML &&
    tiles[2].innerHTML !== "";
  //diyagonal kazanma durumu
  const d1 =
    tiles[0].innerHTML === tiles[4].innerHTML &&
    tiles[0].innerHTML === tiles[8].innerHTML &&
    tiles[0].innerHTML !== "";
  const d2 =
    tiles[2].innerHTML === tiles[4].innerHTML &&
    tiles[2].innerHTML === tiles[6].innerHTML &&
    tiles[2].innerHTML !== "";
  if (h1 || h2 || h3 || v1 || v2 || d1 || d2) {
    isPlayerWon = true;
    if (h1 || v1 || d1) {
      player = tiles[0].innerHTML;
    } 
    if (h2 || v2 || d2) {
      player = tiles[4].innerHTML;
    } 
    if (h3 || v3 ) {
      player = tiles[8].innerHTML;
    } 
  }

  const board = [];
  tiles.forEach((tile) => board.push(tile.innerHTML));
  console.log(board);
  //Oyundaki tum kareler doluysa ve kazanan yoksa oyun berabere bitmis demektir
  if (!board.includes("")) {
    isGameOver = true;
    gameResult.innerHTML = "Draw!";
  }

  if (isPlayerWon) {
    isGameOver = true;
    gameResult.innerHTML = `${player} won!`;
    console.log(`${player} won!`);
  }
  //Oyun sifirlanir ve isGameOver degeri baslangictaki gibi false hale getirilir
  resetTheGame(isGameOver);
  isGameOver = false;
};


const handlePlay = tile => {
  if (tile.innerHTML == "" && !isGameOver) {
    tile.innerHTML = player;
    console.log(isGameOver);
    //Karelere tiklandiktan sonra oyuncu X ise O'ya O ise X'e donusturulur. Boylece X'in hamlesi bittikten sonra sira O'ya gecer.
    if (player === "X") {
      tile.classList.remove("player-o");
      tile.classList.add("player-x"); // oyuncu x icin belirledigimiz class'i atadik
      player = "O";
    } else {
      tile.classList.remove("player-x");
      tile.classList.add("player-o");
      player = "X";
    }

    //Oyuncunun sirasi degistikten sonra siranin hangi oyuncuda oldugu anlik olarak guncellenir.
    playerTurn.innerHTML = `${player}'s turn`;
  }
  checkWin();
};

//forEach ile her bir kareye event listener yerlestirilir.
tiles.forEach((tile) => tile.addEventListener("click", () => handlePlay(tile)));

const resetTheGame = (isGameOver) => {
  if (isGameOver) {
    playAgainArea.classList.remove("invisible");
    playAgainArea.classList.add("result-container");
  }
  isGameOver = false;
  
  
  //butona tiklaninca butun karelerin icini sifirlayan fonksiyon tetiklenir.
  restart.addEventListener("click", () => {
    playAgainArea.classList.remove("result-container");
    playAgainArea.classList.add("invisible");
    tiles.forEach(tile => (tile.innerHTML = ""));
    //Oyuncu sirasi ve oyuncu sirasini gosteren alan ilk haline donusturulur.
    player = "X";
    playerTurn.innerHTML = `${player}'s turn`;
  });
  
};
