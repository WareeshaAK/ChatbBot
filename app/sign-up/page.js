import { SignUp } from "@clerk/nextjs";

export default function Page() {
  return (
    <div style={containerStyle}>
      <SignUp />
    </div>
  );
}

const containerStyle = {
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  height: '100vh',
  width: '100vw',
  backgroundColor: '#f1f1f0', 
};
