
const ContactEmailTemplate = ({ name, email, subject, userMessage }) => {
    const message = `
        Hello pro.minhaj,

        I hope this message finds you well. I am writing to reach out regarding ${subject}. Here are the details:

        - Name: ${name}
        - Email: ${email}
        - Subject: ${subject}

        ${userMessage}

        Thank you for your time and I look forward to your response.

        Best regards,
        ${name}
    `;

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
            <p style={{ fontSize: '16px', whiteSpace: 'pre-line' }}>{message}</p>
        </div>
    );
};

export default ContactEmailTemplate;