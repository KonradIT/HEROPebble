/**
 * Welcome to Pebble.js!
 *
 * This is where you write your app.
 */

var UI = require('ui');
var Vibe = require('ui/vibe');
var Light = require('ui/light');
var Settings = require('settings');
var isRec=false;
var main = new UI.Card({
  title: 'Hello People!'
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
var main_nc = new UI.Card({
  title: 'NOT CONNECTED',
	body: 'Please connect the GoPro WiFi to phone!',
  subtitleColor: 'indigo', // Named colors
  bodyColor: 'white', // Hex colors
	titleColor: 'white',
	backgroundColor: 'black'
});
main_nc.show();

//some params needed



function get_data_cam(){

	var xhr = new XMLHttpRequest();
	xhr.open("GET", "http://10.5.5.9/gp/gpControl/status", true);
	xhr.timeout = 800;
	var batt_percent;
	var mode;
	var left;
	var current_res;
	var taken;
  var framerate = "";
  var fov;
	xhr.onload = function () {
    if (xhr.readyState === xhr.DONE) {
        if (xhr.status === 200) {
					var obj = JSON.parse(xhr.responseText);


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
									mode = "video";
									break;
								case 1:
									mode = "tlvideo";
									break;
								case 2:
									mode = "dual";
									break;
								case 3:
									mode = "looping";
									break;
							}
							left = "";
							taken = obj.status[39];
              switch(obj.status[4]){
								case 0:
									fov = "W";
									break;
								case 1:
									fov = "M";
									break;
								case 2:
									fov = "N";
									break;
                case 3:
                  fov="L";
                  break;
							}
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
              //framerate
              switch(obj.settings[3]){
                case 0:
                  framerate = "240 FPS";
                  break;
                case 1:
                  framerate = "120 FPS";
                  break;
                case 2:
                  framerate = "100 FPS";
                  break;
                case 3:
                  framerate = "90 FPS";
                  break;
                case 4:
                  framerate = "80 FPS";
                  break;
                case 5:
                  framerate = "60 FPS";
                  break;
                case 6:
                  framerate = "50 FPS";
                  break;
                case 7:
                  framerate = "48 FPS";
                  break;
                case 8:
                  framerate = "30 FPS";
                  break;
                }
							break;
						case 1:
								switch(obj.status[44]){
								case 0:
									mode = "photo";
									break;
								case 1:
									mode = "continuous";
                  switch(obj.settings[18]){
                    case 0:
                      framerate = "3/1";
                      break;
                    case 1:
                      framerate = "5/1";
                      break;
                    case 2:
                      framerate = "10/1";
                      break;
                  }
									break;
								case 2:
									mode = "nightphoto";
                  switch(obj.settings[19]){
                    case 0:
                      framerate = "Auto";
                      break;
                    case 1:
                      framerate = "2 sec";
                      break;
                    case 2:
                      framerate = "5 sec";
                      break;
                    case 3:
                      framerate = "510sec";
                      break;
                    case 4:
                      framerate = "15 sec";
                      break;
                    case 5:
                      framerate = "20 sec";
                      break;
                    case 6:
                      framerate = "30 sec";
                      break;
                  }
									break;

							}
							left = obj.status[34] + ' left';
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
              fov = "";
							break;
						case 2:
								switch(obj.status[44]){
								case 0:
									mode = "burst";
                  switch(obj.settings[29]){
                    case 0:
                      framerate = "3/1";
                      break;
                    case 1:
                      framerate = "5/1";
                      break;
                    case 2:
                      framerate = "10/1";
                      break;
                    case 3:
                      framerate = "10/2";
                      break;
                    case 4:
                      framerate = "10/3";
                      break;
                    case 5:
                      framerate = "30/1";
                      break;
                    case 6:
                      framerate = "30/2";
                      break;
                    case 7:
                      framerate = "30/3";
                      break;
                    case 8:
                      framerate = "30/6";
                      break;
                  }
									break;
								case 1:
									mode = "timelapse";
                  switch(obj.settings[30]){
                    case 0:
                      framerate = "0.5sec";
                      break;
                    case 1:
                      framerate = "1sec";
                      break;
                    case 2:
                      framerate = "2sec";
                      break;
                    case 5:
                      framerate = "5sec";
                      break;
                    case 10:
                      framerate = "10sec";
                      break;
                    case 30:
                      framerate = "30sec";
                      break;
                    case 60:
                      framerate = "60sec";
                      break;

                  }
									break;
								case 2:
									mode = "nightlapse";
									break;
							}
              left = obj.status[34] + ' left';
              taken = obj.status[38];
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
              fov = "";
							break;

					}
					   main = new UI.Card({
               title: current_res + fov,
					body: framerate +  '\n' + 'Batt: ' + batt_percent + '\n' + taken + ' shots' + '\n' + left ,
  				subtitleColor: 'indigo',
          icon: 'images/' + mode + '_icon.png',
          titleColor: 'white',
  				bodyColor: 'white',
					backgroundColor: 'black'


});
main.show();
					main.on('click', 'up', function(e) {
            if(isRec===false){
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
				get_data_cam();
				video_menu.hide();
				menu.hide();
get_data_cam();
				break;
			case 1:
				command_h4_modes('0','1');
				get_data_cam();
				video_menu.hide();
				menu.hide();
get_data_cam();
				break;
			case 2:
				command_h4_modes('0','2');
				get_data_cam();
				video_menu.hide();
				menu.hide();
				main.show();
				break;
			case 3:
				command_h4_modes('0','3');
				get_data_cam();
				video_menu.hide();
				menu.hide();
get_data_cam();
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
        get_data_cam();
				break;
			case 1:
				command_h4_modes('1','1');
				photo_menu.hide();
				menu.hide();
        get_data_cam();
				break;
			case 2:
				command_h4_modes('1','2');
				photo_menu.hide();
				menu.hide();
        get_data_cam();
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
        get_data_cam();
				break;
			case 1:
				command_h4_modes('2','1');
				ms_menu.hide();
				menu.hide();
        get_data_cam();
				break;
			case 2:
				command_h4_modes('2','2');
				ms_menu.hide();
				menu.hide();
        get_data_cam();
				break;
		}
  });
  ms_menu.show();
	}
  });
  menu.show();
}
});

main.on('click', 'select', function(e) {
			var xhr = new XMLHttpRequest();

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
                isRec=true;
							}
							break;
						case 1:
							//stop
   			  		xhr2.open("GET", "http://10.5.5.9/gp/gpControl/command/shutter?p=0", true);
							xhr2.send(null);
							Vibe.vibrate('short');
							main.backgroundColor('black');
              isRec=false;
							break;
					}
				}
		}
	};
	xhr.send(null);
});
main.on('click', 'down', function(e){
  if(isRec===false){
    var settings_menu = new UI.Menu({
			title: 'settings',
			backgroundColor: 'black',
  		textColor: 'white',
			highlightBackgroundColor: 'blue',
  		highlightTextColor: 'white',
    sections: [{
			title: 'settings',
      items: [{
        title: 'Action',
      },{
        title: 'Indoor',
      }, {
        title: 'Slow-Mo',
      }, {
        title: 'Cinematic',
      }]
    }]
  });
  settings_menu.on('select', function(e) {
    switch(e.itemIndex){
      case 0:
        //Action
        command_h4(2,9);
        command_h4(3,5);
        command_h4(4,0);
				break;
      case 1:
        //Indoor
        command_h4(2,9);
        command_h4(3,8);
				break;
      case 2:
        //Slow-Mo
        command_h4(2,9);
        command_h4(3,1);
				break;
      case 3:
        //Cinematic
        command_h4(2,1);
				break;
    }

	});
  settings_menu.show();
}
});
main.on('click', 'back', function() {
  console.log('Up clicked!');
});

//HiLight Tag:
main.on('longClick', 'up', function() {
  var xhr = new XMLHttpRequest();

xhr.open("GET", "http://10.5.5.9/gp/gpControl/status", true);
xhr.timeout = 800;
xhr.onload = function () {
if (xhr.readyState === xhr.DONE) {
    if (xhr.status === 200) {
  	var xhr2 = new XMLHttpRequest();
    var obj = JSON.parse(xhr.responseText);
    switch(obj.status[8]){
      case 0:
        command_h4_modes('1','0');
        setTimeout(function(){
          //shoot pic
          xhr2.open("GET", "http://10.5.5.9/gp/gpControl/command/shutter?p=1", true);
          xhr2.send(null);
        }, 2000);

        Vibe.vibrate('long');
				break;
      case 1:
        xhr2.open("GET", "http://10.5.5.9/gp/gpControl/command/storage/tag_moment", true);
        xhr2.send(null);
        Vibe.vibrate('long');
				break;
}
}
}

};
xhr.send(null);
});

}
		}
	};
		xhr.send(null);



	}


		get_data_cam();
