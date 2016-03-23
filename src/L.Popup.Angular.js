 'use strict';

 L.Popup.Angular = L.Popup.extend({
    _initLayout: function () {
        var that = this;
        L.Popup.prototype._initLayout.call(this);

        angular.element(document).ready(function() {
             // Grab the injector for the current angular app
             var $injector = angular.element(document).injector();

             var $rootScope = $injector.get('$rootScope'),
                 $compile = $injector.get('$compile'),
                 $controller = $injector.get('$controller');

             that._scope = $rootScope.$new(true);
             that._element = angular.element(that._contentNode);
             that._element.html(that.options.template);

             if (that.options.controller) {
                 var controller = $controller(that.options.controller, {
                     '$map': map,
                     '$scope': that._scope,
                     '$element': that._element,
                     '$options': that.options
                 });

                 if (that.options.controllerAs) {
                     that._scope[that.options.controllerAs] = controller;
                 }

                 that._element.data('$ngControllerController', controller);
                 that._element.children().data('$ngControllerController', controller);
             }

             $compile(that._element)(that._scope);
             that._scope.$apply();
         });
    },
    _updateContent: function () {
        if (!this._content) { return; }

        if (typeof this._content === 'string') {
            //this._contentNode.innerHTML = this._content;
        } else {
            while (this._contentNode.hasChildNodes()) {
                this._contentNode.removeChild(this._contentNode.firstChild);
            }
            this._contentNode.appendChild(this._content);
        }
        this.fire('contentupdate');
    },
     onRemove: function(map){
        if(this._scope){
            this._scope.$destroy();
        }
        L.Popup.prototype.onRemove.call(map);
     }
 });

 L.popup.angular = function(options) {
     return new L.Popup.Angular(options);
 };