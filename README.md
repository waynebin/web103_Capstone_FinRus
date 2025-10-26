# web103_Capstone_FinRus
Used to collaborate with team members to complete the web3 capstone

## Project Structure

```
web103_Capstone_FinRus/
├── client/              # Frontend application
│   ├── src/            # Source files for client-side code
│   └── public/         # Static assets
├── server/              # Backend application
│   ├── routes/         # API route definitions
│   ├── models/         # Database models
│   └── controllers/    # Business logic controllers
├── database/            # Database scripts and migrations
├── docs/                # Project documentation
├── tests/               # Test files
├── requirements.txt     # Python dependencies
└── README.md
```

## Setup Instructions

### Prerequisites
- Python 3.8+
- Node.js 14+
- PostgreSQL (optional, for production database)

### Installation

1. Clone the repository:
```bash
git clone https://github.com/waynebin/web103_Capstone_FinRus.git
cd web103_Capstone_FinRus
```

2. Install Python dependencies:
```bash
pip install -r requirements.txt
```

3. Set up environment variables:
Create a `.env` file in the root directory with necessary configuration.

## Dependencies

See `requirements.txt` for the complete list of Python packages:
- Flask: Web framework
- SQLAlchemy: Database ORM
- Flask-JWT-Extended: Authentication
- And more...

## Contributing

Team members can create feature branches and submit pull requests for review.
