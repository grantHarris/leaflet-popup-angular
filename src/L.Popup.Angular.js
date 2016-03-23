 'use strict';

 L.Popup.Angular = L.Popup.extend({
    _initLayout: function () {
        var that = this;
        var prefix = 'leaflet-popup',
            containerClass = prefix + ' ' + this.options.className + ' leaflet-zoom-' +
                    (this._animated ? 'animated' : 'hide'),
            container = this._container = L.DomUtil.create('div', containerClass),
            closeButton;

        if (this.options.closeButton) {
            closeButton = this._closeButton =
                    L.DomUtil.create('a', prefix + '-close-button', container);
            closeButton.href = '#close';
            closeButton.innerHTML = '&#215;';
            L.DomEvent.disableClickPropagation(closeButton);

            L.DomEvent.on(closeButton, 'click', this._onCloseButtonClick, this);
        }

        var wrapper = this._wrapper =
                L.DomUtil.create('div', prefix + '-content-wrapper', container);
        L.DomEvent.disableClickPropagation(wrapper);

        this._contentNode = L.DomUtil.create('div', prefix + '-content', wrapper);

        L.DomEvent.disableScrollPropagation(this._contentNode);
        L.DomEvent.on(wrapper, 'contextmenu', L.DomEvent.stopPropagation);

        this._tipContainer = L.DomUtil.create('div', prefix + '-tip-container', container);

        angular.element(document).ready(function() {
             // Grab the injector for the current angular app
             var $injector = angular.element(document).injector();

             var $rootScope = $injector.get('$rootScope'),
                 $compile = $injector.get('$compile'),
                 $controller = $injector.get('$controller');

             that._scope = $rootScope.$new(true);
             this._element = angular.element(this._contentNode);
             this._element .html(that.options.template);

             if (that.options.controller) {
                 var controller = $controller(that.options.controller, {
                     '$map': map,
                     '$scope': that._scope,
                     '$element': this._element,
                     '$options': that.options
                 });

                 if (that.options.controllerAs) {
                     that._scope[that.options.controllerAs] = controller;
                 }

                 this._element.data('$ngControllerController', controller);
                 this._element.children().data('$ngControllerController', controller);
             }

             $compile(this._element)(that._scope);
             that._scope.$apply();
         });

        this._tip = L.DomUtil.create('div', prefix + '-tip', this._tipContainer);
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
     onRemove: function(){
        if(this._scope){
            this._scope.$destroy();
        }
     }
 });

 L.popup.angular = function(options) {
     return new L.Popup.Angular(options);
 };