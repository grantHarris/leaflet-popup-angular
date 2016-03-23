# leaflet-popup-angular

## Usage

```
	var popup = L.popup.angular({
		template: `
			<div>
				<h1>{{popup.title}}</h1>
				My custom popup
				<div ng-transclude></div>
			</div>
		`,
		controllerAs: 'popup',
		controller: function($map, $options){
			this.title = 'Hello';
		}
	}).setLatLng(latlng)
	    .setContent('<p>Hello world!<br />This is a nice popup.</p>')
	    .openOn(map);
```