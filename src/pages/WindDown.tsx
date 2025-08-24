import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowLeft, Play, Pause, RotateCcw, CheckCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

const WindDown = () => {
  const navigate = useNavigate();
  const [currentActivity, setCurrentActivity] = useState('breathing');
  const [isActive, setIsActive] = useState(false);
  const [timeLeft, setTimeLeft] = useState(240); // 4 minutes for breathing
  const [completedActivities, setCompletedActivities] = useState<string[]>([]);

  const activities = {
    breathing: { name: 'Box Breathing', duration: 240, description: 'Inhale for 4, hold for 4, exhale for 4, hold for 4' },
    journaling: { name: 'Gratitude Journal', duration: 300, description: 'Reflect on 3 positive moments from today' },
    meditation: { name: 'Body Scan', duration: 600, description: 'Progressive relaxation from toes to head' },
  };

  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;
    
    if (isActive && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft(timeLeft - 1);
      }, 1000);
    } else if (timeLeft === 0) {
      setIsActive(false);
      setCompletedActivities([...completedActivities, currentActivity]);
    }
    
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isActive, timeLeft, currentActivity, completedActivities]);

  const toggleTimer = () => {
    setIsActive(!isActive);
  };

  const resetTimer = () => {
    setIsActive(false);
    setTimeLeft(activities[currentActivity as keyof typeof activities].duration);
  };

  const switchActivity = (activity: string) => {
    setCurrentActivity(activity);
    setTimeLeft(activities[activity as keyof typeof activities].duration);
    setIsActive(false);
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const getProgressPercentage = () => {
    const totalDuration = activities[currentActivity as keyof typeof activities].duration;
    return ((totalDuration - timeLeft) / totalDuration) * 100;
  };

  const BreathingGuide = () => {
    const [phase, setPhase] = useState('inhale');
    const [phaseTimer, setPhaseTimer] = useState(4);

    useEffect(() => {
      if (!isActive) return;

      const interval = setInterval(() => {
        setPhaseTimer((prev) => {
          if (prev <= 1) {
            setPhase((currentPhase) => {
              switch (currentPhase) {
                case 'inhale': return 'hold1';
                case 'hold1': return 'exhale';
                case 'exhale': return 'hold2';
                case 'hold2': return 'inhale';
                default: return 'inhale';
              }
            });
            return 4;
          }
          return prev - 1;
        });
      }, 1000);

      return () => clearInterval(interval);
    }, [isActive]);

    const getPhaseText = () => {
      switch (phase) {
        case 'inhale': return 'Breathe In';
        case 'hold1': return 'Hold';
        case 'exhale': return 'Breathe Out';
        case 'hold2': return 'Hold';
        default: return 'Breathe In';
      }
    };

    return (
      <div className="text-center space-y-6">
        <div className="relative w-32 h-32 mx-auto">
          <div 
            className={`w-full h-full rounded-full border-4 border-sleep-accent transition-all duration-1000 ${
              isActive && phase === 'inhale' ? 'scale-110 bg-sleep-accent/20' :
              isActive && phase === 'exhale' ? 'scale-90 bg-sleep-accent/10' :
              'bg-sleep-accent/20'
            }`}
          />
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <span className="text-2xl font-bold text-sleep-accent">{phaseTimer}</span>
            <span className="text-sm text-muted-foreground">{getPhaseText()}</span>
          </div>
        </div>
        <p className="text-muted-foreground">
          Follow the rhythm: breathe in for 4, hold for 4, breathe out for 4, hold for 4
        </p>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center gap-4">
          <Link to="/">
            <Button variant="ghost" size="icon" className="rounded-full">
              <ArrowLeft className="w-5 h-5" />
            </Button>
          </Link>
          <div>
            <h1 className="text-xl font-bold text-foreground">Wind Down</h1>
            <p className="text-sm text-muted-foreground">Prepare for restful sleep</p>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-6 space-y-6">
        {/* Progress Overview */}
        <Card className="sleep-card animate-fade-in-up">
          <CardContent className="pt-6">
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">Wind-down Progress</span>
                <span className="text-sm font-medium text-foreground">
                  {completedActivities.length}/3 Complete
                </span>
              </div>
              <Progress value={(completedActivities.length / 3) * 100} className="h-2" />
              <div className="flex justify-between text-xs text-muted-foreground">
                <span className={completedActivities.includes('breathing') ? 'text-sleep-success' : ''}>
                  Breathing {completedActivities.includes('breathing') && '✓'}
                </span>
                <span className={completedActivities.includes('journaling') ? 'text-sleep-success' : ''}>
                  Journal {completedActivities.includes('journaling') && '✓'}
                </span>
                <span className={completedActivities.includes('meditation') ? 'text-sleep-success' : ''}>
                  Meditation {completedActivities.includes('meditation') && '✓'}
                </span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Activity Selector */}
        <Tabs value={currentActivity} onValueChange={switchActivity} className="animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="breathing">Breathing</TabsTrigger>
            <TabsTrigger value="journaling">Journal</TabsTrigger>
            <TabsTrigger value="meditation">Meditation</TabsTrigger>
          </TabsList>

          {/* Timer Card */}
          <Card className="sleep-card mt-6">
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <span>{activities[currentActivity as keyof typeof activities].name}</span>
                {completedActivities.includes(currentActivity) && (
                  <CheckCircle className="w-5 h-5 text-sleep-success" />
                )}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="text-center space-y-4">
                <div className="text-4xl font-bold text-sleep-accent">
                  {formatTime(timeLeft)}
                </div>
                <Progress value={getProgressPercentage()} className="h-2" />
                <p className="text-sm text-muted-foreground">
                  {activities[currentActivity as keyof typeof activities].description}
                </p>
              </div>

              {/* Activity-specific content */}
              <TabsContent value="breathing" className="mt-6">
                <BreathingGuide />
              </TabsContent>

              <TabsContent value="journaling" className="mt-6">
                <div className="text-center space-y-4">
                  <div className="w-16 h-16 rounded-full bg-sleep-accent/20 flex items-center justify-center mx-auto">
                    <span className="text-2xl">📝</span>
                  </div>
                  <p className="text-muted-foreground">
                    Take a moment to write down three things you're grateful for from today.
                    Focus on specific moments, people, or experiences that brought you joy.
                  </p>
                </div>
              </TabsContent>

              <TabsContent value="meditation" className="mt-6">
                <div className="text-center space-y-4">
                  <div className="w-16 h-16 rounded-full bg-sleep-accent/20 flex items-center justify-center mx-auto animate-gentle-pulse">
                    <span className="text-2xl">🧘</span>
                  </div>
                  <p className="text-muted-foreground">
                    Lie down comfortably. Starting with your toes, notice each part of your body.
                    Release any tension you find, working your way up to the top of your head.
                  </p>
                </div>
              </TabsContent>

              {/* Timer Controls */}
              <div className="flex justify-center gap-4">
                <Button
                  onClick={toggleTimer}
                  className="sleep-button-primary"
                  size="lg"
                >
                  {isActive ? <Pause className="w-5 h-5 mr-2" /> : <Play className="w-5 h-5 mr-2" />}
                  {isActive ? 'Pause' : 'Start'}
                </Button>
                <Button
                  onClick={resetTimer}
                  variant="outline"
                  size="lg"
                  className="border-border"
                >
                  <RotateCcw className="w-5 h-5 mr-2" />
                  Reset
                </Button>
              </div>
            </CardContent>
          </Card>
        </Tabs>

        {/* Completion */}
        {completedActivities.length === 3 && (
          <Card className="sleep-card border-sleep-success/30 animate-fade-in-up">
            <CardContent className="pt-6 text-center space-y-4">
              <div className="w-16 h-16 rounded-full bg-sleep-success/20 flex items-center justify-center mx-auto">
                <CheckCircle className="w-8 h-8 text-sleep-success" />
              </div>
              <div>
                <h3 className="font-medium text-foreground mb-2">Wind-down Complete!</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  You're now ready for restful sleep. Sweet dreams!
                </p>
                <Button 
                  onClick={() => navigate('/')}
                  className="sleep-button-primary"
                >
                  Done
                </Button>
              </div>
            </CardContent>
          </Card>
        )}
      </main>
    </div>
  );
};

export default WindDown;