 'use strict';
 
 L.Popup.Angular = L.Popup.extend({
    _initLayout: function () {
        L.Popup.prototype._initLayout.call(this);
         var $injector = angular.element(document).injector();

         var $rootScope = $injector.get('$rootScope'),
             $compile = $injector.get('$compile'),
             $controller = $injector.get('$controller');

         this._scope = $rootScope.$new(true);
         this._element = angular.element(this._contentNode);
         this._element.html(this.options.template);

         if (this.options.controller) {
             var controller = $controller(this.options.controller, {
                 '$map': this._map,
                 '$scope': this._scope,
                 '$element': this._element,
                 '$options': this.options
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
    _updateContent: function () {
        if (!this._content) { return; }

        if (typeof this._content === 'string' || typeof this._content === 'object') {
            if (this.options.controllerAs) {
                 this._scope[this.options.controllerAs].$content = this._content;
            }else{
                this._scope.$content = this._content;
            }
            this._scope.$apply();
        } 
        this.fire('contentupdate');
    },
     onRemove: function(map){
        if(this._scope){
            this._scope.$destroy();
        }
        L.Popup.prototype.onRemove.call(this, map);
     }
 });

 L.popup.angular = function(options) {
     return new L.Popup.Angular(options);
 };