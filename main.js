song1="";
song2="";
song1_status="";
song2_status="";
leftWristeX =0;
leftWristeX =0;
rightWristeX =0;
rightWristeX =0;
scoreleftWrist =0;
scorerightWrist =0;

function preload()
{
    song1=loadSound("jingle bells.mp3");
    song2=loadSound("rouldalph the red nose riendeer.mp3");
}

function setup()
{
  canvas=createCanvas(600,500);
  canvas.center();
  video=createCapture(VIDEO);
  video.hide();
  poseNet = ml5.poseNet(video, modelLoaded);
  PoseNet.on('pose', gotPoses);
}

function modelLoaded()
{
  console.log('PoseNet Is Initialized');
}

function draw()
{
  image(video,0,0,600,500);
  fill("#FF0000")
  stroke("FF0000")
  circle(rightWristeX,rightWristY,20);

  if(scoreRightWrist > 0.2) 
  {
  circle(rightWristX,rightWristY,20);
  song2.stop();
  if(song1_status == false) 
  { 
  song1.play();
  document.getElementById("song").innerHTML = "Playing - Jingle bells" 
  } 
  } 

if(scoreLeftWrist > 0.2) 
{ 
circle(leftWristX,leftWristY,20);
song1.stop(); 
if(song2_status == false) 
{ song2.play();
document.getElementById("song").innerHTML = "Playing - Rouldalph the red nose riendeer ";
}}}


function play() 
{
  song.play();
  song.setvolume(1);
  song.rate();
}

function gotPoses(results)
{
  if(results.length > 0)
  {
    console.log(results);
    scoreRightWrist = results[0].pose.keypoint[10].score;
    scoreleftWrist = results[0].pose.keypoint[9].score;
    console.log("scoreRightWrist="+scoreRightWrist+"scoreLeftWrist="+scoreLeftWrist);
    
    rightWristX=results[0].pose.rightWrist.x;
    rightWristY=results[0].pose.rightWrist.y;
    console.log("rightWristX="+rightWristX+"rightWristY="+rightWristY);
    leftWristX=results[0].pose.leftWrist.x;
    leftWristY=results[0].pose.leftWrist.y;
    console.log("leftWristX="+leftWristX+"leftWristY="+leftWristY);
  }
}
