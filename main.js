music = "";
music_2 = "";

left_wrist_x = 0;
left_wrist_y = 0;

right_wrist_x = 0;
right_wrist_y = 0;

left_wrist_score = 0;
song_status = "";

function preload()
{
    music = loadSound("music.mp3");
    music_2 = loadSound("music.mp3");
}

function setup()
{
    canvas = createCanvas(400,500);
    canvas.center();

    video = createCapture(VIDEO);
    video.hide();

    poseNet = ml5.poseNet(video, ModelLoaded);
    poseNet.on("pose", gotPoses);
}

function draw()
{
    image(video, 0 , 0 , 600, 500);

    stroke("#FF0000");
    fill("FF0000");

    music.isPlaying();
    song_status = ""

    if(left_wrist_score > 0.2)
    {
        circle(left_wrist_x, left_wrist_y, 20);
        music_2.stop();

        if(song_status == "false")
        {
            music.play();
            document.getElementById("song").innerHTML = "song_1"
        }
    }
}

function gotPoses(results)
{
    if(results.length > 0)
    {
        console.log(results);
        left_wrist_score = results[0].pose.keypoints[9].score;


        left_wrist_x = results[0].pose.leftWrist.x;
        left_wrist_y = results[0].pose.leftWrist.y;
        console.log("Left Wrist X = " + left_wrist_x + "Left Wrist Y =" + left_wrist_y);

        right_wrist_x= results[0].pose.rightWrist.x;
        right_wrist_y = results[0].pose.rightWrist.y;
        console.log("Right Wrist X = " + right_wrist_x + "Right Wrist Y = " + right_wrist_y);
    }
}