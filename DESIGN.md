# Design Note — LLD Practice Platform

## 1. Architecture

The application uses a simple monolithic MERN architecture.

```text
React Client
     |
     | HTTP / REST API
     ↓
Node.js + Express
     |
     ├── Problem APIs
     ├── Attempt APIs
     ├── Submission APIs
     └── Evaluation APIs
     |
     ↓
MongoDB