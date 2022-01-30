Webcam.set({
    height:300,
    width:350,
    image_format:'png',
    png_quality:90
});

camera = document.getElementById("camera");

Webcam.attach("#camera");

function take_snapshot(){
    Webcam.snap(function(data_uri){
        document.getElementById("results").innerHTML = '<img src="'+data_uri+'" id="selfie_png">';
    });
}

console.log('ml5 version: ', ml5.version);
classifier = ml5.imageClassifier("https://teachablemachine.withgoogle.com/models/eA2ltzoLK/model.json", model_loaded);

function model_loaded(){
    console.log("Model is loaded!");
}

function check(){
    image = document.getElementById("selfie_png");
    classifier.classify(image, got_result);
}

function got_result(error, results){
    if (error){
        console.error(error);
    }
    else{
        console.log(results);
        document.getElementById("result_object_name").innerHTML = results[0].label;
        document.getElementById("result_object_accuracy").innerHTML = results[0].confidence.toFixed(2)*100+"%";
    }
}

