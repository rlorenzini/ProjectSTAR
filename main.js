let database = firebase.database()
let myUserId = ''
let users = []
let savedArticles = []
let comments = []
let blogs = []
let admin = "False"
let signInUser = document.getElementById('signInUser')
let signUpUser = document.getElementById('signUpUser')
let signOut = document.getElementById('signOut')
let news = document.getElementById("news")
let submitBtn = document.getElementById("submitBtn")
let zipInput = document.getElementById("zipInput")
let zippers = 77002

document.getElementById('blogEntry').style.display = "none";

window.onload=loadData(zippers)

database.ref("articles")
.on("child_added",function(snapshot){
  let article = new Article(snapshot.key,snapshot.val().user,snapshot.val().title,snapshot.val().url)
  savedArticles.push(article)
})

database.ref("articles")
.on("child_removed",function(snapshot){
    savedArticles = savedArticles.filter((article) => {
      return article.key != snapshot.key
    })
})

database.ref("comments")
.on("child_added",function(snapshot){
  let comment = new Comment(snapshot.key,snapshot.val().user,snapshot.val().blog,snapshot.val().title,snapshot.val().comment)
  comments.push(comment)
})

database.ref("comments")
.on("child_removed",function(snapshot){
    comments = comments.filter((comment) => {
      return comment.key != snapshot.key
    })
})

database.ref("blogs")
.on("child_added",function(snapshot){
  let blog = new Blog(snapshot.key,snapshot.val().user,snapshot.val().blogID,snapshot.val().blogTitle,snapshot.val().blogImg,snapshot.val().blogContent)
  blogs.push(blog)
})

database.ref("blogs")
.on("child_removed",function(snapshot){
    blogs = blogs.filter((blog) => {
      return blog.key != snapshot.key
    })
})

signInUser.addEventListener('click',function() {
  let emailAddress = document.getElementById('signInEmailAddress').value
  let password = document.getElementById('signInPassword').value
  firebase.auth().signInWithEmailAndPassword(emailAddress, password).catch(function(error) {
    // Handle Errors here.
      var errorCode = error.code;
      var errorMessage = error.message;
      })
      // ...
  getUID()

})

signUpUser.addEventListener('click',function() {
  let emailAddress = document.getElementById('signUpEmailAddress').value
  let password = document.getElementById('signUpPassword').value
  userName(emailAddress,password)
  firebase.auth().createUserWithEmailAndPassword(emailAddress,password).catch(function(error) {
      var errorCode = error.code;
      var errorMessage = error.message;
      if (errorCode == 'auth/weak-password') {
        alert('The password is too weak.');
      } else {
        alert(errorMessage);
      }
        console.log(error);
      })
})

signOut.addEventListener('click',function(){
  firebase.auth().signOut().then(function() {
    location.reload().then(function(){}).catch(function(error) {
  });
})
})

firebase.auth().onAuthStateChanged(function(user) {
    window.user = user;
    })

function getUID() {
    var user = firebase.auth().currentUser;
    var name, email, photoUrl, uid, emailVerified;

    if (user != null) {
      if (user.uid == "78I5hgvWUzVGLpfNUOzEOyTlH8F3") {
        admin = "True"
        blogEntry()
        return user.uid
      } else {
      return user.uid
      }
}
}

function userName(emailAddress,password) {
    let usersRef = database.ref("users")
    let userRef = usersRef.push({
      name: emailAddress,
      password: password
      })
  }

function saveArticle (title,articleURL) {
  let userID = getUID()
  let articlesRef = database.ref("articles")
  let articleRef = articlesRef.push({
    user: userID,
    url: articleURL,
    title: title
  })
}

function getSavedArticles() {
    let articlesLI = savedArticles.map((article) => {
      let articleString = `${article.title}`;
      let articleTitle = articleString.substring(1, articleString.length-1);
      if (article.user == getUID()) {
        return `<li>
            <a href ='${article.url}'>${article.title}</a>
            <button onclick="deleteArticle('${article.key}')">Delete</button>
            </li>`
      } else {
      }
    })
    articlesUL.innerHTML = articlesLI.join("")
  }

function deleteArticle(articleKey) {
  database.ref("articles").child(articleKey).remove()
  getSavedArticles()
}

function submitComment (blog, title, comment) {
  let userID = getUID()
  let commentsRef = database.ref("comments")
  let commentRef = commentsRef.push({
    user: userID,
    blog: blog,
    title: title,
    comment: comment
  })
  let commentsLI = comments.map((comment) => {
    if (comment.blog == blog) {
      return `<li>
          ${comment.comment}
          </li>`
    } else {
    }
  })
  document.getElementById(blog).getElementsByClassName('comments')[0].innerHTML = commentsLI.join("")
}

function getComments() {
database.ref("comments")
.on("value",function(snapshot){
      let comment = new Comment(snapshot.key,snapshot.val().user,snapshot.val().blog,snapshot.val().title,snapshot.val().comment)
      comments.push(comment)
});
setTimeout(function(){
  displayComments()
}, 3000);
}

function displayComments() {
  let elements = document.getElementsByClassName("title")
    for (var i = 0; i < elements.length; i++) {
      let blog = elements[i].parentNode.id
      let commentsLI = comments.map((comment) => {
        if (comment.blog == blog) {
          return `<li>
                ${comment.comment}
                </li>`
      } else {
      }
    })
    document.getElementById(blog).getElementsByClassName('comments')[0].innerHTML = commentsLI.join("")
  }
}

submitBtn.addEventListener("click",function(){
   zippers= zipInput.value
   loadData(zippers)
})

function loadData(zippers){
let localWeather= `https://api.openweathermap.org/data/2.5/weather?zip=${zippers}&units=imperial&apiKey=5c532f33d76a318783dd01c47721de8e`
fetch(localWeather)
.then(response=>response.json())
    .then(weatherItems=>{
    let sunset = new Date(weatherItems.sys.sunset*1000)
    let sunrise = new Date(weatherItems.sys.sunrise*1000)
    let windDirection = getDirection(weatherItems.wind.deg)

let weatherBug = `
<h3> Weather from ${weatherItems.name}:</h3>
<h4> Current Temperature: ${weatherItems.main.temp} Deg</h4>
<h4> Wind Speed : ${weatherItems.wind.speed} Mph;    Direction: ${windDirection}</h4>
<h4> Sunrise: ${sunrise.toLocaleTimeString()} Sunset: ${sunset.toLocaleTimeString()}</h4>
<image id= "icon" src= http://openweathermap.org/img/w/${weatherItems.weather[0].icon}.png>
`
weather.innerHTML=weatherBug

let localNews= `https://gnews.io/api/v2/?q=${weatherItems.name}&token=114071df888d1c4880c2bff07c8ffc33`
fetch(localNews)
.then(response=>response.json())
.then(function(json){ return json
})
.then (function(newsItems){
let newsID = newsItems.articles.map(function(news){
    if (news.image ==""){
        return `
        <li>
        <a href = ${news.link}>${news.title}</a></li>
        <button onclick="saveArticle('${news.title}','${news.link}')">Save</button>
        `}
    else {
    return `
    <li>
    <img class= "round-image" src = ${news.image}>
    <a href = ${news.link}>${news.title}</a></li>
    <button onclick="saveArticle('${news.title}','${news.link}')">Save</button>
          `
    }
})
news.innerHTML=newsID.join("")
})
})
}

function blogEntry () {
  if (admin == "True") {
    document.getElementById('blogEntry').style.display = "block";
    let form = document.createElement("form")
    form.setAttribute('method',"post")
    // form.setAttribute('action',"submit.php");

    let title = document.createElement("input")
    title.setAttribute('type',"text")
    title.setAttribute('id', "titleEntry")
    title.setAttribute('placeholder',"Title")

    let image = document.createElement("input")
    image.setAttribute('type',"file")
    image.setAttribute('id', "imageEntry")

    let content = document.createElement("textarea")
    content.setAttribute('cols',"35")
    content.setAttribute('rows',"5")
    content.setAttribute('id',"contentEntry")

    let blogEntryBtn = document.createElement("button")
    blogEntryBtn.setAttribute('id',"blogEntryBtn")
    blogEntryBtn.setAttribute('type',"button")
    blogEntryBtn.innerHTML = "Submit"

    form.appendChild(title)
    form.appendChild(image)
    form.appendChild(content)
    form.appendChild(blogEntryBtn)

    document.getElementById('blogEntry').appendChild(form);

    blogEntryBtn.addEventListener("click",function(){
    let userID = getUID()
    let titleEntry = document.getElementById('titleEntry').value
    let imageEntry = document.getElementById('imageEntry').value
    let contentEntry = document.getElementById('contentEntry').value
    let blogsRef = database.ref("blogs")
    console.log(titleEntry);
    let blogRef = blogsRef.push({
      user: userID,
      blogID: "blog3",
      blogTitle: titleEntry,
      blogImg: imageEntry,
      blogContent: contentEntry
    })
    })
  }
}

function getBlogs() {
database.ref("blogs")
.on("value",function(snapshot){
      let blog = new Blog(snapshot.key,snapshot.val().user,snapshot.val().blogID,snapshot.val().blogTitle,snapshot.val().blogImg,snapshot.val().blogContent)
      blogs.push(blog)
});
setTimeout(function(){
  displayBlogs()
}, 3000);
}

function displayBlogs() {
      let blogsLI = blogs.map((blog) => {
        console.log(blogs);
        if (blog.blogTitle != null) {
          return `<li>
                <h3>${blog.blogTitle}</h3>
                <img src = '${blog.blogImg}' />
                <p>${blog.content}
                </li>`
        }
    })
    document.getElementById('blog').innerHTML = blogsLI.join("")
  }














function getDirection(angle) {
   let directions = ['North', 'North-East', 'East', 'South-East', 'South', 'South-West', 'West', 'North-West'];
   return directions[Math.round(((angle %= 360) < 0 ? angle + 360 : angle) / 45) % 8];
}

getBlogs()
getComments()
getUID()
