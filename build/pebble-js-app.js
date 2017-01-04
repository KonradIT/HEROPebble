/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(1);
	module.exports = __webpack_require__(2);


/***/ },
/* 1 */
/***/ function(module, exports) {

	(function(p) {
	  if (!p === undefined) {
	    console.error('Pebble object not found!?');
	    return;
	  }
	
	  // Aliases:
	  p.on = p.addEventListener;
	  p.off = p.removeEventListener;
	
	  // For Android (WebView-based) pkjs, print stacktrace for uncaught errors:
	  if (typeof window !== 'undefined' && window.addEventListener) {
	    window.addEventListener('error', function(event) {
	      if (event.error && event.error.stack) {
	        console.error('' + event.error + '\n' + event.error.stack);
	      }
	    });
	  }
	
	})(Pebble);


/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(3);
	var UI = __webpack_require__(37);
	var Vibe = __webpack_require__(47);
	var Light = __webpack_require__(48);
	var Settings = __webpack_require__(14);
	var Clay = __webpack_require__(49);
	var clayConfig = __webpack_require__(52);
	var clay = new Clay(clayConfig);
	var keys = __webpack_require__(51);
	var isRec = false;
	var isHero4online = false;
	var xhr = new XMLHttpRequest();
	var presets = "";
	var MasterSimpleMode = false;
	var camera_number = "";
	var camera_model_name = "";
	var h3Pass = "nothing";
	var HERO3 = false;
	//command function for HERO4 (/settings!)
	function command_h4(param, value) {
	    xhr.open("GET", "http://10.5.5.9/gp/gpControl/setting/" + param + "/" + value, true);
	    xhr.send(null);
	}
	//command function for HERO4 (modes, etc...)
	function command_h4_modes(main_mode, sub_mode) {
	    xhr.open("GET", "http://10.5.5.9/gp/gpControl/command/sub_mode?mode=" + main_mode + "&sub_mode=" + sub_mode, true);
	    xhr.send(null);
	
	}
	
	function command_h3(device, param, gopropass, option) {
	    xhr.open("GET", "http://10.5.5.9/" + device + "/" + param + "?t=" + gopropass + "&p=%" + option, false);
	    xhr.send(null);
	
	}
	
	var main = new UI.Card({
	    title: 'CONNECTING...',
	    body: 'Please connect the GoPro WiFi to phone!',
	    subtitleColor: 'indigo', // Named colors
	    bodyColor: 'white', // Hex colors
	    titleColor: 'white',
	    backgroundColor: 'black'
	});
	main.show();
	
	main.on('click', 'up', function(e) {
	    if (isHero4online === true) {
	        if (isRec === false) {
	            var menu = new UI.Menu({
	                title: 'modes',
	                backgroundColor: 'black',
	                textColor: 'white',
	                highlightBackgroundColor: 'white',
	                highlightTextColor: 'black',
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
	                if (e.itemIndex === 0) {
	                    var video_menu = new UI.Menu({
	                        backgroundColor: 'black',
	                        textColor: 'white',
	                        highlightBackgroundColor: 'white',
	                        highlightTextColor: 'black',
	                        sections: [{
	                            items: [{
	                                title: 'Single',
	                            }, {
	                                title: 'Looping',
	                            }]
	                        }]
	                    });
	
	                    if (camera_number = 16 || 15 || 17) {
	
	                    }
	                    else{
	                      video_menu.item(0, 2, {
	                          title: 'TLVideo'
	                      });
	                      video_menu.item(0, 3, {
	                          title: 'VideoPhoto'
	                      });
	                    }
	                    video_menu.on('select', function(video_menu_selection) {
	                        switch (video_menu_selection.itemIndex) {
	                            case 0:
	                                //single
	                                command_h4_modes('0', '0');
	                                video_menu.hide();
	                                menu.hide();
	                                break;
	                            case 1:
	                                //looping
	                                command_h4_modes('0', '3');
	                                video_menu.hide();
	                                menu.hide();
	                                break;
	                            case 2:
	                                //TLVideo
	                                command_h4_modes('0', '1');
	                                video_menu.hide();
	                                menu.hide();
	                                break;
	                            case 3:
	                                //VideoPhoto
	                                command_h4_modes('0', '2');
	                                video_menu.hide();
	                                menu.hide();
	                                break;
	                        }
	                    });
	                    video_menu.show();
	                }
	
	                //Photo menu
	                if (e.itemIndex == 1) {
	                    var photo_menu = new UI.Menu({
	                        backgroundColor: 'black',
	                        textColor: 'white',
	                        highlightBackgroundColor: 'white',
	                        highlightTextColor: 'black',
	                        sections: [{
	                            items: [{
	                                title: 'Single',
	                            }]
	                        }]
	                    });
	                    if (camera_number = 16 || 15 || 17) {
	
	                    }
	                    else{
	                      photo_menu.item(0, 1, {
	                          title: 'Continuous'
	                      });
	                      photo_menu.item(0, 2, {
	                          title: 'Night'
	                      });
	                    }
	                    photo_menu.on('select', function(photo_menu_selection) {
	                        switch (photo_menu_selection.itemIndex) {
	                            case 0:
	                                command_h4_modes('1', '0');
	                                photo_menu.hide();
	                                menu.hide();
	                                //get_data_cam();
	                                break;
	                            case 1:
	                                command_h4_modes('1', '1');
	                                photo_menu.hide();
	                                menu.hide();
	                                //get_data_cam();
	                                break;
	                            case 2:
	                                command_h4_modes('1', '2');
	                                photo_menu.hide();
	                                menu.hide();
	                                //get_data_cam();
	                                break;
	                        }
	                    });
	                    photo_menu.show();
	                }
	                //MultiShot menu
	                if (e.itemIndex == 2) {
	                    var ms_menu = new UI.Menu({
	                        backgroundColor: 'black',
	                        textColor: 'white',
	                        highlightBackgroundColor: 'white',
	                        highlightTextColor: 'black',
	                        sections: [{
	                            items: [{
	                                title: 'Burst'
	                            }, {
	                                title: 'TimeLapse'
	                            }]
	                        }]
	                    });
	                    if (camera_number != 16) {
	                        ms_menu.item(0, 2, {
	                            title: 'NightLapse'
	                        });
	                    }
	                    ms_menu.on('select', function(photo_menu_selection) {
	                        switch (photo_menu_selection.itemIndex) {
	                            case 0:
	                                command_h4_modes('2', '0');
	                                ms_menu.hide();
	                                menu.hide();
	                                //get_data_cam();
	                                break;
	                            case 1:
	                                command_h4_modes('2', '1');
	                                ms_menu.hide();
	                                menu.hide();
	                                //get_data_cam();
	                                break;
	                            case 2:
	                                command_h4_modes('2', '2');
	                                ms_menu.hide();
	                                menu.hide();
	                                //get_data_cam();
	                                break;
	                        }
	                    });
	                    ms_menu.show();
	                }
	            });
	            menu.show();
	        }
	    }
	});
	
	main.on('click', 'select', function(e) {
	    if (isHero4online === true) {
	
	        xhr.open("GET", "http://10.5.5.9/gp/gpControl/status", true);
	        xhr.onload = function() {
	            if (xhr.readyState === xhr.DONE) {
	                if (xhr.status === 200) {
	                    var obj = JSON.parse(xhr.responseText);
	                    switch (obj.status[43]) {
	                        case 0:
	                            //get camera rec status
	                            switch (obj.status[8]) {
	                                case 0:
	                                    //record
	                                    xhr.open("GET", "http://10.5.5.9/gp/gpControl/command/shutter?p=1", true);
	                                    xhr.send(null);
	                                    Vibe.vibrate('double');
	
	                                    break;
	                                case 1:
	                                    //stop
	                                    xhr.open("GET", "http://10.5.5.9/gp/gpControl/command/shutter?p=0", true);
	                                    xhr.send(null);
	                                    Vibe.vibrate('short');
	                                    break;
	                            }
	                            break;
	                        case 1:
	                            xhr.open("GET", "http://10.5.5.9/gp/gpControl/command/shutter?p=1", true);
	                            xhr.send(null);
	                            Vibe.vibrate('double');
	                            break;
	                    }
	                }
	            }
	        };
	        xhr.send(null);
	    }
	});
	main.on('click', 'down', function(e) {
	    if (isHero4online === true) {
	        if (isRec === false) {
	            var settings_menu = new UI.Menu();
	            //TODO: Use name arrays
	            settings_menu.item(0, 0, {
	                title: "Action"
	            });
	            settings_menu.item(0, 1, {
	                title: "Indoor"
	            });
	            settings_menu.item(0, 2, {
	                title: "Slow-Mo"
	            });
	            settings_menu.item(0, 3, {
	                title: "Cinema"
	            });
	
	
	            settings_menu.on('select', function(e) {
	                switch (e.itemIndex) {
	                    case 0:
	                        //Action
	                        command_h4(2, 9);
	                        command_h4(3, 5);
	                        command_h4(4, 0);
	                        settings_menu.hide();
	                        break;
	                    case 1:
	                        //Indoor
	                        command_h4(2, 9);
	                        command_h4(3, 8);
	                        settings_menu.hide();
	                        break;
	                    case 2:
	                        //Slow-Mo
	                        command_h4(2, 9);
	                        command_h4(3, 1);
	                        settings_menu.hide();
	                        break;
	                    case 3:
	                        //Cinematic
	                        command_h4(2, 1);
	                        settings_menu.hide();
	                        break;
	                }
	
	            });
	            settings_menu.show();
	        }
	    }
	});
	/*
	main.on('click', 'back', function() {
	console.log('Up clicked!');
	});
	*/
	//HiLight Tag:
	main.on('longClick', 'up', function() {
	
	    xhr.open("GET", "http://10.5.5.9/gp/gpControl/status", true);
	
	    xhr.onload = function() {
	        if (xhr.readyState === xhr.DONE) {
	            if (xhr.status === 200) {
	                var obj = JSON.parse(xhr.responseText);
	                switch (obj.status[8]) {
	                    case 0:
	                        command_h4_modes('1', '0');
	                        setTimeout(function() {
	                            //shoot pic
	                            xhr.open("GET", "http://10.5.5.9/gp/gpControl/command/shutter?p=1", true);
	                            xhr.send(null);
	                        }, 2000);
	
	                        Vibe.vibrate('long');
	                        break;
	                    case 1:
	                        xhr.open("GET", "http://10.5.5.9/gp/gpControl/command/storage/tag_moment", true);
	                        xhr.send(null);
	                        Vibe.vibrate('long');
	                        break;
	                }
	            }
	        }
	
	    };
	    xhr.send(null);
	});
	
	function get_data_cam() {
	
	
	    xhr.open("GET", "http://10.5.5.9/gp/gpControl", true);
	
	    xhr.onload = function() {
	        if (xhr.readyState === xhr.DONE) {
	            if (xhr.status === 200) {
	                var obj = JSON.parse(xhr.responseText);
	                camera_number = obj.info.model_number;
	                camera_model_name = obj.info.model_name;
	                var batt_percent;
	                var mode;
	                var left;
	                var current_res;
	                var taken;
	                var framerate = "";
	                var fov;
	                xhr.open("GET", "http://10.5.5.9/gp/gpControl/status", true);
	
	
	                xhr.onload = function() {
	                    if (xhr.readyState === xhr.DONE) {
	                        if (xhr.status === 200) {
	                            var obj = JSON.parse(xhr.responseText);
	                            //detects camera
	
	                            isHero4online = true;
	
	                            //get camera details
	                            switch (obj.status[2]) {
	
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
	
	                            switch (obj.status[43]) {
	                                case 0:
	                                    switch (obj.status[44]) {
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
	                                    switch (obj.status[8]) {
	                                        case 0:
	                                            taken = "" + obj.status[39] + " shots";
	                                            main.backgroundColor('black');
	                                            isRec = false;
	                                            break;
	                                        case 1:
	                                            taken = "" + minutes2str(obj.status[13]);
	                                            isRec = true;
	                                            main.backgroundColor('red');
	                                            break;
	                                    }
	                                    switch (obj.settings[4]) {
	                                        case 0:
	                                            fov = "W";
	                                            break;
	                                        case 1:
	                                            fov = "M";
	                                            break;
	                                        case 2:
	                                            fov = "N";
	                                            break;
	                                        case 4:
	                                            fov = "L";
	                                            break;
	                                    }
	                                    switch (obj.settings[2]) {
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
	                                    switch (obj.settings[3]) {
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
	                                        case 9:
	                                            framerate = "25 FPS";
	                                            break;
	                                        case 10:
	                                            framerate = "24 FPS";
	                                            break;
	                                    }
	                                    break;
	                                case 1:
	                                    switch (obj.status[44]) {
	                                        case 0:
	                                            mode = "photo";
	                                            break;
	                                        case 1:
	                                            mode = "continuous";
	                                            switch (obj.settings[18]) {
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
	                                            switch (obj.settings[19]) {
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
	                                                    framerate = "10 sec";
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
	                                    taken = obj.status[38] + " pictures";
	                                    switch (obj.settings[17]) {
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
	                                    switch (obj.status[44]) {
	                                        case 0:
	                                            mode = "burst";
	                                            switch (obj.settings[29]) {
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
	                                            switch (obj.settings[30]) {
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
	                                    taken = obj.status[38] + ' pictures';
	                                    switch (obj.settings[28]) {
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
	                                case 5:
	                                    mode = "settings";
	                                    current_res = "settings";
	                                    fov = "";
	                                    taken = "";
	                                    left = "";
	
	                            }
	
	                            main.title(current_res + " " + fov);
	                            main.body(framerate + '\n' + 'Batt: ' + batt_percent + '\n' + taken + '\n' + left);
	                            main.icon('images/' + mode + '_icon.png');
	                            main.bodyColor('white');
	                            main.titleColor('white');
	                            main.backgroundColor('black');
	                        } else {
	                            main.title('CONNECTING...');
	                            main.body('Please connect the GoPro WiFi to phone!');
	                            main.subtitleColor('indigo'); // Named colors
	                            main.bodyColor('white'); // Hex colors
	                            main.titleColor('white');
	                            main.backgroundColor('black');
	                        }
	                    }
	                };
	
	
	                xhr.send(null);
	
	            }
	
	        }
	    };
	
	    xhr.send(null);
	    if (!keys.simplemode) {
	        setTimeout(get_data_cam, 2000);
	    } else {
	        main.title("Simple Mode");
	        main.body("Longpress Down to deactivate");
	        main.bodyColor('white');
	        main.titleColor('white');
	        main.backgroundColor('black');
	    }
	    /*
	
	
	        */
	
	}
	
	
	
	function minutes2str(minutes) {
	    var h = Math.floor(minutes / 60);
	    var m = minutes % 60;
	    return h + "M" + ("0" + m).slice(-2) + "S";
	}
	
	function get_h3_cam() {
	
	    xhr.open("GET", "http://10.5.5.9/camera/cv", true);
	
	    xhr.onload = function() {
	        if (xhr.readyState === xhr.DONE) {
	            if (xhr.status === 200) {
	                var camName = "camera";
	                var dump = xhr.responseText;
	                if (dump.indexOf("Black") != -1) {
	                    camName = "HERO3 Black";
	
	                }
	                if (dump.indexOf("Silver") != -1) {
	                    camName = "HERO3 Silver";
	
	                }
	                if (dump.indexOf("White") != -1) {
	                    camName = "HERO3 White";
	
	                }
	                var gopropassword = "hello";
	                xhr.open("GET", "http://10.5.5.9/bacpac/sd", true);
	
	                xhr.onload = function() {
	                    if (xhr.readyState === xhr.DONE) {
	                        if (xhr.status === 200) {
	                            gopropassword = xhr.responseText.cleanup();
	                            h3Pass = gopropassword;
	
	                            var data = "";
	                            //screendata
	                            //getGP3Status(gopropassword);
	                            var main_h3 = new UI.Card({
	                                title: 'HERO3 Camera',
	                                body: 'Connected to: ' + camName + "\n",
	                                subtitleColor: 'white',
	                                titleColor: 'white',
	                                bodyColor: 'white',
	                                backgroundColor: 'black'
	                            });
	
	                            main_h3.on('click', 'up', function(e) {
	                                //show menu
	                                var menu = new UI.Menu({
	                                    title: 'modes',
	                                    backgroundColor: 'black',
	                                    textColor: 'white',
	                                    highlightBackgroundColor: 'white',
	                                    highlightTextColor: 'black',
	                                    sections: [{
	                                        items: [{
	                                            title: 'Video',
	                                        }, {
	                                            title: 'Photo',
	                                        }, {
	                                            title: 'Burst',
	                                        }, {
	                                            title: 'TimeLapse'
	                                        }]
	                                    }]
	                                });
	                                menu.on('select', function(e) {
	                                    console.log('Selected item #' + e.itemIndex + ' of section #' + e.sectionIndex);
	                                    console.log('The item is titled "' + e.item.title + '"');
	                                    switch (e.itemIndex) {
	                                        case 0:
	                                            var xhr = new XMLHttpRequest();
	                                            xhr.open("GET", "http://10.5.5.9/camera/CM?t=" + gopropassword + "&p=%00", true);
	                                            xhr.send(null);
	                                            menu.hide();
	                                            break;
	                                        case 1:
	                                            var xhr = new XMLHttpRequest();
	                                            xhr.open("GET", "http://10.5.5.9/camera/CM?t=" + gopropassword + "&p=%01", true);
	                                            xhr.send(null);
	                                            menu.hide();
	                                            break;
	                                        case 2:
	                                            var xhr = new XMLHttpRequest();
	                                            xhr.open("GET", "http://10.5.5.9/camera/CM?t=" + h3Pass + "&p=%02", true);
	                                            xhr.send(null);
	                                            menu.hide();
	                                            break;
	                                        case 3:
	                                            var xhr = new XMLHttpRequest();
	                                            xhr.open("GET", "http://10.5.5.9/camera/CM?t=" + h3Pass + "&p=%03", true);
	                                            xhr.send(null);
	                                            menu.hide();
	                                            break;
	                                    }
	
	                                });
	                                menu.show();
	                            });
	                            main_h3.on('click', 'select', function(e) {
	                                var xhr = new XMLHttpRequest();
	                                xhr.open("GET", "http://10.5.5.9/bacpac/SH?t=" + h3Pass + "&p=%01", true);
	                                xhr.send(null);
	                            });
	                            main_h3.on('click', 'down', function(e) {
	                                var xhr = new XMLHttpRequest();
	                                xhr.open("GET", "http://10.5.5.9/bacpac/SH?t=" + h3Pass + "&p=%00", true);
	                                xhr.send(null);
	                            });
	                            main_h3.show();
	                        }
	                    }
	                };
	                xhr.send(null);
	
	            }
	        }
	    };
	    xhr.send(null);
	
	
	}
	String.prototype.cleanup = function() {
	    return this.replace(/[^a-zA-Z0-9]+/g, "");
	};
	
	xhr.open("GET", "http://10.5.5.9/camera/cv", true);
	xhr.onload = function() {
	    if (xhr.readyState === xhr.DONE) {
	        if (xhr.status === 200) {
	            var dump = xhr.responseText;
	            if (dump.indexOf("Hero3") != -1) {
	                //Detects HERO3/3+ (2014 and 2013) Cameras
	                get_h3_cam();
	                HERO3 = true;
	            } else {
	                //Further detection
	                xhr.open("GET", "http://10.5.5.9/gp/gpControl/info", true);
	                xhr.onload = function() {
	                    if (xhr.readyState === xhr.DONE) {
	                        if (xhr.status === 200) {
	                            var dump = xhr.responseText;
	                            if (dump.indexOf("HD5") != -1) {
	                                get_data_cam();
	                            }
	                            if (dump.indexOf("HERO4") != -1) {
	                                get_data_cam();
	                            }
	                        }
	                    }
	                };
	                xhr.send(null);
	            }
	            if (dump.indexOf("HERO4") != -1) {
	                get_data_cam();
	            }
	            if (dump.indexOf("HD3.2") != -1) {
	                get_data_cam();
	            }
	            if (dump.indexOf("HX") != -1) {
	                get_data_cam();
	            }
	        }
	    }
	};
	
	xhr.send(null);
	
	
	//HERO5 detection
	if (HERO3 == False) {
	    xhr.open("GET", "http://10.5.5.9/gp/gpControl/info", true);
	    xhr.onload = function() {
	        if (xhr.readyState === xhr.DONE) {
	            if (xhr.status === 200) {
	                var dump = xhr.responseText;
	                if (dump.indexOf("HD5") != -1) {
	                    get_data_cam();
	                }
	                if (dump.indexOf("HERO4") != -1) {
	                    get_data_cam();
	                }
	            }
	        }
	    };
	    xhr.send(null);
	}


/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	/*
	 * This is the main PebbleJS file. You do not need to modify this file unless
	 * you want to change the way PebbleJS starts, the script it runs or the libraries
	 * it loads.
	 */
	
	__webpack_require__(4).init();


/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	var Color = __webpack_require__(5);
	var struct = __webpack_require__(6);
	var util2 = __webpack_require__(7);
	var myutil = __webpack_require__(8);
	var Platform = __webpack_require__(9);
	var Wakeup = __webpack_require__(11);
	var Timeline = __webpack_require__(19);
	var Resource = __webpack_require__(21);
	var Accel = __webpack_require__(22);
	var Voice = __webpack_require__(29);
	var ImageService = __webpack_require__(30);
	var WindowStack = __webpack_require__(23);
	var Window = __webpack_require__(24);
	var Menu = __webpack_require__(35);
	var StageElement = __webpack_require__(36);
	var Vector2 = __webpack_require__(25);
	
	var simply = __webpack_require__(18);
	
	/**
	 * This package provides the underlying implementation for the ui/* classes.
	 *
	 * This implementation uses PebbleKit JS AppMessage to send commands to a Pebble Watch.
	 */
	
	/**
	 * First part of this file is defining the commands and types that we will use later.
	 */
	
	var state;
	
	var BoolType = function(x) {
	  return x ? 1 : 0;
	};
	
	var StringType = function(x) {
	  return (x === undefined) ? '' : '' + x;
	};
	
	var UTF8ByteLength = function(x) {
	  return unescape(encodeURIComponent(x)).length;
	};
	
	var EnumerableType = function(x) {
	  if (x && x.hasOwnProperty('length')) {
	    return x.length;
	  }
	  return x ? Number(x) : 0;
	};
	
	var StringLengthType = function(x) {
	  return UTF8ByteLength(StringType(x));
	};
	
	var TimeType = function(x) {
	  if (x instanceof Date) {
	    x = x.getTime() / 1000;
	  }
	  return (x ? Number(x) : 0) + state.timeOffset;
	};
	
	var ImageType = function(x) {
	  if (x && typeof x !== 'number') {
	    return ImageService.resolve(x);
	  }
	  return x ? Number(x) : 0;
	};
	
	var PositionType = function(x) {
	  this.positionX(x.x);
	  this.positionY(x.y);
	};
	
	var SizeType = function(x) {
	  this.sizeW(x.x);
	  this.sizeH(x.y);
	};
	
	var namedColorMap = {
	  'clear': 0x00,
	  'black': 0xC0,
	  'oxfordBlue': 0xC1,
	  'dukeBlue': 0xC2,
	  'blue': 0xC3,
	  'darkGreen': 0xC4,
	  'midnightGreen': 0xC5,
	  'cobaltBlue': 0xC6,
	  'blueMoon': 0xC7,
	  'islamicGreen': 0xC8,
	  'jaegerGreen': 0xC9,
	  'tiffanyBlue': 0xCA,
	  'vividCerulean': 0xCB,
	  'green': 0xCC,
	  'malachite': 0xCD,
	  'mediumSpringGreen': 0xCE,
	  'cyan': 0xCF,
	  'bulgarianRose': 0xD0,
	  'imperialPurple': 0xD1,
	  'indigo': 0xD2,
	  'electricUltramarine': 0xD3,
	  'armyGreen': 0xD4,
	  'darkGray': 0xD5,
	  'liberty': 0xD6,
	  'veryLightBlue': 0xD7,
	  'kellyGreen': 0xD8,
	  'mayGreen': 0xD9,
	  'cadetBlue': 0xDA,
	  'pictonBlue': 0xDB,
	  'brightGreen': 0xDC,
	  'screaminGreen': 0xDD,
	  'mediumAquamarine': 0xDE,
	  'electricBlue': 0xDF,
	  'darkCandyAppleRed': 0xE0,
	  'jazzberryJam': 0xE1,
	  'purple': 0xE2,
	  'vividViolet': 0xE3,
	  'windsorTan': 0xE4,
	  'roseVale': 0xE5,
	  'purpureus': 0xE6,
	  'lavenderIndigo': 0xE7,
	  'limerick': 0xE8,
	  'brass': 0xE9,
	  'lightGray': 0xEA,
	  'babyBlueEyes': 0xEB,
	  'springBud': 0xEC,
	  'inchworm': 0xED,
	  'mintGreen': 0xEE,
	  'celeste': 0xEF,
	  'red': 0xF0,
	  'folly': 0xF1,
	  'fashionMagenta': 0xF2,
	  'magenta': 0xF3,
	  'orange': 0xF4,
	  'sunsetOrange': 0xF5,
	  'brilliantRose': 0xF6,
	  'shockingPink': 0xF7,
	  'chromeYellow': 0xF8,
	  'rajah': 0xF9,
	  'melon': 0xFA,
	  'richBrilliantLavender': 0xFB,
	  'yellow': 0xFC,
	  'icterine': 0xFD,
	  'pastelYellow': 0xFE,
	  'white': 0xFF,
	  'clearWhite': 0x3F,
	};
	
	var namedColorMapUpper = (function() {
	  var map = {};
	  for (var k in namedColorMap) {
	    map[k.toUpperCase()] = namedColorMap[k];
	  }
	  return map;
	})();
	
	var ColorType = function(color) {
	  if (typeof color === 'string') {
	    var name = myutil.toCConstantName(color);
	    name = name.replace(/_+/g, '');
	    if (name in namedColorMapUpper) {
	      return namedColorMapUpper[name];
	    }
	  }
	  var argb = Color.toArgbUint8(color);
	  if ((argb & 0xc0) === 0 && argb !== 0) {
	    argb = argb | 0xc0;
	  }
	  return argb;
	};
	
	var Font = function(x) {
	  var id = Resource.getId(x);
	  if (id) {
	    return id;
	  }
	  x = myutil.toCConstantName(x);
	  if (!x.match(/^RESOURCE_ID/)) {
	    x = 'RESOURCE_ID_' + x;
	  }
	  x = x.replace(/_+/g, '_');
	  return x;
	};
	
	var TextOverflowMode = function(x) {
	  switch (x) {
	    case 'wrap'    : return 0;
	    case 'ellipsis': return 1;
	    case 'fill'    : return 2;
	  }
	  return Number(x);
	};
	
	var TextAlignment = function(x) {
	  switch (x) {
	    case 'left'  : return 0;
	    case 'center': return 1;
	    case 'right' : return 2;
	  }
	  return Number(x);
	};
	
	var TimeUnits = function(x) {
	  var z = 0;
	  x = myutil.toObject(x, true);
	  for (var k in x) {
	    switch (k) {
	      case 'seconds': z |= (1 << 0); break;
	      case 'minutes': z |= (1 << 1); break;
	      case 'hours'  : z |= (1 << 2); break;
	      case 'days'   : z |= (1 << 3); break;
	      case 'months' : z |= (1 << 4); break;
	      case 'years'  : z |= (1 << 5); break;
	    }
	  }
	  return z;
	};
	
	var CompositingOp = function(x) {
	  switch (x) {
	    case 'assign':
	    case 'normal': return 0;
	    case 'assignInverted':
	    case 'invert': return 1;
	    case 'or'    : return 2;
	    case 'and'   : return 3;
	    case 'clear' : return 4;
	    case 'set'   : return 5;
	  }
	  return Number(x);
	};
	
	var AnimationCurve = function(x) {
	  switch (x) {
	    case 'linear'   : return 0;
	    case 'easeIn'   : return 1;
	    case 'easeOut'  : return 2;
	    case 'easeInOut': return 3;
	  }
	  return Number(x);
	};
	
	var MenuRowAlign = function(x) {
	  switch(x) {
	    case 'none'   : return 0;
	    case 'center' : return 1;
	    case 'top'    : return 2;
	    case 'bottom' : return 3;
	  }
	  return x ? Number(x) : 0;
	};
	
	var makeArrayType = function(types) {
	  return function(x) {
	    var index = types.indexOf(x);
	    if (index !== -1) {
	      return index;
	    }
	    return Number(x);
	  };
	};
	
	var makeFlagsType = function(types) {
	  return function(x) {
	    var z = 0;
	    for (var k in x) {
	      if (!x[k]) { continue; }
	      var index = types.indexOf(k);
	      if (index !== -1) {
	        z |= 1 << index;
	      }
	    }
	    return z;
	  };
	};
	
	var LaunchReasonTypes = [
	  'system',
	  'user',
	  'phone',
	  'wakeup',
	  'worker',
	  'quickLaunch',
	  'timelineAction'
	];
	
	var LaunchReasonType = makeArrayType(LaunchReasonTypes);
	
	var WindowTypes = [
	  'window',
	  'menu',
	  'card',
	];
	
	var WindowType = makeArrayType(WindowTypes);
	
	var ButtonTypes = [
	  'back',
	  'up',
	  'select',
	  'down',
	];
	
	var ButtonType = makeArrayType(ButtonTypes);
	
	var ButtonFlagsType = makeFlagsType(ButtonTypes);
	
	var CardTextTypes = [
	  'title',
	  'subtitle',
	  'body',
	];
	
	var CardTextType = makeArrayType(CardTextTypes);
	
	var CardTextColorTypes = [
	  'titleColor',
	  'subtitleColor',
	  'bodyColor',
	];
	
	var CardImageTypes = [
	  'icon',
	  'subicon',
	  'banner',
	];
	
	var CardImageType = makeArrayType(CardImageTypes);
	
	var CardStyleTypes = [
	  'classic-small',
	  'classic-large',
	  'mono',
	  'small',
	  'large',
	];
	
	var CardStyleType = makeArrayType(CardStyleTypes);
	
	var VibeTypes = [
	  'short',
	  'long',
	  'double',
	];
	
	var VibeType = makeArrayType(VibeTypes);
	
	var LightTypes = [
	  'on',
	  'auto',
	  'trigger'
	];
	
	var LightType = makeArrayType(LightTypes);
	
	var DictationSessionStatus = [
	  null,
	  'transcriptionRejected',
	  'transcriptionRejectedWithError',
	  'systemAborted',
	  'noSpeechDetected',
	  'connectivityError',
	  'disabled',
	  'internalError',
	  'recognizerError',
	];
	// Custom Dictation Errors:
	DictationSessionStatus[64] = "sessionAlreadyInProgress";
	DictationSessionStatus[65] = "noMicrophone";
	
	var StatusBarSeparatorModeTypes = [
	  'none',
	  'dotted',
	];
	
	var StatusBarSeparatorModeType = makeArrayType(StatusBarSeparatorModeTypes);
	
	var Packet = new struct([
	  ['uint16', 'type'],
	  ['uint16', 'length'],
	]);
	
	var SegmentPacket = new struct([
	  [Packet, 'packet'],
	  ['bool', 'isLast'],
	  ['data', 'buffer'],
	]);
	
	var ReadyPacket = new struct([
	  [Packet, 'packet'],
	]);
	
	var LaunchReasonPacket = new struct([
	  [Packet, 'packet'],
	  ['uint32', 'reason', LaunchReasonType],
	  ['uint32', 'args'],
	  ['uint32', 'time'],
	  ['bool', 'isTimezone'],
	]);
	
	var WakeupSetPacket = new struct([
	  [Packet, 'packet'],
	  ['uint32', 'timestamp', TimeType],
	  ['int32', 'cookie'],
	  ['uint8', 'notifyIfMissed', BoolType],
	]);
	
	var WakeupSetResultPacket = new struct([
	  [Packet, 'packet'],
	  ['int32', 'id'],
	  ['int32', 'cookie'],
	]);
	
	var WakeupCancelPacket = new struct([
	  [Packet, 'packet'],
	  ['int32', 'id'],
	]);
	
	var WakeupEventPacket = new struct([
	  [Packet, 'packet'],
	  ['int32', 'id'],
	  ['int32', 'cookie'],
	]);
	
	var WindowShowPacket = new struct([
	  [Packet, 'packet'],
	  ['uint8', 'type', WindowType],
	  ['bool', 'pushing', BoolType],
	]);
	
	var WindowHidePacket = new struct([
	  [Packet, 'packet'],
	  ['uint32', 'id'],
	]);
	
	var WindowShowEventPacket = new struct([
	  [Packet, 'packet'],
	  ['uint32', 'id'],
	]);
	
	var WindowHideEventPacket = new struct([
	  [Packet, 'packet'],
	  ['uint32', 'id'],
	]);
	
	var WindowPropsPacket = new struct([
	  [Packet, 'packet'],
	  ['uint32', 'id'],
	  ['uint8', 'backgroundColor', ColorType],
	  ['bool', 'scrollable', BoolType],
	  ['bool', 'paging', BoolType],
	]);
	
	var WindowButtonConfigPacket = new struct([
	  [Packet, 'packet'],
	  ['uint8', 'buttonMask', ButtonFlagsType],
	]);
	
	var WindowStatusBarPacket = new struct([
	  [Packet, 'packet'],
	  ['uint8', 'backgroundColor', ColorType],
	  ['uint8', 'color', ColorType],
	  ['uint8', 'separator', StatusBarSeparatorModeType],
	  ['uint8', 'status', BoolType],
	]);
	
	var WindowActionBarPacket = new struct([
	  [Packet, 'packet'],
	  ['uint32', 'up', ImageType],
	  ['uint32', 'select', ImageType],
	  ['uint32', 'down', ImageType],
	  ['uint8', 'backgroundColor', ColorType],
	  ['uint8', 'action', BoolType],
	]);
	
	var ClickPacket = new struct([
	  [Packet, 'packet'],
	  ['uint8', 'button', ButtonType],
	]);
	
	var LongClickPacket = new struct([
	  [Packet, 'packet'],
	  ['uint8', 'button', ButtonType],
	]);
	
	var ImagePacket = new struct([
	  [Packet, 'packet'],
	  ['uint32', 'id'],
	  ['int16', 'width'],
	  ['int16', 'height'],
	  ['uint16', 'pixelsLength'],
	  ['data', 'pixels'],
	]);
	
	var CardClearPacket = new struct([
	  [Packet, 'packet'],
	  ['uint8', 'flags'],
	]);
	
	var CardTextPacket = new struct([
	  [Packet, 'packet'],
	  ['uint8', 'index', CardTextType],
	  ['uint8', 'color', ColorType],
	  ['cstring', 'text'],
	]);
	
	var CardImagePacket = new struct([
	  [Packet, 'packet'],
	  ['uint32', 'image', ImageType],
	  ['uint8', 'index', CardImageType],
	]);
	
	var CardStylePacket = new struct([
	  [Packet, 'packet'],
	  ['uint8', 'style', CardStyleType],
	]);
	
	var VibePacket = new struct([
	  [Packet, 'packet'],
	  ['uint8', 'type', VibeType],
	]);
	
	var LightPacket = new struct([
	  [Packet, 'packet'],
	  ['uint8', 'type', LightType],
	]);
	
	var AccelPeekPacket = new struct([
	  [Packet, 'packet'],
	]);
	
	var AccelConfigPacket = new struct([
	  [Packet, 'packet'],
	  ['uint16', 'samples'],
	  ['uint8', 'rate'],
	  ['bool', 'subscribe', BoolType],
	]);
	
	var AccelData = new struct([
	  ['int16', 'x'],
	  ['int16', 'y'],
	  ['int16', 'z'],
	  ['bool', 'vibe'],
	  ['uint64', 'time'],
	]);
	
	var AccelDataPacket = new struct([
	  [Packet, 'packet'],
	  ['bool', 'peek'],
	  ['uint8', 'samples'],
	]);
	
	var AccelTapPacket = new struct([
	  [Packet, 'packet'],
	  ['uint8', 'axis'],
	  ['int8', 'direction'],
	]);
	
	var MenuClearPacket = new struct([
	  [Packet, 'packet'],
	]);
	
	var MenuClearSectionPacket = new struct([
	  [Packet, 'packet'],
	  ['uint16', 'section'],
	]);
	
	var MenuPropsPacket = new struct([
	  [Packet, 'packet'],
	  ['uint16', 'sections', EnumerableType],
	  ['uint8', 'backgroundColor', ColorType],
	  ['uint8', 'textColor', ColorType],
	  ['uint8', 'highlightBackgroundColor', ColorType],
	  ['uint8', 'highlightTextColor', ColorType],
	]);
	
	var MenuSectionPacket = new struct([
	  [Packet, 'packet'],
	  ['uint16', 'section'],
	  ['uint16', 'items', EnumerableType],
	  ['uint8', 'backgroundColor', ColorType],
	  ['uint8', 'textColor', ColorType],
	  ['uint16', 'titleLength', StringLengthType],
	  ['cstring', 'title', StringType],
	]);
	
	var MenuGetSectionPacket = new struct([
	  [Packet, 'packet'],
	  ['uint16', 'section'],
	]);
	
	var MenuItemPacket = new struct([
	  [Packet, 'packet'],
	  ['uint16', 'section'],
	  ['uint16', 'item'],
	  ['uint32', 'icon', ImageType],
	  ['uint16', 'titleLength', StringLengthType],
	  ['uint16', 'subtitleLength', StringLengthType],
	  ['cstring', 'title', StringType],
	  ['cstring', 'subtitle', StringType],
	]);
	
	var MenuGetItemPacket = new struct([
	  [Packet, 'packet'],
	  ['uint16', 'section'],
	  ['uint16', 'item'],
	]);
	
	var MenuSelectionPacket = new struct([
	  [Packet, 'packet'],
	  ['uint16', 'section'],
	  ['uint16', 'item'],
	  ['uint8', 'align', MenuRowAlign],
	  ['bool', 'animated', BoolType],
	]);
	
	var MenuGetSelectionPacket = new struct([
	  [Packet, 'packet'],
	]);
	
	var MenuSelectionEventPacket = new struct([
	  [Packet, 'packet'],
	  ['uint16', 'section'],
	  ['uint16', 'item'],
	]);
	
	var MenuSelectPacket = new struct([
	  [Packet, 'packet'],
	  ['uint16', 'section'],
	  ['uint16', 'item'],
	]);
	
	var MenuLongSelectPacket = new struct([
	  [Packet, 'packet'],
	  ['uint16', 'section'],
	  ['uint16', 'item'],
	]);
	
	var StageClearPacket = new struct([
	  [Packet, 'packet'],
	]);
	
	var ElementInsertPacket = new struct([
	  [Packet, 'packet'],
	  ['uint32', 'id'],
	  ['uint8', 'type'],
	  ['uint16', 'index'],
	]);
	
	var ElementRemovePacket = new struct([
	  [Packet, 'packet'],
	  ['uint32', 'id'],
	]);
	
	var GPoint = new struct([
	  ['int16', 'x'],
	  ['int16', 'y'],
	]);
	
	var GSize = new struct([
	  ['int16', 'w'],
	  ['int16', 'h'],
	]);
	
	var GRect = new struct([
	  [GPoint, 'origin', PositionType],
	  [GSize, 'size', SizeType],
	]);
	
	var ElementCommonPacket = new struct([
	  [Packet, 'packet'],
	  ['uint32', 'id'],
	  [GPoint, 'position', PositionType],
	  [GSize, 'size', SizeType],
	  ['uint16', 'borderWidth', EnumerableType],
	  ['uint8', 'backgroundColor', ColorType],
	  ['uint8', 'borderColor', ColorType],
	]);
	
	var ElementRadiusPacket = new struct([
	  [Packet, 'packet'],
	  ['uint32', 'id'],
	  ['uint16', 'radius', EnumerableType],
	]);
	
	var ElementAnglePacket = new struct([
	  [Packet, 'packet'],
	  ['uint32', 'id'],
	  ['uint16', 'angle', EnumerableType],
	]);
	
	var ElementAngle2Packet = new struct([
	  [Packet, 'packet'],
	  ['uint32', 'id'],
	  ['uint16', 'angle2', EnumerableType],
	]);
	
	var ElementTextPacket = new struct([
	  [Packet, 'packet'],
	  ['uint32', 'id'],
	  ['uint8', 'updateTimeUnits', TimeUnits],
	  ['cstring', 'text', StringType],
	]);
	
	var ElementTextStylePacket = new struct([
	  [Packet, 'packet'],
	  ['uint32', 'id'],
	  ['uint8', 'color', ColorType],
	  ['uint8', 'textOverflow', TextOverflowMode],
	  ['uint8', 'textAlign', TextAlignment],
	  ['uint32', 'customFont'],
	  ['cstring', 'systemFont', StringType],
	]);
	
	var ElementImagePacket = new struct([
	  [Packet, 'packet'],
	  ['uint32', 'id'],
	  ['uint32', 'image', ImageType],
	  ['uint8', 'compositing', CompositingOp],
	]);
	
	var ElementAnimatePacket = new struct([
	  [Packet, 'packet'],
	  ['uint32', 'id'],
	  [GPoint, 'position', PositionType],
	  [GSize, 'size', SizeType],
	  ['uint32', 'duration'],
	  ['uint8', 'easing', AnimationCurve],
	]);
	
	var ElementAnimateDonePacket = new struct([
	  [Packet, 'packet'],
	  ['uint32', 'id'],
	]);
	
	var VoiceDictationStartPacket = new struct([
	  [Packet, 'packet'],
	  ['bool', 'enableConfirmation'],
	]);
	
	var VoiceDictationStopPacket = new struct([
	  [Packet, 'packet'],
	]);
	
	var VoiceDictationDataPacket = new struct([
	  [Packet, 'packet'],
	  ['int8', 'status'],
	  ['cstring', 'transcription'],
	]);
	
	var CommandPackets = [
	  Packet,
	  SegmentPacket,
	  ReadyPacket,
	  LaunchReasonPacket,
	  WakeupSetPacket,
	  WakeupSetResultPacket,
	  WakeupCancelPacket,
	  WakeupEventPacket,
	  WindowShowPacket,
	  WindowHidePacket,
	  WindowShowEventPacket,
	  WindowHideEventPacket,
	  WindowPropsPacket,
	  WindowButtonConfigPacket,
	  WindowStatusBarPacket,
	  WindowActionBarPacket,
	  ClickPacket,
	  LongClickPacket,
	  ImagePacket,
	  CardClearPacket,
	  CardTextPacket,
	  CardImagePacket,
	  CardStylePacket,
	  VibePacket,
	  LightPacket,
	  AccelPeekPacket,
	  AccelConfigPacket,
	  AccelDataPacket,
	  AccelTapPacket,
	  MenuClearPacket,
	  MenuClearSectionPacket,
	  MenuPropsPacket,
	  MenuSectionPacket,
	  MenuGetSectionPacket,
	  MenuItemPacket,
	  MenuGetItemPacket,
	  MenuSelectionPacket,
	  MenuGetSelectionPacket,
	  MenuSelectionEventPacket,
	  MenuSelectPacket,
	  MenuLongSelectPacket,
	  StageClearPacket,
	  ElementInsertPacket,
	  ElementRemovePacket,
	  ElementCommonPacket,
	  ElementRadiusPacket,
	  ElementAnglePacket,
	  ElementAngle2Packet,
	  ElementTextPacket,
	  ElementTextStylePacket,
	  ElementImagePacket,
	  ElementAnimatePacket,
	  ElementAnimateDonePacket,
	  VoiceDictationStartPacket,
	  VoiceDictationStopPacket,
	  VoiceDictationDataPacket,
	];
	
	var accelAxes = [
	  'x',
	  'y',
	  'z',
	];
	
	var clearFlagMap = {
	  action: (1 << 0),
	  text: (1 << 1),
	  image: (1 << 2),
	};
	
	/**
	 * SimplyPebble object provides the actual methods to communicate with Pebble.
	 *
	 * It's an implementation of an abstract interface used by all the other classes.
	 */
	
	var SimplyPebble = {};
	
	SimplyPebble.init = function() {
	  // Register listeners for app message communication
	  Pebble.addEventListener('appmessage', SimplyPebble.onAppMessage);
	
	  // Register this implementation as the one currently in use
	  simply.impl = SimplyPebble;
	
	  state = SimplyPebble.state = {};
	
	  state.timeOffset = new Date().getTimezoneOffset() * -60;
	
	  // Initialize the app message queue
	  state.messageQueue = new MessageQueue();
	
	  // Initialize the packet queue
	  state.packetQueue = new PacketQueue();
	
	  // Signal the Pebble that the Phone's app message is ready
	  SimplyPebble.ready();
	};
	
	/**
	 * MessageQueue is an app message queue that guarantees delivery and order.
	 */
	var MessageQueue = function() {
	  this._queue = [];
	  this._sending = false;
	
	  this._consume = this.consume.bind(this);
	  this._cycle = this.cycle.bind(this);
	};
	
	MessageQueue.prototype.stop = function() {
	  this._sending = false;
	};
	
	MessageQueue.prototype.consume = function() {
	  this._queue.shift();
	  if (this._queue.length === 0) {
	    return this.stop();
	  }
	  this.cycle();
	};
	
	MessageQueue.prototype.checkSent = function(message, fn) {
	  return function() {
	    if (message === this._sent) {
	      fn();
	    }
	  }.bind(this);
	};
	
	MessageQueue.prototype.cycle = function() {
	  if (!this._sending) {
	    return;
	  }
	  var head = this._queue[0];
	  if (!head) {
	    return this.stop();
	  }
	  this._sent = head;
	  var success = this.checkSent(head, this._consume);
	  var failure = this.checkSent(head, this._cycle);
	  Pebble.sendAppMessage(head, success, failure);
	};
	
	MessageQueue.prototype.send = function(message) {
	  this._queue.push(message);
	  if (this._sending) {
	    return;
	  }
	  this._sending = true;
	  this.cycle();
	};
	
	var toByteArray = function(packet) {
	  var type = CommandPackets.indexOf(packet);
	  var size = Math.max(packet._size, packet._cursor);
	  packet.packetType(type);
	  packet.packetLength(size);
	
	  var buffer = packet._view;
	  var byteArray = new Array(size);
	  for (var i = 0; i < size; ++i) {
	    byteArray[i] = buffer.getUint8(i);
	  }
	
	  return byteArray;
	};
	
	/**
	 * PacketQueue is a packet queue that combines multiple packets into a single packet.
	 * This reduces latency caused by the time spacing between each app message.
	 */
	var PacketQueue = function() {
	  this._message = [];
	
	  this._send = this.send.bind(this);
	};
	
	PacketQueue.prototype._maxPayloadSize = (Platform.version() === 'aplite' ? 1024 : 2044) - 32;
	
	PacketQueue.prototype.add = function(packet) {
	  var byteArray = toByteArray(packet);
	  if (this._message.length + byteArray.length > this._maxPayloadSize) {
	    this.send();
	  }
	  Array.prototype.push.apply(this._message, byteArray);
	  clearTimeout(this._timeout);
	  this._timeout = setTimeout(this._send, 0);
	};
	
	PacketQueue.prototype.send = function() {
	  if (this._message.length === 0) {
	    return;
	  }
	  state.messageQueue.send({ 0: this._message });
	  this._message = [];
	};
	
	SimplyPebble.sendMultiPacket = function(packet) {
	  var byteArray = toByteArray(packet);
	  var totalSize = byteArray.length;
	  var segmentSize = state.packetQueue._maxPayloadSize - Packet._size;
	  for (var i = 0; i < totalSize; i += segmentSize) {
	    var isLast = (i + segmentSize) >= totalSize;
	    var buffer = byteArray.slice(i, Math.min(totalSize, i + segmentSize));
	    SegmentPacket.isLast((i + segmentSize) >= totalSize).buffer(buffer);
	    state.packetQueue.add(SegmentPacket);
	  }
	};
	
	SimplyPebble.sendPacket = function(packet) {
	  if (packet._cursor < state.packetQueue._maxPayloadSize) {
	    state.packetQueue.add(packet);
	  } else {
	    SimplyPebble.sendMultiPacket(packet);
	  }
	};
	
	SimplyPebble.ready = function() {
	  SimplyPebble.sendPacket(ReadyPacket);
	};
	
	SimplyPebble.wakeupSet = function(timestamp, cookie, notifyIfMissed) {
	  WakeupSetPacket
	    .timestamp(timestamp)
	    .cookie(cookie)
	    .notifyIfMissed(notifyIfMissed);
	  SimplyPebble.sendPacket(WakeupSetPacket);
	};
	
	SimplyPebble.wakeupCancel = function(id) {
	  SimplyPebble.sendPacket(WakeupCancelPacket.id(id === 'all' ? -1 : id));
	};
	
	SimplyPebble.windowShow = function(def) {
	  SimplyPebble.sendPacket(WindowShowPacket.prop(def));
	};
	
	SimplyPebble.windowHide = function(id) {
	  SimplyPebble.sendPacket(WindowHidePacket.id(id));
	};
	
	SimplyPebble.windowProps = function(def) {
	  WindowPropsPacket
	    .prop(def)
	    .backgroundColor(def.backgroundColor || 'white');
	  SimplyPebble.sendPacket(WindowPropsPacket);
	};
	
	SimplyPebble.windowButtonConfig = function(def) {
	  SimplyPebble.sendPacket(WindowButtonConfigPacket.buttonMask(def));
	};
	
	var toStatusDef = function(statusDef) {
	  if (typeof statusDef === 'boolean') {
	    statusDef = { status: statusDef };
	  }
	  return statusDef;
	};
	
	SimplyPebble.windowStatusBar = function(def) {
	  var statusDef = toStatusDef(def);
	  WindowStatusBarPacket
	    .separator(statusDef.separator || 'dotted')
	    .status(typeof def === 'boolean' ? def : def.status !== false)
	    .color(statusDef.color || 'black')
	    .backgroundColor(statusDef.backgroundColor || 'white');
	  SimplyPebble.sendPacket(WindowStatusBarPacket);
	};
	
	SimplyPebble.windowStatusBarCompat = function(def) {
	  if (typeof def.fullscreen === 'boolean') {
	    SimplyPebble.windowStatusBar(!def.fullscreen);
	  } else if (def.status !== undefined) {
	    SimplyPebble.windowStatusBar(def.status);
	  }
	};
	
	var toActionDef = function(actionDef) {
	  if (typeof actionDef === 'boolean') {
	    actionDef = { action: actionDef };
	  }
	  return actionDef;
	};
	
	SimplyPebble.windowActionBar = function(def) {
	  var actionDef = toActionDef(def);
	  WindowActionBarPacket
	    .up(actionDef.up)
	    .select(actionDef.select)
	    .down(actionDef.down)
	    .action(typeof def === 'boolean' ? def : def.action !== false)
	    .backgroundColor(actionDef.backgroundColor || 'black');
	  SimplyPebble.sendPacket(WindowActionBarPacket);
	};
	
	SimplyPebble.image = function(id, gbitmap) {
	  SimplyPebble.sendPacket(ImagePacket.id(id).prop(gbitmap));
	};
	
	var toClearFlags = function(clear) {
	  if (clear === true || clear === 'all') {
	    clear = ~0;
	  } else if (typeof clear === 'string') {
	    clear = clearFlagMap[clear];
	  } else if (typeof clear === 'object') {
	    var flags = 0;
	    for (var k in clear) {
	      if (clear[k] === true) {
	        flags |= clearFlagMap[k];
	      }
	    }
	    clear = flags;
	  }
	  return clear;
	};
	
	SimplyPebble.cardClear = function(clear) {
	  SimplyPebble.sendPacket(CardClearPacket.flags(toClearFlags(clear)));
	};
	
	SimplyPebble.cardText = function(field, text, color) {
	  CardTextPacket
	    .index(field)
	    .color(color || 'clearWhite')
	    .text(text || '');
	  SimplyPebble.sendPacket(CardTextPacket);
	};
	
	SimplyPebble.cardImage = function(field, image) {
	  SimplyPebble.sendPacket(CardImagePacket.index(field).image(image));
	};
	
	SimplyPebble.cardStyle = function(field, style) {
	  SimplyPebble.sendPacket(CardStylePacket.style(style));
	};
	
	SimplyPebble.card = function(def, clear, pushing) {
	  if (arguments.length === 3) {
	    SimplyPebble.windowShow({ type: 'card', pushing: pushing });
	  }
	  if (clear !== undefined) {
	    SimplyPebble.cardClear(clear);
	  }
	  SimplyPebble.windowProps(def);
	  SimplyPebble.windowStatusBarCompat(def);
	  if (def.action !== undefined) {
	    SimplyPebble.windowActionBar(def.action);
	  }
	  for (var k in def) {
	    var textIndex = CardTextTypes.indexOf(k);
	    if (textIndex !== -1) {
	      SimplyPebble.cardText(k, def[k], def[CardTextColorTypes[textIndex]]);
	    } else if (CardImageTypes.indexOf(k) !== -1) {
	      SimplyPebble.cardImage(k, def[k]);
	    } else if (k === 'style') {
	      SimplyPebble.cardStyle(k, def[k]);
	    }
	  }
	};
	
	SimplyPebble.vibe = function(type) {
	  SimplyPebble.sendPacket(VibePacket.type(type));
	};
	
	SimplyPebble.light = function(type) {
	  SimplyPebble.sendPacket(LightPacket.type(type));
	};
	
	var accelListeners = [];
	
	SimplyPebble.accelPeek = function(callback) {
	  accelListeners.push(callback);
	  SimplyPebble.sendPacket(AccelPeekPacket);
	};
	
	SimplyPebble.accelConfig = function(def) {
	  SimplyPebble.sendPacket(AccelConfigPacket.prop(def));
	};
	
	SimplyPebble.voiceDictationStart = function(callback, enableConfirmation) {
	  if (Platform.version() === 'aplite') {
	    // If there is no microphone, call with an error event
	    callback({
	      'err': DictationSessionStatus[65],  // noMicrophone
	      'failed': true,
	      'transcription': null,
	    });
	    return;
	  } else if (state.dictationCallback) {
	    // If there's a transcription in progress, call with an error event
	    callback({
	      'err': DictationSessionStatus[64],  // dictationAlreadyInProgress
	      'failed': true,
	      'transcription': null,
	    });
	    return;
	  }
	
	  // Set the callback and send the packet
	  state.dictationCallback = callback;
	  SimplyPebble.sendPacket(VoiceDictationStartPacket.enableConfirmation(enableConfirmation));
	};
	
	SimplyPebble.voiceDictationStop = function() {
	  // Send the message and delete the callback
	  SimplyPebble.sendPacket(VoiceDictationStopPacket);
	  delete state.dictationCallback;
	};
	
	SimplyPebble.onVoiceData = function(packet) {
	  if (!state.dictationCallback) {
	    // Something bad happened
	    console.log("No callback specified for dictation session");
	  } else {
	    var e = {
	      'err': DictationSessionStatus[packet.status()],
	      'failed': packet.status() !== 0,
	      'transcription': packet.transcription(),
	    };
	    // Invoke and delete the callback
	    state.dictationCallback(e);
	    delete state.dictationCallback;
	  }
	};
	
	SimplyPebble.menuClear = function() {
	  SimplyPebble.sendPacket(MenuClearPacket);
	};
	
	SimplyPebble.menuClearSection = function(section) {
	  SimplyPebble.sendPacket(MenuClearSectionPacket.section(section));
	};
	
	SimplyPebble.menuProps = function(def) {
	  SimplyPebble.sendPacket(MenuPropsPacket.prop(def));
	};
	
	SimplyPebble.menuSection = function(section, def, clear) {
	  if (clear !== undefined) {
	    SimplyPebble.menuClearSection(section);
	  }
	  MenuSectionPacket
	    .section(section)
	    .items(def.items)
	    .backgroundColor(def.backgroundColor)
	    .textColor(def.textColor)
	    .titleLength(def.title)
	    .title(def.title);
	  SimplyPebble.sendPacket(MenuSectionPacket);
	};
	
	SimplyPebble.menuItem = function(section, item, def) {
	  MenuItemPacket
	    .section(section)
	    .item(item)
	    .icon(def.icon)
	    .titleLength(def.title)
	    .subtitleLength(def.subtitle)
	    .title(def.title)
	    .subtitle(def.subtitle);
	  SimplyPebble.sendPacket(MenuItemPacket);
	};
	
	SimplyPebble.menuSelection = function(section, item, align) {
	  if (section === undefined) {
	    SimplyPebble.sendPacket(MenuGetSelectionPacket);
	    return;
	  }
	  SimplyPebble.sendPacket(MenuSelectionPacket.section(section).item(item).align(align || 'center'));
	};
	
	SimplyPebble.menu = function(def, clear, pushing) {
	  if (typeof pushing === 'boolean') {
	    SimplyPebble.windowShow({ type: 'menu', pushing: pushing });
	  }
	  if (clear !== undefined) {
	    SimplyPebble.menuClear();
	  }
	  SimplyPebble.windowProps(def);
	  SimplyPebble.windowStatusBarCompat(def);
	  SimplyPebble.menuProps(def);
	};
	
	SimplyPebble.elementInsert = function(id, type, index) {
	  SimplyPebble.sendPacket(ElementInsertPacket.id(id).type(type).index(index));
	};
	
	SimplyPebble.elementRemove = function(id) {
	  SimplyPebble.sendPacket(ElementRemovePacket.id(id));
	};
	
	SimplyPebble.elementFrame = function(packet, def, altDef) {
	  var position = def.position || (altDef ? altDef.position : undefined);
	  var position2 = def.position2 || (altDef ? altDef.position2 : undefined);
	  var size = def.size || (altDef ? altDef.size : undefined);
	  if (position && position2) {
	    size = position2.clone().subSelf(position);
	  }
	  packet.position(position);
	  packet.size(size);
	};
	
	SimplyPebble.elementCommon = function(id, def) {
	  if ('strokeColor' in def) {
	    ElementCommonPacket.borderColor(def.strokeColor);
	  }
	  if ('strokeWidth' in def) {
	    ElementCommonPacket.borderWidth(def.strokeWidth);
	  }
	  SimplyPebble.elementFrame(ElementCommonPacket, def);
	  ElementCommonPacket
	    .id(id)
	    .prop(def);
	  SimplyPebble.sendPacket(ElementCommonPacket);
	};
	
	SimplyPebble.elementRadius = function(id, def) {
	  SimplyPebble.sendPacket(ElementRadiusPacket.id(id).radius(def.radius));
	};
	
	SimplyPebble.elementAngle = function(id, def) {
	  SimplyPebble.sendPacket(ElementAnglePacket.id(id).angle(def.angleStart || def.angle));
	};
	
	SimplyPebble.elementAngle2 = function(id, def) {
	  SimplyPebble.sendPacket(ElementAngle2Packet.id(id).angle2(def.angleEnd || def.angle2));
	};
	
	SimplyPebble.elementText = function(id, text, timeUnits) {
	  SimplyPebble.sendPacket(ElementTextPacket.id(id).updateTimeUnits(timeUnits).text(text));
	};
	
	SimplyPebble.elementTextStyle = function(id, def) {
	  ElementTextStylePacket.id(id).prop(def);
	  var font = Font(def.font);
	  if (typeof font === 'number') {
	    ElementTextStylePacket.customFont(font).systemFont('');
	  } else {
	    ElementTextStylePacket.customFont(0).systemFont(font);
	  }
	  SimplyPebble.sendPacket(ElementTextStylePacket);
	};
	
	SimplyPebble.elementImage = function(id, image, compositing) {
	  SimplyPebble.sendPacket(ElementImagePacket.id(id).image(image).compositing(compositing));
	};
	
	SimplyPebble.elementAnimate = function(id, def, animateDef, duration, easing) {
	  SimplyPebble.elementFrame(ElementAnimatePacket, animateDef, def);
	  ElementAnimatePacket
	    .id(id)
	    .duration(duration)
	    .easing(easing);
	  SimplyPebble.sendPacket(ElementAnimatePacket);
	};
	
	SimplyPebble.stageClear = function() {
	  SimplyPebble.sendPacket(StageClearPacket);
	};
	
	SimplyPebble.stageElement = function(id, type, def, index) {
	  if (index !== undefined) {
	    SimplyPebble.elementInsert(id, type, index);
	  }
	  SimplyPebble.elementCommon(id, def);
	  switch (type) {
	    case StageElement.RectType:
	    case StageElement.CircleType:
	      SimplyPebble.elementRadius(id, def);
	      break;
	    case StageElement.RadialType:
	      SimplyPebble.elementRadius(id, def);
	      SimplyPebble.elementAngle(id, def);
	      SimplyPebble.elementAngle2(id, def);
	      break;
	    case StageElement.TextType:
	      SimplyPebble.elementRadius(id, def);
	      SimplyPebble.elementTextStyle(id, def);
	      SimplyPebble.elementText(id, def.text, def.updateTimeUnits);
	      break;
	    case StageElement.ImageType:
	      SimplyPebble.elementRadius(id, def);
	      SimplyPebble.elementImage(id, def.image, def.compositing);
	      break;
	  }
	};
	
	SimplyPebble.stageRemove = SimplyPebble.elementRemove;
	
	SimplyPebble.stageAnimate = SimplyPebble.elementAnimate;
	
	SimplyPebble.stage = function(def, clear, pushing) {
	  if (arguments.length === 3) {
	    SimplyPebble.windowShow({ type: 'window', pushing: pushing });
	  }
	  SimplyPebble.windowProps(def);
	  SimplyPebble.windowStatusBarCompat(def);
	  if (clear !== undefined) {
	    SimplyPebble.stageClear();
	  }
	  if (def.action !== undefined) {
	    SimplyPebble.windowActionBar(def.action);
	  }
	};
	
	SimplyPebble.window = SimplyPebble.stage;
	
	var toArrayBuffer = function(array, length) {
	  length = length || array.length;
	  var copy = new DataView(new ArrayBuffer(length));
	  for (var i = 0; i < length; ++i) {
	    copy.setUint8(i, array[i]);
	  }
	  return copy;
	};
	
	SimplyPebble.onLaunchReason = function(packet) {
	  var reason = LaunchReasonTypes[packet.reason()];
	  var args = packet.args();
	  var remoteTime = packet.time();
	  var isTimezone = packet.isTimezone();
	  if (isTimezone) {
	    state.timeOffset = 0;
	  } else {
	    var time = Date.now() / 1000;
	    var resolution = 60 * 30;
	    state.timeOffset = Math.round((remoteTime - time) / resolution) * resolution;
	  }
	  if (reason === 'timelineAction') {
	    Timeline.emitAction(args);
	  } else {
	    Timeline.emitAction();
	  }
	  if (reason !== 'wakeup') {
	    Wakeup.emitWakeup();
	  }
	};
	
	SimplyPebble.onWakeupSetResult = function(packet) {
	  var id = packet.id();
	  switch (id) {
	    case -8: id = 'range'; break;
	    case -4: id = 'invalidArgument'; break;
	    case -7: id = 'outOfResources'; break;
	    case -3: id = 'internal'; break;
	  }
	  Wakeup.emitSetResult(id, packet.cookie());
	};
	
	SimplyPebble.onAccelData = function(packet) {
	  var samples = packet.samples();
	  var accels = [];
	  AccelData._view = packet._view;
	  AccelData._offset = packet._size;
	  for (var i = 0; i < samples; ++i) {
	    accels.push(AccelData.prop());
	    AccelData._offset += AccelData._size;
	  }
	  if (!packet.peek()) {
	    Accel.emitAccelData(accels);
	  } else {
	    var handlers = accelListeners;
	    accelListeners = [];
	    for (var j = 0, jj = handlers.length; j < jj; ++j) {
	      Accel.emitAccelData(accels, handlers[j]);
	    }
	  }
	};
	
	SimplyPebble.onPacket = function(buffer, offset) {
	  Packet._view = buffer;
	  Packet._offset = offset;
	  var packet = CommandPackets[Packet.type()];
	
	  if (!packet) {
	    console.log('Received unknown packet: ' + JSON.stringify(buffer));
	    return;
	  }
	
	  packet._view = Packet._view;
	  packet._offset = offset;
	  switch (packet) {
	    case LaunchReasonPacket:
	      SimplyPebble.onLaunchReason(packet);
	      break;
	    case WakeupSetResultPacket:
	      SimplyPebble.onWakeupSetResult(packet);
	      break;
	    case WakeupEventPacket:
	      Wakeup.emitWakeup(packet.id(), packet.cookie());
	      break;
	    case WindowHideEventPacket:
	      ImageService.markAllUnloaded();
	      WindowStack.emitHide(packet.id());
	      break;
	    case ClickPacket:
	      Window.emitClick('click', ButtonTypes[packet.button()]);
	      break;
	    case LongClickPacket:
	      Window.emitClick('longClick', ButtonTypes[packet.button()]);
	      break;
	    case AccelDataPacket:
	      SimplyPebble.onAccelData(packet);
	      break;
	    case AccelTapPacket:
	      Accel.emitAccelTap(accelAxes[packet.axis()], packet.direction());
	      break;
	    case MenuGetSectionPacket:
	      Menu.emitSection(packet.section());
	      break;
	    case MenuGetItemPacket:
	      Menu.emitItem(packet.section(), packet.item());
	      break;
	    case MenuSelectPacket:
	      Menu.emitSelect('menuSelect', packet.section(), packet.item());
	      break;
	    case MenuLongSelectPacket:
	      Menu.emitSelect('menuLongSelect', packet.section(), packet.item());
	      break;
	    case MenuSelectionEventPacket:
	      Menu.emitSelect('menuSelection', packet.section(), packet.item());
	      break;
	    case ElementAnimateDonePacket:
	      StageElement.emitAnimateDone(packet.id());
	      break;
	    case VoiceDictationDataPacket:
	      SimplyPebble.onVoiceData(packet);
	      break;
	  }
	};
	
	SimplyPebble.onAppMessage = function(e) {
	  var data = e.payload[0];
	  
	  Packet._view = toArrayBuffer(data);
	
	  var offset = 0;
	  var length = data.length;
	
	  do {
	    SimplyPebble.onPacket(Packet._view, offset);
	
	    Packet._offset = offset;
	    offset += Packet.length();
	  } while (offset !== 0 && offset < length);
	};
	
	module.exports = SimplyPebble;
	


/***/ },
/* 5 */
/***/ function(module, exports) {

	var Color = {};
	
	Color.normalizeString = function(color) {
	  if (typeof color === 'string') {
	    if (color.substr(0, 2) === '0x') {
	      return color.substr(2);
	    } else if (color[0] === '#') {
	      return color.substr(1);
	    }
	  }
	  return color;
	};
	
	Color.rgbUint12To24 = function(color) {
	  return ((color & 0xf00) << 12) | ((color & 0xf0) << 8) | ((color & 0xf) << 4);
	};
	
	Color.toArgbUint32 = function(color) {
	  var argb = color;
	  if (typeof color !== 'number') {
	    color = Color.normalizeString(color.toString());
	    argb = parseInt(color, 16);
	  }
	  if (typeof color === 'string') {
	    var alpha = 0xff000000;
	    if (color.length === 3) {
	      argb = alpha | Color.rgbUint12To14(argb);
	    } else if (color.length === 6) {
	      argb = alpha | argb;
	    }
	  }
	  return argb;
	};
	
	Color.toRgbUint24 = function(color) {
	  return Color.toArgbUint32(color) & 0xffffff;
	};
	
	Color.toArgbUint8 = function(color) {
	  var argb = Color.toArgbUint32(color);
	  return (((argb >> 24) & 0xc0) | ((argb >> 18) & 0x30) |
	          ((argb >> 12) & 0xc) | ((argb >> 6) & 0x3));
	};
	
	Color.toRgbUint8 = function(color) {
	  return Color.toArgbUint8(color) & 0x3f;
	};
	
	module.exports = Color;


/***/ },
/* 6 */
/***/ function(module, exports) {

	/**
	 * struct.js - chainable ArrayBuffer DataView wrapper
	 *
	 * @author Meiguro / http://meiguro.com/
	 * @license MIT
	 */
	
	var capitalize = function(str) {
	  return str.charAt(0).toUpperCase() + str.substr(1);
	};
	
	var struct = function(def) {
	  this._littleEndian = true;
	  this._offset = 0;
	  this._cursor = 0;
	  this._makeAccessors(def);
	  this._view = new DataView(new ArrayBuffer(this._size));
	  this._def = def;
	};
	
	struct.types = {
	  int8: { size: 1 },
	  uint8: { size: 1 },
	  int16: { size: 2 },
	  uint16: { size: 2 },
	  int32: { size: 4 },
	  uint32: { size: 4 },
	  int64: { size: 8 },
	  uint64: { size: 8 },
	  float32: { size: 2 },
	  float64: { size: 4 },
	  cstring: { size: 1, dynamic: true },
	  data: { size: 0, dynamic: true },
	};
	
	var makeDataViewAccessor = function(type, typeName) {
	  var getName = 'get' + capitalize(typeName);
	  var setName = 'set' + capitalize(typeName);
	  type.get = function(offset, little) {
	    this._advance = type.size;
	    return this._view[getName](offset, little);
	  };
	  type.set = function(offset, value, little) {
	    this._advance = type.size;
	    this._view[setName](offset, value, little);
	  };
	};
	
	for (var k in struct.types) {
	  var type = struct.types[k];
	  makeDataViewAccessor(type, k);
	}
	
	struct.types.bool = struct.types.uint8;
	
	struct.types.uint64.get = function(offset, little) {
	  var buffer = this._view;
	  var a = buffer.getUint32(offset, little);
	  var b = buffer.getUint32(offset + 4, little);
	  this._advance = 8;
	  return ((little ? b : a) << 32) + (little ? a : b);
	};
	
	struct.types.uint64.set = function(offset, value, little) {
	  var a = value & 0xFFFFFFFF;
	  var b = (value >> 32) & 0xFFFFFFFF;
	  var buffer = this._view;
	  buffer.setUint32(offset, little ? a : b, little);
	  buffer.setUint32(offset + 4, little ? b : a, little);
	  this._advance = 8;
	};
	
	struct.types.cstring.get = function(offset) {
	  var chars = [];
	  var buffer = this._view;
	  for (var i = offset, ii = buffer.byteLength, j = 0; i < ii && buffer.getUint8(i) !== 0; ++i, ++j) {
	    chars[j] = String.fromCharCode(buffer.getUint8(i));
	  }
	  this._advance = chars.length + 1;
	  return decodeURIComponent(escape(chars.join('')));
	};
	
	struct.types.cstring.set = function(offset, value) {
	  value = unescape(encodeURIComponent(value));
	  this._grow(offset + value.length + 1);
	  var i = offset;
	  var buffer = this._view;
	  for (var j = 0, jj = value.length; j < jj && value[i] !== '\0'; ++i, ++j) {
	    buffer.setUint8(i, value.charCodeAt(j));
	  }
	  buffer.setUint8(i, 0);
	  this._advance = value.length + 1;
	};
	
	struct.types.data.get = function(offset) {
	  var length = this._value;
	  this._cursor = offset;
	  var buffer = this._view;
	  var copy = new DataView(new ArrayBuffer(length));
	  for (var i = 0; i < length; ++i) {
	    copy.setUint8(i, buffer.getUint8(i + offset));
	  }
	  this._advance = length;
	  return copy;
	};
	
	struct.types.data.set = function(offset, value) {
	  var length = value.byteLength || value.length;
	  this._cursor = offset;
	  this._grow(offset + length);
	  var buffer = this._view;
	  if (value instanceof ArrayBuffer) {
	    value = new DataView(value);
	  }
	  for (var i = 0; i < length; ++i) {
	    buffer.setUint8(i + offset, value instanceof DataView ? value.getUint8(i) : value[i]);
	  }
	  this._advance = length;
	};
	
	struct.prototype._grow = function(target) {
	  var buffer = this._view;
	  var size = buffer.byteLength;
	  if (target <= size) { return; }
	  while (size < target) { size *= 2; }
	  var copy = new DataView(new ArrayBuffer(size));
	  for (var i = 0; i < buffer.byteLength; ++i) {
	    copy.setUint8(i, buffer.getUint8(i));
	  }
	  this._view = copy;
	};
	
	struct.prototype._prevField = function(field) {
	  field = field || this._access;
	  var fieldIndex = this._fields.indexOf(field);
	  return this._fields[fieldIndex - 1];
	};
	
	struct.prototype._makeAccessor = function(field) {
	  this[field.name] = function(value) {
	    var type = field.type;
	    
	    if (field.dynamic) {
	      var prevField = this._prevField(field);
	      if (prevField === undefined) {
	        this._cursor = 0;
	      } else if (this._access === field) {
	        this._cursor -= this._advance;
	      } else if (this._access !== prevField) {
	        throw new Error('dynamic field requires sequential access');
	      }
	    } else {
	      this._cursor = field.index;
	    }
	    this._access = field;
	    var result = this;
	    if (arguments.length === 0) {
	      result = type.get.call(this, this._offset + this._cursor, this._littleEndian);
	      this._value = result;
	    } else {
	      if (field.transform) {
	        value = field.transform(value, field);
	      }
	      type.set.call(this, this._offset + this._cursor, value, this._littleEndian);
	      this._value = value;
	    }
	    this._cursor += this._advance;
	    return result;
	  };
	  return this;
	};
	
	struct.prototype._makeMetaAccessor = function(name, transform) {
	  this[name] = function(value, field) {
	    transform.call(this, value, field);
	    return this;
	  };
	};
	
	struct.prototype._makeAccessors = function(def, index, fields, prefix) {
	  index = index || 0;
	  this._fields = ( fields = fields || [] );
	  var prevField = fields[fields.length];
	  for (var i = 0, ii = def.length; i < ii; ++i) {
	    var member = def[i];
	    var type = member[0];
	    if (typeof type === 'string') {
	      type = struct.types[type];
	    }
	    var name = member[1];
	    if (prefix) {
	      name = prefix + capitalize(name);
	    }
	    var transform = member[2];
	    if (type instanceof struct) {
	      if (transform) {
	        this._makeMetaAccessor(name, transform);
	      }
	      this._makeAccessors(type._def, index, fields, name);
	      index = this._size;
	      continue;
	    }
	    var field = {
	      index: index,
	      type: type,
	      name: name,
	      transform: transform,
	      dynamic: type.dynamic || prevField && prevField.dynamic,
	    };
	    this._makeAccessor(field);
	    fields.push(field);
	    index += type.size;
	    prevField = field;
	  }
	  this._size = index;
	  return this;
	};
	
	struct.prototype.prop = function(def) {
	  var fields = this._fields;
	  var i = 0, ii = fields.length, name;
	  if (arguments.length === 0) {
	    var obj = {};
	    for (; i < ii; ++i) {
	      name = fields[i].name;
	      obj[name] = this[name]();
	    }
	    return obj;
	  }
	  for (; i < ii; ++i) {
	    name = fields[i].name;
	    if (name in def) {
	      this[name](def[name]);
	    }
	  }
	  return this;
	};
	
	struct.prototype.view = function(view) {
	  if (arguments.length === 0) {
	    return this._view;
	  }
	  if (view instanceof ArrayBuffer) {
	    view = new DataView(view);
	  }
	  this._view = view;
	  return this;
	};
	
	struct.prototype.offset = function(offset) {
	  if (arguments.length === 0) {
	    return this._offset;
	  }
	  this._offset = offset;
	  return this;
	};
	
	module.exports = struct;
	


/***/ },
/* 7 */
/***/ function(module, exports, __webpack_require__) {

	/*
	 * util2.js by Meiguro - MIT License
	 */
	
	var util2 = (function(){
	
	var util2 = {};
	
	util2.noop = function() {};
	
	util2.count = function(o) {
	  var i = 0;
	  for (var k in o) { ++i; }
	  return i;
	};
	
	util2.copy = function(a, b) {
	  b = b || (a instanceof Array ? [] : {});
	  for (var k in a) { b[k] = a[k]; }
	  return b;
	};
	
	util2.toInteger = function(x) {
	  if (!isNaN(x = parseInt(x))) { return x; }
	};
	
	util2.toNumber = function(x) {
	  if (!isNaN(x = parseFloat(x))) { return x; }
	};
	
	util2.toString = function(x) {
	  return typeof x === 'object' ? JSON.stringify.apply(this, arguments) : '' + x;
	};
	
	util2.toArray = function(x) {
	  if (x instanceof Array) { return x; }
	  if (x[0]) { return util2.copy(x, []); }
	  return [x];
	};
	
	util2.trim = function(s) {
	  return s ? s.toString().trim() : s;
	};
	
	util2.last = function(a) {
	  return a[a.length-1];
	};
	
	util2.inherit = function(child, parent, proto) {
	  child.prototype = Object.create(parent.prototype);
	  child.prototype.constructor = child;
	  if (proto) {
	    util2.copy(proto, child.prototype);
	  }
	  return child.prototype;
	};
	
	var chunkSize = 128;
	
	var randomBytes = function(chunkSize) {
	  var z = [];
	  for (var i = 0; i < chunkSize; ++i) {
	    z[i] = String.fromCharCode(Math.random() * 256);
	  }
	  return z.join('');
	};
	
	util2.randomString = function(regex, size, acc) {
	  if (!size) {
	    return '';
	  }
	  if (typeof regex === 'string') {
	    regex = new RegExp('(?!'+regex+')[\\s\\S]', 'g');
	  }
	  acc = acc || '';
	  var buf = randomBytes(chunkSize);
	  if (buf) {
	    acc += buf.replace(regex, '');
	  }
	  if (acc.length >= size) {
	    return acc.substr(0, size);
	  } else {
	    return util2.randomString(regex, size, acc);
	  }
	};
	
	var varpat = new RegExp("^([\\s\\S]*?)\\$([_a-zA-Z0-9]+)", "m");
	
	util2.format = function(text, table) {
	  var m, z = '';
	  while ((m = text.match(varpat))) {
	    var subtext = m[0], value = table[m[2]];
	    if (typeof value === 'function') { value = value(); }
	    z += value !== undefined ? m[1] + value.toString() : subtext;
	    text = text.substring(subtext.length);
	  }
	  z += text;
	  return z;
	};
	
	if (true) {
	  module.exports = util2;
	}
	
	return util2;
	
	})();


/***/ },
/* 8 */
/***/ function(module, exports, __webpack_require__) {

	var util2 = __webpack_require__(7);
	
	var myutil = {};
	
	myutil.shadow = function(a, b) {
	  for (var k in a) {
	    if (typeof b[k] === 'undefined') {
	      b[k] = a[k];
	    }
	  }
	  return b;
	};
	
	myutil.defun = function(fn, fargs, fbody) {
	  if (!fbody) {
	    fbody = fargs;
	    fargs = [];
	  }
	  return new Function('return function ' + fn + '(' + fargs.join(', ') + ') {' + fbody + '}')();
	};
	
	myutil.slog = function() {
	  var args = [];
	  for (var i = 0, ii = arguments.length; i < ii; ++i) {
	    args[i] = util2.toString(arguments[i]);
	  }
	  return args.join(' ');
	};
	
	myutil.toObject = function(key, value) {
	  if (typeof key === 'object') {
	    return key;
	  }
	  var obj = {};
	  obj[key] = value;
	  return obj;
	};
	
	myutil.flag = function(flags) {
	  if (typeof flags === 'boolean') {
	    return flags;
	  }
	  for (var i = 1, ii = arguments.length; i < ii; ++i) {
	    if (flags[arguments[i]]) {
	      return true;
	    }
	  }
	  return false;
	};
	
	myutil.toFlags = function(flags) {
	  if (typeof flags === 'string') {
	    flags = myutil.toObject(flags, true);
	  } else {
	    flags = !!flags;
	  }
	  return flags;
	};
	
	/**
	 * Returns an absolute path based on a root path and a relative path.
	 */
	myutil.abspath = function(root, path) {
	  if (!path) {
	    path = root;
	  }
	  if (path.match(/^\/\//)) {
	    var m = root && root.match(/^(\w+:)\/\//);
	    path = (m ? m[1] : 'http:') + path;
	  }
	  if (root && !path.match(/^\w+:\/\//)) {
	    path = root + path;
	  }
	  return path;
	};
	
	/**
	 *  Converts a name to a C constant name format of UPPER_CASE_UNDERSCORE.
	 */
	myutil.toCConstantName = function(x) {
	  x = x.toUpperCase();
	  x = x.replace(/[- ]/g, '_');
	  return x;
	};
	
	module.exports = myutil;


/***/ },
/* 9 */
/***/ function(module, exports, __webpack_require__) {

	var Platform = __webpack_require__(10);
	
	module.exports = Platform;


/***/ },
/* 10 */
/***/ function(module, exports) {

	var Platform = module.exports;
	
	Platform.version = function() {
	  if (Pebble.getActiveWatchInfo) {
	    return Pebble.getActiveWatchInfo().platform;
	  } else {
	    return 'aplite';
	  }
	};


/***/ },
/* 11 */
/***/ function(module, exports, __webpack_require__) {

	var Wakeup = __webpack_require__(12);
	
	module.exports = Wakeup;


/***/ },
/* 12 */
/***/ function(module, exports, __webpack_require__) {

	var util2 = __webpack_require__(7);
	var Emitter = __webpack_require__(13);
	var Settings = __webpack_require__(14);
	var simply = __webpack_require__(18);
	
	var Wakeup = function() {
	  this.init();
	};
	
	Wakeup.prototype.cleanupGracePeriod = 60 * 5;
	
	util2.copy(Emitter.prototype, Wakeup.prototype);
	
	Wakeup.prototype.init = function() {
	  this._setRequests = [];
	  this._launchCallbacks = [];
	  this._loadData();
	  this._cleanup();
	};
	
	Wakeup.prototype._loadData = function() {
	  this.state = Settings._loadData(null, 'wakeup', true) || {};
	  this.state.wakeups = this.state.wakeups || {};
	};
	
	Wakeup.prototype._saveData = function() {
	  Settings._saveData(null, 'wakeup', this.state);
	};
	
	Wakeup.prototype._cleanup = function() {
	  var id;
	  var ids = [];
	  for (id in this.state.wakeups) {
	    ids.push(id);
	  }
	  var cleanupTime = Date.now() / 1000 - Wakeup.cleanupGracePeriod;
	  var deleted = false;
	  for (var i = 0, ii = ids.length; i < ii; ++i) {
	    id = ids[i];
	    var wakeup = this.state.wakeups[id];
	    if (wakeup.params.time < cleanupTime) {
	      deleted = true;
	      delete this.state.wakeups[id];
	    }
	  }
	  if (deleted) {
	    this._saveData();
	  }
	};
	
	Wakeup.prototype.get = function(id) {
	  var wakeup = this.state.wakeups[id];
	  if (wakeup) {
	    return {
	      id: wakeup.id,
	      cookie: wakeup.cookie,
	      data: wakeup.data,
	      time: wakeup.params.time,
	      notifyIfMissed: !!wakeup.params.notifyIfMissed,
	    };
	  }
	};
	
	Wakeup.prototype.each = function(callback) {
	  var i = 0;
	  for (var id in this.state.wakeups) {
	    if (callback(this.get(id), i++) === false) {
	      break;
	    }
	  }
	};
	
	Wakeup.prototype.schedule = function(opt, callback) {
	  if (typeof opt !== 'object' || opt instanceof Date) {
	    opt = { time: opt };
	  }
	  var cookie = opt.cookie || 0;
	  this._setRequests.push({
	    params: opt,
	    data: opt.data,
	    callback: callback,
	  });
	  this.launch(function() {
	    simply.impl.wakeupSet(opt.time, cookie, opt.notifyIfMissed);
	  });
	};
	
	Wakeup.prototype.cancel = function(id) {
	  if (id === 'all') {
	    this.state.wakeups = {};
	  } else {
	    delete this.state.wakeups[id];
	  }
	  simply.impl.wakeupCancel(id);
	};
	
	Wakeup.prototype.launch = function(callback) {
	  if (this._launchEvent) {
	    callback(this._launchEvent);
	  } else {
	    this._launchCallbacks.push(callback);
	  }
	};
	
	Wakeup.prototype._makeBaseEvent = function(id, cookie) {
	  var wakeup = this.state.wakeups[id];
	  var e = {
	    id: id,
	    cookie: cookie,
	  };
	  if (wakeup) {
	    e.data = wakeup.data;
	  }
	  return e;
	};
	
	Wakeup.prototype._makeWakeupEvent = function(id, cookie) {
	  var e;
	  if (id !== undefined) {
	    e = this._makeBaseEvent(id, cookie);
	    e.wakeup = true;
	  } else {
	    e = { wakeup: false };
	  }
	  return e;
	};
	
	Wakeup.prototype._setWakeup = function(id, wakeup) {
	  this.state.wakeups[id] = wakeup;
	  this._saveData();
	};
	
	Wakeup.prototype._removeWakeup = function(id) {
	  if (id in this.state.wakeups) {
	    delete this.state.wakeups[id];
	    this._saveData();
	  }
	};
	
	Wakeup.prototype.emitSetResult = function(id, cookie) {
	  var req = this._setRequests.shift();
	  if (!req) {
	    return;
	  }
	  var e;
	  if (typeof id === 'number') {
	    this._setWakeup(id, {
	      id: id,
	      cookie: cookie,
	      data: req.data,
	      params: req.params,
	    });
	    e = this._makeBaseEvent(id, cookie);
	    e.failed = false;
	  } else {
	    e = {
	      error: id,
	      failed: true,
	      cookie: cookie,
	      data: req.data,
	    };
	  }
	  return req.callback(e);
	};
	
	Wakeup.prototype.emitWakeup = function(id, cookie) {
	  var e = this._makeWakeupEvent(id, cookie);
	
	  if (!this._launchEvent) {
	    e.launch = true;
	    if (this._emitWakeupLaunch(e) === false) {
	      return false;
	    }
	  } else {
	    e.launch = false;
	  }
	
	  if (e.wakeup) {
	    this._removeWakeup(id);
	    if (this.emit('wakeup', e) === false) {
	      return false;
	    }
	  }
	};
	
	Wakeup.prototype._emitWakeupLaunch = function(e) {
	  this._launchEvent = e;
	
	  var callbacks = this._launchCallbacks;
	  this._launchCallbacks = [];
	
	  for (var i = 0, ii = callbacks.length; i < ii; ++i) {
	    if (callbacks[i](e) === false) {
	      return false;
	    }
	  }
	};
	
	module.exports = new Wakeup();


/***/ },
/* 13 */
/***/ function(module, exports) {

	
	var Emitter = function() {
	  this._events = {};
	};
	
	Emitter.prototype.wrapHandler = function(handler) {
	  return handler;
	};
	
	Emitter.prototype._on = function(type, subtype, handler) {
	  var typeMap = this._events || ( this._events = {} );
	  var subtypeMap = typeMap[type] || ( typeMap[type] = {} );
	  (subtypeMap[subtype] || ( subtypeMap[subtype] = [] )).push({
	    id: handler,
	    handler: this.wrapHandler(handler),
	  });
	};
	
	Emitter.prototype._off = function(type, subtype, handler) {
	  if (!type) {
	    this._events = {};
	    return;
	  }
	  var typeMap = this._events;
	  if (!handler && subtype === 'all') {
	    delete typeMap[type];
	    return;
	  }
	  var subtypeMap = typeMap[type];
	  if (!subtypeMap) { return; }
	  if (!handler) {
	    delete subtypeMap[subtype];
	    return;
	  }
	  var handlers = subtypeMap[subtype];
	  if (!handlers) { return; }
	  var index = -1;
	  for (var i = 0, ii = handlers.length; i < ii; ++i) {
	    if (handlers[i].id === handler) {
	      index = i;
	      break;
	    }
	  }
	  if (index === -1) { return; }
	  handlers.splice(index, 1);
	};
	
	Emitter.prototype.on = function(type, subtype, handler) {
	  if (!handler) {
	    handler = subtype;
	    subtype = 'all';
	  }
	  this._on(type, subtype, handler);
	  if (Emitter.onAddHandler) {
	    Emitter.onAddHandler(type, subtype, handler);
	  }
	  if (this.onAddHandler) {
	    this.onAddHandler(type, subtype, handler);
	  }
	};
	
	Emitter.prototype.off = function(type, subtype, handler) {
	  if (!handler) {
	    handler = subtype;
	    subtype = 'all';
	  }
	  this._off(type, subtype, handler);
	  if (Emitter.onRemoveHandler) {
	    Emitter.onRemoveHandler(type, subtype, handler);
	  }
	  if (this.onRemoveHandler) {
	    this.onRemoveHandler(type, subtype, handler);
	  }
	};
	
	Emitter.prototype.listeners = function(type, subtype) {
	  if (!subtype) {
	    subtype = 'all';
	  }
	  var typeMap = this._events;
	  if (!typeMap) { return; }
	  var subtypeMap = typeMap[type];
	  if (!subtypeMap) { return; }
	  return subtypeMap[subtype];
	};
	
	Emitter.prototype.listenerCount = function(type, subtype) {
	  var listeners = this.listeners(type, subtype);
	  return listeners ? listeners.length : 0;
	};
	
	Emitter.prototype.forEachListener = function(type, subtype, callback) {
	  var typeMap = this._events;
	  if (!typeMap) { return; }
	  var subtypeMap;
	  if (typeof callback === 'function') {
	    var handlers = this.listeners(type, subtype);
	    if (!handlers) { return; }
	    for (var i = 0, ii = handlers.length; i < ii; ++i) {
	      callback.call(this, type, subtype, handlers[i]);
	    }
	  } else if (typeof subtype === 'function') {
	    callback = subtype;
	    subtypeMap = typeMap[type];
	    if (!subtypeMap) { return; }
	    for (subtype in subtypeMap) {
	      this.forEachListener(type, subtype, callback);
	    }
	  } else if (typeof type === 'function') {
	    callback = type;
	    for (type in typeMap) {
	      this.forEachListener(type, callback);
	    }
	  }
	};
	
	var emitToHandlers = function(type, handlers, e) {
	  if (!handlers) { return; }
	  for (var i = 0, ii = handlers.length; i < ii; ++i) {
	    var handler = handlers[i].handler;
	    if (handler.call(this, e, type, i) === false) {
	      return false;
	    }
	  }
	  return true;
	};
	
	Emitter.prototype.emit = function(type, subtype, e) {
	  if (!e) {
	    e = subtype;
	    subtype = null;
	  }
	  e.type = type;
	  if (subtype) {
	    e.subtype = subtype;
	  }
	  var typeMap = this._events;
	  if (!typeMap) { return; }
	  var subtypeMap = typeMap[type];
	  if (!subtypeMap) { return; }
	  var hadSubtype = emitToHandlers.call(this, type, subtypeMap[subtype], e);
	  if (hadSubtype === false) {
	    return false;
	  }
	  var hadAll = emitToHandlers.call(this, type, subtypeMap.all, e);
	  if (hadAll === false) {
	    return false;
	  }
	  if (hadSubtype || hadAll) {
	    return true;
	  }
	};
	
	module.exports = Emitter;


/***/ },
/* 14 */
/***/ function(module, exports, __webpack_require__) {

	var Settings = __webpack_require__(15);
	
	Settings.init();
	
	module.exports = Settings;


/***/ },
/* 15 */
/***/ function(module, exports, __webpack_require__) {

	var util2 = __webpack_require__(7);
	var myutil = __webpack_require__(8);
	var ajax = __webpack_require__(16);
	var appinfo = __webpack_require__(17);
	
	var Settings = module.exports;
	
	var parseJson = function(data) {
	  try {
	    return JSON.parse(data);
	  } catch (e) {
	    console.warn('Invalid JSON in localStorage: ' + (e.message || '') + '\n\t' + data);
	  }
	};
	
	var state;
	
	Settings.settingsUrl = 'http://meiguro.com/simplyjs/settings.html';
	
	Settings.init = function() {
	  Settings.reset();
	
	  Settings._loadOptions();
	  Settings._loadData();
	
	  // Register listeners for the Settings
	  Pebble.addEventListener('showConfiguration', Settings.onOpenConfig);
	  Pebble.addEventListener('webviewclosed', Settings.onCloseConfig);
	};
	
	Settings.reset = function() {
	  state = Settings.state = {
	    options: {},
	    data: {},
	    listeners: [],
	    ignoreCancelled: 0,
	  };
	};
	
	var toHttpUrl = function(url) {
	  if (typeof url === 'string' && url.length && !url.match(/^(\w+:)?\/\//)) {
	    url = 'http://' + url;
	  }
	  return url;
	};
	
	Settings.mainScriptUrl = function(scriptUrl) {
	  scriptUrl = toHttpUrl(scriptUrl);
	  if (scriptUrl) {
	    localStorage.setItem('mainJsUrl', scriptUrl);
	  } else {
	    scriptUrl = localStorage.getItem('mainJsUrl');
	  }
	  return scriptUrl;
	};
	
	Settings.getBaseOptions = function() {
	  return {
	    scriptUrl: Settings.mainScriptUrl(),
	  };
	};
	
	Settings._getDataKey = function(path, field) {
	  path = path || appinfo.pebble.uuid;
	  return field + ':' + path;
	};
	
	Settings._saveData = function(path, field, data) {
	  field = field || 'data';
	  if (data) {
	    state[field] = data;
	  } else {
	    data = state[field];
	  }
	  var key = Settings._getDataKey(path, field);
	  localStorage.setItem(key, JSON.stringify(data));
	};
	
	Settings._loadData = function(path, field, nocache) {
	  field = field || 'data';
	  state[field] = {};
	  var key = Settings._getDataKey(path, field);
	  var value = localStorage.getItem(key);
	  var data = parseJson(value);
	  if (value && typeof data === 'undefined') {
	    // There was an issue loading the data, remove it
	    localStorage.removeItem(key);
	  }
	  if (!nocache && typeof data === 'object' && data !== null) {
	    state[field] = data;
	  }
	  return data;
	};
	
	Settings._saveOptions = function(path) {
	  Settings._saveData(path, 'options');
	};
	
	Settings._loadOptions = function(path) {
	  Settings._loadData(path, 'options');
	};
	
	var makeDataAccessor = function(type, path) {
	  return function(field, value) {
	    var data = state[type];
	    if (arguments.length === 0) {
	      return data;
	    }
	    if (arguments.length === 1 && typeof field !== 'object') {
	      return data[field];
	    }
	    if (typeof field !== 'object' && value === undefined || value === null) {
	      delete data[field];
	    }
	    var def = myutil.toObject(field, value);
	    util2.copy(def, data);
	    Settings._saveData(path, type);
	  };
	};
	
	Settings.option = makeDataAccessor('options');
	
	Settings.data = makeDataAccessor('data');
	
	Settings.config = function(opt, open, close) {
	  if (typeof opt === 'string') {
	    opt = { url: opt };
	  }
	  opt.url = toHttpUrl(opt.url);
	  if (close === undefined) {
	    close = open;
	    open = util2.noop;
	  }
	  var listener = {
	    params: opt,
	    open: open,
	    close: close,
	  };
	  state.listeners.push(listener);
	};
	
	Settings.onOpenConfig = function(e) {
	  var options;
	  var url;
	  var listener = util2.last(state.listeners);
	  if (listener) {
	    e = {
	      originalEvent: e,
	      options: state.options,
	      url: listener.params.url,
	    };
	    var result;
	    if (listener.open) {
	      result = listener.open(e);
	      if (result === false) {
	        return;
	      }
	    }
	    url = typeof result === 'string' ? result : listener.params.url;
	    options = state.options;
	  } else {
	    url = Settings.settingsUrl;
	    options = Settings.getBaseOptions();
	    return;
	  }
	  if (listener.params.hash !== false) {
	    url += '#' + encodeURIComponent(JSON.stringify(options));
	  }
	  Pebble.openURL(url);
	};
	
	Settings.onCloseConfig = function(e) {
	  // Work around for PebbleKit JS Android
	  // On Android, an extra cancelled event occurs after a normal close
	  if (e.response !== 'CANCELLED') {
	    state.ignoreCancelled++;
	  } else if (state.ignoreCancelled > 0) {
	    state.ignoreCancelled--;
	    return;
	  }
	  var listener = util2.last(state.listeners);
	  var options = {};
	  var format;
	  if (e.response) {
	    options = parseJson(decodeURIComponent(e.response));
	    if (typeof options === 'object' && options !== null) {
	      format = 'json';
	    }
	    if (!format && e.response.match(/(&|=)/)) {
	      options = ajax.deformify(e.response);
	      if (util2.count(options) > 0) {
	        format = 'form';
	      }
	    }
	  }
	  if (listener) {
	    e = {
	      originalEvent: e,
	      response: e.response,
	      originalOptions: state.options,
	      options: options,
	      url: listener.params.url,
	      failed: !format,
	      format: format,
	    };
	    if (format && listener.params.autoSave !== false) {
	      e.originalOptions = util2.copy(state.options);
	      util2.copy(options, state.options);
	      Settings._saveOptions();
	    }
	    if (listener.close) {
	      return listener.close(e);
	    }
	  }
	};


/***/ },
/* 16 */
/***/ function(module, exports, __webpack_require__) {

	/*
	 * ajax.js by Meiguro - MIT License
	 */
	
	var ajax = (function(){
	
	var formify = function(data) {
	  var params = [], i = 0;
	  for (var name in data) {
	    params[i++] = encodeURIComponent(name) + '=' + encodeURIComponent(data[name]);
	  }
	  return params.join('&');
	};
	
	var deformify = function(form) {
	  var params = {};
	  form.replace(/(?:([^=&]*)=?([^&]*)?)(?:&|$)/g, function(_, name, value) {
	    if (name) {
	      params[name] = value || true;
	    }
	    return _;
	  });
	  return params;
	};
	
	/**
	 * ajax options. There are various properties with url being the only required property.
	 * @typedef ajaxOptions
	 * @property {string} [method='get'] - The HTTP method to use: 'get', 'post', 'put', 'delete', 'options',
	 *    or any other standard method supported by the running environment.
	 * @property {string} url - The URL to make the ajax request to. e.g. 'http://www.example.com?name=value'
	 * @property {string} [type] - The content and response format. By default, the content format
	 *    is 'form' and response format is separately 'text'. Specifying 'json' will have ajax send `data`
	 *    as json as well as parse the response as json. Specifying 'text' allows you to send custom
	 *    formatted content and parse the raw response text. If you wish to send form encoded data and
	 *    parse json, leave `type` undefined and use `JSON.decode` to parse the response data.
	 * @property {object} [data] - The request body, mainly to be used in combination with 'post' or 'put'.
	 *    e.g. { username: 'guest' }
	 * @property {object} headers - Custom HTTP headers. Specify additional headers.
	 *    e.g. { 'x-extra': 'Extra Header' }
	 * @property {boolean} [async=true] - Whether the request will be asynchronous.
	 *    Specify false for a blocking, synchronous request.
	 * @property {boolean} [cache=true] - Whether the result may be cached.
	 *    Specify false to use the internal cache buster which appends the URL with the query parameter _
	 *    set to the current time in milliseconds.
	 */
	
	/**
	 * ajax allows you to make various http or https requests.
	 * See {@link ajaxOptions}
	 * @global
	 * @param {ajaxOptions} opt - Options specifying the type of ajax request to make.
	 * @param {function} success - The success handler that is called when a HTTP 200 response is given.
	 * @param {function} failure - The failure handler when the HTTP request fails or is not 200.
	 */
	var ajax = function(opt, success, failure) {
	  if (typeof opt === 'string') {
	    opt = { url: opt };
	  }
	  var method = opt.method || 'GET';
	  var url = opt.url;
	  //console.log(method + ' ' + url);
	
	  var onHandler = ajax.onHandler;
	  if (onHandler) {
	    if (success) { success = onHandler('success', success); }
	    if (failure) { failure = onHandler('failure', failure); }
	  }
	
	  if (opt.cache === false) {
	    var appendSymbol = url.indexOf('?') === -1 ? '?' : '&';
	    url += appendSymbol + '_=' + Date.now();
	  }
	
	  var req = new XMLHttpRequest();
	  req.open(method.toUpperCase(), url, opt.async !== false);
	
	  var headers = opt.headers;
	  if (headers) {
	    for (var name in headers) {
	      req.setRequestHeader(name, headers[name]);
	    }
	  }
	
	  var data = opt.data;
	  if (data) {
	    if (opt.type === 'json') {
	      req.setRequestHeader('Content-Type', 'application/json');
	      data = JSON.stringify(opt.data);
	    } else if (opt.type === 'xml') {
	      req.setRequestHeader('Content-Type', 'text/xml');
	    } else if (opt.type !== 'text') {
	      req.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
	      data = formify(opt.data);
	    }
	  }
	
	  var ready = false;
	  req.onreadystatechange = function(e) {
	    if (req.readyState === 4 && !ready) {
	      ready = true;
	      var body = req.responseText;
	      var okay = req.status >= 200 && req.status < 300 || req.status === 304;
	
	      try {
	        if (opt.type === 'json') {
	          body = JSON.parse(body);
	        } else if (opt.type === 'form') {
	          body = deformify(body);
	        }
	      } catch (err) {
	        okay = false;
	      }
	      var callback = okay ? success : failure;
	      if (callback) {
	        callback(body, req.status, req);
	      }
	    }
	  };
	
	  req.send(data);
	};
	
	ajax.formify = formify;
	ajax.deformify = deformify;
	
	if (true) {
	  module.exports = ajax;
	} else {
	  window.ajax = ajax;
	}
	
	return ajax;
	
	})();


/***/ },
/* 17 */
/***/ function(module, exports) {

	module.exports = {
		"name": "GoPro",
		"author": "Konrad Iturbe",
		"version": "1.0.0",
		"keywords": [
			"pebble-app"
		],
		"private": true,
		"dependencies": {
			"pebble-clay": "^1.0.4",
			"pebblejs": "^1.0.0"
		},
		"pebble": {
			"displayName": "GoPro",
			"uuid": "f9963dc0-430a-4ee7-8814-ee4ab4bd9206",
			"sdkVersion": "3",
			"enableMultiJS": true,
			"targetPlatforms": [
				"aplite",
				"basalt",
				"chalk",
				"diorite"
			],
			"watchapp": {
				"watchface": false
			},
			"messageKeys": [
				"MESSAGE_KEY_simplemode",
				"MESSAGE_KEY_refreshrate"
			],
			"resources": {
				"media": [
					{
						"file": "images/app_icon.png",
						"menuIcon": true,
						"name": "IMAGES_APP_ICON",
						"type": "bitmap"
					},
					{
						"file": "images/video_icon.png",
						"name": "ICON_VIDEO_SIMPLE",
						"type": "bitmap"
					},
					{
						"file": "images/settings_icon.png",
						"name": "ICON_SETTINGS",
						"type": "bitmap"
					},
					{
						"file": "images/tlvideo_icon.png",
						"name": "ICON_VIDEO_TL",
						"type": "bitmap"
					},
					{
						"file": "images/looping_icon.png",
						"name": "ICON_VIDEO_LOOPING",
						"type": "bitmap"
					},
					{
						"file": "images/dual_icon.png",
						"name": "ICON_VIDEO_DUAL",
						"type": "bitmap"
					},
					{
						"file": "images/photo_icon.png",
						"name": "ICON_PHOTO_SIMPLE",
						"type": "bitmap"
					},
					{
						"file": "images/continuous_icon.png",
						"name": "ICON_PHOTO_CONTINUOUS",
						"type": "bitmap"
					},
					{
						"file": "images/nightphoto_icon.png",
						"name": "ICON_PHOTO_NIGHTPHOTO",
						"type": "bitmap"
					},
					{
						"file": "images/timelapse_icon.png",
						"name": "ICON_MS_TIMELAPSE",
						"type": "bitmap"
					},
					{
						"file": "images/burst_icon.png",
						"name": "ICON_MS_BURST",
						"type": "bitmap"
					},
					{
						"file": "images/nightlapse_icon.png",
						"name": "ICON_MS_NL",
						"type": "bitmap"
					},
					{
						"file": "images/logo_splash.png",
						"name": "IMAGE_LOGO_SPLASH",
						"type": "bitmap"
					},
					{
						"file": "images/tile_splash.png",
						"name": "IMAGE_TILE_SPLASH",
						"type": "bitmap"
					},
					{
						"file": "fonts/UbuntuMono-Regular.ttf",
						"name": "MONO_FONT_14",
						"type": "font"
					}
				]
			}
		}
	};

/***/ },
/* 18 */
/***/ function(module, exports) {

	/**
	 * This file provides an easy way to switch the actual implementation used by all the
	 * ui objects.
	 *
	 * simply.impl provides the actual communication layer to the hardware.
	 */
	
	var simply = {};
	
	// Override this with the actual implementation you want to use.
	simply.impl = undefined;
	
	module.exports = simply;


/***/ },
/* 19 */
/***/ function(module, exports, __webpack_require__) {

	var Timeline = __webpack_require__(20);
	
	Timeline.init();
	
	module.exports = Timeline;


/***/ },
/* 20 */
/***/ function(module, exports) {

	var Timeline = module.exports;
	
	Timeline.init = function() {
	  this._launchCallbacks = [];
	};
	
	Timeline.launch = function(callback) {
	  if (this._launchEvent) {
	    callback(this._launchEvent);
	  } else {
	    this._launchCallbacks.push(callback);
	  }
	};
	
	Timeline.emitAction = function(args) {
	  var e;
	  if (args !== undefined) {
	    e = {
	      action: true,
	      launchCode: args,
	    };
	  } else {
	    e = {
	      action: false,
	    };
	  }
	
	  this._launchEvent = e;
	
	  var callbacks = this._launchCallbacks;
	  this._launchCallbacks = [];
	  for (var i = 0, ii = callbacks.length; i < ii; ++i) {
	    if (callbacks[i](e) === false) {
	      return false;
	    }
	  }
	};


/***/ },
/* 21 */
/***/ function(module, exports, __webpack_require__) {

	var myutil = __webpack_require__(8);
	var appinfo = __webpack_require__(17);
	
	var resources = (function() {
	  var resources = appinfo.pebble.resources;
	  return resources && resources.media || [];
	})();
	
	var Resource = {};
	
	Resource.items = resources;
	
	Resource.getId = function(opt) {
	  var path = opt;
	  if (typeof opt === 'object') {
	    path = opt.url;
	  }
	  path = path.replace(/#.*/, '');
	  var cname = myutil.toCConstantName(path);
	  for (var i = 0, ii = resources.length; i < ii; ++i) {
	    var res = resources[i];
	    if (res.name === cname || res.file === path) {
	      return i + 1;
	    }
	  }
	};
	
	module.exports = Resource;


/***/ },
/* 22 */
/***/ function(module, exports, __webpack_require__) {

	var Emitter = __webpack_require__(13);
	
	var Accel = new Emitter();
	
	module.exports = Accel;
	
	var WindowStack = __webpack_require__(23);
	var Window = __webpack_require__(24);
	var simply = __webpack_require__(18);
	
	var state;
	
	Accel.init = function() {
	  if (state) {
	    Accel.off();
	  }
	
	  state = Accel.state = {
	    rate: 100,
	    samples: 25,
	    subscribe: false,
	    subscribeMode: 'auto',
	    listeners: [],
	  };
	};
	
	Accel.onAddHandler = function(type, subtype) {
	  if (type === 'data') {
	    Accel.autoSubscribe();
	  }
	};
	
	Accel.onRemoveHandler = function(type, subtype) {
	  if (!type || type === 'accelData') {
	    Accel.autoSubscribe();
	  }
	};
	
	var accelDataListenerCount = function() {
	  var count = Accel.listenerCount('data');
	  var wind = WindowStack.top();
	  if (wind) {
	    count += wind.listenerCount('accelData');
	  }
	  return count;
	};
	
	Accel.autoSubscribe = function() {
	  if (state.subscribeMode !== 'auto') { return; }
	  var subscribe = (accelDataListenerCount() > 0);
	  if (subscribe !== state.subscribe) {
	    return Accel.config(subscribe, true);
	  }
	};
	
	/**
	 * The accelerometer configuration parameter for {@link simply.accelConfig}.
	 * The accelerometer data stream is useful for applications such as gesture recognition when accelTap is too limited.
	 * However, keep in mind that smaller batch sample sizes and faster rates will drastically impact the battery life of both the Pebble and phone because of the taxing use of the processors and Bluetooth modules.
	 * @typedef {object} simply.accelConf
	 * @property {number} [rate] - The rate accelerometer data points are generated in hertz. Valid values are 10, 25, 50, and 100. Initializes as 100.
	 * @property {number} [samples] - The number of accelerometer data points to accumulate in a batch before calling the event handler. Valid values are 1 to 25 inclusive. Initializes as 25.
	 * @property {boolean} [subscribe] - Whether to subscribe to accelerometer data events. {@link simply.accelPeek} cannot be used when subscribed. Simply.js will automatically (un)subscribe for you depending on the amount of accelData handlers registered.
	 */
	
	/**
	 * Changes the accelerometer configuration.
	 * See {@link simply.accelConfig}
	 * @memberOf simply
	 * @param {simply.accelConfig} accelConf - An object defining the accelerometer configuration.
	 */
	Accel.config = function(opt, auto) {
	  if (arguments.length === 0) {
	    return {
	      rate: state.rate,
	      samples: state.samples,
	      subscribe: state.subscribe,
	    };
	  } else if (typeof opt === 'boolean') {
	    opt = { subscribe: opt };
	  }
	  for (var k in opt) {
	    if (k === 'subscribe') {
	      state.subscribeMode = opt[k] && !auto ? 'manual' : 'auto';
	    }
	    state[k] = opt[k];
	  }
	  return simply.impl.accelConfig(Accel.config());
	};
	
	/**
	 * Peeks at the current accelerometer values.
	 * @memberOf simply
	 * @param {simply.eventHandler} callback - A callback function that will be provided the accel data point as an event.
	 */
	Accel.peek = function(callback) {
	  if (state.subscribe) {
	    throw new Error('Cannot use accelPeek when listening to accelData events');
	  }
	  return simply.impl.accelPeek.apply(this, arguments);
	};
	
	/**
	 * Simply.js accel tap event.
	 * Use the event type 'accelTap' to subscribe to these events.
	 * @typedef simply.accelTapEvent
	 * @property {string} axis - The axis the tap event occurred on: 'x', 'y', or 'z'. This is also the event subtype.
	 * @property {number} direction - The direction of the tap along the axis: 1 or -1.
	 */
	
	Accel.emitAccelTap = function(axis, direction) {
	  var e = {
	    axis: axis,
	    direction: direction,
	  };
	  if (Window.emit('accelTap', axis, e) === false) {
	    return false;
	  }
	  Accel.emit('tap', axis, e);
	};
	
	/**
	 * Simply.js accel data point.
	 * Typical values for gravity is around -1000 on the z axis.
	 * @typedef simply.accelPoint
	 * @property {number} x - The acceleration across the x-axis.
	 * @property {number} y - The acceleration across the y-axis.
	 * @property {number} z - The acceleration across the z-axis.
	 * @property {boolean} vibe - Whether the watch was vibrating when measuring this point.
	 * @property {number} time - The amount of ticks in millisecond resolution when measuring this point.
	 */
	
	/**
	 * Simply.js accel data event.
	 * Use the event type 'accelData' to subscribe to these events.
	 * @typedef simply.accelDataEvent
	 * @property {number} samples - The number of accelerometer samples in this event.
	 * @property {simply.accelPoint} accel - The first accel in the batch. This is provided for convenience.
	 * @property {simply.accelPoint[]} accels - The accelerometer samples in an array.
	 */
	
	Accel.emitAccelData = function(accels, callback) {
	  var e = {
	    samples: accels.length,
	    accel: accels[0],
	    accels: accels,
	  };
	  if (callback) {
	    return callback(e);
	  }
	  if (Window.emit('accelData', null, e) === false) {
	    return false;
	  }
	  Accel.emit('data', e);
	};
	
	Accel.init();


/***/ },
/* 23 */
/***/ function(module, exports, __webpack_require__) {

	var util2 = __webpack_require__(7);
	var myutil = __webpack_require__(8);
	var Emitter = __webpack_require__(13);
	var simply = __webpack_require__(18);
	
	var WindowStack = function() {
	  this.init();
	};
	
	util2.copy(Emitter.prototype, WindowStack.prototype);
	
	WindowStack.prototype.init = function() {
	  this.off();
	  this._items = [];
	
	};
	
	WindowStack.prototype.top = function() {
	  return util2.last(this._items);
	};
	
	WindowStack.prototype._emitShow = function(item) {
	  item.forEachListener(item.onAddHandler);
	  item._emitShow('show');
	
	  var e = {
	    window: item
	  };
	  this.emit('show', e);
	};
	
	WindowStack.prototype._emitHide = function(item) {
	  var e = {
	    window: item
	  };
	  this.emit('hide', e);
	
	  item._emitShow('hide');
	  item.forEachListener(item.onRemoveHandler);
	};
	
	WindowStack.prototype._show = function(item, pushing) {
	  if (!item) { return; }
	  item._show(pushing);
	  this._emitShow(item);
	};
	
	WindowStack.prototype._hide = function(item, broadcast) {
	  if (!item) { return; }
	  this._emitHide(item);
	  item._hide(broadcast);
	};
	
	WindowStack.prototype.at = function(index) {
	  return this._items[index];
	};
	
	WindowStack.prototype.index = function(item) {
	  return this._items.indexOf(item);
	};
	
	WindowStack.prototype.push = function(item) {
	  if (item === this.top()) { return; }
	  this.remove(item);
	  var prevTop = this.top();
	  this._items.push(item);
	  this._show(item, true);
	  this._hide(prevTop, false);
	  console.log('(+) ' + item._toString() + ' : ' + this._toString());
	};
	
	WindowStack.prototype.pop = function(broadcast) {
	  return this.remove(this.top(), broadcast);
	};
	
	WindowStack.prototype.remove = function(item, broadcast) {
	  if (typeof item === 'number') {
	    item = this.get(item);
	  }
	  if (!item) { return; }
	  var index = this.index(item);
	  if (index === -1) { return item; }
	  var wasTop = (item === this.top());
	  this._items.splice(index, 1);
	  if (wasTop) {
	    var top = this.top();
	    this._show(top);
	    this._hide(item, top && top.constructor === item.constructor ? false : broadcast);
	  }
	  console.log('(-) ' + item._toString() + ' : ' + this._toString());
	  return item;
	};
	
	WindowStack.prototype.get = function(windowId) {
	  var items = this._items;
	  for (var i = 0, ii = items.length; i < ii; ++i) {
	    var wind = items[i];
	    if (wind._id() === windowId) {
	      return wind;
	    }
	  }
	};
	
	WindowStack.prototype.each = function(callback) {
	  var items = this._items;
	  for (var i = 0, ii = items.length; i < ii; ++i) {
	    if (callback(items[i], i) === false) {
	      break;
	    }
	  }
	};
	
	WindowStack.prototype.length = function() {
	  return this._items.length;
	};
	
	WindowStack.prototype.emitHide = function(windowId) {
	  var wind = this.get(windowId);
	  if (wind !== this.top()) { return; }
	  this.remove(wind);
	};
	
	WindowStack.prototype._toString = function() {
	  return this._items.map(function(x){ return x._toString(); }).join(',');
	};
	
	module.exports = new WindowStack();


/***/ },
/* 24 */
/***/ function(module, exports, __webpack_require__) {

	var util2 = __webpack_require__(7);
	var myutil = __webpack_require__(8);
	var Emitter = __webpack_require__(13);
	var Vector2 = __webpack_require__(25);
	var Feature = __webpack_require__(26);
	var Accel = __webpack_require__(22);
	var WindowStack = __webpack_require__(23);
	var Propable = __webpack_require__(27);
	var Stage = __webpack_require__(28);
	var simply = __webpack_require__(18);
	
	var buttons = [
	  'back',
	  'up',
	  'select',
	  'down',
	];
	
	var configProps = [
	  'fullscreen',
	  'style',
	  'scrollable',
	  'paging',
	  'backgroundColor',
	];
	
	var statusProps = [
	  'status',
	  'separator',
	  'color',
	  'backgroundColor',
	];
	
	var actionProps = [
	  'action',
	  'up',
	  'select',
	  'back',
	  'backgroundColor',
	];
	
	var accessorProps = configProps;
	
	var nestedProps = [
	  'action',
	  'status',
	];
	
	var defaults = {
	  status: false,
	  backgroundColor: 'black',
	  scrollable: false,
	  paging: Feature.round(true, false),
	};
	
	var nextId = 1;
	
	var checkProps = function(def) {
	  if (!def) return;
	  if ('fullscreen' in def) {
	    console.warn('`fullscreen` has been deprecated by `status` which allows settings\n\t' +
	                 'its color and separator in a similar manner to the `action` property.\n\t' +
	                 'Remove usages of `fullscreen` to enable usage of `status`.', 2);
	  }
	};
	
	var Window = function(windowDef) {
	  checkProps(windowDef);
	  this.state = myutil.shadow(defaults, windowDef || {});
	  this.state.id = nextId++;
	  this._buttonInit();
	  this._items = [];
	  this._dynamic = true;
	  this._size = new Vector2();
	  this.size(); // calculate and set the size
	};
	
	Window._codeName = 'window';
	
	util2.copy(Emitter.prototype, Window.prototype);
	
	util2.copy(Propable.prototype, Window.prototype);
	
	util2.copy(Stage.prototype, Window.prototype);
	
	Propable.makeAccessors(accessorProps, Window.prototype);
	
	Propable.makeNestedAccessors(nestedProps, Window.prototype);
	
	Window.prototype._id = function() {
	  return this.state.id;
	};
	
	Window.prototype._prop = function(def, clear, pushing) {
	  checkProps(def);
	  Stage.prototype._prop.call(this, def, clear, pushing);
	};
	
	Window.prototype._hide = function(broadcast) {
	  if (broadcast === false) { return; }
	  simply.impl.windowHide(this._id());
	};
	
	Window.prototype.hide = function() {
	  WindowStack.remove(this, true);
	  return this;
	};
	
	Window.prototype._show = function(pushing) {
	  this._prop(this.state, true, pushing || false);
	  this._buttonConfig({});
	  if (this._dynamic) {
	    Stage.prototype._show.call(this, pushing);
	  }
	};
	
	Window.prototype.show = function() {
	  WindowStack.push(this);
	  return this;
	};
	
	Window.prototype._insert = function() {
	  if (this._dynamic) {
	    Stage.prototype._insert.apply(this, arguments);
	  }
	};
	
	Window.prototype._remove = function() {
	  if (this._dynamic) {
	    Stage.prototype._remove.apply(this, arguments);
	  }
	};
	
	Window.prototype._clearStatus = function() {
	  statusProps.forEach(Propable.unset.bind(this.state.status));
	};
	
	Window.prototype._clearAction = function() {
	  actionProps.forEach(Propable.unset.bind(this.state.action));
	};
	
	Window.prototype._clear = function(flags_) {
	  var flags = myutil.toFlags(flags_);
	  if (myutil.flag(flags, 'action')) {
	    this._clearAction();
	  }
	  if (myutil.flag(flags, 'status')) {
	    this._clearStatus();
	  }
	  if (flags_ === true || flags_ === undefined) {
	    Propable.prototype._clear.call(this);
	  }
	};
	
	Window.prototype._action = function(actionDef) {
	  if (this === WindowStack.top()) {
	    simply.impl.windowActionBar(actionDef);
	  }
	};
	
	Window.prototype._status = function(statusDef) {
	  if (this === WindowStack.top()) {
	    simply.impl.windowStatusBar(statusDef);
	  }
	};
	
	var isBackEvent = function(type, subtype) {
	  return ((type === 'click' || type === 'longClick') && subtype === 'back');
	};
	
	Window.prototype.onAddHandler = function(type, subtype) {
	  if (isBackEvent(type, subtype)) {
	    this._buttonAutoConfig();
	  }
	  if (type === 'accelData') {
	    Accel.autoSubscribe();
	  }
	};
	
	Window.prototype.onRemoveHandler = function(type, subtype) {
	  if (!type || isBackEvent(type, subtype)) {
	    this._buttonAutoConfig();
	  }
	  if (!type || type === 'accelData') {
	    Accel.autoSubscribe();
	  }
	};
	
	Window.prototype._buttonInit = function() {
	  this._button = {
	    config: {},
	    configMode: 'auto',
	  };
	  for (var i = 0, ii = buttons.length; i < ii; i++) {
	    var button = buttons[i];
	    if (button !== 'back') {
	      this._button.config[buttons[i]] = true;
	    }
	  }
	};
	
	/**
	 * The button configuration parameter for {@link simply.buttonConfig}.
	 * The button configuration allows you to enable to disable buttons without having to register or unregister handlers if that is your preferred style.
	 * You may also enable the back button manually as an alternative to registering a click handler with 'back' as its subtype using {@link simply.on}.
	 * @typedef {object} simply.buttonConf
	 * @property {boolean} [back] - Whether to enable the back button. Initializes as false. Simply.js can also automatically register this for you based on the amount of click handlers with subtype 'back'.
	 * @property {boolean} [up] - Whether to enable the up button. Initializes as true. Note that this is disabled when using {@link simply.scrollable}.
	 * @property {boolean} [select] - Whether to enable the select button. Initializes as true.
	 * @property {boolean} [down] - Whether to enable the down button. Initializes as true. Note that this is disabled when using {@link simply.scrollable}.
	 */
	
	/**
	 * Changes the button configuration.
	 * See {@link simply.buttonConfig}
	 * @memberOf simply
	 * @param {simply.buttonConfig} buttonConf - An object defining the button configuration.
	 */
	Window.prototype._buttonConfig = function(buttonConf, auto) {
	  if (buttonConf === undefined) {
	    var config = {};
	    for (var i = 0, ii = buttons.length; i < ii; ++i) {
	      var name = buttons[i];
	      config[name] = this._button.config[name];
	    }
	    return config;
	  }
	  for (var k in buttonConf) {
	    if (buttons.indexOf(k) !== -1) {
	      if (k === 'back') {
	        this._button.configMode = buttonConf.back && !auto ? 'manual' : 'auto';
	      }
	      this._button.config[k] = buttonConf[k];
	    }
	  }
	  if (simply.impl.windowButtonConfig) {
	    return simply.impl.windowButtonConfig(this._button.config);
	  }
	};
	
	Window.prototype.buttonConfig = function(buttonConf) {
	  this._buttonConfig(buttonConf);
	};
	
	Window.prototype._buttonAutoConfig = function() {
	  if (!this._button || this._button.configMode !== 'auto') {
	    return;
	  }
	  var singleBackCount = this.listenerCount('click', 'back');
	  var longBackCount = this.listenerCount('longClick', 'back');
	  var useBack = singleBackCount + longBackCount > 0;
	  if (useBack !== this._button.config.back) {
	    this._button.config.back = useBack;
	    return this._buttonConfig(this._button.config, true);
	  }
	};
	
	Window.prototype.size = function() {
	  var state = this.state;
	  var size = this._size.copy(Feature.resolution());
	  if ('status' in state && state.status !== false) {
	    size.y -= Feature.statusBarHeight();
	  } else if ('fullscreen' in state && state.fullscreen === false) {
	    size.y -= Feature.statusBarHeight();
	  }
	  if ('action' in state && state.action !== false) {
	    size.x -= Feature.actionBarWidth();
	  }
	  return size;
	};
	
	Window.prototype._toString = function() {
	  return '[' + this.constructor._codeName + ' ' + this._id() + ']';
	};
	
	Window.prototype._emit = function(type, subtype, e) {
	  e.window = this;
	  var klass = this.constructor;
	  if (klass) {
	    e[klass._codeName] = this;
	  }
	  if (this.emit(type, subtype, e) === false) {
	    return false;
	  }
	};
	
	Window.prototype._emitShow = function(type) {
	  return this._emit(type, null, {});
	};
	
	Window.emit = function(type, subtype, e) {
	  var wind = WindowStack.top();
	  if (wind) {
	    return wind._emit(type, subtype, e);
	  }
	};
	
	/**
	 * Simply.js button click event. This can either be a single click or long click.
	 * Use the event type 'click' or 'longClick' to subscribe to these events.
	 * @typedef simply.clickEvent
	 * @property {string} button - The button that was pressed: 'back', 'up', 'select', or 'down'. This is also the event subtype.
	 */
	
	Window.emitClick = function(type, button) {
	  var e = {
	    button: button,
	  };
	  return Window.emit(type, button, e);
	};
	
	module.exports = Window;


/***/ },
/* 25 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Vector2 from three.js
	 * https://github.com/mrdoob/three.js
	 *
	 * @author mr.doob / http://mrdoob.com/
	 * @author philogb / http://blog.thejit.org/
	 * @author egraether / http://egraether.com/
	 * @author zz85 / http://www.lab4games.net/zz85/blog
	 */
	
	/**
	 * Create a new vector with given dimensions.
	 * @param x
	 * @param y
	 */
	var Vector2 = function ( x, y ) {
	
	  this.x = x || 0;
	  this.y = y || 0;
	
	};
	
	Vector2.prototype = {
	
	  constructor: Vector2,
	
	  set: function ( x, y ) {
	
	    this.x = x;
	    this.y = y;
	
	    return this;
	
	  },
	
	  copy: function ( v ) {
	
	    this.x = v.x;
	    this.y = v.y;
	
	    return this;
	
	  },
	
	  clone: function () {
	
	    return new Vector2( this.x, this.y );
	
	  },
	
	  add: function ( v1, v2 ) {
	
	    this.x = v1.x + v2.x;
	    this.y = v1.y + v2.y;
	
	    return this;
	
	  },
	
	  addSelf: function ( v ) {
	
	    this.x += v.x;
	    this.y += v.y;
	
	    return this;
	
	  },
	
	  sub: function ( v1, v2 ) {
	
	    this.x = v1.x - v2.x;
	    this.y = v1.y - v2.y;
	
	    return this;
	
	  },
	
	  subSelf: function ( v ) {
	
	    this.x -= v.x;
	    this.y -= v.y;
	
	    return this;
	
	  },
	
	  multiplyScalar: function ( s ) {
	
	    this.x *= s;
	    this.y *= s;
	
	    return this;
	
	  },
	
	  divideScalar: function ( s ) {
	
	    if ( s ) {
	
	      this.x /= s;
	      this.y /= s;
	
	    } else {
	
	      this.set( 0, 0 );
	
	    }
	
	    return this;
	
	  },
	
	
	  negate: function() {
	
	    return this.multiplyScalar( -1 );
	
	  },
	
	  dot: function ( v ) {
	
	    return this.x * v.x + this.y * v.y;
	
	  },
	
	  lengthSq: function () {
	
	    return this.x * this.x + this.y * this.y;
	
	  },
	
	  length: function () {
	
	    return Math.sqrt( this.lengthSq() );
	
	  },
	
	  normalize: function () {
	
	    return this.divideScalar( this.length() );
	
	  },
	
	  distanceTo: function ( v ) {
	
	    return Math.sqrt( this.distanceToSquared( v ) );
	
	  },
	
	  distanceToSquared: function ( v ) {
	
	    var dx = this.x - v.x, dy = this.y - v.y;
	    return dx * dx + dy * dy;
	
	  },
	
	
	  setLength: function ( l ) {
	
	    return this.normalize().multiplyScalar( l );
	
	  },
	
	  equals: function( v ) {
	
	    return ( ( v.x === this.x ) && ( v.y === this.y ) );
	
	  }
	
	};
	
	if (true) {
	  module.exports = Vector2;
	}


/***/ },
/* 26 */
/***/ function(module, exports, __webpack_require__) {

	var Vector2 = __webpack_require__(25);
	var Platform = __webpack_require__(10);
	
	var Feature = module.exports;
	
	Feature.platform = function(map, yes, no) {
	  var v = map[Platform.version()] || map.unknown;
	  var rv;
	  if (v && yes !== undefined) {
	    rv = typeof yes === 'function' ? yes(v) : yes;
	  } else if (!v && no !== undefined) {
	    rv = typeof no === 'function' ? no(v) : no;
	  }
	  return rv !== undefined ? rv : v;
	};
	
	Feature.makePlatformTest = function(map) {
	  return function(yes, no) {
	    return Feature.platform(map, yes, no);
	  };
	};
	
	Feature.blackAndWhite = Feature.makePlatformTest({
	  aplite: true,
	  basalt: false,
	  chalk: false,
	  diorite: true,
	  emery: false,
	});
	
	Feature.color = Feature.makePlatformTest({
	  aplite: false,
	  basalt: true,
	  chalk: true,
	  diorite: false,
	  emery: true,
	});
	
	Feature.rectangle = Feature.makePlatformTest({
	  aplite: true,
	  basalt: true,
	  chalk: false,
	  diorite: true,
	  emery: true,
	});
	
	Feature.round = Feature.makePlatformTest({
	  aplite: false,
	  basalt: false,
	  chalk: true,
	  diorite: false,
	  emery: false,
	});
	
	Feature.microphone = Feature.makePlatformTest({
	  aplite: false,
	  basalt: true,
	  chalk: true,
	  diorite: true,
	  emery: true,
	});
	
	Feature.resolution = Feature.makePlatformTest({
	  aplite: new Vector2(144, 168),
	  basalt: new Vector2(144, 168),
	  chalk: new Vector2(180, 180),
	  diorite: new Vector2(144, 168),
	  emery: new Vector2(200, 228),
	});
	
	Feature.actionBarWidth = function() {
	  return Feature.rectangle(30, 40);
	};
	
	Feature.statusBarHeight = function() {
	  return 16;
	};


/***/ },
/* 27 */
/***/ function(module, exports, __webpack_require__) {

	var util2 = __webpack_require__(7);
	var myutil = __webpack_require__(8);
	
	var Propable = function(def) {
	  this.state = def || {};
	};
	
	Propable.unset = function(k) {
	  delete this[k];
	};
	
	Propable.makeAccessor = function(k) {
	  return function(value) {
	    if (arguments.length === 0) {
	      return this.state[k];
	    }
	    this.state[k] = value;
	    this._prop(myutil.toObject(k, value));
	    return this;
	  };
	};
	
	Propable.makeNestedAccessor = function(k) {
	  var _k = '_' + k;
	  return function(field, value, clear) {
	    var nest = this.state[k];
	    if (arguments.length === 0) {
	      return nest;
	    }
	    if (arguments.length === 1 && typeof field === 'string') {
	      return typeof nest === 'object' ? nest[field] : undefined;
	    }
	    if (typeof field === 'boolean') {
	      value = field;
	      field = k;
	    }
	    if (typeof field === 'object') {
	      clear = value;
	      value = undefined;
	    }
	    if (clear) {
	      this._clear(k);
	    }
	    if (field !== undefined && typeof nest !== 'object') {
	      nest = this.state[k] = {};
	    }
	    if (field !== undefined && typeof nest === 'object') {
	      util2.copy(myutil.toObject(field, value), nest);
	    }
	    if (this[_k]) {
	      this[_k](nest);
	    }
	    return this;
	  };
	};
	
	Propable.makeAccessors = function(props, proto) {
	  proto = proto || {};
	  props.forEach(function(k) {
	    proto[k] = Propable.makeAccessor(k);
	  });
	  return proto;
	};
	
	Propable.makeNestedAccessors = function(props, proto) {
	  proto = proto || {};
	  props.forEach(function(k) {
	    proto[k] = Propable.makeNestedAccessor(k);
	  });
	  return proto;
	};
	
	Propable.prototype.unset = function(k) {
	  delete this.state[k];
	};
	
	Propable.prototype._clear = function(k) {
	  if (k === undefined || k === true) {
	    this.state = {};
	  } else if (k !== false) {
	    this.state[k] = {};
	  }
	};
	
	Propable.prototype._prop = function(def) {
	};
	
	Propable.prototype.prop = function(field, value, clear) {
	  if (arguments.length === 0) {
	    return util2.copy(this.state);
	  }
	  if (arguments.length === 1 && typeof field !== 'object') {
	    return this.state[field];
	  }
	  if (typeof field === 'object') {
	    clear = value;
	  }
	  if (clear) {
	    this._clear(true);
	  }
	  var def = myutil.toObject(field, value);
	  util2.copy(def, this.state);
	  this._prop(def);
	  return this;
	};
	
	module.exports = Propable;


/***/ },
/* 28 */
/***/ function(module, exports, __webpack_require__) {

	var util2 = __webpack_require__(7);
	var Emitter = __webpack_require__(13);
	var WindowStack = __webpack_require__(23);
	var simply = __webpack_require__(18);
	
	var Stage = function(stageDef) {
	  this.state = stageDef || {};
	  this._items = [];
	};
	
	Stage.RectType = 1;
	Stage.CircleType = 2;
	Stage.RadialType = 6;
	Stage.TextType = 3;
	Stage.ImageType = 4;
	Stage.InverterType = 5;
	
	util2.copy(Emitter.prototype, Stage.prototype);
	
	Stage.prototype._show = function() {
	  this.each(function(element, index) {
	    element._reset();
	    this._insert(index, element);
	  }.bind(this));
	};
	
	Stage.prototype._prop = function() {
	  if (this === WindowStack.top()) {
	    simply.impl.stage.apply(this, arguments);
	  }
	};
	
	Stage.prototype.each = function(callback) {
	  this._items.forEach(callback);
	  return this;
	};
	
	Stage.prototype.at = function(index) {
	  return this._items[index];
	};
	
	Stage.prototype.index = function(element) {
	  return this._items.indexOf(element);
	};
	
	Stage.prototype._insert = function(index, element) {
	  if (this === WindowStack.top()) {
	    simply.impl.stageElement(element._id(), element._type(), element.state, index);
	  }
	};
	
	Stage.prototype._remove = function(element, broadcast) {
	  if (broadcast === false) { return; }
	  if (this === WindowStack.top()) {
	    simply.impl.stageRemove(element._id());
	  }
	};
	
	Stage.prototype.insert = function(index, element) {
	  element.remove(false);
	  this._items.splice(index, 0, element);
	  element.parent = this;
	  this._insert(this.index(element), element);
	  return this;
	};
	
	Stage.prototype.add = function(element) {
	  return this.insert(this._items.length, element);
	};
	
	Stage.prototype.remove = function(element, broadcast) {
	  var index = this.index(element);
	  if (index === -1) { return this; }
	  this._remove(element, broadcast);
	  this._items.splice(index, 1);
	  delete element.parent;
	  return this;
	};
	
	module.exports = Stage;


/***/ },
/* 29 */
/***/ function(module, exports, __webpack_require__) {

	var simply = __webpack_require__(18);
	
	var Voice = {};
	
	Voice.dictate = function(type, confirm, callback) {
	  type = type.toLowerCase();
	  switch (type){
	    case 'stop':
	      simply.impl.voiceDictationStop();
	      break;
	    case 'start':
	      if (typeof callback === 'undefined') {
	        callback = confirm;
	        confirm = true;
	      }
	
	      simply.impl.voiceDictationStart(callback, confirm);
	      break;
	    default:
	      console.log('Unsupported type passed to Voice.dictate');
	  }
	};
	
	module.exports = Voice;


/***/ },
/* 30 */
/***/ function(module, exports, __webpack_require__) {

	var imagelib = __webpack_require__(31);
	var myutil = __webpack_require__(8);
	var Feature = __webpack_require__(26);
	var Resource = __webpack_require__(21);
	var simply = __webpack_require__(18);
	
	var ImageService = module.exports;
	
	var state;
	
	ImageService.init = function() {
	  state = ImageService.state = {
	    cache: {},
	    nextId: Resource.items.length + (2 << 15),
	    rootUrl: undefined,
	  };
	};
	
	var makeImageHash = function(image) {
	  var url = image.url;
	  var hashPart = '';
	  if (image.width) {
	    hashPart += ',width:' + image.width;
	  }
	  if (image.height) {
	    hashPart += ',height:' + image.height;
	  }
	  if (image.dither) {
	    hashPart += ',dither:' + image.dither;
	  }
	  if (hashPart) {
	    url += '#' + hashPart.substr(1);
	  }
	  return url;
	};
	
	var parseImageHash = function(hash) {
	  var image = {};
	  hash = hash.split('#');
	  image.url = hash[0];
	  hash = hash[1];
	  if (!hash) { return image; }
	  var args = hash.split(',');
	  for (var i = 0, ii = args.length; i < ii; ++i) {
	    var arg = args[i];
	    if (arg.match(':')) {
	      arg = arg.split(':');
	      var v = arg[1];
	      image[arg[0]] = !isNaN(Number(v)) ? Number(v) : v;
	    } else {
	      image[arg] = true;
	    }
	  }
	  return image;
	};
	
	ImageService.load = function(opt, reset, callback) {
	  if (typeof opt === 'string') {
	    opt = parseImageHash(opt);
	  }
	  if (typeof reset === 'function') {
	    callback = reset;
	    reset = null;
	  }
	  var url = myutil.abspath(state.rootUrl, opt.url);
	  var hash = makeImageHash(opt);
	  var image = state.cache[hash];
	  var fetch = false;
	  if (image) {
	    if ((opt.width && image.width !== opt.width) ||
	        (opt.height && image.height !== opt.height) ||
	        (opt.dither && image.dither !== opt.dither)) {
	      reset = true;
	    }
	    if (reset !== true && image.loaded) {
	      return image.id;
	    }
	  }
	  if (!image || reset === true) {
	    fetch = true;
	    image = {
	      id: state.nextId++,
	      url: url,
	    };
	  }
	  image.width = opt.width;
	  image.height = opt.height;
	  image.dither =  opt.dither;
	  image.loaded = true;
	  state.cache[hash] = image;
	  var onLoad = function() {
	    simply.impl.image(image.id, image.image);
	    if (callback) {
	      var e = {
	        type: 'image',
	        image: image.id,
	        url: image.url,
	      };
	      callback(e);
	    }
	  };
	  if (fetch) {
	    var bitdepth = Feature.color(8, 1);
	    imagelib.load(image, bitdepth, onLoad);
	  } else {
	    onLoad();
	  }
	  return image.id;
	};
	
	ImageService.setRootUrl = function(url) {
	  state.rootUrl = url;
	};
	
	/**
	 * Resolve an image path to an id. If the image is defined in appinfo, the index of the resource is used,
	 * otherwise a new id is generated for dynamic loading.
	 */
	ImageService.resolve = function(opt) {
	  var id = Resource.getId(opt);
	  return typeof id !== 'undefined' ? id : ImageService.load(opt);
	};
	
	ImageService.markAllUnloaded = function() {
	  for (var k in state.cache) {
	    delete state.cache[k].loaded;
	  }
	};
	
	ImageService.init();


/***/ },
/* 31 */
/***/ function(module, exports, __webpack_require__) {

	var PNG = __webpack_require__(32);
	
	var PNGEncoder = __webpack_require__(34);
	
	var image = {};
	
	var getPos = function(width, x, y) {
	  return y * width * 4 + x * 4;
	};
	
	//! Convert an RGB pixel array into a single grey color
	var getPixelGrey = function(pixels, pos) {
	  return ((pixels[pos] + pixels[pos + 1] + pixels[pos + 2]) / 3) & 0xFF;
	};
	
	//! Convert an RGB pixel array into a single uint8 2 bitdepth per channel color
	var getPixelColorUint8 = function(pixels, pos) {
	  var r = Math.min(Math.max(parseInt(pixels[pos    ] / 64 + 0.5), 0), 3);
	  var g = Math.min(Math.max(parseInt(pixels[pos + 1] / 64 + 0.5), 0), 3);
	  var b = Math.min(Math.max(parseInt(pixels[pos + 2] / 64 + 0.5), 0), 3);
	  return (0x3 << 6) | (r << 4) | (g << 2) | b;
	};
	
	//! Get an RGB vector from an RGB pixel array
	var getPixelColorRGB8 = function(pixels, pos) {
	  return [pixels[pos], pixels[pos + 1], pixels[pos + 2]];
	};
	
	//! Normalize the color channels to be identical
	image.greyscale = function(pixels, width, height, converter) {
	  converter = converter || getPixelGrey;
	  for (var y = 0, yy = height; y < yy; ++y) {
	    for (var x = 0, xx = width; x < xx; ++x) {
	      var pos = getPos(width, x, y);
	      var newColor = converter(pixels, pos);
	      for (var i = 0; i < 3; ++i) {
	        pixels[pos + i] = newColor;
	      }
	    }
	  }
	};
	
	//! Convert to an RGBA pixel array into a row major matrix raster
	image.toRaster = function(pixels, width, height, converter) {
	  converter = converter || getPixelColorRGB8;
	  var matrix = [];
	  for (var y = 0, yy = height; y < yy; ++y) {
	    var row = matrix[y] = [];
	    for (var x = 0, xx = width; x < xx; ++x) {
	      var pos = getPos(width, x, y);
	      row[x] = converter(pixels, pos);
	    }
	  }
	  return matrix;
	};
	
	image.dithers = {};
	
	image.dithers['floyd-steinberg'] = [
	  [ 1, 0, 7/16],
	  [-1, 1, 3/16],
	  [ 0, 1, 5/16],
	  [ 1, 1, 1/16]];
	
	image.dithers['jarvis-judice-ninke'] = [
	  [ 1, 0, 7/48],
	  [ 2, 0, 5/48],
	  [-2, 1, 3/48],
	  [-1, 1, 5/48],
	  [ 0, 1, 7/48],
	  [ 1, 1, 5/48],
	  [ 2, 1, 3/48],
	  [-2, 2, 1/48],
	  [-1, 2, 3/48],
	  [ 0, 2, 5/48],
	  [ 1, 2, 3/48],
	  [ 2, 2, 1/48]];
	
	image.dithers.sierra = [
	  [ 1, 0, 5/32],
	  [ 2, 0, 3/32],
	  [-2, 1, 2/32],
	  [-1, 1, 4/32],
	  [ 0, 1, 5/32],
	  [ 1, 1, 4/32],
	  [ 2, 1, 2/32],
	  [-1, 2, 2/32],
	  [ 0, 2, 3/32],
	  [ 1, 2, 2/32]];
	
	image.dithers['default'] = image.dithers.sierra;
	
	//! Get the nearest normalized grey color
	var getChannelGrey = function(color) {
	  return color >= 128 ? 255 : 0;
	};
	
	//! Get the nearest normalized 2 bitdepth color
	var getChannel2 = function(color) {
	  return Math.min(Math.max(parseInt(color / 64 + 0.5), 0) * 64, 255);
	};
	
	image.dither = function(pixels, width, height, dithers, converter) {
	  converter = converter || getChannel2;
	  dithers = dithers || image.dithers['default'];
	  var numDithers = dithers.length;
	  for (var y = 0, yy = height; y < yy; ++y) {
	    for (var x = 0, xx = width; x < xx; ++x) {
	      var pos = getPos(width, x, y);
	      for (var i = 0; i < 3; ++i) {
	        var oldColor = pixels[pos + i];
	        var newColor = converter(oldColor);
	        var error = oldColor - newColor;
	        pixels[pos + i] = newColor;
	        for (var j = 0; j < numDithers; ++j) {
	          var dither = dithers[j];
	          var x2 = x + dither[0], y2 = y + dither[1];
	          if (x2 >= 0 && x2 < width && y < height) {
	            pixels[getPos(width, x2, y2) + i] += parseInt(error * dither[2]);
	          }
	        }
	      }
	    }
	  }
	};
	
	//! Dither a pixel buffer by image properties
	image.ditherByProps = function(pixels, img, converter) {
	  if (img.dither) {
	    var dithers = image.dithers[img.dither];
	    image.dither(pixels, img.width, img.height, dithers, converter);
	  }
	};
	
	image.resizeNearest = function(pixels, width, height, newWidth, newHeight) {
	  var newPixels = new Array(newWidth * newHeight * 4);
	  var widthRatio = width / newWidth;
	  var heightRatio = height / newHeight;
	  for (var y = 0, yy = newHeight; y < yy; ++y) {
	    for (var x = 0, xx = newWidth; x < xx; ++x) {
	      var x2 = parseInt(x * widthRatio);
	      var y2 = parseInt(y * heightRatio);
	      var pos2 = getPos(width, x2, y2);
	      var pos = getPos(newWidth, x, y);
	      for (var i = 0; i < 4; ++i) {
	        newPixels[pos + i] = pixels[pos2 + i];
	      }
	    }
	  }
	  return newPixels;
	};
	
	image.resizeSample = function(pixels, width, height, newWidth, newHeight) {
	  var newPixels = new Array(newWidth * newHeight * 4);
	  var widthRatio = width / newWidth;
	  var heightRatio = height / newHeight;
	  for (var y = 0, yy = newHeight; y < yy; ++y) {
	    for (var x = 0, xx = newWidth; x < xx; ++x) {
	      var x2 = Math.min(parseInt(x * widthRatio), width - 1);
	      var y2 = Math.min(parseInt(y * heightRatio), height - 1);
	      var pos = getPos(newWidth, x, y);
	      for (var i = 0; i < 4; ++i) {
	        newPixels[pos + i] = ((pixels[getPos(width, x2  , y2  ) + i] +
	                               pixels[getPos(width, x2+1, y2  ) + i] +
	                               pixels[getPos(width, x2  , y2+1) + i] +
	                               pixels[getPos(width, x2+1, y2+1) + i]) / 4) & 0xFF;
	      }
	    }
	  }
	  return newPixels;
	};
	
	image.resize = function(pixels, width, height, newWidth, newHeight) {
	  if (newWidth < width || newHeight < height) {
	    return image.resizeSample(pixels, width, height, newWidth, newHeight);
	  } else {
	    return image.resizeNearest(pixels, width, height, newWidth, newHeight);
	  }
	};
	
	//! Resize a pixel buffer by image properties
	image.resizeByProps = function(pixels, img) {
	  if (img.width !== img.originalWidth || img.height !== img.originalHeight) {
	    return image.resize(pixels, img.originalWidth, img.originalHeight, img.width, img.height);
	  } else {
	    return pixels;
	  }
	};
	
	//! Convert to a GBitmap with bitdepth 1
	image.toGbitmap1 = function(pixels, width, height) {
	  var rowBytes = width * 4;
	
	  var gpixels = [];
	  var growBytes = Math.ceil(width / 32) * 4;
	  for (var i = 0, ii = height * growBytes; i < ii; ++i) {
	    gpixels[i] = 0;
	  }
	
	  for (var y = 0, yy = height; y < yy; ++y) {
	    for (var x = 0, xx = width; x < xx; ++x) {
	      var grey = 0;
	      var pos = getPos(width, x, y);
	      for (var j = 0; j < 3; ++j) {
	        grey += pixels[pos + j];
	      }
	      grey /= 3 * 255;
	      if (grey >= 0.5) {
	        var gbytePos = y * growBytes + parseInt(x / 8);
	        gpixels[gbytePos] += 1 << (x % 8);
	      }
	    }
	  }
	
	  var gbitmap = {
	    width: width,
	    height: height,
	    pixelsLength: gpixels.length,
	    pixels: gpixels,
	  };
	
	  return gbitmap;
	};
	
	//! Convert to a PNG with total color bitdepth 8
	image.toPng8 = function(pixels, width, height) {
	  var raster = image.toRaster(pixels, width, height, getPixelColorRGB8);
	
	  var palette = [];
	  var colorMap = {};
	  var numColors = 0;
	  for (var y = 0, yy = height; y < yy; ++y) {
	    var row = raster[y];
	    for (var x = 0, xx = width; x < xx; ++x) {
	      var color = row[x];
	      var hash = getPixelColorUint8(color, 0);
	      if (!(hash in colorMap)) {
	        colorMap[hash] = numColors;
	        palette[numColors++] = color;
	      }
	     row[x] = colorMap[hash];
	    }
	  }
	
	  var bitdepth = 8;
	  var colorType = 3; // 8-bit palette
	  var bytes = PNGEncoder.encode(raster, bitdepth, colorType, palette);
	
	  var png = {
	    width: width,
	    height: height,
	    pixelsLength: bytes.array.length,
	    pixels: bytes.array,
	  };
	
	  return png;
	};
	
	//! Set the size maintaining the aspect ratio
	image.setSizeAspect = function(img, width, height) {
	  img.originalWidth = width;
	  img.originalHeight = height;
	  if (img.width) {
	    if (!img.height) {
	      img.height = parseInt(height * (img.width / width));
	    }
	  } else if (img.height) {
	    if (!img.width) {
	      img.width = parseInt(width * (img.height / height));
	    }
	  } else {
	    img.width = width;
	    img.height = height;
	  }
	};
	
	image.load = function(img, bitdepth, callback) {
	  PNG.load(img.url, function(png) {
	    var pixels = png.decode();
	    if (bitdepth === 1) {
	      image.greyscale(pixels, png.width, png.height);
	    }
	    image.setSizeAspect(img, png.width, png.height);
	    pixels = image.resizeByProps(pixels, img);
	    image.ditherByProps(pixels, img,
	                        bitdepth === 1 ? getChannelGrey : getChannel2);
	    if (bitdepth === 8) {
	      img.image = image.toPng8(pixels, img.width, img.height);
	    } else if (bitdepth === 1) {
	      img.image = image.toGbitmap1(pixels, img.width, img.height);
	    }
	    if (callback) {
	      callback(img);
	    }
	  });
	  return img;
	};
	
	module.exports = image;


/***/ },
/* 32 */
/***/ function(module, exports, __webpack_require__) {

	// Generated by CoffeeScript 1.4.0
	
	/*
	# MIT LICENSE
	# Copyright (c) 2011 Devon Govett
	# 
	# Permission is hereby granted, free of charge, to any person obtaining a copy of this 
	# software and associated documentation files (the "Software"), to deal in the Software 
	# without restriction, including without limitation the rights to use, copy, modify, merge, 
	# publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons 
	# to whom the Software is furnished to do so, subject to the following conditions:
	# 
	# The above copyright notice and this permission notice shall be included in all copies or 
	# substantial portions of the Software.
	# 
	# THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING 
	# BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND 
	# NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, 
	# DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, 
	# OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
	*/
	
	var Zlib;
	if (true) {
	  Zlib = __webpack_require__(33);
	} else {
	  Zlib = window.Zlib;
	}
	
	(function() {
	  var PNG;
	
	  PNG = (function() {
	    var APNG_BLEND_OP_OVER, APNG_BLEND_OP_SOURCE, APNG_DISPOSE_OP_BACKGROUND, APNG_DISPOSE_OP_NONE, APNG_DISPOSE_OP_PREVIOUS, makeImage, scratchCanvas, scratchCtx;
	
	    PNG.load = function(url, canvas, callback) {
	      var xhr,
	        _this = this;
	      if (typeof canvas === 'function') {
	        callback = canvas;
	      }
	      xhr = new XMLHttpRequest;
	      xhr.open("GET", url, true);
	      xhr.responseType = "arraybuffer";
	      xhr.onload = function() {
	        var data, png;
	        data = new Uint8Array(xhr.response || xhr.mozResponseArrayBuffer);
	        png = new PNG(data);
	        if (typeof (canvas != null ? canvas.getContext : void 0) === 'function') {
	          png.render(canvas);
	        }
	        return typeof callback === "function" ? callback(png) : void 0;
	      };
	      return xhr.send(null);
	    };
	
	    APNG_DISPOSE_OP_NONE = 0;
	
	    APNG_DISPOSE_OP_BACKGROUND = 1;
	
	    APNG_DISPOSE_OP_PREVIOUS = 2;
	
	    APNG_BLEND_OP_SOURCE = 0;
	
	    APNG_BLEND_OP_OVER = 1;
	
	    function PNG(data) {
	      var chunkSize, colors, delayDen, delayNum, frame, i, index, key, section, short, text, _i, _j, _ref;
	      this.data = data;
	      this.pos = 8;
	      this.palette = [];
	      this.imgData = [];
	      this.transparency = {};
	      this.animation = null;
	      this.text = {};
	      frame = null;
	      while (true) {
	        chunkSize = this.readUInt32();
	        section = ((function() {
	          var _i, _results;
	          _results = [];
	          for (i = _i = 0; _i < 4; i = ++_i) {
	            _results.push(String.fromCharCode(this.data[this.pos++]));
	          }
	          return _results;
	        }).call(this)).join('');
	        switch (section) {
	          case 'IHDR':
	            this.width = this.readUInt32();
	            this.height = this.readUInt32();
	            this.bits = this.data[this.pos++];
	            this.colorType = this.data[this.pos++];
	            this.compressionMethod = this.data[this.pos++];
	            this.filterMethod = this.data[this.pos++];
	            this.interlaceMethod = this.data[this.pos++];
	            break;
	          case 'acTL':
	            this.animation = {
	              numFrames: this.readUInt32(),
	              numPlays: this.readUInt32() || Infinity,
	              frames: []
	            };
	            break;
	          case 'PLTE':
	            this.palette = this.read(chunkSize);
	            break;
	          case 'fcTL':
	            if (frame) {
	              this.animation.frames.push(frame);
	            }
	            this.pos += 4;
	            frame = {
	              width: this.readUInt32(),
	              height: this.readUInt32(),
	              xOffset: this.readUInt32(),
	              yOffset: this.readUInt32()
	            };
	            delayNum = this.readUInt16();
	            delayDen = this.readUInt16() || 100;
	            frame.delay = 1000 * delayNum / delayDen;
	            frame.disposeOp = this.data[this.pos++];
	            frame.blendOp = this.data[this.pos++];
	            frame.data = [];
	            break;
	          case 'IDAT':
	          case 'fdAT':
	            if (section === 'fdAT') {
	              this.pos += 4;
	              chunkSize -= 4;
	            }
	            data = (frame != null ? frame.data : void 0) || this.imgData;
	            for (i = _i = 0; 0 <= chunkSize ? _i < chunkSize : _i > chunkSize; i = 0 <= chunkSize ? ++_i : --_i) {
	              data.push(this.data[this.pos++]);
	            }
	            break;
	          case 'tRNS':
	            this.transparency = {};
	            switch (this.colorType) {
	              case 3:
	                this.transparency.indexed = this.read(chunkSize);
	                short = 255 - this.transparency.indexed.length;
	                if (short > 0) {
	                  for (i = _j = 0; 0 <= short ? _j < short : _j > short; i = 0 <= short ? ++_j : --_j) {
	                    this.transparency.indexed.push(255);
	                  }
	                }
	                break;
	              case 0:
	                this.transparency.grayscale = this.read(chunkSize)[0];
	                break;
	              case 2:
	                this.transparency.rgb = this.read(chunkSize);
	            }
	            break;
	          case 'tEXt':
	            text = this.read(chunkSize);
	            index = text.indexOf(0);
	            key = String.fromCharCode.apply(String, text.slice(0, index));
	            this.text[key] = String.fromCharCode.apply(String, text.slice(index + 1));
	            break;
	          case 'IEND':
	            if (frame) {
	              this.animation.frames.push(frame);
	            }
	            this.colors = (function() {
	              switch (this.colorType) {
	                case 0:
	                case 3:
	                case 4:
	                  return 1;
	                case 2:
	                case 6:
	                  return 3;
	              }
	            }).call(this);
	            this.hasAlphaChannel = (_ref = this.colorType) === 4 || _ref === 6;
	            colors = this.colors + (this.hasAlphaChannel ? 1 : 0);
	            this.pixelBitlength = this.bits * colors;
	            this.colorSpace = (function() {
	              switch (this.colors) {
	                case 1:
	                  return 'DeviceGray';
	                case 3:
	                  return 'DeviceRGB';
	              }
	            }).call(this);
	            this.imgData = new Uint8Array(this.imgData);
	            return;
	          default:
	            this.pos += chunkSize;
	        }
	        this.pos += 4;
	        if (this.pos > this.data.length) {
	          throw new Error("Incomplete or corrupt PNG file");
	        }
	      }
	      return;
	    }
	
	    PNG.prototype.read = function(bytes) {
	      var i, _i, _results;
	      _results = [];
	      for (i = _i = 0; 0 <= bytes ? _i < bytes : _i > bytes; i = 0 <= bytes ? ++_i : --_i) {
	        _results.push(this.data[this.pos++]);
	      }
	      return _results;
	    };
	
	    PNG.prototype.readUInt32 = function() {
	      var b1, b2, b3, b4;
	      b1 = this.data[this.pos++] << 24;
	      b2 = this.data[this.pos++] << 16;
	      b3 = this.data[this.pos++] << 8;
	      b4 = this.data[this.pos++];
	      return b1 | b2 | b3 | b4;
	    };
	
	    PNG.prototype.readUInt16 = function() {
	      var b1, b2;
	      b1 = this.data[this.pos++] << 8;
	      b2 = this.data[this.pos++];
	      return b1 | b2;
	    };
	
	    PNG.prototype.decodePixels = function(data) {
	      var byte, c, col, i, left, length, p, pa, paeth, pb, pc, pixelBytes, pixels, pos, row, scanlineLength, upper, upperLeft, _i, _j, _k, _l, _m;
	      if (data == null) {
	        data = this.imgData;
	      }
	      if (data.length === 0) {
	        return new Uint8Array(0);
	      }
	      data = new Zlib.Inflate(data);
	      data = data.decompress();
	      pixelBytes = this.pixelBitlength / 8;
	      scanlineLength = pixelBytes * this.width;
	      pixels = new Uint8Array(scanlineLength * this.height);
	      length = data.length;
	      row = 0;
	      pos = 0;
	      c = 0;
	      while (pos < length) {
	        switch (data[pos++]) {
	          case 0:
	            for (i = _i = 0; _i < scanlineLength; i = _i += 1) {
	              pixels[c++] = data[pos++];
	            }
	            break;
	          case 1:
	            for (i = _j = 0; _j < scanlineLength; i = _j += 1) {
	              byte = data[pos++];
	              left = i < pixelBytes ? 0 : pixels[c - pixelBytes];
	              pixels[c++] = (byte + left) % 256;
	            }
	            break;
	          case 2:
	            for (i = _k = 0; _k < scanlineLength; i = _k += 1) {
	              byte = data[pos++];
	              col = (i - (i % pixelBytes)) / pixelBytes;
	              upper = row && pixels[(row - 1) * scanlineLength + col * pixelBytes + (i % pixelBytes)];
	              pixels[c++] = (upper + byte) % 256;
	            }
	            break;
	          case 3:
	            for (i = _l = 0; _l < scanlineLength; i = _l += 1) {
	              byte = data[pos++];
	              col = (i - (i % pixelBytes)) / pixelBytes;
	              left = i < pixelBytes ? 0 : pixels[c - pixelBytes];
	              upper = row && pixels[(row - 1) * scanlineLength + col * pixelBytes + (i % pixelBytes)];
	              pixels[c++] = (byte + Math.floor((left + upper) / 2)) % 256;
	            }
	            break;
	          case 4:
	            for (i = _m = 0; _m < scanlineLength; i = _m += 1) {
	              byte = data[pos++];
	              col = (i - (i % pixelBytes)) / pixelBytes;
	              left = i < pixelBytes ? 0 : pixels[c - pixelBytes];
	              if (row === 0) {
	                upper = upperLeft = 0;
	              } else {
	                upper = pixels[(row - 1) * scanlineLength + col * pixelBytes + (i % pixelBytes)];
	                upperLeft = col && pixels[(row - 1) * scanlineLength + (col - 1) * pixelBytes + (i % pixelBytes)];
	              }
	              p = left + upper - upperLeft;
	              pa = Math.abs(p - left);
	              pb = Math.abs(p - upper);
	              pc = Math.abs(p - upperLeft);
	              if (pa <= pb && pa <= pc) {
	                paeth = left;
	              } else if (pb <= pc) {
	                paeth = upper;
	              } else {
	                paeth = upperLeft;
	              }
	              pixels[c++] = (byte + paeth) % 256;
	            }
	            break;
	          default:
	            throw new Error("Invalid filter algorithm: " + data[pos - 1]);
	        }
	        row++;
	      }
	      return pixels;
	    };
	
	    PNG.prototype.decodePalette = function() {
	      var c, i, length, palette, pos, ret, transparency, _i, _ref, _ref1;
	      palette = this.palette;
	      transparency = this.transparency.indexed || [];
	      ret = new Uint8Array((transparency.length || 0) + palette.length);
	      pos = 0;
	      length = palette.length;
	      c = 0;
	      for (i = _i = 0, _ref = palette.length; _i < _ref; i = _i += 3) {
	        ret[pos++] = palette[i];
	        ret[pos++] = palette[i + 1];
	        ret[pos++] = palette[i + 2];
	        ret[pos++] = (_ref1 = transparency[c++]) != null ? _ref1 : 255;
	      }
	      return ret;
	    };
	
	    PNG.prototype.copyToImageData = function(imageData, pixels) {
	      var alpha, colors, data, i, input, j, k, length, palette, v, _ref;
	      colors = this.colors;
	      palette = null;
	      alpha = this.hasAlphaChannel;
	      if (this.palette.length) {
	        palette = (_ref = this._decodedPalette) != null ? _ref : this._decodedPalette = this.decodePalette();
	        colors = 4;
	        alpha = true;
	      }
	      data = imageData.data || imageData;
	      length = data.length;
	      input = palette || pixels;
	      i = j = 0;
	      if (colors === 1) {
	        while (i < length) {
	          k = palette ? pixels[i / 4] * 4 : j;
	          v = input[k++];
	          data[i++] = v;
	          data[i++] = v;
	          data[i++] = v;
	          data[i++] = alpha ? input[k++] : 255;
	          j = k;
	        }
	      } else {
	        while (i < length) {
	          k = palette ? pixels[i / 4] * 4 : j;
	          data[i++] = input[k++];
	          data[i++] = input[k++];
	          data[i++] = input[k++];
	          data[i++] = alpha ? input[k++] : 255;
	          j = k;
	        }
	      }
	    };
	
	    PNG.prototype.decode = function() {
	      var ret;
	      ret = new Uint8Array(this.width * this.height * 4);
	      this.copyToImageData(ret, this.decodePixels());
	      return ret;
	    };
	
	    makeImage = function(imageData) {
	      var img;
	      scratchCtx.width = imageData.width;
	      scratchCtx.height = imageData.height;
	      scratchCtx.clearRect(0, 0, imageData.width, imageData.height);
	      scratchCtx.putImageData(imageData, 0, 0);
	      img = new Image;
	      img.src = scratchCanvas.toDataURL();
	      return img;
	    };
	
	    PNG.prototype.decodeFrames = function(ctx) {
	      var frame, i, imageData, pixels, _i, _len, _ref, _results;
	      if (!this.animation) {
	        return;
	      }
	      _ref = this.animation.frames;
	      _results = [];
	      for (i = _i = 0, _len = _ref.length; _i < _len; i = ++_i) {
	        frame = _ref[i];
	        imageData = ctx.createImageData(frame.width, frame.height);
	        pixels = this.decodePixels(new Uint8Array(frame.data));
	        this.copyToImageData(imageData, pixels);
	        frame.imageData = imageData;
	        _results.push(frame.image = makeImage(imageData));
	      }
	      return _results;
	    };
	
	    PNG.prototype.renderFrame = function(ctx, number) {
	      var frame, frames, prev;
	      frames = this.animation.frames;
	      frame = frames[number];
	      prev = frames[number - 1];
	      if (number === 0) {
	        ctx.clearRect(0, 0, this.width, this.height);
	      }
	      if ((prev != null ? prev.disposeOp : void 0) === APNG_DISPOSE_OP_BACKGROUND) {
	        ctx.clearRect(prev.xOffset, prev.yOffset, prev.width, prev.height);
	      } else if ((prev != null ? prev.disposeOp : void 0) === APNG_DISPOSE_OP_PREVIOUS) {
	        ctx.putImageData(prev.imageData, prev.xOffset, prev.yOffset);
	      }
	      if (frame.blendOp === APNG_BLEND_OP_SOURCE) {
	        ctx.clearRect(frame.xOffset, frame.yOffset, frame.width, frame.height);
	      }
	      return ctx.drawImage(frame.image, frame.xOffset, frame.yOffset);
	    };
	
	    PNG.prototype.animate = function(ctx) {
	      var doFrame, frameNumber, frames, numFrames, numPlays, _ref,
	        _this = this;
	      frameNumber = 0;
	      _ref = this.animation, numFrames = _ref.numFrames, frames = _ref.frames, numPlays = _ref.numPlays;
	      return (doFrame = function() {
	        var f, frame;
	        f = frameNumber++ % numFrames;
	        frame = frames[f];
	        _this.renderFrame(ctx, f);
	        if (numFrames > 1 && frameNumber / numFrames < numPlays) {
	          return _this.animation._timeout = setTimeout(doFrame, frame.delay);
	        }
	      })();
	    };
	
	    PNG.prototype.stopAnimation = function() {
	      var _ref;
	      return clearTimeout((_ref = this.animation) != null ? _ref._timeout : void 0);
	    };
	
	    PNG.prototype.render = function(canvas) {
	      var ctx, data;
	      if (canvas._png) {
	        canvas._png.stopAnimation();
	      }
	      canvas._png = this;
	      canvas.width = this.width;
	      canvas.height = this.height;
	      ctx = canvas.getContext("2d");
	      if (this.animation) {
	        this.decodeFrames(ctx);
	        return this.animate(ctx);
	      } else {
	        data = ctx.createImageData(this.width, this.height);
	        this.copyToImageData(data, this.decodePixels());
	        return ctx.putImageData(data, 0, 0);
	      }
	    };
	
	    return PNG;
	
	  })();
	
	  if (true) {
	    module.exports = PNG;
	  } else {
	    window.PNG = PNG;
	  }
	
	}).call(this);


/***/ },
/* 33 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * zlib.js Deflate + Inflate
	 *
	 * @link https://github.com/imaya/zlib.js
	 * @author imaya
	 * @license MIT
	 **/
	(function() {'use strict';function l(d){throw d;}var v=void 0,x=!0,aa=this;function D(d,a){var c=d.split("."),e=aa;!(c[0]in e)&&e.execScript&&e.execScript("var "+c[0]);for(var b;c.length&&(b=c.shift());)!c.length&&a!==v?e[b]=a:e=e[b]?e[b]:e[b]={}};var F="undefined"!==typeof Uint8Array&&"undefined"!==typeof Uint16Array&&"undefined"!==typeof Uint32Array&&"undefined"!==typeof DataView;function H(d,a){this.index="number"===typeof a?a:0;this.i=0;this.buffer=d instanceof(F?Uint8Array:Array)?d:new (F?Uint8Array:Array)(32768);2*this.buffer.length<=this.index&&l(Error("invalid index"));this.buffer.length<=this.index&&this.f()}H.prototype.f=function(){var d=this.buffer,a,c=d.length,e=new (F?Uint8Array:Array)(c<<1);if(F)e.set(d);else for(a=0;a<c;++a)e[a]=d[a];return this.buffer=e};
	H.prototype.d=function(d,a,c){var e=this.buffer,b=this.index,f=this.i,g=e[b],h;c&&1<a&&(d=8<a?(N[d&255]<<24|N[d>>>8&255]<<16|N[d>>>16&255]<<8|N[d>>>24&255])>>32-a:N[d]>>8-a);if(8>a+f)g=g<<a|d,f+=a;else for(h=0;h<a;++h)g=g<<1|d>>a-h-1&1,8===++f&&(f=0,e[b++]=N[g],g=0,b===e.length&&(e=this.f()));e[b]=g;this.buffer=e;this.i=f;this.index=b};H.prototype.finish=function(){var d=this.buffer,a=this.index,c;0<this.i&&(d[a]<<=8-this.i,d[a]=N[d[a]],a++);F?c=d.subarray(0,a):(d.length=a,c=d);return c};
	var fa=new (F?Uint8Array:Array)(256),O;for(O=0;256>O;++O){for(var P=O,Q=P,ga=7,P=P>>>1;P;P>>>=1)Q<<=1,Q|=P&1,--ga;fa[O]=(Q<<ga&255)>>>0}var N=fa;function ha(d){this.buffer=new (F?Uint16Array:Array)(2*d);this.length=0}ha.prototype.getParent=function(d){return 2*((d-2)/4|0)};ha.prototype.push=function(d,a){var c,e,b=this.buffer,f;c=this.length;b[this.length++]=a;for(b[this.length++]=d;0<c;)if(e=this.getParent(c),b[c]>b[e])f=b[c],b[c]=b[e],b[e]=f,f=b[c+1],b[c+1]=b[e+1],b[e+1]=f,c=e;else break;return this.length};
	ha.prototype.pop=function(){var d,a,c=this.buffer,e,b,f;a=c[0];d=c[1];this.length-=2;c[0]=c[this.length];c[1]=c[this.length+1];for(f=0;;){b=2*f+2;if(b>=this.length)break;b+2<this.length&&c[b+2]>c[b]&&(b+=2);if(c[b]>c[f])e=c[f],c[f]=c[b],c[b]=e,e=c[f+1],c[f+1]=c[b+1],c[b+1]=e;else break;f=b}return{index:d,value:a,length:this.length}};function R(d){var a=d.length,c=0,e=Number.POSITIVE_INFINITY,b,f,g,h,k,n,q,r,p,m;for(r=0;r<a;++r)d[r]>c&&(c=d[r]),d[r]<e&&(e=d[r]);b=1<<c;f=new (F?Uint32Array:Array)(b);g=1;h=0;for(k=2;g<=c;){for(r=0;r<a;++r)if(d[r]===g){n=0;q=h;for(p=0;p<g;++p)n=n<<1|q&1,q>>=1;m=g<<16|r;for(p=n;p<b;p+=k)f[p]=m;++h}++g;h<<=1;k<<=1}return[f,c,e]};function ia(d,a){this.h=ma;this.w=0;this.input=F&&d instanceof Array?new Uint8Array(d):d;this.b=0;a&&(a.lazy&&(this.w=a.lazy),"number"===typeof a.compressionType&&(this.h=a.compressionType),a.outputBuffer&&(this.a=F&&a.outputBuffer instanceof Array?new Uint8Array(a.outputBuffer):a.outputBuffer),"number"===typeof a.outputIndex&&(this.b=a.outputIndex));this.a||(this.a=new (F?Uint8Array:Array)(32768))}var ma=2,na={NONE:0,r:1,k:ma,O:3},oa=[],S;
	for(S=0;288>S;S++)switch(x){case 143>=S:oa.push([S+48,8]);break;case 255>=S:oa.push([S-144+400,9]);break;case 279>=S:oa.push([S-256+0,7]);break;case 287>=S:oa.push([S-280+192,8]);break;default:l("invalid literal: "+S)}
	ia.prototype.j=function(){var d,a,c,e,b=this.input;switch(this.h){case 0:c=0;for(e=b.length;c<e;){a=F?b.subarray(c,c+65535):b.slice(c,c+65535);c+=a.length;var f=a,g=c===e,h=v,k=v,n=v,q=v,r=v,p=this.a,m=this.b;if(F){for(p=new Uint8Array(this.a.buffer);p.length<=m+f.length+5;)p=new Uint8Array(p.length<<1);p.set(this.a)}h=g?1:0;p[m++]=h|0;k=f.length;n=~k+65536&65535;p[m++]=k&255;p[m++]=k>>>8&255;p[m++]=n&255;p[m++]=n>>>8&255;if(F)p.set(f,m),m+=f.length,p=p.subarray(0,m);else{q=0;for(r=f.length;q<r;++q)p[m++]=
	f[q];p.length=m}this.b=m;this.a=p}break;case 1:var s=new H(F?new Uint8Array(this.a.buffer):this.a,this.b);s.d(1,1,x);s.d(1,2,x);var w=pa(this,b),y,ja,A;y=0;for(ja=w.length;y<ja;y++)if(A=w[y],H.prototype.d.apply(s,oa[A]),256<A)s.d(w[++y],w[++y],x),s.d(w[++y],5),s.d(w[++y],w[++y],x);else if(256===A)break;this.a=s.finish();this.b=this.a.length;break;case ma:var C=new H(F?new Uint8Array(this.a.buffer):this.a,this.b),Ea,M,U,V,W,gb=[16,17,18,0,8,7,9,6,10,5,11,4,12,3,13,2,14,1,15],ba,Fa,ca,Ga,ka,ra=Array(19),
	Ha,X,la,z,Ia;Ea=ma;C.d(1,1,x);C.d(Ea,2,x);M=pa(this,b);ba=qa(this.M,15);Fa=sa(ba);ca=qa(this.L,7);Ga=sa(ca);for(U=286;257<U&&0===ba[U-1];U--);for(V=30;1<V&&0===ca[V-1];V--);var Ja=U,Ka=V,I=new (F?Uint32Array:Array)(Ja+Ka),t,J,u,da,G=new (F?Uint32Array:Array)(316),E,B,K=new (F?Uint8Array:Array)(19);for(t=J=0;t<Ja;t++)I[J++]=ba[t];for(t=0;t<Ka;t++)I[J++]=ca[t];if(!F){t=0;for(da=K.length;t<da;++t)K[t]=0}t=E=0;for(da=I.length;t<da;t+=J){for(J=1;t+J<da&&I[t+J]===I[t];++J);u=J;if(0===I[t])if(3>u)for(;0<
	u--;)G[E++]=0,K[0]++;else for(;0<u;)B=138>u?u:138,B>u-3&&B<u&&(B=u-3),10>=B?(G[E++]=17,G[E++]=B-3,K[17]++):(G[E++]=18,G[E++]=B-11,K[18]++),u-=B;else if(G[E++]=I[t],K[I[t]]++,u--,3>u)for(;0<u--;)G[E++]=I[t],K[I[t]]++;else for(;0<u;)B=6>u?u:6,B>u-3&&B<u&&(B=u-3),G[E++]=16,G[E++]=B-3,K[16]++,u-=B}d=F?G.subarray(0,E):G.slice(0,E);ka=qa(K,7);for(z=0;19>z;z++)ra[z]=ka[gb[z]];for(W=19;4<W&&0===ra[W-1];W--);Ha=sa(ka);C.d(U-257,5,x);C.d(V-1,5,x);C.d(W-4,4,x);for(z=0;z<W;z++)C.d(ra[z],3,x);z=0;for(Ia=d.length;z<
	Ia;z++)if(X=d[z],C.d(Ha[X],ka[X],x),16<=X){z++;switch(X){case 16:la=2;break;case 17:la=3;break;case 18:la=7;break;default:l("invalid code: "+X)}C.d(d[z],la,x)}var La=[Fa,ba],Ma=[Ga,ca],L,Na,ea,ua,Oa,Pa,Qa,Ra;Oa=La[0];Pa=La[1];Qa=Ma[0];Ra=Ma[1];L=0;for(Na=M.length;L<Na;++L)if(ea=M[L],C.d(Oa[ea],Pa[ea],x),256<ea)C.d(M[++L],M[++L],x),ua=M[++L],C.d(Qa[ua],Ra[ua],x),C.d(M[++L],M[++L],x);else if(256===ea)break;this.a=C.finish();this.b=this.a.length;break;default:l("invalid compression type")}return this.a};
	function ta(d,a){this.length=d;this.H=a}
	var va=function(){function d(b){switch(x){case 3===b:return[257,b-3,0];case 4===b:return[258,b-4,0];case 5===b:return[259,b-5,0];case 6===b:return[260,b-6,0];case 7===b:return[261,b-7,0];case 8===b:return[262,b-8,0];case 9===b:return[263,b-9,0];case 10===b:return[264,b-10,0];case 12>=b:return[265,b-11,1];case 14>=b:return[266,b-13,1];case 16>=b:return[267,b-15,1];case 18>=b:return[268,b-17,1];case 22>=b:return[269,b-19,2];case 26>=b:return[270,b-23,2];case 30>=b:return[271,b-27,2];case 34>=b:return[272,
	b-31,2];case 42>=b:return[273,b-35,3];case 50>=b:return[274,b-43,3];case 58>=b:return[275,b-51,3];case 66>=b:return[276,b-59,3];case 82>=b:return[277,b-67,4];case 98>=b:return[278,b-83,4];case 114>=b:return[279,b-99,4];case 130>=b:return[280,b-115,4];case 162>=b:return[281,b-131,5];case 194>=b:return[282,b-163,5];case 226>=b:return[283,b-195,5];case 257>=b:return[284,b-227,5];case 258===b:return[285,b-258,0];default:l("invalid length: "+b)}}var a=[],c,e;for(c=3;258>=c;c++)e=d(c),a[c]=e[2]<<24|e[1]<<
	16|e[0];return a}(),wa=F?new Uint32Array(va):va;
	function pa(d,a){function c(b,c){var a=b.H,d=[],e=0,f;f=wa[b.length];d[e++]=f&65535;d[e++]=f>>16&255;d[e++]=f>>24;var g;switch(x){case 1===a:g=[0,a-1,0];break;case 2===a:g=[1,a-2,0];break;case 3===a:g=[2,a-3,0];break;case 4===a:g=[3,a-4,0];break;case 6>=a:g=[4,a-5,1];break;case 8>=a:g=[5,a-7,1];break;case 12>=a:g=[6,a-9,2];break;case 16>=a:g=[7,a-13,2];break;case 24>=a:g=[8,a-17,3];break;case 32>=a:g=[9,a-25,3];break;case 48>=a:g=[10,a-33,4];break;case 64>=a:g=[11,a-49,4];break;case 96>=a:g=[12,a-
	65,5];break;case 128>=a:g=[13,a-97,5];break;case 192>=a:g=[14,a-129,6];break;case 256>=a:g=[15,a-193,6];break;case 384>=a:g=[16,a-257,7];break;case 512>=a:g=[17,a-385,7];break;case 768>=a:g=[18,a-513,8];break;case 1024>=a:g=[19,a-769,8];break;case 1536>=a:g=[20,a-1025,9];break;case 2048>=a:g=[21,a-1537,9];break;case 3072>=a:g=[22,a-2049,10];break;case 4096>=a:g=[23,a-3073,10];break;case 6144>=a:g=[24,a-4097,11];break;case 8192>=a:g=[25,a-6145,11];break;case 12288>=a:g=[26,a-8193,12];break;case 16384>=
	a:g=[27,a-12289,12];break;case 24576>=a:g=[28,a-16385,13];break;case 32768>=a:g=[29,a-24577,13];break;default:l("invalid distance")}f=g;d[e++]=f[0];d[e++]=f[1];d[e++]=f[2];var h,k;h=0;for(k=d.length;h<k;++h)p[m++]=d[h];w[d[0]]++;y[d[3]]++;s=b.length+c-1;r=null}var e,b,f,g,h,k={},n,q,r,p=F?new Uint16Array(2*a.length):[],m=0,s=0,w=new (F?Uint32Array:Array)(286),y=new (F?Uint32Array:Array)(30),ja=d.w,A;if(!F){for(f=0;285>=f;)w[f++]=0;for(f=0;29>=f;)y[f++]=0}w[256]=1;e=0;for(b=a.length;e<b;++e){f=h=0;
	for(g=3;f<g&&e+f!==b;++f)h=h<<8|a[e+f];k[h]===v&&(k[h]=[]);n=k[h];if(!(0<s--)){for(;0<n.length&&32768<e-n[0];)n.shift();if(e+3>=b){r&&c(r,-1);f=0;for(g=b-e;f<g;++f)A=a[e+f],p[m++]=A,++w[A];break}0<n.length?(q=xa(a,e,n),r?r.length<q.length?(A=a[e-1],p[m++]=A,++w[A],c(q,0)):c(r,-1):q.length<ja?r=q:c(q,0)):r?c(r,-1):(A=a[e],p[m++]=A,++w[A])}n.push(e)}p[m++]=256;w[256]++;d.M=w;d.L=y;return F?p.subarray(0,m):p}
	function xa(d,a,c){var e,b,f=0,g,h,k,n,q=d.length;h=0;n=c.length;a:for(;h<n;h++){e=c[n-h-1];g=3;if(3<f){for(k=f;3<k;k--)if(d[e+k-1]!==d[a+k-1])continue a;g=f}for(;258>g&&a+g<q&&d[e+g]===d[a+g];)++g;g>f&&(b=e,f=g);if(258===g)break}return new ta(f,a-b)}
	function qa(d,a){var c=d.length,e=new ha(572),b=new (F?Uint8Array:Array)(c),f,g,h,k,n;if(!F)for(k=0;k<c;k++)b[k]=0;for(k=0;k<c;++k)0<d[k]&&e.push(k,d[k]);f=Array(e.length/2);g=new (F?Uint32Array:Array)(e.length/2);if(1===f.length)return b[e.pop().index]=1,b;k=0;for(n=e.length/2;k<n;++k)f[k]=e.pop(),g[k]=f[k].value;h=ya(g,g.length,a);k=0;for(n=f.length;k<n;++k)b[f[k].index]=h[k];return b}
	function ya(d,a,c){function e(b){var c=k[b][n[b]];c===a?(e(b+1),e(b+1)):--g[c];++n[b]}var b=new (F?Uint16Array:Array)(c),f=new (F?Uint8Array:Array)(c),g=new (F?Uint8Array:Array)(a),h=Array(c),k=Array(c),n=Array(c),q=(1<<c)-a,r=1<<c-1,p,m,s,w,y;b[c-1]=a;for(m=0;m<c;++m)q<r?f[m]=0:(f[m]=1,q-=r),q<<=1,b[c-2-m]=(b[c-1-m]/2|0)+a;b[0]=f[0];h[0]=Array(b[0]);k[0]=Array(b[0]);for(m=1;m<c;++m)b[m]>2*b[m-1]+f[m]&&(b[m]=2*b[m-1]+f[m]),h[m]=Array(b[m]),k[m]=Array(b[m]);for(p=0;p<a;++p)g[p]=c;for(s=0;s<b[c-1];++s)h[c-
	1][s]=d[s],k[c-1][s]=s;for(p=0;p<c;++p)n[p]=0;1===f[c-1]&&(--g[0],++n[c-1]);for(m=c-2;0<=m;--m){w=p=0;y=n[m+1];for(s=0;s<b[m];s++)w=h[m+1][y]+h[m+1][y+1],w>d[p]?(h[m][s]=w,k[m][s]=a,y+=2):(h[m][s]=d[p],k[m][s]=p,++p);n[m]=0;1===f[m]&&e(m)}return g}
	function sa(d){var a=new (F?Uint16Array:Array)(d.length),c=[],e=[],b=0,f,g,h,k;f=0;for(g=d.length;f<g;f++)c[d[f]]=(c[d[f]]|0)+1;f=1;for(g=16;f<=g;f++)e[f]=b,b+=c[f]|0,b<<=1;f=0;for(g=d.length;f<g;f++){b=e[d[f]];e[d[f]]+=1;h=a[f]=0;for(k=d[f];h<k;h++)a[f]=a[f]<<1|b&1,b>>>=1}return a};function T(d,a){this.l=[];this.m=32768;this.e=this.g=this.c=this.q=0;this.input=F?new Uint8Array(d):d;this.s=!1;this.n=za;this.C=!1;if(a||!(a={}))a.index&&(this.c=a.index),a.bufferSize&&(this.m=a.bufferSize),a.bufferType&&(this.n=a.bufferType),a.resize&&(this.C=a.resize);switch(this.n){case Aa:this.b=32768;this.a=new (F?Uint8Array:Array)(32768+this.m+258);break;case za:this.b=0;this.a=new (F?Uint8Array:Array)(this.m);this.f=this.K;this.t=this.I;this.o=this.J;break;default:l(Error("invalid inflate mode"))}}
	var Aa=0,za=1,Ba={F:Aa,D:za};
	T.prototype.p=function(){for(;!this.s;){var d=Y(this,3);d&1&&(this.s=x);d>>>=1;switch(d){case 0:var a=this.input,c=this.c,e=this.a,b=this.b,f=a.length,g=v,h=v,k=e.length,n=v;this.e=this.g=0;c+1>=f&&l(Error("invalid uncompressed block header: LEN"));g=a[c++]|a[c++]<<8;c+1>=f&&l(Error("invalid uncompressed block header: NLEN"));h=a[c++]|a[c++]<<8;g===~h&&l(Error("invalid uncompressed block header: length verify"));c+g>a.length&&l(Error("input buffer is broken"));switch(this.n){case Aa:for(;b+g>e.length;){n=
	k-b;g-=n;if(F)e.set(a.subarray(c,c+n),b),b+=n,c+=n;else for(;n--;)e[b++]=a[c++];this.b=b;e=this.f();b=this.b}break;case za:for(;b+g>e.length;)e=this.f({v:2});break;default:l(Error("invalid inflate mode"))}if(F)e.set(a.subarray(c,c+g),b),b+=g,c+=g;else for(;g--;)e[b++]=a[c++];this.c=c;this.b=b;this.a=e;break;case 1:this.o(Ca,Da);break;case 2:Sa(this);break;default:l(Error("unknown BTYPE: "+d))}}return this.t()};
	var Ta=[16,17,18,0,8,7,9,6,10,5,11,4,12,3,13,2,14,1,15],Ua=F?new Uint16Array(Ta):Ta,Va=[3,4,5,6,7,8,9,10,11,13,15,17,19,23,27,31,35,43,51,59,67,83,99,115,131,163,195,227,258,258,258],Wa=F?new Uint16Array(Va):Va,Xa=[0,0,0,0,0,0,0,0,1,1,1,1,2,2,2,2,3,3,3,3,4,4,4,4,5,5,5,5,0,0,0],Ya=F?new Uint8Array(Xa):Xa,Za=[1,2,3,4,5,7,9,13,17,25,33,49,65,97,129,193,257,385,513,769,1025,1537,2049,3073,4097,6145,8193,12289,16385,24577],$a=F?new Uint16Array(Za):Za,ab=[0,0,0,0,1,1,2,2,3,3,4,4,5,5,6,6,7,7,8,8,9,9,10,
	10,11,11,12,12,13,13],bb=F?new Uint8Array(ab):ab,cb=new (F?Uint8Array:Array)(288),Z,db;Z=0;for(db=cb.length;Z<db;++Z)cb[Z]=143>=Z?8:255>=Z?9:279>=Z?7:8;var Ca=R(cb),eb=new (F?Uint8Array:Array)(30),fb,hb;fb=0;for(hb=eb.length;fb<hb;++fb)eb[fb]=5;var Da=R(eb);function Y(d,a){for(var c=d.g,e=d.e,b=d.input,f=d.c,g=b.length,h;e<a;)f>=g&&l(Error("input buffer is broken")),c|=b[f++]<<e,e+=8;h=c&(1<<a)-1;d.g=c>>>a;d.e=e-a;d.c=f;return h}
	function ib(d,a){for(var c=d.g,e=d.e,b=d.input,f=d.c,g=b.length,h=a[0],k=a[1],n,q;e<k&&!(f>=g);)c|=b[f++]<<e,e+=8;n=h[c&(1<<k)-1];q=n>>>16;d.g=c>>q;d.e=e-q;d.c=f;return n&65535}
	function Sa(d){function a(a,b,c){var d,e=this.z,f,g;for(g=0;g<a;)switch(d=ib(this,b),d){case 16:for(f=3+Y(this,2);f--;)c[g++]=e;break;case 17:for(f=3+Y(this,3);f--;)c[g++]=0;e=0;break;case 18:for(f=11+Y(this,7);f--;)c[g++]=0;e=0;break;default:e=c[g++]=d}this.z=e;return c}var c=Y(d,5)+257,e=Y(d,5)+1,b=Y(d,4)+4,f=new (F?Uint8Array:Array)(Ua.length),g,h,k,n;for(n=0;n<b;++n)f[Ua[n]]=Y(d,3);if(!F){n=b;for(b=f.length;n<b;++n)f[Ua[n]]=0}g=R(f);h=new (F?Uint8Array:Array)(c);k=new (F?Uint8Array:Array)(e);
	d.z=0;d.o(R(a.call(d,c,g,h)),R(a.call(d,e,g,k)))}T.prototype.o=function(d,a){var c=this.a,e=this.b;this.u=d;for(var b=c.length-258,f,g,h,k;256!==(f=ib(this,d));)if(256>f)e>=b&&(this.b=e,c=this.f(),e=this.b),c[e++]=f;else{g=f-257;k=Wa[g];0<Ya[g]&&(k+=Y(this,Ya[g]));f=ib(this,a);h=$a[f];0<bb[f]&&(h+=Y(this,bb[f]));e>=b&&(this.b=e,c=this.f(),e=this.b);for(;k--;)c[e]=c[e++-h]}for(;8<=this.e;)this.e-=8,this.c--;this.b=e};
	T.prototype.J=function(d,a){var c=this.a,e=this.b;this.u=d;for(var b=c.length,f,g,h,k;256!==(f=ib(this,d));)if(256>f)e>=b&&(c=this.f(),b=c.length),c[e++]=f;else{g=f-257;k=Wa[g];0<Ya[g]&&(k+=Y(this,Ya[g]));f=ib(this,a);h=$a[f];0<bb[f]&&(h+=Y(this,bb[f]));e+k>b&&(c=this.f(),b=c.length);for(;k--;)c[e]=c[e++-h]}for(;8<=this.e;)this.e-=8,this.c--;this.b=e};
	T.prototype.f=function(){var d=new (F?Uint8Array:Array)(this.b-32768),a=this.b-32768,c,e,b=this.a;if(F)d.set(b.subarray(32768,d.length));else{c=0;for(e=d.length;c<e;++c)d[c]=b[c+32768]}this.l.push(d);this.q+=d.length;if(F)b.set(b.subarray(a,a+32768));else for(c=0;32768>c;++c)b[c]=b[a+c];this.b=32768;return b};
	T.prototype.K=function(d){var a,c=this.input.length/this.c+1|0,e,b,f,g=this.input,h=this.a;d&&("number"===typeof d.v&&(c=d.v),"number"===typeof d.G&&(c+=d.G));2>c?(e=(g.length-this.c)/this.u[2],f=258*(e/2)|0,b=f<h.length?h.length+f:h.length<<1):b=h.length*c;F?(a=new Uint8Array(b),a.set(h)):a=h;return this.a=a};
	T.prototype.t=function(){var d=0,a=this.a,c=this.l,e,b=new (F?Uint8Array:Array)(this.q+(this.b-32768)),f,g,h,k;if(0===c.length)return F?this.a.subarray(32768,this.b):this.a.slice(32768,this.b);f=0;for(g=c.length;f<g;++f){e=c[f];h=0;for(k=e.length;h<k;++h)b[d++]=e[h]}f=32768;for(g=this.b;f<g;++f)b[d++]=a[f];this.l=[];return this.buffer=b};
	T.prototype.I=function(){var d,a=this.b;F?this.C?(d=new Uint8Array(a),d.set(this.a.subarray(0,a))):d=this.a.subarray(0,a):(this.a.length>a&&(this.a.length=a),d=this.a);return this.buffer=d};function jb(d){if("string"===typeof d){var a=d.split(""),c,e;c=0;for(e=a.length;c<e;c++)a[c]=(a[c].charCodeAt(0)&255)>>>0;d=a}for(var b=1,f=0,g=d.length,h,k=0;0<g;){h=1024<g?1024:g;g-=h;do b+=d[k++],f+=b;while(--h);b%=65521;f%=65521}return(f<<16|b)>>>0};function kb(d,a){var c,e;this.input=d;this.c=0;if(a||!(a={}))a.index&&(this.c=a.index),a.verify&&(this.N=a.verify);c=d[this.c++];e=d[this.c++];switch(c&15){case lb:this.method=lb;break;default:l(Error("unsupported compression method"))}0!==((c<<8)+e)%31&&l(Error("invalid fcheck flag:"+((c<<8)+e)%31));e&32&&l(Error("fdict flag is not supported"));this.B=new T(d,{index:this.c,bufferSize:a.bufferSize,bufferType:a.bufferType,resize:a.resize})}
	kb.prototype.p=function(){var d=this.input,a,c;a=this.B.p();this.c=this.B.c;this.N&&(c=(d[this.c++]<<24|d[this.c++]<<16|d[this.c++]<<8|d[this.c++])>>>0,c!==jb(a)&&l(Error("invalid adler-32 checksum")));return a};var lb=8;function mb(d,a){this.input=d;this.a=new (F?Uint8Array:Array)(32768);this.h=$.k;var c={},e;if((a||!(a={}))&&"number"===typeof a.compressionType)this.h=a.compressionType;for(e in a)c[e]=a[e];c.outputBuffer=this.a;this.A=new ia(this.input,c)}var $=na;
	mb.prototype.j=function(){var d,a,c,e,b,f,g,h=0;g=this.a;d=lb;switch(d){case lb:a=Math.LOG2E*Math.log(32768)-8;break;default:l(Error("invalid compression method"))}c=a<<4|d;g[h++]=c;switch(d){case lb:switch(this.h){case $.NONE:b=0;break;case $.r:b=1;break;case $.k:b=2;break;default:l(Error("unsupported compression type"))}break;default:l(Error("invalid compression method"))}e=b<<6|0;g[h++]=e|31-(256*c+e)%31;f=jb(this.input);this.A.b=h;g=this.A.j();h=g.length;F&&(g=new Uint8Array(g.buffer),g.length<=
	h+4&&(this.a=new Uint8Array(g.length+4),this.a.set(g),g=this.a),g=g.subarray(0,h+4));g[h++]=f>>24&255;g[h++]=f>>16&255;g[h++]=f>>8&255;g[h++]=f&255;return g};function nb(d,a){var c,e,b,f;if(Object.keys)c=Object.keys(a);else for(e in c=[],b=0,a)c[b++]=e;b=0;for(f=c.length;b<f;++b)e=c[b],D(d+"."+e,a[e])};D("Zlib.Inflate",kb);D("Zlib.Inflate.prototype.decompress",kb.prototype.p);nb("Zlib.Inflate.BufferType",{ADAPTIVE:Ba.D,BLOCK:Ba.F});D("Zlib.Deflate",mb);D("Zlib.Deflate.compress",function(d,a){return(new mb(d,a)).j()});D("Zlib.Deflate.prototype.compress",mb.prototype.j);nb("Zlib.Deflate.CompressionType",{NONE:$.NONE,FIXED:$.r,DYNAMIC:$.k});}).call(window);
	if (true) {
	  module.exports = Zlib;
	}


/***/ },
/* 34 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * PNG Encoder from data-demo
	 * https://code.google.com/p/data-demo/
	 *
	 * @author mccalluc@yahoo.com
	 * @license MIT
	 */
	
	var Zlib = __webpack_require__(33);
	
	var png = {};
	
	png.Bytes = function(data, optional) {
	  var datum, i;
	  this.array = [];
	
	  if (!optional) {
	
	    if (data instanceof Array || data instanceof Uint8Array) {
	      for (i = 0; i < data.length; i++) {
	        datum = data[i];
	        if (datum !== null) { // nulls and undefineds are silently skipped.
	          if (typeof datum !== "number") {
	            throw new Error("Expected number, not "+(typeof datum));
	          } else if (Math.floor(datum) != datum) {
	            throw new Error("Expected integer, not "+datum);
	          } else if (datum < 0 || datum > 255) {
	            throw new Error("Expected integer in [0,255], not "+datum);
	          }
	          this.array.push(datum);
	        }
	      }
	    }
	
	    else if (typeof data == "string") {
	      for (i = 0; i < data.length; i++) {
	        datum = data.charCodeAt(i);
	        if (datum < 0 || datum > 255) {
	          throw new Error("Characters above 255 not allowed without explicit encoding: "+datum);
	        }
	        this.array.push(datum);
	      }
	    }
	
	    else if (data instanceof png.Bytes) {
	      this.array.push.apply(this.array, data.array);
	    }
	
	    else if (typeof data == "number") {
	        return new png.Bytes([data]);
	    }
	
	    else {
	      throw new Error("Unexpected data type: "+data);
	    }
	
	  }
	
	  else { // optional is defined.
	
	    // TODO: generalize when generalization is required.
	    if (typeof data == "number" &&
	        Math.floor(data) == data &&
	        data >= 0 &&
	        (optional.bytes in {4:1, 2:1}) &&
	        // don't change this last one to bit shifts: in JS, 0x100 << 24 == 0.
	        data < Math.pow(256, optional.bytes)) {
	      this.array = [
	        (data & 0xFF000000) >>> 24,
	        (data & 0x00FF0000) >>> 16,
	        (data & 0x0000FF00) >>> 8,
	        (data & 0x000000FF)
	      ].slice(-optional.bytes);
	    }
	
	    else throw new Error("Unexpected data/optional args combination: "+data);
	
	  }
	};
	
	png.Bytes.prototype.add = function(data, optional) {
	  // Takes the same arguments as the constructor,
	  // but appends the new data instead, and returns the modified object.
	  // (suitable for chaining.)
	  this.array.push.apply(this.array, new png.Bytes(data, optional).array);
	  return this;
	};
	
	png.Bytes.prototype.chunk = function(n) {
	  // Split the array into chunks of length n.
	  // Returns an array of arrays.
	  var buffer = [];
	  for (var i = 0; i < this.array.length; i += n) {
	    var slice = this.array.slice(i, i+n);
	    buffer.push(this.array.slice(i, i+n));
	  }
	  return buffer;
	};
	
	png.Bytes.prototype.toString = function(n) {
	  // one optional argument specifies line length in bytes.
	  // returns a hex dump of the Bytes object.
	  var chunks = this.chunk(n || 8);
	  var byte;
	  var lines = [];
	  var hex;
	  var chr;
	  for (var i = 0; i < chunks.length; i++) {
	    hex = [];
	    chr = [];
	    for (var j = 0; j < chunks[i].length; j++) {
	      byte = chunks[i][j];
	      hex.push(
	        ((byte < 16) ? "0" : "") +
	        byte.toString(16)
	      );
	      chr.push(
	        (byte >=32 && byte <= 126 ) ?
	          String.fromCharCode(byte)
	          : "_"
	      );
	    }
	    lines.push(hex.join(" ")+"  "+chr.join(""));
	  }
	  return lines.join("\n");
	};
	
	png.Bytes.prototype.serialize = function() {
	  // returns a string whose char codes correspond to the bytes of the array.
	  // TODO: get rid of this once transition is complete?
	  return String.fromCharCode.apply(null, this.array);
	};
	
	png.fromRaster = function(raster, optional_palette, optional_transparency) {
	  // Given a Raster object,
	  // and optionally a list of rgb triples,
	  // and optionally a corresponding list of transparency values (0: clear - 255: opaque)
	  // return the corresponding PNG as a Bytes object.
	
	  var signature = new png.Bytes([
	    137, 80 /* P */, 78 /* N */, 71 /* G */, 13, 10, 26, 10
	  ]);
	  var ihdr = new png.Chunk.IHDR(raster.width, raster.height, raster.bit_depth, raster.color_type);
	  var plte = (optional_palette instanceof Array) ?
	    new png.Chunk.PLTE(optional_palette) :
	    new png.Bytes([]);
	  var trns = (optional_transparency instanceof Array) ?
	    new png.Chunk.tRNS(optional_transparency) :
	    new png.Bytes([]);
	  var idat = new png.Chunk.IDAT(raster);
	  var iend = new png.Chunk.IEND(); // intentionally blank
	
	  // order matters.
	  return signature.add(ihdr).add(plte).add(trns).add(idat).add(iend);
	};
	
	png.encode = function(raster, bit_depth, color_type, optional_palette, optional_transparency) {
	  if (color_type === 0 || color_type === 3) {
	    raster = new png.Raster(bit_depth, color_type, raster);
	  } else if (color_type === 2 || color_type === 6) {
	    raster = new png.Raster_rgb(bit_depth, color_type, raster);
	  }
	  return png.fromRaster(raster, optional_palette, optional_transparency);
	};
	
	png.Chunk = function(type, data) {
	  // given a four character type, and Bytes,
	  // calculates the length and the checksum, and creates
	  // a Bytes object for that png chunk.
	
	  if (!type.match(/^[A-Za-z]{4}$/)) {
	    throw new Error("Creating PNG chunk: provided type should be four letters, not "+type);
	  }
	
	  if (!(data instanceof png.Bytes)) {
	    throw new Error("Creating PNG "+type+" chunk: provided data is not Bytes: "+data);
	  }
	
	    // CRC calculations are a literal translation of the C code at
	  // http://www.libpng.org/pub/png/spec/1.0/PNG-CRCAppendix.html
	  if (!png.crc_table) {
	    png.crc_table = []; // Table of CRCs of all 8-bit messages.
	    for (var n = 0; n < 256; n++) {
	      var c = n;
	      for (var k = 0; k < 8; k++) {
	        if (c & 1) {
	          c = 0xedb88320 ^ (c >>> 1); // C ">>" is JS ">>>"
	        } else {
	          c = c >>> 1; // C ">>" is JS ">>>"
	        }
	      }
	      png.crc_table[n] = c;
	    }
	  }
	
	  function update_crc(crc, buffer) {
	    // Update a running CRC with the buffer--the CRC
	    // should be initialized to all 1's, and the transmitted value
	    // is the 1's complement of the final running CRC
	    var c = crc;
	    var n;
	    for (n = 0; n < buffer.length; n++) {
	      c = png.crc_table[(c ^ buffer[n]) & 0xff] ^ (c >>> 8); // C ">>" is JS ">>>"
	    }
	    return c;
	  }
	
	  var type_and_data = new png.Bytes(type).add(data);
	  var crc = (update_crc(0xffffffff, type_and_data.array) ^ 0xffffffff)>>>0;
	  // >>>0 converts to unsigned, without changing the bits.
	
	  var length_type_data_checksum =
	    new png.Bytes(data.array.length,{bytes:4})
	    .add(type_and_data)
	    .add(crc,{bytes:4});
	
	  return length_type_data_checksum;
	};
	
	png.Chunk.IHDR = function(width, height, bit_depth, color_type) {
	  if (!(
	        // grayscale
	        (color_type === 0) && (bit_depth in {1:1, 2:1, 4:1, 8:1, 16:1}) ||
	        // rgb
	        (color_type === 2) && (bit_depth in {8:1, 16:1}) ||
	        // palette
	        (color_type === 3) && (bit_depth in {1:1, 2:1, 4:1, 8:1}) ||
	        // grayscale + alpha
	        (color_type === 4) && (bit_depth in {8:1, 16:1}) ||
	        // rgb + alpha
	        (color_type ===  6) && (bit_depth in {8:1, 16:1})
	        // http://www.libpng.org/pub/png/spec/1.0/PNG-Chunks.html#C.IHDR
	        )) {
	    throw new Error("Invalid color type ("+color_type+") / bit depth ("+bit_depth+") combo");
	  }
	  return new png.Chunk(
	    "IHDR",
	    new png.Bytes(width,{bytes:4})
	      .add(height,{bytes:4})
	      .add([
	        bit_depth,
	        color_type,
	        0, // compression method
	        0, // filter method
	        0  // interlace method
	      ])
	  );
	};
	
	png.Chunk.PLTE = function(rgb_list) {
	  // given a list of RGB triples,
	  // returns the corresponding PNG PLTE (palette) chunk.
	  for (var i = 0, ii = rgb_list.length; i < ii; i++) {
	    var triple = rgb_list[i];
	    if (triple.length !== 3) {
	      throw new Error("This is not a valid RGB triple: "+triple);
	    }
	  }
	  return new png.Chunk(
	    "PLTE",
	    new png.Bytes(Array.prototype.concat.apply([], rgb_list))
	  );
	};
	
	png.Chunk.tRNS = function(alpha_list) {
	  // given a list of alpha values corresponding to the palette entries,
	  // returns the corresponding PNG tRNS (transparency) chunk.
	  return new png.Chunk(
	    "tRNS",
	    new png.Bytes(alpha_list)
	  );
	};
	
	png.Raster = function(bit_depth, color_type, raster) {
	  // takes an array of arrays of greyscale or palette values.
	  // provides encode(), which returns bytes ready for a PNG IDAT chunk.
	
	  // validate depth and type
	  if (color_type !== 0 && color_type !== 3) throw new Error("Color type "+color_type+" is unsupported.");
	  if (bit_depth > 8) throw new Error("Bit depths greater than 8 are unsupported.");
	
	  this.bit_depth = bit_depth;
	  this.color_type = color_type;
	
	  // validate raster data.
	  var max_value = (1 << bit_depth) - 1;
	  var cols = raster[0].length;
	  for (var row = 0; row < raster.length; row++) {
	    if (raster[row].length != cols)
	      throw new Error("Row "+row+" does not have the expected "+cols+" columns.");
	    for (var col = 0; col < cols; col++) {
	      if (!(raster[row][col] >= 0 && raster[row][col] <= max_value))
	        throw new Error("Image data ("+raster[row][col]+") out of bounds at ("+row+","+col+")");
	    }
	  }
	
	  this.height = raster.length;
	  this.width = cols;
	
	  this.encode = function() {
	    // Returns the image data as a single array of bytes, using filter method 0.
	    var buffer = [];
	    for (var row = 0; row < raster.length; row++) {
	      buffer.push(0); // each row gets filter type 0.
	      for (var col = 0; col < cols; col += 8/bit_depth) {
	        var byte = 0;
	        for (var sub = 0; sub < 8/bit_depth; sub++) {
	          byte <<= bit_depth;
	          if (col + sub < cols) {
	            byte |= raster[row][col+sub];
	          }
	        }
	        if (byte & ~0xFF) throw new Error("Encoded raster byte out of bounds at ("+row+","+col+")");
	        buffer.push(byte);
	      }
	    }
	    return buffer;
	  };
	};
	
	png.Raster_rgb = function(bit_depth, color_type, raster) {
	  // takes an array of arrays of RGB triples.
	  // provides encode(), which returns bytes ready for a PNG IDAT chunk.
	
	  // validate depth and type
	  if (color_type != 2 && color_type != 6) throw new Error("Only color types 2 and 6 for RGB.");
	  if (bit_depth != 8) throw new Error("Bit depths other than 8 are unsupported for RGB.");
	
	  this.bit_depth = bit_depth;
	  this.color_type = color_type;
	
	  // validate raster data.
	  var cols = raster[0].length;
	  for (var row = 0; row < raster.length; row++) {
	    if (raster[row].length != cols) {
	      throw new Error("Row "+row+" does not have the expected "+cols+" columns.");
	    }
	    for (var col = 0; col < cols; col++) {
	      if (!(color_type == 2 && raster[row][col].length == 3) &&
	          !(color_type == 6 && raster[row][col].length == 4)) {
	        throw new Error("Not RGB[A] at ("+row+","+col+")");
	      }
	      for (var i = 0; i < (color_type == 2 ? 3 : 4); i++) {
	        if (raster[row][col][i]<0 || raster[row][col][i]>255) {
	          throw new Error("RGB out of range at ("+row+","+col+")");
	        }
	      }
	    }
	  }
	
	  this.height = raster.length;
	  this.width = cols;
	
	  this.encode = function() {
	    // Returns the image data as a single array of bytes, using filter method 0.
	    var buffer = [];
	    for (var row = 0; row < raster.length; row++) {
	      buffer.push(0); // each row gets filter type 0.
	      for (var col = 0; col < cols; col++) {
	        buffer.push.apply(buffer, raster[row][col]);
	      }
	    }
	    return buffer;
	  };
	};
	
	png.Chunk.IDAT = function(raster) {
	  var encoded = raster.encode();
	  var zipped = new Zlib.Deflate(encoded).compress();
	  return new png.Chunk("IDAT", new png.Bytes(zipped));
	};
	
	png.Chunk.IEND = function() {
	  return new png.Chunk("IEND", new png.Bytes([]));
	};
	
	if (true) {
	  module.exports = png;
	}


/***/ },
/* 35 */
/***/ function(module, exports, __webpack_require__) {

	var util2 = __webpack_require__(7);
	var myutil = __webpack_require__(8);
	var Emitter = __webpack_require__(13);
	var Platform = __webpack_require__(9);
	var WindowStack = __webpack_require__(23);
	var Window = __webpack_require__(24);
	var simply = __webpack_require__(18);
	
	var defaults = {
	  status: true,
	  backgroundColor: 'white',
	  textColor: 'black',
	  highlightBackgroundColor: 'black',
	  highlightTextColor: 'white',
	};
	
	var Menu = function(menuDef) {
	  Window.call(this, myutil.shadow(defaults, menuDef || {}));
	  this._dynamic = false;
	  this._sections = {};
	  this._selection = { sectionIndex: 0, itemIndex: 0 };
	  this._selections = [];
	};
	
	Menu._codeName = 'menu';
	
	util2.inherit(Menu, Window);
	
	util2.copy(Emitter.prototype, Menu.prototype);
	
	Menu.prototype._show = function() {
	  Window.prototype._show.apply(this, arguments);
	  this._select();
	};
	
	Menu.prototype._select = function() {
	  if (this === WindowStack.top()) {
	    var select = this._selection;
	    simply.impl.menuSelection(select.sectionIndex, select.itemIndex);
	  }
	};
	
	Menu.prototype._numPreloadItems = (Platform.version() === 'aplite' ? 5 : 50);
	
	Menu.prototype._prop = function(state, clear, pushing) {
	  if (this === WindowStack.top()) {
	    this._resolveMenu(clear, pushing);
	    this._resolveSection(this._selection);
	  }
	};
	
	Menu.prototype.action = function() {
	  throw new Error("Menus don't support action bars.");
	};
	
	Menu.prototype.buttonConfig = function() {
	  throw new Error("Menus don't support changing button configurations.");
	};
	
	Menu.prototype._buttonAutoConfig = function() {};
	
	Menu.prototype._getMetaSection = function(sectionIndex) {
	  return (this._sections[sectionIndex] || ( this._sections[sectionIndex] = {} ));
	};
	
	Menu.prototype._getSections = function() {
	  var sections = this.state.sections;
	  if (sections instanceof Array) {
	    return sections;
	  }
	  if (typeof sections === 'number') {
	    sections = new Array(sections);
	    return (this.state.sections = sections);
	  }
	  if (typeof sections === 'function') {
	    this.sectionsProvider = this.state.sections;
	    delete this.state.sections;
	  }
	  if (this.sectionsProvider) {
	    sections = this.sectionsProvider.call(this);
	    if (sections) {
	      this.state.sections = sections;
	      return this._getSections();
	    }
	  }
	  return (this.state.sections = []);
	};
	
	Menu.prototype._getSection = function(e, create) {
	  var sections = this._getSections();
	  var section = sections[e.sectionIndex];
	  if (section) {
	    return section;
	  }
	  if (this.sectionProvider) {
	    section = this.sectionProvider.call(this, e);
	    if (section) {
	      return (sections[e.sectionIndex] = section);
	    }
	  }
	  if (!create) { return; }
	  return (sections[e.sectionIndex] = {});
	};
	
	Menu.prototype._getItems = function(e, create) {
	  var section = this._getSection(e, create);
	  if (!section) {
	    if (e.sectionIndex > 0) { return; }
	    section = this.state.sections[0] = {};
	  }
	  if (section.items instanceof Array) {
	    return section.items;
	  }
	  if (typeof section.items === 'number') {
	    return (section.items = new Array(section.items));
	  }
	  if (typeof section.items === 'function') {
	    this._sections[e.sectionIndex] = section.items;
	    delete section.items;
	  }
	  var itemsProvider = this._getMetaSection(e.sectionIndex).items || this.itemsProvider;
	  if (itemsProvider) {
	    var items = itemsProvider.call(this, e);
	    if (items) {
	      section.items = items;
	      return this._getItems(e, create);
	    }
	  }
	  return (section.items = []);
	};
	
	Menu.prototype._getItem = function(e, create) {
	  var items = this._getItems(e, create);
	  var item = items[e.itemIndex];
	  if (item) {
	    return item;
	  }
	  var itemProvider = this._getMetaSection(e.sectionIndex).item || this.itemProvider;
	  if (itemProvider) {
	    item = itemProvider.call(this, e);
	    if (item) {
	      return (items[e.itemIndex] = item);
	    }
	  }
	  if (!create) { return; }
	  return (items[e.itemIndex] = {});
	};
	
	Menu.prototype._resolveMenu = function(clear, pushing) {
	  var sections = this._getSections(this);
	  if (this === WindowStack.top()) {
	    simply.impl.menu(this.state, clear, pushing);
	    return true;
	  }
	};
	
	Menu.prototype._resolveSection = function(e, clear) {
	  var section = this._getSection(e);
	  if (!section) { return; }
	  section = myutil.shadow({
	    textColor: this.state.textColor, 
	    backgroundColor: this.state.backgroundColor
	  }, section);
	  section.items = this._getItems(e);
	  if (this === WindowStack.top()) {
	    simply.impl.menuSection.call(this, e.sectionIndex, section, clear);
	    var select = this._selection;
	    if (select.sectionIndex === e.sectionIndex) {
	      this._preloadItems(select);
	    }
	    return true;
	  }
	};
	
	Menu.prototype._resolveItem = function(e) {
	  var item = this._getItem(e);
	  if (!item) { return; }
	  if (this === WindowStack.top()) {
	    simply.impl.menuItem.call(this, e.sectionIndex, e.itemIndex, item);
	    return true;
	  }
	};
	
	Menu.prototype._preloadItems = function(e) {
	  var select = util2.copy(e);
	  select.itemIndex = Math.max(0, select.itemIndex - Math.floor(this._numPreloadItems / 2));
	  for (var i = 0; i < this._numPreloadItems; ++i) {
	    this._resolveItem(select);
	    select.itemIndex++;
	  }
	};
	
	Menu.prototype._emitSelect = function(e) {
	  this._selection = e;
	  var item = this._getItem(e);
	  switch (e.type) {
	    case 'select':
	      if (item && typeof item.select === 'function') {
	        if (item.select(e) === false) {
	          return false;
	        }
	      }
	      break;
	    case 'longSelect':
	      if (item && typeof item.longSelect === 'function') {
	        if (item.longSelect(e) === false) {
	          return false;
	        }
	      }
	      break;
	    case 'selection':
	      var handlers = this._selections;
	      this._selections = [];
	      if (item && typeof item.selected === 'function') {
	        if (item.selected(e) === false) {
	          return false;
	        }
	      }
	      for (var i = 0, ii = handlers.length; i < ii; ++i) {
	        if (handlers[i](e) === false) {
	          break;
	        }
	      }
	      break;
	  }
	};
	
	Menu.prototype.sections = function(sections) {
	  if (typeof sections === 'function') {
	    delete this.state.sections;
	    this.sectionsProvider = sections;
	    this._resolveMenu();
	    return this;
	  }
	  this.state.sections = sections;
	  this._resolveMenu();
	  return this;
	};
	
	Menu.prototype.section = function(sectionIndex, section) {
	  if (typeof sectionIndex === 'object') {
	    sectionIndex = sectionIndex.sectionIndex || 0;
	  } else if (typeof sectionIndex === 'function') {
	    this.sectionProvider = sectionIndex;
	    return this;
	  }
	  var menuIndex = { sectionIndex: sectionIndex };
	  if (!section) {
	    return this._getSection(menuIndex);
	  }
	  var sections = this._getSections();
	  var prevLength = sections.length;
	  sections[sectionIndex] = util2.copy(section, sections[sectionIndex]);
	  if (sections.length !== prevLength) {
	    this._resolveMenu();
	  }
	  this._resolveSection(menuIndex, typeof section.items !== 'undefined');
	  return this;
	};
	
	Menu.prototype.items = function(sectionIndex, items) {
	  if (typeof sectionIndex === 'object') {
	    sectionIndex = sectionIndex.sectionIndex || 0;
	  } else if (typeof sectionIndex === 'function') {
	    this.itemsProvider = sectionIndex;
	    return this;
	  }
	  if (typeof items === 'function') {
	    this._getMetaSection(sectionIndex).items = items;
	    return this;
	  }
	  var menuIndex = { sectionIndex: sectionIndex };
	  if (!items) {
	    return this._getItems(menuIndex);
	  }
	  var section = this._getSection(menuIndex, true);
	  section.items = items;
	  this._resolveSection(menuIndex, true);
	  return this;
	};
	
	Menu.prototype.item = function(sectionIndex, itemIndex, item) {
	  if (typeof sectionIndex === 'object') {
	    item = itemIndex || item;
	    itemIndex = sectionIndex.itemIndex;
	    sectionIndex = sectionIndex.sectionIndex || 0;
	  } else if (typeof sectionIndex === 'function') {
	    this.itemProvider = sectionIndex;
	    return this;
	  }
	  if (typeof itemIndex === 'function') {
	    item = itemIndex;
	    itemIndex = null;
	  }
	  if (typeof item === 'function') {
	    this._getMetaSection(sectionIndex).item = item;
	    return this;
	  }
	  var menuIndex = { sectionIndex: sectionIndex, itemIndex: itemIndex };
	  if (!item) {
	    return this._getItem(menuIndex);
	  }
	  var items = this._getItems(menuIndex, true);
	  var prevLength = items.length;
	  items[itemIndex] = util2.copy(item, items[itemIndex]);
	  if (items.length !== prevLength) {
	    this._resolveSection(menuIndex);
	  }
	  this._resolveItem(menuIndex);
	  return this;
	};
	
	Menu.prototype.selection = function(sectionIndex, itemIndex) {
	  var callback;
	  if (typeof sectionIndex === 'function') {
	    callback = sectionIndex;
	    sectionIndex = undefined;
	  }
	  if (callback) {
	    this._selections.push(callback);
	    simply.impl.menuSelection();
	  } else {
	    this._selection = {
	      sectionIndex: sectionIndex,
	      itemIndex: itemIndex,
	    };
	    this._select();
	  }
	};
	
	Menu.emit = Window.emit;
	
	Menu.emitSection = function(sectionIndex) {
	  var menu = WindowStack.top();
	  if (!(menu instanceof Menu)) { return; }
	  var e = {
	    menu: menu,
	    sectionIndex: sectionIndex
	  };
	  e.section = menu._getSection(e);
	  if (Menu.emit('section', null, e) === false) {
	    return false;
	  }
	  menu._resolveSection(e);
	};
	
	Menu.emitItem = function(sectionIndex, itemIndex) {
	  var menu = WindowStack.top();
	  if (!(menu instanceof Menu)) { return; }
	  var e = {
	    menu: menu,
	    sectionIndex: sectionIndex,
	    itemIndex: itemIndex,
	  };
	  e.section = menu._getSection(e);
	  e.item = menu._getItem(e);
	  if (Menu.emit('item', null, e) === false) {
	    return false;
	  }
	  menu._resolveItem(e);
	};
	
	Menu.emitSelect = function(type, sectionIndex, itemIndex) {
	  var menu = WindowStack.top();
	  if (!(menu instanceof Menu)) { return; }
	  var e = {
	    menu: menu,
	    sectionIndex: sectionIndex,
	    itemIndex: itemIndex,
	  };
	  e.section = menu._getSection(e);
	  e.item = menu._getItem(e);
	  switch (type) {
	    case 'menuSelect': type = 'select'; break;
	    case 'menuLongSelect': type = 'longSelect'; break;
	    case 'menuSelection': type = 'selection'; break;
	  }
	  if (Menu.emit(type, null, e) === false) {
	    return false;
	  }
	  menu._emitSelect(e);
	};
	
	module.exports = Menu;


/***/ },
/* 36 */
/***/ function(module, exports, __webpack_require__) {

	var util2 = __webpack_require__(7);
	var Vector2 = __webpack_require__(25);
	var myutil = __webpack_require__(8);
	var WindowStack = __webpack_require__(23);
	var Propable = __webpack_require__(27);
	var simply = __webpack_require__(18);
	
	var elementProps = [
	  'position',
	  'size',
	  'backgroundColor',
	  'borderColor',
	  'borderWidth',
	];
	
	var accessorProps = elementProps;
	
	var nextId = 1;
	
	var StageElement = function(elementDef) {
	  this.state = elementDef || {};
	  this.state.id = nextId++;
	  if (!this.state.position) {
	    this.state.position = new Vector2();
	  }
	  if (!this.state.size) {
	    this.state.size = new Vector2();
	  }
	  this._queue = [];
	};
	
	var Types = [
	  'NoneType',
	  'RectType',
	  'LineType',
	  'CircleType',
	  'RadialType',
	  'TextType',
	  'ImageType',
	  'InverterType',
	];
	
	Types.forEach(function(name, index) {
	  StageElement[name] = index;
	});
	
	util2.copy(Propable.prototype, StageElement.prototype);
	
	Propable.makeAccessors(accessorProps, StageElement.prototype);
	
	StageElement.prototype._reset = function() {
	  this._queue = [];
	};
	
	StageElement.prototype._id = function() {
	  return this.state.id;
	};
	
	StageElement.prototype._type = function() {
	  return this.state.type;
	};
	
	StageElement.prototype._prop = function(elementDef) {
	  if (this.parent === WindowStack.top()) {
	    simply.impl.stageElement(this._id(), this._type(), this.state);
	  }
	};
	
	StageElement.prototype.index = function() {
	  if (!this.parent) { return -1; }
	  return this.parent.index(this);
	};
	
	StageElement.prototype.remove = function(broadcast) {
	  if (!this.parent) { return this; }
	  this.parent.remove(this, broadcast);
	  return this;
	};
	
	StageElement.prototype._animate = function(animateDef, duration) {
	  if (this.parent === WindowStack.top()) {
	    simply.impl.stageAnimate(this._id(), this.state,
	        animateDef, duration || 400, animateDef.easing || 'easeInOut');
	  }
	};
	
	StageElement.prototype.animate = function(field, value, duration) {
	  if (typeof field === 'object') {
	    duration = value;
	  }
	  var animateDef = myutil.toObject(field, value);
	  this.queue(function() {
	    this._animate(animateDef, duration);
	    util2.copy(animateDef, this.state);
	  });
	  if (!this.state.animating) {
	    this.dequeue();
	  }
	  return this;
	};
	
	StageElement.prototype.queue = function(callback) {
	  this._queue.push(callback);
	};
	
	StageElement.prototype.dequeue = function() {
	  var callback = this._queue.shift();
	  if (callback) {
	    this.state.animating = true;
	    callback.call(this, this.dequeue.bind(this));
	  } else {
	    this.state.animating = false;
	  }
	};
	
	StageElement.emitAnimateDone = function(id) {
	  var wind = WindowStack.top();
	  if (!wind || !wind._dynamic) { return; }
	  wind.each(function(element) {
	    if (element._id() === id) {
	      element.dequeue();
	      return false;
	    }
	  });
	};
	
	module.exports = StageElement;


/***/ },
/* 37 */
/***/ function(module, exports, __webpack_require__) {

	var UI = {};
	
	UI.Vector2 = __webpack_require__(25);
	UI.Window = __webpack_require__(24);
	UI.Card = __webpack_require__(38);
	UI.Menu = __webpack_require__(35);
	UI.Rect = __webpack_require__(39);
	UI.Line = __webpack_require__(40);
	UI.Circle = __webpack_require__(41);
	UI.Radial = __webpack_require__(42);
	UI.Text = __webpack_require__(43);
	UI.TimeText = __webpack_require__(44);
	UI.Image = __webpack_require__(45);
	UI.Inverter = __webpack_require__(46);
	UI.Vibe = __webpack_require__(47);
	UI.Light = __webpack_require__(48);
	
	module.exports = UI;


/***/ },
/* 38 */
/***/ function(module, exports, __webpack_require__) {

	var util2 = __webpack_require__(7);
	var myutil = __webpack_require__(8);
	var Emitter = __webpack_require__(13);
	var WindowStack = __webpack_require__(23);
	var Propable = __webpack_require__(27);
	var Window = __webpack_require__(24);
	var simply = __webpack_require__(18);
	
	var textProps = [
	  'title',
	  'subtitle',
	  'body',
	];
	
	var textColorProps = [
	  'titleColor',
	  'subtitleColor',
	  'bodyColor',
	];
	
	var imageProps = [
	  'icon',
	  'subicon',
	  'banner',
	];
	
	var actionProps = [
	  'up',
	  'select',
	  'back',
	];
	
	var configProps = [
	  'style',
	  'backgroundColor'
	];
	
	var accessorProps = textProps.concat(textColorProps).concat(imageProps).concat(configProps);
	var clearableProps = textProps.concat(imageProps);
	
	var defaults = {
	  status: true,
	  backgroundColor: 'white',
	};
	
	var Card = function(cardDef) {
	  Window.call(this, myutil.shadow(defaults, cardDef || {}));
	  this._dynamic = false;
	};
	
	Card._codeName = 'card';
	
	util2.inherit(Card, Window);
	
	util2.copy(Emitter.prototype, Card.prototype);
	
	Propable.makeAccessors(accessorProps, Card.prototype);
	
	Card.prototype._prop = function() {
	  if (this === WindowStack.top()) {
	    simply.impl.card.apply(this, arguments);
	  }
	};
	
	Card.prototype._clear = function(flags_) {
	  var flags = myutil.toFlags(flags_);
	  if (flags === true) {
	    clearableProps.forEach(Propable.unset.bind(this.state));
	  }
	  Window.prototype._clear.call(this, flags_);
	};
	
	module.exports = Card;


/***/ },
/* 39 */
/***/ function(module, exports, __webpack_require__) {

	var util2 = __webpack_require__(7);
	var myutil = __webpack_require__(8);
	var StageElement = __webpack_require__(36);
	
	var defaults = {
	  backgroundColor: 'white',
	  borderColor: 'clear',
	  borderWidth: 1,
	};
	
	var Rect = function(elementDef) {
	  StageElement.call(this, myutil.shadow(defaults, elementDef || {}));
	  this.state.type = StageElement.RectType;
	};
	
	util2.inherit(Rect, StageElement);
	
	module.exports = Rect;


/***/ },
/* 40 */
/***/ function(module, exports, __webpack_require__) {

	var util2 = __webpack_require__(7);
	var myutil = __webpack_require__(8);
	var Propable = __webpack_require__(27);
	var StageElement = __webpack_require__(36);
	
	var accessorProps = [
	  'strokeColor',
	  'strokeWidth',
	  'position2',
	];
	
	var defaults = {
	  strokeColor: 'white',
	  strokeWidth: 1,
	};
	
	var Line = function(elementDef) {
	  StageElement.call(this, myutil.shadow(defaults, elementDef || {}));
	  this.state.type = StageElement.LineType;
	};
	
	util2.inherit(Line, StageElement);
	
	Propable.makeAccessors(accessorProps, Line.prototype);
	
	module.exports = Line;


/***/ },
/* 41 */
/***/ function(module, exports, __webpack_require__) {

	var util2 = __webpack_require__(7);
	var myutil = __webpack_require__(8);
	var Propable = __webpack_require__(27);
	var StageElement = __webpack_require__(36);
	
	var accessorProps = [
	  'radius',
	];
	
	var defaults = {
	  backgroundColor: 'white',
	  borderColor: 'clear',
	  borderWidth: 1,
	};
	
	var Circle = function(elementDef) {
	  StageElement.call(this, myutil.shadow(defaults, elementDef || {}));
	  this.state.type = StageElement.CircleType;
	};
	
	util2.inherit(Circle, StageElement);
	
	Propable.makeAccessors(accessorProps, Circle.prototype);
	
	module.exports = Circle;


/***/ },
/* 42 */
/***/ function(module, exports, __webpack_require__) {

	var util2 = __webpack_require__(7);
	var myutil = __webpack_require__(8);
	var Propable = __webpack_require__(27);
	var StageElement = __webpack_require__(36);
	
	var accessorProps = [
	  'radius',
	  'angle',
	  'angle2',
	];
	
	var defaults = {
	  backgroundColor: 'white',
	  borderColor: 'clear',
	  borderWidth: 1,
	  radius: 0,
	  angle: 0,
	  angle2: 360,
	};
	
	var checkProps = function(def) {
	  if (!def) return;
	  if ('angleStart' in def) {
	    console.warn('`angleStart` has been deprecated in favor of `angle` in order to match\n\t' +
	                 "Line's `position` and `position2`. Please use `angle` intead.");
	  }
	  if ('angleEnd' in def) {
	    console.warn('`angleEnd` has been deprecated in favor of `angle2` in order to match\n\t' +
	                 "Line's `position` and `position2`. Please use `angle2` intead.");
	  }
	};
	
	var Radial = function(elementDef) {
	  checkProps(elementDef);
	  StageElement.call(this, myutil.shadow(defaults, elementDef || {}));
	  this.state.type = StageElement.RadialType;
	};
	
	util2.inherit(Radial, StageElement);
	
	Propable.makeAccessors(accessorProps, Radial.prototype);
	
	Radial.prototype._prop = function(def) {
	  checkProps(def);
	  StageElement.prototype._prop.call(this, def);
	};
	
	module.exports = Radial;


/***/ },
/* 43 */
/***/ function(module, exports, __webpack_require__) {

	var util2 = __webpack_require__(7);
	var myutil = __webpack_require__(8);
	var Propable = __webpack_require__(27);
	var StageElement = __webpack_require__(36);
	
	var textProps = [
	  'text',
	  'font',
	  'color',
	  'textOverflow',
	  'textAlign',
	  'updateTimeUnits',
	];
	
	var defaults = {
	  backgroundColor: 'clear',
	  borderColor: 'clear',
	  borderWidth: 1,
	  color: 'white',
	  font: 'gothic-24',
	};
	
	var Text = function(elementDef) {
	  StageElement.call(this, myutil.shadow(defaults, elementDef || {}));
	  this.state.type = StageElement.TextType;
	};
	
	util2.inherit(Text, StageElement);
	
	Propable.makeAccessors(textProps, Text.prototype);
	
	module.exports = Text;


/***/ },
/* 44 */
/***/ function(module, exports, __webpack_require__) {

	var util2 = __webpack_require__(7);
	var Text = __webpack_require__(43);
	
	var TimeText = function(elementDef) {
	  Text.call(this, elementDef);
	  if (this.state.text) {
	    this.text(this.state.text);
	  }
	};
	
	util2.inherit(TimeText, Text);
	
	var formatUnits = {
	  a: 'days',
	  A: 'days',
	  b: 'months',
	  B: 'months',
	  c: 'seconds',
	  d: 'days',
	  H: 'hours',
	  I: 'hours',
	  j: 'days',
	  m: 'months',
	  M: 'minutes',
	  p: 'hours',
	  S: 'seconds',
	  U: 'days',
	  w: 'days',
	  W: 'days',
	  x: 'days',
	  X: 'seconds',
	  y: 'years',
	  Y: 'years',
	};
	
	var getUnitsFromText = function(text) {
	  var units = {};
	  text.replace(/%(.)/g, function(_, code) {
	    var unit = formatUnits[code];
	    if (unit) {
	      units[unit] = true;
	    }
	    return _;
	  });
	  return units;
	};
	
	TimeText.prototype.text = function(text) {
	  if (arguments.length === 0) {
	    return this.state.text;
	  }
	  this.prop({
	    text: text,
	    updateTimeUnits: getUnitsFromText(text),
	  });
	  return this;
	};
	
	module.exports = TimeText;


/***/ },
/* 45 */
/***/ function(module, exports, __webpack_require__) {

	var util2 = __webpack_require__(7);
	var myutil = __webpack_require__(8);
	var Propable = __webpack_require__(27);
	var StageElement = __webpack_require__(36);
	
	var imageProps = [
	  'image',
	  'compositing',
	];
	
	var defaults = {
	  backgroundColor: 'clear',
	  borderColor: 'clear',
	  borderWidth: 1,
	};
	
	var ImageElement = function(elementDef) {
	  StageElement.call(this, myutil.shadow(defaults, elementDef || {}));
	  this.state.type = StageElement.ImageType;
	};
	
	util2.inherit(ImageElement, StageElement);
	
	Propable.makeAccessors(imageProps, ImageElement.prototype);
	
	module.exports = ImageElement;


/***/ },
/* 46 */
/***/ function(module, exports, __webpack_require__) {

	var util2 = __webpack_require__(7);
	var myutil = __webpack_require__(8);
	var StageElement = __webpack_require__(36);
	
	var Inverter = function(elementDef) {
	  StageElement.call(this, elementDef);
	  this.state.type = StageElement.InverterType;
	};
	
	util2.inherit(Inverter, StageElement);
	
	module.exports = Inverter;


/***/ },
/* 47 */
/***/ function(module, exports, __webpack_require__) {

	var simply = __webpack_require__(18);
	
	var Vibe = module.exports;
	
	Vibe.vibrate = function(type) {
	  simply.impl.vibe(type);
	};


/***/ },
/* 48 */
/***/ function(module, exports, __webpack_require__) {

	var simply = __webpack_require__(18);
	
	var Light = module.exports;
	
	Light.on = function() {
	  simply.impl.light('on');
	};
	
	Light.auto = function() {
	  simply.impl.light('auto');
	};
	
	Light.trigger = function() {
	  simply.impl.light('trigger');
	};


/***/ },
/* 49 */
/***/ function(module, exports, __webpack_require__) {

	var require;var require;/* WEBPACK VAR INJECTION */(function(require) {/* Clay - https://github.com/pebble/clay - Version: 1.0.4 - Build Date: 2016-11-21T20:14:28.839Z */
	!function(t){if(true)module.exports=t();else if("function"==typeof define&&define.amd)define([],t);else{var e;e="undefined"!=typeof window?window:"undefined"!=typeof global?global:"undefined"!=typeof self?self:this,e.pebbleClay=t()}}(function(){var t;return function e(t,n,r){function o(a,s){if(!n[a]){if(!t[a]){var c="function"==typeof require&&require;if(!s&&c)return require(a,!0);if(i)return i(a,!0);var l=new Error("Cannot find module '"+a+"'");throw l.code="MODULE_NOT_FOUND",l}var u=n[a]={exports:{}};t[a][0].call(u.exports,function(e){var n=t[a][1][e];return o(n?n:e)},u,u.exports,e,t,n,r)}return n[a].exports}for(var i="function"==typeof require&&require,a=0;a<r.length;a++)o(r[a]);return o}({1:[function(t,e,n){"use strict";function r(t){var e=t.length;if(e%4>0)throw new Error("Invalid string. Length must be a multiple of 4");return"="===t[e-2]?2:"="===t[e-1]?1:0}function o(t){return 3*t.length/4-r(t)}function i(t){var e,n,o,i,a,s,c=t.length;a=r(t),s=new f(3*c/4-a),o=a>0?c-4:c;var l=0;for(e=0,n=0;e<o;e+=4,n+=3)i=u[t.charCodeAt(e)]<<18|u[t.charCodeAt(e+1)]<<12|u[t.charCodeAt(e+2)]<<6|u[t.charCodeAt(e+3)],s[l++]=i>>16&255,s[l++]=i>>8&255,s[l++]=255&i;return 2===a?(i=u[t.charCodeAt(e)]<<2|u[t.charCodeAt(e+1)]>>4,s[l++]=255&i):1===a&&(i=u[t.charCodeAt(e)]<<10|u[t.charCodeAt(e+1)]<<4|u[t.charCodeAt(e+2)]>>2,s[l++]=i>>8&255,s[l++]=255&i),s}function a(t){return l[t>>18&63]+l[t>>12&63]+l[t>>6&63]+l[63&t]}function s(t,e,n){for(var r,o=[],i=e;i<n;i+=3)r=(t[i]<<16)+(t[i+1]<<8)+t[i+2],o.push(a(r));return o.join("")}function c(t){for(var e,n=t.length,r=n%3,o="",i=[],a=16383,c=0,u=n-r;c<u;c+=a)i.push(s(t,c,c+a>u?u:c+a));return 1===r?(e=t[n-1],o+=l[e>>2],o+=l[e<<4&63],o+="=="):2===r&&(e=(t[n-2]<<8)+t[n-1],o+=l[e>>10],o+=l[e>>4&63],o+=l[e<<2&63],o+="="),i.push(o),i.join("")}n.byteLength=o,n.toByteArray=i,n.fromByteArray=c;for(var l=[],u=[],f="undefined"!=typeof Uint8Array?Uint8Array:Array,p="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/",d=0,h=p.length;d<h;++d)l[d]=p[d],u[p.charCodeAt(d)]=d;u["-".charCodeAt(0)]=62,u["_".charCodeAt(0)]=63},{}],2:[function(t,e,n){(function(e){/*!
	 * The buffer module from node.js, for the browser.
	 *
	 * @author   Feross Aboukhadijeh <feross@feross.org> <http://feross.org>
	 * @license  MIT
	 */
	"use strict";function r(){try{var t=new Uint8Array(1);return t.__proto__={__proto__:Uint8Array.prototype,foo:function(){return 42}},42===t.foo()&&"function"==typeof t.subarray&&0===t.subarray(1,1).byteLength}catch(e){return!1}}function o(){return a.TYPED_ARRAY_SUPPORT?2147483647:1073741823}function i(t,e){if(o()<e)throw new RangeError("Invalid typed array length");return a.TYPED_ARRAY_SUPPORT?(t=new Uint8Array(e),t.__proto__=a.prototype):(null===t&&(t=new a(e)),t.length=e),t}function a(t,e,n){if(!(a.TYPED_ARRAY_SUPPORT||this instanceof a))return new a(t,e,n);if("number"==typeof t){if("string"==typeof e)throw new Error("If encoding is specified then the first argument must be a string");return u(this,t)}return s(this,t,e,n)}function s(t,e,n,r){if("number"==typeof e)throw new TypeError('"value" argument must not be a number');return"undefined"!=typeof ArrayBuffer&&e instanceof ArrayBuffer?d(t,e,n,r):"string"==typeof e?f(t,e,n):h(t,e)}function c(t){if("number"!=typeof t)throw new TypeError('"size" argument must be a number');if(t<0)throw new RangeError('"size" argument must not be negative')}function l(t,e,n,r){return c(e),e<=0?i(t,e):void 0!==n?"string"==typeof r?i(t,e).fill(n,r):i(t,e).fill(n):i(t,e)}function u(t,e){if(c(e),t=i(t,e<0?0:0|m(e)),!a.TYPED_ARRAY_SUPPORT)for(var n=0;n<e;++n)t[n]=0;return t}function f(t,e,n){if("string"==typeof n&&""!==n||(n="utf8"),!a.isEncoding(n))throw new TypeError('"encoding" must be a valid string encoding');var r=0|b(e,n);t=i(t,r);var o=t.write(e,n);return o!==r&&(t=t.slice(0,o)),t}function p(t,e){var n=e.length<0?0:0|m(e.length);t=i(t,n);for(var r=0;r<n;r+=1)t[r]=255&e[r];return t}function d(t,e,n,r){if(e.byteLength,n<0||e.byteLength<n)throw new RangeError("'offset' is out of bounds");if(e.byteLength<n+(r||0))throw new RangeError("'length' is out of bounds");return e=void 0===n&&void 0===r?new Uint8Array(e):void 0===r?new Uint8Array(e,n):new Uint8Array(e,n,r),a.TYPED_ARRAY_SUPPORT?(t=e,t.__proto__=a.prototype):t=p(t,e),t}function h(t,e){if(a.isBuffer(e)){var n=0|m(e.length);return t=i(t,n),0===t.length?t:(e.copy(t,0,0,n),t)}if(e){if("undefined"!=typeof ArrayBuffer&&e.buffer instanceof ArrayBuffer||"length"in e)return"number"!=typeof e.length||H(e.length)?i(t,0):p(t,e);if("Buffer"===e.type&&_(e.data))return p(t,e.data)}throw new TypeError("First argument must be a string, Buffer, ArrayBuffer, Array, or array-like object.")}function m(t){if(t>=o())throw new RangeError("Attempt to allocate Buffer larger than maximum size: 0x"+o().toString(16)+" bytes");return 0|t}function g(t){return+t!=t&&(t=0),a.alloc(+t)}function b(t,e){if(a.isBuffer(t))return t.length;if("undefined"!=typeof ArrayBuffer&&"function"==typeof ArrayBuffer.isView&&(ArrayBuffer.isView(t)||t instanceof ArrayBuffer))return t.byteLength;"string"!=typeof t&&(t=""+t);var n=t.length;if(0===n)return 0;for(var r=!1;;)switch(e){case"ascii":case"latin1":case"binary":return n;case"utf8":case"utf-8":case void 0:return W(t).length;case"ucs2":case"ucs-2":case"utf16le":case"utf-16le":return 2*n;case"hex":return n>>>1;case"base64":return U(t).length;default:if(r)return W(t).length;e=(""+e).toLowerCase(),r=!0}}function y(t,e,n){var r=!1;if((void 0===e||e<0)&&(e=0),e>this.length)return"";if((void 0===n||n>this.length)&&(n=this.length),n<=0)return"";if(n>>>=0,e>>>=0,n<=e)return"";for(t||(t="utf8");;)switch(t){case"hex":return D(this,e,n);case"utf8":case"utf-8":return E(this,e,n);case"ascii":return B(this,e,n);case"latin1":case"binary":return S(this,e,n);case"base64":return O(this,e,n);case"ucs2":case"ucs-2":case"utf16le":case"utf-16le":return N(this,e,n);default:if(r)throw new TypeError("Unknown encoding: "+t);t=(t+"").toLowerCase(),r=!0}}function v(t,e,n){var r=t[e];t[e]=t[n],t[n]=r}function A(t,e,n,r,o){if(0===t.length)return-1;if("string"==typeof n?(r=n,n=0):n>2147483647?n=2147483647:n<-2147483648&&(n=-2147483648),n=+n,isNaN(n)&&(n=o?0:t.length-1),n<0&&(n=t.length+n),n>=t.length){if(o)return-1;n=t.length-1}else if(n<0){if(!o)return-1;n=0}if("string"==typeof e&&(e=a.from(e,r)),a.isBuffer(e))return 0===e.length?-1:w(t,e,n,r,o);if("number"==typeof e)return e=255&e,a.TYPED_ARRAY_SUPPORT&&"function"==typeof Uint8Array.prototype.indexOf?o?Uint8Array.prototype.indexOf.call(t,e,n):Uint8Array.prototype.lastIndexOf.call(t,e,n):w(t,[e],n,r,o);throw new TypeError("val must be string, number or Buffer")}function w(t,e,n,r,o){function i(t,e){return 1===a?t[e]:t.readUInt16BE(e*a)}var a=1,s=t.length,c=e.length;if(void 0!==r&&(r=String(r).toLowerCase(),"ucs2"===r||"ucs-2"===r||"utf16le"===r||"utf-16le"===r)){if(t.length<2||e.length<2)return-1;a=2,s/=2,c/=2,n/=2}var l;if(o){var u=-1;for(l=n;l<s;l++)if(i(t,l)===i(e,u===-1?0:l-u)){if(u===-1&&(u=l),l-u+1===c)return u*a}else u!==-1&&(l-=l-u),u=-1}else for(n+c>s&&(n=s-c),l=n;l>=0;l--){for(var f=!0,p=0;p<c;p++)if(i(t,l+p)!==i(e,p)){f=!1;break}if(f)return l}return-1}function k(t,e,n,r){n=Number(n)||0;var o=t.length-n;r?(r=Number(r),r>o&&(r=o)):r=o;var i=e.length;if(i%2!==0)throw new TypeError("Invalid hex string");r>i/2&&(r=i/2);for(var a=0;a<r;++a){var s=parseInt(e.substr(2*a,2),16);if(isNaN(s))return a;t[n+a]=s}return a}function x(t,e,n,r){return q(W(e,t.length-n),t,n,r)}function M(t,e,n,r){return q(Z(e),t,n,r)}function T(t,e,n,r){return M(t,e,n,r)}function R(t,e,n,r){return q(U(e),t,n,r)}function P(t,e,n,r){return q(J(e,t.length-n),t,n,r)}function O(t,e,n){return 0===e&&n===t.length?Q.fromByteArray(t):Q.fromByteArray(t.slice(e,n))}function E(t,e,n){n=Math.min(t.length,n);for(var r=[],o=e;o<n;){var i=t[o],a=null,s=i>239?4:i>223?3:i>191?2:1;if(o+s<=n){var c,l,u,f;switch(s){case 1:i<128&&(a=i);break;case 2:c=t[o+1],128===(192&c)&&(f=(31&i)<<6|63&c,f>127&&(a=f));break;case 3:c=t[o+1],l=t[o+2],128===(192&c)&&128===(192&l)&&(f=(15&i)<<12|(63&c)<<6|63&l,f>2047&&(f<55296||f>57343)&&(a=f));break;case 4:c=t[o+1],l=t[o+2],u=t[o+3],128===(192&c)&&128===(192&l)&&128===(192&u)&&(f=(15&i)<<18|(63&c)<<12|(63&l)<<6|63&u,f>65535&&f<1114112&&(a=f))}}null===a?(a=65533,s=1):a>65535&&(a-=65536,r.push(a>>>10&1023|55296),a=56320|1023&a),r.push(a),o+=s}return j(r)}function j(t){var e=t.length;if(e<=tt)return String.fromCharCode.apply(String,t);for(var n="",r=0;r<e;)n+=String.fromCharCode.apply(String,t.slice(r,r+=tt));return n}function B(t,e,n){var r="";n=Math.min(t.length,n);for(var o=e;o<n;++o)r+=String.fromCharCode(127&t[o]);return r}function S(t,e,n){var r="";n=Math.min(t.length,n);for(var o=e;o<n;++o)r+=String.fromCharCode(t[o]);return r}function D(t,e,n){var r=t.length;(!e||e<0)&&(e=0),(!n||n<0||n>r)&&(n=r);for(var o="",i=e;i<n;++i)o+=V(t[i]);return o}function N(t,e,n){for(var r=t.slice(e,n),o="",i=0;i<r.length;i+=2)o+=String.fromCharCode(r[i]+256*r[i+1]);return o}function Y(t,e,n){if(t%1!==0||t<0)throw new RangeError("offset is not uint");if(t+e>n)throw new RangeError("Trying to access beyond buffer length")}function F(t,e,n,r,o,i){if(!a.isBuffer(t))throw new TypeError('"buffer" argument must be a Buffer instance');if(e>o||e<i)throw new RangeError('"value" argument is out of bounds');if(n+r>t.length)throw new RangeError("Index out of range")}function z(t,e,n,r){e<0&&(e=65535+e+1);for(var o=0,i=Math.min(t.length-n,2);o<i;++o)t[n+o]=(e&255<<8*(r?o:1-o))>>>8*(r?o:1-o)}function I(t,e,n,r){e<0&&(e=4294967295+e+1);for(var o=0,i=Math.min(t.length-n,4);o<i;++o)t[n+o]=e>>>8*(r?o:3-o)&255}function L(t,e,n,r,o,i){if(n+r>t.length)throw new RangeError("Index out of range");if(n<0)throw new RangeError("Index out of range")}function K(t,e,n,r,o){return o||L(t,e,n,4,3.4028234663852886e38,-3.4028234663852886e38),$.write(t,e,n,r,23,4),n+4}function G(t,e,n,r,o){return o||L(t,e,n,8,1.7976931348623157e308,-1.7976931348623157e308),$.write(t,e,n,r,52,8),n+8}function C(t){if(t=X(t).replace(et,""),t.length<2)return"";for(;t.length%4!==0;)t+="=";return t}function X(t){return t.trim?t.trim():t.replace(/^\s+|\s+$/g,"")}function V(t){return t<16?"0"+t.toString(16):t.toString(16)}function W(t,e){e=e||1/0;for(var n,r=t.length,o=null,i=[],a=0;a<r;++a){if(n=t.charCodeAt(a),n>55295&&n<57344){if(!o){if(n>56319){(e-=3)>-1&&i.push(239,191,189);continue}if(a+1===r){(e-=3)>-1&&i.push(239,191,189);continue}o=n;continue}if(n<56320){(e-=3)>-1&&i.push(239,191,189),o=n;continue}n=(o-55296<<10|n-56320)+65536}else o&&(e-=3)>-1&&i.push(239,191,189);if(o=null,n<128){if((e-=1)<0)break;i.push(n)}else if(n<2048){if((e-=2)<0)break;i.push(n>>6|192,63&n|128)}else if(n<65536){if((e-=3)<0)break;i.push(n>>12|224,n>>6&63|128,63&n|128)}else{if(!(n<1114112))throw new Error("Invalid code point");if((e-=4)<0)break;i.push(n>>18|240,n>>12&63|128,n>>6&63|128,63&n|128)}}return i}function Z(t){for(var e=[],n=0;n<t.length;++n)e.push(255&t.charCodeAt(n));return e}function J(t,e){for(var n,r,o,i=[],a=0;a<t.length&&!((e-=2)<0);++a)n=t.charCodeAt(a),r=n>>8,o=n%256,i.push(o),i.push(r);return i}function U(t){return Q.toByteArray(C(t))}function q(t,e,n,r){for(var o=0;o<r&&!(o+n>=e.length||o>=t.length);++o)e[o+n]=t[o];return o}function H(t){return t!==t}var Q=t("base64-js"),$=t("ieee754"),_=t("isarray");n.Buffer=a,n.SlowBuffer=g,n.INSPECT_MAX_BYTES=50,a.TYPED_ARRAY_SUPPORT=void 0!==e.TYPED_ARRAY_SUPPORT?e.TYPED_ARRAY_SUPPORT:r(),n.kMaxLength=o(),a.poolSize=8192,a._augment=function(t){return t.__proto__=a.prototype,t},a.from=function(t,e,n){return s(null,t,e,n)},a.TYPED_ARRAY_SUPPORT&&(a.prototype.__proto__=Uint8Array.prototype,a.__proto__=Uint8Array,"undefined"!=typeof Symbol&&Symbol.species&&a[Symbol.species]===a&&Object.defineProperty(a,Symbol.species,{value:null,configurable:!0})),a.alloc=function(t,e,n){return l(null,t,e,n)},a.allocUnsafe=function(t){return u(null,t)},a.allocUnsafeSlow=function(t){return u(null,t)},a.isBuffer=function(t){return!(null==t||!t._isBuffer)},a.compare=function(t,e){if(!a.isBuffer(t)||!a.isBuffer(e))throw new TypeError("Arguments must be Buffers");if(t===e)return 0;for(var n=t.length,r=e.length,o=0,i=Math.min(n,r);o<i;++o)if(t[o]!==e[o]){n=t[o],r=e[o];break}return n<r?-1:r<n?1:0},a.isEncoding=function(t){switch(String(t).toLowerCase()){case"hex":case"utf8":case"utf-8":case"ascii":case"latin1":case"binary":case"base64":case"ucs2":case"ucs-2":case"utf16le":case"utf-16le":return!0;default:return!1}},a.concat=function(t,e){if(!_(t))throw new TypeError('"list" argument must be an Array of Buffers');if(0===t.length)return a.alloc(0);var n;if(void 0===e)for(e=0,n=0;n<t.length;++n)e+=t[n].length;var r=a.allocUnsafe(e),o=0;for(n=0;n<t.length;++n){var i=t[n];if(!a.isBuffer(i))throw new TypeError('"list" argument must be an Array of Buffers');i.copy(r,o),o+=i.length}return r},a.byteLength=b,a.prototype._isBuffer=!0,a.prototype.swap16=function(){var t=this.length;if(t%2!==0)throw new RangeError("Buffer size must be a multiple of 16-bits");for(var e=0;e<t;e+=2)v(this,e,e+1);return this},a.prototype.swap32=function(){var t=this.length;if(t%4!==0)throw new RangeError("Buffer size must be a multiple of 32-bits");for(var e=0;e<t;e+=4)v(this,e,e+3),v(this,e+1,e+2);return this},a.prototype.swap64=function(){var t=this.length;if(t%8!==0)throw new RangeError("Buffer size must be a multiple of 64-bits");for(var e=0;e<t;e+=8)v(this,e,e+7),v(this,e+1,e+6),v(this,e+2,e+5),v(this,e+3,e+4);return this},a.prototype.toString=function(){var t=0|this.length;return 0===t?"":0===arguments.length?E(this,0,t):y.apply(this,arguments)},a.prototype.equals=function(t){if(!a.isBuffer(t))throw new TypeError("Argument must be a Buffer");return this===t||0===a.compare(this,t)},a.prototype.inspect=function(){var t="",e=n.INSPECT_MAX_BYTES;return this.length>0&&(t=this.toString("hex",0,e).match(/.{2}/g).join(" "),this.length>e&&(t+=" ... ")),"<Buffer "+t+">"},a.prototype.compare=function(t,e,n,r,o){if(!a.isBuffer(t))throw new TypeError("Argument must be a Buffer");if(void 0===e&&(e=0),void 0===n&&(n=t?t.length:0),void 0===r&&(r=0),void 0===o&&(o=this.length),e<0||n>t.length||r<0||o>this.length)throw new RangeError("out of range index");if(r>=o&&e>=n)return 0;if(r>=o)return-1;if(e>=n)return 1;if(e>>>=0,n>>>=0,r>>>=0,o>>>=0,this===t)return 0;for(var i=o-r,s=n-e,c=Math.min(i,s),l=this.slice(r,o),u=t.slice(e,n),f=0;f<c;++f)if(l[f]!==u[f]){i=l[f],s=u[f];break}return i<s?-1:s<i?1:0},a.prototype.includes=function(t,e,n){return this.indexOf(t,e,n)!==-1},a.prototype.indexOf=function(t,e,n){return A(this,t,e,n,!0)},a.prototype.lastIndexOf=function(t,e,n){return A(this,t,e,n,!1)},a.prototype.write=function(t,e,n,r){if(void 0===e)r="utf8",n=this.length,e=0;else if(void 0===n&&"string"==typeof e)r=e,n=this.length,e=0;else{if(!isFinite(e))throw new Error("Buffer.write(string, encoding, offset[, length]) is no longer supported");e=0|e,isFinite(n)?(n=0|n,void 0===r&&(r="utf8")):(r=n,n=void 0)}var o=this.length-e;if((void 0===n||n>o)&&(n=o),t.length>0&&(n<0||e<0)||e>this.length)throw new RangeError("Attempt to write outside buffer bounds");r||(r="utf8");for(var i=!1;;)switch(r){case"hex":return k(this,t,e,n);case"utf8":case"utf-8":return x(this,t,e,n);case"ascii":return M(this,t,e,n);case"latin1":case"binary":return T(this,t,e,n);case"base64":return R(this,t,e,n);case"ucs2":case"ucs-2":case"utf16le":case"utf-16le":return P(this,t,e,n);default:if(i)throw new TypeError("Unknown encoding: "+r);r=(""+r).toLowerCase(),i=!0}},a.prototype.toJSON=function(){return{type:"Buffer",data:Array.prototype.slice.call(this._arr||this,0)}};var tt=4096;a.prototype.slice=function(t,e){var n=this.length;t=~~t,e=void 0===e?n:~~e,t<0?(t+=n,t<0&&(t=0)):t>n&&(t=n),e<0?(e+=n,e<0&&(e=0)):e>n&&(e=n),e<t&&(e=t);var r;if(a.TYPED_ARRAY_SUPPORT)r=this.subarray(t,e),r.__proto__=a.prototype;else{var o=e-t;r=new a(o,(void 0));for(var i=0;i<o;++i)r[i]=this[i+t]}return r},a.prototype.readUIntLE=function(t,e,n){t=0|t,e=0|e,n||Y(t,e,this.length);for(var r=this[t],o=1,i=0;++i<e&&(o*=256);)r+=this[t+i]*o;return r},a.prototype.readUIntBE=function(t,e,n){t=0|t,e=0|e,n||Y(t,e,this.length);for(var r=this[t+--e],o=1;e>0&&(o*=256);)r+=this[t+--e]*o;return r},a.prototype.readUInt8=function(t,e){return e||Y(t,1,this.length),this[t]},a.prototype.readUInt16LE=function(t,e){return e||Y(t,2,this.length),this[t]|this[t+1]<<8},a.prototype.readUInt16BE=function(t,e){return e||Y(t,2,this.length),this[t]<<8|this[t+1]},a.prototype.readUInt32LE=function(t,e){return e||Y(t,4,this.length),(this[t]|this[t+1]<<8|this[t+2]<<16)+16777216*this[t+3]},a.prototype.readUInt32BE=function(t,e){return e||Y(t,4,this.length),16777216*this[t]+(this[t+1]<<16|this[t+2]<<8|this[t+3])},a.prototype.readIntLE=function(t,e,n){t=0|t,e=0|e,n||Y(t,e,this.length);for(var r=this[t],o=1,i=0;++i<e&&(o*=256);)r+=this[t+i]*o;return o*=128,r>=o&&(r-=Math.pow(2,8*e)),r},a.prototype.readIntBE=function(t,e,n){t=0|t,e=0|e,n||Y(t,e,this.length);for(var r=e,o=1,i=this[t+--r];r>0&&(o*=256);)i+=this[t+--r]*o;return o*=128,i>=o&&(i-=Math.pow(2,8*e)),i},a.prototype.readInt8=function(t,e){return e||Y(t,1,this.length),128&this[t]?(255-this[t]+1)*-1:this[t]},a.prototype.readInt16LE=function(t,e){e||Y(t,2,this.length);var n=this[t]|this[t+1]<<8;return 32768&n?4294901760|n:n},a.prototype.readInt16BE=function(t,e){e||Y(t,2,this.length);var n=this[t+1]|this[t]<<8;return 32768&n?4294901760|n:n},a.prototype.readInt32LE=function(t,e){return e||Y(t,4,this.length),this[t]|this[t+1]<<8|this[t+2]<<16|this[t+3]<<24},a.prototype.readInt32BE=function(t,e){return e||Y(t,4,this.length),this[t]<<24|this[t+1]<<16|this[t+2]<<8|this[t+3]},a.prototype.readFloatLE=function(t,e){return e||Y(t,4,this.length),$.read(this,t,!0,23,4)},a.prototype.readFloatBE=function(t,e){return e||Y(t,4,this.length),$.read(this,t,!1,23,4)},a.prototype.readDoubleLE=function(t,e){return e||Y(t,8,this.length),$.read(this,t,!0,52,8)},a.prototype.readDoubleBE=function(t,e){return e||Y(t,8,this.length),$.read(this,t,!1,52,8)},a.prototype.writeUIntLE=function(t,e,n,r){if(t=+t,e=0|e,n=0|n,!r){var o=Math.pow(2,8*n)-1;F(this,t,e,n,o,0)}var i=1,a=0;for(this[e]=255&t;++a<n&&(i*=256);)this[e+a]=t/i&255;return e+n},a.prototype.writeUIntBE=function(t,e,n,r){if(t=+t,e=0|e,n=0|n,!r){var o=Math.pow(2,8*n)-1;F(this,t,e,n,o,0)}var i=n-1,a=1;for(this[e+i]=255&t;--i>=0&&(a*=256);)this[e+i]=t/a&255;return e+n},a.prototype.writeUInt8=function(t,e,n){return t=+t,e=0|e,n||F(this,t,e,1,255,0),a.TYPED_ARRAY_SUPPORT||(t=Math.floor(t)),this[e]=255&t,e+1},a.prototype.writeUInt16LE=function(t,e,n){return t=+t,e=0|e,n||F(this,t,e,2,65535,0),a.TYPED_ARRAY_SUPPORT?(this[e]=255&t,this[e+1]=t>>>8):z(this,t,e,!0),e+2},a.prototype.writeUInt16BE=function(t,e,n){return t=+t,e=0|e,n||F(this,t,e,2,65535,0),a.TYPED_ARRAY_SUPPORT?(this[e]=t>>>8,this[e+1]=255&t):z(this,t,e,!1),e+2},a.prototype.writeUInt32LE=function(t,e,n){return t=+t,e=0|e,n||F(this,t,e,4,4294967295,0),a.TYPED_ARRAY_SUPPORT?(this[e+3]=t>>>24,this[e+2]=t>>>16,this[e+1]=t>>>8,this[e]=255&t):I(this,t,e,!0),e+4},a.prototype.writeUInt32BE=function(t,e,n){return t=+t,e=0|e,n||F(this,t,e,4,4294967295,0),a.TYPED_ARRAY_SUPPORT?(this[e]=t>>>24,this[e+1]=t>>>16,this[e+2]=t>>>8,this[e+3]=255&t):I(this,t,e,!1),e+4},a.prototype.writeIntLE=function(t,e,n,r){if(t=+t,e=0|e,!r){var o=Math.pow(2,8*n-1);F(this,t,e,n,o-1,-o)}var i=0,a=1,s=0;for(this[e]=255&t;++i<n&&(a*=256);)t<0&&0===s&&0!==this[e+i-1]&&(s=1),this[e+i]=(t/a>>0)-s&255;return e+n},a.prototype.writeIntBE=function(t,e,n,r){if(t=+t,e=0|e,!r){var o=Math.pow(2,8*n-1);F(this,t,e,n,o-1,-o)}var i=n-1,a=1,s=0;for(this[e+i]=255&t;--i>=0&&(a*=256);)t<0&&0===s&&0!==this[e+i+1]&&(s=1),this[e+i]=(t/a>>0)-s&255;return e+n},a.prototype.writeInt8=function(t,e,n){return t=+t,e=0|e,n||F(this,t,e,1,127,-128),a.TYPED_ARRAY_SUPPORT||(t=Math.floor(t)),t<0&&(t=255+t+1),this[e]=255&t,e+1},a.prototype.writeInt16LE=function(t,e,n){return t=+t,e=0|e,n||F(this,t,e,2,32767,-32768),a.TYPED_ARRAY_SUPPORT?(this[e]=255&t,this[e+1]=t>>>8):z(this,t,e,!0),e+2},a.prototype.writeInt16BE=function(t,e,n){return t=+t,e=0|e,n||F(this,t,e,2,32767,-32768),a.TYPED_ARRAY_SUPPORT?(this[e]=t>>>8,this[e+1]=255&t):z(this,t,e,!1),e+2},a.prototype.writeInt32LE=function(t,e,n){return t=+t,e=0|e,n||F(this,t,e,4,2147483647,-2147483648),a.TYPED_ARRAY_SUPPORT?(this[e]=255&t,this[e+1]=t>>>8,this[e+2]=t>>>16,this[e+3]=t>>>24):I(this,t,e,!0),e+4},a.prototype.writeInt32BE=function(t,e,n){return t=+t,e=0|e,n||F(this,t,e,4,2147483647,-2147483648),t<0&&(t=4294967295+t+1),a.TYPED_ARRAY_SUPPORT?(this[e]=t>>>24,this[e+1]=t>>>16,this[e+2]=t>>>8,this[e+3]=255&t):I(this,t,e,!1),e+4},a.prototype.writeFloatLE=function(t,e,n){return K(this,t,e,!0,n)},a.prototype.writeFloatBE=function(t,e,n){return K(this,t,e,!1,n)},a.prototype.writeDoubleLE=function(t,e,n){return G(this,t,e,!0,n)},a.prototype.writeDoubleBE=function(t,e,n){return G(this,t,e,!1,n)},a.prototype.copy=function(t,e,n,r){if(n||(n=0),r||0===r||(r=this.length),e>=t.length&&(e=t.length),e||(e=0),r>0&&r<n&&(r=n),r===n)return 0;if(0===t.length||0===this.length)return 0;if(e<0)throw new RangeError("targetStart out of bounds");if(n<0||n>=this.length)throw new RangeError("sourceStart out of bounds");if(r<0)throw new RangeError("sourceEnd out of bounds");r>this.length&&(r=this.length),t.length-e<r-n&&(r=t.length-e+n);var o,i=r-n;if(this===t&&n<e&&e<r)for(o=i-1;o>=0;--o)t[o+e]=this[o+n];else if(i<1e3||!a.TYPED_ARRAY_SUPPORT)for(o=0;o<i;++o)t[o+e]=this[o+n];else Uint8Array.prototype.set.call(t,this.subarray(n,n+i),e);return i},a.prototype.fill=function(t,e,n,r){if("string"==typeof t){if("string"==typeof e?(r=e,e=0,n=this.length):"string"==typeof n&&(r=n,n=this.length),1===t.length){var o=t.charCodeAt(0);o<256&&(t=o)}if(void 0!==r&&"string"!=typeof r)throw new TypeError("encoding must be a string");if("string"==typeof r&&!a.isEncoding(r))throw new TypeError("Unknown encoding: "+r)}else"number"==typeof t&&(t=255&t);if(e<0||this.length<e||this.length<n)throw new RangeError("Out of range index");if(n<=e)return this;e>>>=0,n=void 0===n?this.length:n>>>0,t||(t=0);var i;if("number"==typeof t)for(i=e;i<n;++i)this[i]=t;else{var s=a.isBuffer(t)?t:W(new a(t,r).toString()),c=s.length;for(i=0;i<n-e;++i)this[i+e]=s[i%c]}return this};var et=/[^+\/0-9A-Za-z-_]/g}).call(this,"undefined"!=typeof global?global:"undefined"!=typeof self?self:"undefined"!=typeof window?window:{})},{"base64-js":1,ieee754:4,isarray:5}],3:[function(e,n,r){(function(e){/*!
	 * @license deepcopy.js Copyright(c) 2013 sasa+1
	 * https://github.com/sasaplus1/deepcopy.js
	 * Released under the MIT license.
	 */
	!function(e,o){"object"==typeof r&&"object"==typeof n?n.exports=o():"function"==typeof t&&t.amd?t([],o):"object"==typeof r?r.deepcopy=o():e.deepcopy=o()}(this,function(){return function(t){function e(r){if(n[r])return n[r].exports;var o=n[r]={exports:{},id:r,loaded:!1};return t[r].call(o.exports,o,o.exports,e),o.loaded=!0,o.exports}var n={};return e.m=t,e.c=n,e.p="",e(0)}([function(t,e,n){"use strict";t.exports=n(3)},function(t,n){"use strict";function r(t,e){if("[object Array]"!==o.call(t))throw new TypeError("array must be an Array");var n=void 0,r=void 0,i=void 0;for(n=0,r=t.length;r>n;++n)if(i=t[n],i===e||i!==i&&e!==e)return n;return-1}n.__esModule=!0;var o=Object.prototype.toString,i="undefined"!=typeof e?function(t){return e.isBuffer(t)}:function(){return!1},a="function"==typeof Object.keys?function(t){return Object.keys(t)}:function(t){var e=typeof t;if(null===t||"function"!==e&&"object"!==e)throw new TypeError("obj must be an Object");var n=[],r=void 0;for(r in t)Object.prototype.hasOwnProperty.call(t,r)&&n.push(r);return n},s="function"==typeof Symbol?function(t){return Object.getOwnPropertySymbols(t)}:function(){return[]};n.getKeys=a,n.getSymbols=s,n.indexOf=r,n.isBuffer=i},function(t,n,r){"use strict";function o(t,e){var n=a(t);return null!==n?n:i(t,e)}function i(t,n){if("function"!=typeof n)throw new TypeError("customizer is must be a Function");if("function"==typeof t){var r=String(t);return/^\s*function\s*\S*\([^\)]*\)\s*{\s*\[native code\]\s*}/.test(r)?t:new Function("return "+String(r))()}var o=c.call(t);if("[object Array]"===o)return[];if("[object Object]"===o&&t.constructor===Object)return{};if("[object Date]"===o)return new Date(t.getTime());if("[object RegExp]"===o){var i=String(t),a=i.lastIndexOf("/");return new RegExp(i.slice(1,a),i.slice(a+1))}if((0,s.isBuffer)(t)){var l=new e(t.length);return t.copy(l),l}var u=n(t);return void 0!==u?u:null}function a(t){var e=typeof t;return null!==t&&"object"!==e&&"function"!==e?t:null}n.__esModule=!0,n.copyValue=n.copyCollection=n.copy=void 0;var s=r(1),c=Object.prototype.toString;n.copy=o,n.copyCollection=i,n.copyValue=a},function(t,e,n){"use strict";function r(t){}function o(t){var e=arguments.length<=1||void 0===arguments[1]?r:arguments[1];if(null===t)return null;var n=(0,a.copyValue)(t);if(null!==n)return n;var o=(0,a.copyCollection)(t,e),s=null!==o?o:t,c=[t],l=[s];return i(t,e,s,c,l)}function i(t,e,n,r,o){if(null===t)return null;var c=(0,a.copyValue)(t);if(null!==c)return c;var l=(0,s.getKeys)(t).concat((0,s.getSymbols)(t)),u=void 0,f=void 0,p=void 0,d=void 0,h=void 0,m=void 0,g=void 0,b=void 0;for(u=0,f=l.length;f>u;++u)p=l[u],d=t[p],h=(0,s.indexOf)(r,d),m=void 0,g=void 0,b=void 0,-1===h?(m=(0,a.copy)(d,e),g=null!==m?m:d,null!==d&&/^(?:function|object)$/.test(typeof d)&&(r.push(d),o.push(g))):b=o[h],n[p]=b||i(d,e,g,r,o);return n}e.__esModule=!0;var a=n(2),s=n(1);e["default"]=o,t.exports=e["default"]}])})}).call(this,e("buffer").Buffer)},{buffer:2}],4:[function(t,e,n){n.read=function(t,e,n,r,o){var i,a,s=8*o-r-1,c=(1<<s)-1,l=c>>1,u=-7,f=n?o-1:0,p=n?-1:1,d=t[e+f];for(f+=p,i=d&(1<<-u)-1,d>>=-u,u+=s;u>0;i=256*i+t[e+f],f+=p,u-=8);for(a=i&(1<<-u)-1,i>>=-u,u+=r;u>0;a=256*a+t[e+f],f+=p,u-=8);if(0===i)i=1-l;else{if(i===c)return a?NaN:(d?-1:1)*(1/0);a+=Math.pow(2,r),i-=l}return(d?-1:1)*a*Math.pow(2,i-r)},n.write=function(t,e,n,r,o,i){var a,s,c,l=8*i-o-1,u=(1<<l)-1,f=u>>1,p=23===o?Math.pow(2,-24)-Math.pow(2,-77):0,d=r?0:i-1,h=r?1:-1,m=e<0||0===e&&1/e<0?1:0;for(e=Math.abs(e),isNaN(e)||e===1/0?(s=isNaN(e)?1:0,a=u):(a=Math.floor(Math.log(e)/Math.LN2),e*(c=Math.pow(2,-a))<1&&(a--,c*=2),e+=a+f>=1?p/c:p*Math.pow(2,1-f),e*c>=2&&(a++,c/=2),a+f>=u?(s=0,a=u):a+f>=1?(s=(e*c-1)*Math.pow(2,o),a+=f):(s=e*Math.pow(2,f-1)*Math.pow(2,o),a=0));o>=8;t[n+d]=255&s,d+=h,s/=256,o-=8);for(a=a<<o|s,l+=o;l>0;t[n+d]=255&a,d+=h,a/=256,l-=8);t[n+d-h]|=128*m}},{}],5:[function(t,e,n){var r={}.toString;e.exports=Array.isArray||function(t){return"[object Array]"==r.call(t)}},{}],6:[function(t,e,n){function r(t){return/^[a-z_$][0-9a-z_$]*$/gi.test(t)&&!i.test(t)}function o(t){if(a)return t.toString();var e=t.source.replace(/\//g,function(t,e,n){return 0===e||"\\"!==n[e-1]?"\\/":"/"}),n=(t.global&&"g"||"")+(t.ignoreCase&&"i"||"")+(t.multiline&&"m"||"");return"/"+e+"/"+n}/* toSource by Marcello Bastea-Forte - zlib license */
	e.exports=function(t,e,n,i){function a(t,e,n,i,s){function c(t){return n.slice(1)+t.join(","+(n&&"\n")+l)+(n?" ":"")}var l=i+n;switch(t=e?e(t):t,typeof t){case"string":return JSON.stringify(t);case"boolean":case"number":case"undefined":return""+t;case"function":return t.toString()}if(null===t)return"null";if(t instanceof RegExp)return o(t);if(t instanceof Date)return"new Date("+t.getTime()+")";var u=s.indexOf(t)+1;if(u>0)return"{$circularReference:"+u+"}";if(s.push(t),Array.isArray(t))return"["+c(t.map(function(t){return a(t,e,n,l,s.slice())}))+"]";var f=Object.keys(t);return f.length?"{"+c(f.map(function(o){return(r(o)?o:JSON.stringify(o))+":"+a(t[o],e,n,l,s.slice())}))+"}":"{}"}var s=[];return a(t,e,void 0===n?"  ":n||"",i||"",s)};var i=/^(abstract|boolean|break|byte|case|catch|char|class|const|continue|debugger|default|delete|do|double|else|enum|export|extends|false|final|finally|float|for|function|goto|if|implements|import|in|instanceof|int|interface|long|native|new|null|package|private|protected|public|return|short|static|super|switch|synchronized|this|throw|throws|transient|true|try|typeof|undefined|var|void|volatile|while|with)$/,a="\\/"===new RegExp("/").source},{}],7:[function(t,e,n){e.exports={name:"pebble-clay",version:"1.0.4",description:"Pebble Config Framework",scripts:{"test-travis":"./node_modules/.bin/gulp && ./node_modules/.bin/karma start ./test/karma.conf.js --single-run --browsers chromeTravisCI && ./node_modules/.bin/eslint ./","test-debug":"(export DEBUG=true && ./node_modules/.bin/gulp && ./node_modules/.bin/karma start ./test/karma.conf.js --no-single-run)",test:"./node_modules/.bin/gulp && ./node_modules/.bin/karma start ./test/karma.conf.js --single-run",lint:"./node_modules/.bin/eslint ./",build:"gulp",dev:"gulp dev","pebble-clean":"rm -rf tmp src/js/index.js && pebble clean","pebble-publish":"npm run pebble-clean && npm run build && pebble build && pebble package publish && npm run pebble-clean","pebble-build":"npm run build && pebble build"},repository:{type:"git",url:"git+https://github.com/pebble/clay.git"},keywords:["pebble","config","configuration","pebble-package"],author:"Pebble Technology",license:"MIT",bugs:{url:"https://github.com/pebble/clay/issues"},pebble:{projectType:"package",sdkVersion:"3",targetPlatforms:["aplite","basalt","chalk","diorite","emery"],resources:{media:[]},capabilities:["configurable"]},homepage:"https://github.com/pebble/clay#readme",devDependencies:{autoprefixer:"^6.3.1",bourbon:"^4.2.6",browserify:"^13.0.0","browserify-istanbul":"^0.2.1",chai:"^3.4.1",deamdify:"^0.2.0",deepcopy:"^0.6.1",del:"^2.0.2",eslint:"^1.5.1","eslint-config-pebble":"^1.2.0","eslint-plugin-standard":"^1.3.1",gulp:"^3.9.0","gulp-autoprefixer":"^3.1.0","gulp-htmlmin":"^1.3.0","gulp-inline":"0.0.15","gulp-insert":"^0.5.0","gulp-sass":"^2.1.1","gulp-sourcemaps":"^1.6.0","gulp-uglify":"^1.5.2",joi:"^6.10.1",karma:"^0.13.19","karma-browserify":"^5.0.1","karma-chrome-launcher":"^0.2.2","karma-coverage":"^0.5.3","karma-mocha":"^0.2.1","karma-mocha-reporter":"^1.1.5","karma-source-map-support":"^1.1.0","karma-threshold-reporter":"^0.1.15",mocha:"^2.3.4",postcss:"^5.0.14","require-from-string":"^1.1.0",sassify:"^0.9.1",sinon:"^1.17.3",stringify:"^3.2.0",through:"^2.3.8",tosource:"^1.0.0","vinyl-buffer":"^1.0.0","vinyl-source-stream":"^1.1.0",watchify:"^3.7.0"},dependencies:{}}},{}],8:[function(t,e,n){"use strict";e.exports={name:"button",template:t("../../templates/components/button.tpl"),style:t("../../styles/clay/components/button.scss"),manipulator:"button",defaults:{primary:!1,attributes:{},description:""}}},{"../../styles/clay/components/button.scss":21,"../../templates/components/button.tpl":30}],9:[function(t,e,n){"use strict";e.exports={name:"checkboxgroup",template:t("../../templates/components/checkboxgroup.tpl"),style:t("../../styles/clay/components/checkboxgroup.scss"),manipulator:"checkboxgroup",defaults:{label:"",options:[],description:""}}},{"../../styles/clay/components/checkboxgroup.scss":22,"../../templates/components/checkboxgroup.tpl":31}],10:[function(t,e,n){"use strict";e.exports={name:"color",template:t("../../templates/components/color.tpl"),style:t("../../styles/clay/components/color.scss"),manipulator:"color",defaults:{label:"",description:""},initialize:function(t,e){function n(t){if("number"==typeof t)t=t.toString(16);else if(!t)return"transparent";return t=r(t),"#"+(f?p[t]:t)}function r(t){for(t=t.toLowerCase();t.length<6;)t="0"+t;return t}function o(t){switch(typeof t){case"number":return r(t.toString(16));case"string":return t.replace(/^#|^0x/,"");default:return t}}function i(t){return t.reduce(function(t,e){return t.concat(e)},[])}function a(t){t=t.replace(/^#|^0x/,"");var e=parseInt(t.slice(0,2),16)/255,n=parseInt(t.slice(2,4),16)/255,r=parseInt(t.slice(4),16)/255;e=e>.04045?Math.pow((e+.055)/1.055,2.4):e/12.92,n=n>.04045?Math.pow((n+.055)/1.055,2.4):n/12.92,r=r>.04045?Math.pow((r+.055)/1.055,2.4):r/12.92;var o=(.4124*e+.3576*n+.1805*r)/.95047,i=(.2126*e+.7152*n+.0722*r)/1,a=(.0193*e+.1192*n+.9505*r)/1.08883;return o=o>.008856?Math.pow(o,1/3):7.787*o+16/116,i=i>.008856?Math.pow(i,1/3):7.787*i+16/116,a=a>.008856?Math.pow(a,1/3):7.787*a+16/116,[116*i-16,500*(o-i),200*(i-a)]}function s(t,e){var n=t[0]-e[0],r=t[1]-e[1],o=t[2]-e[2];return Math.sqrt(Math.pow(n,2)+Math.pow(r,2)+Math.pow(o,2))}function c(){return!e.meta.activeWatchInfo||2===e.meta.activeWatchInfo.firmware.major||["aplite","diorite"].indexOf(e.meta.activeWatchInfo.platform)>-1&&!u.config.allowGray?d.BLACK_WHITE:["aplite","diorite"].indexOf(e.meta.activeWatchInfo.platform)>-1&&u.config.allowGray?d.GRAY:d.COLOR}var l=t.HTML,u=this;u.roundColorToLayout=function(t){var e=o(t);if(m.indexOf(e)===-1){var n=a(e),r=m.map(function(t){var e=a(o(t));return s(n,e)}),i=Math.min.apply(Math,r),c=r.indexOf(i);e=m[c]}return parseInt(e,16)};var f=u.config.sunlight!==!1,p={"000000":"000000","000055":"001e41","0000aa":"004387","0000ff":"0068ca","005500":"2b4a2c","005555":"27514f","0055aa":"16638d","0055ff":"007dce","00aa00":"5e9860","00aa55":"5c9b72","00aaaa":"57a5a2","00aaff":"4cb4db","00ff00":"8ee391","00ff55":"8ee69e","00ffaa":"8aebc0","00ffff":"84f5f1",550000:"4a161b",550055:"482748","5500aa":"40488a","5500ff":"2f6bcc",555500:"564e36",555555:"545454","5555aa":"4f6790","5555ff":"4180d0","55aa00":"759a64","55aa55":"759d76","55aaaa":"71a6a4","55aaff":"69b5dd","55ff00":"9ee594","55ff55":"9de7a0","55ffaa":"9becc2","55ffff":"95f6f2",aa0000:"99353f",aa0055:"983e5a",aa00aa:"955694",aa00ff:"8f74d2",aa5500:"9d5b4d",aa5555:"9d6064",aa55aa:"9a7099",aa55ff:"9587d5",aaaa00:"afa072",aaaa55:"aea382",aaaaaa:"ababab",ffffff:"ffffff",aaaaff:"a7bae2",aaff00:"c9e89d",aaff55:"c9eaa7",aaffaa:"c7f0c8",aaffff:"c3f9f7",ff0000:"e35462",ff0055:"e25874",ff00aa:"e16aa3",ff00ff:"de83dc",ff5500:"e66e6b",ff5555:"e6727c",ff55aa:"e37fa7",ff55ff:"e194df",ffaa00:"f1aa86",ffaa55:"f1ad93",ffaaaa:"efb5b8",ffaaff:"ecc3eb",ffff00:"ffeeab",ffff55:"fff1b5",ffffaa:"fff6d3"},d={COLOR:[[!1,!1,"55ff00","aaff55",!1,"ffff55","ffffaa",!1,!1],[!1,"aaffaa","55ff55","00ff00","aaff00","ffff00","ffaa55","ffaaaa",!1],["55ffaa","00ff55","00aa00","55aa00","aaaa55","aaaa00","ffaa00","ff5500","ff5555"],["aaffff","00ffaa","00aa55","55aa55","005500","555500","aa5500","ff0000","ff0055"],[!1,"55aaaa","00aaaa","005555","ffffff","000000","aa5555","aa0000",!1],["55ffff","00ffff","00aaff","0055aa","aaaaaa","555555","550000","aa0055","ff55aa"],["55aaff","0055ff","0000ff","0000aa","000055","550055","aa00aa","ff00aa","ffaaff"],[!1,"5555aa","5555ff","5500ff","5500aa","aa00ff","ff00ff","ff55ff",!1],[!1,!1,!1,"aaaaff","aa55ff","aa55aa",!1,!1,!1]],GRAY:[["000000","aaaaaa","ffffff"]],BLACK_WHITE:[["000000","ffffff"]]},h=u.config.layout||c();"string"==typeof h&&(h=d[h]),Array.isArray(h[0])||(h=[h]);var m=i(h).map(function(t){return o(t)}).filter(function(t){return t}),g="",b=h.length,y=0;h.forEach(function(t){y=t.length>y?t.length:y});for(var v=100/y,A=100/b,w=u.$element,k=0;k<b;k++)for(var x=0;x<y;x++){var M=o(h[k][x]),T=M?" selectable":"",R=0===k&&0===x||0===k&&!h[k][x-1]||!h[k][x-1]&&!h[k-1][x]?" rounded-tl":"",P=0===k&&!h[k][x+1]||!h[k][x+1]&&!h[k-1][x]?" rounded-tr ":"",O=k===h.length-1&&0===x||k===h.length-1&&!h[k][x-1]||!h[k][x-1]&&!h[k+1][x]?" rounded-bl":"",E=k===h.length-1&&!h[k][x+1]||!h[k][x+1]&&!h[k+1][x]?" rounded-br":"";g+='<i class="color-box '+T+R+P+O+E+'" '+(M?'data-value="'+parseInt(M,16)+'" ':"")+'style="width:'+v+"%; height:"+A+"%; background:"+n(M)+';"></i>'}var j=0;3===y&&(j=5),2===y&&(j=8);var B=j*v/A+"%",S=j+"%";w.select(".color-box-container").add(l(g)).set("$paddingTop",B).set("$paddingRight",S).set("$paddingBottom",B).set("$paddingLeft",S),w.select(".color-box-wrap").set("$paddingBottom",v/A*100+"%");var D=w.select(".value"),N=w.select(".picker-wrap"),Y=u.$manipulatorTarget.get("disabled");w.select("label").on("click",function(){Y||N.set("show")}),u.on("change",function(){var t=u.get();D.set("$background-color",n(t)),w.select(".color-box").set("-selected"),w.select('.color-box[data-value="'+t+'"]').set("+selected")}),w.select(".color-box.selectable").on("click",function(t){u.set(parseInt(t.target.dataset.value,10)),N.set("-show")}),N.on("click",function(){N.set("-show")}),u.on("disabled",function(){Y=!0}),u.on("enabled",function(){Y=!1}),u._layout=h}}},{"../../styles/clay/components/color.scss":23,"../../templates/components/color.tpl":32}],11:[function(t,e,n){"use strict";e.exports={name:"footer",template:t("../../templates/components/footer.tpl"),manipulator:"html"}},{"../../templates/components/footer.tpl":33}],12:[function(t,e,n){"use strict";e.exports={name:"heading",template:t("../../templates/components/heading.tpl"),manipulator:"html",defaults:{size:4}}},{"../../templates/components/heading.tpl":34}],13:[function(t,e,n){"use strict";e.exports={color:t("./color"),footer:t("./footer"),heading:t("./heading"),input:t("./input"),select:t("./select"),submit:t("./submit"),text:t("./text"),toggle:t("./toggle"),radiogroup:t("./radiogroup"),checkboxgroup:t("./checkboxgroup"),button:t("./button"),slider:t("./slider")}},{"./button":8,"./checkboxgroup":9,"./color":10,"./footer":11,"./heading":12,"./input":14,"./radiogroup":15,"./select":16,"./slider":17,"./submit":18,"./text":19,"./toggle":20}],14:[function(t,e,n){"use strict";e.exports={name:"input",template:t("../../templates/components/input.tpl"),style:t("../../styles/clay/components/input.scss"),manipulator:"val",defaults:{label:"",description:"",attributes:{}}}},{"../../styles/clay/components/input.scss":24,"../../templates/components/input.tpl":35}],15:[function(t,e,n){"use strict";e.exports={name:"radiogroup",template:t("../../templates/components/radiogroup.tpl"),style:t("../../styles/clay/components/radiogroup.scss"),manipulator:"radiogroup",defaults:{label:"",options:[],description:"",attributes:{}}}},{"../../styles/clay/components/radiogroup.scss":25,"../../templates/components/radiogroup.tpl":36}],16:[function(t,e,n){"use strict";e.exports={name:"select",template:t("../../templates/components/select.tpl"),style:t("../../styles/clay/components/select.scss"),manipulator:"val",defaults:{label:"",options:[],description:"",attributes:{}},initialize:function(){function t(){var t=e.$manipulatorTarget.get("selectedIndex"),r=e.$manipulatorTarget.select("option"),o=r[t]&&r[t].innerHTML;n.set("innerHTML",o)}var e=this,n=e.$element.select(".value");t(),e.on("change",t)}}},{"../../styles/clay/components/select.scss":26,"../../templates/components/select.tpl":37}],17:[function(t,e,n){"use strict";e.exports={name:"slider",template:t("../../templates/components/slider.tpl"),style:t("../../styles/clay/components/slider.scss"),manipulator:"slider",defaults:{label:"",description:"",min:0,max:100,step:1,attributes:{}},initialize:function(){function t(){var t=e.get().toFixed(e.precision);n.set("value",t),r.set("innerHTML",t)}var e=this,n=e.$element.select(".value"),r=e.$element.select(".value-pad"),o=e.$manipulatorTarget,i=o.get("step");i=i.toString(10).split(".")[1],e.precision=i?i.length:0,e.on("change",t),o.on("|input",t),t(),n.on("|input",function(){r.set("innerHTML",this.get("value"))}),n.on("|change",function(){e.set(this.get("value")),t()})}}},{"../../styles/clay/components/slider.scss":27,"../../templates/components/slider.tpl":38}],18:[function(t,e,n){"use strict";e.exports={name:"submit",template:t("../../templates/components/submit.tpl"),style:t("../../styles/clay/components/submit.scss"),manipulator:"button",defaults:{attributes:{}}}},{"../../styles/clay/components/submit.scss":28,"../../templates/components/submit.tpl":39}],19:[function(t,e,n){"use strict";e.exports={name:"text",template:t("../../templates/components/text.tpl"),manipulator:"html"}},{"../../templates/components/text.tpl":40}],20:[function(t,e,n){"use strict";e.exports={name:"toggle",template:t("../../templates/components/toggle.tpl"),style:t("../../styles/clay/components/toggle.scss"),manipulator:"checked",defaults:{label:"",description:"",attributes:{}}}},{"../../styles/clay/components/toggle.scss":29,"../../templates/components/toggle.tpl":41}],21:[function(t,e,n){e.exports=".component-button { text-align: center; }\n\n.section .component-button { padding-bottom: 0; }\n\n.component-button .description { padding-left: 0; padding-right: 0; }\n"},{}],22:[function(t,e,n){e.exports=".component-checkbox { display: block; }\n\n.section .component-checkbox { padding-right: 0.375rem; }\n\n.component-checkbox > .label { display: block; padding-bottom: 0.35rem; }\n\n.component-checkbox .checkbox-group { padding-bottom: 0.35rem; }\n\n.component-checkbox .checkbox-group label { padding: 0.35rem 0.375rem; }\n\n.component-checkbox .checkbox-group .label { font-size: 0.9em; }\n\n.component-checkbox .checkbox-group input { opacity: 0; position: absolute; }\n\n.component-checkbox .checkbox-group i { display: block; position: relative; border-radius: 0.25rem; width: 1.4rem; height: 1.4rem; border: 0.11765rem solid #767676; -webkit-flex-shrink: 0; flex-shrink: 0; }\n\n.component-checkbox .checkbox-group input:checked + i { border-color: #ff4700; background: #ff4700; }\n\n.component-checkbox .checkbox-group input:checked + i:after { content: ''; box-sizing: border-box; -webkit-transform: rotate(45deg); transform: rotate(45deg); position: absolute; left: 0.35rem; top: -0.05rem; display: block; width: 0.5rem; height: 1rem; border: 0 solid #ffffff; border-right-width: 0.11765rem; border-bottom-width: 0.11765rem; }\n\n.component-checkbox .description { padding-left: 0; padding-right: 0; }\n"},{}],23:[function(t,e,n){e.exports=".section .component-color { padding: 0; }\n\n.component-color .value { width: 2.2652rem; height: 1.4rem; border-radius: 0.7rem; box-shadow: 0 0.1rem 0.1rem #2f2f2f; display: block; background: #000; }\n\n.component-color .picker-wrap { left: 0; top: 0; right: 0; bottom: 0; position: fixed; padding: 0.7rem 0.375rem; background: rgba(0, 0, 0, 0.65); opacity: 0; -webkit-transition: opacity 100ms ease-in 175ms; transition: opacity 100ms ease-in 175ms; pointer-events: none; z-index: 100; display: -webkit-box; display: -webkit-flex; display: flex; -webkit-box-orient: vertical; -webkit-box-direction: normal; -webkit-flex-direction: column; flex-direction: column; -webkit-box-pack: center; -webkit-justify-content: center; justify-content: center; -webkit-box-align: center; -webkit-align-items: center; align-items: center; }\n\n.component-color .picker-wrap .picker { padding: 0.7rem 0.75rem; background: #484848; box-shadow: 0 0.17647rem 0.88235rem rgba(0, 0, 0, 0.4); border-radius: 0.25rem; width: 100%; max-width: 26rem; overflow: auto; }\n\n.component-color .picker-wrap.show { -webkit-transition-delay: 0ms; transition-delay: 0ms; pointer-events: auto; opacity: 1; }\n\n.component-color .color-box-wrap { box-sizing: border-box; position: relative; height: 0; width: 100%; padding: 0 0 100% 0; }\n\n.component-color .color-box-wrap .color-box-container { position: absolute; height: 99.97%; width: 100%; left: 0; top: 0; }\n\n.component-color .color-box-wrap .color-box-container .color-box { float: left; cursor: pointer; -webkit-tap-highlight-color: transparent; }\n\n.component-color .color-box-wrap .color-box-container .color-box.rounded-tl { border-top-left-radius: 0.25rem; }\n\n.component-color .color-box-wrap .color-box-container .color-box.rounded-tr { border-top-right-radius: 0.25rem; }\n\n.component-color .color-box-wrap .color-box-container .color-box.rounded-bl { border-bottom-left-radius: 0.25rem; }\n\n.component-color .color-box-wrap .color-box-container .color-box.rounded-br { border-bottom-right-radius: 0.25rem; }\n\n.component-color .color-box-wrap .color-box-container .color-box.selected { -webkit-transform: scale(1.1); transform: scale(1.1); border-radius: 0.25rem; box-shadow: #111 0 0 0.24rem; position: relative; z-index: 100; }\n"},{}],24:[function(t,e,n){e.exports=".section .component-input { padding: 0; }\n\n.component-input label { display: block; }\n\n.component-input .label { padding-bottom: 0.7rem; }\n\n.component-input .input { position: relative; min-width: 100%; margin-top: 0.7rem; margin-left: 0; }\n\n.component-input input { display: block; width: 100%; background: #333333; border-radius: 0.25rem; padding: 0.35rem 0.375rem; border: none; vertical-align: baseline; color: #ffffff; font-size: inherit; -webkit-appearance: none; appearance: none; min-height: 2.1rem; }\n\n.component-input input::-webkit-input-placeholder { color: #858585; }\n\n.component-input input::-moz-placeholder { color: #858585; }\n\n.component-input input:-moz-placeholder { color: #858585; }\n\n.component-input input:-ms-input-placeholder { color: #858585; }\n\n.component-input input:focus { border: none; box-shadow: none; }\n\n.component-input input:focus::-webkit-input-placeholder { color: #666666; }\n\n.component-input input:focus::-moz-placeholder { color: #666666; }\n\n.component-input input:focus:-moz-placeholder { color: #666666; }\n\n.component-input input:focus:-ms-input-placeholder { color: #666666; }\n"},{}],25:[function(t,e,n){e.exports=".component-radio { display: block; }\n\n.section .component-radio { padding-right: 0.375rem; }\n\n.component-radio > .label { display: block; padding-bottom: 0.35rem; }\n\n.component-radio .radio-group { padding-bottom: 0.35rem; }\n\n.component-radio .radio-group label { padding: 0.35rem 0.375rem; }\n\n.component-radio .radio-group .label { font-size: 0.9em; }\n\n.component-radio .radio-group input { opacity: 0; position: absolute; }\n\n.component-radio .radio-group i { display: block; position: relative; border-radius: 1.4rem; width: 1.4rem; height: 1.4rem; border: 2px solid #767676; -webkit-flex-shrink: 0; flex-shrink: 0; }\n\n.component-radio .radio-group input:checked + i { border-color: #ff4700; }\n\n.component-radio .radio-group input:checked + i:after { content: ''; display: block; position: absolute; left: 15%; right: 15%; top: 15%; bottom: 15%; border-radius: 1.4rem; background: #ff4700; }\n\n.component-radio .description { padding-left: 0; padding-right: 0; }\n"},{}],26:[function(t,e,n){e.exports='.section .component-select { padding: 0; }\n\n.component-select label { position: relative; }\n\n.component-select .value { position: relative; padding-right: 1.1rem; display: block; }\n\n.component-select .value:after { content: ""; position: absolute; right: 0; top: 50%; margin-top: -0.1rem; height: 0; width: 0; border-left: 0.425rem solid transparent; border-right: 0.425rem solid transparent; border-top: 0.425rem solid #ff4700; }\n\n.component-select select { opacity: 0; position: absolute; display: block; left: 0; right: 0; top: 0; bottom: 0; width: 100%; border: none; margin: 0; padding: 0; }\n'},{}],27:[function(t,e,n){e.exports=".section .component-slider { padding: 0; }\n\n.component-slider label { display: block; }\n\n.component-slider .label-container { display: -webkit-box; display: -webkit-flex; display: flex; -webkit-box-align: center; -webkit-align-items: center; align-items: center; width: 100%; padding-bottom: 0.7rem; }\n\n.component-slider .label { -webkit-box-flex: 1; -webkit-flex: 1; flex: 1; min-width: 1rem; display: block; padding-right: 0.75rem; }\n\n.component-slider .value-wrap { display: block; position: relative; }\n\n.component-slider .value, .component-slider .value-pad { display: block; background: #333333; border-radius: 0.25rem; padding: 0.35rem 0.375rem; border: none; vertical-align: baseline; color: #ffffff; text-align: right; margin: 0; min-width: 1rem; }\n\n.component-slider .value-pad { visibility: hidden; }\n\n.component-slider .value-pad:before { content: ' '; display: inline-block; }\n\n.component-slider .value { max-width: 100%; position: absolute; left: 0; top: 0; }\n\n.component-slider .input-wrap { padding: 0 0.75rem 0.7rem; }\n\n.component-slider .input { display: block; position: relative; min-width: 100%; height: 1.4rem; overflow: hidden; margin-left: 0; }\n\n.component-slider .input:before { content: ''; display: block; position: absolute; height: 0.17647rem; background: #666666; width: 100%; top: 0.61176rem; }\n\n.component-slider .input .slider { display: block; width: 100%; -webkit-appearance: none; appearance: none; position: relative; height: 1.4rem; margin: 0; background-color: transparent; }\n\n.component-slider .input .slider:focus { outline: none; }\n\n.component-slider .input .slider::-webkit-slider-runnable-track { border: none; height: 1.4rem; width: 100%; background-color: transparent; }\n\n.component-slider .input .slider::-webkit-slider-thumb { -webkit-appearance: none; appearance: none; position: relative; height: 1.4rem; width: 1.4rem; background-color: #ff4700; border-radius: 50%; }\n\n.component-slider .input .slider::-webkit-slider-thumb:before { content: \"\"; position: absolute; left: -1000px; top: 0.61176rem; height: 0.17647rem; width: 1001px; background: #ff4700; }\n"},{}],28:[function(t,e,n){e.exports=".component-submit { text-align: center; }\n"},{}],29:[function(t,e,n){e.exports=".section .component-toggle { padding: 0; }\n\n.component-toggle input { display: none; }\n\n.component-toggle .graphic { display: inline-block; position: relative; }\n\n.component-toggle .graphic .slide { display: block; border-radius: 1.05rem; height: 1.05rem; width: 2.2652rem; background: #2f2f2f; -webkit-transition: background-color 150ms linear; transition: background-color 150ms linear; }\n\n.component-toggle .graphic .marker { background: #ececec; width: 1.4rem; height: 1.4rem; border-radius: 1.4rem; position: absolute; left: 0; display: block; top: -0.175rem; -webkit-transition: -webkit-transform 150ms linear; transition: -webkit-transform 150ms linear; transition: transform 150ms linear; transition: transform 150ms linear, -webkit-transform 150ms linear; box-shadow: 0 0.1rem 0.1rem #2f2f2f; }\n\n.component-toggle input:checked + .graphic .slide { background: #993d19; }\n\n.component-toggle input:checked + .graphic .marker { background: #ff4700; -webkit-transform: translateX(0.8652rem); transform: translateX(0.8652rem); }\n"},{}],30:[function(t,e,n){e.exports='<div class="component component-button">\n  <button\n    type="button"\n    data-manipulator-target\n    class="{{primary ? \'primary\' : \'\'}}"\n    {{each key: attributes}}{{key}}="{{this}}"{{/each}}\n  ></button>\n  {{if description}}\n    <div class="description">{{{description}}}</div>\n  {{/if}}\n</div>\n'},{}],31:[function(t,e,n){e.exports='<div class="component component-checkbox">\n  <span class="label">{{{label}}}</span>\n  <div class="checkbox-group">\n    {{each options}}\n      <label class="tap-highlight">\n        <span class="label">{{{this}}}</span>\n        <input type="checkbox" value="1" name="clay-{{clayId}}" />\n        <i></i>\n      </label>\n    {{/each}}\n  </div>\n  {{if description}}\n    <div class="description">{{{description}}}</div>\n  {{/if}}\n</div>\n'},{}],32:[function(t,e,n){e.exports='<div class="component component-color">\n  <label class="tap-highlight">\n    <input\n      data-manipulator-target\n      type="hidden"\n    />\n    <span class="label">{{{label}}}</span>\n    <span class="value"></span>\n  </label>\n  {{if description}}\n    <div class="description">{{{description}}}</div>\n  {{/if}}\n  <div class="picker-wrap">\n    <div class="picker">\n      <div class="color-box-wrap">\n        <div class="color-box-container"></div>\n      </div>\n    </div>\n  </div>\n</div>\n'},{}],33:[function(t,e,n){e.exports='<footer data-manipulator-target class="component component-footer"></footer>\n'},{}],34:[function(t,e,n){e.exports='<div class="component component-heading">\n  <h{{size}} data-manipulator-target></h{{size}}>\n</div>\n'},{}],35:[function(t,e,n){e.exports='<div class="component component-input">\n  <label class="tap-highlight">\n    <span class="label">{{{label}}}</span>\n    <span class="input">\n      <input\n      data-manipulator-target\n        {{each key: attributes}}{{key}}="{{this}}"{{/each}}\n    />\n    </span>\n  </label>\n\n  {{if description}}\n    <div class="description">{{{description}}}</div>\n  {{/if}}\n</div>\n'},{}],36:[function(t,e,n){e.exports='<div class="component component-radio">\n  <span class="label">{{{label}}}</span>\n  <div class="radio-group">\n    {{each options}}\n      <label class="tap-highlight">\n        <span class="label">{{{this.label}}}</span>\n        <input\n          type="radio"\n          value="{{this.value}}"\n          name="clay-{{clayId}}"\n          {{each key: attributes}}{{key}}="{{this}}"{{/each}}\n        />\n        <i></i>\n      </label>\n    {{/each}}\n  </div>\n  {{if description}}\n    <div class="description">{{{description}}}</div>\n  {{/if}}\n</div>\n'},{}],37:[function(t,e,n){e.exports='<div class="component component-select">\n  <label class="tap-highlight">\n    <span class="label">{{{label}}}</span>\n    <span class="value"></span>\n    <select data-manipulator-target {{each key: attributes}}{{key}}="{{this}}"{{/each}}>\n      {{each options}}\n        {{if Array.isArray(this.value)}}\n          <optgroup label="{{this.label}}">\n            {{each this.value}}\n              <option value="{{this.value}}" class="item-select-option">{{this.label}}</option>\n            {{/each}}\n          </optgroup>\n        {{else}}\n          <option value="{{this.value}}" class="item-select-option">{{this.label}}</option>\n        {{/if}}\n      {{/each}}\n    </select>\n  </label>\n  {{if description}}\n    <div class="description">{{{description}}}</div>\n  {{/if}}\n</div>\n'},{}],38:[function(t,e,n){e.exports='<div class="component component-slider">\n  <label class="tap-highlight">\n    <span class="label-container">\n      <span class="label">{{{label}}}</span>\n      <span class="value-wrap">\n        <span class="value-pad"></span>\n        <input type="text" class="value" />\n      </span>\n    </span>\n    <span class="input">\n      <input\n        data-manipulator-target\n        class="slider"\n        type="range"\n        min="{{min}}"\n        max="{{max}}"\n        step="{{step}}"\n        {{each key: attributes}}{{key}}="{{this}}"{{/each}}\n      />\n    </span>\n</label>\n  {{if description}}\n    <div class="description">{{{description}}}</div>\n  {{/if}}\n</div>\n'},{}],39:[function(t,e,n){e.exports='<div class="component component-submit">\n  <button\n    data-manipulator-target\n    type="submit"\n    {{each key: attributes}}{{key}}="{{this}}"{{/each}}\n  ></button>\n</div>\n'},{}],40:[function(t,e,n){e.exports='<div class="component component-text">\n  <p data-manipulator-target></p>\n</div>\n'},{}],41:[function(t,e,n){e.exports='<div class="component component-toggle">\n  <label class="tap-highlight">\n    <span class="label">{{{label}}}</span>\n    <span class="input">\n      <input\n        data-manipulator-target\n        type="checkbox"\n        {{each key: attributes}}{{key}}="{{this}}"{{/each}}\n      />\n      <span class="graphic">\n        <span class="slide"></span>\n        <span class="marker"></span>\n      </span>\n    </span>\n  </label>\n  {{if description}}\n    <div class="description">{{{description}}}</div>\n  {{/if}}\n</div>\n'},{}],42:[function(t,e,n){e.exports='<!DOCTYPE html><html lang="en"><head><meta charset="utf-8"><style>@font-face{font-family:PFDinDisplayProRegularWebfont;src:url(data:application/font-woff;charset=utf-8;base64,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) format("woff");font-weight:400;font-style:normal}a,abbr,acronym,address,applet,article,aside,audio,b,big,blockquote,body,canvas,caption,center,cite,code,dd,del,details,dfn,div,dl,dt,em,fieldset,figcaption,figure,footer,form,h1,h2,h3,h4,h5,h6,header,hgroup,html,i,iframe,img,ins,kbd,label,legend,li,mark,menu,nav,object,ol,p,pre,q,s,samp,section,small,span,strike,strong,sub,summary,sup,table,tbody,td,tfoot,th,thead,time,tr,tt,u,ul,var,video{margin:0;padding:0;border:0;outline:0;font-size:100%;font:inherit;vertical-align:baseline}button,input,textarea{outline:0}article,aside,details,figcaption,figure,footer,header,hgroup,menu,nav,section{display:block}body{line-height:1}ol,ul{list-style:none}blockquote:after,blockquote:before,q:after,q:before{content:\'\';content:none}html{box-sizing:border-box}*,:after,:before{box-sizing:inherit}body,html{font-weight:400;font-family:PFDinDisplayPro-Regular,PFDinDisplayProRegularWebfont,sans-serif;-webkit-font-smoothing:antialiased;font-size:17px;line-height:1.4;height:100%;color:#fff}body.platform-ios,html.platform-ios{font-size:16px}body{background-color:#333;padding:0 .75rem .7rem}em{font-style:italic}strong{font-weight:400;font-family:PFDinDisplayPro-Medium,PFDinDisplayProRegularWebfont,sans-serif;color:#ff4700}.platform-android strong{font-family:PFDinDisplayProRegularWebfont,sans-serif;font-weight:700;letter-spacing:.025em}a{color:#858585}a:hover{color:inherit}h1,h2,h3,h4{text-transform:uppercase;font-weight:400;font-family:PFDinDisplayPro-Medium,PFDinDisplayProRegularWebfont,sans-serif;text-transform:uppercase;position:relative;top:.05rem;line-height:.9}.platform-android h1,.platform-android h2,.platform-android h3,.platform-android h4{font-family:PFDinDisplayProRegularWebfont,sans-serif;font-weight:700;letter-spacing:.025em}h1{font-size:2rem;line-height:2.8rem}h2{font-size:1.8rem;line-height:2.8rem}h3{font-size:1.5rem;line-height:2.8rem}h4{font-size:1.2rem;line-height:1.4rem}h5{font-size:1rem;line-height:1.4rem}h6{font-size:.8rem;line-height:1.4rem}input{font-family:inherit;font-size:inherit;line-height:inherit}label{display:-webkit-box;display:-webkit-flex;display:flex;-webkit-box-pack:justify;-webkit-justify-content:space-between;justify-content:space-between;-webkit-box-align:center;-webkit-align-items:center;align-items:center;padding:.7rem .75rem}label .input{white-space:nowrap;display:-webkit-box;display:-webkit-flex;display:flex;max-width:50%;margin-left:.75rem}label.invalid .input:after{content:"!";display:inline-block;color:#fff;background:#ff4700;border-radius:.55rem;width:1.1rem;text-align:center;height:1.1rem;font-size:.825rem;vertical-align:middle;line-height:1.1rem;box-shadow:0 .1rem .1rem #2f2f2f;font-weight:400;font-family:PFDinDisplayPro-Medium,PFDinDisplayProRegularWebfont,sans-serif;-webkit-box-flex:0;-webkit-flex:0 0 1.1rem;flex:0 0 1.1rem;margin-left:.3rem}.platform-android label.invalid .input:after{font-family:PFDinDisplayProRegularWebfont,sans-serif;font-weight:700;letter-spacing:.025em}.hide{display:none!important}.tap-highlight{-webkit-tap-highlight-color:rgba(255,255,255,.1);border-radius:.25rem}.tap-highlight:active{background-color:rgba(255,255,255,.1)}.component{padding-top:.7rem}.component.disabled{pointer-events:none}.component.disabled>*{opacity:.25}.section{background:#484848;border-radius:.25rem;box-shadow:#2f2f2f 0 .15rem .25rem}.section>.component{padding-bottom:.7rem;padding-right:.75rem;padding-left:.75rem;position:relative;margin-top:1rem}.section>.component:not(.hide)~.component{margin-top:0}.section>.component:first-child:after{display:none}.section>.component:after{content:"";background:#666;display:block;position:absolute;top:0;left:.375rem;right:.375rem;height:1px;pointer-events:none}.section>.component:not(.hide):after{display:none}.section>.component:not(.hide)~.component:not(.hide):after{display:block}.section>.component-heading:first-child{background:#414141;border-radius:.25rem .25rem 0 0}.section>.component-heading:first-child:after,.section>.component-heading:first-child~.component:not(.hide):after{display:none}.section>.component-heading:first-child~.component:not(.hide)~.component:not(.hide):after{display:block}.description{padding:0 .75rem .7rem;font-size:.9rem;line-height:1.4rem;color:#a4a4a4;text-align:left}.inputs{display:block;width:100%;border-collapse:collapse}.button,button{font-weight:400;font-family:PFDinDisplayPro-Medium,PFDinDisplayProRegularWebfont,sans-serif;font-size:1rem;line-height:1.4rem;text-transform:uppercase;background-color:#767676;border-radius:.25rem;border:none;display:inline-block;color:#fff;min-width:12rem;text-align:center;margin:0 auto .7rem;padding:.6rem;-webkit-tap-highlight-color:#858585}.platform-android .button,.platform-android button{font-family:PFDinDisplayProRegularWebfont,sans-serif;font-weight:700;letter-spacing:.025em}.button:active,button:active{background-color:#858585}.platform-ios .button,.platform-ios button{padding:.5rem}.button.primary,.button[type=submit],button.primary,button[type=submit]{background-color:#ff4700;-webkit-tap-highlight-color:red}.button.primary:active,.button[type=submit]:active,button.primary:active,button[type=submit]:active{background-color:red}a.button{text-decoration:none;color:#fff}</style><meta name="viewport"content="width=device-width,initial-scale=1,maximum-scale=1,user-scalable=no"><script>window.returnTo="$$RETURN_TO$$",window.clayConfig=$$CONFIG$$,window.claySettings=$$SETTINGS$$,window.customFn=$$CUSTOM_FN$$,window.clayComponents=$$COMPONENTS$$,window.clayMeta=$$META$$</script></head><body><form id="main-form"class="inputs"></form><script>!function t(e,n,r){function i(a,u){if(!n[a]){if(!e[a]){var s="function"==typeof require&&require;if(!u&&s)return s(a,!0);if(o)return o(a,!0);var c=new Error("Cannot find module \'"+a+"\'");throw c.code="MODULE_NOT_FOUND",c}var f=n[a]={exports:{}};e[a][0].call(f.exports,function(t){var n=e[a][1][t];return i(n?n:t)},f,f.exports,t,e,n,r)}return n[a].exports}for(var o="function"==typeof require&&require,a=0;a<r.length;a++)i(r[a]);return i}({1:[function(t,e,n){"use strict";var r=t("./vendor/minified"),i=t("./lib/clay-config"),o=r.$,a=r._,u=a.extend([],window.clayConfig||[]),s=a.extend({},window.claySettings||{}),c=window.returnTo||"pebblejs://close#",f=window.customFn||function(){},l=window.clayComponents||{},h=window.clayMeta||{},m=window.navigator.userAgent.match(/android/i)?"android":"ios";document.documentElement.classList.add("platform-"+m),a.eachObj(l,function(t,e){i.registerComponent(e)});var p=o("#main-form"),d=new i(s,u,p,h);p.on("submit",function(){location.href=c+encodeURIComponent(JSON.stringify(d.serialize()))}),f.call(d,r),d.build()},{"./lib/clay-config":2,"./vendor/minified":8}],2:[function(t,e,n){"use strict";function r(t,e,n,c){function f(){m=[],p={},d={},g=!1}function l(t,e){if(Array.isArray(t))t.forEach(function(t){l(t,e)});else if(u.includesCapability(c.activeWatchInfo,t.capabilities))if("section"===t.type){var n=i(\'<div class="section">\');e.add(n),l(t.items,n)}else{var r=o.copyObj(t);r.clayId=m.length;var s=new a(r).initialize(v);r.id&&(p[r.id]=s),r.messageKey&&(d[r.messageKey]=s),m.push(s);var f="undefined"!=typeof y[r.messageKey]?y[r.messageKey]:r.defaultValue;s.set("undefined"!=typeof f?f:""),e.add(s.$element)}}function h(t){if(!g)throw new Error("ClayConfig not built. build() must be run before you can run "+t+"()");return!0}var m,p,d,g,v=this,y=o.copyObj(t);v.meta=c,v.$rootContainer=n,v.EVENTS={BEFORE_BUILD:"BEFORE_BUILD",AFTER_BUILD:"AFTER_BUILD",BEFORE_DESTROY:"BEFORE_DESTROY",AFTER_DESTROY:"AFTER_DESTROY"},u.updateProperties(v.EVENTS,{writable:!1}),v.getAllItems=function(){return h("getAllItems"),m},v.getItemByMessageKey=function(t){return h("getItemByMessageKey"),d[t]},v.getItemById=function(t){return h("getItemById"),p[t]},v.getItemsByType=function(t){return h("getItemsByType"),m.filter(function(e){return e.config.type===t})},v.getItemsByGroup=function(t){return h("getItemsByGroup"),m.filter(function(e){return e.config.group===t})},v.serialize=function(){return h("serialize"),y={},o.eachObj(d,function(t,e){y[t]={value:e.get()},e.precision&&(y[t].precision=e.precision)}),y},v.registerComponent=r.registerComponent,v.destroy=function(){var t=n[0];for(v.trigger(v.EVENTS.BEFORE_DESTROY);t.firstChild;)t.removeChild(t.firstChild);return f(),v.trigger(v.EVENTS.AFTER_DESTROY),v},v.build=function(){return g&&v.destroy(),v.trigger(v.EVENTS.BEFORE_BUILD),l(v.config,n),g=!0,v.trigger(v.EVENTS.AFTER_BUILD),v},f(),s.call(v,n),u.updateProperties(v,{writable:!1,configurable:!1}),v.config=e}var i=t("../vendor/minified").HTML,o=t("../vendor/minified")._,a=t("./clay-item"),u=t("../lib/utils"),s=t("./clay-events"),c=t("./component-registry"),f=t("./manipulators");r.registerComponent=function(t){var e=o.copyObj(t);if(c[e.name])return console.warn("Component: "+e.name+" is already registered. If you wish to override the existing functionality, you must provide a new name"),!1;if("string"==typeof e.manipulator&&(e.manipulator=f[t.manipulator],!e.manipulator))throw new Error("The manipulator: "+t.manipulator+" does not exist in the built-in manipulators.");if(!e.manipulator)throw new Error("The manipulator must be defined");if("function"!=typeof e.manipulator.set||"function"!=typeof e.manipulator.get)throw new Error("The manipulator must have both a `get` and `set` method");if(e.style){var n=document.createElement("style");n.type="text/css",n.appendChild(document.createTextNode(e.style)),document.head.appendChild(n)}return c[e.name]=e,!0},e.exports=r},{"../lib/utils":7,"../vendor/minified":8,"./clay-events":3,"./clay-item":4,"./component-registry":5,"./manipulators":6}],3:[function(t,e,n){"use strict";function r(t){function e(t){return t.split(" ").map(function(t){return"|"+t.replace(/^\\|/,"")}).join(" ")}function n(t,e){var n=o.find(u,function(e){return e.handler===t?e:null});return n||(n={handler:t,proxy:e},u.push(n)),n.proxy}function r(t){return o.find(u,function(e){return e.handler===t?e.proxy:null})}var a=this,u=[];a.on=function(r,i){var o=e(r),a=this,u=n(i,function(){i.apply(a,arguments)});return t.on(o,u),a},a.off=function(t){var e=r(t);return e&&i.off(e),a},a.trigger=function(e,n){return t.trigger(e,n),a}}var i=t("../vendor/minified").$,o=t("../vendor/minified")._;e.exports=r},{"../vendor/minified":8}],4:[function(t,e,n){"use strict";function r(t){var e=this,n=i[t.type];if(!n)throw new Error("The component: "+t.type+" is not registered. Make sure to register it with ClayConfig.registerComponent()");var r={i18n:{foo:"bar"}},f=s.extend({},n.defaults||{},t,r),l=s.formatHtml(n.template.trim(),f);e.id=t.id||null,e.messageKey=t.messageKey||null,e.config=t,e.$element=c(l,f),e.$manipulatorTarget=e.$element.select("[data-manipulator-target]"),e.$manipulatorTarget.length||(e.$manipulatorTarget=e.$element),e.initialize=function(t){return"function"==typeof n.initialize&&n.initialize.call(e,o,t),e},u.call(e,e.$manipulatorTarget),s.eachObj(n.manipulator,function(t,n){e[t]=n.bind(e)}),a.updateProperties(e,{writable:!1,configurable:!1})}var i=t("./component-registry"),o=t("../vendor/minified"),a=t("../lib/utils"),u=t("./clay-events"),s=o._,c=o.HTML;e.exports=r},{"../lib/utils":7,"../vendor/minified":8,"./clay-events":3,"./component-registry":5}],5:[function(t,e,n){"use strict";e.exports={}},{}],6:[function(t,e,n){"use strict";function r(){return this.$manipulatorTarget.get("disabled")?this:(this.$element.set("+disabled"),this.$manipulatorTarget.set("disabled",!0),this.trigger("disabled"))}function i(){return this.$manipulatorTarget.get("disabled")?(this.$element.set("-disabled"),this.$manipulatorTarget.set("disabled",!1),this.trigger("enabled")):this}function o(){return this.$element[0].classList.contains("hide")?this:(this.$element.set("+hide"),this.trigger("hide"))}function a(){return this.$element[0].classList.contains("hide")?(this.$element.set("-hide"),this.trigger("show")):this}var u=t("../vendor/minified")._;e.exports={html:{get:function(){return this.$manipulatorTarget.get("innerHTML")},set:function(t){return this.get()===t.toString(10)?this:(this.$manipulatorTarget.set("innerHTML",t),this.trigger("change"))},hide:o,show:a},button:{get:function(){return this.$manipulatorTarget.get("innerHTML")},set:function(t){return this.get()===t.toString(10)?this:(this.$manipulatorTarget.set("innerHTML",t),this.trigger("change"))},disable:r,enable:i,hide:o,show:a},val:{get:function(){return this.$manipulatorTarget.get("value")},set:function(t){return this.get()===t.toString(10)?this:(this.$manipulatorTarget.set("value",t),this.trigger("change"))},disable:r,enable:i,hide:o,show:a},slider:{get:function(){return parseFloat(this.$manipulatorTarget.get("value"))},set:function(t){var e=this.get();return this.$manipulatorTarget.set("value",t),this.get()===e?this:this.trigger("change")},disable:r,enable:i,hide:o,show:a},checked:{get:function(){return this.$manipulatorTarget.get("checked")},set:function(t){return!this.get()==!t?this:(this.$manipulatorTarget.set("checked",!!t),this.trigger("change"))},disable:r,enable:i,hide:o,show:a},radiogroup:{get:function(){return this.$element.select("input:checked").get("value")},set:function(t){return this.get()===t.toString(10)?this:(this.$element.select(\'input[value="\'+t.replace(\'"\',\'\\\\"\')+\'"]\').set("checked",!0),this.trigger("change"))},disable:r,enable:i,hide:o,show:a},checkboxgroup:{get:function(){var t=[];return this.$element.select("input").each(function(e){t.push(!!e.checked)}),t},set:function(t){var e=this;for(t=Array.isArray(t)?t:[];t.length<this.get().length;)t.push(!1);return u.equals(this.get(),t)?this:(e.$element.select("input").set("checked",!1).each(function(e,n){e.checked=!!t[n]}),e.trigger("change"))},disable:r,enable:i,hide:o,show:a},color:{get:function(){return parseInt(this.$manipulatorTarget.get("value"),10)||0},set:function(t){return t=this.roundColorToLayout(t||0),this.get()===t?this:(this.$manipulatorTarget.set("value",t),this.trigger("change"))},disable:r,enable:i,hide:o,show:a}}},{"../vendor/minified":8}],7:[function(t,e,n){"use strict";e.exports.updateProperties=function(t,e){Object.getOwnPropertyNames(t).forEach(function(n){Object.defineProperty(t,n,e)})},e.exports.capabilityMap={PLATFORM_APLITE:{platforms:["aplite"],minFwMajor:0,minFwMinor:0},PLATFORM_BASALT:{platforms:["basalt"],minFwMajor:0,minFwMinor:0},PLATFORM_CHALK:{platforms:["chalk"],minFwMajor:0,minFwMinor:0},PLATFORM_DIORITE:{platforms:["diorite"],minFwMajor:0,minFwMinor:0},PLATFORM_EMERY:{platforms:["emery"],minFwMajor:0,minFwMinor:0},BW:{platforms:["aplite","diorite"],minFwMajor:0,minFwMinor:0},COLOR:{platforms:["basalt","chalk","emery"],minFwMajor:0,minFwMinor:0},MICROPHONE:{platforms:["basalt","chalk","diorite","emery"],minFwMajor:0,minFwMinor:0},SMARTSTRAP:{platforms:["basalt","chalk","diorite","emery"],minFwMajor:3,minFwMinor:4},SMARTSTRAP_POWER:{platforms:["basalt","chalk","emery"],minFwMajor:3,minFwMinor:4},HEALTH:{platforms:["basalt","chalk","diorite","emery"],minFwMajor:3,minFwMinor:10},RECT:{platforms:["aplite","basalt","diorite","emery"],minFwMajor:0,minFwMinor:0},ROUND:{platforms:["chalk"],minFwMajor:0,minFwMinor:0},DISPLAY_144x168:{platforms:["aplite","basalt","diorite"],minFwMajor:0,minFwMinor:0},DISPLAY_180x180_ROUND:{platforms:["chalk"],minFwMajor:0,minFwMinor:0},DISPLAY_200x228:{platforms:["emery"],minFwMajor:0,minFwMinor:0}},e.exports.includesCapability=function(t,n){var r=/^NOT_/,i=[];if(!n||!n.length)return!0;for(var o=n.length-1;o>=0;o--){var a=n[o],u=e.exports.capabilityMap[a.replace(r,"")];!u||u.platforms.indexOf(t.platform)===-1||u.minFwMajor>t.firmware.major||u.minFwMajor===t.firmware.major&&u.minFwMinor>t.firmware.minor?i.push(!!a.match(r)):i.push(!a.match(r))}return i.indexOf(!1)===-1}},{}],8:[function(t,e,n){e.exports=function(){function t(t){return t.substr(0,3)}function e(t){return t!=lt?""+t:""}function n(t,e){return typeof t==e}function r(t){return n(t,"string")}function i(t){return!!t&&n(t,"object")}function o(t){return t&&t.nodeType}function a(t){return n(t,"number")}function u(t){return i(t)&&!!t.getDay}function s(t){return t===!0||t===!1}function c(t){var e=typeof t;return"object"==e?!(!t||!t.getDay):"string"==e||"number"==e||s(t)}function f(t){return t}function l(t,n,r){return e(t).replace(n,r!=lt?r:"")}function h(t){return l(t,/^\\s+|\\s+$/g)}function m(t,e,n){for(var r in t)t.hasOwnProperty(r)&&e.call(n||t,r,t[r]);return t}function p(t,e,n){if(t)for(var r=0;r<t.length;r++)e.call(n||t,t[r],r);return t}function d(t,e,n){var r=[],i=B(e)?e:function(t){return e!=t};return p(t,function(e,o){i.call(n||t,e,o)&&r.push(e)}),r}function g(t,e,n,r){var i=[];return t(e,function(t,o){P(t=n.call(r||e,t,o))?p(t,function(t){i.push(t)}):t!=lt&&i.push(t)}),i}function v(t){var e=0;return m(t,function(t){e++}),e}function y(t){var e=[];return m(t,function(t){e.push(t)}),e}function b(t,e,n){var r=[];return p(t,function(i,o){r.push(e.call(n||t,i,o))}),r}function w(t,e){var n={};return p(t,function(t,r){n[t]=e}),n}function $(t,e){var n=e||{};for(var r in t)n[r]=t[r];return n}function T(t,e){for(var n=e,r=0;r<t.length;r++)n=$(t[r],n);return n}function M(t){return B(t)?t:function(e,n){if(t===e)return n}}function E(t,e,n){return e==lt?n:e<0?Math.max(t.length+e,0):Math.min(t.length,e)}function F(t,e,n,r){for(var i,o=M(e),a=E(t,r,t.length),u=E(t,n,0);u<a;u++)if((i=o.call(t,t[u],u))!=lt)return i}function x(t,e,n){var r=[];if(t)for(var i=E(t,n,t.length),o=E(t,e,0);o<i;o++)r.push(t[o]);return r}function O(t){return b(t,f)}function j(t,e){var n,r=B(t)?t():t,i=B(e)?e():e;return r==i||r!=lt&&i!=lt&&(c(r)||c(i)?u(r)&&u(i)&&+r==+i:P(r)?r.length==i.length&&!F(r,function(t,e){if(!j(t,i[e]))return!0}):!P(i)&&(n=y(r)).length==v(i)&&!F(n,function(t){if(!j(r[t],i[t]))return!0}))}function A(t,e,n){if(B(t))return t.apply(n&&e,b(n||e,f))}function R(t,e,n){return b(t,function(t){return A(t,e,n)})}function L(t){return"\\\\u"+("0000"+t.charCodeAt(0).toString(16)).slice(-4)}function S(t){return l(t,/[\\x00-\\x1f\'"\\u2028\\u2029]/g,L)}function _(t,e){return t.split(e)}function C(t,e){if(dt[t])return dt[t];var n="with(_.isObject(obj)?obj:{}){"+b(_(t,/{{|}}}?/g),function(t,e){var n,r=h(t),i=l(r,/^{/),o=r==i?"esc(":"";return e%2?(n=/^each\\b(\\s+([\\w_]+(\\s*,\\s*[\\w_]+)?)\\s*:)?(.*)/.exec(i))?"each("+(h(n[4])?n[4]:"this")+", function("+n[2]+"){":(n=/^if\\b(.*)/.exec(i))?"if("+n[1]+"){":(n=/^else\\b\\s*(if\\b(.*))?/.exec(i))?"}else "+(n[1]?"if("+n[2]+")":"")+"{":(n=/^\\/(if)?/.exec(i))?n[1]?"}\\n":"});\\n":(n=/^(var\\s.*)/.exec(i))?n[1]+";":(n=/^#(.*)/.exec(i))?n[1]:(n=/(.*)::\\s*(.*)/.exec(i))?"print("+o+\'_.formatValue("\'+S(n[2])+\'",\'+(h(n[1])?n[1]:"this")+(o&&")")+"));\\n":"print("+o+(h(i)?i:"this")+(o&&")")+");\\n":t?\'print("\'+S(t)+\'");\\n\':void 0}).join("")+"}",r=new Function("obj","each","esc","print","_",n),i=function(t,n){var i=[];return r.call(n||t,t,function(t,e){P(t)?p(t,function(t,n){e.call(t,t,n)}):m(t,function(t,n){e.call(n,t,n)})},e||f,function(){A(i.push,i,arguments)},rt),i.join("")};return gt.push(i)>pt&&delete dt[gt.shift()],dt[t]=i}function I(t){return l(t,/[<>\'"&]/g,function(t){return"&#"+t.charCodeAt(0)+";"})}function N(t,e){return C(t,I)(e)}function D(t){return function(e,n,r){return t(this,e,n,r)}}function B(t){return"function"==typeof t&&!t.item}function P(t){return t&&t.length!=lt&&!r(t)&&!o(t)&&!B(t)&&t!==ot}function H(t){return parseFloat(l(t,/^[^\\d-]+/))}function k(t){return t[at]=t[at]||++ct}function q(t,e){var n,r=[],i={};return Q(t,function(t){Q(e(t),function(t){i[n=k(t)]||(r.push(t),i[n]=!0)})}),r}function U(t,e){var n={$position:"absolute",$visibility:"hidden",$display:"block",$height:lt},r=t.get(n),i=t.set(n).get("clientHeight");return t.set(r),i*e+"px"}function Y(t,n,i,o,a){return B(n)?this.on(lt,t,n,i,o):r(o)?this.on(t,n,i,lt,o):this.each(function(r,u){Q(t?G(t,r):r,function(t){Q(e(n).split(/\\s/),function(e){function n(e,n,r){var f=!a,l=a?r:t;if(a)for(var h=Z(a,t);l&&l!=t&&!(f=h(l));)l=l.parentNode;return!f||s!=e||i.apply(X(l),o||[n,u])&&"?"==c||"|"==c}function r(t){n(s,t,t.target)||(t.preventDefault(),t.stopPropagation())}var s=l(e,/[?|]/g),c=l(e,/[^?|]/g),h=("blur"==s||"focus"==s)&&!!a,m=ct++;t.addEventListener(s,r,h),t.M||(t.M={}),t.M[m]=n,i.M=g(Q,[i.M,function(){t.removeEventListener(s,r,h),delete t.M[m]}],f)})})})}function K(t){R(t.M),t.M=lt}function V(t){ft?ft.push(t):setTimeout(t,0)}function z(t,e,n){return G(t,e,n)[0]}function W(t,e,n){var r=X(document.createElement(t));return P(e)||e!=lt&&!i(e)?r.add(e):r.set(e).add(n)}function J(t){return g(Q,t,function(t){var e;return P(t)?J(t):o(t)?(e=t.cloneNode(!0),e.removeAttribute&&e.removeAttribute("id"),e):t})}function X(t,e,n){return B(t)?V(t):new nt(G(t,e,n))}function G(t,e,n){function i(t){return P(t)?g(Q,t,i):t}function a(t){return d(g(Q,t,i),function(t){for(var r=t;r=r.parentNode;)if(r==e[0]||n)return r==e[0]})}return e?1!=(e=G(e)).length?q(e,function(e){return G(t,e,n)}):r(t)?1!=o(e[0])?[]:n?a(e[0].querySelectorAll(t)):e[0].querySelectorAll(t):a(t):r(t)?document.querySelectorAll(t):g(Q,t,i)}function Z(t,e){function n(t,e){var n=RegExp("(^|\\\\s+)"+t+"(?=$|\\\\s)","i");return function(r){return!t||n.test(r[e])}}var i={},u=i;if(B(t))return t;if(a(t))return function(e,n){return n==t};if(!t||"*"==t||r(t)&&(u=/^([\\w-]*)\\.?([\\w-]*)$/.exec(t))){var s=n(u[1],"tagName"),c=n(u[2],"className");return function(t){return 1==o(t)&&s(t)&&c(t)}}return e?function(n){return X(t,e).find(n)!=lt}:(X(t).each(function(t){i[k(t)]=!0}),function(t){return i[k(t)]})}function Q(t,e){return P(t)?p(t,e):t!=lt&&e(t,0),t}function tt(){this.state=null,this.values=[],this.parent=null}function et(){var t=[],e=arguments,n=e.length,r=0,o=0,a=new tt;a.errHandled=function(){o++,a.parent&&a.parent.errHandled()};var u=a.fire=function(e,n){return null==a.state&&null!=e&&(a.state=!!e,a.values=P(n)?n:[n],setTimeout(function(){p(t,function(t){t()})},0)),a};p(e,function c(t,e){try{t.then?t.then(function(t){var o;(i(t)||B(t))&&B(o=t.then)?c(t,e):(a.values[e]=O(arguments),++r==n&&u(!0,n<2?a.values[e]:a.values))},function(t){a.values[e]=O(arguments),u(!1,n<2?a.values[e]:[a.values[e][0],a.values,e])}):t(function(){u(!0,O(arguments))},function(){u(!1,O(arguments))})}catch(o){u(!1,[o,a.values,e])}}),a.stop=function(){return p(e,function(t){t.stop&&t.stop()}),a.stop0&&A(a.stop0)};var s=a.then=function(e,n){var r=et(),u=function(){try{var t=a.state?e:n;B(t)?!function s(t){try{var e,n=0;if((i(t)||B(t))&&B(e=t.then)){if(t===r)throw new TypeError;e.call(t,function(t){n++||s(t)},function(t){n++||r.fire(!1,[t])}),r.stop0=t.stop}else r.fire(!0,[t])}catch(a){if(!n++&&(r.fire(!1,[a]),!o))throw a}}(A(t,it,a.values)):r.fire(a.state,a.values)}catch(u){if(r.fire(!1,[u]),!o)throw u}};return B(n)&&a.errHandled(),r.stop0=a.stop,r.parent=a,null!=a.state?setTimeout(u,0):t.push(u),r};return a.always=function(t){return s(t,t)},a.error=function(t){return s(0,t)},a}function nt(t,e){var n=this,r=0;if(t)for(var i=0,o=t.length;i<o;i++){var a=t[i];if(e&&P(a))for(var u=0,s=a.length;u<s;u++)n[r++]=a[u];else n[r++]=a}else n[r++]=e;n.length=r,n._=!0}function rt(){return new nt(arguments,(!0))}var it,ot=window,at="Nia",ut={},st={},ct=1,ft=/^[ic]/.test(document.readyState)?lt:[],lt=null,ht=_("January,February,March,April,May,June,July,August,September,October,November,December",/,/g),mt=(b(ht,t),_("Sunday,Monday,Tuesday,Wednesday,Thursday,Friday,Saturday",/,/g)),pt=(b(mt,t),_("am,pm",/,/g),_("am,am,am,am,am,am,am,am,am,am,am,am,pm,pm,pm,pm,pm,pm,pm,pm,pm,pm,pm,pm",/,/g),99),dt={},gt=[];return $({each:D(p),equals:D(j),find:D(F),dummySort:0,select:function(t,e){return X(t,this,e)},get:function(t,e){var n=this,i=n[0];if(i){if(r(t)){var o,a=/^(\\W*)(.*)/.exec(l(t,/^%/,"@data-")),u=a[1];return o=st[u]?st[u](this,a[2]):"$"==t?n.get("className"):"$$"==t?n.get("@style"):"$$slide"==t?n.get("$height"):"$$fade"==t||"$$show"==t?"hidden"==n.get("$visibility")||"none"==n.get("$display")?0:"$$fade"==t?isNaN(n.get("$opacity",!0))?1:n.get("$opacity",!0):1:"$"==u?ot.getComputedStyle(i,lt).getPropertyValue(l(a[2],/[A-Z]/g,function(t){return"-"+t.toLowerCase()})):"@"==u?i.getAttribute(a[2]):i[a[2]],e?H(o):o}var s={};return(P(t)?Q:m)(t,function(t){s[t]=n.get(t,e)}),s}},set:function(t,e){var n=this;if(e!==it){var i=/^(\\W*)(.*)/.exec(l(l(t,/^\\$float$/,"cssFloat"),/^%/,"@data-")),o=i[1];ut[o]?ut[o](this,i[2],e):"$$fade"==t?this.set({$visibility:e?"visible":"hidden",$opacity:e}):"$$slide"==t?n.set({$visibility:e?"visible":"hidden",$overflow:"hidden",$height:/px/.test(e)?e:function(t,n,r){return U(X(r),e)}}):"$$show"==t?e?n.set({$visibility:e?"visible":"hidden",$display:""}).set({$display:function(t){return"none"==t?"block":t}}):n.set({$display:"none"}):"$$"==t?n.set("@style",e):Q(this,function(n,r){var a=B(e)?e(X(n).get(t),r,n):e;"$"==o?i[2]?n.style[i[2]]=a:Q(a&&a.split(/\\s+/),function(t){var e=l(t,/^[+-]/);/^\\+/.test(t)?n.classList.add(e):/^-/.test(t)?n.classList.remove(e):n.classList.toggle(e)}):"$$scrollX"==t?n.scroll(a,X(n).get("$$scrollY")):"$$scrollY"==t?n.scroll(X(n).get("$$scrollX"),a):"@"==o?a==lt?n.removeAttribute(i[2]):n.setAttribute(i[2],a):n[i[2]]=a})}else r(t)||B(t)?n.set("$",t):m(t,function(t,e){n.set(t,e)});return n},add:function(t,e){return this.each(function(n,r){function i(t){if(P(t))Q(t,i);else if(B(t))i(t(n,r));else if(t!=lt){var u=o(t)?t:document.createTextNode(t);a?a.parentNode.insertBefore(u,a.nextSibling):e?e(u,n,n.parentNode):n.appendChild(u),a=u}}var a;i(r&&!B(t)?J(t):t)})},on:Y,trigger:function(t,e){return this.each(function(n,r){for(var i=!0,o=n;o&&i;)m(o.M,function(r,o){i=i&&o(t,e,n)}),o=o.parentNode})},ht:function(t,e){var n=arguments.length>2?T(x(arguments,1)):e;return this.set("innerHTML",B(t)?t(n):/{{/.test(t)?N(t,n):/^#\\S+$/.test(t)?N(z(t).text,n):t)}},nt.prototype),$({request:function(t,n,r,i){var o,a=i||{},u=0,s=et(),c=r&&r.constructor==a.constructor;try{s.xhr=o=new XMLHttpRequest,s.stop0=function(){o.abort()},c&&(r=g(m,r,function(t,e){return g(Q,e,function(e){return encodeURIComponent(t)+(e!=lt?"="+encodeURIComponent(e):"")})}).join("&")),r==lt||/post/i.test(t)||(n+="?"+r,r=lt),o.open(t,n,!0,a.user,a.pass),c&&/post/i.test(t)&&o.setRequestHeader("Content-Type","application/x-www-form-urlencoded"),m(a.headers,function(t,e){o.setRequestHeader(t,e)}),m(a.xhr,function(t,e){o[t]=e}),o.onreadystatechange=function(){4!=o.readyState||u++||(o.status>=200&&o.status<300?s.fire(!0,[o.responseText,o]):s.fire(!1,[o.status,o.responseText,o]))},o.send(r)}catch(f){u||s.fire(!1,[0,lt,e(f)])}return s},ready:V,off:K,wait:function(t,e){var n=et(),r=setTimeout(function(){n.fire(!0,e)},t);return n.stop0=function(){n.fire(!1),clearTimeout(r)},n}},X),$({each:p,toObject:w,find:F,equals:j,copyObj:$,extend:function(t){return T(x(arguments,1),t)},eachObj:m,isObject:i,format:function(t,e,n){return C(t,n)(e)},template:C,formatHtml:N,promise:et},rt),document.addEventListener("DOMContentLoaded",function(){R(ft),ft=lt},!1),{HTML:function(){var t=W("div");return rt(A(t.ht,t,arguments)[0].childNodes)},_:rt,$:X,$$:z,M:nt,getter:st,setter:ut}}()},{}]},{},[1])</script></body></html>';
	},{}],"pebble-clay":[function(t,e,n){"use strict";function r(t,e,n){function r(){i.meta={activeWatchInfo:Pebble.getActiveWatchInfo&&Pebble.getActiveWatchInfo(),accountToken:Pebble.getAccountToken(),watchToken:Pebble.getWatchToken(),userData:s(n.userData||{})}}function o(t,e,n){Array.isArray(t)?t.forEach(function(t){o(t,e,n)}):"section"===t.type?o(t.items,e,n):e(t)&&n(t)}var i=this;if(!Array.isArray(t))throw new Error("config must be an Array");if(e&&"function"!=typeof e)throw new Error('customFn must be a function or "null"');n=n||{},i.config=s(t),i.customFn=e||function(){},i.components={},i.meta={activeWatchInfo:null,accountToken:"",watchToken:"",userData:{}},i.version=c,n.autoHandleEvents!==!1&&"undefined"!=typeof Pebble?(Pebble.addEventListener("showConfiguration",function(){r(),Pebble.openURL(i.generateUrl())}),Pebble.addEventListener("webviewclosed",function(t){t&&t.response&&Pebble.sendAppMessage(i.getSettings(t.response),function(){console.log("Sent config data to Pebble")},function(t){console.log("Failed to send config data!"),console.log(JSON.stringify(t))})})):"undefined"!=typeof Pebble&&Pebble.addEventListener("ready",function(){r()}),o(i.config,function(t){return a[t.type]},function(t){i.registerComponent(a[t.type])}),o(i.config,function(t){return t.appKey},function(){throw new Error("appKeys are no longer supported. Please follow the migration guide to upgrade your project")})}var o=t("./tmp/config-page.html"),i=t("tosource"),a=t("./src/scripts/components"),s=t("deepcopy/build/deepcopy.min"),c=t("./package.json").version,l=t("message_keys");r.prototype.registerComponent=function(t){this.components[t.name]=t},r.prototype.generateUrl=function(){var t={},e=!Pebble||"pypkjs"===Pebble.platform,n=e?"$$$RETURN_TO$$$":"pebblejs://close#";try{t=JSON.parse(localStorage.getItem("clay-settings"))||{}}catch(a){console.error(a.toString())}var s=o.replace("$$RETURN_TO$$",n).replace("$$CUSTOM_FN$$",i(this.customFn)).replace("$$CONFIG$$",i(this.config)).replace("$$SETTINGS$$",i(t)).replace("$$COMPONENTS$$",i(this.components)).replace("$$META$$",i(this.meta));return e?r.encodeDataUri(s,"http://clay.pebble.com.s3-website-us-west-2.amazonaws.com/#"):r.encodeDataUri(s)},r.prototype.getSettings=function(t,e){var n={};t=t.match(/^\{/)?t:decodeURIComponent(t);try{n=JSON.parse(t)}catch(o){throw new Error("The provided response was not valid JSON")}var i={};return Object.keys(n).forEach(function(t){"object"==typeof n[t]&&n[t]?i[t]=n[t].value:i[t]=n[t]}),localStorage.setItem("clay-settings",JSON.stringify(i)),e===!1?n:r.prepareSettingsForAppMessage(n)},r.prototype.setSettings=function(t,e){var n={};try{n=JSON.parse(localStorage.getItem("clay-settings"))||{}}catch(r){console.error(r.toString())}if("object"==typeof t){var o=t;Object.keys(o).forEach(function(t){n[t]=o[t]})}else n[t]=e;localStorage.setItem("clay-settings",JSON.stringify(n))},r.encodeDataUri=function(t,e){return e="undefined"!=typeof e?e:"data:text/html;charset=utf-8,",e+encodeURIComponent(t)},r.prepareForAppMessage=function(t){function e(t,e){return Math.floor(t*Math.pow(10,e||0))}var n;return Array.isArray(t)?(n=[],t.forEach(function(t,e){n[e]=r.prepareForAppMessage(t)})):n="object"==typeof t&&t?"number"==typeof t.value?e(t.value,t.precision):Array.isArray(t.value)?t.value.map(function(n){return"number"==typeof n?e(n,t.precision):n}):r.prepareForAppMessage(t.value):"boolean"==typeof t?t?1:0:t,n},r.prepareSettingsForAppMessage=function(t){var e={};Object.keys(t).forEach(function(n){var r=t[n],o=n.match(/(.+?)(?:\[(\d*)\])?$/);if(!o[2])return void(e[n]=r);var i=parseInt(o[2],10);n=o[1],"undefined"==typeof e[n]&&(e[n]=[]),e[n][i]=r});var n={};return Object.keys(e).forEach(function(t){var o=l[t],i=r.prepareForAppMessage(e[t]);i=Array.isArray(i)?i:[i],i.forEach(function(t,e){n[o+e]=t})}),Object.keys(n).forEach(function(t){if(Array.isArray(n[t]))throw new Error('Clay does not support 2 dimensional arrays for item values. Make sure you are not attempting to use array syntax (eg: "myMessageKey[2]") in the messageKey for components that return an array, such as a checkboxgroup')}),n},e.exports=r},{"./package.json":7,"./src/scripts/components":13,"./tmp/config-page.html":42,"deepcopy/build/deepcopy.min":3,message_keys:void 0,tosource:6}]},{},["pebble-clay"])("pebble-clay")});
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(50)))

/***/ },
/* 50 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = function(module) {
	    switch(module) {
	        case "message_keys": return __webpack_require__(51);
	    }
	    throw new Error('Module not found: ' + module);
	};


/***/ },
/* 51 */
/***/ function(module, exports) {

	module.exports = {
		"MESSAGE_KEY_refreshrate": 10001,
		"MESSAGE_KEY_simplemode": 10000
	};

/***/ },
/* 52 */
/***/ function(module, exports) {

	module.exports = [
		{
			"type": "heading",
			"defaultValue": "GoPro Config"
		},
		{
			"type": "text",
			"defaultValue": "Simple Mode: (Disables status refresh)"
		},
		{
			"type": "toggle",
			"messageKey": "simplemode",
			"label": "Simple Mode",
			"defaultValue": false
		},
		{
			"type": "text",
			"defaultValue": "Refresh Rate"
		},
		{
			"type": "input",
			"messageKey": "refreshrate",
			"defaultValue": "",
			"label": "Refresh Rate",
			"attributes": {
				"placeholder": "5",
				"limit": 10,
				"type": "number"
			}
		},
		{
			"type": "submit",
			"defaultValue": "Save"
		}
	];

/***/ }
/******/ ]);
//# sourceMappingURL=pebble-js-app.js.map