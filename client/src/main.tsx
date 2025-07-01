// this is the entry point of the app
// it renders the app into the root div
// it also loads the css file and js file 

import { createRoot } from "react-dom/client";
// Import the main App component (your entire React application)
import App from "./App";
// import my css styles 
import "./index.css";

// Find the root DOM element (with id="root") and render the App component into it
createRoot(document.getElementById("root")!).render(<App />);
