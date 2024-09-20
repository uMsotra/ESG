import React, { useRef } from 'react';
import html2canvas from 'html2canvas';

const Certificate = ({ userName, score, onTryAgain }) => {
  const certificateRef = useRef(null);

  const downloadCertificate = () => {
    html2canvas(certificateRef.current).then((canvas) => {
      const link = document.createElement('a');
      link.download = 'UCT_Science_is_Tough_Certificate.png';
      link.href = canvas.toDataURL();
      link.click();
    });
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100vh', backgroundColor: '#f5f5f5', padding: '20px' }}>
      <div ref={certificateRef} style={{
        width: '600px', // Adjusted size
        height: '450px', // Adjusted size
        border: '2px solid #003366',
        padding: '30px',
        textAlign: 'center',
        fontFamily: 'Arial, sans-serif',
        backgroundImage: 'linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)',
        position: 'relative',
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
        borderRadius: '10px',
        marginBottom: '20px',
      }}>
        <img 
          src="src/assets/uctlogo.png" 
          alt="UCT Emblem" 
          style={{
            position: 'absolute',
            top: '20px',
            left: '20px',
            width: '120px', // Adjusted size
            height: 'auto',
          }}
        />
        <h1 style={{ color: '#003366', marginTop: '60px', fontSize: '28px', fontWeight: 'bold' }}>Certificate of Achievement</h1>
        <h2 style={{ color: '#006699', fontSize: '22px', fontWeight: 'normal' }}>UCT Science is Tough (But So Are You!)</h2>
        <p style={{ fontSize: '18px', margin: '30px 0', fontWeight: 'normal' }}>This certifies that</p>
        <p style={{ fontSize: '30px', fontWeight: 'bold', color: '#006699', margin: '10px 0' }}>{userName}</p>
        <p style={{ fontSize: '18px', margin: '30px 0', fontWeight: 'normal' }}>has successfully engaged with</p>
        <p style={{ fontSize: '24px', fontWeight: 'bold', color: '#006699', margin: '10px 0' }}>Science is Tough Material</p>
        <p style={{ fontSize: '18px', margin: '30px 0', fontWeight: 'normal' }}>with a score of {score} points</p>
        <p style={{ fontSize: '16px', marginTop: '40px', fontWeight: 'normal' }}>Date: {new Date().toLocaleDateString()}</p>

        {/* Star emblem at the bottom right */}
        <img 
          src="src/assets/star.png" 
          alt="Star Emblem" 
          style={{
            position: 'absolute',
            bottom: '20px',
            right: '20px',
            width: '160px', // Adjust size as needed
            height: 'auto',
          }}
        />
      </div>
      <div style={{ display: 'flex', gap: '10px' }}>
        <button onClick={downloadCertificate} style={{
          padding: '10px 20px',
          fontSize: '16px',
          backgroundColor: '#006699',
          color: 'white',
          border: 'none',
          borderRadius: '5px',
          cursor: 'pointer',
          boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
          transition: 'background-color 0.3s ease'
        }}>
          Download Certificate
        </button>
      </div>
    </div>
  );
};

export default Certificate;
