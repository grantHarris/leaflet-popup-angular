# leaflet-popup-angular 0.1.0
Use AngularJS in your Leaflet popups. 

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
		controller: function($map, $options, $content){
			this.hello = 'Hello';
			$content.on(function(content){
				console.log('This executes on setContent', content);
			});
		}
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