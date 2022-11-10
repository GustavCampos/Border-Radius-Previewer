export function getDOMElementFromArrayById(array,id) {
    let returnElement;
    
    array.forEach(element => {
        if (element.id === id) {
            returnElement = element
        }
    });

    return returnElement;
}

export function calculateBorderRadiusCSScode(element, complexMode=false) {
    if (complexMode) {return createBorderRadiusCSS(returnComplexBordersValue(element))}

    const topLeftRadius = element.style.borderTopLeftRadius;
    const topRightRadius = element.style.borderTopRightRadius;
    const bottomLeftRadius = element.style.borderBottomLeftRadius;
    const bottomRightRadius = element.style.borderBottomRightRadius;
    
    const allBordersIsEqual = (topLeftRadius === topRightRadius) && 
                            (bottomLeftRadius === bottomRightRadius) &&
                            (topLeftRadius === bottomRightRadius);

    const firstGroupIsEqual = (topLeftRadius === bottomRightRadius);
    const secondGroupIsEqual = (topRightRadius === bottomLeftRadius);
    
    if (allBordersIsEqual) {return createBorderRadiusCSS(topLeftRadius)}

    if (firstGroupIsEqual && secondGroupIsEqual) {return createBorderRadiusCSS(returnBordersValue(element, 2));}

    if (secondGroupIsEqual) {return createBorderRadiusCSS(returnBordersValue(element, 3));}

    return createBorderRadiusCSS(returnBordersValue(element));
}

//Return a colored CSS code for a innerHTML of a element
function createBorderRadiusCSS(value) {
    if (value === "" || value == 0) {
        return 'border-radius<a class="css-grey">:</a> <a class="css-violet">0</a><a class="css-grey">;</a>';
    }

    return `border-radius<a class="css-grey">:</a> <a class="css-violet">${value}</a><a class="css-grey">;</a>`;
}


function returnBordersValue(element, n=0) {
    let validationList = [element.style.borderTopLeftRadius, element.style.borderTopRightRadius, element.style.borderBottomLeftRadius, element.style.borderBottomRightRadius];

    for (let i = 0; i < validationList.length; i++) {
        validationList[i] = validationList[i] !== "" ? validationList[i] : "0px";
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

export function getBorderStylePropertyArray(propertyValue) {
    const singleValueRegex = /^([0-9]*%){1}$/
    
    if (propertyValue == "") {return ["0%", "0%"];}

    if (propertyValue.match(singleValueRegex)) {return [propertyValue , propertyValue]}

    const returnArray = propertyValue.split(" ");

    console.log(returnArray)

    return returnArray;
}

function returnComplexBordersValue(element) {
    const borderPropertyArray =  [element.style.borderTopLeftRadius, element.style.borderTopRightRadius, element.style.borderBottomLeftRadius, element.style.borderBottomRightRadius];

    let returnArray = [];

    borderPropertyArray.forEach(element => {
        returnArray.push(getBorderStylePropertyArray(element));
    });

    return `${returnArray[0][0]} ${returnArray[1][0]} ${returnArray[2][0]} ${returnArray[3][0]} / ${returnArray[0][1]} ${returnArray[1][1]} ${returnArray[2][1]} ${returnArray[3][1]}`
}