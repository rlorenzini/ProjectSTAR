class Article {
  constructor(key,user, title,url) {
    this.key = key
    this.user = user
    this.title = title
    this.url = url
  }
}

class Comment {
  constructor(key,user,blog,comment) {
  this.key = key
  this.user = user
  this.blog = blog
  this.comment = comment
  }
}

class Blog {
  constructor(key,blogID,title,url) {
  this.key = key
  this.blogID = blogID
  this.title = title
  this.url = url
}
}
