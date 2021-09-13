img = "";
status = "";
object = [];

function setup() {
    canvas = createCanvas(380, 380);
    canvas.center();
    video = createCapture(VIDEO);
    video.size(380, 380);
    video.hide();
    objectDetector = ml5.objectDetector("cocossd", modelloaded);
    document.getElementById("status").innerHTML = 'Status Detecting Object';
}

function modelloaded() {
    console.log('Model Loaded');
    status = true;
}

function gotResult(error, results) {
    if (error) {
        console.log(error)
    } else {
        console.log(results)
        object = results;
    }
}

function draw() {
    image(video, 0, 0, 380, 380);
    if (status != "") {
        objectDetector.detect(video, gotResult);
        if (object.length > 0) {
            document.getElementById("status").innerHTML = 'Status Detected Object';
            if (object == true) {
                document.getElementById("number_of_objects").innerHTML = "Baby found";
                song.play()
                song.setVolume(1)
                song.rate(1)
            } else {
                document.getElementById("number_of_objects").innerHTML = "Baby not found";

            }
            document.getElementById("number_of_objects").innerHTML = "Number of objects detected are :" + object.length
            for (let index = 0; index < object.length; index++) {
                label = object[index].label;
                x = object[index].x;
                y = object[index].y;
                width = object[index].width;
                height = object[index].height;
                percent = floor(object[index].confidence * 100);
                fill(r, g, b);
                text(label + " " + percent + "%", x + 15, y + 15);
                stroke(r, g, b);
                noFill();
                rect(x, y, width, height);

            }
        }

    }


}