function earth_init()
{
  var wwd = new WorldWind.WorldWindow("earth_canvas");
  wwd.addLayer(new WorldWind.BMNGLayer());
  wwd.addLayer(new WorldWind.BMNGLandsatLayer());
  wwd.addLayer(new WorldWind.BingAerialWithLabelsLayer(null));
  
  wwd.addLayer(new WorldWind.CompassLayer());
  wwd.addLayer(new WorldWind.CoordinatesDisplayLayer(wwd));
  wwd.addLayer(new WorldWind.ViewControlsLayer(wwd));

  return wwd;
}
