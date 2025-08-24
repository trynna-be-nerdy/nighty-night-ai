import { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Send, MessageCircle, Lightbulb } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

const Coach = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      role: 'assistant',
      content: "Hello! I'm your AI sleep coach. I'm here to help you improve your sleep using evidence-based CBT-I techniques. How can I support your sleep journey today?",
      timestamp: new Date(),
    },
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const quickQuestions = [
    "Why do I wake up at 3am?",
    "How can I fall asleep faster?",
    "Should I change my bedtime?",
    "What's sleep restriction therapy?",
  ];

  const handleSendMessage = async (messageContent?: string) => {
    const content = messageContent || inputMessage.trim();
    if (!content) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content,
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMessage]);
    setInputMessage('');
    setIsTyping(true);

    // Simulate AI response delay
    setTimeout(() => {
      const aiResponse = generateAIResponse(content);
      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: aiResponse,
        timestamp: new Date(),
      };
      
      setMessages(prev => [...prev, assistantMessage]);
      setIsTyping(false);
    }, 1500);
  };

  const generateAIResponse = (userMessage: string): string => {
    const lowerMessage = userMessage.toLowerCase();
    
    if (lowerMessage.includes('wake up') && lowerMessage.includes('3am')) {
      return "Waking up at 3am is common and can be caused by several factors:\n\n• **Natural sleep cycles** - You may be transitioning between sleep stages\n• **Stress or anxiety** - Your mind might be processing daily concerns\n• **Environment** - Temperature, noise, or light changes\n• **Lifestyle factors** - Late meals, caffeine, or screen time\n\nTry these evidence-based strategies:\n1. **Don't check the time** - This reduces anxiety about being awake\n2. **Stay in bed** unless awake for 15+ minutes\n3. **Practice the 4-7-8 breathing technique**\n4. **Use progressive muscle relaxation**\n\nWould you like me to guide you through any of these techniques?";
    }
    
    if (lowerMessage.includes('fall asleep') || lowerMessage.includes('sleep faster')) {
      return "Here are proven techniques to fall asleep faster:\n\n**Stimulus Control (most effective):**\n• Only use your bed for sleep and intimacy\n• If not asleep in 15-20 minutes, get up and do a quiet activity\n• Return to bed when sleepy\n\n**Wind-down Routine:**\n• Start 30-60 minutes before bed\n• Dim lights and avoid screens\n• Try relaxation techniques\n\n**Sleep Environment:**\n• Cool temperature (65-68°F)\n• Dark and quiet room\n• Comfortable mattress and pillows\n\n**Cognitive Techniques:**\n• Practice gratitude or positive imagery\n• Try the 'paradoxical intention' - try to stay awake instead\n\nYour current sleep efficiency is 78% - we can work on optimizing your sleep window. Would you like me to suggest adjustments?";
    }
    
    if (lowerMessage.includes('bedtime') || lowerMessage.includes('sleep schedule')) {
      return "Based on your current data, your sleep efficiency is 78%, which suggests room for improvement.\n\n**Sleep Window Optimization:**\n• Your current time in bed might be too long\n• Consider moving your bedtime 15 minutes later\n• Keep your wake time fixed at 6:30 AM\n\n**Why this works:**\n• It consolidates your sleep\n• Reduces time lying awake in bed\n• Builds stronger sleep drive\n\n**Safety guardrails:**\n• We won't go below 6 hours in bed\n• We'll monitor your daytime alertness\n• Changes will be gradual (15-min adjustments)\n\nShall I propose a specific sleep window adjustment for this week?";
    }
    
    if (lowerMessage.includes('sleep restriction') || lowerMessage.includes('srt')) {
      return "Sleep Restriction Therapy (SRT) is a core CBT-I technique that's highly effective:\n\n**How it works:**\n• Limits time in bed to actual sleep time\n• Creates mild sleep deprivation\n• Builds stronger sleep drive\n• Consolidates fragmented sleep\n\n**The process:**\n1. **Calculate** your average total sleep time from sleep diary\n2. **Set** time in bed to match (minimum 6 hours)\n3. **Keep** wake time fixed\n4. **Adjust** bedtime weekly based on sleep efficiency\n\n**Expected timeline:**\n• Week 1-2: May feel more tired initially\n• Week 3-4: Sleep becomes more consolidated\n• Week 4-6: Gradual increase in time in bed as efficiency improves\n\n**Safety measures:**\n• No driving if severely sleepy\n• Monitor mood and functioning\n• Professional guidance recommended\n\nWould you like me to walk you through a gentle version tailored to your current sleep pattern?";
    }
    
    // Default response
    return "I understand you're looking for sleep guidance. As your AI sleep coach, I use evidence-based CBT-I principles to help improve your sleep.\n\nSome areas I can help with:\n• **Sleep hygiene** and environment optimization\n• **Stimulus control** techniques\n• **Sleep window optimization** (gentle sleep restriction)\n• **Cognitive strategies** for racing thoughts\n• **Relaxation techniques** for wind-down\n\nCould you tell me more specifically what sleep challenge you're facing? For example:\n- Trouble falling asleep?\n- Frequent night wakings?\n- Early morning awakening?\n- Poor sleep quality?\n\nThe more specific you are, the better I can tailor my guidance to your needs.";
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Header */}
      <header className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center gap-4">
          <Link to="/">
            <Button variant="ghost" size="icon" className="rounded-full">
              <ArrowLeft className="w-5 h-5" />
            </Button>
          </Link>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-sleep-accent to-sleep-glow flex items-center justify-center">
              <MessageCircle className="w-5 h-5 text-accent-foreground" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-foreground">AI Sleep Coach</h1>
              <p className="text-sm text-muted-foreground">Evidence-based guidance</p>
            </div>
          </div>
        </div>
      </header>

      {/* Quick Questions (only show if no conversation yet) */}
      {messages.length === 1 && (
        <div className="container mx-auto px-4 py-4">
          <Card className="sleep-card">
            <CardContent className="pt-4">
              <div className="flex items-center gap-2 mb-3">
                <Lightbulb className="w-4 h-4 text-sleep-accent" />
                <span className="text-sm font-medium text-foreground">Quick Questions</span>
              </div>
              <div className="grid grid-cols-1 gap-2">
                {quickQuestions.map((question, index) => (
                  <Button
                    key={index}
                    variant="outline"
                    size="sm"
                    className="justify-start text-left h-auto py-2 px-3 border-border"
                    onClick={() => handleSendMessage(question)}
                  >
                    {question}
                  </Button>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Messages */}
      <div className="flex-1 container mx-auto px-4 pb-4">
        <ScrollArea className="h-full">
          <div className="space-y-4 py-4">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'} animate-fade-in-up`}
              >
                <div
                  className={`max-w-[80%] rounded-2xl px-4 py-3 ${
                    message.role === 'user'
                      ? 'bg-sleep-accent text-accent-foreground ml-4'
                      : 'bg-card border border-border mr-4'
                  }`}
                >
                  <div className="whitespace-pre-wrap text-sm leading-relaxed">
                    {message.content}
                  </div>
                  <div
                    className={`text-xs mt-2 ${
                      message.role === 'user' ? 'text-accent-foreground/70' : 'text-muted-foreground'
                    }`}
                  >
                    {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </div>
                </div>
              </div>
            ))}
            
            {/* Typing indicator */}
            {isTyping && (
              <div className="flex justify-start animate-fade-in-up">
                <div className="bg-card border border-border rounded-2xl px-4 py-3 mr-4">
                  <div className="flex space-x-1">
                    <div className="w-2 h-2 bg-sleep-accent rounded-full animate-gentle-pulse"></div>
                    <div className="w-2 h-2 bg-sleep-accent rounded-full animate-gentle-pulse" style={{ animationDelay: '0.2s' }}></div>
                    <div className="w-2 h-2 bg-sleep-accent rounded-full animate-gentle-pulse" style={{ animationDelay: '0.4s' }}></div>
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>
        </ScrollArea>
      </div>

      {/* Input */}
      <div className="border-t border-border bg-card/50 backdrop-blur-sm p-4">
        <div className="container mx-auto">
          <div className="flex gap-2">
            <Input
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Ask about sleep techniques, schedules, or challenges..."
              className="flex-1 bg-background border-border"
              disabled={isTyping}
            />
            <Button
              onClick={() => handleSendMessage()}
              disabled={!inputMessage.trim() || isTyping}
              size="icon"
              className="sleep-button-primary"
            >
              <Send className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Coach;