# Chess Club Membership Management System

A Node.js backend system for managing chess club memberships management with role-based authentication, member management, and administrative controls.

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


##  Technology Stack
- **Framework**: Express.js
- **Database**: MySQL 
- **ORM**: Sequelize
- **Authentication**: JWT (JSON Web Tokens)
- **Security**: bcrypt for password hashing
- **Validation**: Joi for input validation


## 🔄 Application Workflow

1. **Authentication & Member Operations Flow**:

   A[Member] --> Register  {name, email, password }  --> Login [password verification] --> Routes/Endpoint  [JWT Verification]  ---> System Access
   

2. **Authentication & Admin Operations Flow**:

   A[Admin] --> Register {name, email, password, adminCode}  --> Login [password verification] --> Routes/Endpoint [JWT Verification] [Admin role Verification] ---> Full Access 



##  Project Structure
##  API Endpoints

### Authentication
```
POST /api/auth/register         - Register new member
POST /api/auth/register-admin   - Register admin (adminCode required for registration)
POST /api/auth/login            - User login
POST /api/auth/logout           - User logout
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
POST   /api/admin/member/fill-related-details   - Fill all members related data into other tables by authorized admin only
GET    /api/admin                               - List all admin role users
GET    /api/admin/members                       - List all members
GET    /api/admin/member/:id                    - specific member details
GET    /api/admin/memberships                   - View all memberships
GET    /api/admin/member/:status                - View all members paid/pending status
GET    /api/admin/member/team/:name             - View all members with team rank 
```
