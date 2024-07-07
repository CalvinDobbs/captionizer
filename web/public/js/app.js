const backendURL = `${window.location.protocol}//${window.location.hostname}:${window.location.port}/`;
let captions = [];
let prompt = "";
let activeReaders = [];

const fileInput = document.getElementById("files");
const promptInput = document.getElementById("prompt");
const displayWindow = document.getElementById("displayWindow");
const submitButton = document.getElementById("submit");
const progressContainer = document.getElementById("progressContainer");
const countComplete = document.getElementById("countComplete");
const countTotal = document.getElementById("countTotal");

const getCaption = async (image) => {
    const response = await fetch(backendURL + "run", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ prompt, image }),
    });
    const data = await response.json();
    if (data.error) {
        displayWindow.innerHTML = "Server Error";
        return false;
    }
    return data.output;
};

const handleCaptionGenerated = (captionObject) => {
    captions.push(captionObject);
    const captionDiv = document.createElement("div");
    captionDiv.innerHTML = `
    <div class="card captionCard">
        <div class="card-image">
            <img src="${captionObject.image}"/>
        </div>
        <div class="card-content">
            <p>${escape(captionObject.caption)}</p>
        </div>
    <div>
    `;
    displayWindow.appendChild(captionDiv);
};

const readFiles = (files) => {
    submitButton.disabled = true;
    countTotal.innerText = files.length;
    progressContainer.classList.remove("hidden");
    countComplete.innerText = 0;
    var reader = new FileReader();
    const readFile = (index) => {
        countComplete.innerText = index;
        if (index >= files.length) {
            submitButton.disabled = false;
            progressContainer.classList.add("hidden");
            return;
        }

        let file = files[index];
        reader.onload = async (e) => {
            const caption = await getCaption(e.target.result);
            if (caption === false) return;
            handleCaptionGenerated({
                image: e.target.result,
                caption: caption,
            });
            readFile(index + 1);
        };
        reader.readAsDataURL(file);
    };
    readFile(0);
};

document.getElementById("submit").addEventListener("click", () => {
    if (submitButton.disabled == true) return;
    if (fileInput.files.length == 0) return;
    displayWindow.innerHTML = "";
    prompt = promptInput.value;
    if (prompt.trim() == "") {
        prompt = "Write a simple caption";
    }
    captions = [];
    readFiles(fileInput.files);
});

function escape(htmlStr) {
    return htmlStr
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#39;");
}
