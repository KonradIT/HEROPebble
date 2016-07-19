/**
 * Welcome to Pebble.js!
 *
 * This is where you write your app.
 */

var UI = require('ui');
var Vibe = require('ui/vibe');
var Light = require('ui/light');

var xhr = new XMLHttpRequest();
xhr.open("GET", "http://10.5.5.9/gp/gpControl/status", true);
xhr.onload = function () {
    if (xhr.readyState === xhr.DONE) {
        if (xhr.status === 200) {
					var obj = JSON.parse(xhr.responseText);
					var batt_percent;
					var mode;
					var left;
					var current_res;
					var taken;
					
					//get camera details
					switch(obj.status[2]){
						case 3:
							batt_percent = "FULL";
							break;
						case 2:
							batt_percent = "MED";
							break;
						case 1:
							batt_percent = "LOW";
							break;
						case 0:
							batt_percent = "LOW!";
							break;
						case 4:
							batt_percent = "PWR";
							break;
					}
					switch(obj.status[43]){
						case 0:
							switch(obj.status[44]){
								case 0:
									mode = "Video";
									break;
								case 1:
									mode = "TLVideo";
									break;
								case 2:
									mode = "VideoPhoto";
									break;
								case 3:
									mode = "Looping";
									break;
							}
							left = obj.status[35]/60;
							taken = obj.status[39];
							switch(obj.settings[2]){
								case 2:
									current_res = "4K S";
									break;
								case 1:
									current_res = "4K";
									break;
								case 5:
									current_res = "2.7K S";
									break;
								case 4:
									current_res = "2.7K";
									break;
								case 6:
									current_res = "2.7K 4:3";
									break;
								case 7:
									current_res = "1440p";
									break;
								case 8:
									current_res = "1080p S";
									break;
								case 9:
									current_res = "1080p";
									break;
								case 10:
									current_res = "960p";
									break;
								case 11:
									current_res = "720p S";
									break;
								case 12:
									current_res = "720p";
									break;
								case 13:
									current_res = "WVGA";
									break;
															
							}
							break;
						case 1:
								switch(obj.status[44]){
								case 0:
									mode = "Photo";
									break;
								case 1:
									mode = "Continuous";
									break;
								case 2:
									mode = "NightPhoto";
									break;
								
							}
							left = obj.status[34];
							taken = obj.status[38];
							switch(obj.settings[17]){
								case 0:
									current_res = "12MP W";
									break;
								case 1:
									current_res = "7MP W";
									break;
								case 2:
									current_res = "7MP M";
									break;
								case 3:
									current_res = "5MP M/W";
									break;
							}
							break;
						case 2:
								switch(obj.status[44]){
								case 0:
									mode = "Burst";
									break;
								case 1:
									mode = "Timelapse";
									break;
								case 2:
									mode = "NightLapse";
									break;
							}
							left = obj.status[34];
							taken = obj.status[39];
							switch(obj.settings[28]){
								case 0:
									current_res = "12MP W";
									break;
								case 1:
									current_res = "7MP W";
									break;
								case 2:
									current_res = "7MP M";
									break;
								case 3:
									current_res = "5MP M/W";
									break;
							}
							break;
					}
          var main = new UI.Card({					
					body: 'Batt: ' + batt_percent + '\n' + mode + '\n' + current_res + '\n' + taken + ' shots' + '\n' + left + ' left',
  				subtitleColor: 'indigo', 
  				bodyColor: 'white', 
					backgroundColor: 'black'
});

main.show();
					main.on('click', 'up', function(e) {
  var menu = new UI.Menu({
			backgroundColor: 'black',
  		textColor: 'white',
			highlightBackgroundColor: 'blue',
  		highlightTextColor: 'red',
    sections: [{
      items: [{
        title: 'Video',
      }, {
        title: 'Photo',
      }, {
        title: 'MultiShot',
      }]
    }]
  });
  menu.on('select', function(e) {
    console.log('Selected item #' + e.itemIndex + ' of section #' + e.sectionIndex);
    console.log('The item is titled "' + e.item.title + '"');
		if(e.itemIndex === 0){
			var video_menu = new UI.Menu({
			backgroundColor: 'black',
  		textColor: 'white',
			highlightBackgroundColor: 'blue',
  		highlightTextColor: 'red',
    sections: [{
      items: [{
        title: 'Single',
      }, {
        title: 'TLVideo',
      }, {
        title: 'VideoPhoto',
      }, {
        title: 'Looping',
      }]
    }]
  });
  video_menu.on('select', function(video_menu_selection) {
		switch(video_menu_selection.itemIndex){
			case 0:
				command_h4_modes('0','0');
				break;
			case 1:
				command_h4_modes('0','1');
				break;
			case 2:
				command_h4_modes('0','2');
				break;
			case 3:
				command_h4_modes('0','3');
				break;
		}
  });
  video_menu.show();
	}
	
	//Photo menu
	if(e.itemIndex == 1){
		var photo_menu = new UI.Menu({
			backgroundColor: 'black',
  		textColor: 'white',
			highlightBackgroundColor: 'blue',
  		highlightTextColor: 'red',
    sections: [{
      items: [{
        title: 'Single',
      }, {
        title: 'Continuous',
      }, {
        title: 'Night',
      }]
    }]
  });
  photo_menu.on('select', function(photo_menu_selection) {
		switch(photo_menu_selection.itemIndex){
			case 0:
				command_h4_modes('1','0');
				break;
			case 1:
				command_h4_modes('1','1');
				break;
			case 2:
				command_h4_modes('1','2');
				break;
		}
  });
  photo_menu.show();
	}
	//MultiShot menu
	if(e.itemIndex == 2){
		var ms_menu = new UI.Menu({
			backgroundColor: 'black',
  		textColor: 'white',
			highlightBackgroundColor: 'blue',
  		highlightTextColor: 'red',
    sections: [{
      items: [{
        title: 'Burst',
      }, {
        title: 'TimeLapse',
      }, {
        title: 'NightLapse',
      }]
    }]
  });
  ms_menu.on('select', function(photo_menu_selection) {
		switch(photo_menu_selection.itemIndex){
			case 0:
				command_h4_modes('2','0');
				break;
			case 1:
				command_h4_modes('2','1');
				break;
			case 2:
				command_h4_modes('2','2');
				break;
		}
  });
  ms_menu.show();
	}
  });
  menu.show();
});

main.on('click', 'select', function(e) {
	xhr.open("GET", "http://10.5.5.9/gp/gpControl/status", true);
	xhr.onload = function () {
    if (xhr.readyState === xhr.DONE) {
        if (xhr.status === 200) {
					var obj = JSON.parse(xhr.responseText);
					if(obj.status[8] === 0){
   			  	xhr.open("GET", "http://10.5.5.9/gp/gpControl/command/shutter?p=1", true);        
						xhr.send(null);	
					}
					if(obj.status[8] === 1){
						xhr.open("GET", "http://10.5.5.9/gp/gpControl/command/shutter?p=0", true);        
		xhr.send(null);
					}
				}
		}
	};				
});
main.on('click', 'down', function(e){
    var menu = new UI.Menu({
			backgroundColor: 'black',
  		textColor: 'white',
			highlightBackgroundColor: 'blue',
  		highlightTextColor: 'red',
    sections: [{
      items: [{
        title: 'Turn On/Off',
      },{
        title: 'Video Resolution',
      }, {
        title: 'Video Framerate',
      }, {
        title: 'Video Protune',
      }, {
        title: 'Photo Resolution',
      },{
        title: 'Photo Protune',
      },{
        title: 'Continuous photo rate',
      },{
        title: 'NightPhoto Exposure',
      },{
        title: 'MultiShot resolution',
      },{
        title: 'Burst Rate',
      },{
        title: 'Timelapse Interval',
      },{
        title: 'NightLapse exposure',
      },{
        title: 'NightLapse Interval',
      },{
        title: 'LEDs',
      },{
        title: 'Beeping',
      },{
        title: 'Auto off',
      }]
    }]
  });
  menu.on('select', function(e) {
    console.log('Selected item #' + e.itemIndex + ' of section #' + e.sectionIndex);
    console.log('The item is titled "' + e.item.title + '"');
  	if(e.itemIndex === 0){
			var menu = new UI.Menu({
  		backgroundColor: 'black',
  		textColor: 'white',
  		highlightBackgroundColor: 'blue',
  		highlightTextColor: 'red',
  		sections: [{
    		title: 'First section',
    			items: [{
      			title: 'ON',
    		}, {
						title: 'OFF'
    }]
  }]
});
			menu.show();
		}
	});
  menu.show();
});
        }
    }
};
xhr.send(null);
//command function for HERO4 (/settings!)
function command_h4(param, value) {
		var xhr = new XMLHttpRequest();
    xhr.open("GET", "http://10.5.5.9/gp/gpControl/setting/" + param + "/" + value, true);
		xhr.send(null);
} 
//command function for HERO4 (modes, etc...)
function command_h4_modes(main_mode, sub_mode){
		var xhr = new XMLHttpRequest();
    xhr.open("GET", "http://10.5.5.9/gp/gpControl/command/sub_mode?mode=" + main_mode + "&sub_mode=" + sub_mode, true); 
		xhr.send(null);
		
	}

var main_nc = new UI.Card({					
  title: 'NOT CONNECTED',
	body: 'Please connect the GoPro WiFi to phone!',
  subtitleColor: 'indigo', // Named colors
  bodyColor: 'white', // Hex colors
	titleColor: 'white',
	backgroundColor: 'black'
});
Light.trigger();
main_nc.show();