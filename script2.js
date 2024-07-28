window.addEventListener("DOMContentLoaded", () => {
  (function () {
    var canvas = document.getElementById("canvas");
    var ctx = canvas.getContext("2d");
    var objects = []; // Array to hold circles, butterflies, and stars

    // Set canvas dimensions to match the viewport
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    // Function to generate a random number within a range
    function getRandom(min, max) {
      return Math.random() * (max - min) + min;
    }

    // Circle object definition
    function Circle(x, y, radius, dx, dy, color) {
      this.x = x;
      this.y = y;
      this.radius = radius;
      this.dx = dx;
      this.dy = dy;
      this.color = color;

      this.draw = function () {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.fillStyle = this.color;
        ctx.fill();
        ctx.closePath();
      };

      this.update = function () {
        this.y += this.dy;

        // If circle moves out of canvas, reset its position
        if (this.y > canvas.height + this.radius) {
          this.y = -this.radius;
          this.x = getRandom(this.radius, canvas.width - this.radius);
        }

        this.draw();
      };
    }

    // Butterfly object definition
    function Butterfly(x, y, size, dx, dy, color) {
      this.x = x;
      this.y = y;
      this.size = size;
      this.dx = dx;
      this.dy = dy;
      this.color = color;

      this.draw = function () {
        ctx.beginPath();
        ctx.moveTo(this.x, this.y);
        ctx.lineTo(this.x + this.size / 2, this.y - this.size);
        ctx.lineTo(this.x + this.size, this.y);
        ctx.lineTo(this.x + this.size / 2, this.y + this.size);
        ctx.closePath();
        ctx.fillStyle = this.color;
        ctx.fill();
      };

      this.update = function () {
        this.x += this.dx;
        this.y += this.dy;

        // Wrap around canvas edges
        if (this.x > canvas.width + this.size) {
          this.x = -this.size;
        } else if (this.x < -this.size) {
          this.x = canvas.width + this.size;
        }
        if (this.y > canvas.height + this.size) {
          this.y = -this.size;
        } else if (this.y < -this.size) {
          this.y = canvas.height + this.size;
        }

        this.draw();
      };
    }

    // Star object definition
    function Star(x, y, size, color, twinkleSpeed) {
      this.x = x;
      this.y = y;
      this.size = size;
      this.color = color;
      this.twinkleSpeed = twinkleSpeed;
      this.opacity = 0.5 + Math.random() * 0.5; // Random initial opacity

      this.draw = function () {
        ctx.globalAlpha = this.opacity;
        ctx.fillStyle = this.color;
        ctx.fillRect(this.x, this.y, this.size, this.size);
        ctx.globalAlpha = 1; // Reset global alpha
      };

      this.update = function () {
        // Twinkle effect
        if (Math.random() < 0.01) {
          this.opacity += this.twinkleSpeed;
          if (this.opacity > 1) {
            this.opacity = 1;
          } else if (this.opacity < 0.5) {
            this.opacity = 0.5;
          }
        }

        this.draw();
      };
    }

    // Create circles, butterflies, and stars and add to the array
    for (var i = 0; i < 100; i++) {
      var circleRadius = getRandom(5, 15);
      var circleX = getRandom(circleRadius, canvas.width - circleRadius);
      var circleY = getRandom(-canvas.height, 0);
      var circleDy = getRandom(1, 3);
      var circleColor = `rgb(${getRandom(0, 255)}, ${getRandom(
        0,
        255
      )}, ${getRandom(0, 255)})`;

      objects.push(
        new Circle(circleX, circleY, circleRadius, 0, circleDy, circleColor)
      );
    }

    for (var j = 0; j < 7; j++) {
      var butterflySize = getRandom(20, 30);
      var butterflyX = getRandom(butterflySize, canvas.width - butterflySize);
      var butterflyY = getRandom(butterflySize, canvas.height - butterflySize);
      var butterflyDx = getRandom(-2, 2);
      var butterflyDy = getRandom(-2, 2);
      var butterflyColor = `rgb(${getRandom(0, 255)}, ${getRandom(
        0,
        255
      )}, ${getRandom(0, 255)})`;

      objects.push(
        new Butterfly(
          butterflyX,
          butterflyY,
          butterflySize,
          butterflyDx,
          butterflyDy,
          butterflyColor
        )
      );
    }

    for (var k = 0; k < 200; k++) {
      var starSize = getRandom(1, 3);
      var starX = getRandom(0, canvas.width);
      var starY = getRandom(0, canvas.height);
      var starColor = "white";
      var starTwinkleSpeed = 0.01;

      objects.push(
        new Star(starX, starY, starSize, starColor, starTwinkleSpeed)
      );
    }

    // Animation loop
    function animate() {
      requestAnimationFrame(animate);
      ctx.fillStyle = "black"; // Set the background color to black
      ctx.fillRect(0, 0, canvas.width, canvas.height); // Fill the canvas with the background color

      for (var i = 0; i < objects.length; i++) {
        objects[i].update();
      }
    }

    animate(); // Start animation loop
  })();
});
