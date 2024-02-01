// heart background
const bgHeart = document.querySelector('.bg_heart');

const love = setInterval(() => {
  const rNum = Math.floor(Math.random() * 40) + 1;
  const rSize = Math.floor(Math.random() * 65) + 10;
  const rLeft = Math.floor(Math.random() * 100) + 1;
  const rBg = Math.floor(Math.random() * 25) + 100;
  const rTime = Math.floor(Math.random() * 5) + 5;

  const heart1 = createHeart(rSize, rLeft, rBg, rTime);
  const heart2 = createHeart(rSize - 10, rLeft + rNum, rBg + 25, rTime + 5);

  bgHeart.appendChild(heart1);
  bgHeart.appendChild(heart2);

  document.querySelectorAll('.heart').forEach(heart => {
    const top = parseFloat(getComputedStyle(heart).top);
    const width = parseFloat(getComputedStyle(heart).width);

    if (top <= -100 || width >= 150) {
      heart.remove();
    }
  });
}, 500);

function createHeart(size, left, bg, time) {
  const heart = document.createElement('div');
  heart.className = 'heart';
  heart.style.width = `${size}px`;
  heart.style.height = `${size}px`;
  heart.style.left = `${left}%`;
  heart.style.background = `rgba(255, ${bg - 25}, ${bg}, 1)`;
  heart.style.animation = `love ${time}s ease`;

  return heart;
}
//No button
const noBtn = document.getElementById('no');
const yesBtn = document.getElementById('yes');
const container = document.querySelector('.gif-container');
const heyH1 = document.querySelector('.hey-h1');
const iframe = document.querySelector('.gif-container iframe');
const backgroundMusic = document.getElementById('backgroundMusic');
const backgroundMusic2 = document.getElementById('backgroundMusic2');



noBtn.addEventListener('click', function () {

    const windowWidth = window.innerWidth;
    const windowHeight = window.innerHeight;

    const containerRect = container.getBoundingClientRect();

    let randomLeft = Math.floor(Math.random() * (windowWidth - noBtn.clientWidth));
    let randomTop = Math.floor(Math.random() * (windowHeight - noBtn.clientHeight));

    while (
        randomLeft > containerRect.left &&
        randomLeft < containerRect.right &&
        randomTop > containerRect.top &&
        randomTop < containerRect.bottom
    ) {
        randomLeft = Math.floor(Math.random() * (windowWidth - noBtn.clientWidth));
        randomTop = Math.floor(Math.random() * (windowHeight - noBtn.clientHeight));
    }

    noBtn.style.left = randomLeft + 'px';
    noBtn.style.top = randomTop + 'px';

    //change h1 text content
    heyH1.innerHTML = "For real ? <br> If you manage to press it i'll accept it.";
    iframe.src = "https://giphy.com/embed/SRIHYMUPizTO4SLX4x";
    backgroundMusic2.pause();
    backgroundMusic.play();
});

yesBtn.addEventListener('click' , function(){
    confetti();
    heyH1.innerHTML = " Yessss , be ready by 20:30 , <br> See you on the 14th Babygirlll ";
    iframe.src = "https://giphy.com/embed/3oz8xsaLjLVqVXr3tS";
    noBtn.style.display = 'none';
    if(window.innerWidth > 600){
        yesBtn.style.right = '47%';
    }else{
        yesBtn.style.right = '38%';

    }
    backgroundMusic.pause();
    backgroundMusic2.play();
});
function confetti(){
    let W = window.innerWidth;
    let H = document.getElementById('confetti').clientHeight;
    const canvas = document.getElementById('confetti');
    const context = canvas.getContext("2d");
    const maxConfettis = 10000  ;
    const particles = [];

    const possibleColors = [
    "#9A031E",
    "#5F0F40",
    "#FF004D",
    "#DC8686",
    "#872341",
    "#DA0C81",
    "#940B92"
    ];

    function randomFromTo(from, to) {
    return Math.floor(Math.random() * (to - from + 1) + from);
    }

    function confettiParticle() {
    this.x = Math.random() * W; // x
    this.y = Math.random() * H - H; // y
    this.r = randomFromTo(11, 33); // radius
    this.d = Math.random() * maxConfettis + 11;
    this.color =
        possibleColors[Math.floor(Math.random() * possibleColors.length)];
    this.tilt = Math.floor(Math.random() * 33) - 11;
    this.tiltAngleIncremental = Math.random() * 0.07 + 0.05;
    this.tiltAngle = 0;

    this.draw = function() {
        context.beginPath();
        context.lineWidth = this.r / 2;
        context.strokeStyle = this.color;
        context.moveTo(this.x + this.tilt + this.r / 3, this.y);
        context.lineTo(this.x + this.tilt, this.y + this.tilt + this.r / 5);
        return context.stroke();
    };
    }

    function Draw() {
    const results = [];

    // Magical recursive functional love
    requestAnimationFrame(Draw);

    context.clearRect(0, 0, W, window.innerHeight);

    for (var i = 0; i < maxConfettis; i++) {
        results.push(particles[i].draw());
    }

    let particle = {};
    let remainingFlakes = 0;
    for (var i = 0; i < maxConfettis; i++) {
        particle = particles[i];

        particle.tiltAngle += particle.tiltAngleIncremental;
        particle.y += (Math.cos(particle.d) + 3 + particle.r / 2) / 2;
        particle.tilt = Math.sin(particle.tiltAngle - i / 3) * 15;

        if (particle.y <= H) remainingFlakes++;
    }

    return results;
    }

    window.addEventListener(
    "resize",
    function() {
        W = window.innerWidth;
        H = window.innerHeight;
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    },
    false
    );

    // Push new confetti objects to `particles[]`
    for (var i = 0; i < maxConfettis; i++) {
    particles.push(new confettiParticle());
    }

    // Initialize
    canvas.width = W;
    canvas.height = H;
    Draw();
}