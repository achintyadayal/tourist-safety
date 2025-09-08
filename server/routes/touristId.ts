import { RequestHandler } from "express";
import { 
  TouristId, 
  CreateTouristIdRequest, 
  ApiResponse, 
  PaginatedResponse,
  KYCData 
} from "@shared/api";
import { generateId, calculateSafetyScore, generateBlockchainHash } from "../utils/helpers";
import { touristIdStore } from "../data/store";

// Create a new tourist digital ID
export const createTouristId: RequestHandler = async (req, res) => {
  try {
    const request: CreateTouristIdRequest = req.body;
    
    // Validate required fields
    if (!request.kycData || !request.itinerary || !request.emergencyContacts) {
      return res.status(400).json({
        success: false,
        error: "Missing required fields: kycData, itinerary, and emergencyContacts"
      } as ApiResponse);
    }

    const touristId: TouristId = {
      id: generateId(),
      kycData: {
        ...request.kycData,
        verificationStatus: 'pending'
      },
      itinerary: request.itinerary,
      emergencyContacts: request.emergencyContacts,
      validFrom: new Date().toISOString(),
      validUntil: new Date(Date.now() + (request.itinerary.plannedDuration * 24 * 60 * 60 * 1000)).toISOString(),
      isActive: true,
      safetyScore: calculateSafetyScore(request.itinerary),
      blockchainHash: generateBlockchainHash()
    };

    touristIdStore.set(touristId.id, touristId);

    const response: ApiResponse<TouristId> = {
      success: true,
      data: touristId,
      message: "Tourist ID created successfully"
    };

    res.status(201).json(response);
  } catch (error) {
    res.status(500).json({
      success: false,
      error: "Internal server error"
    } as ApiResponse);
  }
};

// Get tourist ID by ID
export const getTouristId: RequestHandler = (req, res) => {
  try {
    const { id } = req.params;
    const touristId = touristIdStore.get(id);

    if (!touristId) {
      return res.status(404).json({
        success: false,
        error: "Tourist ID not found"
      } as ApiResponse);
    }

    const response: ApiResponse<TouristId> = {
      success: true,
      data: touristId
    };

    res.json(response);
  } catch (error) {
    res.status(500).json({
      success: false,
      error: "Internal server error"
    } as ApiResponse);
  }
};

// Update tourist ID
export const updateTouristId: RequestHandler = (req, res) => {
  try {
    const { id } = req.params;
    const existingTouristId = touristIdStore.get(id);

    if (!existingTouristId) {
      return res.status(404).json({
        success: false,
        error: "Tourist ID not found"
      } as ApiResponse);
    }

    const updatedTouristId: TouristId = {
      ...existingTouristId,
      ...req.body,
      id // Prevent ID modification
    };

    touristIdStore.set(id, updatedTouristId);

    const response: ApiResponse<TouristId> = {
      success: true,
      data: updatedTouristId,
      message: "Tourist ID updated successfully"
    };

    res.json(response);
  } catch (error) {
    res.status(500).json({
      success: false,
      error: "Internal server error"
    } as ApiResponse);
  }
};

// Verify KYC data
export const verifyKYC: RequestHandler = (req, res) => {
  try {
    const { id } = req.params;
    const { status }: { status: KYCData['verificationStatus'] } = req.body;

    const touristId = touristIdStore.get(id);
    if (!touristId) {
      return res.status(404).json({
        success: false,
        error: "Tourist ID not found"
      } as ApiResponse);
    }

    touristId.kycData.verificationStatus = status;
    touristIdStore.set(id, touristId);

    const response: ApiResponse<TouristId> = {
      success: true,
      data: touristId,
      message: `KYC verification ${status}`
    };

    res.json(response);
  } catch (error) {
    res.status(500).json({
      success: false,
      error: "Internal server error"
    } as ApiResponse);
  }
};

// Get all tourist IDs with pagination
export const getAllTouristIds: RequestHandler = (req, res) => {
  try {
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 10;
    const status = req.query.status as string;

    let allTouristIds = Array.from(touristIdStore.values());

    // Filter by status if provided
    if (status) {
      allTouristIds = allTouristIds.filter(t => t.kycData.verificationStatus === status);
    }

    const total = allTouristIds.length;
    const pages = Math.ceil(total / limit);
    const startIndex = (page - 1) * limit;
    const paginatedTouristIds = allTouristIds.slice(startIndex, startIndex + limit);

    const response: PaginatedResponse<TouristId> = {
      success: true,
      data: paginatedTouristIds,
      pagination: { page, limit, total, pages }
    };

    res.json(response);
  } catch (error) {
    res.status(500).json({
      success: false,
      error: "Internal server error"
    } as ApiResponse);
  }
};

// Search tourist IDs
export const searchTouristIds: RequestHandler = (req, res) => {
  try {
    const { query } = req.query as { query: string };
    
    if (!query) {
      return res.status(400).json({
        success: false,
        error: "Search query is required"
      } as ApiResponse);
    }

    const searchResults = Array.from(touristIdStore.values()).filter(tourist => 
      tourist.kycData.name.toLowerCase().includes(query.toLowerCase()) ||
      tourist.kycData.documentNumber.includes(query) ||
      tourist.kycData.phoneNumber.includes(query) ||
      tourist.kycData.email.toLowerCase().includes(query.toLowerCase())
    );

    const response: ApiResponse<TouristId[]> = {
      success: true,
      data: searchResults
    };

    res.json(response);
  } catch (error) {
    res.status(500).json({
      success: false,
      error: "Internal server error"
    } as ApiResponse);
  }
};