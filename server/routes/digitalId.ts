import { Request, Response } from 'express';
import { v4 as uuidv4 } from 'uuid';

// In-memory storage for Digital IDs (in production, this would be a database)
const digitalIds = new Map<string, any>();

export const generateDigitalId = async (req: Request, res: Response) => {
  try {
    const { 
      fullName, 
      nationality, 
      passportNumber, 
      dateOfBirth, 
      phoneNumber, 
      email,
      destination,
      arrivalDate,
      departureDate,
      accommodation,
      travelPurpose,
      emergencyContact1,
      emergencyContact2,
      medicalConditions,
      medications,
      bloodType,
      allergies
    } = req.body;

    const userId = req.user?.id;
    if (!userId) {
      return res.status(401).json({ success: false, error: 'User not authenticated' });
    }

    // Generate unique ID
    const id = `STS-${Math.random().toString(36).substr(2, 8).toUpperCase()}`;
    const blockchainHash = `0x${Math.random().toString(16).substr(2, 40)}`;
    
    // Create QR code data
    const qrData = {
      id,
      name: fullName,
      nationality,
      destination,
      validUntil: departureDate,
      blockchainHash
    };

    const digitalIdData = {
      id,
      userId,
      fullName,
      nationality,
      passportNumber,
      dateOfBirth,
      phoneNumber,
      email,
      destination,
      arrivalDate,
      departureDate,
      accommodation,
      travelPurpose,
      emergencyContact1,
      emergencyContact2,
      medicalConditions,
      medications,
      bloodType,
      allergies,
      qrCode: `https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodeURIComponent(JSON.stringify(qrData))}`,
      blockchainHash,
      status: 'Active',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };

    // Store the Digital ID
    digitalIds.set(id, digitalIdData);

    res.json({
      success: true,
      message: 'Digital ID generated successfully',
      data: digitalIdData
    });
  } catch (error) {
    console.error('Error generating Digital ID:', error);
    res.status(500).json({ 
      success: false, 
      error: 'Failed to generate Digital ID' 
    });
  }
};

export const getDigitalIds = async (req: Request, res: Response) => {
  try {
    const userId = req.user?.id;
    if (!userId) {
      return res.status(401).json({ success: false, error: 'User not authenticated' });
    }

    // Get all Digital IDs for the user
    const userDigitalIds = Array.from(digitalIds.values())
      .filter(id => id.userId === userId)
      .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());

    res.json({
      success: true,
      data: userDigitalIds
    });
  } catch (error) {
    console.error('Error fetching Digital IDs:', error);
    res.status(500).json({ 
      success: false, 
      error: 'Failed to fetch Digital IDs' 
    });
  }
};

export const getDigitalIdById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const userId = req.user?.id;
    
    if (!userId) {
      return res.status(401).json({ success: false, error: 'User not authenticated' });
    }

    const digitalId = digitalIds.get(id);
    if (!digitalId || digitalId.userId !== userId) {
      return res.status(404).json({ 
        success: false, 
        error: 'Digital ID not found' 
      });
    }

    res.json({
      success: true,
      data: digitalId
    });
  } catch (error) {
    console.error('Error fetching Digital ID:', error);
    res.status(500).json({ 
      success: false, 
      error: 'Failed to fetch Digital ID' 
    });
  }
};

export const updateDigitalId = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const userId = req.user?.id;
    const updateData = req.body;
    
    if (!userId) {
      return res.status(401).json({ success: false, error: 'User not authenticated' });
    }

    const digitalId = digitalIds.get(id);
    if (!digitalId || digitalId.userId !== userId) {
      return res.status(404).json({ 
        success: false, 
        error: 'Digital ID not found' 
      });
    }

    // Update the Digital ID
    const updatedDigitalId = {
      ...digitalId,
      ...updateData,
      updatedAt: new Date().toISOString()
    };

    digitalIds.set(id, updatedDigitalId);

    res.json({
      success: true,
      message: 'Digital ID updated successfully',
      data: updatedDigitalId
    });
  } catch (error) {
    console.error('Error updating Digital ID:', error);
    res.status(500).json({ 
      success: false, 
      error: 'Failed to update Digital ID' 
    });
  }
};

export const deleteDigitalId = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const userId = req.user?.id;
    
    if (!userId) {
      return res.status(401).json({ success: false, error: 'User not authenticated' });
    }

    const digitalId = digitalIds.get(id);
    if (!digitalId || digitalId.userId !== userId) {
      return res.status(404).json({ 
        success: false, 
        error: 'Digital ID not found' 
      });
    }

    digitalIds.delete(id);

    res.json({
      success: true,
      message: 'Digital ID deleted successfully'
    });
  } catch (error) {
    console.error('Error deleting Digital ID:', error);
    res.status(500).json({ 
      success: false, 
      error: 'Failed to delete Digital ID' 
    });
  }
};

// Middleware to extract user from JWT token
export const authenticateUser = (req: Request, res: Response, next: any) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ success: false, error: 'No token provided' });
  }

  const token = authHeader.substring(7);
  
  try {
    // In a real app, you'd verify the JWT token here
    // For now, we'll extract user info from the token or use a mock
    const { verifyToken } = require('../data/auth');
    const decoded = verifyToken(token);
    
    if (!decoded) {
      return res.status(401).json({ success: false, error: 'Invalid token' });
    }

    req.user = { id: decoded.userId, email: decoded.email, role: decoded.role };
    next();
  } catch (error) {
    return res.status(401).json({ success: false, error: 'Invalid token' });
  }
};
