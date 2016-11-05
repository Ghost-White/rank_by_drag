function ShowFileName() {
    var files = document.getElementById("file").files;
    for(var i = 0; i < files.length; i+=1) {
        var file = files[i];
        console.log(file);
        console.log(file.name);
     }
}
