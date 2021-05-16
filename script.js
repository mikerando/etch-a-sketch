//START WITH A 16X16 GRID//
let container = document.getElementById('container');
let rows = document.createElement('div');
let grid = document.createElement('span');
    grid.className = "grid";
let initialSize = 16;
let gridSize = initialSize;
let colorChoice = "rgb(0,0,0)";
let rainbow = "rgb(0,0,0)";

//BUILDS GRID//
function gridBuild(){
    for (let i = 1; i <= gridSize; i++) {
        rows.className = "row" + i;
        container.appendChild(rows.cloneNode(true));
    }
    for (let i = 1; i <= gridSize; i++) {
        rows = document.querySelector('.row' + i);
        for (let j = 1; j <= gridSize; j++) {
           rows.appendChild(grid.cloneNode(true));
        }
    }//combining the "i" loops causes the grid to build like a pyramid//
    borderCheck();
    document.getElementById('shaded').checked = false;
    document.getElementById('sizeInput').value = "Grid Side Length 1 - 100";
};

//MAINTAIN PERFECT SQUARE SHAPE FOR GRID SQUARES//
//EXCEPT IT MAKES THE CONTAINER "SQUARE" AND THEN NOTHING ELSE//
// function verySquare(){
//     document.getElementById('container').style.width = "50%";
//     document.getElementById('container').style.height = "50%";
//     let x = document.getElementById('container').offsetWidth;
//     x += "px";
//     document.getElementById('container').style.width = x;
//     let y = document.getElementById('container').offsetHeight;
//     y += "px";
//     document.getElementById('container').style.height = y;
//     if (x <= y){
//         document.getElementById('container').style.height = x;
//     } else if (x > y) {
//         document.getElementById('container').style.width = y;
//     }
// }

//COMPLETELY CLEARS THE GRID. DOESN'T BUILD A NEW ONE//
function resetGrid(){
    while (container.firstChild){
        while (container.firstChild.firstChild){
            container.firstChild.removeChild(container.firstChild.firstChild);
        }
        container.removeChild(container.firstChild);
    }
};

//CHANGES A GRID-SQUARE TO CHOSEN COLOR//
function blackIn(){
    document.querySelectorAll('.grid').forEach(gridEvent => {
        gridEvent.addEventListener('mouseover', () => {
            gridEvent.style.backgroundColor = colorChoice;
        });
    })
};


//CHANGES A GRID-SQUARE TO RANDOM RGB COLOR//
function colorIn(){
    document.querySelectorAll('.grid').forEach(gridEvent => {
        gridEvent.addEventListener('mouseover', () => {
            rainbow = "rgb(" + ran(256) + "," + ran(256) + "," + ran(256) + ")";
            gridEvent.style.backgroundColor = rainbow;
        })
    })
};

//CHANGES A GRID-SQUARE TO HAVE A +10% SHADED VALUE// 
function shadeIn(){
    document.querySelectorAll('.grid').forEach(gridEvent => {
        if(!gridEvent.style.backgroundColor){
            gridEvent.style.opacity = 0.0;
        }
    })
    document.querySelectorAll('.grid').forEach(gridEvent => {
        gridEvent.addEventListener('mouseover', () => {
            let transparency = parseFloat(gridEvent.style.opacity.slice(0, 3));
            if (transparency != 1.0){
                transparency += 0.1;
                gridEvent.style.opacity = transparency;
            }
        })
    })
}

//REMOVES TRANSPARENCY//
function shadeRemove(){
    document.querySelectorAll('.grid').forEach(gridEvent => {
        if(gridEvent.style.opacity == 0.0){
            gridEvent.style.opacity = 1.0;
        }
    })
};

//REMOVES ALL USED STYLING PROPERTIES//
function eraseOut(){
    document.querySelectorAll('.grid').forEach(gridEvent => {
        gridEvent.addEventListener('mouseover', () => {
            gridEvent.style.removeProperty('background-color');
        })
    })
}

//REMOVES BORDER IF GIRD-SQUARES ARE SMALL//
function borderCheck(){
    let gridWidth = document.querySelector('.grid').offsetWidth;
    let gridHeight = document.querySelector('.grid').offsetHeight;
    let gridThreshold = 7; //changing this effects when borders vanish//
    if (gridWidth < gridThreshold || gridHeight < gridThreshold){
        document.querySelectorAll('.grid').forEach( gridSquare => {
            gridSquare.style.removeProperty('border');
        });
    } else if (gridWidth >= gridThreshold || gridHeight >= gridThreshold){
        document.querySelectorAll('.grid').forEach( gridSquare => {
            gridSquare.style.border = '1px solid black';
        });
    }
    //verySquare();
}

//EVER USEFUL RANDOM NUMBER GENERATOR//
function ran(num){
    return Math.floor(Math.random() * num);
};

//REMOVES GRID-BORDER BASED ON WINDOW SIZE//
window.addEventListener('resize', () => {
    borderCheck();
});

//BUTTONS//
let resetButton = document.getElementById('reset');
resetButton.addEventListener('click', () => {
    resetGrid();
    gridSize = initialSize;
    gridBuild(gridSize);
});

let clearButton = document.getElementById('clear');
clearButton.addEventListener('click', () => {
    resetGrid();
    gridBuild(gridSize);
});

let eraseButton = document.getElementById('erase');
eraseButton.addEventListener('click', () => {
    eraseOut();
})

let ranColorButton = document.getElementById('ranColor');
ranColorButton.addEventListener('click', () => {
    colorIn();
});

let colorPick = document.getElementById('colorPick');
colorPick.addEventListener('click', () => {
    colorChoice = colorPick.value;
    blackIn();
})

//CHECKBOX TO ALLOW SHADING IN//
let shadeCheck = document.getElementById('shaded');
shadeCheck.onclick = () => {
    if (shadeCheck.checked){
        shadeIn();
    } else {
        shadeRemove();
    }
};

//ASK FOR NEW GIRD LAYOUT (MAX 100 X 100)//
let sizeForm = document.getElementById('sizeForm');
    sizeForm.addEventListener('click', () => {
        document.getElementById('sizeInput').value = "";
    });
    sizeForm.addEventListener('submit', () => {
        sizeInput = parseInt(document.getElementById('sizeInput').value);
        if (sizeInput >= 1 && sizeInput <= 100){
            gridSize = sizeInput;
            resetGrid();
            gridBuild(gridSize);
        } else {
            document.getElementById('sizeInput').value = "";
            return;
        }
        document.getElementById('sizeInput').value = "";
});

//GRID INITIALIZE//
gridBuild(gridSize);