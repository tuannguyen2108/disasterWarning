import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.0/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.7.0/firebase-analytics.js";
import { getDatabase, ref, onValue, set } from "https://www.gstatic.com/firebasejs/10.7.0/firebase-database.js";
import { getStorage, ref as storageRef, getDownloadURL } from "https://www.gstatic.com/firebasejs/10.7.0/firebase-storage.js";

const firebaseConfig = {
  apiKey: "AIzaSyDGDe3ltJIShsj_vA6SkSdfOKGoG1ifsOg",
  authDomain: "tttn-b2a55.firebaseapp.com",
  databaseURL: "https://tttn-b2a55-default-rtdb.firebaseio.com",
  projectId: "tttn-b2a55",
  storageBucket: "tttn-b2a55.appspot.com",
  messagingSenderId: "153503281641",
  appId: "1:153503281641:web:52ff1e6eb8e5b35cf31200",
  measurementId: "G-H84P3QGT8H",
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const database = getDatabase(app);
const storage = getStorage(app);

function writeData(path, value) {
  set(ref(database, path), value);
}

function updateImage() {
  const imageRef = storageRef(storage, "data/photo.jpg");
  getDownloadURL(imageRef)
    .then(function (url) {
      document.getElementById("image").src = url;
      document.getElementById("image").style.width = "300px";
    })
    .catch(function (error) {
      console.log(error);
    });
}

onValue(ref(database, "data/thongBao"), (snapshot) => {
  document.getElementById("thongBao").innerHTML = snapshot.val();
});

onValue(ref(database, "data/doam_1"), (snapshot) => {
  document.getElementById("doam_1_percent").innerHTML = snapshot.val();
  document.getElementById("doam_1_level").innerHTML = snapshot.val() <= 40 ? "Đất khô" : "Đất ẩm";
});

onValue(ref(database, "data/doam_2"), (snapshot) => {
  document.getElementById("doam_2_percent").innerHTML = snapshot.val();
  document.getElementById("doam_2_level").innerHTML = snapshot.val() <= 40 ? "Đất khô" : "Đất ẩm";
});

onValue(ref(database, "data/mua"), (snapshot) => {
  document.getElementById("mua").innerHTML = snapshot.val();
});

onValue(ref(database, "data/gio"), (snapshot) => {
  document.getElementById("gio").innerHTML = snapshot.val() + " m/s";
});

setInterval(updateImage, 20000);
