let level = [
    [1, 0, 1, 1, 1, 1, 1, 1, 0, 0],
    [1, 0, 1, 1, 0, 1, 1, 1, 1, 1],
    [1, 1, 1, 1, 0, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 0, 1, 0, 1, 1, 1],
    [1, 0, 1, 1, 1, 1, 0, 1, 0, 1],
    [1, 0, 1, 0, 0, 0, 0, 1, 0, 0],
    [1, 0, 1, 0, 1, 0, 1, 1, 0, 1],
    [1, 0, 0, 0, 1, 0, 0, 1, 0, 1], 
    [1, 0, 1, 1, 1, 0, 1, 1, 1, 1],
    [1, 1, 1, 0, 0, 0, 1, 0, 0, 1]
];

let mazearray = level;
let Level = document.getElementById("levelselect");
Level.addEventListener("click", function () {
    document.getElementById("display").innerHTML="";
    maze.innerHTML =
        `<img src="./download.png" id="person" width="50px" height="50px" alt="person" >
    <img src="home.png" alt="home" width="50px" height="50px" id="home">`;
    createMaze();
});

let maze = document.getElementById("maze-container");
let person = document.getElementById("person");
let home = document.getElementById("home");
function setPersonPosition(x, y) {
    person.style.top = x + "px";
    person.style.left = y + "px";
}
function setHomePosition(x, y) {
    home.style.bottom = x + "px";
    home.style.right = y + "px";
}


function createMaze() {
    for (let i = 0; i < mazearray.length; i++) {
        let row = document.createElement("div");
        row.classList.add("row");

        for (let j = 0; j < mazearray[i].length; j++) {
            let cell = document.createElement("div");
            cell.classList.add("cell");

            if (mazearray[i][j] == 0) {
                cell.classList.add("wall");
            }
            row.appendChild(cell);
            
            if (i == 0 && j == 0) {
                mazearray[i][j] = 2;
            }
        }
        maze.appendChild(row);
    }

    setPersonPosition(0, 0);
    setHomePosition(0, 0);
}


function getPersonPosition() {
    let position = [-1, -1];
    for (let i = 0; i < mazearray.length; i++) {
        for (let j = 0; j < mazearray[i].length; j++) {
            if (mazearray[i][j] == 2) {
                position[0] = i;
                position[1] = j;
            }
        }
    }
    console.log(position);
    return position;
}


document.addEventListener("keydown", function (e) {
    let person = document.getElementById("person");
    let home = document.getElementById("home");
    let personLeft = person.offsetLeft;
    let personTop = person.offsetTop;
    let homeLeft = home.offsetLeft;
    let homeTop = home.offsetTop;
    let personPosition = getPersonPosition();


    if (e.key == "ArrowRight" && personLeft < (mazearray.length - 1) * 50 && mazearray[personPosition[0]][personPosition[1] + 1] == 1) {
        personLeft += 50;
        person.style.left = personLeft + "px";
        mazearray[personPosition[0]][personPosition[1]] = 1;
        mazearray[personPosition[0]][personPosition[1] + 1] = 2;
    }


    if (e.key == "ArrowLeft" && personLeft > 0 && mazearray[personPosition[0]][personPosition[1] - 1] == 1) {
        personLeft -= 50;
        person.style.left = personLeft + "px";
        mazearray[personPosition[0]][personPosition[1]] = 1;
        mazearray[personPosition[0]][personPosition[1] - 1] = 2;
    }

    if (e.key == "ArrowUp" && personTop > 0 && mazearray[personPosition[0] - 1][personPosition[1]] == 1) {
        personTop -= 50;
        person.style.top = personTop + "px";
        mazearray[personPosition[0]][personPosition[1]] = 1;
        mazearray[personPosition[0] - 1][personPosition[1]] = 2;
    }


    if (e.key == "ArrowDown" && personTop < (mazearray.length - 1) * 50 && mazearray[personPosition[0] + 1][personPosition[1]] == 1) {
        personTop += 50;
        person.style.top = personTop + "px";
        mazearray[personPosition[0]][personPosition[1]] = 1;
        mazearray[personPosition[0] + 1][personPosition[1]] = 2;
    }


    if (personLeft == homeLeft && personTop == homeTop) {
        document.getElementById("display").innerHTML="You Reached Destination";
        setPersonPosition(0, 0);
        setHomePosition(0, 0);
    }
});
