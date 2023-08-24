on_the_ground = "";
unforgiven = "";
leftWrist_x = 0;
leftWrist_y = 0;

rightWrist_x = 0;
rightWrist_y = 0;

scoreleftWrist = 0;
song_OTG = "";

scorerightWrist = "";
song_unf = "";


function setup() {
    canvas = createCanvas(600, 530);
    canvas.center();

    video = createCapture(VIDEO);
    video.hide();

    poseNet = ml5.poseNet(video, modelLoaded);
    poseNet.on('pose', gotPoses);
}

function draw() {
    image(video, 0, 0, 600, 530);


    fill("#37ff00");
    stroke("#ff0000");


    song_OTG = on_the_ground.isPlaying();
    console.log("OTG "+song_OTG);

    song_unf= unforgiven.isPlaying();
    console.log("Unforgiven "+song_unf);


    if(scoreleftWrist > 0.2) {
        circle(leftWrist_x, leftWrist_y, 20);
        unforgiven.stop();

        if(song_OTG.play() == false) {
            on_the_ground.play();
        } else {
            document.getElementById("song_name").innerHTML = "Song Name : On The Ground ( OTG ) playing ";
        }
    }

    if(scorerightWrist > 0.2) {
        circle(rightrist_x, rightWrist_y, 20);
        on_the_ground.stop();

        if(song_unf.play() == false) {
            unforgiven.play();
        } else {
            document.getElementById("song_name").innerHTML = "Song Name : Unforgiven is playing ";
        }
    }
}

function preload() {
    on_the_ground = loadSound("On-The-Ground.mp3");
    unforgiven = loadSound("UNFORGIVEN(PagalWorldl).mp3")
}

function modelLoaded() {
    console.log("PoseNet Is Initialized!");
}

function gotPoses(results) {
    if(results.length > 0) {
        console.log(results);

        scoreleftWrist - results[0].pose.keypoints[9].score;
        console.log("Left Wrist : " + scoreleftWrist);

        scorerightWrist - results[0].pose.keypoints[10].score;
        console.log("Right Wrist : " + scorerightWrist);

        leftWrist_x = results[0].pose.leftWrist.x;
        leftWrist_y - results[0].pose.leftWrist.y;
        console.log("leftWrist_x = " + leftWrist_x + "leftWrist_y = " + leftWrist_y);
        
        
        rightWrist_x = results[0].pose.rightWrist.x;
        rightWrist_y - results[0].pose.rightWrist.y;
        console.log("rightWrist_x = " + rightWrist_x + "rightWrist_y = " + rightWrist_y);
    }
}