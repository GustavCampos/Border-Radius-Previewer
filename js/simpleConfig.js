
import {calculateBorderRadiusCSScode} from "./functions.js";

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
