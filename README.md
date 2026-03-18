# MY-PORTFOLIO

# My-Portfolio

> Modular containerized portfolio platform built as an learning laboratory for integrating independent technologies.

My-Portfolio is a full-stack modular portfolio system designed as an experimental lab to explore modern web architecture, container orchestration, and integration of heterogeneous technologies.

The project is structured as a monorepo with independent modules orchestrated via Docker Compose and deployed behind an Nginx reverse proxy.

---

## ✨ Overview

This project was intentionally built using separate technologies for each component — not because it was strictly necessary, but as a learning laboratory.

The goal is to experiment with:

- Modular architecture
- Integration between independent services
- Accessibility-focused components
- Internationalization workflows
- Containerized deployments
- DevOps practices

The system will continue evolving as a sandbox for testing new architectural ideas.

---

## 🏗 Architecture

The platform is composed of **three main services** plus a database:

### Components

- **Client (Next.js)** — Public portfolio website
- **Dashboard (React + Vite)** — Administrative interface
- **Server (Node.js API)** — REST backend and media handling
- **MongoDB** — Database
- **Docker Compose** — Service orchestration
- **Nginx** — Reverse proxy (production)

Each module is isolated and can evolve independently.

---

## 📂 Repository Structure
