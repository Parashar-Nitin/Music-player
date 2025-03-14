var currentSong="";
var currentAudio=null;
let songLinkList=[];
let songNameList=[];
let currentPosition=0;

//Play next Song
function nextSong(i=currentPosition){
    if(currentAudio)
    {
        // if(currentAudio.currentTime==currentAudio.duration)
        // {
            if(i<(songLinkList.length-1))
            {
                currentAudio.pause(); // Stop current audio
                currentAudio=new Audio(songLinkList[i+1]);
                currentAudio.currentTime=0;
                currentAudio.play();
                document.getElementsByClassName("songInfo")[0].innerHTML=songNameList[i+1];
                document.getElementsByClassName("play")[0].src="img/pause.svg";
                currentPosition=i+1;
            }
            else{
                currentAudio.pause(); // Stop current audio
                currentAudio=new Audio(songLinkList[0]);
                currentAudio.currentTime=0;
                currentAudio.play();
                document.getElementsByClassName("songInfo")[0].innerHTML=songNameList[0];
                document.getElementsByClassName("play")[0].src="img/pause.svg";
                currentPosition=0;
            }
        // }
    }
}



//Play prev Song
function prevSong(i=currentPosition){
    if(currentAudio)
    {
        // if(currentAudio.currentTime==currentAudio.duration)
        // {
            if(i==0)
            {
                currentAudio.pause(); // Stop current audio
                currentAudio=new Audio(songLinkList[(songLinkList.length-1)]);
                currentAudio.currentTime=0;
                currentAudio.play();
                document.getElementsByClassName("songInfo")[0].innerHTML=songNameList[(songLinkList.length-1)];
                document.getElementsByClassName("play")[0].src="img/pause.svg";
                currentPosition=(songLinkList.length-1);
            }
            else{
                currentAudio.pause(); // Stop current audio
                currentAudio=new Audio(songLinkList[i-1]);
                currentAudio.currentTime=0;
                currentAudio.play();
                document.getElementsByClassName("songInfo")[0].innerHTML=songNameList[i-1];
                document.getElementsByClassName("play")[0].src="img/pause.svg";
                currentPosition=i-1;
            }
        // }
    }
}



// display current time and duration
function time(){
    let e=document.getElementsByClassName("songTime")[0];
    let circle=document.getElementsByClassName("circle")[0];
    let a=setInterval(()=>{
    if(currentAudio && !currentAudio.paused){
            let duration=timeFormat(currentAudio.duration);
            let currentTime=timeFormat(currentAudio.currentTime);
            e.innerHTML=`${currentTime}/${duration}`;
            circle.style.left=(currentAudio.currentTime/currentAudio.duration)*100+"%";
        }

        else if(currentAudio && currentAudio.currentTime==currentAudio.duration){
            nextSong();
        }
    }, 1);

}

function timeFormat(t){
    let min=Math.floor(t/60);
    let sec=Math.floor(t%60);
    const minutes = String(min).padStart(2, '0');
    const second = String(sec).padStart(2, '0');
    return `${minutes}:${second}`;
}


    //attaching song to playControl button
function linkSong(){
    let e=document.getElementsByClassName("playControl");
    for(let i=0;i<e.length;i++)
    {
        e[i].addEventListener("click", ()=>{
            if(currentAudio!==null)
            {
                currentAudio.pause();
            currentAudio.currentTime = 0;  // Reset audio to start
            // currentAudio=null
        }
        // Create a new audio object and play it
        currentAudio = new Audio(songLinkList[i]);
        currentAudio.play();
        document.getElementsByClassName("songInfo")[0].innerHTML=songNameList[i];
        document.getElementsByClassName("play")[0].src="img/pause.svg";
        currentPosition=i;
    })
}
}

function controls(){
    if(currentAudio && !currentAudio.paused){
        
        currentAudio.pause();
        document.getElementsByClassName("play")[0].src="img/play.svg";
    }
    else if(currentAudio && currentAudio.paused){
        currentAudio.play();
        document.getElementsByClassName("play")[0].src="img/pause.svg";
    }
    else{
    }
}


async function loadSongs() {
    let response = await fetch('http://127.0.0.1:3000/songs');
    let songs = await response.text();
    let div = document.createElement("div");
    div.innerHTML = songs;
    let lis = div.getElementsByTagName("li");
    let songList=document.getElementsByClassName("libBody")[0];
    for (let i = 0; i < lis.length; i++) {
        // if(as.href.endsWith)
        let as = lis[i].getElementsByTagName("a")[0].href;
        let songName = lis[i].getElementsByTagName("a")[0].title;
        songName=songName.slice(0,(songName.length-4))
        songNameList.push(songName);
        songList.innerHTML=songList.innerHTML+`<div class="songBox">
                        <div class="songIcon">
                            <img src="img/music.svg" alt="musicJpg" class="invert">
                        </div>
                        <div class="songContent">
                            <div class="songName">${songName}</div>
                            <div class="songAuthor">Nitin Parashar</div>
                        </div>
                        <div class="playControl">
                            <div class="playText">Play Now</div>
                            <img src="img/play.svg" alt="" class="playButton invert">
                        </div>
                    </div>`
        as = as.slice(7);
        as = "http://127.0.0.1:3000" + as;
        songLinkList.push(as);
    }

}


async function main() {
    await loadSongs();
    linkSong();
    time();
    document.getElementsByClassName("bar")[0].addEventListener("click", (event)=>{
        let bar=event.target;
        let barWidth=bar.offsetWidth;
        let clickX=event.offsetX;
        let clickPer=(clickX/barWidth)*100;

        if(currentAudio)
        {
            document.getElementsByClassName("circle")[0].style.left=clickPer+"%";
            currentAudio.currentTime=clickPer*currentAudio.duration/100;
        }

    })  


    //Next Song button
    document.getElementsByClassName("next")[0].addEventListener("click", (event)=>{
        if(currentAudio)
        {

            nextSong(currentPosition);
        }
        else{
        }

    }) 
    //Prev Song button
    document.getElementsByClassName("prev")[0].addEventListener("click", (event)=>{
        if(currentAudio)
        {

            prevSong(currentPosition);
        }
        else{
        }

    }) 


    document.getElementsByClassName("cardPlay")[0].addEventListener("click", (event)=>{
        if(currentAudio)
        {
            currentAudio.pause(); // Stop current audio
            currentAudio=new Audio(songLinkList[0]);
            currentAudio.currentTime=0;
            currentAudio.play();
            document.getElementsByClassName("songInfo")[0].innerHTML=songNameList[0];
            document.getElementsByClassName("play")[0].src="img/pause.svg";
            currentPosition=0;
        }
        else{
            currentAudio=new Audio(songLinkList[0]);
            // currentAudio.currentTime=0;
            currentAudio.play();
            document.getElementsByClassName("songInfo")[0].innerHTML=songNameList[0];
            document.getElementsByClassName("play")[0].src="img/pause.svg";
            currentPosition=0;
        }

    })

    let vol="0.5";
    document.getElementsByClassName("volRange")[0].addEventListener("change", (e)=>{
        vol=(e.target.value/100);
        currentAudio.volume=vol;
        if(currentAudio.volume==0)
        {
            document.getElementsByClassName("volIcon")[0].src="img/mute.svg";
        }
        else{
            document.getElementsByClassName("volIcon")[0].src="img/volume.svg";
        }
    })
    
    
    document.getElementsByClassName("volIcon")[0].addEventListener("click", ()=>{
        if(currentAudio.volume==0)
        {
            document.getElementsByClassName("volIcon")[0].src="img/volume.svg";
            // vol=0.5
            currentAudio.volume=vol;
        }
        else
            {
            document.getElementsByClassName("volIcon")[0].src="img/mute.svg";
            currentAudio.volume=0;
            // document.getElementsByClassName("volRange")[0].target.value=0;
        }
    })
}
main();
