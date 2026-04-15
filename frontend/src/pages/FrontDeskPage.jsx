import { useState, useRef, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Send, ArrowLeft } from 'lucide-react';
import { cn } from '@/lib/utils';

const mockConversations = [
  {
    id: 'conv_1', room: '204', type: 'room', guestName: 'Guest',
    unread: 2, status: 'active', updatedAt: '10:05',
    messages: [
      { id: 1, from: 'guest', text: 'Hello, can I get extra towels please?', time: '10:02' },
      { id: 2, from: 'desk', text: 'Of course! We will send them right away.', time: '10:03' },
      { id: 3, from: 'guest', text: 'Also, is the pool open until what time?', time: '10:04' },
      { id: 4, from: 'guest', text: 'Can I get towels for the pool too?', time: '10:05' },
    ],
  },
  {
    id: 'conv_2', room: 'T12', type: 'table', guestName: 'Guest',
    unread: 1, status: 'waiting', updatedAt: '09:58',
    messages: [
      { id: 1, from: 'guest', text: 'Can we get the bill please?', time: '09:55' },
      { id: 2, from: 'desk', text: 'Right away! Your server will bring it shortly.', time: '09:56' },
      { id: 3, from: 'guest', text: 'Thank you. Also, can we get a takeaway box?', time: '09:58' },
    ],
  },
  {
    id: 'conv_3', room: '118', type: 'room', guestName: 'Guest',
    unread: 0, status: 'active', updatedAt: '09:45',
    messages: [
      { id: 1, from: 'guest', text: 'Good morning! What time is breakfast?', time: '09:30' },
      { id: 2, from: 'desk', text: 'Good morning! Breakfast is served from 7:00 to 10:30 in the main restaurant.', time: '09:31' },
      { id: 3, from: 'guest', text: 'Perfect, thank you!', time: '09:32' },
      { id: 4, from: 'desk', text: 'You are welcome. Enjoy your stay!', time: '09:33' },
    ],
  },
  {
    id: 'conv_4', room: 'T5', type: 'table', guestName: 'Guest',
    unread: 0, status: 'active', updatedAt: '09:20',
    messages: [
      { id: 1, from: 'guest', text: 'Is there a gluten-free menu available?', time: '09:15' },
      { id: 2, from: 'desk', text: 'Yes! We have a full gluten-free menu. Your server will bring it to you.', time: '09:17' },
      { id: 3, from: 'guest', text: 'Great, thanks!', time: '09:20' },
    ],
  },
  {
    id: 'conv_5', room: '302', type: 'room', guestName: 'Guest',
    unread: 1, status: 'waiting', updatedAt: '09:10',
    messages: [
      { id: 1, from: 'guest', text: 'The AC in our room is making a strange noise.', time: '09:05' },
      { id: 2, from: 'desk', text: 'We apologize for the inconvenience. Our maintenance team will check it right away.', time: '09:07' },
      { id: 3, from: 'guest', text: 'How long will it take?', time: '09:10' },
    ],
  },
];

function ConversationList({ conversations, activeId, onSelect }) {
  const { t } = useTranslation();

  return (
    <div className="h-full flex flex-col" data-testid="conversation-list">
      {/* Header */}
      <div className="shrink-0 border-b px-5 py-4">
        <h1 className="text-lg font-bold" data-testid="frontdesk-title">{t('frontDesk.title')}</h1>
        <p className="text-xs text-muted-foreground mt-0.5">{t('frontDesk.subtitle')}</p>
      </div>

      {/* List */}
      <div className="flex-1 overflow-y-auto">
        {conversations.map((conv) => {
          const lastMsg = conv.messages[conv.messages.length - 1];
          const isActive = conv.id === activeId;
          const label = conv.type === 'room' ? `${t('frontDesk.room')} ${conv.room}` : `${t('frontDesk.table')} ${conv.room}`;

          return (
            <button
              key={conv.id}
              onClick={() => onSelect(conv.id)}
              className={cn(
                'w-full text-left px-5 py-3.5 border-b transition-colors',
                isActive ? 'bg-primary/5' : 'hover:bg-muted/50',
              )}
              data-testid={`conv-${conv.id}`}
            >
              <div className="flex items-center justify-between mb-1">
                <div className="flex items-center gap-2">
                  <span className="font-semibold text-sm">{label}</span>
                  {conv.status === 'waiting' && (
                    <Badge variant="outline" className="text-[9px] px-1.5 py-0 text-amber-600 border-amber-200 bg-amber-50">
                      {t('frontDesk.waiting')}
                    </Badge>
                  )}
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-[10px] text-muted-foreground">{conv.updatedAt}</span>
                  {conv.unread > 0 && (
                    <div className="flex h-5 w-5 items-center justify-center rounded-full bg-primary text-[10px] font-bold text-primary-foreground" data-testid={`unread-${conv.id}`}>
                      {conv.unread}
                    </div>
                  )}
                </div>
              </div>
              <p className="text-xs text-muted-foreground truncate">{lastMsg?.text}</p>
            </button>
          );
        })}
      </div>
    </div>
  );
}

function ChatPanel({ conversation, onSend, onBack }) {
  const { t } = useTranslation();
  const [input, setInput] = useState('');
  const bottomRef = useRef(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [conversation?.messages]);

  if (!conversation) {
    return (
      <div className="h-full flex items-center justify-center text-muted-foreground text-sm" data-testid="no-chat-selected">
        {t('frontDesk.selectChat')}
      </div>
    );
  }

  const label = conversation.type === 'room'
    ? `${t('frontDesk.room')} ${conversation.room}`
    : `${t('frontDesk.table')} ${conversation.room}`;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!input.trim()) return;
    onSend(conversation.id, input.trim());
    setInput('');
  };

  return (
    <div className="h-full flex flex-col" data-testid="chat-panel">
      {/* Header */}
      <div className="shrink-0 border-b px-4 py-3 flex items-center gap-3" data-testid="chat-panel-header">
        <Button variant="ghost" size="icon" className="h-8 w-8 shrink-0 lg:hidden" onClick={onBack} data-testid="chat-panel-back">
          <ArrowLeft className="h-4 w-4" />
        </Button>
        <div className="flex items-center gap-3 flex-1 min-w-0">
          <div className="flex h-9 w-9 items-center justify-center rounded-full bg-primary/10 text-primary text-xs font-bold shrink-0">
            {conversation.room}
          </div>
          <div className="min-w-0">
            <p className="font-semibold text-sm" data-testid="chat-panel-room">{label}</p>
            <p className={cn('text-xs', conversation.status === 'waiting' ? 'text-amber-600' : 'text-emerald-600')} data-testid="chat-panel-status">
              {conversation.status === 'waiting' ? t('frontDesk.waiting') : t('frontDesk.active')}
            </p>
          </div>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto px-4 py-4 space-y-3 bg-[hsl(var(--sidebar))]" data-testid="chat-panel-messages">
        {conversation.messages.map((msg) => {
          const isDesk = msg.from === 'desk';
          return (
            <div
              key={msg.id}
              className={`flex ${isDesk ? 'justify-end' : 'justify-start'}`}
              data-testid={`panel-msg-${msg.id}`}
            >
              <div
                className={cn(
                  'max-w-[75%] rounded-2xl px-4 py-2.5',
                  isDesk
                    ? 'bg-primary text-primary-foreground rounded-br-md'
                    : 'bg-card border rounded-bl-md'
                )}
              >
                <p className="text-sm leading-relaxed">{msg.text}</p>
                <p className={cn('text-[10px] mt-1', isDesk ? 'text-primary-foreground/60' : 'text-muted-foreground')}>
                  {msg.time}
                </p>
              </div>
            </div>
          );
        })}
        <div ref={bottomRef} />
      </div>

      {/* Input */}
      <div className="shrink-0 border-t bg-card px-4 py-3" data-testid="chat-panel-input">
        <form onSubmit={handleSubmit} className="flex items-center gap-2">
          <Input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder={t('frontDesk.typePlaceholder')}
            className="flex-1 h-10 rounded-full px-4"
            data-testid="desk-chat-input"
          />
          <Button
            type="submit"
            size="icon"
            className="h-10 w-10 rounded-full shrink-0"
            disabled={!input.trim()}
            data-testid="desk-chat-send"
          >
            <Send className="h-4 w-4" />
          </Button>
        </form>
      </div>
    </div>
  );
}

export default function FrontDeskPage() {
  const [conversations, setConversations] = useState(mockConversations);
  const [activeId, setActiveId] = useState(null);
  const [mobileChat, setMobileChat] = useState(false);

  const activeConv = conversations.find((c) => c.id === activeId) || null;

  const handleSelect = (id) => {
    setActiveId(id);
    setMobileChat(true);
    // Clear unread
    setConversations((prev) =>
      prev.map((c) => (c.id === id ? { ...c, unread: 0 } : c))
    );
  };

  const handleSend = (convId, text) => {
    const time = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    setConversations((prev) =>
      prev.map((c) =>
        c.id === convId
          ? { ...c, messages: [...c.messages, { id: Date.now(), from: 'desk', text, time }], updatedAt: time, status: 'active' }
          : c
      )
    );
  };

  const handleBack = () => setMobileChat(false);

  return (
    <div className="h-[calc(100vh-3.5rem)] flex" data-testid="frontdesk-page">
      {/* Left: Conversation List */}
      <div className={cn(
        'w-full lg:w-80 xl:w-96 shrink-0 border-r bg-card',
        mobileChat ? 'hidden lg:block' : 'block'
      )}>
        <ConversationList
          conversations={conversations}
          activeId={activeId}
          onSelect={handleSelect}
        />
      </div>

      {/* Right: Active Chat */}
      <div className={cn(
        'flex-1 min-w-0',
        !mobileChat ? 'hidden lg:block' : 'block'
      )}>
        <ChatPanel
          conversation={activeConv}
          onSend={handleSend}
          onBack={handleBack}
        />
      </div>
    </div>
  );
}
