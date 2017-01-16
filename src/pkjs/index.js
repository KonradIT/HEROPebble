Pebble.addEventListener('ready', function() {
  console.log("ready");


require('pebblejs');
var UI = require('pebblejs/ui')
var Vibe = require('pebblejs/ui/vibe')
var Light = require('pebblejs/ui/light')
var isRec = false
var isHero4online = false
var xhr = new XMLHttpRequest()
var presets = ""
var MasterSimpleMode = false
var camera_number = ""
var camera_model_name = ""
var h3Pass = "nothing"
var HERO3 = false
var Feature = require('pebblejs/platform/feature')
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
