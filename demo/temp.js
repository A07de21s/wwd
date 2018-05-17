 $("#earth_canvas").attr("width", $(window).get(0).innerWidth-255);
        $("#earth_canvas").attr("height", $(window).get(0).innerHeight-120);
        // Define the event listener to initialize Web WorldWind.
        function eventWindowLoaded() {
            // Create a WorldWindow for the canvas.
            var wwd = new WorldWind.WorldWindow("earth_canvas");

            // Add some image layers to the WorldWindow's globe.
            wwd.addLayer(new WorldWind.BMNGLayer());
            wwd.addLayer(new WorldWind.BMNGLandsatLayer());
            wwd.addLayer(new WorldWind.BingAerialWithLabelsLayer(null));

            // Add a compass, a coordinates display and some view controls to the WorldWindow.
            wwd.addLayer(new WorldWind.CompassLayer());
            wwd.addLayer(new WorldWind.CoordinatesDisplayLayer(wwd));
            wwd.addLayer(new WorldWind.ViewControlsLayer(wwd));


           var placemarkAttributes = new WorldWind.PlacemarkAttributes(null);
           var position_ = new WorldWind.Position(24, 120, 0);
           var placemarkLayer = new WorldWind.RenderableLayer("Placemarks");
           var placemark = new WorldWind.Placemark(new WorldWind.Position(24, 102, 1e2), false, null);
        
        placemarkAttributes = new
  WorldWind.PlacemarkAttributes(placemarkAttributes);
        placemarkAttributes.imageSource = "../img/castshadow-black.png";
         
        placemark.attributes = placemarkAttributes;
        placemarkLayer.addRenderable(placemark);

          wwd.goTo(new WorldWind.Location(24.74978974983275, 102.75893278925));
        
         wwd.addLayer(placemarkLayer);

          var event_alert = function(o)
          {
            var x = o.clientX,
                y = o.clientY;
            var pickList = wwd.pick(wwd.canvasCoordinates(x, y)); 
            // alert(pickList.objects.length);
            if (pickList.objects.length > 0) 
            {
              for (var p = 0; p < pickList.objects.length; p++)
              {
                pickList.objects[p].userObject.highlighted = true; 
                console.log(pickList.objects[p]);
                if (pickList.objects[p].isOnTop &&
                  pickList.objects[p].isTerrain==false)
                {
                  alert("123");
                }
              }
            }
          }

            wwd.addEventListener("mousedown", event_alert);
                   }
        eventWindowLoaded();
       

