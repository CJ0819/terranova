# TerraNova Mining

A full-stack web application for a mining company. Features a public-facing company website with a careers portal and a protected admin dashboard for managing job postings, applications, and contact messages.

---

## Tech Stack

**Frontend**
- React 19 + Vite
- Tailwind CSS v4
- React Router DOM
- Axios
- React Hot Toast

**Backend**
- Django 5 + Django REST Framework
- PostgreSQL
- JWT Authentication (djangorestframework-simplejwt)
- Cloudinary (resume file storage)
- Django CORS Headers

---

## Features

### Public Website
- **Home** — Hero section with mining background, company stats, services overview and careers CTA
- **About** — Company story, core values, milestone timeline and leadership team
- **Services** — Full breakdown of mining operations and capabilities
- **Careers** — Live job listings with department and job type filters
- **Job Detail** — Full job description with an application form including Word document resume upload
- **Contact** — Contact form that saves messages to the database

### Admin Dashboard (Protected)
- JWT-based login
- Dashboard with live stats (jobs, applications, pending reviews)
- **Jobs** — Create, edit, and delete job postings with full details
- **Applications** — View all applications, update status (pending → reviewing → shortlisted → rejected → hired), download resumes, delete applications
- **Messages** — View and delete contact form submissions


---

## Getting Started

### Prerequisites
- Python 3.12+
- Node.js 18+
- PostgreSQL
- A Cloudinary account (free)

---

### Backend Setup

**1. Clone the repository**
```bash
git clone https://github.com/CJ0819/terranova.git
cd terranova/backend
```

**2. Create and activate virtual environment**
```bash
python3 -m venv venv
source venv/bin/activate        # Mac/Linux
venv\Scripts\activate           # Windows
```

**3. Install dependencies**
```bash
pip3 install django djangorestframework djangorestframework-simplejwt psycopg2-binary django-cors-headers cloudinary django-cloudinary-storage pillow python-dotenv requests
```

**4. Create PostgreSQL database**
```sql
CREATE DATABASE terranova_db;
CREATE USER terranova_user WITH PASSWORD 'yourchosenpassword';
GRANT ALL PRIVILEGES ON DATABASE terranova_db TO terranova_user;
```

**5. Create `.env` file in `backend/`**
```
SECRET_KEY=your-secret-key-here
DB_NAME=terranova_db
DB_USER=terranova_user
DB_PASSWORD=yourpassword
DB_HOST=localhost
DB_PORT=5432
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
```

**6. Run migrations and create superuser**
```bash
python3 manage.py makemigrations
python3 manage.py migrate
python3 manage.py createsuperuser
```

**7. Start the backend server**
```bash
python3 manage.py runserver
```

Backend runs at: `http://localhost:8000`

---

### Frontend Setup

**1. Navigate to frontend folder**
```bash
cd ../frontend
```

**2. Install dependencies**
```bash
npm install
```

**3. Start the development server**
```bash
npm run dev
```

Frontend runs at: `http://localhost:5173`

---

## Usage

### Public Website
Visit `http://localhost:5173` to view the public website.

### Admin Dashboard
Visit `http://localhost:5173/admin/login` and log in with your superuser credentials.

### Django Admin
Visit `http://localhost:8000/django-admin/` to manage data directly.


---

## Deployment

- **Backend** — Deploy to [Railway](https://railway.app) or [Render](https://render.com)
- **Frontend** — Deploy to [Vercel](https://vercel.com)
- **Database** — Use Railway PostgreSQL or Render PostgreSQL
- **File Storage** — Cloudinary (already configured)

---

## License

This project is for portfolio and educational purposes.
