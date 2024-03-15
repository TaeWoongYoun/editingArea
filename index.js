$(document).ready(function() {
    $("#addBtn").click(function() {
        var input = $("<input>").attr({
            type: "file",
            accept: "image/*"
        }).on("change", function(event) {
            var file = event.target.files[0];
            if (file) {
                var reader = new FileReader();
                reader.onload = function() {
                    var image = $("<img>").attr("src", reader.result);
                    $(".area").append(image);
                };
                reader.readAsDataURL(file);
            }
        });
        input.click();
    });
});