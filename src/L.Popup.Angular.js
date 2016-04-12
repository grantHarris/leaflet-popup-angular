 'use strict';

 L.Popup.Angular = L.Popup.extend({
     onAdd: function(map) {

         this._map = map;

         if (!this._container) {
             this._initLayout();
         }


         var animFade = map.options.fadeAnimation;

         if (animFade) {
             L.DomUtil.setOpacity(this._container, 0);
         }
         map._panes.popupPane.appendChild(this._container);

         map.on(this._getEvents(), this);

         var that = this;
         
         angular.element(document).ready(function() {
             //Angular magic
             that._compile();
             
             that.update();

             if (animFade) {
                 L.DomUtil.setOpacity(that._container, 1);
             }

             that.fire('open');
             
             map.fire('popupopen', {
                 popup: that
             });

             if (that._source) {
                 that._source.fire('popupopen', {
                     popup: that
                 });
             }
        });
     },
     _compile: function() {
         var that = this;
         var $injector = angular.element(document).injector();
         var $rootScope = $injector.get('$rootScope'),
             $compile = $injector.get('$compile'),
             $controller = $injector.get('$controller');

         this._scope = $rootScope.$new(true);
         this._element = angular.element(this._contentNode);
         this._element.html(this.options.template);

         this._$content = {
             _callbacks: [],
             on: function(callback) {
                 that._$content._callbacks.push(callback);
             }
         };

         if (this.options.controller) {
             var controller = $controller(this.options.controller, {
                 '$scope': this._scope,
                 '$map': this._map,
                 '$options': this.options,
                 '$content': this._$content
             });

             if (this.options.controllerAs) {
                 this._scope[this.options.controllerAs] = controller;
             }

             this._element.data('$ngControllerController', controller);
             this._element.children().data('$ngControllerController', controller);
         }

         $compile(this._element)(this._scope);
         this._scope.$apply();
     },
     _updateContent: function() {
         if (!this._content) {
             return;
         }

         if (typeof this._content === 'string' || typeof this._content === 'object') {
             var that = this;
             this._$content._callbacks.map(function(callback) {
                 callback(that._content);
             });

             if (this.options.controllerAs) {
                 this._scope[this.options.controllerAs].$content = this._content;
             } else {
                 this._scope.$content = this._content;
             }

             this._scope.$apply();
             this._scope.$evalAsync(function() {
                 that._adjustPan();
                 that.fire('contentupdate');
             });
         }
     },
     onRemove: function(map) {
         if (this._scope) {
             this._scope.$destroy();
         }
         if(this._$content){
            this._$content._callbacks = [];
         }
         
         L.Popup.prototype.onRemove.call(this, map);
     }
 });

 L.popup.angular = function(options) {
     return new L.Popup.Angular(options);
 };