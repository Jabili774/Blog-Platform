// Load blogs from localStorage or create default blogs only once

let blogs = JSON.parse(localStorage.getItem("blogs"));

if (!blogs) {
    blogs = [
        {
            id: 1,
            title: "Getting Started with Web Development",
            author: "Admin",
            image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=800",
            content: "Web development is one of the most popular skills today. Learn HTML, CSS and JavaScript to start building amazing websites.",
            likes: 0,
            comments: [
                {
                    name: "John",
                    text: "Very useful article!"
                }
            ]
        },
        {
            id: 2,
            title: "JavaScript Tips for Beginners",
            author: "Admin",
            image: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=800",
            content: "JavaScript makes websites interactive. Practice DOM manipulation and Events daily.",
            likes: 0,
            comments: []
        },
        {
            id: 3,
            title: "Why Learn Java?",
            author: "Admin",
            image: "https://images.unsplash.com/photo-1515879218367-8466d910aaa4?w=800",
            content: "Java is widely used in enterprise applications, backend development and Android.",
            likes: 0,
            comments: []
        }
    ];

    localStorage.setItem("blogs", JSON.stringify(blogs));
}

// ---------------- HOME PAGE ----------------

function loadBlogs() {

    const container = document.getElementById("blogContainer");

    if (!container) return;

    blogs = JSON.parse(localStorage.getItem("blogs")) || [];

    container.innerHTML = "";

    blogs.forEach(blog => {

        container.innerHTML += `
        <div class="blog-card">

            <img src="${blog.image}" alt="${blog.title}">

            <div class="blog-content">

                <h2>${blog.title}</h2>

                <p>${blog.content.substring(0,120)}...</p>

                <div class="blog-info">
                    <span>👤 ${blog.author}</span>
                    <span>❤️ ${blog.likes}</span>
                </div>

                <div class="blog-actions">

                    <button class="like-btn"
                    onclick="likeBlog(${blog.id})">
                    Like
                    </button>

                    <button class="delete-btn"
                    onclick="deleteBlog(${blog.id})">
                    Delete
                    </button>

                    <a class="read-btn"
                    href="post.html?id=${blog.id}">
                    Read More
                    </a>

                </div>

            </div>

        </div>
        `;
    });

}

loadBlogs();

// ---------------- SEARCH ----------------

function searchBlogs() {

    const input = document.getElementById("searchInput");

    if (!input) return;

    const value = input.value.toLowerCase();

    const cards = document.querySelectorAll(".blog-card");

    cards.forEach(card => {

        const title = card.querySelector("h2").innerText.toLowerCase();

        card.style.display =
            title.includes(value) ? "block" : "none";

    });

}

// ---------------- LIKE ----------------

function likeBlog(id) {

    blogs = JSON.parse(localStorage.getItem("blogs")) || [];

    const blog = blogs.find(b => b.id === id);

    if (blog) {

        blog.likes++;

        localStorage.setItem("blogs", JSON.stringify(blogs));

        location.reload();

    }

}

// ---------------- DELETE ----------------

function deleteBlog(id) {

    if (!confirm("Delete this blog?")) return;

    blogs = JSON.parse(localStorage.getItem("blogs")) || [];

    blogs = blogs.filter(blog => blog.id !== id);

    localStorage.setItem("blogs", JSON.stringify(blogs));

    location.reload();

}

// ---------------- CREATE BLOG ----------------

function publishBlog() {

    const title = document.getElementById("title").value.trim();
    const author = document.getElementById("author").value.trim();
    const image = document.getElementById("image").value.trim();
    const content = document.getElementById("content").value.trim();

    if (!title || !author || !image || !content) {

        alert("Please fill all fields");

        return;

    }

    blogs = JSON.parse(localStorage.getItem("blogs")) || [];

    blogs.unshift({

        id: Date.now(),

        title,

        author,

        image,

        content,

        likes: 0,

        comments: []

    });

    localStorage.setItem("blogs", JSON.stringify(blogs));

    alert("Blog Published Successfully!");

    window.location.href = "index.html";

}

// ---------------- VIEW BLOG ----------------

function loadPost() {

    const container = document.getElementById("postContainer");

    if (!container) return;

    const params = new URLSearchParams(window.location.search);

    const id = Number(params.get("id"));

    blogs = JSON.parse(localStorage.getItem("blogs")) || [];

    const blog = blogs.find(b => b.id === id);

    if (!blog) {

        container.innerHTML = "<h2>Blog Not Found</h2>";

        return;

    }

    let comments = "";

    blog.comments.forEach(comment => {

        comments += `
        <div class="comment">
            <h4>${comment.name}</h4>
            <p>${comment.text}</p>
        </div>
        `;

    });

    container.innerHTML = `

    <div class="blog-card">

        <img src="${blog.image}">

        <div class="blog-content">

            <h2>${blog.title}</h2>

            <p>${blog.content}</p>

            <br>

            <button class="like-btn"
            onclick="likeBlog(${blog.id})">

            ❤️ Like (${blog.likes})

            </button>

            <div class="comment-box">

                <h3>Comments</h3>

                ${comments}

                <input
                type="text"
                id="commentName"
                placeholder="Your Name"
                style="width:100%;padding:10px;margin-top:15px;">

                <textarea
                id="commentText"
                placeholder="Write your comment..."
                rows="4"
                style="margin-top:10px;width:100%;"></textarea>

                <button
                class="submit-btn"
                style="margin-top:10px;"
                onclick="addComment(${blog.id})">

                Post Comment

                </button>

            </div>

        </div>

    </div>

    `;

}

loadPost();

// ---------------- COMMENTS ----------------

function addComment(id) {

    const name = document.getElementById("commentName").value.trim();

    const text = document.getElementById("commentText").value.trim();

    if (!name || !text) {

        alert("Please enter your name and comment.");

        return;

    }

    blogs = JSON.parse(localStorage.getItem("blogs")) || [];

    const blog = blogs.find(b => b.id === id);

    if (!blog) return;

    blog.comments.push({

        name,

        text

    });

    localStorage.setItem("blogs", JSON.stringify(blogs));

    location.reload();

}
