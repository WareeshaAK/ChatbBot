'use client';
import { useRouter } from 'next/navigation';
import { useUser, UserButton, SignedIn, SignedOut } from "@clerk/nextjs";
import './styles.css'; 

export default function Home() {
  const router = useRouter();
  const { isSignedIn, user } = useUser(); 

  const handleLogin = () => {
    router.push('/sign-in');
  };

  const handleSignUp = () => {
    router.push('/sign-up');
  };

  const handleGoToMain = () => {
    router.push('/main'); 
  };

  return (
    <div style={containerStyle}>
      <div style={leftSideStyle}>
        <h1 style={titleStyle}>
          <span style={initialStyle}>P</span>rompt<br />
          <span style={initialStyle}>A</span>utomated<br />
          <span style={initialStyle}>A</span>nswer<br />
          <span style={initialStyle}>W</span>izard
        </h1>
      </div>
      <div style={centerBoxStyle}>
        <h2 style={paawStyle}>PAAW</h2>
        <p style={subtitleStyle}>Quick Answers. Seamless Support.</p>
        <div style={buttonGroupStyle}>
          <SignedOut>
            <button style={{ ...buttonStyle, backgroundColor: 'white', color: '#2b2b2b', fontSize: '1.1rem' }} onClick={handleLogin}>Log In</button>
            <button style={{ ...buttonStyle, backgroundColor: '#d9d9d9', color: '#2b2b2b' }} onClick={handleSignUp}>Sign Up</button>
          </SignedOut>
          <SignedIn>
            <UserButton />
            {isSignedIn && user && (
              <>
                <div style={messageBubbleStyle}>
                  <p style={welcomeMessageStyle}>Welcome, {user.firstName} to PAAW</p>
                </div>
                <div style={secondMessageBubbleStyle}>
                  <p style={secondMessageTextStyle} className="typing">.</p>
                </div>
              </>
            )}
          </SignedIn>
        </div>
      </div>
      <div style={rightSideStyle}>
        <p style={rightSideTextStyle}>
          Introducing <span style={{ color: '#ffbd59' }}>PAAW</span> – your Prompt Automated Answer Wizard. This chatbot is
          designed to respond swiftly to your queries. Completely automated, with a
          touch of wizardry, <span style={{ color: '#ffbd59' }}>PAAW</span> effortlessly provides solutions, making your
          interaction smooth and efficient.
        </p>
        {isSignedIn && (
          <button style={mainPageButtonStyle} onClick={handleGoToMain}>PAAW Awaits</button>
        )}
      </div>
    </div>
  );
}

const containerStyle = {
  display: 'flex',
  flexWrap: 'wrap',
  justifyContent: 'space-between',
  alignItems: 'center',
  height: '100vh',
  backgroundColor: '#2b2b2b',
  padding: '0 50px',
  fontFamily: 'Century Gothic, sans-serif', 
};

const leftSideStyle = {
  flex: 1,
  display:'flex',
  flexWrap: 'wrap',
};

const titleStyle = {
  color: 'white',
  fontSize: '4rem',
  fontWeight: 'bold',
  lineHeight: '1.5',
};

const initialStyle = {
  color: '#ffbd59',
};

const centerBoxStyle = {
  flex: 1,
  display: 'flex',
  flexWrap: 'wrap',
  height: '90%',
  flexDirection: 'column',
  justifyContent: 'center', 
  alignItems: 'center',
  backgroundColor: '#f4f4f4',
  borderRadius: '30px',
  padding: '40px 20px', 
  maxWidth: '400px',
  position: 'relative', 
};

const paawStyle = {
  fontSize: '3.5rem',
  color: 'black',
  marginBottom: '10px',
  fontFamily: 'BernhardMod BT, serif', 
};

const subtitleStyle = {
  fontSize: '1.2rem',
  color: '#545454',
  marginBottom: '30px',
};

const buttonGroupStyle = {
  display: 'flex',
  flexWrap: 'wrap',
  flexDirection: 'column',
  alignItems: 'center',
  width: '100%',
  gap: '10px', 
};

const buttonStyle = {
  border: 'none',
  borderRadius: '20px',
  padding: '10px 20px',
  cursor: 'pointer',
  fontSize: '1rem',
  width: '100%',
  maxWidth: '100%',
};

const rightSideStyle = {
  flex: 1,
  color: 'white',
  fontSize: '1.1rem',
  lineHeight: '1.5',
  display: 'flex',
  flexWrap: 'wrap',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  padding: '0 20px',
  textAlign: 'center',
};

const rightSideTextStyle = {
  marginBottom: '20px',
};

const mainPageButtonStyle = {
  border: 'none',
  borderRadius: '20px',
  padding: '10px 20px',
  cursor: 'pointer',
  fontSize: '1rem',
  backgroundColor: '#ffbd59',
  color: '#2b2b2b',
  width: '100%',
  maxWidth: '200px',
};

const messageBubbleStyle = {
  position: 'absolute',
  bottom: '130px', 
  left: '10px',
  padding: '10px 20px',
  borderRadius: '15px',
  backgroundColor: '#545454',
  boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
  fontFamily: 'Verdana, sans-serif',
};

const secondMessageBubbleStyle = {
  position: 'absolute',
  bottom: '80px', 
  right: '10px',
  padding: '10px 20px',
  borderRadius: '15px',
  backgroundColor: '#bcbbbb',
  boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
  fontFamily: 'Verdana, sans-serif',
};

const welcomeMessageStyle = {
  fontSize: '1rem',
  color: 'white',
  fontFamily: 'Verdana, sans-serif',
};

const secondMessageTextStyle = {
  fontSize: '1rem',
  color: '#2b2b2b',
  fontFamily: 'Verdana, sans-serif',
};
