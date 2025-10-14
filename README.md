# 🤖 Social Media Content Analyzer

An intelligent web application that uses **AI** to analyze text from uploaded documents (PDFs and images) and provides **actionable insights and content recommendations** for social media.

---

## 🚀 Live Demo  
🔗 [View the Live App](https://content-analyzer-woad.vercel.app/)  

*(Replace with your actual deployed URL)*

---

## ✨ Key Features  

- 📄 **Multi-Format File Upload**: Supports **PDF** and **image formats** (PNG, JPG, JPEG).  
- 🔍 **AI-Powered Text Extraction**:  
  - Tesseract OCR for images.  
  - PyPDF2 for text-based PDFs.  
- 📊 **In-Depth Content Analysis** (powered by **Google Gemini AI**):  
  - Content type & key themes  
  - Tone & sentiment  
  - Target audience  
  - Engagement potential  
- 💡 **Actionable Recommendations**:  
  - Platform suggestions (LinkedIn, Instagram, X, etc.)  
  - Content improvement ideas & post hooks  
  - Relevant hashtag suggestions  
  - Visual content ideas  
- 📱 **Responsive UI**: Modern, mobile-friendly design using React + Tailwind/DaisyUI + GSAP + Framer-motion.  
- 🐳 **Containerized Backend**: Flask backend with Docker for easy deployment.  

---

## 📸 Application Screenshot  
<img width="960" height="540" alt="CA1" src="https://github.com/user-attachments/assets/eaa16670-c7df-4e4b-bc57-7c24b3a07de5" />
<img width="960" height="540" alt="CA2" src="https://github.com/user-attachments/assets/e65a928c-369d-49b1-827e-5c7fac03b7a3" />
<img width="960" height="540" alt="CA3" src="https://github.com/user-attachments/assets/2984ca0a-1608-48bc-beba-31be10263876" />

---

## 🛠️ Technologies Used  

This is a **monorepo** with separate frontend & backend.  

### 🔹 Frontend (Vite + React)  
- **Framework**: React.js  
- **Build Tool**: Vite  
- **Styling**: Tailwind CSS / DaisyUI + GSAP + Framer-motion
- **API Communication**: Axios  
- **Icons**: Font Awesome  
- **Deployment**: Vercel  

### 🔹 Backend (Flask + Docker)  
- **Framework**: Flask  
- **OCR Engine**: Tesseract-OCR (via `pytesseract`)  
- **PDF Processing**: PyPDF2  
- **AI Model**: Google Gemini AI  
- **WSGI Server**: Gunicorn  
- **Containerization**: Docker  
- **Deployment**: Render  

---
## 📂 Project Structure

```bash
Content-Analyzer/
├── backend/
│   ├── app.py
│   ├── Dockerfile
│   ├── requirements.txt
│   └── ...
├── frontend/
│   ├── src/
│   ├── public/
│   ├── vite.config.js
│   └── ...
├── .gitignore
├── README.md
└── package.json
```

---
## ⚙️ Local Setup & Installation  

### ✅ Prerequisites  
- Node.js (v18 or later)  
- Python (v3.9 or later)  
- Docker Desktop installed & running  
- A **Google Gemini API Key**  

---

 1️⃣ *Clone the Repository* 

```bash
git clone https://github.com/Shreyansh2k23/Content-Analyzer.git
cd your-repo-name
```

2️⃣ *Backend Setup (Docker)*

- The backend runs inside a Docker container (no need to manually install Tesseract).

  a. **Create Environment File**  
     Inside `backend/`, create a `.env` file:  

     ```env
     GEMINI_API_KEY="YOUR_GEMINI_API_KEY_HERE"
     ```

  b. **Build & Run Container**  

     - **Build Docker image**  
       ```bash
       docker build -t social-analyzer-backend ./backend
       ```

     - **Run container (maps port 5000)**  
       ```bash
       docker run -p 5000:5000 -v ./backend:/app --env-file ./backend/.env social-analyzer-backend
       ```
- Backend API available at:
👉 http://localhost:5000

3️⃣ *Frontend Setup (React)*

  a. **Navigate to frontend**  
     ```bash
     cd frontend
     ```

  b. **Install dependencies**  
     ```bash
     npm install
     ```

  c. **Create Environment File**  
     Inside `frontend/.env.local`:  

     ```env
     VITE_API_URL="http://localhost:5000"
     ```

  d. **Run development server**  
     ```bash
     npm run dev
     ```

  - Frontend runs at:  
    👉 [http://localhost:5173](http://localhost:5173)

  ---
  
# ☁️ Deployment

- Frontend → Vercel (auto-deploys from main branch).
- Backend → Render (Docker web service).
- The Dockerfile ensures Tesseract + Python dependencies are installed for stable, memory-efficient execution.


---

# 🙏 Acknowledgements

- Tesseract OCR
- Google Gemini AI
- Flask
- Vercel& Render

👨‍💻 Created by SHREYANSH GUPTA


---
