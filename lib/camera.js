function Camera(engine)
{
  var o_camera = new Object;
  o_camera.engine_ = engine;

  o_camera.Flyto(position)
  {
    this.engine_.goto(position);
  }

  return o_camera;
}
