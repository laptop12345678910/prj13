var Peter_Pan_Song="";
var Hogwards_Theme_Song="";

leftWristX = 0;
leftWristY = 0;

rightWristX = 0;
rightWristY = 0;

ScoreleftWrist = 0;
ScorerightWrist = 0;

function Preload()
{
    Peter_Pan_Song = loadSound("music2.mp3");
    Hogwards_Theme_Song = loadSound("music.mp3");
}

function play()
{
}

function setup() {
    canvas = createCanvas(600, 500);
    canvas.center();

    video = createCapture(VIDEO);
    video.hide();

    poseNet = ml5.poseNet(video, modelLoaded);
    poseNet.on('pose', gotPoses);
}

function modelLoaded(){
    console.log("!!!PoseNet Model Has Been Initialized!!!");
}

function gotPoses(results)
{
    if(results.length > 0)
    {
        console.log(results);

        leftWristX = results[0].pose.leftWrist.x;
        leftWristY = results[0].pose.leftWrist.y;
         
        console.log("LeftWristX = " + leftWristX , "LeftWristY = " + leftWristY);

        rightWristX = results[0].pose.rightWrist.x;
        rightWristY - results[0].pose.rightWrist.y;

        console.log("rightWristX = " + rightWristX , "rightWristY = " + rightWristY);

        ScoreleftWrist = results[0].pose.keypoints[9].score;
        console.log("Score Left Wrist = " + ScoreleftWrist);

        ScorerightWrist = results[0].pose.keypoints[10].score;
        console.log("Score Right Wrist = " + ScorerightWrist);
    }
}
 
function draw(){
    image(video, 0, 100, 600, 500);

    fill("#4E9FE5");
    stroke("#4E9FE5");

    if( ScoreleftWrist > 0.2)
    {
        circle(leftWristX , leftWristY , 20);

        function play(){
        Peter_Pan_Song.play();
        Peter_Pan_Song.volume(1);
        }
         
        function stop(){
        Hogwards_Theme_Song.stop();
        }
    }
    if( ScorerightWrist > 0.2)
    {
        circle(rightWristX , rightWristY , 20);

        function stop(){
            Peter_Pan_Song.stop();
        }

        function play() {
            Hogwards_Theme_Song.play();
            Hogwards_Theme_Song.volume(1);
        }
    }
}