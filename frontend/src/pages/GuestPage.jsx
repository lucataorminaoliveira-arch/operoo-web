import { useState, useRef, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useParams } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Logo } from '@/components/Logo';
import { Send, ArrowLeft } from 'lucide-react';

const mockMessages = [
  { id: 1, from: 'reception', text: 'Welcome to Operoo! How can we help you today?', time: '10:00' },
  { id: 2, from: 'reception', text: 'Feel free to ask about room service, amenities, or anything else.', time: '10:00' },
];

function RoomEntry({ onSubmit }) {
  const { t } = useTranslation();
  const [room, setRoom] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (room.trim()) onSubmit(room.trim());
  };

  return (
    <div className="min-h-screen flex flex-col bg-[hsl(var(--sidebar))]" data-testid="guest-room-entry">
      {/* Header */}
      <header className="border-b bg-card px-5 py-4">
        <Logo size="sm" />
      </header>

      {/* Content */}
      <div className="flex-1 flex items-center justify-center px-5">
        <div className="w-full max-w-xs text-center">
          <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-primary/10">
            <svg className="h-8 w-8 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 21v-4.875c0-.621.504-1.125 1.125-1.125h5.25c.621 0 1.125.504 1.125 1.125V21m0 0h4.5V3.545M12.75 21h7.5M10.5 21V8.545M3.75 21h6.75M3.75 21V3.545m0 0h16.5m-16.5 0L12 1.5l8.25 2.045" />
            </svg>
          </div>
          <h1 className="text-2xl font-bold tracking-tight mb-2" data-testid="room-entry-title">
            {t('guest.enterRoom')}
          </h1>
          <p className="text-sm text-muted-foreground mb-8">{t('guest.enterRoomDesc')}</p>

          <form onSubmit={handleSubmit} className="space-y-4">
            <Input
              type="text"
              inputMode="numeric"
              value={room}
              onChange={(e) => setRoom(e.target.value)}
              placeholder={t('guest.roomPlaceholder')}
              className="h-12 text-center text-lg font-semibold tracking-widest"
              autoFocus
              data-testid="room-number-input"
            />
            <Button
              type="submit"
              className="w-full h-12 text-base"
              disabled={!room.trim()}
              data-testid="room-submit-button"
            >
              {t('guest.continue')}
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
}

function Chat({ roomNumber, onBack }) {
  const { t } = useTranslation();
  const [messages, setMessages] = useState(mockMessages);
  const [input, setInput] = useState('');
  const bottomRef = useRef(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const sendMessage = (e) => {
    e.preventDefault();
    if (!input.trim()) return;
    const now = new Date();
    const time = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

    setMessages((prev) => [
      ...prev,
      { id: Date.now(), from: 'guest', text: input.trim(), time },
    ]);
    setInput('');

    // Mock auto-reply after 1.5s
    setTimeout(() => {
      const replyTime = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
      setMessages((prev) => [
        ...prev,
        { id: Date.now() + 1, from: 'reception', text: t('guest.autoReply'), time: replyTime },
      ]);
    }, 1500);
  };

  return (
    <div className="h-screen flex flex-col bg-[hsl(var(--sidebar))]" data-testid="guest-chat">
      {/* Chat Header */}
      <header className="shrink-0 border-b bg-card px-4 py-3 flex items-center gap-3" data-testid="chat-header">
        <Button variant="ghost" size="icon" className="h-8 w-8 shrink-0" onClick={onBack} data-testid="chat-back">
          <ArrowLeft className="h-4 w-4" />
        </Button>
        <div className="flex items-center gap-3 flex-1 min-w-0">
          <div className="relative shrink-0">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary text-primary-foreground text-sm font-semibold">
              R
            </div>
            <div className="absolute -bottom-0.5 -right-0.5 h-3 w-3 rounded-full bg-emerald-500 ring-2 ring-card" />
          </div>
          <div className="min-w-0">
            <p className="font-semibold text-sm" data-testid="chat-title">{t('guest.reception')}</p>
            <p className="text-xs text-emerald-600" data-testid="chat-status">{t('guest.online')}</p>
          </div>
        </div>
        <div className="text-xs text-muted-foreground shrink-0" data-testid="chat-room">
          {t('guest.room')} {roomNumber}
        </div>
      </header>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto px-4 py-4 space-y-3" data-testid="chat-messages">
        {messages.map((msg) => {
          const isGuest = msg.from === 'guest';
          return (
            <div
              key={msg.id}
              className={`flex ${isGuest ? 'justify-end' : 'justify-start'}`}
              data-testid={`message-${msg.id}`}
            >
              <div
                className={`max-w-[80%] rounded-2xl px-4 py-2.5 ${
                  isGuest
                    ? 'bg-primary text-primary-foreground rounded-br-md'
                    : 'bg-card border rounded-bl-md'
                }`}
              >
                <p className="text-sm leading-relaxed">{msg.text}</p>
                <p className={`text-[10px] mt-1 ${isGuest ? 'text-primary-foreground/60' : 'text-muted-foreground'}`}>
                  {msg.time}
                </p>
              </div>
            </div>
          );
        })}
        <div ref={bottomRef} />
      </div>

      {/* Input */}
      <div className="shrink-0 border-t bg-card px-4 py-3 pb-5" data-testid="chat-input-area">
        <form onSubmit={sendMessage} className="flex items-center gap-2">
          <Input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder={t('guest.typePlaceholder')}
            className="flex-1 h-11 rounded-full px-4"
            data-testid="chat-input"
          />
          <Button
            type="submit"
            size="icon"
            className="h-11 w-11 rounded-full shrink-0"
            disabled={!input.trim()}
            data-testid="chat-send-button"
          >
            <Send className="h-4 w-4" />
          </Button>
        </form>
      </div>
    </div>
  );
}

export default function GuestPage() {
  const { token } = useParams();
  const [roomNumber, setRoomNumber] = useState(null);

  if (!roomNumber) {
    return <RoomEntry onSubmit={setRoomNumber} />;
  }

  return <Chat roomNumber={roomNumber} onBack={() => setRoomNumber(null)} />;
}
