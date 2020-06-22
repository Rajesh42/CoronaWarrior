function insertimage() {
    corona_virus1 = new Image; corona_virus1.src = "temp/v2.png"
    corona_virus2 = new Image; corona_virus2.src = "temp/v1.png"
    corona_virus3 = new Image; corona_virus3.src = "temp/v3.png"
    corona_virus4 = new Image; corona_virus4.src = "temp/corona.png"
    corona_virus5 = new Image; corona_virus5.src = "temp/v4.png"
    hero = new Image; hero.src = "temp/hero.png"
    finishline = new Image; finishline.src = "temp/finishflag.png"
}
function start() {
    canvas = document.getElementById("canvas");
    console.log(canvas);

    //Change the height and width of the canvas using Javascript
    W = 750
    H = 400
    t=0
    canvas.width = W
    canvas.height = H

    score = 0;
    game_over = false;
    canvas = document.getElementById("canvas");
    pen = canvas.getContext('2d');
    v1 = {
        x: 150,
        y: 250,
        w: 20,
        h: 20,
        speed: 20,
    };
    v2 = {
        x: 520,
        y: 250,
        w: 20,
        h: 20,
        speed: 15,
    };
    v3 = {
        x: 400,
        y: 250,
        w: 20,
        h: 20,
        speed: 40,
    };
    v4 = {
        x: 275,
        y: 240,
        w: 20,
        h: 20,
        speed: 30,
    }
    v5 = {
        x: 530,
        y: 240,
        w: 20,
        h: 20,
        speed: 30,
    }
    virus = [v1, v2, v3, v4, v5];
    player = {
        x: 20,
        y: 310,
        w: 70,
        h: 60,
        speed: 20,
        flag: false,
    }
    win = {
        x: 650,
        y: 325,
        w: 50,
        h: 85,
    }
    //Event Listner
    document.addEventListener("keypress", function () {
        console.log("You Pressed the Key");
        player.flag = true;
    });
    document.addEventListener("keyup", function () {
        console.log("You Released the Key");
        player.flag = false;
    });

}
//game loop
function draw() {
    // clear the old screen entire area
    pen.clearRect(0, 0, W, H)
    // draw bird on screen
    pen.fillStyle = "red";
    //our hero
    pen.drawImage(hero, player.x, player.y, player.w, player.h)
    pen.drawImage(finishline, win.x, win.y, win.w, win.h)
    // pen.fillRect(virus.x, virus.y, virus.w, virus.h);

    for (let i = 0; i < virus.length; i++) {
        if (i == 0) pen.drawImage(corona_virus1, virus[i].x, virus[i].y, virus[i].w, virus[i].h);
        if (i == 1) pen.drawImage(corona_virus2, virus[i].x, virus[i].y, virus[i].w, virus[i].h);
        if (i == 2) pen.drawImage(corona_virus3, virus[i].x, virus[i].y, virus[i].w, virus[i].h);
        if (i == 3) pen.drawImage(corona_virus4, virus[i].x, virus[i].y, virus[i].w, virus[i].h);
        if (i == 4) pen.drawImage(corona_virus5, virus[i].x, virus[i].y, virus[i].w, virus[i].h);
    }
    pen.font = "20px Verdana";
    gradient = pen.createLinearGradient(0, 0, canvas.width, 0);
    gradient.addColorStop("0.1", " magenta");
    gradient.addColorStop("0.3", "orange");
    gradient.addColorStop("0.6", "red");
    // Fill with gradient
    pen.fillStyle = gradient;
    if(t){
        pen.font = "100px Kaushan Script";

          pen.fillText("YOU WON",130,150);
          pen.font = "40px Kaushan Script";
        pen.fillText(" Score  "+ score,230,250);}
    else if(score<0){
        pen.font = "100px Kaushan Script";
        pen.fillText("YOU LOST",130,150);
    }else{
        pen.fillText("Score : " + score, 30, 50);
    }
    // console.log("Draw")
}

function isColliding(b1, b2) {
    if (Math.abs(b1.x - b2.x) <= 20 && Math.abs(b1.y - b2.y) <= 20) {
        return true;
    }
    return false;
}


function update() {
    // console.log("Update")

    //checking for collision with flag
    if (player.flag == true) {
        player.x += player.speed;
        score += 40;
    }
    if (isColliding(win, player)) {
        game_over = true;
        alert(" Congratulations,You Won! ")
        t=1;
        return;
    }
    // loop check collision btw virous and hero
    for (let i = 0; i < virus.length; i++) {
        if (isColliding(virus[i], player)==true) {
            score -=250;
            if (score < 0) {
                game_over = true;
                alert("Game Over!!")
            }
        }
    }

    for (let i = 0; i < virus.length; i++) {
        virus[i].y += virus[i].speed;
        if (virus[i].y > H - 100 || virus[i].y < 200) {
            virus[i].speed *= -1;
        }
    }
}

function gameloop() {
    // console.log("IN GAME LOOP");
    if (game_over == true) {
        clearInterval(f);
    }
    draw();
    update();
}
// start the gameloop
insertimage();
start();
//repeatedly call game loop
var f = setInterval(gameloop, 100);
