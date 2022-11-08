const previewBox = document.getElementById("preview-box");
const cssResultSpan = document.getElementById("css-result-span");

//Copy CSS code________________________________________________________________
const copyCSSButton = document.getElementById("copy-css-button");

copyCSSButton.addEventListener("click", () => {
    let copyText = cssResultSpan.innerText != "" ? cssResultSpan.innerText : "border-radius: 0px;";
    navigator.clipboard.writeText(copyText);
    alert("Property copied to clipboard.")
});