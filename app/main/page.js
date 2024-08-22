'use client';
import { useState, useEffect, useRef } from 'react';
import { Box, Stack, TextField, IconButton, CircularProgress } from '@mui/material';
import { styled } from '@mui/system';
import SendIcon from '@mui/icons-material/Send';
import StopIcon from '@mui/icons-material/Stop';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward'; 
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

const ChatContainer = styled(Box)({
    width: '100%',
    height: '100vh',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: "#2b2b2b",
    padding: '16px',
    boxSizing: 'border-box',
    fontFamily: 'Verdana, sans-serif',
    position: 'relative',
    cursor: 'auto', 
});

const ChatBox = styled(Stack)({
    width: '100%',
    maxWidth: '415px',
    height: '100%',
    border: '1px solid #d1d5db',
    borderRadius: '40px',
    padding: '16px',
    backgroundColor: '#f4f4f4',
    overflowY: 'scroll', 
    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
    marginBottom: '8px',
    fontFamily: 'Verdana, sans-serif',
    flexGrow: 1,
    cursor: 'auto', 
    '&::-webkit-scrollbar': {
        display: 'none', 
    },
});

const MessageBubble = styled(Box)(({ role }) => ({
    backgroundColor: role === 'assistant' ? '#545454' : '#bcbbbb',
    color: role === 'assistant' ? '#ffffff' : '#2b2b2b',
    borderRadius: '20px',
    padding: '10px',
    maxWidth: '75%',
    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
    alignSelf: role === 'assistant' ? 'flex-start' : 'flex-end',
    marginBottom: '8px',
    fontFamily: 'Verdana, sans-serif',
    wordBreak: 'break-word',
    fontSize: '15px',
    '& p': {
        margin: '0',
        fontSize: '15px',
        fontWeight: 'normal',
    },
    '& ul': {
        paddingLeft: '20px',
        listStyleType: 'disc',
        margin: '0',
    },
    '& ol': {
        paddingLeft: '20px',
        margin: '0',
    },
    '& li': {
        marginBottom: '4px',
        fontSize: '15px',
        fontWeight: 'normal',
        lineHeight: '1.5',
    },
    '& h1, & h2, & h3': {
        fontWeight: 'bold',
        margin: '8px 0',
    },
    '& h1': {
        fontSize: '20px',
    },
    '& h2': {
        fontSize: '18px',
    },
    '& h3': {
        fontSize: '16px',
    },
}));

const InputContainer = styled(Stack)({
    width: '100%',
    maxWidth: '600px',
    flexDirection: 'row',
    alignItems: 'center',
    gap: '8px',
    fontFamily: 'Verdana, sans-serif',
    position: 'relative',
    cursor: 'auto', 
});

const InputField = styled(TextField)({
    flex: 1,
    fontFamily: 'Verdana, sans-serif',
    fontSize: '15px',
    borderRadius: '20px',
    backgroundColor: 'white',
    '& .MuiOutlinedInput-root': {
        borderRadius: '20px',
    },
});

export default function Home() {
    const [messages, setMessages] = useState([{ role: 'assistant', content: "Just ask and I'll do my best to help!" }]);
    const [input, setInput] = useState('');
    const [isTyping, setIsTyping] = useState(false);
    const [assistantTypingText, setAssistantTypingText] = useState('');
    const endOfChatRef = useRef(null);
    const chatBoxRef = useRef(null);

    // Function to send a message
    const sendMessage = async () => {
        try {
            const newMessage = { role: 'user', content: input };
            setMessages([...messages, newMessage]);
            setInput('');
            setIsTyping(true);
            setAssistantTypingText('Assistant is typing...');

            const response = await fetch('/api/chat', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ query: input }),
            });
            const data = await response.json();
            setMessages([...messages, newMessage, { role: 'assistant', content: data.data.generated_text }]);
        } catch (error) {
            console.error('Error:', error);
        } finally {
            setIsTyping(false);
            setAssistantTypingText('');
        }
    };

    useEffect(() => {
        endOfChatRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages]);

    return (
        <ChatContainer>
            <Box sx={{ position: 'absolute', top: '16px', left: '16px', fontFamily: 'BernhardMod BT', fontSize: '55px', color: '#ffffff' }}>
                PAAW
            </Box>
            <ChatBox ref={chatBoxRef}>
                <Stack direction="column" spacing={2} flexGrow={1}>
                    {messages.map((message, index) => (
                        <MessageBubble key={index} role={message.role}>
                            <ReactMarkdown remarkPlugins={[remarkGfm]}>
                                {message.content}
                            </ReactMarkdown>
                        </MessageBubble>
                    ))}
                    {assistantTypingText && (
                        <MessageBubble role="assistant">
                            <ReactMarkdown remarkPlugins={[remarkGfm]}>
                                {assistantTypingText}
                            </ReactMarkdown>
                        </MessageBubble>
                    )}
                    <div ref={endOfChatRef} /> {/* For auto-scrolling */}
                </Stack>
                <InputContainer>
                    <InputField 
                        label="Chat with PAAW..."
                        fullWidth
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        onKeyPress={(e) => {
                            if (e.key === 'Enter') {
                                e.preventDefault();
                                sendMessage();
                            }
                        }}
                        variant="outlined"
                    />
                    <IconButton 
                        onClick={sendMessage} 
                        style={{ 
                            backgroundColor: isTyping ? '#3c3c3c' : '#2b2b2b',  
                            color: '#ffffff', 
                            padding: '8px', 
                            fontSize: 'medium',
                        }}
                    >
                        {isTyping ? <StopIcon fontSize="small" /> : <ArrowUpwardIcon fontSize="small" />}  {/* Switch icons based on typing state */}
                    </IconButton>
                </InputContainer>
            </ChatBox>
        </ChatContainer>
    );
}
