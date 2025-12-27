// src/services/api.js
import axios from 'axios';

// Create a configured instance (Optional, but professional)
const apiClient = axios.create({
  baseURL: '/data', // This means all calls will start with /data
  headers: {
    'Content-Type': 'application/json',
  },
});

// 1. FOREX SERVICE
export const getForexRates = async () => {
  try {
    const response = await apiClient.get('/forex.json');
    // Normalization logic can go here if needed
    return {
      rates: response.data.data.payload,
      date: response.data.data.date
    };
  } catch (error) {
    console.error("Forex API Error:", error);
    return { rates: [], date: '' };
  }
};

// 2. CALENDAR EVENTS SERVICE
export const getCalendarEvents = async () => {
  try {
    const response = await apiClient.get('/calendar_data.json');
    return {
      events: response.data.events,
      muhurts: response.data.muhurts
    };
  } catch (error) {
    console.error("Calendar API Error:", error);
    return { events: [], muhurts: {} };
  }
};

// 3. PANCHANGA SERVICE
export const getPanchanga = async () => {
  try {
    const response = await apiClient.get('/panchanga.json');
    return response.data;
  } catch (error) {
    console.error("Panchanga API Error:", error);
    return {};
  }
};

// 4. RASHIFAL SERVICE
export const getRashifal = async () => {
  try {
    const response = await apiClient.get('/rashifal.json');
    return response.data;
  } catch (error) {
    console.error("Rashifal API Error:", error);
    return [];
  }
};

// 5. SAPANA SERVICE
export const getDreamData = async () => {
  try {
    const response = await apiClient.get('/sapana.json');
    return response.data;
  } catch (error) {
    console.error("Sapana API Error:", error);
    return null;
  }
};