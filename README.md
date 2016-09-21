# leaflet-popup-angular
Use AngularJS in your Leaflet popups. Extends the built-in L.popup.

Supports Leaflet [v1.0.0](https://github.com/Leaflet/Leaflet/tree/v1.0.0)

For Leaflet 0.7.7 support see [leaflet-popup-angular v0.1.2](https://github.com/grantHarris/leaflet-popup-angular/tree/v0.1.2)

See working [examples](http://grantharris.github.io/leaflet-popup-angular/examples/examples.html).

## Usage

### Basic
```
	var popup = L.popup.angular({
		template: `
			<div>
				<h1>{{popup.$content.title}} - <small>{{popup.$content.name}}</small></h1>
				<div>
					My custom popup with controller. {{popup.hello}}
				</div>
			</div>
		`,
		controllerAs: 'popup',
		controller: ['$content', function($content){
			this.hello = 'Hello';
			$content.on(function(content){
				console.log('This executes on setContent', content);
			});
		}]
	}).setLatLng(latlng).setContent({
	    	'name': 'foo',
	    	'title': 'bar'
	    })
	    .openOn(map);
```


### No Controller

```
	var popup = L.popup.angular({
		template: `
			<div>
				<h1>{{$content.title}} - <small>{{$content.name}}</small></h1>
				<div>
					My popup without a controller.
				</div>
			</div>
		`,
	}).setLatLng(latlng).setContent({
	    	'name': 'foo',
	    	'title': 'bar'
	    })
	    .openOn(map);
```

#### Note

For clarity, these examples are using template literals to represent multiline strings.
Template literals are part of ES6 and are not supported by some browsers (notably IE).
See: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Template_literals

This is a new package. We will be introducing support for angular's templateUrl soon 
and the examples will be reimplemented using this feature.

For production use at this time, either:
* Use a bundler like webpack to insert the html into your template-- template: require('template.html')
* Use template literals and a tool like babel to compile down to ES5
* Use oldschool JavaScript strings in place of template literals


## Dependency Injection
In addition to the rest of your Angular application's services, L.popup.angular also provides several of its own services through dependency injection to the controller.

* __$content__ Content object. Register callbacks for setContent() with $content.on()
* __$map__ Leaflet map object
* __$options__ The options params from L.popup.angular.
