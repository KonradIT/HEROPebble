/**
 * Welcome to Pebble.js!
 *
 * This is where you write your app.
 */

var UI = require('ui');
var Vibe = require('ui/vibe');
var Light = require('ui/light');
var main = new UI.Card({
  title: 'Hello People!'
});
function main_cam(){
	var model ="";
	var xhr_model = new XMLHttpRequest();
	xhr_model.open("GET", "http://10.5.5.9/gp/gpControl", true);
	xhr_model.timeout = 800;
	xhr_model.onload = function () {
    if (xhr_model.readyState === xhr_model.DONE) {
        if (xhr_model.status === 200) {
					
					var model_obj = JSON.parse(xhr_model.responseText);
					model = model_obj.info['model name'];
				}
		}
	};

    //code goes here that will be run every 5 seconds.    

	var xhr = new XMLHttpRequest();
	xhr.open("GET", "http://10.5.5.9/gp/gpControl/status", true);
	xhr.timeout = 800;
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
          main = new UI.Card({					
					body: 'Batt: ' + batt_percent + '\n' + mode + '\n' + current_res + '\n' + taken + ' shots' + '\n' + left + ' left',
  				subtitleColor: 'indigo', 
  				bodyColor: 'white', 
					backgroundColor: 'black'
});
main.show();
					main.on('click', 'up', function(e) {
  var menu = new UI.Menu({
			title: 'modes',
			backgroundColor: 'black',
  		textColor: 'white',
			highlightBackgroundColor: 'blue',
  		highlightTextColor: 'white',
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
  		highlightTextColor: 'white',
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
				video_menu.hide();
				menu.hide();
				break;
			case 1:
				command_h4_modes('0','1');
				video_menu.hide();
				menu.hide();
				break;
			case 2:
				command_h4_modes('0','2');
				video_menu.hide();
				menu.hide();
				break;
			case 3:
				command_h4_modes('0','3');
				video_menu.hide();
				menu.hide();
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
  		highlightTextColor: 'white',
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
				photo_menu.hide();
				menu.hide();
				break;
			case 1:
				command_h4_modes('1','1');
				photo_menu.hide();
				menu.hide();
				break;
			case 2:
				command_h4_modes('1','2');
				photo_menu.hide();
				menu.hide();
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
  		highlightTextColor: 'white',
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
			  ms_menu.hide();
				menu.hide();	
				break;
			case 1:
				command_h4_modes('2','1');
				ms_menu.hide();
				menu.hide();
				break;
			case 2:
				command_h4_modes('2','2');
				ms_menu.hide();
				menu.hide();
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
	xhr.timeout = 800;
	xhr.onload = function () {
    if (xhr.readyState === xhr.DONE) {
        if (xhr.status === 200) {
					var obj = JSON.parse(xhr.responseText);
					
					//get camera rec status
					var xhr2 = new XMLHttpRequest();
					switch(obj.status[8]){
						case 0:
							//record
   			  		xhr2.open("GET", "http://10.5.5.9/gp/gpControl/command/shutter?p=1", true);        
							xhr2.send(null);	
							Vibe.vibrate('double');
							if(obj.status[43] === 0){
								main.backgroundColor('red');	
							}
							break;
						case 1:
							//stop
   			  		xhr2.open("GET", "http://10.5.5.9/gp/gpControl/command/shutter?p=0", true);        
							xhr2.send(null);	
							Vibe.vibrate('short');
							main.backgroundColor('black');
							break;
					}
				}
		}
	};
	xhr.send(null);
});
main.on('click', 'down', function(e){
    var settings_menu = new UI.Menu({
			title: 'settings',
			backgroundColor: 'black',
  		textColor: 'white',
			highlightBackgroundColor: 'blue',
  		highlightTextColor: 'white',
    sections: [{
			title: 'settings',
      items: [{
        title: 'VIDEO',
      },{
        title: 'PHOTO',
      }, {
        title: 'MULTISHOT',
      }, {
        title: 'MISC',
      }]
    }]
  });
  settings_menu.on('select', function(e) {
    console.log('Selected item #' + e.itemIndex + ' of section #' + e.sectionIndex);
    console.log('The item is titled "' + e.item.title + '"');
  	if(e.itemIndex === 0){
			var video_mode_menu = new UI.Menu({
  		backgroundColor: 'black',
  		textColor: 'white',
  		highlightBackgroundColor: 'blue',
  		highlightTextColor: 'white',
  		sections: [{
    		title: 'Video modes',
    			items: [{
      			title: 'Video',
    		}, {
						title: 'TL Video'
				},{
						title: 'Video+Photo'
				}, {
						title: 'Looping'
				}]
  }]
});
			video_mode_menu.on('select', function(e) {
    console.log('Selected item #' + e.itemIndex + ' of section #' + e.sectionIndex);
    console.log('The item is titled "' + e.item.title + '"');
				switch(e.itemIndex){
					case 0:
						var video_single_menu = new UI.Menu({
  					backgroundColor: 'black',
  					textColor: 'white',
  					highlightBackgroundColor: 'blue',
  					highlightTextColor: 'red',
  					sections: [{
    					title: 'Single Video settings',
    						items: [{
      						title: 'Resolution',
    					}, {
									title: 'Framerate'
							},{
									title: 'FOV'
							}, {
									title: 'SpotMeter'
							}, {
									title: 'Low Light'
							}, {
									title: 'Protune'
							}]
					  }]
					});
						//
						video_mode_menu.on('select', function(e) {
    console.log('Selected item #' + e.itemIndex + ' of section #' + e.sectionIndex);
    console.log('The item is titled "' + e.item.title + '"');
							switch(e.itemIndex){
								case 0:
									//Video resolution
									var video_res_menu = new UI.Menu();
									video_res_menu.items(0, [ { title: model }, { title: 'new item2' } ]);
									video_res_menu.show();
									break;
								case 1:
									//Video framerate
								case 2:
									//Video FOV
								case 3:
									//Video SM
								case 4:
									//Video Low light
								case 5:
									//Video protune
							}
						});
					video_single_menu.show();
				}
				});
			video_mode_menu.show();
		}
	});
  settings_menu.show();
});
        }
			
    }
};
xhr.send(null);

}

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
main_nc.show();

main_cam();

