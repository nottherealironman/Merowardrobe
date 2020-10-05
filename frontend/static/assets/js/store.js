// For location picker
    var placeSearch, autocomplete;
    var componentForm = {};

    function initAutocomplete() {
        autocomplete = new google.maps.places.Autocomplete(
            (document.getElementById('id_location')),
            {types: ['geocode']});

        // When the user selects an address from the dropdown, populate the address
        // fields in the form.
        autocomplete.addListener('place_changed', fillInAddress);
        // autocomplete.addListener('place_changed', geolocate);
    }

    function fillInAddress() {
        // Get the place details from the autocomplete object.
        var place = autocomplete.getPlace();
        var location = place.place_id;
        //console.log(location);

        for (var component in componentForm) {
            document.getElementById(component).value = '';
            document.getElementById(component).disabled = false;
        }

        // Get each component of the address from the place details
        // and fill the corresponding field on the form.
        for (var i = 0; i < place.address_components.length; i++) {
            var addressType = place.address_components[i].types[0];
            if (componentForm[addressType]) {
                var val = place.address_components[i][componentForm[addressType]];
                document.getElementById(addressType).value = val;
            }
        }

        // Set lat and long
        var p = place.geometry.viewport
        for (var key in p) {
            if (p.hasOwnProperty(key)) {
                //console.log(key + " -> " + p[key]);

                latlong = p[key];
                for (var k in latlong) {
                    if (latlong.hasOwnProperty(k)) {
                        console.log(k + " -> " + latlong[k]);
                    }
                }

            }
        }
    }

    $(document).on('click','#js-add_store',function (e) {
           e.preventDefault();

           var data = new FormData();
           var pan_uploads = $('#id_pan_uploads')[0].files[0];
           var form_data = $(this).closest('form').serializeArray();
           data.append('pan_uploads',pan_uploads);
           $.each(form_data, function(key, obj){
                data.append(obj.name,obj.value)
           });

           var url = $(this).closest('form').attr('action');
           $.ajax({
               url : url,
               type : 'post',
               dataType : 'json',
               data : data,
               processData : false,
               contentType : false,
               success : function (response) {
                   if(response.is_valid){
                        Notifier.success('Bravo! Your Store has been created.');
                   }
                   else{
                        $('.error_wrapper').html('');
                        $.each(response.errors, function(key, value){
                            $('#id_error_'+key).html(value);
                        });
                        Notifier.error('Please fill all the required fields.');
                   }
               },
               error: function (xhr, ajaxOptions, thrownError) {
                console.log(xhr.status);
                console.log(thrownError);
              }
           })
        });