import { useState, FormEvent, ChangeEvent } from 'react';
import { submitPin } from '../services/api';
import { PinResponse } from '../types';
import '../styles/Form.css';

interface PinFormProps {
  userId: string;
  onSuccess: (productUrl: string) => void;
}

const PinForm = ({ userId, onSuccess }: PinFormProps) => {
  const [pin, setPin] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const validatePin = (pin: string): boolean => {
    return /^\d{4}$/.test(pin);
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError('');

    if (!validatePin(pin)) {
      setError('Please enter a valid 4-digit PIN');
      return;
    }

    setIsLoading(true);
    try {
      const response = await submitPin(userId, pin);
      console.log('API Response:', response);
      onSuccess(response.productUrl);
    } catch (err) {
      console.error('API Error:', err);
      setError(err instanceof Error ? err.message : 'Failed to verify PIN. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handlePinChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (/^\d{0,4}$/.test(value)) {
      setPin(value);
    }
  };

  return (
    <div className="form-container">
      <p className="form-description">
        Enter the 4-digit PIN code we sent to your phone to access the game!
      </p>

      <form onSubmit={handleSubmit}>
        <div className="input-group">
          <input
            type="tel"
            className="pin-input"
            value={pin}
            onChange={handlePinChange}
            placeholder="Enter PIN"
            maxLength={4}
            disabled={isLoading}
          />
          {error && <p className="error-message">{error}</p>}
        </div>

        <button 
          type="submit" 
          className="submit-button"
          disabled={isLoading}
        >
          {isLoading ? 'Verifying...' : 'Verify PIN'}
        </button>
      </form>
    </div>
  );
};

export default PinForm;
