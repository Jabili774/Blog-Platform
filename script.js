// Default blogs (shown on first visit)

let blogs = JSON.parse(localStorage.getItem("blogs")) || [

{
    id:1,
    title:"Getting Started with Web Development",
    author:"Admin",
    image:"https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=800",
    content:"Web development is one of the most popular skills today. Learn HTML, CSS and JavaScript to start building amazing websites.",
    likes:0,
    comments:[
        {
            name:"John",
            text:"Very useful article!"
        }
    ]
},

{
    id:2,
    title:"JavaScript Tips for Beginners",
    author:"Admin",
    image:"https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=800",
    content:"JavaScript makes your websites interactive. Practice DOM manipulation and Events daily.",
    likes:0,
    comments:[]
},

{
    id:3,
    title:"Why Learn Java?",
    author:"Admin",
    image:"https://images.unsplash.com/photo-1515879218367-8466d910aaa4?w=800",
    content:"Java is widely used in enterprise software, Android apps and backend development.",
    likes:0,
    comments:[]
}

];

localStorage.setItem("blogs", JSON.stringify(blogs));


// Home Page

function loadBlogs(){

const container=document.getElementById("blogContainer");

if(!container) return;

container.innerHTML="";

blogs=JSON.parse(localStorage.getItem("blogs"));

blogs.forEach(blog=>{

container.innerHTML+=`

<div class="blog-card">

<img src="${blog.image}" alt="">

<div class="blog-content">

<h2>${blog.title}</h2>

<p>${blog.content.substring(0,100)}...</p>

<div class="blog-info">

<span>👤 ${blog.author}</span>

<span>❤️ ${blog.likes}</span>

</div>

<div class="blog-actions">

<button class="like-btn" onclick="likeBlog(${blog.id})">
Like
</button>

<button class="delete-btn" onclick="deleteBlog(${blog.id})">
Delete
</button>

<a href="post.html?id=${blog.id}" class="read-btn">
Read More
</a>

</div>

</div>

</div>

`;

});

}

loadBlogs();


// Search

function searchBlogs(){

let input=document.getElementById("searchInput").value.toLowerCase();

let cards=document.querySelectorAll(".blog-card");

cards.forEach(card=>{

let title=card.querySelector("h2").innerText.toLowerCase();

if(title.includes(input))

card.style.display="block";

else

card.style.display="none";

});

}



// Like

function likeBlog(id){

blogs=JSON.parse(localStorage.getItem("blogs"));

let blog=blogs.find(b=>b.id===id);

blog.likes++;

localStorage.setItem("blogs",JSON.stringify(blogs));

location.reload();

}



// Delete

function deleteBlog(id){

if(confirm("Delete this blog?")){

blogs=blogs.filter(blog=>blog.id!==id);

localStorage.setItem("blogs",JSON.stringify(blogs));

location.reload();

}

}



// Create Blog

function publishBlog(){

let title=document.getElementById("title").value;

let author=document.getElementById("author").value;

let image=document.getElementById("image").value;

let content=document.getElementById("content").value;

if(title=="" || author=="" || image=="" || content==""){

alert("Please fill all fields");

return;

}

blogs=JSON.parse(localStorage.getItem("blogs"));

blogs.unshift({

id:Date.now(),

title,

author,

image,

content,

likes:0,

comments:[]

});

localStorage.setItem("blogs",JSON.stringify(blogs));

alert("Blog Published Successfully!");

window.location="index.html";

}



// View Blog

function loadPost(){

let container=document.getElementById("postContainer");

if(!container) return;

let params=new URLSearchParams(window.location.search);

let id=parseInt(params.get("id"));

blogs=JSON.parse(localStorage.getItem("blogs"));

let blog=blogs.find(b=>b.id===id);

if(!blog){

container.innerHTML="<h2>Blog Not Found</h2>";

return;

}

let commentsHTML="";

blog.comments.forEach(c=>{

commentsHTML+=`

<div class="comment">

<h4>${c.name}</h4>

<p>${c.text}</p>

</div>

`;

});

container.innerHTML=`

<div class="blog-card">

<img src="${blog.image}">

<div class="blog-content">

<h2>${blog.title}</h2>

<p>${blog.content}</p>

<br>

<button class="like-btn" onclick="likeBlog(${blog.id})">
❤️ Like (${blog.likes})
</button>

<div class="comment-box">

<h3>Comments</h3>

${commentsHTML}

<input
type="text"
id="commentName"
placeholder="Your Name"
style="width:100%;padding:10px;margin-top:15px;">

<textarea
id="commentText"
placeholder="Write Comment..."
style="margin-top:10px;"></textarea>

<button
class="submit-btn"
onclick="addComment(${blog.id})"
style="margin-top:10px;">
Post Comment
</button>

</div>

</div>

</div>

`;

}

loadPost();



// Add Comment

function addComment(id){

let name=document.getElementById("commentName").value;

let text=document.getElementById("commentText").value;

if(name=="" || text==""){

alert("Enter Name and Comment");

return;

}

blogs=JSON.parse(localStorage.getItem("blogs"));

let blog=blogs.find(b=>b.id===id);

blog.comments.push({

name:name,

text:text

});

localStorage.setItem("blogs",JSON.stringify(blogs));

location.reload();

}
