/**
 * Welcome to Pebble.js!
 *
 * This is where you write your app.
 */

var UI = require('ui');

var xhr = new XMLHttpRequest();
xhr.open("GET", "http://10.5.5.9/gp/gpControl/status", true);
xhr.onload = function () {
    if (xhr.readyState === xhr.DONE) {
        if (xhr.status === 200) {
					var obj = JSON.parse(xhr.responseText);
					var batt_percent;
					var mode;
					var video_left;
					var photo_left;
					var video_res;
					var video_fov;
					var video_fps;
					var photo_res;
					var photo_fov;
					
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
							break;
					}
          var main = new UI.Card({					
  				title: 'HERO4 Session',
					body: 'Batt: ' + batt_percent + '\n' + mode,
  				subtitleColor: 'indigo', // Named colors
  				bodyColor: 'white', // Hex colors
					titleColor: 'white',
					backgroundColor: 'black'
});

main.show();
					main.on('click', 'up', function(e) {
  var menu = new UI.Menu({
    sections: [{
      items: [{
        title: 'Camera Modes',
      }, {
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
		if(e.itemIndex == 1){
			var video_menu = new UI.Menu({
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
	if(e.itemIndex == 2){
		var photo_menu = new UI.Menu({
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
	if(e.itemIndex == 3){
		var ms_menu = new UI.Menu({
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
main.on('click', 'select', function(e) {
    var xhr = new XMLHttpRequest();
    xhr.open("GET", "http://10.5.5.9/gp/gpControl/command/shutter?p=1", true);        
		xhr.send(null);
});
main.on('click', 'down', function(e) {
    var menu = new UI.Menu({
    sections: [{
      items: [{
        title: 'Settings',
      }, {
        subtitle: 'Video Resolution',
      }, {
        subtitle: 'Video Framerate',
      }, {
        subtitle: 'Video Protune',
      }, {
        subtitle: 'Photo Resolution',
      },{
        subtitle: 'Photo Protune',
      },{
        subtitle: 'Continuous photo rate',
      },{
        subtitle: 'NightPhoto Exposure',
      },{
        subtitle: 'MultiShot resolution',
      },{
        subtitle: 'Burst Rate',
      },{
        subtitle: 'Timelapse Interval',
      },{
        subtitle: 'NightLapse exposure',
      },{
        subtitle: 'NightLapse Interval',
      },{
				title: 'Other',
      },{
        subtitle: 'LEDs',
      },{
        subtitle: 'Beeping',
      },{
        subtitle: 'Auto off',
      }]
			
    }]
  });
  menu.on('select', function(e) {
    console.log('Selected item #' + e.itemIndex + ' of section #' + e.sectionIndex);
    console.log('The item is titled "' + e.item.title + '"');
  });
  menu.show();
});
        }
    }
};
xhr.send(null);
var main_nc = new UI.Card({					
  title: 'NOT CONNECTED',
	body: '',
  subtitleColor: 'indigo', // Named colors
  bodyColor: 'white', // Hex colors
	titleColor: 'white',
	backgroundColor: 'black'
});

main_nc.show();