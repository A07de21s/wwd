function Earth(canvas)
{
  var o_earth = new Object;
  o_earth.canvas_ = canvas;

  o_earth.Init = function()
  {
    var wwd = new WorldWind.WorldWindow(this.canvas_);
    wwd.addLayer(new WorldWind.BMNGLayer());
    wwd.addLayer(new WorldWind.BMNGLandsatLayer());
    wwd.addLayer(new WorldWind.BingAerialWithLabelsLayer(null));
  
    wwd.addLayer(new WorldWind.CompassLayer());
    wwd.addLayer(new WorldWind.CoordinatesDisplayLayer(wwd));
    wwd.addLayer(new WorldWind.ViewControlsLayer(wwd));

    return wwd;
  }

  return o_earth;
}
