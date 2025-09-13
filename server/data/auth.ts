import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { User, LoginRequest, SignupRequest } from '@shared/api';

// In-memory user store (in production, use a real database)
const users: User[] = [];
const refreshTokens: Set<string> = new Set();

// JWT configuration
const JWT_SECRET = process.env.JWT_SECRET || 'your-super-secret-jwt-key-change-in-production';
const JWT_REFRESH_SECRET = process.env.JWT_REFRESH_SECRET || 'your-super-secret-refresh-key-change-in-production';
const JWT_EXPIRES_IN = '24h';
const JWT_REFRESH_EXPIRES_IN = '7d';

// Password validation (commented out for easier testing)
// const PASSWORD_MIN_LENGTH = 8;
// const PASSWORD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]/;

// Email validation
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export interface UserWithPassword extends User {
  password: string;
}

export interface ValidationResult {
  isValid: boolean;
  errors: string[];
}

// Validation functions
export function validateEmail(email: string): ValidationResult {
  const errors: string[] = [];
  
  if (!email) {
    errors.push('Email is required');
  } else if (!EMAIL_REGEX.test(email)) {
    errors.push('Email format is invalid');
  }
  
  return {
    isValid: errors.length === 0,
    errors
  };
}

export function validatePassword(password: string): ValidationResult {
  const errors: string[] = [];
  
  if (!password) {
    errors.push('Password is required');
  }
  // Commented out strict password validation for easier testing
  // else if (password.length < PASSWORD_MIN_LENGTH) {
  //   errors.push(`Password must be at least ${PASSWORD_MIN_LENGTH} characters long`);
  // } else if (!PASSWORD_REGEX.test(password)) {
  //   errors.push('Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character');
  // }
  
  return {
    isValid: errors.length === 0,
    errors
  };
}

export function validateName(name: string): ValidationResult {
  const errors: string[] = [];
  
  if (!name) {
    errors.push('Name is required');
  } else if (name.trim().length < 2) {
    errors.push('Name must be at least 2 characters long');
  } else if (name.trim().length > 50) {
    errors.push('Name must be less than 50 characters');
  }
  
  return {
    isValid: errors.length === 0,
    errors
  };
}

// User management functions
export function findUserByEmail(email: string): UserWithPassword | null {
  return users.find(user => user.email.toLowerCase() === email.toLowerCase()) as UserWithPassword | null;
}

export function findUserById(id: string): UserWithPassword | null {
  return users.find(user => user.id === id) as UserWithPassword | null;
}

export function createUser(userData: SignupRequest): UserWithPassword {
  const id = generateId();
  const hashedPassword = bcrypt.hashSync(userData.password, 12);
  
  const user: UserWithPassword = {
    id,
    name: userData.name.trim(),
    email: userData.email.toLowerCase(),
    password: hashedPassword,
    role: userData.role || 'tourist',
    isActive: true,
    createdAt: new Date().toISOString(),
    profile: userData.profile || {}
  };
  
  users.push(user);
  return user;
}

export function updateUserLastLogin(userId: string): void {
  const user = findUserById(userId);
  if (user) {
    user.lastLogin = new Date().toISOString();
  }
}

// Password verification
export function verifyPassword(password: string, hashedPassword: string): boolean {
  return bcrypt.compareSync(password, hashedPassword);
}

// JWT token functions
export function generateTokens(user: User): { token: string; refreshToken: string } {
  const payload = {
    userId: user.id,
    email: user.email,
    role: user.role
  };
  
  const token = jwt.sign(payload, JWT_SECRET, { expiresIn: JWT_EXPIRES_IN });
  const refreshToken = jwt.sign(payload, JWT_REFRESH_SECRET, { expiresIn: JWT_REFRESH_EXPIRES_IN });
  
  // Store refresh token
  refreshTokens.add(refreshToken);
  
  return { token, refreshToken };
}

export function verifyToken(token: string): { userId: string; email: string; role: string } | null {
  try {
    const decoded = jwt.verify(token, JWT_SECRET) as any;
    return {
      userId: decoded.userId,
      email: decoded.email,
      role: decoded.role
    };
  } catch (error) {
    return null;
  }
}

export function verifyRefreshToken(refreshToken: string): { userId: string; email: string; role: string } | null {
  try {
    if (!refreshTokens.has(refreshToken)) {
      return null;
    }
    
    const decoded = jwt.verify(refreshToken, JWT_REFRESH_SECRET) as any;
    return {
      userId: decoded.userId,
      email: decoded.email,
      role: decoded.role
    };
  } catch (error) {
    return null;
  }
}

export function revokeRefreshToken(refreshToken: string): void {
  refreshTokens.delete(refreshToken);
}

export function revokeAllUserTokens(userId: string): void {
  // In a real implementation, you'd track tokens per user
  // For now, we'll just clear all refresh tokens
  refreshTokens.clear();
}

// Utility functions
function generateId(): string {
  return Math.random().toString(36).substr(2, 9) + Date.now().toString(36);
}

// Initialize with sample users for development
export function initializeAuthData(): void {
  // Create sample admin user
  const adminUser: UserWithPassword = {
    id: 'admin-001',
    name: 'Admin User',
    email: 'admin@touristsafety.com',
    password: bcrypt.hashSync('Admin123!', 12),
    role: 'admin',
    isActive: true,
    createdAt: new Date().toISOString(),
    profile: {
      phoneNumber: '+1234567890',
      nationality: 'US'
    }
  };
  
  // Create sample authority user
  const authorityUser: UserWithPassword = {
    id: 'auth-001',
    name: 'Police Officer',
    email: 'officer@touristsafety.com',
    password: bcrypt.hashSync('Officer123!', 12),
    role: 'authority',
    isActive: true,
    createdAt: new Date().toISOString(),
    profile: {
      phoneNumber: '+1234567891',
      nationality: 'US'
    }
  };
  
  // Create sample tourist user
  const touristUser: UserWithPassword = {
    id: 'tourist-001',
    name: 'John Tourist',
    email: 'tourist@example.com',
    password: bcrypt.hashSync('Tourist123!', 12),
    role: 'tourist',
    isActive: true,
    createdAt: new Date().toISOString(),
    profile: {
      phoneNumber: '+1234567892',
      nationality: 'UK'
    }
  };
  
  users.push(adminUser, authorityUser, touristUser);
  
  console.log('Authentication data initialized with sample users');
  console.log('Admin: admin@touristsafety.com / Admin123!');
  console.log('Authority: officer@touristsafety.com / Officer123!');
  console.log('Tourist: tourist@example.com / Tourist123!');
}

// Get user statistics
export function getAuthStats() {
  return {
    totalUsers: users.length,
    activeUsers: users.filter(u => u.isActive).length,
    usersByRole: {
      admin: users.filter(u => u.role === 'admin').length,
      authority: users.filter(u => u.role === 'authority').length,
      tourist: users.filter(u => u.role === 'tourist').length
    },
    activeRefreshTokens: refreshTokens.size
  };
}
