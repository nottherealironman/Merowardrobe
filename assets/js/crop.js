        var cropper;
        function ImageCrop() {
            var image = document.getElementById('image');
            var cropBoxData;
            var canvasData;
            var cropInit;
            cropInit = new Cropper(image, {
                autoCropArea: 1,
                aspectRatio: 10 / 15,
                built: function () {
                    // Strict mode: set crop box data first
                    cropInit.setCropBoxData(cropBoxData).setCanvasData(canvasData);
                }
            });

            cropper = cropInit;
        }

        function readCropURL(input) {
                if (input.files && input.files[0]) {
                    var reader = new FileReader();
                    reader.onload = function () {
                        var path = reader.result;
                        $("#js-crop_modal").find("#js-crop_image_wrapper").html('<img src="' + path + '" id="image" style="width:100%;">');
                        setTimeout(function () {
                            ImageCrop();
                        }, 500);
                        $("#js-crop_modal").modal('show');
                    }
                    reader.readAsDataURL(input.files[0]);
                }
            }