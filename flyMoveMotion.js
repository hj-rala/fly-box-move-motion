(function ($) {

    // default options
    var defaults = {
        d: 400,
        e: "linear"
    };

    /**
     * johnnysPath
     *
     * A small jQuery plugin that animates an absolute positioned
     * element according to a path you give.
     *
     * @name johnnysPath
     * @function
     * @param {Object} options An object containing:
     *
     *   - `d` (Number): The duration (default: 400 ms)
     *   - `e` (String): The animation type (default: "linear")
     *
     * @param {Array} points An array of objects containing the `x` and `y` values.
     * @param {Function} callback The callback function.
     * @return {jQuery} The selected elements.
     */
    $.fn.johnnysPath = function (options, points, callback) {

        var settings = $.extend(defaults, options)
          , $self = this;
          ;

        // default callback function
        callback = callback || function () {};

        /*!
         *  This function will animate the elements
         *  moving them to the new point.
         *
         *  When `p` (point) will be undefined, the function
         *  will not be called again
         *
         * */
        var i = 0;
        function animateRecursive (p) {

            if (!p) { return callback.call($self); }

            var duration = p.d || settings.d
              , easing =  p.e || settings.e
              ;

            $self.animate({
                "top":  p.y,
                "left": p.x,
            }, duration, easing, function () {
                animateRecursive(points[++i]);
            });
        }

        animateRecursive(points[i]);
        return $self;
    };
})($);
