import { Link } from 'react-router-dom';
import { ArrowLeft, Book, Clock, Moon, Brain, Zap, CheckCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';

const Learn = () => {
  const modules = [
    {
      id: 1,
      title: 'Sleep Foundations',
      description: 'Understanding your sleep cycles and what affects them',
      duration: '15 min',
      progress: 100,
      completed: true,
      topics: ['Sleep stages', 'Circadian rhythms', 'Three-factor model'],
      icon: Book,
    },
    {
      id: 2,
      title: 'Stimulus Control',
      description: 'Strengthen the association between your bed and sleep',
      duration: '12 min',
      progress: 75,
      completed: false,
      topics: ['Bed = sleep only', '15-minute rule', 'Fixed wake time'],
      icon: Zap,
    },
    {
      id: 3,
      title: 'Sleep Window Optimization',
      description: 'Find your optimal time in bed for better efficiency',
      duration: '18 min',
      progress: 30,
      completed: false,
      topics: ['Sleep restriction basics', 'Safety guidelines', 'Weekly adjustments'],
      icon: Clock,
    },
    {
      id: 4,
      title: 'Cognitive Techniques',
      description: 'Manage racing thoughts and sleep anxiety',
      duration: '20 min',
      progress: 0,
      completed: false,
      topics: ['Thought reframing', 'Worry scheduling', 'Paradoxical intention'],
      icon: Brain,
    },
    {
      id: 5,
      title: 'Sleep Environment',
      description: 'Optimize your bedroom for better sleep',
      duration: '10 min',
      progress: 0,
      completed: false,
      topics: ['Temperature control', 'Light management', 'Noise reduction'],
      icon: Moon,
    },
  ];

  const quickTips = [
    {
      title: 'Keep a Fixed Wake Time',
      description: 'Even on weekends, maintain the same wake time to regulate your circadian rhythm.',
      category: 'Schedule',
    },
    {
      title: 'The 3-2-1 Rule',
      description: 'No large meals 3 hours before bed, no liquids 2 hours before, no screens 1 hour before.',
      category: 'Evening Routine',
    },
    {
      title: 'Cool Temperature',
      description: 'Keep your bedroom between 65-68°F (18-20°C) for optimal sleep temperature.',
      category: 'Environment',
    },
    {
      title: 'Wind-Down Buffer',
      description: 'Start relaxing activities 30-60 minutes before your target bedtime.',
      category: 'Routine',
    },
  ];

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
            <h1 className="text-xl font-bold text-foreground">Learn</h1>
            <p className="text-sm text-muted-foreground">Evidence-based sleep education</p>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-6 space-y-6">
        {/* Progress Overview */}
        <Card className="sleep-card animate-fade-in-up">
          <CardContent className="pt-6">
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <div>
                  <h3 className="text-lg font-semibold text-foreground">CBT-I Program Progress</h3>
                  <p className="text-sm text-muted-foreground">Complete all modules for optimal results</p>
                </div>
                <div className="text-right">
                  <div className="text-2xl font-bold text-sleep-accent">1/5</div>
                  <p className="text-xs text-muted-foreground">Modules Done</p>
                </div>
              </div>
              <Progress value={20} className="h-2" />
              <div className="flex justify-between text-xs text-muted-foreground">
                <span>Started</span>
                <span>Sleep Expert</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Learning Modules */}
        <div className="space-y-4">
          <h2 className="text-lg font-semibold text-foreground animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
            Learning Modules
          </h2>
          
          {modules.map((module, index) => {
            const IconComponent = module.icon;
            return (
              <Card 
                key={module.id} 
                className={`sleep-card hover:scale-105 transition-transform cursor-pointer animate-fade-in-up ${
                  module.completed ? 'border-sleep-success/30' : ''
                }`}
                style={{ animationDelay: `${0.2 + index * 0.1}s` }}
              >
                <CardContent className="pt-6">
                  <div className="flex items-start gap-4">
                    <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                      module.completed 
                        ? 'bg-sleep-success/20' 
                        : module.progress > 0 
                        ? 'bg-sleep-accent/20' 
                        : 'bg-muted'
                    }`}>
                      {module.completed ? (
                        <CheckCircle className="w-6 h-6 text-sleep-success" />
                      ) : (
                        <IconComponent className={`w-6 h-6 ${
                          module.progress > 0 ? 'text-sleep-accent' : 'text-muted-foreground'
                        }`} />
                      )}
                    </div>
                    
                    <div className="flex-1 space-y-3">
                      <div className="space-y-1">
                        <div className="flex items-center justify-between">
                          <h3 className="font-medium text-foreground">{module.title}</h3>
                          <div className="flex items-center gap-2">
                            <Badge variant="secondary" className="text-xs">
                              {module.duration}
                            </Badge>
                            {module.completed && (
                              <Badge className="text-xs bg-sleep-success/20 text-sleep-success border-sleep-success/30">
                                Complete
                              </Badge>
                            )}
                          </div>
                        </div>
                        <p className="text-sm text-muted-foreground">{module.description}</p>
                      </div>
                      
                      <div className="space-y-2">
                        <div className="flex justify-between text-xs">
                          <span className="text-muted-foreground">Progress</span>
                          <span className="text-foreground font-medium">{module.progress}%</span>
                        </div>
                        <Progress value={module.progress} className="h-1.5" />
                      </div>
                      
                      <div className="flex flex-wrap gap-1">
                        {module.topics.map((topic, topicIndex) => (
                          <Badge key={topicIndex} variant="outline" className="text-xs border-border">
                            {topic}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Quick Tips */}
        <div className="space-y-4 animate-fade-in-up" style={{ animationDelay: '0.8s' }}>
          <h2 className="text-lg font-semibold text-foreground">Quick Sleep Tips</h2>
          
          <div className="grid gap-4">
            {quickTips.map((tip, index) => (
              <Card key={index} className="sleep-card">
                <CardContent className="pt-4">
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <h4 className="font-medium text-foreground">{tip.title}</h4>
                      <Badge variant="secondary" className="text-xs">
                        {tip.category}
                      </Badge>
                    </div>
                    <p className="text-sm text-muted-foreground">{tip.description}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Continue Learning CTA */}
        <Card className="sleep-card border-sleep-accent/30 animate-fade-in-up" style={{ animationDelay: '1s' }}>
          <CardContent className="pt-6 text-center space-y-4">
            <div className="w-16 h-16 rounded-full bg-sleep-accent/20 flex items-center justify-center mx-auto">
              <Book className="w-8 h-8 text-sleep-accent" />
            </div>
            <div>
              <h3 className="font-medium text-foreground mb-2">Ready for Module 2?</h3>
              <p className="text-sm text-muted-foreground mb-4">
                Learn stimulus control techniques to strengthen your sleep associations
              </p>
              <Button className="sleep-button-primary">
                Continue Learning
              </Button>
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  );
};

export default Learn;