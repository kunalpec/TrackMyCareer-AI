# TrackMyCareer-AI

TrackMyCareer-AI is a full-stack job-tracking platform built with **React + Vite** on the frontend and **Django REST Framework** on the backend. It lets candidates manage profiles, upload resumes/profile photos, monitor job postings, and track application outcomes in one place. Real-time profile updates, recruiter views, and AI-guided insights make it a streamlined companion for the job search journey.

---

## Contributors

| SID      | Name          |
| -------- | ------------- |
| 23106021 | Paarth Sethi  |
| 23106035 | Vivek Chaubey |
| 23106047 | Daksh Kothari |
| 23106052 | Kunal         |

---

## Project Overview

- **Candidate Dashboard** – quick stats, application tracking, and shortcuts to job actions.
- **Profile Management** – upload/manage profile photo & resume with instant preview in sidebar and reader.
- **Apply & Track Jobs** – browse postings, submit applications, and monitor status changes.
- **Recruiter Portal** – post jobs, review applicants, and update candidate statuses.
- **Backend Services** – REST APIs for auth, jobs, applications, user profile media, and analytics scaffolding.
- **Responsive UI** – modern layouts with reusable components and Lucide icons for an intuitive experience.

---

## Getting Started

### Prerequisites

- Node.js 18+
- Python 3.11+
- pip / virtualenv
- Git

### 1. Clone the repository

```bash
git clone https://github.com/<your-username>/TrackMyCareer-AI.git
cd TrackMyCareer-AI
```

### 2. Backend setup

```bash
cd BackEnd
python -m venv venv
venv\Scripts\activate      # On macOS/Linux: source venv/bin/activate
pip install -r requirements.txt
python manage.py migrate
python manage.py runserver 0.0.0.0:8000
```

Key endpoints live under `http://localhost:8000/api/`, and media uploads are served from `http://localhost:8000/media/`.

### 3. Frontend setup

```bash
cd ../FrontEnd
npm install
npm run dev
```

The Vite dev server runs on `http://localhost:5173` (or `3000` if configured).

### 4. Environment variables

- Frontend: copy `.env.example` → `.env` (if provided) and set `VITE_API_BASE_URL=http://localhost:8000/api`.
- Backend: configure `.env` (optional) for database, email, etc.

---

## Development Tips

- Ensure both frontend and backend servers are running for full functionality.
- Uploaded media lives inside `BackEnd/media/`; keep it out of version control.
- Run `python manage.py createsuperuser` to access Django admin and seed data quickly.
- Use `npm run build` (frontend) and collectstatic (backend) before deployment.

---

Happy job tracking! 🚀
