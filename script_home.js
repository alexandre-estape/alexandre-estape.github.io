/* Dark Mode Button */

const interaccion = document.getElementById('interaction');
const MyName = document.getElementById('Name');
const MyPresentation = document.getElementById('Presentation');
const darkModeButton = document.getElementById('dark-mode-btn');
const body = document.body;

interaccion.addEventListener('click', () => { // Interaction button
    interaccion.classList.toggle('interac');
});

let col_background = 20; // Color of background
let col_part = 255; // Color of particles
let col_close = 255; // Color of edges when particles are close
let col_far = 0; // Color of edges when particles are far

body.classList.toggle('dark-mode'); // Initial toggle

function toggleDarkMode() { 

    body.classList.toggle('dark-mode');
    MyName.classList.toggle("dark-mode");
    MyPresentation.classList.toggle("dark-mode");
}

darkModeButton.addEventListener('click', () => { // Dark Mode button

    toggleDarkMode();

    if (body.classList.contains('dark-mode')) {

        col_background = 20;
        col_part = 200;
        col_close = 255;
        col_far = 0;

    } else {

        col_background = 255;
        col_part = 20;
        col_close = 0;
        col_far = 255;
    }
});


/* Particles in Home Background */


const numParticles = 10;
const particles = [];

function setup() {

    createCanvas(windowWidth, windowHeight);
    for (let i = 0; i < numParticles; i++) {
        particles.push(new Particle())
    }
}

function draw() {

    background(col_background);

    particles.forEach((particle, index) => {
        particle.update();
        particle.drawParticle();
        particle.drawLines(particles.slice(index))

    })
}

class Particle {

    constructor() {
        this.position = createVector(random(windowWidth), random(windowHeight))
        this.velocity = createVector(random(-1, 1), random(-1, 1))
        this.acceleration = createVector();
    }

    update() {

        if (interaccion.classList.contains('interac')){
            this.detectMouseInteraction();
        }

        this.position.add(this.velocity)
        this.detectEdges();
    }

    detectMouseInteraction() {

        let mouse = createVector(mouseX, mouseY)
        let direction = mouse.sub(this.position)
        let distance = direction.mag();

        if (distance < 100) {
            direction.normalize();
            direction.mult(0.5);
            this.acceleration = direction;
            this.velocity.add(this.acceleration)
            this.velocity.limit(1.5)
        }

    }

    detectEdges() {
        if (this.position.x < 0 || this.position.x > windowWidth) {
            this.velocity.x *= -1
        }
        if (this.position.y < 0 || this.position.y > windowHeight) {
            this.velocity.y *= -1
        }
    }

    drawLines(particles) {
        particles.forEach(particle => {
            let distance = dist(this.position.x, this.position.y, particle.position.x, particle.position.y);

            const maxDistance = 200;

            if (distance < maxDistance) {
                
                if (col_background == 20){
                    let alpha = map(distance, 0, maxDistance, col_close, col_far);
                    stroke(col_close, alpha);
                    line(this.position.x, this.position.y, particle.position.x, particle.position.y);
                }
                else{
                    let alpha = map(distance, 0, maxDistance, col_far, col_close);
                    stroke(col_close, alpha);
                    line(this.position.x, this.position.y, particle.position.x, particle.position.y);
                }
                
            }
        })
    }


    drawParticle() {
        fill(col_part)
        noStroke();
        ellipse(this.position.x, this.position.y, 5)
    }

}