import { v4 as uuidv4 } from 'uuid';
import { PhoneResponse, PinResponse } from '../types';

const MOCK_MODE = true;
const MOCK_DELAY = 1000;

const mockDelay = () => new Promise(resolve => setTimeout(resolve, MOCK_DELAY));

export const submitPhoneNumber = async (phoneNumber: string): Promise<PhoneResponse> => {
  if (MOCK_MODE) {
    await mockDelay();
    
    // Generate a random PIN for testing
    const pin = Math.floor(1000 + Math.random() * 9000).toString();
    const userId = uuidv4();
    
    console.log('Mock PIN:', pin);
    
    return {
      success: true,
      userId: userId,
      msisdn: phoneNumber,
      pin: pin
    };
  }

  try {
    const response = await fetch('/api/submit-phone', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ phoneNumber }),
    });

    if (!response.ok) {
      throw new Error('Failed to submit phone number');
    }

    return await response.json();
  } catch (error) {
    console.error('API Error:', error);
    throw new Error('Failed to submit phone number. Please try again.');
  }
};

export const submitPin = async (userId: string, pin: string): Promise<PinResponse> => {
  if (MOCK_MODE) {
    await mockDelay();
    
    return {
      success: true,
      userId: userId,
      productUrl: 'https://example.com/candy-game'
    };
  }

  try {
    const response = await fetch('/api/verify-pin', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ userId, pin }),
    });

    if (!response.ok) {
      throw new Error('Invalid PIN code');
    }

    return await response.json();
  } catch (error) {
    console.error('API Error:', error);
    throw new Error('Failed to verify PIN. Please try again.');
  }
};
