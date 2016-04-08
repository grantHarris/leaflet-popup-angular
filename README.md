# leaflet-popup-angular

0.0.2	-	First working version
## Usage

```
	var popup = L.popup.angular({
		template: `
			<div>
				<h1>{{popup.title}}</h1>
				My custom popup
				<div>{{popup.content.name}}</div>
				<div>{{popup.content.title}}</div>
			</div>
		`,
		controllerAs: 'popup',
		controller: function($map, $options){
			this.title = 'Hello';
		}
	}).setLatLng(latlng).setContent({
	    	'name': 'foo',
	    	'title': 'bar'
	    })
	    .openOn(map);
```
