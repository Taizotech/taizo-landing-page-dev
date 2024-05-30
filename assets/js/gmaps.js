function initialize() {

    var mapOptions, map, marker, searchBox, city,
        infoWindow = '',
        addressEl = document.querySelector('#map-search'),
        addressE2 = document.querySelector('#Interview_map-search'),
        latEl = document.querySelector('.latitude'),
        longEl = document.querySelector('.longitude'),
        element = document.querySelector('.map-canvas');
    jobaddress = document.querySelector('#joblocaddress');
    element1 = document.querySelector('.map-canvas.intLocMap');
    jsDtPerLocMap = document.querySelector('#jsDtPerLocMap');
    // element = document.getElementById( 'map-canvas' );
    // element1 = document.getElementById( 'Intervie_map-canvas' );
    city = document.querySelector('.reg-input-city');




    // default location
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(successFunction, errorFunction);
    } else {
        defltLoc();
    }


    function successFunction(position) {
        var lat = position.coords.latitude;
        var long = position.coords.longitude;
        // alert('Your latitude is :'+lat+' and longitude is '+long);
        localStorage.setItem('mapLat', lat);
        localStorage.setItem('mapLng', long);
    }

    function errorFunction(position) {
        defltLoc();
    }

    function defltLoc() {
        var findLoc = "A- 2 Happy Homes , New No - 9 ,Old No - 4, 4th Main Rd, United India Colony, Kod, Chennai, Tamil Nadu 600024";

        $.ajax({

            url: 'https://maps.googleapis.com/maps/api/geocode/json?address=' + findLoc + '&key=AIzaSyDClUaUiKoy6KFC0ZrEPM-a5RF80OWysOc',
            header: { 'Access-Control-Allow-Origin': '*' },
            type: "GET",
            dataType: "json",
            success: function(data) {
                var mapLat = data.results[0].geometry.location.lat;
                var mapLng = data.results[0].geometry.location.lng;
                // console.log(data);
                localStorage.setItem('mapLat', mapLat);
                localStorage.setItem('mapLng', mapLng);
            }
        });
    }

    // default location




    mapOptions = {
        // How far the maps zooms in.
        zoom: 18,
        // Current Lat and Long position of the pin/
        center: new google.maps.LatLng(localStorage.getItem('mapLat'), localStorage.getItem('mapLng')),
        // center : {
        // 	lat: -34.397,
        // 	lng: 150.644
        // },
        disableDefaultUI: false, // Disables the controls like zoom control on the map if set to true
        scrollWheel: true, // If set to false disables the scrolling on the map.
        draggable: true, // If set to false , you cannot move the map around.
        // mapTypeId: google.maps.MapTypeId.HYBRID, // If set to HYBRID its between sat and ROADMAP, Can be set to SATELLITE as well.
        // maxZoom: 11, // Wont allow you to zoom more than this
        // minZoom: 9  // Wont allow you to go more up.

    };

    mapOptions1 = {
        // How far the maps zooms in.
        zoom: 18,
        // Current Lat and Long position of the pin/
        center: new google.maps.LatLng(localStorage.getItem('mapLat'), localStorage.getItem('mapLng')),
        // center : {
        // 	lat: -34.397,
        // 	lng: 150.644
        // },
        disableDefaultUI: false, // Disables the controls like zoom control on the map if set to true
        scrollWheel: true, // If set to false disables the scrolling on the map.
        draggable: true, // If set to false , you cannot move the map around.
        // mapTypeId: google.maps.MapTypeId.HYBRID, // If set to HYBRID its between sat and ROADMAP, Can be set to SATELLITE as well.
        // maxZoom: 11, // Wont allow you to zoom more than this
        // minZoom: 9  // Wont allow you to go more up.

    };


    // Update display map on preview
    Displaymap = {
        // How far the maps zooms in.
        zoom: 18,
        // Current Lat and Long position of the pin/
        center: new google.maps.LatLng(localStorage.getItem('lat'), localStorage.getItem('long')),
        // center : {
        // 	lat: -34.397,
        // 	lng: 150.644
        // },
        disableDefaultUI: false, // Disables the controls like zoom control on the map if set to true
        scrollWheel: false, // If set to false disables the scrolling on the map.
        draggable: false, // If set to false , you cannot move the map around.
        // mapTypeId: google.maps.MapTypeId.HYBRID, // If set to HYBRID its between sat and ROADMAP, Can be set to SATELLITE as well.
        // maxZoom: 11, // Wont allow you to zoom more than this
        // minZoom: 9  // Wont allow you to go more up.

    };
    dmap1 = new google.maps.Map(jsDtPerLocMap, Displaymap); // Till this like of code it loads up the map.
    // End of Update display map on preview


    /**
     * Creates the map using google function google.maps.Map() by passing the id of canvas and
     * mapOptions object that we just created above as its parameters.
     *
     */
    // Create an object map with the constructor function Map()
    map = new google.maps.Map(element, mapOptions); // Till this like of code it loads up the map.
    map1 = new google.maps.Map(element1, mapOptions1); // Till this like of code it loads up the map.


    /**
     * Creates the marker on the map
     *
     */
    marker = new google.maps.Marker({
        position: mapOptions.center,
        map: map,
        // icon: 'http://pngimages.net/sites/default/files/google-maps-png-image-70164.png',
        draggable: true
    });

    marker1 = new google.maps.Marker({
        position: mapOptions1.center,
        map: map1,
        // icon: 'http://pngimages.net/sites/default/files/google-maps-png-image-70164.png',
        draggable: true
    });



    /**
     * Creates a search box
     */
    searchBox = new google.maps.places.SearchBox(addressEl);
    searchBox2 = new google.maps.places.SearchBox(addressE2);

    /**
     * When the place is changed on search box, it takes the marker to the searched location.
     */
    google.maps.event.addListener(searchBox, 'places_changed', function() {
        var places = searchBox.getPlaces(),
            bounds = new google.maps.LatLngBounds(),
            i, place, lat, long, resultArray,
            addresss = places[0].formatted_address;
        // console.log(addresss, places);
        // var address_components = places[0].address_components;
        var address_components = places[0].formatted_address;
        var state = "";
        var country = "";
        var area = "";
        // console.log(address_components);
        if (address_components.length > 3) {
            var len = address_components.length;
            if (address_components[len - 2].long_name != "") {
                country = address_components[len - 2].long_name;
            }
            if (address_components[len - 3].long_name != "") {
                state = address_components[len - 3].long_name;
            }
            if (address_components[len - 4].long_name != "") {
                area = address_components[len - 4].long_name;
            }
        }
        //  console.log(address_components);
        // console.log(places);

        var rating = 0;
        var reviews = 0;
        if (places[0].rating != "" && places[0].rating > 0) {
            rating = places[0].rating.toFixed(1);
        }
        if (places[0].reviews != "" && places[0].reviews > 0) {
            reviews = places[0].reviews.length;
        }
        var stars = rating + " ";
        var stars_cn = 0;
        for (var i = 0; i < places[0].rating; i++) {
            stars = stars + '<i class="fa fa-star" aria-hidden="true" style="color: #ffff00a1;border: 0.5px black;"></i>';
            stars_cn++;
        }
        for (var i = stars_cn; i < 5; i++) {
            stars = stars + '<i class="fa fa-star" aria-hidden="true"></i>';
        }
        stars = stars + '  <a href="#" style="text-decoration: underline;color: #5868defc;" >' + reviews + ' reviews</a>';

        $('.map-choose-title').text(places[0].name);
        $('.map-choose-location').text(addresss);
        $('.map-choose-star').html(stars);
        //After Confirm
        // $('.locaddtxt, .jsDtPerLocAddPrev').html(addresss);
        // $('#jsJbAddress').text(addresss);
        // $('#joblocaddress').text(addresss);

        // $('.PsJsBdyWrp.active .JobLocationAdd').show();
        // $('.PsJsSp1 .PSJobLocPlaceholderWrp').hide();
        // $('.locMapsWrp').fadeOut();
        $("div.map-canvas").addClass('active');
        $(".map-sidebar-1").css("display", "block");
        $(".map-sidebar-2").css("display", "block");


        for (i = 0; place = places[i]; i++) {
            bounds.extend(place.geometry.location);
            marker.setPosition(place.geometry.location); // Set marker position new.
        }

        map.fitBounds(bounds); // Fit to the bound
        map.setZoom(15); // This function sets the zoom to 15, meaning zooms to level 15.
        // console.log( map.getZoom() );

        lat = marker.getPosition().lat();
        long = marker.getPosition().lng();

        // latEl.value = lat;
        // longEl.value = long;

        // resultArray =  places[0].address_components;
        resultArray = places[0].formatted_address;


        $("#lstJobAdr").val(addresss);
        $("#lstJobLat").val(lat);
        $("#lstJobLng").val(long);
        $("#lstJobAre").val(area);
        $("#lstJobStat").val(state);
        $("#lstJobCunt").val(country);

        if ($(".intlocaddtxt").text() == "") {
            $("#lstIntAdr").val(addresss);
            $("#lstIntLat").val(lat);
            $("#lstIntLng").val(long);
        }

        // Get the city and set the city input value to the one selected
        for (var i = 0; i < resultArray.length; i++) {
            if (resultArray[i].types[0] && 'administrative_area_level_2' === resultArray[i].types[0]) {
                citi = resultArray[i].long_name;
                // city.value = citi;
                $("#lstJobCty").val(citi);
                if ($(".intlocaddtxt").text() == "") {
                    $("#lstIntCty").val(citi);
                }
            }
        }

        // Closes the previous info window if it already exists
        if (infoWindow) {
            infoWindow.close();
        }
        /**
         * Creates the info Window at the top of the marker
         */
        infoWindow = new google.maps.InfoWindow({
            content: addresss
        });

        infoWindow.open(map, marker);
    });

    google.maps.event.addListener(searchBox2, 'places_changed', function() {
        var places = searchBox2.getPlaces(),
            bounds = new google.maps.LatLngBounds(),
            i, place, lat, long, resultArray,
            addresss = places[0].formatted_address;
        // console.log("this second working"+places[0]);

        var rating = 0;
        var reviews = 0;
        if (places[0].rating != "" && places[0].rating > 0) {
            rating = places[0].rating.toFixed(1);
        }
        if (places[0].reviews != "" && places[0].reviews > 0) {
            reviews = places[0].reviews.length;
        }
        var stars = rating + " ";
        var stars_cn = 0;
        for (var i = 0; i < places[0].rating; i++) {
            stars = stars + '<i class="fa fa-star" aria-hidden="true" style="color: #ffff00a1;border: 0.5px black;"></i>';
            stars_cn++;
        }
        for (var i = stars_cn; i < 5; i++) {
            stars = stars + '<i class="fa fa-star" aria-hidden="true"></i>';
        }
        stars = stars + '  <a href="#" style="text-decoration: underline;color: #5868defc;" >' + reviews + ' reviews</a>';
        $('.map-choose-title').text(places[0].name);
        $('.map-choose-location').text(addresss);
        $('.intlocaddtxt, .jsDtPerIntAddPrev').html(addresss);
        // $('#joblocaddress').text(addresss);
        // $('.map-choose-star').html(stars);
        // $('.locaddtxt, .jsDtPerLocAddPrev').html(addresss);
        // // $('.PsJsBdyWrp.active .JobLocationAdd').show();
        // // $('.PsJsSp1 .PSJobLocPlaceholderWrp').hide();
        // // $('.locMapsWrp').fadeOut();
        $("div.map-canvas").addClass('active');
        $(".map-sidebar-1").css("display", "block");
        $(".map-sidebar-2").css("display", "block");
        for (i = 0; place = places[i]; i++) {
            bounds.extend(place.geometry.location);
            marker1.setPosition(place.geometry.location); // Set marker position new.
        }

        map.fitBounds(bounds); // Fit to the bound
        map.setZoom(15); // This function sets the zoom to 15, meaning zooms to level 15.
        // console.log( map.getZoom() );

        lat = marker1.getPosition().lat();
        long = marker1.getPosition().lng();
        // latEl.value = lat;
        // longEl.value = long;


        $("#lstIntAdr").val(addresss);
        $("#lstIntLat").val(lat);
        $("#lstIntLng").val(long);
        // $(".intlocaddtxt").text(addresss);
        // $("#intLat").val(lat);
        // $("#intLong").val(long);
        // console.log(addresss+" lat "+lat+" long "+long);

        resultArray = places[0].address_components;

        // Get the city and set the city input value to the one selected
        for (var i = 0; i < resultArray.length; i++) {
            if (resultArray[i].types[0] && 'administrative_area_level_2' === resultArray[i].types[0]) {
                citi = resultArray[i].long_name;
                // city.value = citi;
                $("#intCity").val(citi);
            }
        }


        // Closes the previous info window if it already exists
        if (infoWindow) {
            infoWindow.close();
        }
        /**
         * Creates the info Window at the top of the marker
         */
        infoWindow = new google.maps.InfoWindow({
            content: addresss
        });

        infoWindow.open(map, marker1);
    });


    /**
     * Finds the new position of the marker when the marker is dragged.
     */
    google.maps.event.addListener(marker, "dragend", function(event) {
        var lat, long, address, resultArray, citi, place_id;

        // console.log( 'i am dragged marker1' );
        lat = marker.getPosition().lat();
        long = marker.getPosition().lng();

        var geocoder = new google.maps.Geocoder();
        // console.log(geocoder);
        geocoder.geocode({ latLng: marker.getPosition() }, function(result, status) {
            if ('OK' === status) { // This line can also be written like if ( status == google.maps.GeocoderStatus.OK ) {
                address = result[0].formatted_address;
                place_id = result[0].place_id;
                resultArray = result[0].address_components;

                // Get the city and set the city input value to the one selected
                for (var i = 0; i < resultArray.length; i++) {
                    if (resultArray[i].types[0] && 'administrative_area_level_2' === resultArray[i].types[0]) {
                        citi = resultArray[i].long_name;
                        // console.log( citi );
                        // city.value = citi;
                        $("#lstJobCty").val(citi);
                        if ($(".intlocaddtxt").text() == "") {
                            $("#lstIntCty").val(citi);
                        }
                    }
                }
                addressEl.value = "";
                // latEl.value = lat;
                // longEl.value = long;
                // jobaddress.value=address;


                // $('.PsJsBdyWrp.active .JobLocationAdd').show();
                // $('.PsJsSp1 .PSJobLocPlaceholderWrp').hide();
                // $('.locMapsWrp').fadeOut();

                var address_components = result[0].address_components;
                var state = "";
                var country = "";
                var area = "";

                if (address_components.length > 3) {
                    var len = address_components.length;
                    if (address_components[len - 2].long_name != "") {
                        country = address_components[len - 2].long_name;
                    }
                    if (address_components[len - 3].long_name != "") {
                        state = address_components[len - 3].long_name;
                    }
                    if (address_components[len - 4].long_name != "") {
                        area = address_components[len - 4].long_name;
                    }
                }
                // console.log(area);
                $('.map-choose-location').text(address);
                $("#lstJobAdr").val(address);
                $("#lstJobLat").val(lat);
                $("#lstJobLng").val(long);
                $("#lstJobAre").val(area);
                $("#lstJobStat").val(state);
                $("#lstJobCunt").val(country);
                //CSS For Sidebar In MAP
                $("div.map-canvas").addClass('active');
                $(".map-sidebar-1").css("display", "block");
                $(".map-sidebar-2").css("display", "block");

                if ($(".intlocaddtxt").text() == "") {
                    $("#lstIntAdr").val(address);
                    $("#lstIntLat").val(lat);
                    $("#lstIntLng").val(long);
                }
                //Show The Details
                // $('.map-choose-location').text(address);
                // $('#jsJbAddress').text(address);
                // $('.locaddtxt, .jsDtPerLocAddPrev').html(address);
                // $('.intlocaddtxt, .jsDtPerIntAddPrev').html(address);
                // $('.map-choose-addres').text(address);
                // $('#joblocaddress').val(address);
                // console.log(result);
                // $(".intlocaddtxt").text(address);
                // $("#intLat").val(lat);
                // $("#intLong").val(long);

                // console.log(marker);

            } else {
                // console.log( 'Geocode was not successful for the following reason: ' + status );
            }




            // Closes the previous info window if it already exists
            if (infoWindow) {
                infoWindow.close();
            }

            /**
             * Creates the info Window at the top of the marker
             */
            infoWindow = new google.maps.InfoWindow({
                content: address
            });

            infoWindow.open(map, marker);
        });
    });


    // interview location marker
    google.maps.event.addListener(marker1, "dragend", function(event) {
        var lat, long, address, resultArray, citi;

        // console.log( 'i am dragged marker2' );
        lat = marker1.getPosition().lat();
        long = marker1.getPosition().lng();

        var geocoder = new google.maps.Geocoder();
        geocoder.geocode({ latLng: marker1.getPosition() }, function(result, status) {
            if ('OK' === status) { // This line can also be written like if ( status == google.maps.GeocoderStatus.OK ) {
                address = result[0].formatted_address;
                resultArray = result[0].address_components;

                // Get the city and set the city input value to the one selected
                for (var i = 0; i < resultArray.length; i++) {
                    if (resultArray[i].types[0] && 'administrative_area_level_2' === resultArray[i].types[0]) {
                        citi = resultArray[i].long_name;
                        // console.log( citi );
                        // city.value = citi;
                        $('#lstIntLng').val(citi);
                    }
                }


                // addressEl.value = "";
                // latEl.value = lat;
                // longEl.value = long;

                // $('.PsJsBdyWrp.active .intLocationAdd').show();
                // $('.PsJsSp2 .PSJobLocPlaceholderWrp').hide();
                // $('.PsJsSp2 .locMapsWrp').fadeOut();


                //CSS For Sidebar In MAP
                $("div.map-canvas").addClass('active');
                $(".map-sidebar-1").css("display", "block");
                $(".map-sidebar-2").css("display", "block");

                $('.map-choose-location').text(address);
                $("#lstIntAdr").val(address);
                $("#lstIntLat").val(lat);
                $("#lstIntLng").val(long);
                //Show The Detail
                // $('#intLat').val(lat);
                // $('#intLong').val(long);
                // $('#intCity').val(address);
                // $('.intlocaddtxt, .jsDtPerIntAddPrev').html(address);

                // console.log(address);

            } else {
                // console.log( 'Geocode was not successful for the following reason: ' + status );
            }

            // Closes the previous info window if it already exists
            if (infoWindow) {
                infoWindow.close();
            }

            /**
             * Creates the info Window at the top of the marker
             */
            infoWindow = new google.maps.InfoWindow({
                content: address
            });

            infoWindow.open(map1, marker1);
        });
    });
    // end of interview location marker


    //Api For Review And Rating
    // https://maps.googleapis.com/maps/api/place/details/json?place_id='+place_id+'&fields=reviews&key=AIzaSyDClUaUiKoy6KFC0ZrEPM-a5RF80OWysOc

}