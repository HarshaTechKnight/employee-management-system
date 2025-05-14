# Talentflow - AI-Powered Employee Management System

## Project Overview

Talentflow is an employee management system built with Next.js, designed to streamline HR processes and enhance employee engagement. It leverages Artificial Intelligence to provide powerful features for talent management, offering a modern solution for HR departments.

The application is structured as a Next.js project and is developed with compatibility for Firebase Studio and Project IDX in mind, providing a robust development environment optimized for building and deploying web applications.

## Key AI Features

Talentflow incorporates several AI-powered features to assist with various HR tasks:

- **Attrition Risk Analysis:** Predicts the likelihood of employees leaving the company by analyzing factors like tenure, performance, and sentiment. This helps HR proactively address potential turnover.
- **Employee Sentiment Analysis:** Analyzes employee feedback from various sources (e.g., surveys, chat logs) to gauge overall sentiment, identify key topics of concern or satisfaction, and suggest actions for improvement.
- **Smart Candidate Matching:** Matches job applicants with suitable open positions by analyzing their resumes against job descriptions. It provides a match score and can suggest relevant interview questions.
- **Generate Job Descriptions:** Assists in creating comprehensive, professional, and attractive job descriptions based on a given job title, helping to attract suitable candidates more efficiently.

## Technology Stack

- Next.js (with App Router and Server Components)
- TypeScript
- Tailwind CSS for styling
- ShadCN UI components
- Genkit for AI features (leveraging Google AI models like Gemini)

## Getting Started

The main entry point for the application UI can be found in `src/app/page.tsx` (Login Page), and authenticated routes are generally within `src/app/(authenticated)/`.

## Development Environment

- **Firebase Studio:** An extension within Project IDX, offering tools for developing and managing Firebase projects. Talentflow is designed for potential integration with Firebase backend services.
- **Project IDX:** A browser-based development environment for building full-stack applications, providing a convenient platform for Talentflow development.

## Next Steps for Users/Developers

* Explore the application by logging in with the provided mock user accounts (hr@example.com, manager@example.com, employee@example.com).
* Review the AI flows located in `src/ai/flows/` to understand how AI capabilities are implemented.
* Modify and extend existing components in `src/components/` or create new ones.
* Refer to the `README.md` for more detailed project information and setup instructions if needed.
