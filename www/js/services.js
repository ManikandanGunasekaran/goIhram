app.service('mapService', function(){

	this.getFreindList = function(){
		return [{
                    name: 'Friend 1',
                    desc: 'T',
                    lat: 12.238983,
                    long: 80.888509
                },
                {
                    name: 'Friend 2',
                    desc: 'Te',
                    lat: 13.238168,
                    long: 79.238168
                },
                {
                    name: 'Friend 3',
                    desc: 'Tes',
                    lat: 14.242452,
                    long: 79.889882
                },
                {
                    name: 'Friend 4',
                    desc: 'zesc',
                    lat: 12.247234,
                    long: 80.893567
                },
                {
                    name: 'Friend 5',
                    desc: 'Test',
                    lat: 12.241874,
                    long: 79.883568
                }
            ];
	}
});
