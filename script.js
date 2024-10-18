

document.addEventListener("DOMContentLoaded", function () {
// JavaScript code for search functionality and page clearing



//hamburger for responsiveness
const hamburger = document.querySelector(".hamburger");
const navMenu = document.querySelector(".nav-main ul");

    hamburger.addEventListener("click", function () {
        hamburger.classList.toggle("toggle");
        navMenu.classList.toggle("show");
    });
});


// JavaScript for bouncing balls animation
document.addEventListener('DOMContentLoaded', () => {
    const canvas = document.getElementById('bouncingBallsCanvas');
    const ctx = canvas.getContext('2d');

    // Set canvas size to match the header
    function resizeCanvas() {
        canvas.width = document.getElementById('header').clientWidth;
        canvas.height = document.getElementById('header').clientHeight;
    }
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // Ball constructor
    function Ball(x, y, radius, dx, dy, color) {
        this.x = x;
        this.y = y;
        this.radius = radius;
        this.dx = dx;
        this.dy = dy;
        this.color = color;

        this.draw = function () {
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
            ctx.fillStyle = this.color;
            ctx.fill();
            ctx.closePath();
        };

        this.update = function () {
            // Bounce off the walls
            if (this.x + this.radius > canvas.width || this.x - this.radius < 0) {
                this.dx = -this.dx;
            }
            if (this.y + this.radius > canvas.height || this.y - this.radius < 0) {
                this.dy = -this.dy;
            }

            this.x += this.dx;
            this.y += this.dy;

            this.draw();
        };
    }

    // Create random balls
    let ballsArray = [];
    function createBalls() {
        ballsArray = [];
        const numberOfBalls = 20;
        for (let i = 0; i < numberOfBalls; i++) {
            const radius = Math.random() * 15 + 5;
            const x = Math.random() * (canvas.width - radius * 2) + radius;
            const y = Math.random() * (canvas.height - radius * 2) + radius;
            const dx = (Math.random() - 0.5) * 4;
            const dy = (Math.random() - 0.5) * 4;
            const color = `hsl(${Math.random() * 360}, 100%, 50%)`;

            ballsArray.push(new Ball(x, y, radius, dx, dy, color));
        }
    }

    createBalls();

    // Animate the balls
    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        for (let i = 0; i < ballsArray.length; i++) {
            ballsArray[i].update();
        }
        requestAnimationFrame(animate);
    }
    animate();
});

////////////////////////////////////////////////////For loading Content///////////////////////////////////////
// Function to load and display posts
async function loadPosts() {
    console.log('loadPosts called');
  
    const response = await fetch('/posts'); // Assuming this endpoint returns your posts data
    const data = await response.json();
  
    console.log('Posts response:', data);
  
    if (data && Array.isArray(data.posts)) {
      const posts = data.posts;
  
      const embeddedContent = document.getElementById('embeddedContent');
      embeddedContent.innerHTML = ''; // Clear the container
  
      // Append posts to the content
      posts.forEach((post) => {
        const postElement = `
          <div id="${post.id}" class="post">
            <div class="post-details">
              <a class="post-thumb" href="${post.link}" title="${post.title}">
                <img src="${post.image.src}" alt="${post.image.alt}" class="attachment-140x140 size-140x140" width="${post.image.width}" height="${post.image.height}" decoding="async" />
              </a>
              <h2 class="title">
                <a href="${post.link}" rel="bookmark" title="Permanent Link: ${post.title}">${post.title}</a>
              </h2>
              <div class="post-std clear-block">
                <div class="post-date"><span class="ext">${post.date}</span></div>
                <div class="post-info">
                  in ${post.categories.map(cat => `<a href="" rel="tag">${cat}</a>`).join(', ')}
                </div>
              </div>
              <div class="post-content clear-block">
                ${post.content}
              </div>
            </div>
          </div>
        `;
        embeddedContent.innerHTML += postElement; // Append new posts
      });
    } else {
      console.error('Failed to load posts or posts is not an array');
    }
  }
  
  // Load posts on page load
  window.onload = async function() {
    await loadPosts(); // Load posts
  };
  
  // Handle link form submission (keep this part unchanged)
  document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('linkForm').addEventListener('submit', async (event) => {
      event.preventDefault();
      
      const linkName = document.getElementById('linkName').value.trim();
      const linkUrl = document.getElementById('linkUrl').value.trim();
  
      if (!linkName || !linkUrl) {
        console.error('Link name and URL are required.');
        return;
      }
  
      try {
        const response = await fetch('/saveLink', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ linkName, linkUrl })
        });
  
        if (response.ok) {
          const data = await response.json();
          console.log(data);
          loadLinks();
          event.target.reset();
        } else {
          const errorData = await response.json();
          console.error('Failed to save link:', errorData.message || 'Unknown error');
        }
      } catch (error) {
        console.error('Error:', error);
      }
    });
  });
  

// Dark Mode Toggle
const toggleButton = document.getElementById("darkModeToggle");
const toggleIcon = document.getElementById("toggleIcon");

if (toggleButton) {
    toggleButton.addEventListener("click", function () {
        document.body.classList.toggle("dark-mode");
        console.log('Dark mode toggled'); // Log to check if the event fires

        // Change image source depending on the current mode
        // if (document.body.classList.contains("dark-mode")) {
        //     toggleIcon.src = "https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.istockphoto.com%2Fphotos%2Fsun-emoji&psig=AOvVaw1V-TSawXOSMGOdHdQKU1Va&ust=1729314901597000&source=images&cd=vfe&opi=89978449&ved=0CBQQjRxqFwoTCPin05iWl4kDFQAAAAAdAAAAABAE"; // path to Sun

        //     toggleIcon.src = "https://www.pikpng.com/transpng/hhxwRw/"; // path to Moon
        // }
    });
}


