# Assignment Portal

## Overview

The **Assignment Portal** is a web application designed for administrators to manage assignments, where they can assign, accept, reject, and view assignments. The platform allows users to upload assignments, and administrators can perform various actions on them, such as accepting or rejecting them. It is built using **Node.js**, **Express**, **MongoDB**, and **Mongoose**, with file upload functionality powered by **Multer**.

## Features

- **Admin Authentication**: Admins can register, log in, and verify their identities.
- **Assignment Management**: Admins can view, accept, or reject assignments submitted by users.
- **File Upload**: Supports file uploads for assignment submissions.
- **Assignment History**: View the status and history of all assignments.
- **Status Updates**: Admins can update the assignment status to **Accepted** or **Rejected**.

## Technologies Used

- **Backend**: Node.js, Express.js
- **Database**: MongoDB
- **ORM**: Mongoose
- **File Upload**: Multer
- **Authentication**: JWT (JSON Web Token)
- **Validation**: Vine.js for request validation
- **Password Hashing**: bcryptjs

## Installation

### Prerequisites

- [Node.js](https://nodejs.org/en/download/) installed on your machine.
- [MongoDB](https://www.mongodb.com/try/download/community) installed or a remote MongoDB service like [MongoDB Atlas](https://www.mongodb.com/cloud/atlas).

### Steps to Setup

1. Clone the repository:
   ```bash
   git clone https://github.com/your-username/assingportal.git
   cd assingportal
