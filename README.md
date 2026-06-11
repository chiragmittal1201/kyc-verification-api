# KYC Verification API

A Node.js and Express-based backend service that integrates Aadhaar and bank account verification workflows through external verification providers.

## Features

* Aadhaar OTP generation
* Aadhaar OTP verification
* Aadhaar demographic data retrieval
* Aadhaar profile image extraction and storage
* Bank account verification
* Permanent KYC reference generation
* Reference tracking and audit logging
* JSON-based storage for verification records
* Modular service-controller architecture

## Project Structure

```text
src/
├── config/
├── controllers/
├── routes/
├── services/
├── utils/
└── app.js

data/
├── aadhaar/
├── bank/
├── images/
└── references.json
```

## Workflow

1. Generate Aadhaar OTP
2. Create unique KYC reference
3. Verify Aadhaar OTP
4. Extract Aadhaar details and profile image
5. Save verification records
6. Verify bank account
7. Link all verification records using a single KYC reference

## Technologies Used

* Node.js
* Express.js
* Axios
* File System (fs)
* UUID/Crypto Utilities

## Notes

This project was developed to migrate an existing verification workflow from PHP to Node.js while maintaining support for Aadhaar verification, bank verification, audit tracking, and modular backend architecture.

Sensitive credentials and production provider configurations are excluded from the repository.
