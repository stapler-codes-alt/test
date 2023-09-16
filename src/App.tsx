import { initializeApp } from "firebase/app";
import { onAuthStateChanged, getAuth, signInWithPopup, GoogleAuthProvider, signOut } from "firebase/auth";
import { collection, getDocs, getFirestore } from "firebase/firestore";
import { useEffect, useState } from "react";
const firebaseConfig = {
  apiKey: "AIzaSyBgqWcWDawppFxwV5Uw3SpcVNS9lbC0rJY",
  authDomain: "app1-4ac11.firebaseapp.com",
  projectId: "app1-4ac11",
  storageBucket: "app1-4ac11.appspot.com",
  messagingSenderId: "499350637297",
  appId: "1:499350637297:web:03e100e80e136a378db750",
  measurementId: "G-N2PNP751PC"
};
initializeApp(firebaseConfig)
const auth = getAuth()
function Login() {
  return <button onClick={() => {
    signInWithPopup(auth, new GoogleAuthProvider)
  }}>login</button>
}
function Home() {
  const [posts, setPosts]:any = useState([])
  const fetchPosts = async () => {
    try {
      const snapchot = await getDocs(collection(getFirestore(), "posts"))
      const data = snapchot.docs.map((doc:any) => ({
        id: doc.id,
        ...doc.data()
      }))
      setPosts(data)
    }catch (e) {
      console.error(e);
      
    }
  }
  useEffect(() => {
    fetchPosts()
  }, [])
  return <div className="posts">
    {posts.map((post:any) => <div className="post" key={post.id}>
    <div>
    <img className="profilePicture" src={post.photo} alt="" />
    <h2>{post.username}</h2>
    </div>
    <h1 className="description">{post.description}</h1>
    <a href={post.discordProfileUrl} target="_blank"><button>Contact On Discord</button></a>
  </div>)}
  </div>
}
export default function App() {
  type currentViewType = 'login' | 'main' | 'add'
  const [currentView, setCurrentView] = useState<currentViewType>('login')
  onAuthStateChanged(auth, (user) => {
    if (user) {
      setCurrentView("main")
    }else {
      setCurrentView("login")
    }
  })
  return currentView === 'login' ? <Login /> : currentView === 'main' ? <Home /> : null
}