import '../styles/Form.css';

interface ThankYouProps {
  productUrl: string;
}

const ThankYou = ({ productUrl }: ThankYouProps) => {
  const handlePlayClick = () => {
    window.open(productUrl, '_blank', 'noopener,noreferrer');
  };

  return (
    <div className="form-container">
      <h3>🎉 Thank you!</h3>
      <p className="form-description">
        Your game is ready! Click the button below to start playing.
      </p>
      <button 
        onClick={handlePlayClick}
        className="submit-button"
      >
        Play Now!
      </button>
    </div>
  );
};

export default ThankYou;
