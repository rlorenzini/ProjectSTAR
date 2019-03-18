let database = firebase.database()
let myUserId = ''
let users = []
let savedArticles = []
let comments = []
let blogs = []
let signInUser = document.getElementById('signInUser')
let signUpUser = document.getElementById('signUpUser')
let signOut = document.getElementById('signOut')


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

database.ref("blogs")
.on("child_added",function(snapshot){
  let blog = new Blog(snapshot.key,snapshot.val().blogID,snapshot.val().title,snapshot.val().url)
  blogs.push(blog)
})

database.ref("blogs")
.on("child_removed",function(snapshot){
    blogs = blogs.filter((blog) => {
      return blog.key != snapshot.key
    })
})

database.ref("blogs")
.on("child_removed",function(snapshot){
    blogs = blogs.filter((blog) => {
      return blog.key != snapshot.key
    })
})
database.ref("comments")
.on("child_added",function(snapshot){
  let comment = new Comment(snapshot.key,snapshot.val().user,snapshot.val().article,snapshot.val().comment)
  comments.push(comment)
})

database.ref("comments")
.on("child_removed",function(snapshot){
    comments = comments.filter((comment) => {
      return comment.key != snapshot.key
    })
})

signInUser.addEventListener('click',function() {
  let emailAddress = document.getElementById('emailAddress').value
  let password = document.getElementById('password').value
  firebase.auth().signInWithEmailAndPassword(email, password).catch(function(error) {
      var errorCode = error.code;
      var errorMessage = error.message;
      })
  getUID()

})

signUpUser.addEventListener('click',function() {
  let emailAddress = document.getElementById('emailAddress').value
  let password = document.getElementById('password').value
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
        myUserId = user.uid;
        return myUserId
        } else {
        }}

function userName(emailAddress,password) {
    let usersRef = database.ref("users")
    let userRef = usersRef.push({
      name: emailAddress,
      password: password
      })
  }

function saveArticle (title,articleURL) {
  console.log(articleURL);
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
      if (article.user == getUID()) {
        return `<li>
            <a src ='${article.url}'>${article.title}</a>
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

function submitComment (blog, comment) {
  let user = getUID()
  let commentsRef = database.ref("comments")
  let commentRef = commentsRef.push({
    user: user,
    blog: blog,
    comment: comment
  })
  let commentsLI = comments.map((comment) => {
    if (comment.blog == blogID) {
      return `<li>
          ${comment.comment}
          </li>`
    } else {
    }
  })
  commentsUL.innerHTML = commentsLI.join("")
}

function addBlog (blogID,title) {
  let userID = getUID()
  let blogsRef = database.ref("blogs")
  let blogRef = blogsRef.push({
    blogID: blogID,
    title: title
  })
}

console.log("Houston");
let news = document.getElementById("news")
let Houston = "https://newsapi.org/v2/everything?q=Houston+Texas=US&sortBy=popularity&apiKey=1a6cdc031db640ff9e62b8e0e7716746"
fetch(Houston)
.then(response=>response.json())
   .then(function(json){ return json
   })
   .then (function(json){
       let newsID = json.articles.map(function(news){
         let articleTitle = JSON.stringify(news.title).replace(/&/, "&amp;").replace(/"/g, "&quot;").replace(/'/g, "&quot;")
           return `<li>
           <a href = '${news.url}'>${news.title}</a>
           <button onclick="saveArticle('${articleTitle}','${news.url}')">Save</button>
           </li>`
       })
       news.innerHTML=newsID.join("")
   })
