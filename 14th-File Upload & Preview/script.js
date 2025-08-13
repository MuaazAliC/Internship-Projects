
let dropZone = document.getElementById('dropZone');
let fileInput = document.getElementById('fileInput');
let previewList = document.getElementById('previewList');


let uploadedFiles = [];


dropZone.addEventListener('click', function () {
    fileInput.click();
});


fileInput.addEventListener('change', function (event) {
    let selectedFiles = event.target.files;
    addFiles(selectedFiles);
});


dropZone.addEventListener('dragover', function (event) {
    event.preventDefault(); 
    dropZone.classList.add('hover');
});


dropZone.addEventListener('dragleave', function () {
    dropZone.classList.remove('hover');
});


dropZone.addEventListener('drop', function (event) {
    event.preventDefault();
    dropZone.classList.remove('hover');
    let droppedFiles = event.dataTransfer.files;
    addFiles(droppedFiles);
});


function addFiles(files) {
    let filesArray = Array.from(files); 
    filesArray.forEach(function (file) {
        uploadedFiles.push(file);
    });
    showPreviews();
}


function showPreviews() {
    
    previewList.innerHTML = "";

    uploadedFiles.forEach(function (file, index) {
        
        let previewItem = document.createElement('div');
        previewItem.classList.add('preview-item');

        
        let deleteBtn = document.createElement('button');
        deleteBtn.classList.add('delete-btn');
        deleteBtn.innerHTML = "&times;";
        deleteBtn.addEventListener('click', function () {
            uploadedFiles.splice(index, 1); 
            showPreviews(); 
        });

        
        if (file.type.startsWith('image/')) {
            let img = document.createElement('img');
            img.src = URL.createObjectURL(file);
            previewItem.appendChild(img);
        } else if (file.type.startsWith('video/')) {
            let video = document.createElement('video');
            video.src = URL.createObjectURL(file);
            video.controls = true;
            previewItem.appendChild(video);
        }

        
        previewItem.appendChild(deleteBtn);

        
        previewList.appendChild(previewItem);
    });
}
