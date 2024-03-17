$(document).ready(function() {
    // 추가 버튼 클릭 시
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
                    var container = $("<div>").addClass("image-container").append(image);
                    $(".area").append(container);
                };
                reader.readAsDataURL(file);
            }
        });
        input.click();
    });
    // 글상자 버튼 클릭 시
    $("#textBoxBtn").click(function() {
        $(".text-container").show();
    });
    // 텍스트 추가 버튼 클릭 시
    $("#addTextBtn").click(function() {
        var text = $("#textInput").val();
        if (text.trim() !== "") {
            var pTag = $("<p>").addClass("text-on-image").text(text);
            $(".image-container:last").append(pTag); // 이미지와 함께 텍스트를 .image-container에 추가
            $("#textInput").val("");
            $(".text-container").hide();
        }
    });
    // 글상자 이동 및 회전 버튼 클릭 시
    $("#rotateBtn").click(function() {
        $(".text-on-image").toggleClass("rotate");
        // 마우스 좌측버튼을 클릭하고 드래그하여 글상자를 이동할 때
        $(document).on("mousedown", ".text-on-image", function(event) {
            isDragging = true;
            startX = event.clientX;
            startY = event.clientY;
            initialLeft = $(this).position().left;
            initialTop = $(this).position().top;
        });
        // 마우스를 떼면 드래그를 중지합니다.
        $(document).on("mouseup", function() {
            isDragging = false;
        });
        // 마우스를 이동하면서 드래그한 경우 글상자를 이동합니다.
        $(document).on("mousemove", function(event) {
            if (isDragging) {
                let offsetX = event.clientX - startX;
                let offsetY = event.clientY - startY;
                let newX = initialLeft + offsetX;
                let newY = initialTop + offsetY;
                $(".text-on-image").css({
                    left: newX + "px",
                    top: newY + "px"
                });
            }
        });
    });

    $(document).on("keydown", function(event) {
        // 컨트롤 + 우측방향키를 누르면
        if (event.ctrlKey && event.keyCode === 39) {
            // 글상자를 시계방향으로 90도 회전
            $(".text-on-image").each(function() {
                let rotation = ($(this).data("rotation") || 0) + 90;
                $(this).css("transform", "rotate(" + rotation + "deg)");
                $(this).data("rotation", rotation);
            });
        }
    });
    // 원래대로버튼 클릭 시
    $("#resetBtn").click(function() {
        $(".text-on-image").remove(); // 텍스트 박스 제거
        $(".text-container").hide(); // 텍스트 입력 창 숨기기
    });

        // 삭제 버튼 클릭 시
    $("#deleteBtn").click(function() {
        $(".image-container").remove(); // 이미지 및 텍스트 컨테이너 제거
        $(".text-on-image").remove(); // 텍스트 박스 제거
        $(".text-container").hide(); // 텍스트 입력 창 숨기기
    });
});