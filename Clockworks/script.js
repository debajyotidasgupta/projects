let timerObj = {
    minutes: 0,
    seconds: 0,
    timerID: 0
}


function soundAlarm() {
    let amount=3;
    let audio=new Audio("Timer_Sound_Effect.mp3");
    function playSound() {
        audio.pause();
        audio.currentTime=0;
        audio.play();
    }
    for (let i = 0; i < amount; i++) {
        setTimeout(playSound,1200*i);
    }
}

function updateValue(key, value){
    if(value<0){
        value=0;
    }
    if(key=="seconds"){
        if(value<10){
            value="0"+value;
        }
        if(value>59){
            value=59;
        }
    }
    $("#"+key).html(value||0);
    timerObj[key]=value;
}

(function detectChanges(key){
    console.log("Detect Changes");
    let input="#"+key+"-input";
    $(input).change(function() {
        updateValue(key,$(input).val());
    })
    $(input).keyup(function() {
        updateValue(key,$(input).val());
    })
    return arguments.callee;
})("minutes")("seconds");

function startTimer() {
    buttonManager(["start",false],["stop",true],["pause",true]);
    freezeInputs();
    timerObj.timerID = setInterval(function() {
        timerObj.seconds--;
        if(timerObj.seconds<0){
            if (timerObj.minutes==0) {
                soundAlarm();
                return stopTimer();
            }
            timerObj.seconds=59;
            timerObj.minutes--;
        }
        updateValue("minutes",timerObj.minutes);
        updateValue("seconds",timerObj.seconds);
    },1000)
}
function stopTimer() {
    clearInterval(timerObj.timerID);
    buttonManager(["start",true],["stop",false],["pause",false]);
    unfreezeInputs();
    updateValue("minutes",$("#minutes-input").val());
    let seconds = $("#seconds-input").val();
    if(seconds == 0) { seconds = "0" + seconds; }
    updateValue("seconds", seconds);
}
function pauseTimer() {
    buttonManager(["start",true],["stop",true],["pause",false]);
    clearInterval(timerObj.timerID);
}
function buttonManager(...buttonsArray) {
    for (let i = 0; i < buttonsArray.length; i++) {
        let button="#"+buttonsArray[i][0]+"-button";
        if(buttonsArray[i][1]){
            $(button).removeAttr("disabled");
        }else{
            $(button).attr("disabled","disabled");
        }
    }
}
function freezeInputs() {
    $("#minutes-input").attr("disabled","disabled");
    $("#seconds-input").attr("disabled","disabled");
}
function unfreezeInputs() {
    $("#minutes-input").removeAttr("disabled");
    $("#seconds-input").removeAttr("disabled");
}
