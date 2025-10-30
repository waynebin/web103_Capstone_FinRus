# Milestone 1

This document should be completed and submitted during **Unit 5** of this course. You **must** check off all completed tasks in this document in order to receive credit for your work.

## Checklist

This unit, be sure to complete all tasks listed below. To complete a task, place an `x` between the brackets.

- [x] Read and understand all required features
  - [x] Understand you **must** implement **all** baseline features and **two** custom features
- [x] In `readme.md`: update app name to your app's name
- [x] In `readme.md`: add all group members' names
- [x] In `readme.md`: complete the **Description and Purpose** section
- [x] In `readme.md`: complete the **Inspiration** section
- [x] In `readme.md`: list a name and description for all features (minimum 6 for full points) you intend to include in your app (in future units, you will check off features as you complete them and add GIFs demonstrating the features)
- [x] In `planning/user_stories.md`: add all user stories (minimum 10 for full points)
- [x] In `planning/user_stories.md`: use 1-3 unique user roles in your user stories
- [x] In this document, complete all three questions in the **Reflection** section below

## Reflection

### 1. What went well during this unit?

During this unit, our team successfully established a solid foundation for the FinRus project. We excelled at:

- **Technical Architecture Planning**: We designed a comprehensive full-stack architecture with React frontend, Node.js/Express backend, and PostgreSQL database that supports all our planned features.

- **Feature Scope Definition**: We clearly defined our core features (backtesting engine, portfolio management, strategy management) with detailed technical specifications that are both ambitious and achievable.

- **Team Collaboration**: Our group worked well together to divide responsibilities - with each member contributing to different aspects like frontend design, backend API structure, and database schema planning.

- **User-Centered Design**: We spent significant time understanding our target users (retail traders, portfolio managers, financial students) and their specific needs, which helped us create focused user stories that drive real value.

- **Documentation Quality**: We created comprehensive documentation including detailed README sections, user stories with acceptance criteria, and clear technical specifications that will guide our implementation.

### 2. What were some challenges your group faced in this unit?

Our team encountered several challenges that we're actively addressing:

- **Scope Management**: Initially, we were overly ambitious with features like real-time data feeds and advanced charting. We had to refine our scope to focus on core MVP functionality while keeping advanced features as stretch goals.

- **Technical Complexity Balance**: Financial applications require sophisticated calculations (Sharpe ratios, drawdown analysis, etc.) that needed to be both accurate and user-friendly. We spent considerable time researching financial formulas and best practices.

- **Database Design Decisions**: Designing the schema for flexible strategy storage and historical data management required multiple iterations. We debated between JSON storage vs. normalized tables for strategy parameters.

- **User Story Granularity**: Our initial user stories were too broad. We had to break them down into more specific, testable scenarios with clear acceptance criteria.

- **Time Coordination**: With different schedules, coordinating team meetings and ensuring everyone had input on major decisions required extra planning and asynchronous communication tools.

### 3. What additional support will you need in upcoming units as you continue to work on your final project?

As we move into implementation, we anticipate needing support in several key areas:

- **Technical Guidance**: 
  - Best practices for financial calculations and data handling
  - React optimization for data-heavy visualizations
  - PostgreSQL performance optimization for time-series data
  - API design patterns for financial data

- **Code Review and Quality Assurance**:
  - Peer review sessions to ensure our backtesting algorithms are mathematically sound
  - Guidance on testing strategies for financial calculations
  - Security best practices for handling financial data

- **Project Management Support**:
  - Help with sprint planning and task prioritization
  - Strategies for managing technical debt while maintaining velocity
  - Guidance on feature flag implementation for gradual rollouts

- **External Resources**:
  - Access to financial data APIs or sample datasets for testing
  - Documentation or tutorials on financial visualization libraries
  - Feedback from users (possibly finance students/professors) during development

- **Deployment and DevOps**:
  - Support with database setup and migration strategies
  - Guidance on environment configuration for development/production
  - Best practices for deploying financial applications securely

We're excited to build on this strong foundation and create a truly useful financial analysis tool!