# Chess Club Management System

A Node.js backend system for managing chess club Members, Teams, Memberships, Ranks details with role-based authentication, member management, and administrative controls.

##  Features

### Authentication & Authorization
- Secure JWT-based authentication
- Role-based access control (Admin/Member)
- Protected admin registration system  (adminCode required for admin registration)
- Secure password hashing

### Member Management
- Member registration and profile management
- Secure profile updates (name & password fields)
- Membership status and related Team tracking

### Admin Features
- Protected admin registration using secure adminCode during signup
- Registered Members related data filling capabilities
- Members related tables' data management


## Seed the database:
seeders/
  - node databaseSeeder.js

##  Technology Stack
- **Framework**: Express.js
- **Database**: MySQL 
- **ORM**: Sequelize
- **Authentication**: JWT (JSON Web Tokens)
- **Security**: bcrypt for password hashing
- **Validation**: Joi for input validation


##  Application Workflow

1. **Authentication & Member Operations Flow**:

   A[Member] --> Register  {name, email, password }  --> Login [password verification] --> Routes/Endpoint  [JWT Verification]  ---> System Access
   

2. **Authentication & Admin Operations Flow**:

   A[Admin] --> Register {name, email, password, adminCode}  --> Login [password verification] --> Routes/Endpoint [JWT Verification] [user role(admin) Verification] ---> Full Access 



##  Project Structure
##  API Endpoints

### Authentication
```
POST /api/auth/register-member    - Register new member   // { "name": "Jimmy Rogs", "email": "jimmy@chessclub.com", "password": "Password123#" }
POST /api/auth/register-admin     - Register admin    // { "name": "Admin John", "email": "first.admin@chessclub.com", "password": "Password123#", "adminCode": "2020" }
POST /api/auth/login              - member/admin login
POST /api/auth/logout             - User logout
```

### Member Operations
```
GET    /api/member/profile           - Get profile
PUT    /api/member/update-name       - Update name
PUT    /api/member/update-password   - Update password
DELETE /api/member/delete            - Delete member
```

### Admin Operations
```
GET    /api/admin                               - List all admin role users
GET    /api/admin/members                       - List all members
GET    /api/admin/member/:id                    - specific member details
GET    /api/admin/memberships                   - View all memberships
GET    /api/admin/member/:status                - View all members e.g: paid/pending status
GET    /api/admin/member/team/:name             - View all members with team rank e.g: Knights & Bishops


POST   /api/admin/member/fill-related-details   - Fill all members related data into other tables by authorized admin only

 req.body to fill registered members related data by the authorized admin only
     {
           "userData": {
             "email": "newemail@example.com"
           },
           "membershipData": {
             "startDate": "2025-02-25",
             "endDate": "2025-04-30",
             "status": "Paid"
           },
           "paymentData": {
             "amount": 100,
             "paymentDate": "2025-02-25"
           },
           "teamName": "Knights",
           "rankData": {
             "score": 0
           }
         }
```
