/*
===========================Sena Audio Functions============================
*/

//This is sena_audio.js, it holds the functions responsible for the audio in sena.

//assing in the div element the audio is contained in will play that audio
//calling play_audio() with nothing passed in will pause all audios not in the stimuli
function play_audio(value)
{
    var audios = $('.audio_player');
    var playing_audio = $('.playing_audio');
    var stim_audio = $('.stim_audio');

    if(typeof value != "undefined"){
        if(value.children[0].paused == true)
        {
            for (var l = 0; l < stim_audio.length; ++l)
            {
                if(typeof stim_audio[l].pause == "function")
                {
                    stim_audio[l].pause();
                }
            }
            for (var l = 0; l < audios.length; ++l)
            {
                audios[l].pause();
            }
            if (playing_audio.length)
            {
                playing_audio[0].children[1].className = playing_audio[0].children[1].className.replace( /(?:^|\s)glyphicon-stop(?!\S)/g , ' glyphicon-play' );
                playing_audio[0].className = playing_audio[0].className.replace( /(?:^|\s)playing_audio(?!\S)/g , ' paused_audio' );
            }

            setTimeout(function() { 
				value.children[0].load();
			}, 10);
            
            // console.log('about to play audio');
            setTimeout(function() { 
				value.children[0].play();
			}, 750);

            value.children[1].className = value.children[1].className.replace( /(?:^|\s)glyphicon-play(?!\S)/g , ' glyphicon-stop' );
            value.className = value.className.replace( /(?:^|\s)paused_audio(?!\S)/g , ' playing_audio' );
            $(value.children[0]).bind("ended", function() {
                value.children[1].className = value.children[1].className.replace( /(?:^|\s)glyphicon-stop(?!\S)/g , ' glyphicon-play' );
                value.className = value.className.replace( /(?:^|\s)playing_audio(?!\S)/g , ' paused_audio' );
                $(value.children[0]).unbind("ended");
            });
        }
        else
        {
            for (var l = 0; l < audios.length; ++l)
            {
                audios[l].pause();
            }
            value.children[1].className = value.children[1].className.replace( /(?:^|\s)glyphicon-stop(?!\S)/g , ' glyphicon-play' );
            value.className = value.className.replace( /(?:^|\s)playing_audio(?!\S)/g , ' paused_audio' );
        }
    }
    else
    {
        stop_all_audio();
    }
}

function stop_all_audio()
{
    var audios = $('.audio_player');
    var playing_audio = $('.playing_audio');
    var stim_audio = $('.stim_audio');

    for (var l = 0; l < audios.length; ++l)
    {
        audios[l].pause();
    }
    if (playing_audio.length)
    {
        playing_audio[0].children[1].className = playing_audio[0].children[1].className.replace( /(?:^|\s)glyphicon-stop(?!\S)/g , ' glyphicon-play' );
        playing_audio[0].className = playing_audio[0].className.replace( /(?:^|\s)playing_audio(?!\S)/g , ' paused_audio' );
    }
}

function sfx_player_init(){
    viewModel.sfx_player = $('#sfx_player').mediaelementplayer({
        videoWidth: 0,
        videoHeight: 0,
        defaultVideoWidth: 0,
        defaultVideoHeight: 0,
        audioWidth: 0,
        audioHeight: 0,
        loop: false,
        startVolume: 0.8,
        preLoad: true,
        alwaysShowHours: false,
        showTimecodeFrameCount: false,
        pluginPath: '/static/framework/media-elements/',
        flashName: 'flashmediaelement.swf',
        pauseOtherPlayers: false,
        enableKeyboard: false             
    });
    console.log(viewModel.sfx_player)
    $(viewModel.sfx_player[0]).addClass("sfx-player");
    viewModel.audio_extension = '.mp3';
    if(typeof viewModel.sfx_player != 'undefined'){
        if (viewModel.sfx_player[0].canPlayType('audio/mpeg;')) {
            $(viewModel.sfx_player[0]).attr("type", 'audio/mpeg');
        }
        else{
            $(viewModel.sfx_player[0]).attr("type", 'audio/ogg');
            viewModel.audio_extension = '.ogg';
        }
    }
}

function sfx_player(audio_file){
    if(viewModel.sfx_on() && typeof viewModel.sfx_player != 'undefined'){
        $(viewModel.sfx_player[0]).attr("src", 'assets/'+lms_config.product_type+'/sounds/'+audio_file+viewModel.audio_extension);
        viewModel.sfx_player[0].load();
        viewModel.sfx_player[0].addEventListener('loadeddata', sfx_player_play, false);
    }
}

function sfx_player_play(){
    viewModel.sfx_player[0].play();
    viewModel.sfx_player[0].removeEventListener('loadeddata', sfx_player_play, false);
}