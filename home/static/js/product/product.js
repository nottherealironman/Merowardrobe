       var prod_sizes = [];
       var value;
       $('#id_size option').each(function(){
            value = $(this).val();
            if(parseInt(value) === parseInt(value, 10)){
                prod_sizes.push(parseInt(value));
            }
       });

       $(document).on('click','#js-add_product_info',function (e) {
           e.preventDefault();
           /*product id will be set only for product upload*/
           var product_id = $('#js-product_id').val();
           var form_data = $(this).closest('form').serialize()+'&product='+product_id;
           var url = $(this).closest('form').attr('action');

           $("#js-add_product_form").validate();
           $.ajax({
               url : url,
               type : 'post',
               dataType : 'json',
               data : form_data,
               success : function (response) {
                   if(response.is_valid){
                       $('#js-product_id').val(response.product);
                       $('#product_details-tab').removeClass('disabled');
                       $('#myTab a[href="#product_details"]').tab('show');

                   }
               }
           })
        });


        $(document).find(".chosen-select-js").chosen({
            width:'100%'
        });

        $(document).on("change","#id_category",function () {
          var url = $("#js-add_product_form").data("load_subcategories_url");
          var categoryId = $(this).val();

          $.ajax({
            url: url,
            data: {
              'category': categoryId
            },
            dataType:'json',
            success: function (response) {

                var options = [];
                var sizes = [];
                options.push('<option value="">Select Subcategory</option>');
                $.each(response.subcategories, function(key, val) {
                    options.push('<option value="'+key+'">'+val+'</option>');
                    console.log(key+'=>'+val);
                });
                $("#id_subcategory").html(options.join());

                sizes.push('<option value="">Choose Sizes</option>');
                sizes.push('<option value="all">All</option>');
                prod_sizes = [];
                $.each(response.sizes, function(key, val) {
                    sizes.push('<option value="'+key+'">'+val+'</option>');
                    prod_sizes.push(key);
                });
                console.log(sizes)
                $("#id_size").html(sizes.join());
                $("#id_size").trigger("chosen:updated");
            }
          });

        });

         $(document).on('change','#id_size',function (e) {
            if(Object.values($(this).val()).indexOf('all') > -1){
                $('#id_size').val(prod_sizes);
                $('#id_size').trigger("chosen:updated");
            }
        });

        $(document).on('click','#js-add_product_details',function (e) {
           e.preventDefault();
           var product_id = $('#js-product_id').val();
           var sizes = $('#id_size').val();
           sizes = sizes.join(',');
           var form_data = $($(this).closest('form')[0].elements).not('#id_size').serialize()+'&size='+sizes+'&product='+product_id;
           var url = $(this).closest('form').attr('action');

           $("#js-add_product_form").validate();
           $.ajax({
               url : url,
               type : 'post',
               dataType : 'json',
               data : form_data,
               success : function (response) {
                   if(response.is_valid){
                       $('#id_product').val(response.product);
                       $('#images_upload-tab').removeClass('disabled');
                       $('#myTab a[href="#images_upload"]').tab('show');
                   }
                   else{
                      Notifier.error(response.msg);
                   }
               }
           })
        });

        $(document).on('click','.js-upload-photos',function () {
            $("#js-upload_product_images").click();
        });

        $("#id_file").change(function () {
            readCropURL(this);
        });

        // Crop button on modal
        $(document).on('click','#js-crop_image',function () {
            var croppedCanvas = cropper.getCroppedCanvas();
            var cropData = cropper.getData();
            var file = $('#id_file')[0].files[0];
            var product_id = $('#id_product').val();

            var data = new FormData();
            data.append('file',file);
            data.append('x',cropData.x);
            data.append('y',cropData.y);
            data.append('height',cropData.height);
            data.append('width',cropData.width);
            data.append('product',product_id);
            data.append('csrfmiddlewaretoken','{{ csrf_token }}');
            
            var url = $('#js-upload_prod_img_form').attr('action');
            $.ajax({
                type: "POST",
                cache: false,
                url: url,
                data: data, 
                dataType: 'json',
                processData : false,
                contentType : false,
                success: function (response) {
                  if(response.is_valid){
                  console.log(response.total)
                    var img = "<img src='"+ media_url+response.filename +"' height='100' width='70'>";
                    var list = "<li class='list-group-item uploads_list'>"+img+"<span class='btn btn-danger btn-md pull-right uploads_trash js-remove-upload' data-upload_id="+response.upload_id+"><i class='fa fa-trash' aria-hidden='true'></i></span> </li>";
                    $(document).find('#uploads_wrapper').append(list);
                    $("#js-crop_modal").modal('hide');
                    $(".js-cover-tool").show();
                    if(response.total >= 5){
                        $(document).find('#id_file_label').hide();
                        Notifier.info(response.msg);
                    }
                    cropper.destroy();
                }
              }
            });

        });

        $(document).on('click','.js-remove-upload', function(e){
            var upload_id = $(this).data('upload_id');
            var csrf_token = document.getElementsByName('csrfmiddlewaretoken')[0].value;
            var url = $('#uploads_wrapper').data('url');
            var that = $(this);
            $.ajax({
                type: "POST",
                cache: false,
                url: url,
                data: {'csrfmiddlewaretoken':csrf_token,'upload_id': upload_id},
                dataType: 'json',
                success: function (response) {
                    if(response.is_valid){
                        Notifier.success(response.msg);
                        that.closest('.uploads_list').remove();
                        console.log($("#d_file_label").is(":visible"));
                        if($("#id_file_label").is(":hidden")){
                            $(document).find('#id_file_label').show();
                        }
                    }
                }

            });
        });

        $(document).on('click','#js-submit_uploads',function(e){
            var product_id = $('#js-product_id').val();
            var csrf_token = document.getElementsByName('csrfmiddlewaretoken')[0].value;
            var url = $(this).data('url');
            var that = $(this);
            $.ajax({
                type: "POST",
                cache: false,
                url: url,
                data: {'csrfmiddlewaretoken':csrf_token,'product_id': product_id},
                dataType: 'json',
                success: function (response) {
                    if(response.is_valid){
                        Notifier.success(response.msg);
                        window.location.replace(base_url+'/product/');
                    }
                    else{
                        Notifier.error(response.msg);
                    }
                }

            });
        });

        // Remove Product
        $(document).on('click','.js-remove_product', function(e){
            var product_id = $(this).data('product_id');
            var csrf_token = $(this).data('token');
            var url = base_url+'remove_product';
            console.log(csrf_token)
            console.log(url)
            var that = $(this);
            $.ajax({
                type: "POST",
                cache: false,
                url: url,
                data: {'csrfmiddlewaretoken':csrf_token,'product_id': product_id},
                dataType: 'json',
                success: function (response) {
                    if(response.is_valid){
                        Notifier.success(response.msg);
                        that.closest('tr').remove();
                    }
                    else{
                        Notifier.error(response.msg);
                    }
                }

            });
        });

        /*$("#fileupload").fileupload({
            dataType: 'json',
            done: function (e, data) {  /!* 3. PROCESS THE RESPONSE FROM THE SERVER *!/
                if (data.result.is_valid) {
                    $("#gallery tbody").prepend(
                        "<tr><td><a href='" + data.result.url + "'>" + data.result.name + "</a></td></tr>"
                    )
                }
            }
        });*/

        /*$("#js-color_picker").spectrum({
            color: "#ECC",
            showInput: true,
            className: "full-spectrum",
            showInitial: true,
            showPalette: true,
            showSelectionPalette: true,
            maxSelectionSize: 10,
            preferredFormat: "hex",
            localStorageKey: "spectrum.demo",
            move: function (color) {

            },
            show: function () {

            },
            beforeShow: function () {

            },
            hide: function () {

            },
            change: function(color) {
                $('#js-color_code').val(color.toHexString())
            },
            palette: [
                ["rgb(0, 0, 0)", "rgb(67, 67, 67)", "rgb(102, 102, 102)",
                "rgb(204, 204, 204)", "rgb(217, 217, 217)","rgb(255, 255, 255)"],
                ["rgb(152, 0, 0)", "rgb(255, 0, 0)", "rgb(255, 153, 0)", "rgb(255, 255, 0)", "rgb(0, 255, 0)",
                "rgb(0, 255, 255)", "rgb(74, 134, 232)", "rgb(0, 0, 255)", "rgb(153, 0, 255)", "rgb(255, 0, 255)"],
                ["rgb(230, 184, 175)", "rgb(244, 204, 204)", "rgb(252, 229, 205)", "rgb(255, 242, 204)", "rgb(217, 234, 211)",
                "rgb(208, 224, 227)", "rgb(201, 218, 248)", "rgb(207, 226, 243)", "rgb(217, 210, 233)", "rgb(234, 209, 220)",
                "rgb(221, 126, 107)", "rgb(234, 153, 153)", "rgb(249, 203, 156)", "rgb(255, 229, 153)", "rgb(182, 215, 168)",
                "rgb(162, 196, 201)", "rgb(164, 194, 244)", "rgb(159, 197, 232)", "rgb(180, 167, 214)", "rgb(213, 166, 189)",
                "rgb(204, 65, 37)", "rgb(224, 102, 102)", "rgb(246, 178, 107)", "rgb(255, 217, 102)", "rgb(147, 196, 125)",
                "rgb(118, 165, 175)", "rgb(109, 158, 235)", "rgb(111, 168, 220)", "rgb(142, 124, 195)", "rgb(194, 123, 160)",
                "rgb(166, 28, 0)", "rgb(204, 0, 0)", "rgb(230, 145, 56)", "rgb(241, 194, 50)", "rgb(106, 168, 79)",
                "rgb(69, 129, 142)", "rgb(60, 120, 216)", "rgb(61, 133, 198)", "rgb(103, 78, 167)", "rgb(166, 77, 121)",
                "rgb(91, 15, 0)", "rgb(102, 0, 0)", "rgb(120, 63, 4)", "rgb(127, 96, 0)", "rgb(39, 78, 19)",
                "rgb(12, 52, 61)", "rgb(28, 69, 135)", "rgb(7, 55, 99)", "rgb(32, 18, 77)", "rgb(76, 17, 48)"]
            ]
        });*/