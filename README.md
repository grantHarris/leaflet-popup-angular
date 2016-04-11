# leaflet-popup-angular

0.0.3	-	API finalized. Update Readme to reflect correct way to use.
0.0.2	-	First working version

## Usage

### Standard

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