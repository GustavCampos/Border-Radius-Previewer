import {calculateBorderRadiusCSScode, getDOMElementFromArrayById, getBorderStylePropertyArray} from "./functions.js";

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

//Copy CSS code________________________________________________________________
const copyCSSButton = document.getElementById("copy-css-button");

copyCSSButton.addEventListener("click", async () => {
    try {
        let copyText = cssResultSpan.innerText != "" ? cssResultSpan.innerText : "border-radius: 0px;";
        
        console.log(copyText)

        await navigator.clipboard.writeText(copyText)
        
        console.log('Content copied to clipboard');
        alert("Property copied to clipboard.");
    } catch (err) {
        console.error('Failed to copy: ', err);
    }
});

//Range Inputs________________________________________________________________
const borderInputList = document.getElementsByName("border-range");
const borderSpanList = document.getElementsByName("range-value-span");
const linkedCheckboxList = document.getElementsByName("checkbox-link")

borderInputList.forEach(input => {
    input.addEventListener("input", function() {
        const inputKeyword = getElementKeyword(this);

        const checkboxID = `${inputKeyword}-checkbox` 
        const linkedCheckbox = getDOMElementFromArrayById(linkedCheckboxList, checkboxID);

        const inputSpan = getInputSpan(this);

        if (linkedCheckbox.checked) {changeLinkedInput(this, inputSpan)}

        changePreviewBox(input);
        inputSpan.innerText = `${this.value}%`;   
        
        cssResultSpan.innerHTML = calculateBorderRadiusCSScode(previewBox, true);
    })

    input.addEventListener("change", () => {
        console.log(previewBox)
    })
});

//Range input functions------------------------------------
const getElementKeyword = (element, allKeywords=false) => {
    let idKeywords = element.id.split("-");

    return allKeywords ? idKeywords : idKeywords[0];
}

const getInputSpan = (input) => {
    const spanID = `${input.id}-span`;
    const returnSpan = getDOMElementFromArrayById(borderSpanList, spanID);

    return returnSpan;
}

const getLinkedElement = (array, linkWithElement) => {
    const keyword = getElementKeyword(linkWithElement);

    let returnElement;

    array.forEach(element => {
        if (element.id.startsWith(keyword) && element !== linkWithElement) {
            returnElement = element;
        }
    });

    return returnElement;
}

const getBorderSidePropertyName = (input) => {
    switch(getElementKeyword(input)) {
        case "top_left": {
            return "borderTopLeftRadius";
        }
        case "top_right": {
            return "borderTopRightRadius";
        }
        case "bottom_left": {
            return "borderBottomLeftRadius";
        }
        case "bottom_right": {
            return "borderBottomRightRadius";
        }
        default: throw new Error("Invalid input used as parameter");
    }
}

const getNewBorderPropertyValue = (input, currentValue) => {
    const returnValue = currentValue;

    const getAllKeywords = true;
    const inputKeywords = getElementKeyword(input, getAllKeywords);

    if (["top", "bottom"].includes(inputKeywords[1])) {
        returnValue[0] = `${input.value}%`
    }
    else if (["left", "right"].includes(inputKeywords[1])) {
        returnValue[1] = `${input.value}%`
    }
    else {throw new Error("Invalid input used as parameter")}

    return `${returnValue[0]} ${returnValue[1]}`;
}

//Side effect functions
const changeLinkedInput = (element, elementSpan) => {
    const oldValue = parseInt(elementSpan.innerText.replaceAll("%", ""));
    const inputVariation = (element.value - oldValue);
            
    const linkedInput = getLinkedElement(borderInputList, element)
    linkedInput.value = parseInt(linkedInput.value) + inputVariation;

    changePreviewBox(linkedInput);

    const linkedInputSpan = getInputSpan(linkedInput);

    linkedInputSpan.innerText = `${linkedInput.value}%`;
}

const changePreviewBox = (input) => {
    const borderSidePropertyName = getBorderSidePropertyName(input);

    const borderStyleProperty = previewBox.style[borderSidePropertyName];
    const borderPropertyValues = getBorderStylePropertyArray(borderStyleProperty);

    const newBorderPropertyValue = getNewBorderPropertyValue(input, borderPropertyValues)

    previewBox.style[borderSidePropertyName] = newBorderPropertyValue;
}
