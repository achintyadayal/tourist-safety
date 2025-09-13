import { RequestHandler } from 'express';
import { 
  LoginRequest, 
  SignupRequest, 
  LoginResponse, 
  SignupResponse, 
  ApiResponse,
  User 
} from '@shared/api';
import {
  findUserByEmail,
  findUserById,
  createUser,
  updateUserLastLogin,
  verifyPassword,
  generateTokens,
  verifyToken,
  verifyRefreshToken,
  revokeRefreshToken,
  revokeAllUserTokens,
  validateEmail,
  validatePassword,
  validateName,
  UserWithPassword
} from '../data/auth';

// Login endpoint
export const login: RequestHandler = async (req, res) => {
  try {
    const { email, password, rememberMe }: LoginRequest = req.body;

    // Validate input
    const emailValidation = validateEmail(email);
    if (!emailValidation.isValid) {
      return res.status(400).json({
        success: false,
        error: 'Validation failed',
        message: emailValidation.errors.join(', ')
      });
    }

    if (!password) {
      return res.status(400).json({
        success: false,
        error: 'Validation failed',
        message: 'Password is required'
      });
    }

    // Find user
    const user = findUserByEmail(email);
    if (!user) {
      return res.status(401).json({
        success: false,
        error: 'Authentication failed',
        message: 'Invalid email or password'
      });
    }

    // Check if user is active
    if (!user.isActive) {
      return res.status(401).json({
        success: false,
        error: 'Account disabled',
        message: 'Your account has been disabled. Please contact support.'
      });
    }

    // Verify password
    if (!verifyPassword(password, user.password)) {
      return res.status(401).json({
        success: false,
        error: 'Authentication failed',
        message: 'Invalid email or password'
      });
    }

    // Generate tokens
    const { token, refreshToken } = generateTokens(user);

    // Update last login
    updateUserLastLogin(user.id);

    // Remove password from response
    const { password: _, ...userWithoutPassword } = user;

    const response: LoginResponse = {
      success: true,
      user: userWithoutPassword,
      token,
      refreshToken,
      expiresIn: 24 * 60 * 60, // 24 hours in seconds
      message: 'Login successful'
    };

    res.json(response);
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({
      success: false,
      error: 'Internal server error',
      message: 'An error occurred during login'
    });
  }
};

// Signup endpoint
export const signup: RequestHandler = async (req, res) => {
  try {
    const { name, email, password, role, profile }: SignupRequest = req.body;

    // Validate input
    const nameValidation = validateName(name);
    if (!nameValidation.isValid) {
      return res.status(400).json({
        success: false,
        error: 'Validation failed',
        message: nameValidation.errors.join(', ')
      });
    }

    const emailValidation = validateEmail(email);
    if (!emailValidation.isValid) {
      return res.status(400).json({
        success: false,
        error: 'Validation failed',
        message: emailValidation.errors.join(', ')
      });
    }

    const passwordValidation = validatePassword(password);
    if (!passwordValidation.isValid) {
      return res.status(400).json({
        success: false,
        error: 'Validation failed',
        message: passwordValidation.errors.join(', ')
      });
    }

    // Check if user already exists
    const existingUser = findUserByEmail(email);
    if (existingUser) {
      return res.status(409).json({
        success: false,
        error: 'User already exists',
        message: 'An account with this email already exists'
      });
    }

    // Create user
    const user = createUser({ name, email, password, role, profile });

    // Generate tokens
    const { token, refreshToken } = generateTokens(user);

    // Remove password from response
    const { password: _, ...userWithoutPassword } = user;

    const response: SignupResponse = {
      success: true,
      user: userWithoutPassword,
      token,
      refreshToken,
      expiresIn: 24 * 60 * 60, // 24 hours in seconds
      message: 'Account created successfully'
    };

    res.status(201).json(response);
  } catch (error) {
    console.error('Signup error:', error);
    res.status(500).json({
      success: false,
      error: 'Internal server error',
      message: 'An error occurred during signup'
    });
  }
};

// Refresh token endpoint
export const refreshToken: RequestHandler = async (req, res) => {
  try {
    const { refreshToken } = req.body;

    if (!refreshToken) {
      return res.status(400).json({
        success: false,
        error: 'Validation failed',
        message: 'Refresh token is required'
      });
    }

    // Verify refresh token
    const decoded = verifyRefreshToken(refreshToken);
    if (!decoded) {
      return res.status(401).json({
        success: false,
        error: 'Invalid token',
        message: 'Invalid or expired refresh token'
      });
    }

    // Find user
    const user = findUserById(decoded.userId);
    if (!user || !user.isActive) {
      return res.status(401).json({
        success: false,
        error: 'User not found',
        message: 'User not found or inactive'
      });
    }

    // Generate new tokens
    const { token: newToken, refreshToken: newRefreshToken } = generateTokens(user);

    // Revoke old refresh token
    revokeRefreshToken(refreshToken);

    // Remove password from response
    const { password: _, ...userWithoutPassword } = user;

    const response: ApiResponse<{ user: User; token: string; refreshToken: string; expiresIn: number }> = {
      success: true,
      data: {
        user: userWithoutPassword,
        token: newToken,
        refreshToken: newRefreshToken,
        expiresIn: 24 * 60 * 60
      },
      message: 'Token refreshed successfully'
    };

    res.json(response);
  } catch (error) {
    console.error('Refresh token error:', error);
    res.status(500).json({
      success: false,
      error: 'Internal server error',
      message: 'An error occurred during token refresh'
    });
  }
};

// Logout endpoint
export const logout: RequestHandler = async (req, res) => {
  try {
    const { refreshToken } = req.body;

    if (refreshToken) {
      revokeRefreshToken(refreshToken);
    }

    res.json({
      success: true,
      message: 'Logged out successfully'
    });
  } catch (error) {
    console.error('Logout error:', error);
    res.status(500).json({
      success: false,
      error: 'Internal server error',
      message: 'An error occurred during logout'
    });
  }
};

// Get current user profile
export const getProfile: RequestHandler = async (req, res) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({
        success: false,
        error: 'Unauthorized',
        message: 'No valid token provided'
      });
    }

    const token = authHeader.substring(7);
    const decoded = verifyToken(token);
    
    if (!decoded) {
      return res.status(401).json({
        success: false,
        error: 'Invalid token',
        message: 'Invalid or expired token'
      });
    }

    const user = findUserById(decoded.userId);
    if (!user) {
      return res.status(404).json({
        success: false,
        error: 'User not found',
        message: 'User not found'
      });
    }

    // Remove password from response
    const { password: _, ...userWithoutPassword } = user;

    res.json({
      success: true,
      data: userWithoutPassword,
      message: 'Profile retrieved successfully'
    });
  } catch (error) {
    console.error('Get profile error:', error);
    res.status(500).json({
      success: false,
      error: 'Internal server error',
      message: 'An error occurred while retrieving profile'
    });
  }
};

// Update user profile
export const updateProfile: RequestHandler = async (req, res) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({
        success: false,
        error: 'Unauthorized',
        message: 'No valid token provided'
      });
    }

    const token = authHeader.substring(7);
    const decoded = verifyToken(token);
    
    if (!decoded) {
      return res.status(401).json({
        success: false,
        error: 'Invalid token',
        message: 'Invalid or expired token'
      });
    }

    const user = findUserById(decoded.userId);
    if (!user) {
      return res.status(404).json({
        success: false,
        error: 'User not found',
        message: 'User not found'
      });
    }

    const { name, profile } = req.body;

    // Validate name if provided
    if (name) {
      const nameValidation = validateName(name);
      if (!nameValidation.isValid) {
        return res.status(400).json({
          success: false,
          error: 'Validation failed',
          message: nameValidation.errors.join(', ')
        });
      }
      user.name = name.trim();
    }

    // Update profile if provided
    if (profile) {
      user.profile = { ...user.profile, ...profile };
    }

    // Remove password from response
    const { password: _, ...userWithoutPassword } = user;

    res.json({
      success: true,
      data: userWithoutPassword,
      message: 'Profile updated successfully'
    });
  } catch (error) {
    console.error('Update profile error:', error);
    res.status(500).json({
      success: false,
      error: 'Internal server error',
      message: 'An error occurred while updating profile'
    });
  }
};

// Change password
export const changePassword: RequestHandler = async (req, res) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({
        success: false,
        error: 'Unauthorized',
        message: 'No valid token provided'
      });
    }

    const token = authHeader.substring(7);
    const decoded = verifyToken(token);
    
    if (!decoded) {
      return res.status(401).json({
        success: false,
        error: 'Invalid token',
        message: 'Invalid or expired token'
      });
    }

    const { currentPassword, newPassword } = req.body;

    if (!currentPassword || !newPassword) {
      return res.status(400).json({
        success: false,
        error: 'Validation failed',
        message: 'Current password and new password are required'
      });
    }

    const user = findUserById(decoded.userId);
    if (!user) {
      return res.status(404).json({
        success: false,
        error: 'User not found',
        message: 'User not found'
      });
    }

    // Verify current password
    if (!verifyPassword(currentPassword, user.password)) {
      return res.status(400).json({
        success: false,
        error: 'Invalid password',
        message: 'Current password is incorrect'
      });
    }

    // Validate new password
    const passwordValidation = validatePassword(newPassword);
    if (!passwordValidation.isValid) {
      return res.status(400).json({
        success: false,
        error: 'Validation failed',
        message: passwordValidation.errors.join(', ')
      });
    }

    // Update password
    const bcrypt = require('bcryptjs');
    user.password = bcrypt.hashSync(newPassword, 12);

    // Revoke all user tokens for security
    revokeAllUserTokens(user.id);

    res.json({
      success: true,
      message: 'Password changed successfully. Please log in again.'
    });
  } catch (error) {
    console.error('Change password error:', error);
    res.status(500).json({
      success: false,
      error: 'Internal server error',
      message: 'An error occurred while changing password'
    });
  }
};
