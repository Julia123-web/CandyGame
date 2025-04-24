import { useState, FormEvent, ChangeEvent } from 'react';
import { submitPhoneNumber } from '../services/api';
import { PhoneResponse } from '../types';
import '../styles/Form.css';

interface PhoneFormProps {
  onSuccess: (data: PhoneResponse) => void;
}

const PhoneForm = ({ onSuccess }: PhoneFormProps) => {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const formatPhoneNumber = (phone: string): string => {
    const cleaned = phone.replace(/\D/g, '');
    
    // If the input starts with a plus, keep it
    if (phone.startsWith('+')) {
      return '+' + cleaned;
    }
    
    // If no plus, add it at the start
    return '+' + cleaned;
  };

  const validatePhone = (phone: string): boolean => {
    const phoneRegex = /^\+\d{7,15}$/;
    return phoneRegex.test(phone);
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError('');

    const formattedPhone = formatPhoneNumber(phoneNumber);
    console.log('Formatted phone:', formattedPhone);
    
    if (!validatePhone(formattedPhone)) {
      setError('Please enter a valid phone number with country code (e.g. +31612345678)');
      return;
    }

    setIsLoading(true);
    try {
      const response = await submitPhoneNumber(formattedPhone);
      console.log('API Response:', response);
      onSuccess(response);
    } catch (err) {
      console.error('API Error:', err);
      setError(err instanceof Error ? err.message : 'Failed to submit phone number. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handlePhoneChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    // Allow digits, plus sign at start, and spaces
    if (/^[+\d\s]*$/.test(value)) {
      setPhoneNumber(value);
    }
  };

  return (
    <div className="form-container">
      <h3>Enter your phone number to start your candy journey!</h3>

      <form onSubmit={handleSubmit}>
        <div className="input-group">
          <div className="phone-input-container">
            <div className="phone-icon">📱</div>
            <input
              type="tel"
              className="phone-input"
              value={phoneNumber}
              onChange={handlePhoneChange}
              placeholder="+ Enter your phone number"
              disabled={isLoading}
            />
          </div>
          {error && <p className="error-message">{error}</p>}
        </div>

        <button 
          type="submit" 
          className="submit-button"
          disabled={isLoading}
        >
          {isLoading ? 'Sending...' : 'Send Me the code'}
        </button>
      </form>
    </div>
  );
};

export default PhoneForm;
