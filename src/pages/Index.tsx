import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Moon, Sun, MessageCircle, Book, BarChart3, Settings, Plus, User } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';

const Index = () => {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [sleepScore] = useState(78); // Mock sleep efficiency
  const [nextBedtime] = useState('22:30');
  const [targetWakeTime] = useState('06:30');

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const isNightTime = currentTime.getHours() >= 20 || currentTime.getHours() <= 6;
  const greeting = isNightTime ? 'Good evening' : 
                   currentTime.getHours() < 12 ? 'Good morning' : 'Good afternoon';

  const timeUntilBedtime = () => {
    const bedtime = new Date();
    const [hours, minutes] = nextBedtime.split(':').map(Number);
    bedtime.setHours(hours, minutes, 0, 0);
    
    if (bedtime < currentTime) {
      bedtime.setDate(bedtime.getDate() + 1);
    }
    
    const diff = bedtime.getTime() - currentTime.getTime();
    const hoursLeft = Math.floor(diff / (1000 * 60 * 60));
    const minutesLeft = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    
    return `${hoursLeft}h ${minutesLeft}m`;
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-sleep-accent to-sleep-glow flex items-center justify-center">
              <Moon className="w-6 h-6 text-accent-foreground" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-foreground">APNEA</h1>
              <p className="text-sm text-muted-foreground">Sleep Coach</p>
            </div>
          </div>
          <div className="flex gap-2">
            <Link to="/account">
              <Button variant="ghost" size="icon" className="rounded-full">
                <User className="w-5 h-5" />
              </Button>
            </Link>
            <Link to="/settings">
              <Button variant="ghost" size="icon" className="rounded-full">
                <Settings className="w-5 h-5" />
              </Button>
            </Link>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-6 space-y-6">
        {/* Greeting & Time */}
        <div className="text-center space-y-2 animate-fade-in-up">
          <h2 className="text-2xl font-semibold text-foreground">{greeting}</h2>
          <p className="text-muted-foreground">
            {currentTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
          </p>
        </div>

        {/* Sleep Score Ring */}
        <Card className="sleep-card animate-scale-in">
          <CardContent className="pt-6">
            <div className="flex flex-col items-center space-y-4">
              <div className="relative w-32 h-32">
                <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
                  <circle
                    cx="50"
                    cy="50"
                    r="45"
                    stroke="hsl(var(--muted))"
                    strokeWidth="8"
                    fill="none"
                  />
                  <circle
                    cx="50"
                    cy="50"
                    r="45"
                    stroke="hsl(var(--sleep-accent))"
                    strokeWidth="8"
                    fill="none"
                    strokeDasharray={`${2 * Math.PI * 45}`}
                    strokeDashoffset={`${2 * Math.PI * 45 * (1 - sleepScore / 100)}`}
                    className="transition-all duration-1000 ease-out animate-sleep-glow"
                  />
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <span className="text-3xl font-bold text-sleep-accent">{sleepScore}</span>
                  <span className="text-xs text-muted-foreground">Sleep Score</span>
                </div>
              </div>
              <div className="text-center">
                <p className="text-sm text-muted-foreground">Sleep Efficiency</p>
                <p className="text-lg font-medium text-foreground">{sleepScore}% - Good Progress</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Tonight's Plan */}
        <Card className="sleep-card animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Moon className="w-5 h-5 text-sleep-accent" />
              Tonight's Plan
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex justify-between items-center">
              <div>
                <p className="text-sm text-muted-foreground">Target Bedtime</p>
                <p className="text-lg font-medium text-foreground">{nextBedtime}</p>
              </div>
              <div className="text-right">
                <p className="text-sm text-muted-foreground">Wake Time</p>
                <p className="text-lg font-medium text-foreground">{targetWakeTime}</p>
              </div>
            </div>
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Time until bedtime</span>
                <span className="text-foreground font-medium">{timeUntilBedtime()}</span>
              </div>
              <Progress value={65} className="h-2" />
            </div>
          </CardContent>
        </Card>

        {/* Quick Actions */}
        <div className="grid grid-cols-2 gap-4 animate-fade-in-up" style={{ animationDelay: '0.4s' }}>
          <Link to="/diary">
            <Card className="sleep-card hover:scale-105 transition-transform cursor-pointer">
              <CardContent className="pt-6 text-center space-y-2">
                <Plus className="w-8 h-8 text-sleep-accent mx-auto" />
                <h3 className="font-medium text-foreground">Sleep Diary</h3>
                <p className="text-sm text-muted-foreground">Log last night</p>
              </CardContent>
            </Card>
          </Link>

          <Link to="/winddown">
            <Card className="sleep-card hover:scale-105 transition-transform cursor-pointer">
              <CardContent className="pt-6 text-center space-y-2">
                <div className="w-8 h-8 rounded-full bg-sleep-accent/20 flex items-center justify-center mx-auto breathing-animation">
                  <div className="w-4 h-4 rounded-full bg-sleep-accent"></div>
                </div>
                <h3 className="font-medium text-foreground">Wind Down</h3>
                <p className="text-sm text-muted-foreground">Start routine</p>
              </CardContent>
            </Card>
          </Link>
        </div>

        {/* Navigation */}
        <div className="grid grid-cols-3 gap-4 animate-fade-in-up" style={{ animationDelay: '0.6s' }}>
          <Link to="/coach">
            <Button variant="ghost" className="h-16 flex flex-col space-y-1">
              <MessageCircle className="w-6 h-6" />
              <span className="text-xs">AI Coach</span>
            </Button>
          </Link>

          <Link to="/progress">
            <Button variant="ghost" className="h-16 flex flex-col space-y-1">
              <BarChart3 className="w-6 h-6" />
              <span className="text-xs">Progress</span>
            </Button>
          </Link>

          <Link to="/learn">
            <Button variant="ghost" className="h-16 flex flex-col space-y-1">
              <Book className="w-6 h-6" />
              <span className="text-xs">Learn</span>
            </Button>
          </Link>
        </div>

        {/* Wind Down CTA (if evening) */}
        {isNightTime && (
          <Card className="sleep-card border-sleep-accent/30 animate-fade-in-up" style={{ animationDelay: '0.8s' }}>
            <CardContent className="pt-6 text-center space-y-4">
              <div className="w-12 h-12 rounded-full bg-sleep-accent/20 flex items-center justify-center mx-auto animate-gentle-pulse">
                <Moon className="w-6 h-6 text-sleep-accent" />
              </div>
              <div>
                <h3 className="font-medium text-foreground mb-2">Ready for bed?</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  Start your wind-down routine to prepare for restful sleep
                </p>
                <Link to="/winddown">
                  <Button className="sleep-button-primary">Start Wind Down</Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        )}
      </main>
    </div>
  );
};

export default Index;