import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowLeft, Clock, Bed, Eye, Star } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';
import { useToast } from '@/hooks/use-toast';

const SleepDiary = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const [formData, setFormData] = useState({
    bedTime: '23:00',
    sleepTime: '23:30',
    wakeTime: '06:30',
    outOfBedTime: '07:00',
    nightWakeups: 1,
    wakeDuration: 15,
    sleepQuality: [3],
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Here you would normally save to backend
    toast({
      title: "Sleep diary saved!",
      description: "Your sleep data has been recorded successfully.",
    });
    
    navigate('/');
  };

  const calculateSleepEfficiency = () => {
    const bedTime = new Date(`2024-01-01 ${formData.bedTime}`);
    const wakeTime = new Date(`2024-01-02 ${formData.wakeTime}`);
    const totalTimeInBed = (wakeTime.getTime() - bedTime.getTime()) / (1000 * 60); // minutes
    const timeAwake = formData.wakeDuration;
    const sleepTime = totalTimeInBed - timeAwake;
    const efficiency = (sleepTime / totalTimeInBed) * 100;
    
    return Math.round(efficiency);
  };

  const qualityLabels = ['Poor', 'Fair', 'Good', 'Very Good', 'Excellent'];

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
            <h1 className="text-xl font-bold text-foreground">Sleep Diary</h1>
            <p className="text-sm text-muted-foreground">How did you sleep last night?</p>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-6">
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Sleep Times */}
          <Card className="sleep-card animate-fade-in-up">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Clock className="w-5 h-5 text-sleep-accent" />
                Sleep Times
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="bedTime">Went to bed</Label>
                  <Input
                    id="bedTime"
                    type="time"
                    value={formData.bedTime}
                    onChange={(e) => setFormData({ ...formData, bedTime: e.target.value })}
                    className="bg-secondary border-border"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="sleepTime">Fell asleep</Label>
                  <Input
                    id="sleepTime"
                    type="time"
                    value={formData.sleepTime}
                    onChange={(e) => setFormData({ ...formData, sleepTime: e.target.value })}
                    className="bg-secondary border-border"
                  />
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="wakeTime">Woke up</Label>
                  <Input
                    id="wakeTime"
                    type="time"
                    value={formData.wakeTime}
                    onChange={(e) => setFormData({ ...formData, wakeTime: e.target.value })}
                    className="bg-secondary border-border"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="outOfBedTime">Got out of bed</Label>
                  <Input
                    id="outOfBedTime"
                    type="time"
                    value={formData.outOfBedTime}
                    onChange={(e) => setFormData({ ...formData, outOfBedTime: e.target.value })}
                    className="bg-secondary border-border"
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Night Disruptions */}
          <Card className="sleep-card animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Eye className="w-5 h-5 text-sleep-accent" />
                Night Disruptions
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="nightWakeups">Number of times awake</Label>
                <Input
                  id="nightWakeups"
                  type="number"
                  min="0"
                  max="10"
                  value={formData.nightWakeups}
                  onChange={(e) => setFormData({ ...formData, nightWakeups: parseInt(e.target.value) || 0 })}
                  className="bg-secondary border-border"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="wakeDuration">Total time awake (minutes)</Label>
                <Input
                  id="wakeDuration"
                  type="number"
                  min="0"
                  max="480"
                  value={formData.wakeDuration}
                  onChange={(e) => setFormData({ ...formData, wakeDuration: parseInt(e.target.value) || 0 })}
                  className="bg-secondary border-border"
                />
              </div>
            </CardContent>
          </Card>

          {/* Sleep Quality */}
          <Card className="sleep-card animate-fade-in-up" style={{ animationDelay: '0.4s' }}>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Star className="w-5 h-5 text-sleep-accent" />
                Sleep Quality
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-4">
                <Label>How would you rate your sleep quality?</Label>
                <div className="px-4">
                  <Slider
                    value={formData.sleepQuality}
                    onValueChange={(value) => setFormData({ ...formData, sleepQuality: value })}
                    max={4}
                    min={0}
                    step={1}
                    className="w-full"
                  />
                </div>
                <div className="flex justify-between text-sm text-muted-foreground">
                  <span>Poor</span>
                  <span>Fair</span>
                  <span>Good</span>
                  <span>Very Good</span>
                  <span>Excellent</span>
                </div>
                <div className="text-center">
                  <span className="text-lg font-medium text-sleep-accent">
                    {qualityLabels[formData.sleepQuality[0]]}
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Sleep Efficiency Preview */}
          <Card className="sleep-card border-sleep-accent/30 animate-fade-in-up" style={{ animationDelay: '0.6s' }}>
            <CardContent className="pt-6">
              <div className="text-center space-y-2">
                <div className="text-3xl font-bold text-sleep-accent">{calculateSleepEfficiency()}%</div>
                <p className="text-sm text-muted-foreground">Estimated Sleep Efficiency</p>
                <p className="text-xs text-muted-foreground">
                  Based on your reported times
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Submit Button */}
          <div className="space-y-4 animate-fade-in-up" style={{ animationDelay: '0.8s' }}>
            <Button type="submit" className="w-full sleep-button-primary">
              Save Sleep Diary
            </Button>
            <Button 
              type="button" 
              variant="ghost" 
              className="w-full" 
              onClick={() => navigate('/')}
            >
              Cancel
            </Button>
          </div>
        </form>
      </main>
    </div>
  );
};

export default SleepDiary;