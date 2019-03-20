service firebase.storage {
  match /b/{bucket}/o {
    match /{allPaths=**} {
      allow read, write: if request.auth != null;
    }
  }
}

var ref= firebase.database().ref("Uploads");
var storage = firebase.storage();
var pathReference = storage.ref('images/stars.jpg');
pathReference.getDownloadURL().then(function(url) {
ref.push().set({
imgurl: url
});
