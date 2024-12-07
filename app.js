import { initializeApp } from "https://www.gstatic.com/firebasejs/11.0.2/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/11.0.2/firebase-auth.js";
import { getFirestore, addDoc, collection } from "https://www.gstatic.com/firebasejs/11.0.2/firebase-firestore.js";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCOEXnCrkz_wsxKs6-Haj4kLKebcYnkwiA",
  authDomain: "quiz-9734c.firebaseapp.com",
  databaseURL: "https://quiz-9734c-default-rtdb.firebaseio.com",
  projectId: "quiz-9734c",
  storageBucket: "quiz-9734c.appspot.com",
  messagingSenderId: "1010791954662",
  appId: "1:1010791954662:web:898db7fb8907d2a1166327",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

// Function to handle user signup
function signup(email, password) {
  createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      // User signed up successfully
      const user = userCredential.user;
      console.log("User signed up: ", user);

      // Optional: Store additional user details in Firestore
      addDoc(collection(db, "users"), {
        uid: user.uid,
        email: user.email,
        createdAt: new Date(),
      })
        .then(() => console.log("User data stored in Firestore"))
        .catch((error) => console.error("Error storing user data: ", error));

      alert("Signup successful!");
      window.location.href =    "blog.html"; // Redirect after successful signup
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.error("Error signing up: ", errorCode, errorMessage);
      alert(errorMessage); // Display the error message to the user
    });
}
document.addEventListener("DOMContentLoaded", function () {
  const signupForm = document.getElementById("signupForm");

  if (signupForm) {
    signupForm.addEventListener("submit", function (event) {
      event.preventDefault(); // Prevent form submission from reloading the page

      const name = document.getElementById("name").value.trim();
      const email = document.getElementById("email").value.trim();
      const password = document.getElementById("password").value.trim();

      // Validate email format
      const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
      if (!emailPattern.test(email)) {
        alert("Please enter a valid email address.");
        return;
      }

      // Validate password length
      if (password.length < 6) {
        alert("Password must be at least 6 characters long!");
        return;
      }

      // Call the signup function (you can replace this with your actual signup logic)
      signup(email, password);

      // After successful signup, redirect to index.html (or another page)
      // Here you can show a success message or something else before redirecting
      alert("Signup successful! Redirecting...");
      window.location.href = "index.html"; // Redirect to the index page
    });
  } else {
    console.error("Signup form not found!");
  }
});

// Example signup function
function signup( email, password) {
  // Add your signup logic here (e.g., API call, storing data, etc.)
  console.log("Signing up with email:", email, "and password:", password);
}


console.log("Firebase initialized successfully");








// Handle sign-up form submission
document.getElementById("signup-form").addEventListener("submit", async (e) => {
  e.preventDefault();

  // Get user input
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  try {
    // Create new user in Firebase
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    alert("Sign-up successful! Welcome " + userCredential.user.email);
    window.location.href = "login.html"; // Redirect to login page
  } catch (error) {
    alert("Error: " + error.message);
  }
});



document.getElementById('searchForm').addEventListener('submit', function (event) {
  event.preventDefault(); // Prevent page reload
  const query = document.getElementById('searchInput').value.trim();

  if (!query) {
    alert("Please enter a search term.");
    return;
  }

  console.log(`Searching for: ${query}`);
  // Perform your search logic here (e.g., fetch data, filter results, etc.)
  alert(`Searching for: ${query}`);
});








// Wait for the DOM to load before attaching event listeners
document.addEventListener("DOMContentLoaded", function () {
  const blogForm = document.getElementById("blogForm");
  const titleInput = document.getElementById("title");
  const contentInput = document.getElementById("content");
  const blogList = document.getElementById("blogList");

  // Function to get blogs from localStorage
  function loadBlogs() {
    const blogs = JSON.parse(localStorage.getItem("blogs")) || [];
    blogList.innerHTML = ''; // Clear the current list
    blogs.forEach(blog => {
      const blogCard = document.createElement("div");
      blogCard.classList.add("blog-card");
      blogCard.innerHTML = `
        <h3>${blog.title}</h3>
        <p>${blog.content}</p>
      `;
      blogList.appendChild(blogCard);
    });
  }

  // Save blog to localStorage
  function saveBlog(title, content) {
    const blogs = JSON.parse(localStorage.getItem("blogs")) || [];
    blogs.push({ title, content });
    localStorage.setItem("blogs", JSON.stringify(blogs));
  }

  // Handle form submission
  blogForm.addEventListener("submit", function (event) {
    event.preventDefault();

    const title = titleInput.value.trim();
    const content = contentInput.value.trim();

    if (title && content) {
      saveBlog(title, content);
      titleInput.value = "";
      contentInput.value = "";
      loadBlogs(); // Reload blogs after posting
    }
  });

  // Initial load of blogs when the page is loaded
  loadBlogs();
});





// Search blogs
async function searchBlogs() {
  const searchTerm = document.getElementById("search-bar").value.toLowerCase();
  const blogsRef = collection(db, "blogs");
  const q = query(blogsRef, where("keywords", "array-contains", searchTerm));
  
  const querySnapshot = await getDocs(q);
  const blogList = document.getElementById("blog-list");
  blogList.innerHTML = "";

  querySnapshot.forEach((doc) => {
    const blog = doc.data();
    blogList.innerHTML += `
      <div class="blog-item">
        <h2>${blog.title}</h2>
        <p>${blog.content.substring(0, 100)}...</p>
        <button onclick="viewBlog('${doc.id}')">Read More</button>
      </div>
    `;
  });
}

fetchBlogs();






// JavaScript for Popup and Form Submission
document.getElementById('submitBtn').addEventListener('click', function(event) {
  event.preventDefault(); // Prevent form submission
  
  // Get email input value
  var email = document.getElementById('emailInput').value;
  
  if (email) {
    // Show popup with thank you message
    document.getElementById('popup').style.display = 'flex';
  } else {
    alert('Please enter a valid email address!');
  }
});

// Close popup when clicking on the close button
document.getElementById('closeBtn').addEventListener('click', function() {
  document.getElementById('popup').style.display = 'none';
});


