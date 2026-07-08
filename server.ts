import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";

dotenv.config();

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // Initialize Gemini client lazily
  let aiClient: GoogleGenAI | null = null;
  function getAiClient() {
    if (!aiClient) {
      const apiKey = process.env.GEMINI_API_KEY;
      if (apiKey && apiKey !== "MY_GEMINI_API_KEY") {
        aiClient = new GoogleGenAI({
          apiKey: apiKey,
          httpOptions: {
            headers: {
              'User-Agent': 'aistudio-build',
            }
          }
        });
      }
    }
    return aiClient;
  }

  // API Route for Shahid's AI Assistant
  app.post("/api/chat", async (req, res) => {
    try {
      const { message, history = [] } = req.body;
      const ai = getAiClient();

      if (!ai) {
        // High quality fallback responses if the API key is not configured yet
        const msgLower = message.toLowerCase();
        let reply = "I am Shahid's AI Portfolio Assistant! Shahid Saleem is a BCA Student, Software Developer, and Open Source Enthusiast. ";
        
        if (msgLower.includes("project") || msgLower.includes("app") || msgLower.includes("game")) {
          reply += "Some of his notable projects include the Hadith Books Website, and Android apps like Raahride (an Uber-like app), Random Hadith, Push ups Count, To-Do, and Motivation apps. He also built browser games like Cricket, Badminton, Snake, Tic-Tac-Toe, and Chess!";
        } else if (msgLower.includes("contact") || msgLower.includes("email") || msgLower.includes("hire")) {
          reply += "You can contact Shahid Saleem directly via email at shahidsaleemitoo@gmail.com, or check his GitHub, LinkedIn, and Instagram links on this portfolio page!";
        } else if (msgLower.includes("skill") || msgLower.includes("language") || msgLower.includes("tech")) {
          reply += "Shahid is proficient in programming languages like C, C++, Python, JavaScript, PHP, Kotlin, HTML5, CSS3, and XML. He works with tools like Git, GitHub, Bootstrap, Firebase, and Android Studio, and understands DBMS, SQL, Data Structures, and Algorithms.";
        } else if (msgLower.includes("typing")) {
          reply += "Shahid Saleem has a professional typing speed of 50-54 WPM, which is excellent for documentation, speed-coding, and accounting tasks!";
        } else if (msgLower.includes("education")) {
          reply += "Shahid is currently pursuing a Bachelor of Computer Applications (BCA) degree. He also holds a Diploma in Data Entry Operator and a Diploma in Accounting.";
        } else {
          reply += "I'm here to answer any questions you have about his skills, education, Android applications, games, and certificates. Feel free to ask about his projects or contact information!";
        }
        return res.json({ text: reply + "\n\n*(Note: Running in local interactive mode. Connect a Gemini API Key via Secrets to enable full AI-reasoning capabilities!)*" });
      }

      const systemPrompt = `You are the exclusive AI Recruiter & Talent Assistant representing Shahid Saleem (Shahid Saleem). Your goal is to answer the user's questions about Shahid in a highly professional, friendly, and persuasive manner, convincing them why Shahid is an exceptional hire, developer, or collaborator.

Here is Shahid's comprehensive resume and profile information:
- **Full Name**: Shahid Saleem
- **Titles**: BCA Student, Software Developer, Web Developer, Android Developer, Open Source Enthusiast, Problem Solver
- **About Me**: Pursuing a Bachelor of Computer Applications (BCA). Passionate about software development, algorithms, learning modern stacks, and building scalable applications with clean code.
- **Education**: 
  - Bachelor of Computer Applications (BCA) (Animated Timeline)
  - Diploma in Data Entry Operator
  - Diploma in Accounting
- **Programming Languages**: C, C++, Python, JavaScript, PHP, Kotlin, HTML5, CSS3, XML
- **Technologies & Frameworks**: Git, GitHub, Bootstrap, Firebase, Android Studio, Responsive Web Design
- **Database Systems**: SQL, Database Management System (DBMS)
- **Technical Competencies**: Data Structures using C, Object-Oriented Programming (OOP), Algorithms, Web Development, Android Development, Computer Networks, Operating Systems, Debugging, Problem Solving
- **Professional Office Skills**: Data Entry Operator, Accounting, Tally Operator, Microsoft Office Suite, Fast Typing (50-54 WPM), Documentation, Presentation Design, Report Formatting
- **Key Projects**:
  - *Hadith Books Website*: Searchable, responsive platform with chapter navigation, multiple Hadith collections. Built with HTML, CSS, JavaScript, PHP, Bootstrap.
  - *Android Apps*: 
    - Raahride App (real-time Uber-like ride-sharing utility)
    - Random Hadith App (clean visual layout displaying quotes)
    - Push ups Count App (repetition tracker)
    - Camera App, To-Do App, Motivation App (quotes engine)
  - *Games*: Browser-based Cricket, Badminton, Guessing Number, Snake Game, Tic-Tac-Toe, Chess
  - *Web Dev Projects*: High-performance, responsive sites using modern HTML, CSS, JS, PHP, and Bootstrap
- **Soft Skills**: Fast Learner, Leadership, Communication, Teamwork, Creativity, Logical Thinking, Time Management, Discipline, Continuous Learning
- **Spoken Languages**: English, Hindi, Urdu
- **Certificates**: Diploma in Data Entry Operator, Diploma in Accounting
- **Contact Channels**: 
  - Email: shahidsaleemitoo@gmail.com (He has a 'Copy Email' button in the portfolio)
  - GitHub, LinkedIn, Instagram links are available on his site.

Be cheerful, respectful, and clear. Format your answers with clean Markdown, lists, or bolding. Keep your responses engaging but concise so recruiters get high-value information quickly. Include a friendly call to action (e.g., 'Would you like to copy Shahid's email or view his Android projects?').`;

      // Structure history correctly for the model
      const contents = [
        {
          role: "user",
          parts: [{ text: systemPrompt }]
        },
        ...history.map((msg: any) => ({
          role: msg.role === "assistant" ? "model" : "user",
          parts: [{ text: msg.content || msg.text }]
        })),
        {
          role: "user",
          parts: [{ text: message }]
        }
      ];

      const response = await ai.models.generateContent({
        model: "gemini-3.5-flash",
        contents: contents,
      });

      res.json({ text: response.text });
    } catch (error: any) {
      console.error("Gemini API error:", error);
      res.status(500).json({ error: error.message || "Failed to communicate with AI Assistant" });
    }
  });

  // Vite integration
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
    console.log("Vite development middleware integrated.");
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
    console.log("Static production assets mounted.");
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on port ${PORT}`);
  });
}

startServer();
