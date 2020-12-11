// generative art brush code borrowed to represent covid is by Franks Labratory https://codepen.io/franksLaboratory/pen/xxwyGap 
// code for being able to refresh videos automatically on a loop each refresh borrowed from http://jsfiddle.net/anfnpvxy/4/ 
const canvas = document.getElementById('canvas1'); /* target canvas element w/ get element by ID & save in var canvas */
const ctx = canvas.getContext('2d'); /* constant var ctx equal to canvas get 2d; gives access to built-incanvas 2d object, i.e. drawing method */
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const edge = 67; /* will determin radius of a circle around mouse w/in which particles allowed to randomly move */
let drawing = false;
let hue = 20;

const mouse = {
    x: null,
    y: null
}

window.addEventListener('mousemove', function(event){ /* can see past event as an attribute to call back function, event listener has access to the event object by default i.e. which key was pressed and what mouse coordinates are, so just need to extract what "x" and "y" coordinate of the current mouse position and assign these values to the custom mouse object we have created */
    mouse.x = event.x; /* mouse mover event/call back function every time user moves mouse "x" will be set to event dot x & mouse y will be set to event dot y */
    mouse.y = event.y;
});

class Root {
    constructor(x, y, centerX, centerY){
        this.x = x;
        this.y = y;
        this.color = 'hsl('+ hue + ', 100%, 50%)';
        this.speedX = 0; /* can add properties on not passed to constructors attribute */
        this.speedY = 0; /* speed "x" and "y" will determin how fat the particles will move, #of pixels e/a frame */
        this.centerX = centerX;
        this.centerY = centerY;
    }
    draw(){ /* custom draw method on route class (name=draw), will calc particles current position & draw on canvas. 
    E/a frame of animation, speed "x" will add random small# */
        this.speedX += (Math.random() - 0.5) / 2;
        this.speedY += (Math.random() - 0.5) / 2; /* #can be neg. or pos. and can move left or right (randomly) */ 
        this.x += this.speedX;
        this.y += this.speedY; /* this distance will determine how big the particle is, are large in the middle of circle if the randomly wander o the 
    edge of the edge they will get smaller and smaller */

        const distanceX = this.x - this.centerX; // calculates distance between two points. Consider a cross first, we need a distance first, x, different between particls position on the x-axis and center of the circle just on the horizonal x-axis 
        const distanceY = this.y - this.centerY; /* verticle y-axis and calculate difference between the particles in Y position and center point */
        const distance = Math.sqrt(distanceX * distanceX + distanceY * distanceY); // connect these two, we get right triangle. Distance is the hypertenuse of triangle. Apply Pythagoras theorem 
        const radius = (-distance / edge + 1) * edge / 3; // divided by h variable we declared (area which paticle is allowed to move plus 1) 
    

        if (radius > 0) { // i.e. particle hasn't reached edge of area within it is allowed to move, we give its own requestanimationframe loop 
            requestAnimationFrame(this.draw.bind(this)); // just calculates particles speed position and size 
            ctx.beginPath();
            ctx.arc(this.x, this.y, radius, 0, 2 * Math.PI); // call built in canvas arc method which draws circle & expects mainly x + y coordinates + radius 
            ctx.fillStyle = this.color;
            ctx.fill();
            ctx.strokeStyle = '#440a14'; // black border around e/a particle 
            ctx.stroke();
        }
    }
}

function branchOut(){
    if (drawing === true) {
        const centerX = mouse.x; // captures x point by assigning its value of mouse dot x at the point when particles first appear, same for center y 
        const centerY = mouse.y;
        hue+=2;
        for (let i = 0; i < 6; i++){ // for loop which loops randomly, maybe 3 times 
    
            const root = new Root(mouse.x, mouse.y, centerX, centerY); // freezes values in for loop/ move ffrom center even when mouse is moving actively 
           // below, root calls on consructor and creates one new instance of object based on template made in particle class (Root) 
            root.draw();
        }
    }
}

window.addEventListener('resize', function(){
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
});

window.addEventListener('mousemove', function(){
    //ctx.fillStyle = 'rgba(255,255,255,0.03)';
    //ctx.fillRect(0, 0, canvas.width, canvas.height);
    branchOut();
});

window.addEventListener('mousedown', function(){
    drawing = true;
});

window.addEventListener('mouseup', function(){
    drawing = false;
});


 

var videoStorage = [ 
    'aisle',
    'aisle2',
    'health',
    'lot',
    'street',
    'home',
    'bars',
    'waiting',
    'mag',
    'fourthWall',
    'fifthWall'
],
    video = document.querySelector('video'),
    // choose one random url from our storage as the active video
    activeVideoUrl = videoStorage[Math.round(Math.random() * (videoStorage.length - 1))];        
        
// check which file extension your browser can play and set the video source accordingly
if(video.canPlayType('video/mp4')) {
    video.setAttribute('src', activeVideoUrl + '.mp4');
} 
    /*}
}*/




