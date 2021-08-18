Webcam.set({
    width:350,
    height:300,
    image_format:'png',
    png_quality:90
    });
    
    camera=document.getElementById("camera")
    Webcam.attach(camera)
    
    function Capture(){
        Webcam.snap(function (data_uri){
            document.getElementById("result").innerHTML='<img id="CapturedImage" src="'+data_uri+'"/>';
        })
    }
    console.log('ml5 version',ml5.version);
    
    classifier=ml5.imageClassifier('https://teachablemachine.withgoogle.com/models/-SAthfY9C/model.json',modelLoaded);
    
    function modelLoaded(){
        console.log("Model Loaded!");
    }
    
    function speak(){
        var synth= window.speechSynthesis;
        speak_data_1 = "the first prediction is"+prediction_1;
        speak_data_2 = "the second prediction is"+prediction_2;
        var UtterThis = new SpeechSynthesisUtterance(speak_data_1+speak_data_2);
        synth.speak(UtterThis);
    
    }
    function check(){
        img=document.getElementById("CapturedImage")
        classifier.classify(img,gotResult)
    }
    function gotResult(error,result){
        if (error){
    console.log(error)
        }
        else{
            console.log(result)
            document.getElementById("result_emotion_name").innerHTML=result[0].label
            document.getElementById("result_emotion_name2").innerHTML=result[1].label
            prediction_1=result[0].label
            prediction_2=result[1].label
            speak()
            if(result[0].label=="thumbs up"){
                document.getElementById("update_emoji").innerHTML="&#128077;"
            }
            if(result[0].label=="victory hand"){
                document.getElementById("update_emoji").innerHTML="&#x270C;"
            }
            if(result[0].label=="amazing"){
                document.getElementById("update_emoji").innerHTML="&#128076;"
    
            }
            if(result[1].label=="thumbs up"){
                document.getElementById("update_emoji").innerHTML="&#128077;"
            }
            if(result[1].label=="victory hand"){
                document.getElementById("update_emoji").innerHTML="&#x270C;"
            }
            if(result[1].label=="amazing"){
                document.getElementById("update_emoji").innerHTML="&#128076;"
                
            }
        }
    }