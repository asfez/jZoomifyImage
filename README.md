jZoomifyImage
=============

A jquery plugin to display a zoomify image with the library OpenLayers. 
- Responsive
- Autozoom to adapt the image size to the container size.
- Setup a minimal zoom to prevent the image to be to small.


$("#targetDiv").jZoomifyImage({
      url: zoomifyImageUrl,
      [width: image.width,]
      [height: image.height]
  });
  
  image.width / height : full size dimension of the image. If not provided, loaded from the ImagesProperties.xml.

Resources
=============

To create your zoomify tiles you can use either 
  
  - Zoomify express : http://www.zoomify.com/express.htm
  - Zoomify Image : http://sourceforge.net/projects/zoomifyimage/


Openlayers : http://openlayers.org/

This plugin only works with this bug correction not yet in the stable release 2.12
https://github.com/openlayers/openlayers/commit/7b91c9c26fa0edcafcea4d886c4a83dfbe5fb84e
