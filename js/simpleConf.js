const previewBox = document.getElementById("preview-box");
const cssResultSpan = document.getElementById("css-result-span");

//Preview box size _____________________________________________________
const widthInput = document.getElementById("width-input");
const heightInput = document.getElementById("height-input");

widthInput.addEventListener("change", function() {
    previewBox.style.width = `${this.value}px`;
});

heightInput.addEventListener("change", function() {
    previewBox.style.height = `${this.value}px`;
});
//_____________________________________________________________________

//Preview box borders _________________________________________________
const borderInputs = document.getElementsByName("border-input");

borderInputs.forEach(element => {
    element.addEventListener("change", function() {
        let borderSide;

        switch(this.id) {
            case "top-left-input": {
                borderSide = "borderTopLeftRadius";
                break;
            }
            case "top-right-input": {
                borderSide = "borderTopRightRadius";
                break;
            }
            case "bottom-left-input": {
                borderSide = "borderBottomLeftRadius";
                break;
            }
            case "bottom-right-input": {
                borderSide = "borderBottomRightRadius";
                break;
            }
        }

        if (this.value == "" || this.value == undefined) {this.value = 0;}

        previewBox.style[borderSide] = `${this.value}px`;
        cssResultSpan.innerHTML = calculateBorderRadiusCSScode(previewBox);
    });
});

//Copy CSS code________________________________________________________________
const copyCSSButton = document.getElementById("copy-css-button");

copyCSSButton.addEventListener("click", () => {
    navigator.clipboard.writeText(cssResultSpan.innerText);
    alert("Property copied to clipboard.")
});

//Functions ______________________________________________________________
function calculateBorderRadiusCSScode(element) {
    const topLeftRadius = element.style.borderTopLeftRadius;
    const topRightRadius = element.style.borderTopRightRadius;
    const bottomLeftRadius = element.style.borderBottomLeftRadius;
    const bottomRightRadius = element.style.borderBottomRightRadius;
    
    const allBordersIsEqual = (topLeftRadius == topRightRadius) && 
                            (bottomLeftRadius == bottomRightRadius) &&
                            (topLeftRadius == bottomRightRadius);

    const firstGroupIsEqual = (topLeftRadius == bottomRightRadius);
    const secondGroupIsEqual = (topRightRadius == bottomLeftRadius);
    
    console.log(firstGroupIsEqual)
    console.log(secondGroupIsEqual)

    if (allBordersIsEqual) {return createBorderRadiusCSS(topLeftRadius)}

    if (firstGroupIsEqual && secondGroupIsEqual) {return createBorderRadiusCSS(returnBorders(element, 2));}

    if (secondGroupIsEqual) {return createBorderRadiusCSS(returnBorders(element, 3));}

    return createBorderRadiusCSS(returnBorders(element));
}

function createBorderRadiusCSS(value) {
    if (value == "" || value == 0) {
        return 'border-radius<a class="css-grey">:</a> <a class="css-violet">0px</a><a class="css-grey">;</a>';
    }

    return `border-radius<a class="css-grey">:</a> <a class="css-violet">${value}</a><a class="css-grey">;</a>`;
}

function returnBorders(element, n=4) {
    let validationList = [element.style.borderTopLeftRadius, element.style.borderTopRightRadius, element.style.borderBottomLeftRadius, element.style.borderBottomRightRadius];

    for (let i = 0; i < validationList.length; i++) {
        validationList[i] = validationList[i] != "" ? validationList[i] : "0px";
    }

    switch(n) {
        case 2:
            return `${validationList[0]} ${validationList[1]}`;
        case 3:
            return `${validationList[0]} ${validationList[1]} ${validationList[3]}`;
        default:
            return `${validationList[0]} ${validationList[1]} ${validationList[2]} ${validationList[3]}`;
    }
}
