# FitLife Platform — Design Document
**Version:** 1.0  
**Date:** [Insert Date]  
**Author:** [Your Name]  
**Audience:** Technical team and FitLife stakeholders

---

## 1. Project Overview

### 1.1 Purpose
This design document describes the architecture, data design, interface design, and algorithm design for the FitLife health and fitness platform. It serves as the primary technical reference for the development team.

### 1.2 Scope
The platform provides:
- User registration and authentication with free/premium membership tiers
- Workout logging and history tracking
- Health metric calculations (BMI, BMR, calorie tracking)
- Personalised workout plan generation
- API-integrated exercise video content
- Admin dashboard for user management

### 1.3 Technologies
| Layer | Technology | Justification |
|-------|-----------|---------------|
| Front-end | HTML5, CSS3, JavaScript (ES6+) | Universal browser support; no framework overhead for this scale |
| Back-end | PHP 8.1 | Server-side scripting; strong OOP support; wide hosting availability |
| Database | MySQL 8.0 | Relational data model fits our structured entity relationships; ACID compliance |
| Server | Apache 2.4 | .htaccess support for URL rewriting; widely available |

---

## 2. Architecture — MVC Pattern

```
fitlife/
├── index.php               ← Router (maps URLs to controllers)
├── app/
│   ├── Models/
│   │   ├── Database.php    ← PDO singleton
│   │   ├── User.php
│   │   ├── Workout.php
│   │   └── HealthMetric.php
│   ├── Controllers/
│   │   ├── AuthController.php
│   │   ├── WorkoutController.php
│   │   ├── DashboardController.php
│   │   └── AdminController.php
│   └── Views/
│       ├── layout/
│       ├── auth/
│       ├── workouts/
│       └── dashboard/
├── public/
│   ├── css/
│   ├── js/
│   └── img/
└── config/
    └── database.php        ← NOT committed to version control
```

**Justification:** MVC separates concerns — Models handle only database operations, Controllers handle only business logic, Views handle only presentation. This makes the codebase maintainable by a third party and enables unit testing of each layer independently.

---

## 3. Database Design

### 3.1 Entity Relationship Diagram
See `erd-diagram.png` in the `/docs` folder.

### 3.2 Data Dictionary — Users Table

| Column | Data Type | Size | Constraints | Example |
|--------|-----------|------|-------------|---------|
| user_id | INT | - | PK, AUTO_INCREMENT, NOT NULL | 1 |
| email | VARCHAR | 255 | UNIQUE, NOT NULL | user@example.com |
| password_hash | VARCHAR | 255 | NOT NULL | $2y$12$... |
| first_name | VARCHAR | 50 | NOT NULL | Jane |
| last_name | VARCHAR | 50 | NOT NULL | Smith |
| membership | ENUM | - | DEFAULT 'free' | premium |
| height_cm | DECIMAL | 5,1 | NULL allowed | 165.5 |
| weight_kg | DECIMAL | 5,1 | NULL allowed | 68.0 |
| created_at | TIMESTAMP | - | DEFAULT CURRENT_TIMESTAMP | 2025-01-01 09:00:00 |

### 3.3 Normalisation
The schema is in **3rd Normal Form (3NF)**:
- **1NF:** All columns contain atomic values; no repeating groups
- **2NF:** All non-key attributes depend on the whole primary key
- **3NF:** No transitive dependencies — workout type data (MET values) is separated into `workout_types` table rather than stored redundantly in each workout row

---

## 4. Algorithm Design

### 4.1 BMI Calculation Algorithm

```
FUNCTION calculateBMI(height_cm, weight_kg)
  INPUT: height_cm (DECIMAL), weight_kg (DECIMAL)
  OUTPUT: bmi (DECIMAL), classification (STRING)

  // Input validation
  IF height_cm <= 0 OR height_cm > 300 THEN
    RETURN ERROR "Invalid height value"
  END IF

  IF weight_kg <= 0 OR weight_kg > 700 THEN
    RETURN ERROR "Invalid weight value"
  END IF

  // Convert height to metres
  height_m ← height_cm / 100

  // Calculate BMI
  bmi ← weight_kg / (height_m ^ 2)
  bmi ← ROUND(bmi, 1)

  // WHO classification
  IF bmi < 18.5 THEN
    classification ← "Underweight"
  ELSE IF bmi < 25.0 THEN
    classification ← "Normal weight"
  ELSE IF bmi < 30.0 THEN
    classification ← "Overweight"
  ELSE
    classification ← "Obese"
  END IF

  RETURN {bmi, classification}
END FUNCTION
```

---

## 5. Interface Design Decisions

### 5.1 HCI Principles Applied

**Visibility of System Status (Nielsen #1):** The dashboard shows a progress bar for weekly calorie goals, immediately informing users of their status without requiring navigation.

**Match Between System and Real World (Nielsen #2):** Form labels use plain language ("Your weight in kg") rather than technical field names.

**Aesthetic and Minimalist Design (Nielsen #8):** Each screen contains only the information immediately relevant to the user's task. Detailed statistics are hidden behind expandable sections.

### 5.2 Accessibility Design Decisions

- All form inputs have associated `<label>` elements meeting WCAG 2.1 SC 1.3.1
- Error messages use both colour AND an icon AND text to meet WCAG 1.4.1 (Use of Colour)
- Minimum touch target size 44×44px (WCAG 2.5.5 Target Size)
- Skip navigation link provided for screen reader and keyboard users

---

## 6. Security Design

| Threat | Mitigation | Implementation |
|--------|-----------|----------------|
| SQL Injection | Prepared statements | PDO with named parameters in all Model methods |
| XSS | Output encoding | `htmlspecialchars()` on all user-sourced output |
| CSRF | Synchronised token | `$_SESSION['csrf_token']` in all POST forms |
| Broken Auth | Secure hashing | `password_hash()` bcrypt cost 12; `session_regenerate_id()` |
| Sensitive data | HTTPS + encryption | TLS 1.2+; no PII in URLs; GDPR-compliant consent |

---

## 7. Revision History

| Version | Date | Author | Changes |
|---------|------|--------|---------|
| 0.1 | DD/MM/YY | [Name] | Initial draft — database schema |
| 0.2 | DD/MM/YY | [Name] | Added algorithm designs; revised ERD |
| 1.0 | DD/MM/YY | [Name] | Final design; added security section |
