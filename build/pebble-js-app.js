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

	Pebble.addEventListener('ready', function() {
	  console.log("ready");
	
	
	__webpack_require__(3);
	var UI = __webpack_require__(37)
	var Vibe = __webpack_require__(47)
	var Light = __webpack_require__(48)
	var isRec = false
	var isHero4online = false
	var xhr = new XMLHttpRequest()
	var presets = ""
	var MasterSimpleMode = false
	var camera_number = ""
	var camera_model_name = ""
	var h3Pass = "nothing"
	var HERO3 = false
	var Feature = __webpack_require__(26)
	var hbg = Feature.color('blue', 'white')
	var htc = Feature.color('white', 'black')
	
	//command function for HERO4 (/settings!)
	function command_h4(param, value) {
	    var xhr = new XMLHttpRequest()
	    xhr.open("GET", "http://10.5.5.9/gp/gpControl/setting/" + param + "/" + value, true)
	    xhr.send(null)
	}
	//command function for HERO4 (modes, etc...)
	function command_h4_modes(main_mode, sub_mode) {
	    xhr.open("GET", "http://10.5.5.9/gp/gpControl/command/sub_mode?mode=" + main_mode + "&sub_mode=" + sub_mode, true)
	    xhr.send(null)
	
	}
	
	function command_h3(device, param, gopropass, option) {
	    xhr.open("GET", "http://10.5.5.9/" + device + "/" + param + "?t=" + gopropass + "&p=%" + option, false)
	    xhr.send(null)
	
	}
	
	var main = new UI.Card({
	    title: 'CONNECTING...',
	    body: 'Please connect the GoPro WiFi to phone!',
	    subtitleColor: 'indigo', // Named colors
	    bodyColor: 'white', // Hex colors
	    titleColor: 'white',
	    backgroundColor: 'black'
	})
	main.show()
	
	main.on('click', 'up', function(e) {
	    if (isHero4online === true) {
	        if (isRec === false) {
	            var menu = new UI.Menu({
	                title: 'modes',
	                backgroundColor: 'black',
	                textColor: 'white',
	                highlightBackgroundColor: hbg,
	                highlightTextColor: htc,
	                sections: [{
	                    items: [{
	                        title: 'Video',
	                    }, {
	                        title: 'Photo',
	                    }, {
	                        title: 'MultiShot',
	                    }]
	                }]
	            })
	            menu.on('select', function(e) {
	                console.log('Selected item #' + e.itemIndex + ' of section #' + e.sectionIndex)
	                console.log('The item is titled "' + e.item.title + '"')
	                if (e.itemIndex === 0) {
	                    var video_menu = new UI.Menu({
	                        backgroundColor: 'black',
	                        textColor: 'white',
	                        highlightBackgroundColor: hbg,
	                        highlightTextColor: htc,
	                        sections: [{
	                            items: [{
	                                title: 'Single',
	                            }, {
	                                title: 'Looping',
	                            }]
	                        }]
	                    })
	
	                    if (camera_number != 16 || 15 || 17) {
	                        video_menu.item(0, 2, {
	                            title: 'TLVideo'
	                        })
	                        video_menu.item(0, 3, {
	                            title: 'VideoPhoto'
	                        })
	                    }
	
	                    video_menu.on('select', function(video_menu_selection) {
	                        switch (video_menu_selection.itemIndex) {
	                            case 0:
	                                //single
	                                command_h4_modes('0', '0')
	                                video_menu.hide()
	                                menu.hide()
	                                break
	                            case 1:
	                                //looping
	                                command_h4_modes('0', '3')
	                                video_menu.hide()
	                                menu.hide()
	                                break
	                            case 2:
	                                //TLVideo
	                                command_h4_modes('0', '1')
	                                video_menu.hide()
	                                menu.hide()
	                                break
	                            case 3:
	                                //VideoPhoto
	                                command_h4_modes('0', '2')
	                                video_menu.hide()
	                                menu.hide()
	                                break
	                        }
	                    })
	                    video_menu.show()
	                }
	
	                //Photo menu
	                if (e.itemIndex == 1) {
	                    var photo_menu = new UI.Menu({
	                        backgroundColor: 'black',
	                        textColor: 'white',
	                        highlightBackgroundColor: hbg,
	                        highlightTextColor: htc,
	                        sections: [{
	                            items: [{
	                                title: 'Single',
	                            }]
	                        }]
	                    })
	                    if (camera_number != 16 || 15 || 17) {
	                        photo_menu.item(0, 1, {
	                            title: 'Continuous'
	                        })
	                        photo_menu.item(0, 2, {
	                            title: 'Night'
	                        })
	                    }
	                    photo_menu.on('select', function(photo_menu_selection) {
	                        switch (photo_menu_selection.itemIndex) {
	                            case 0:
	                                command_h4_modes('1', '0')
	                                photo_menu.hide()
	                                menu.hide()
	                                //get_data_cam()
	                                break
	                            case 1:
	                                command_h4_modes('1', '1')
	                                photo_menu.hide()
	                                menu.hide()
	                                //get_data_cam()
	                                break
	                            case 2:
	                                command_h4_modes('1', '2')
	                                photo_menu.hide()
	                                menu.hide()
	                                //get_data_cam()
	                                break
	                        }
	                    })
	                    photo_menu.show()
	                }
	                //MultiShot menu
	                if (e.itemIndex == 2) {
	                    var ms_menu = new UI.Menu({
	                        backgroundColor: 'black',
	                        textColor: 'white',
	                        highlightBackgroundColor: hbg,
	                        highlightTextColor: htc,
	                        sections: [{
	                            items: [{
	                                title: 'Burst'
	                            }, {
	                                title: 'TimeLapse'
	                            }]
	                        }]
	                    })
	                    if (camera_number != 16) {
	                        ms_menu.item(0, 2, {
	                            title: 'NightLapse'
	                        })
	                    }
	                    ms_menu.on('select', function(photo_menu_selection) {
	                        switch (photo_menu_selection.itemIndex) {
	                            case 0:
	                                command_h4_modes('2', '0')
	                                ms_menu.hide()
	                                menu.hide()
	                                //get_data_cam()
	                                break
	                            case 1:
	                                command_h4_modes('2', '1')
	                                ms_menu.hide()
	                                menu.hide()
	                                //get_data_cam()
	                                break
	                            case 2:
	                                command_h4_modes('2', '2')
	                                ms_menu.hide()
	                                menu.hide()
	                                //get_data_cam()
	                                break
	                        }
	                    })
	                    ms_menu.show()
	                }
	            })
	            menu.show()
	        }
	    }
	})
	
	main.on('click', 'select', function(e) {
	    if (isHero4online === true) {
	
	        xhr.open("GET", "http://10.5.5.9/gp/gpControl/status", true)
	        xhr.onload = function() {
	            if (xhr.readyState === xhr.DONE) {
	                if (xhr.status === 200) {
	                    var obj = JSON.parse(xhr.responseText)
	                    switch (obj.status[43]) {
	                        case 0:
	                            //get camera rec status
	                            switch (obj.status[8]) {
	                                case 0:
	                                    //record
	                                    xhr.open("GET", "http://10.5.5.9/gp/gpControl/command/shutter?p=1", true)
	                                    xhr.send(null)
	                                    Vibe.vibrate('double')
	                                    break
	                                case 1:
	                                    //stop
	                                    xhr.open("GET", "http://10.5.5.9/gp/gpControl/command/shutter?p=0", true)
	                                    xhr.send(null)
	                                    Vibe.vibrate('short')
	                                    break
	                            }
	                            break
	                        case 1:
	                            xhr.open("GET", "http://10.5.5.9/gp/gpControl/command/shutter?p=1", true)
	                            xhr.send(null)
	                            Vibe.vibrate('double')
	                            break
	                    }
	                }
	            }
	        }
	        xhr.send(null)
	    }
	})
	main.on('click', 'down', function(e) {
	    if (isHero4online === true) {
	        if (isRec === false) {
	            var settings_menu = new UI.Menu({
	                backgroundColor: 'black',
	                textColor: 'white',
	                highlightBackgroundColor: hbg,
	                highlightTextColor: htc
	              })
	            //TODO: Use name arrays
	            settings_menu.item(0, 0, {
	                title: "Action"
	            })
	            settings_menu.item(0, 1, {
	                title: "Indoor"
	            })
	            settings_menu.item(0, 2, {
	                title: "Slow-Mo"
	            })
	            settings_menu.item(0, 3, {
	                title: "Cinema"
	            })
	
	
	            settings_menu.on('select', function(e) {
	                switch (e.itemIndex) {
	                    case 0:
	                        //Action
	                        command_h4(2, 9)
	                        command_h4(3, 5)
	                        command_h4(4, 0)
	                        settings_menu.hide()
	                        break
	                    case 1:
	                        //Indoor
	                        command_h4(2, 9)
	                        command_h4(3, 8)
	                        settings_menu.hide()
	                        break
	                    case 2:
	                        //Slow-Mo
	                        command_h4(2, 9)
	                        command_h4(3, 1)
	                        settings_menu.hide()
	                        break
	                    case 3:
	                        //Cinematic
	                        command_h4(2, 1)
	                        settings_menu.hide()
	                        break
	                }
	
	            })
	            settings_menu.show()
	        }
	    }
	})
	/*
	main.on('click', 'back', function() {
	console.log('Up clicked!')
	})
	*/
	//HiLight Tag:
	main.on('longClick', 'up', function() {
	
	    xhr.open("GET", "http://10.5.5.9/gp/gpControl/status", true)
	
	    xhr.onload = function() {
	        if (xhr.readyState === xhr.DONE) {
	            if (xhr.status === 200) {
	                var obj = JSON.parse(xhr.responseText)
	                switch (obj.status[8]) {
	                    case 0:
	                        command_h4_modes('1', '0')
	                        setTimeout(function() {
	                            //shoot pic
	                            xhr.open("GET", "http://10.5.5.9/gp/gpControl/command/shutter?p=1", true)
	                            xhr.send(null)
	                        }, 2000)
	
	                        Vibe.vibrate('long')
	                        break
	                    case 1:
	                        xhr.open("GET", "http://10.5.5.9/gp/gpControl/command/storage/tag_moment", true)
	                        xhr.send(null)
	                        Vibe.vibrate('long')
	                        break
	                }
	            }
	        }
	
	    }
	    xhr.send(null)
	})
	
	function get_data_cam() {
	
	
	    xhr.open("GET", "http://10.5.5.9/gp/gpControl", true)
	
	    xhr.onload = function() {
	        if (xhr.readyState === xhr.DONE) {
	            if (xhr.status === 200) {
	                var obj = JSON.parse(xhr.responseText)
	                camera_number = obj.info.model_number
	                camera_model_name = obj.info.model_name
	                var batt_percent
	                var mode
	                var left
	                var current_res
	                var taken
	                var framerate = ""
	                var fov
	
	                xhr.open("GET", "http://10.5.5.9/gp/gpControl/status", true)
	
	
	                xhr.onload = function() {
	                    if (xhr.readyState === xhr.DONE) {
	                        if (xhr.status === 200) {
	                            var obj = JSON.parse(xhr.responseText)
	                            //detects camera
	
	                            isHero4online = true
	
	                            //get camera details
	                            switch (obj.status[2]) {
	
	                                case 3:
	                                    batt_percent = "FULL"
	                                    break
	                                case 2:
	                                    batt_percent = "MED"
	                                    break
	                                case 1:
	                                    batt_percent = "LOW"
	                                    break
	                                case 0:
	                                    batt_percent = "LOW!"
	                                    break
	                                case 4:
	                                    batt_percent = "PWR"
	                                    break
	                            }
	
	                            switch (obj.status[43]) {
	                                case 0:
	                                    switch (obj.status[44]) {
	                                        case 0:
	                                            mode = "video"
	                                            break
	                                        case 1:
	                                            mode = "tlvideo"
	                                            break
	                                        case 2:
	                                            mode = "dual"
	                                            break
	                                        case 3:
	                                            mode = "looping"
	                                            break
	                                    }
	                                    left = ""
	                                    switch (obj.status[8]) {
	                                        case 0:
	                                            taken = "" + obj.status[39] + " shots"
	
	                                            isRec = false
	                                            break
	                                        case 1:
	                                            taken = "" + minutes2str(obj.status[13])
	                                            isRec = true
	                                            break
	                                    }
	                                    switch (obj.settings[4]) {
	                                        case 0:
	                                            fov = "W"
	                                            break
	                                        case 1:
	                                            fov = "M"
	                                            break
	                                        case 2:
	                                            fov = "N"
	                                            break
	                                        case 4:
	                                            fov = "L"
	                                            break
	                                    }
	                                    switch (obj.settings[2]) {
	                                        case 2:
	                                            current_res = "4K S"
	                                            break
	                                        case 1:
	                                            current_res = "4K"
	                                            break
	                                        case 5:
	                                            current_res = "2.7K S"
	                                            break
	                                        case 4:
	                                            current_res = "2.7K"
	                                            break
	                                        case 6:
	                                            current_res = "2.7K 4:3"
	                                            break
	                                        case 7:
	                                            current_res = "1440p"
	                                            break
	                                        case 8:
	                                            current_res = "1080p S"
	                                            break
	                                        case 9:
	                                            current_res = "1080p"
	                                            break
	                                        case 10:
	                                            current_res = "960p"
	                                            break
	                                        case 11:
	                                            current_res = "720p S"
	                                            break
	                                        case 12:
	                                            current_res = "720p"
	                                            break
	                                        case 13:
	                                            current_res = "WVGA"
	                                            break
	
	                                    }
	                                    //framerate
	                                    switch (obj.settings[3]) {
	                                        case 0:
	                                            framerate = "240 FPS"
	                                            break
	                                        case 1:
	                                            framerate = "120 FPS"
	                                            break
	                                        case 2:
	                                            framerate = "100 FPS"
	                                            break
	                                        case 3:
	                                            framerate = "90 FPS"
	                                            break
	                                        case 4:
	                                            framerate = "80 FPS"
	                                            break
	                                        case 5:
	                                            framerate = "60 FPS"
	                                            break
	                                        case 6:
	                                            framerate = "50 FPS"
	                                            break
	                                        case 7:
	                                            framerate = "48 FPS"
	                                            break
	                                        case 8:
	                                            framerate = "30 FPS"
	                                            break
	                                        case 9:
	                                            framerate = "25 FPS"
	                                            break
	                                        case 10:
	                                            framerate = "24 FPS"
	                                            break
	                                    }
	                                    break
	                                case 1:
	                                    switch (obj.status[44]) {
	                                        case 0:
	                                            mode = "photo"
	                                            break
	                                        case 1:
	                                            mode = "continuous"
	                                            switch (obj.settings[18]) {
	                                                case 0:
	                                                    framerate = "3/1"
	                                                    break
	                                                case 1:
	                                                    framerate = "5/1"
	                                                    break
	                                                case 2:
	                                                    framerate = "10/1"
	                                                    break
	                                            }
	                                            break
	                                        case 2:
	                                            mode = "nightphoto"
	                                            switch (obj.settings[19]) {
	                                                case 0:
	                                                    framerate = "Auto"
	                                                    break
	                                                case 1:
	                                                    framerate = "2 sec"
	                                                    break
	                                                case 2:
	                                                    framerate = "5 sec"
	                                                    break
	                                                case 3:
	                                                    framerate = "10 sec"
	                                                    break
	                                                case 4:
	                                                    framerate = "15 sec"
	                                                    break
	                                                case 5:
	                                                    framerate = "20 sec"
	                                                    break
	                                                case 6:
	                                                    framerate = "30 sec"
	                                                    break
	                                            }
	                                            break
	
	                                    }
	                                    left = obj.status[34] + ' left'
	                                    taken = obj.status[38] + " pictures"
	                                    switch (obj.settings[17]) {
	                                        case 0:
	                                            current_res = "12MP W"
	                                            break
	                                        case 1:
	                                            current_res = "7MP W"
	                                            break
	                                        case 2:
	                                            current_res = "7MP M"
	                                            break
	                                        case 3:
	                                            current_res = "5MP M/W"
	                                            break
	                                    }
	                                    fov = ""
	                                    break
	                                case 2:
	                                    switch (obj.status[44]) {
	                                        case 0:
	                                            mode = "burst"
	                                            switch (obj.settings[29]) {
	                                                case 0:
	                                                    framerate = "3/1"
	                                                    break
	                                                case 1:
	                                                    framerate = "5/1"
	                                                    break
	                                                case 2:
	                                                    framerate = "10/1"
	                                                    break
	                                                case 3:
	                                                    framerate = "10/2"
	                                                    break
	                                                case 4:
	                                                    framerate = "10/3"
	                                                    break
	                                                case 5:
	                                                    framerate = "30/1"
	                                                    break
	                                                case 6:
	                                                    framerate = "30/2"
	                                                    break
	                                                case 7:
	                                                    framerate = "30/3"
	                                                    break
	                                                case 8:
	                                                    framerate = "30/6"
	                                                    break
	                                            }
	                                            break
	                                        case 1:
	                                            mode = "timelapse"
	                                            switch (obj.settings[30]) {
	                                                case 0:
	                                                    framerate = "0.5sec"
	                                                    break
	                                                case 1:
	                                                    framerate = "1sec"
	                                                    break
	                                                case 2:
	                                                    framerate = "2sec"
	                                                    break
	                                                case 5:
	                                                    framerate = "5sec"
	                                                    break
	                                                case 10:
	                                                    framerate = "10sec"
	                                                    break
	                                                case 30:
	                                                    framerate = "30sec"
	                                                    break
	                                                case 60:
	                                                    framerate = "60sec"
	                                                    break
	
	                                            }
	                                            break
	                                        case 2:
	                                            mode = "nightlapse"
	                                            break
	                                    }
	                                    left = obj.status[34] + ' left'
	                                    taken = obj.status[38] + ' pictures'
	                                    switch (obj.settings[28]) {
	                                        case 0:
	                                            current_res = "12MP W"
	                                            break
	                                        case 1:
	                                            current_res = "7MP W"
	                                            break
	                                        case 2:
	                                            current_res = "7MP M"
	                                            break
	                                        case 3:
	                                            current_res = "5MP M/W"
	                                            break
	                                    }
	                                    fov = ""
	                                    break
	                                case 5:
	                                    mode = "settings"
	                                    current_res = "settings"
	                                    fov = ""
	                                    taken = ""
	                                    left = ""
	
	                            }
	
	                            main.title(current_res + " " + fov)
	                            main.body(framerate + '\n' + 'Batt: ' + batt_percent + '\n' + taken + '\n' + left)
	                            main.icon('images/' + mode + '_icon.png')
	                            main.bodyColor('white') // Hex colors
	                            main.titleColor('white')
	                            main.backgroundColor('black')
	                        } else {
	                            main.title('CONNECTING...')
	                            main.body('Please connect the GoPro WiFi to phone!')
	                            main.subtitleColor('indigo') // Named colors
	                            main.bodyColor('white') // Hex colors
	                            main.titleColor('white')
	                            main.backgroundColor('black')
	                        }
	                    }
	                }
	
	
	                xhr.send(null)
	
	            }
	
	        }
	    }
	
	    xhr.send(null)
	    setTimeout(get_data_cam, 2000)
	    /*
	
	
	        */
	
	}
	
	
	
	function minutes2str(minutes) {
	    var h = Math.floor(minutes / 60)
	    var m = minutes % 60
	    return h + "M" + ("0" + m).slice(-2) + "S"
	}
	
	function get_h3_cam() {
	
	    xhr.open("GET", "http://10.5.5.9/camera/cv", true)
	
	    xhr.onload = function() {
	        if (xhr.readyState === xhr.DONE) {
	            if (xhr.status === 200) {
	                var camName = "camera"
	                var dump = xhr.responseText
	                if (dump.indexOf("Black") != -1) {
	                    camName = "HERO3 Black"
	
	                }
	                if (dump.indexOf("Silver") != -1) {
	                    camName = "HERO3 Silver"
	
	                }
	                if (dump.indexOf("White") != -1) {
	                    camName = "HERO3 White"
	
	                }
	                var gopropassword = "hello"
	                xhr.open("GET", "http://10.5.5.9/bacpac/sd", true)
	
	                xhr.onload = function() {
	                    if (xhr.readyState === xhr.DONE) {
	                        if (xhr.status === 200) {
	                            gopropassword = xhr.responseText.cleanup()
	                            h3Pass = gopropassword
	
	                            var data = ""
	                            //screendata
	                            //getGP3Status(gopropassword)
	                            var main_h3 = new UI.Card({
	                                title: 'HERO3 Camera',
	                                body: 'Connected to: ' + camName + "\n",
	                                subtitleColor: 'white',
	                                titleColor: 'white',
	                                bodyColor: 'white',
	                                backgroundColor: 'black'
	                            })
	
	                            main_h3.on('click', 'up', function(e) {
	                                //show menu
	                                var menu = new UI.Menu({
	                                    title: 'modes',
	                                    backgroundColor: 'black',
	                                    textColor: 'white',
	                                    highlightBackgroundColor: hbg,
	                                    highlightTextColor: htc,
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
	                                })
	                                menu.on('select', function(e) {
	                                    console.log('Selected item #' + e.itemIndex + ' of section #' + e.sectionIndex)
	                                    console.log('The item is titled "' + e.item.title + '"')
	                                    switch (e.itemIndex) {
	                                        case 0:
	                                            var xhr = new XMLHttpRequest()
	                                            xhr.open("GET", "http://10.5.5.9/camera/CM?t=" + gopropassword + "&p=%00", true)
	                                            xhr.send(null)
	                                            menu.hide()
	                                            break
	                                        case 1:
	                                            var xhr = new XMLHttpRequest()
	                                            xhr.open("GET", "http://10.5.5.9/camera/CM?t=" + gopropassword + "&p=%01", true)
	                                            xhr.send(null)
	                                            menu.hide()
	                                            break
	                                        case 2:
	                                            var xhr = new XMLHttpRequest()
	                                            xhr.open("GET", "http://10.5.5.9/camera/CM?t=" + h3Pass + "&p=%02", true)
	                                            xhr.send(null)
	                                            menu.hide()
	                                            break
	                                        case 3:
	                                            var xhr = new XMLHttpRequest()
	                                            xhr.open("GET", "http://10.5.5.9/camera/CM?t=" + h3Pass + "&p=%03", true)
	                                            xhr.send(null)
	                                            menu.hide()
	                                            break
	                                    }
	
	                                })
	                                menu.show()
	                            })
	                            main_h3.on('click', 'select', function(e) {
	                                var xhr = new XMLHttpRequest()
	                                xhr.open("GET", "http://10.5.5.9/bacpac/SH?t=" + h3Pass + "&p=%01", true)
	                                xhr.send(null)
	                            })
	                            main_h3.on('click', 'down', function(e) {
	                                var xhr = new XMLHttpRequest()
	                                xhr.open("GET", "http://10.5.5.9/bacpac/SH?t=" + h3Pass + "&p=%00", true)
	                                xhr.send(null)
	                            })
	                            main_h3.show()
	                        }
	                    }
	                }
	                xhr.send(null)
	
	            }
	        }
	    }
	    xhr.send(null)
	
	
	}
	String.prototype.cleanup = function() {
	    return this.replace(/[^a-zA-Z0-9]+/g, "")
	}
	
	xhr.open("GET", "http://10.5.5.9/camera/cv", true)
	xhr.onload = function() {
	    if (xhr.readyState === xhr.DONE) {
	        if (xhr.status === 200) {
	            var dump = xhr.responseText
	            if (dump.indexOf("Hero3") != -1) {
	                //Detects HERO3/3+ (2014 and 2013) Cameras
	                get_h3_cam()
	                HERO3 = true
	            } else {
	                //Further detection
	                xhr.open("GET", "http://10.5.5.9/gp/gpControl/info", true)
	                xhr.onload = function() {
	                    if (xhr.readyState === xhr.DONE) {
	                        if (xhr.status === 200) {
	                            var dump = xhr.responseText
	                            if (dump.indexOf("HD5") != -1) {
	                                get_data_cam()
	                            }
	                            if (dump.indexOf("HERO4") != -1) {
	                                get_data_cam()
	                            }
	                        }
	                    }
	                }
	                xhr.send(null)
	            }
	            if (dump.indexOf("HERO4") != -1) {
	                get_data_cam()
	            }
	            if (dump.indexOf("HD3.2") != -1) {
	                get_data_cam()
	            }
	            if (dump.indexOf("HX") != -1) {
	                get_data_cam()
	            }
	        }
	    }
	}
	
	xhr.send(null)
	
	
	//HERO5 detection
	    xhr.open("GET", "http://10.5.5.9/gp/gpControl/info", true)
	    xhr.onload = function() {
	        if (xhr.readyState === xhr.DONE) {
	            if (xhr.status === 200) {
	                var dump = xhr.responseText
	                if (dump.indexOf("HERO5") != -1) {
	                    get_data_cam()
	                }
	                if (dump.indexOf("HERO4") != -1) {
	                    get_data_cam()
	                }
	                if (dump.indexOf("HX") != -1) {
	                    get_data_cam()
	                }
	                if (dump.indexOf("HD3.2") != -1) {
	                    get_data_cam()
	                }
	
	            }
	        }
	    }
	    xhr.send(null)
	
	});
	
	//works on iOS!!!


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
		"name": "GoPro Remote",
		"author": "Konrad Iturbe",
		"version": "1.2.0",
		"keywords": [
			"pebble-app"
		],
		"private": true,
		"dependencies": {
			"pebblejs": "^1.0.0"
		},
		"pebble": {
			"displayName": "GoPro Remote",
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
				"dummy"
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


/***/ }
/******/ ]);
//# sourceMappingURL=pebble-js-app.js.map