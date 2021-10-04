import fireBase from 'fireBase';

try {
  var config = {
    apiKey: process.env.API_KEY,
    authDomain: process.env.AUTH_DOMAIN,
    databaseURL: process.env.DATABASE_URL,
    storageBucket: process.env.STORAGE_BUCKET,
  };

  fireBase.initializeApp(config);
} catch (e) {

}

export var githubProvider = new fireBase.auth.GithubAuthProvider();
export var fireBaseRef = fireBase.database().ref();
export default fireBase;
