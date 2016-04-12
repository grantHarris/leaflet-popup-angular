# leaflet-popup-angular 0.1.0
Use AngularJS in your Leaflet popups. Extends the built-in L.popup.

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

## Dependency Injection
In addition to the rest of your Angular application's services, L.popup.angular also provides several of its own services through dependency injection to the controller.

* __$content__ Content object. Register callbacks for setContent() with $content.on()
* __$map__ Leaflet map object
* __$options__ The options params from L.popup.angular.
