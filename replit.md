# Smart Tourist Safety Monitoring & Incident Response System

## Overview

This is a comprehensive tourist safety platform that combines AI-powered anomaly detection, blockchain-secured digital IDs, and geo-fencing technology to protect visitors in remote and high-risk regions. The system provides real-time monitoring, SOS alert management, and automated incident response capabilities for tourists and authorities.

The platform consists of a React-based frontend for tourists and authorities, paired with an Express.js backend that handles digital ID management, location tracking, safety zone monitoring, and emergency response coordination.

## User Preferences

Preferred communication style: Simple, everyday language.

## Recent Changes

**September 8, 2025**: Implemented comprehensive Smart Tourist Safety Monitoring & Incident Response System backend with AI-powered anomaly detection, blockchain-secured digital IDs, and geo-fencing technology. The system now includes 30+ API endpoints covering all major tourist safety features including digital ID management, real-time tracking, SOS alerts, geo-fencing, anomaly detection, and dashboard analytics.

## System Architecture

### Frontend Architecture
- **Framework**: React 18 with TypeScript for type safety
- **Routing**: React Router 6 in SPA mode with file-based page organization
- **State Management**: TanStack React Query for server state and caching
- **Styling**: TailwindCSS 3 with custom design system using CSS variables
- **UI Components**: Radix UI primitives with custom shadcn/ui component library
- **Build Tool**: Vite for fast development and optimized production builds

### Backend Architecture
- **Framework**: Express 5 with TypeScript for tourist safety monitoring system
- **Data Storage**: In-memory stores (Map-based) with comprehensive data models for tourist safety
- **API Design**: RESTful endpoints organized by feature domains with 30+ endpoints
- **Architecture Pattern**: Feature-based module organization with shared utilities and types
- **Security**: Blockchain hash generation, data encryption, and KYC verification system
- **Sample Data**: Pre-populated Northeast India safety zones and police units for testing

#### Implemented API Endpoints
- **Tourist ID Management**: Digital ID creation, KYC verification, safety scoring
- **Geo-fencing & Safety Zones**: Zone management, location validation, proximity alerts
- **SOS & Emergency Response**: Panic button, police dispatch, emergency notifications
- **Real-time Tracking**: Location updates, movement analysis, battery monitoring
- **Dashboard & Analytics**: Tourist clusters, heat maps, incident reports, statistics
- **Anomaly Detection**: AI-powered pattern analysis, automated alert generation

### Core Feature Modules

#### Digital Tourist ID System
- KYC data management with document verification
- Blockchain hash generation for tamper-proof records
- Safety score calculation based on travel patterns and destination risk levels
- Emergency contact integration

#### Geo-fencing & Safety Zones
- Polygon-based zone definitions with risk level classification
- Real-time location monitoring against defined boundaries
- Automated alerts when tourists enter restricted or high-risk areas
- Support for multiple zone types (safe, restricted, emergency)

#### SOS & Emergency Response
- Multi-channel SOS alert system with priority classification
- Automatic police unit dispatch based on proximity algorithms
- Emergency contact notification system
- Real-time incident tracking and status updates

#### AI Anomaly Detection
- Movement pattern analysis for unusual tourist behavior
- Speed and location-based anomaly detection
- Automated alert generation for suspicious activities
- Machine learning-ready data structure for future ML integration

#### Location Tracking & Analytics
- Real-time GPS coordinate processing
- Historical movement pattern storage
- Battery level monitoring for device management
- Tourist clustering for crowd management

### Data Architecture
- **Type-safe interfaces**: Shared types between client and server via TypeScript
- **Modular stores**: Separated data stores by feature domain for scalability
- **Sample data initialization**: Pre-populated development data for testing
- **RESTful API contracts**: Standardized request/response patterns with ApiResponse wrapper

### Security & Compliance
- **Data validation**: Zod schemas for runtime type checking
- **CORS configuration**: Configurable cross-origin resource sharing
- **Request size limits**: Protection against oversized payloads
- **Blockchain integration**: Hash-based data integrity for critical records

### Development & Deployment
- **Hot Module Replacement**: Vite dev server with Express middleware integration
- **Dual build system**: Separate client (SPA) and server builds
- **Production serving**: Express serves built React app with API fallbacks
- **Path aliases**: Organized imports with @ and @shared prefixes for clean code structure

## External Dependencies

### Core Runtime Dependencies
- **Express**: Web server framework with CORS middleware
- **Zod**: Runtime type validation and schema definition
- **React ecosystem**: React 18, React Router 6, React DOM with TypeScript support

### Development & Build Tools
- **Vite**: Frontend build tool with SWC compiler for fast TypeScript compilation
- **TailwindCSS**: Utility-first CSS framework with typography plugin
- **PostCSS**: CSS processing with Autoprefixer

### UI & Visualization Libraries
- **Radix UI**: Headless UI primitives for accessible components
- **Recharts**: Chart library for data visualization and analytics dashboards
- **Lucide React**: Icon library for consistent visual elements
- **React Hook Form**: Form state management with Hookform resolvers

### State Management & Data Fetching
- **TanStack React Query**: Server state management and caching
- **React Three Fiber & Drei**: 3D visualization capabilities for mapping features

### Monitoring & Notifications
- **Sonner**: Toast notification system for user feedback
- **React Hot Toast**: Alternative toast system for development

The system is designed to be easily extensible with database integration (prepared for Postgres with Drizzle ORM patterns) and can be deployed to various hosting platforms with the current build configuration.