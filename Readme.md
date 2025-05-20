# User Security Report

This is a full-stack web application built as part of an internship assignment. It visualizes user metadata (such as password aging and MFA status) in a responsive and sortable table UI.

### Live Demo:

**[https://neelmalwatkar.github.io/user-security-report](https://neelmalwatkar.github.io/user-security-report)**

---

## Tech Stack

- **Backend**: Golang (CSV reader + computed API)
- **Frontend**: React (CRA) + TailwindCSS
- **Deployment**: GitHub Pages (frontend only)

---

## Setup Instructions

### Clone and Navigate

```bash
git clone https://github.com/neelmalwatkar/user-security-report.git
cd user-security-report
```

### Run Locally

#### 1. Start the Go Backend

```bash
cd backend
go run main.go
```

Runs at `http://localhost:8080`.\
Serves /api/users with computed JSON from users.csv

#### 2. Start the React Frontend

```bash
cd frontend
npm install
npm start
```

Runs at `http://localhost:3000`.\
Proxies API calls to the Go server

## Design & Architecture Notes

- Data ingestion: User data is stored in `backend/users.csv` file. When `http://localhost:8080/api/users` is hit with a `GET` method, the Go backend parses data, computes derived fields and returns a clean JSON.

```JSON
[{
    "name": "Bennie Gallon",
    "create_date": "06/10/2024",
    "password_changed_date": "01/27/2025",
    "last_access_date": "03/20/2025",
    "mfa_enabled": true,
    "days_since_password_change": 113,
    "days_since_last_access": 61
  },
  {
    "name": "Arnaldo Davidov",
    "create_date": "02/18/2025",
    "password_changed_date": "05/26/2024",
    "last_access_date": "02/12/2025",
    "mfa_enabled": true,
    "days_since_password_change": 359,
    "days_since_last_access": 97
  }]
```

- **Frontend filtering [Bonus]**: App supports MFA filtering using a dropdown and column sorting (click on the header).
- **Responsive UI [with Bonus]**: TailwindCSS is used to build a responsive, scrollable table layout with visual cues (e.g., red/yellow highlights based on data thresholds).
- **Deployment**: For GitHub Pages deployment, the backend output is exported to userdata.json and fetched directly in production mode.
- **Tradeoff** : GitHub Pages only supports static site hosting and does not support backend servers such as Go. Therefore, the deployed version uses a pre-generated static JSON file (`public/userdata.json`) as a data source. When running the app locally, data is fetched dynamically from the Go backend at `/api/users`.

- **NOTE**: To test the app on you custom data, replace the users.csv in backend folder. However its important that the column names match.

## Testing [Bonus]:

### Frontend:

Unit tests written with React Testing Library.\
**Checks:**

- table renders
- rows appear
- filters applys

```bash
cd frontend
npm test
```

### Backend:

Unit tests written using testing module.\
**Covers:**

- CSV parsing and validation
- Computed field correctness
- API endpoint response test

```bash
cd backend
go test ./...
```
