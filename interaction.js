const canvas = document.getElementById('canvas1');
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
let particleSrray = [];
// for making our mouse movement known
let mouse = {
    X: null,
    y: null,
    radius: 500
}

window.addEventListener('mousemove', function(e){
    mouse.x = e.x;
    mouse.y = e.y;
    // console.log(mouse.x, mouse.y);
});

ctx.fillStyle = 'white';
ctx.font = '30px Verdana';
ctx.fillText("A", 20, 60); // text,x,y,max witdh

// ctx.strokeStyle = 'white';
// ctx.strokeRect(0,0,100,100);
const data = ctx.getImageData(0,0,100,100);

var Size = 3;
class Particle {
    constructor(x,y){
        this.x = x;
        this.y = y;
        this.size = Size;
        this.baseX = this.x;
        this.baseY = this.y;
        this.density = (Math.random() * 50) + 1;
    }

    draw_circle(){
        ctx.fillStyle = 'white';
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI *2);
        ctx.closePath();
        ctx.fill();
    }
    update(){
        let dx = mouse.x - this.x;
        let dy = mouse.y - this.y;
        let distance = Math.sqrt(dx*dx + dy*dy);
        let forceDirectX = dx / distance;
        let forceDirectY = dy / distance;
        let maxDistance = mouse.radius;
        let force = (maxDistance - distance) / maxDistance;
        let directX = forceDirectX * force * this.density;
        let directY = forceDirectY * force * this.density;
        if(distance < mouse.radius){
            // this.size = 20;
            // this.x += forceDirectX * 3;
            // this.y += forceDirectY *3;
            this.x += directX/10;
            this.y += directY/10;
        }
        else{
            if(this.x !== this.baseX){
                let dx = this.x - this.baseX;
                this.x -= dx/5;

            }
            if(this.y !== this.baseY){
                let dy = this.y - this.baseY;
                this.y -= dy/5;
            }
        }
    }
}

function init(){
    particleArray = [];
    for(let i = 0; i < 150 ; i++){
        let x = Math.random() * canvas.width;
        let y = Math.random() * canvas.height ;
        particleArray.push(new Particle(x, y));
    }
    // particleArray.push(new Particle(50, 50));
    // particleArray.push(new Particle(80, 50));
}
init();

console.log(particleArray);

function animate(){
    ctx.clearRect(0,0, canvas.width,canvas.height);
    for(let i = 0; i< particleArray.length; i++){
        particleArray[i].draw_circle();
        particleArray[i].update();
    }
    connect();
    requestAnimationFrame(animate);

}
animate();

function connect(){
    let opacity = 1;
    for(let a = 0; a < particleArray.length; a++){
        for(let b = a ; b < particleArray.length;b++){
            let dx = particleArray[a].x - particleArray[b].x;
            let dy = particleArray[a].y - particleArray[b].y;
            let distance = Math.sqrt(dx*dx + dy*dy);
            opacity = 1 - (distance/30);
            ctx.strokeStyle = 'rgba(255,255,255,'+opacity+')';
            if(distance < 30){


                ctx.lineWidth = 1;
                ctx.beginPath();
                ctx.moveTo(particleArray[a].x, particleArray[a].y);
                ctx.lineTo(particleArray[b].x, particleArray[b].y);
                ctx.stroke();
            }
        }
    }
}