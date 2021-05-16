p1 = "";
p2 = "";
Webcam.set({
    width: 350,
    height: 300,
    image_format: 'png',
    png_quality: 100
});
camera = document.getElementById("webcam");
Webcam.attach(camera);

function takepic() {
    Webcam.snap(function (pic) {
        document.getElementById("result").innerHTML = '<img id="snap_pic" src="' + pic + '"/>';
    });
}
console.log('ml5 version:', ml5.version);
classifier = ml5.imageClassifier('https://teachablemachine.withgoogle.com/models/y60h5JbU6/model.json', modelloaded);

function modelloaded() {
    console.log("Model Loaded Succesfully!");
}

function speak() {
    var synth = window.speechSynthesis;
    speak_data = "the first prediction is " + p1;
    var utter = new SpeechSynthesisUtterance(speak_data1 + speak_data2);
    synth.speak(utter);
}

function check() {
    image = document.getElementById("snap_pic");
    classifier.classify(image, getResult);

}

function gotResult(error, results) {
    if (error) {
        console.error(error);
    } else {
        console.log(results);

        document.getElementById("emotion_name").innerHTML = results[0].label;

        gesture = results[0].label;

        toSpeak = "";

        if (gesture == "point up") {
            p1 = "pointing your finger up";
            document.getElementById("emoji_icon").innerHTML = "&#128070;";
        } else if (gesture == "yo") {
            p1 = "let's rock";
            document.getElementById("emoji_icon").innerHTML = "&#129304;";
        } else if (gesture == "stop") {
            p1 = "stop right there";
            document.getElementById("emoji_icon").innerHTML = "&#9995;";
        }

        speak();
       
    }
}