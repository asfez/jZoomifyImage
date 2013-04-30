/*!
* jQuery image
* Original author: @ajpiano
* Further changes, comments: @addyosmani
* Licensed under the MIT license
*/

; (function ($, window, document, undefined) {
    var pluginName = 'jZoomifyImage',
        defaults = {
            url: "",
            width : 0,
            height : 0
        };

    function Plugin(element, options) {
        this.element = element;
        this.options = $.extend({}, defaults, options);
        this._defaults = defaults;
        this._name = pluginName;
        this.init();
    }

    Plugin.prototype = {

        init: function () {
            var jme = $(this.element);
            var self = this;
            
            var url = jme.data("url") || self.options.url;
            var width = jme.data("width") || self.options.width;
            var height = jme.data("height") || self.options.height;
            
            self.zoomify = new OpenLayers.Layer.Zoomify("Zoomify", url,
		  	    new OpenLayers.Size(width, height));

            self.zoomify.transitionEffect = "resize";
            self.zoomify.serverResolutions =  [256,16,4,2,1];
            
            var options = {
                maxExtent: new OpenLayers.Bounds(0, 0, width, height),
                restrictedExtent: new OpenLayers.Bounds(0, 0, width, height),
                maxResolution: Math.pow(2, self.zoomify.numberOfTiers - 1),
                numZoomLevels: self.zoomify.numberOfTiers,
                fractionalZoom: true
            };

            //Auto attribute an id if missing
            var id = jme.attr("id") || "jZoomifyImage";
            jme.attr("id", id);
            
            
            self.map = new OpenLayers.Map(id, options);
            self.map.addLayer(self.zoomify);

            self.map.setBaseLayer(self.zoomify);
            self.map.minZoom = 0;

            //Prevent the image to be zoomed out more than the div size
            this.map.isValidZoomLevel = function(zoomLevel) {
                var valid = (zoomLevel != null) &&
                    (zoomLevel >= self.map.minZoom);
                    if(zoomLevel < self.map.minZoom)
                    {
                        self.update();
                    }
                return valid;
            };

            //Resize the image if needed
            $(window).resize(function() {
                self.update();
            });
            
            self.map.zoomToMaxExtent();
            self.map.minZoom = self.map.zoom;
        },

        update : function() {
            var self = this;
            self.map.minZoom = 0;
            self.map.zoomToMaxExtent();
            self.map.minZoom = self.map.zoom;
        }
       
    };

    $.fn[pluginName] = function(options) {
        return this.each(function() {
            if (!$.data(this, 'plugin_' + pluginName)) {
                $.data(this, 'plugin_' + pluginName,
                    new Plugin(this, options));
            }
        });
    };

})(jQuery, window, document);