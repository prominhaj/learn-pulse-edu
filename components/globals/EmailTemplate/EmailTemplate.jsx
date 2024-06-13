
const EmailTemplate = ({ message }) => {
    return (
        <div style={{
            fontFamily: 'Arial, sans-serif',
            lineHeight: '1.6',
            color: '#333',
            maxWidth: '600px',
            margin: '0 auto',
            padding: '20px',
            border: '1px solid #ddd',
            borderRadius: '8px',
            backgroundColor: '#f9f9f9'
        }}>
            <p style={{ fontSize: '16px' }}>{message}</p>
        </div>
    );
};

export default EmailTemplate;
