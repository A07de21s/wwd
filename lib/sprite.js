function Sprite(engine)
{
  var o_sprite = new Object;
  o_sprite.engine_ = engine;

  o_sprite.flag = true;
  
  o_sprite.DrawPlacemark = function(img_src, position, label, label_color)
  {
    var placemark,
        placemark_attributes = new WorldWind.PlacemarkAttributes(null),
        highlight_attributes,
        placemark_layer = new WorldWind.RenderableLayer("Placemarks");

    placemark_attributes.imageScale = 1;
    placemark_attributes.imageOffset = new WorldWind.Offset(
      WorldWind.OFFSET_FRACTION, 0.3, WorldWind.OFFSET_FRACTION, 0.0);
    placemark_attributes.imageColor = WorldWind.Color.WHITE;
    placemark_attributes.labelAttributes.offset = new WorldWind.Offset(
      WorldWind.OFFSET_FRACTION, 0.5, WorldWind.OFFSET_FRACTION, 1.0);
    placemark_attributes.labelAttributes.color = label_color;
    placemark_attributes.drawLeaderLine = true;
    placemark_attributes.leaderLineAttributes.outlineColor = WorldWind.Color.RED;

    placemark = new WorldWind.Placemark(position, false, null);
    placemark.label = label;
    placemark.altitudeMode = WorldWind.RELATIVE_TO_GROUND;

    placemark_attributes = new WorldWind.PlacemarkAttributes( placemark_attributes);
    placemark_attributes.imageSource = image_src;
    placemark.attributes = placemark_attributes;

    highlight_attributes = new WorldWind.PlacemarkAttributes(placemark_attributes);
    highlight_attributes.imageScale = 1.2;
    placemark.highlightAttributes = highlight_attributes;

    placemark_layer.addRenderable(placemark);
    this.engine_.addLayer(placemark_layer);
    this.engine_.deepPicking = true;
    var highlightController = new WorldWind.HighlightController(this.engine_);
  }

  o_sprite.DrawPlacemarkbyClick = function()
  {
   
    this.engine_.addEventListener("mousedown", o_sprite.DrawPlacemarkEvent);
    // this.engine_.removeListener(ll);
    // this.engine_.addEventListener("keydown", o_sprite.ChangStatus);
  }

  o_sprite.DrawPlacemarkEvent = function(o)
  {
    if (o.button == 2)
    {
      o_sprite.flag = false;
    }
    var image_src = null;
    var label = 0;
    var label_color = WorldWind.Color.YELLOW;
    var pick_list = o_sprite.engine_.pick(o_sprite.engine_.canvasCoordinates(
      o.clientX, o.clientY));
// alert(this.flag);
    if (pick_list.objects.length > 0)
    {
      for (var p = 0; p < pick_list.objects.length; p++)
      {
        pick_list.objects[p].userObject.highlighted = true;
        if (pick_list.objects[p].isOnTop && pick_list.objects[p].isTerrain 
          && o_sprite.flag)
        {
          o_sprite.DrawPlacemark(image_src, 
            pick_list.objects[p].position, label, label_color);
        }
      }
    }
  }

 
  o_sprite.ChangStatus = function(e)
  {
    alert(123);
  }

  o_sprite.DrawPathLine = function(position_0, position_1, color, wide)
  {
    var path_positions = [];
    path_positions.push(position_0);
    path_positions.push(position_1);

    // Create the path.
    var path = new WorldWind.Path(path_positions, null);
    path.altitudeMode = WorldWind.RELATIVE_TO_GROUND;
    path.followTerrain = true;
    path.extrude = true;
    path.useSurfaceShapeFor2D = true;

    // Create and assign the path's attributes.
    var path_attributes = new WorldWind.ShapeAttributes(null);
    path_attributes.outlineColor = color;
    path_attributes.interiorColor = new WorldWind.Color(0, 1, 1, 0.5);
    // draw verticals only when extruding
    path_attributes.drawVerticals = path.extrude; 
    path.attributes = path_attributes;

    
    // Create and assign the path's highlight attributes.
    var highlight_attributes_path = new WorldWind.ShapeAttributes(path_attributes);
    highlight_attributes_path.outlineColor = WorldWind.Color.RED;
    highlight_attributes_path.interiorColor = new WorldWind.Color(1, 1, 1, 0.5);
    path.highlightAttributes = highlight_attributes_path;

    // Add the path to a layer and the layer to the World Window's layer list.
    var paths_layer = new WorldWind.RenderableLayer();
    paths_layer.displayName = "Paths";
    paths_layer.addRenderable(path);
    this.engine_.addLayer(paths_layer);
  }

  o_sprite.DrawSurefaceShape = function(boundary, boundary_color, color)
  {
    var shapes_layer = new WorldWind.RenderableLayer("Surface Shapes");
    this.engine_.addLayer(shapes_layer);
    
    var attributes = new WorldWind.ShapeAttributes(null);
        attributes.outlineColor = boundary_color;
        attributes.interiorColor = color;
    
    var highlightAttributes = new WorldWind.ShapeAttributes(attributes);
        highlightAttributes.interiorColor = new WorldWind.Color(1, 1, 1, 1);
    
    var shape = new WorldWind.SurfacePolygon(boundary, attributes);
        shape.highlightAttributes = highlightAttributes;
        shapes_layer.addRenderable(shape);
    
    // var layerManger = new LayerManager(this.engine_);
    var highlightController = new WorldWind.HighlightController(this.engine_);
  }

  return o_sprite;
}
