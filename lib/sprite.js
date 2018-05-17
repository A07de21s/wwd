function Sprite(engine)
{
  var o_sprite = new Object;
  o_sprite.engine_ = engine;
  
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

  o_sprite.DrawPlacemarkbyClick()
  {
    
  }

  return o_sprite;
}
