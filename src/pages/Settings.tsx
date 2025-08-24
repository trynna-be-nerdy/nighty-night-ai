import { Link } from 'react-router-dom';
import { ArrowLeft, Shield, Bell, Download, Trash2, HelpCircle, Phone, AlertTriangle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';

const Settings = () => {
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
            <h1 className="text-xl font-bold text-foreground">Settings</h1>
            <p className="text-sm text-muted-foreground">Manage your sleep coach preferences</p>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-6 space-y-6">
        {/* Safety Resources - Always prominently displayed */}
        <Alert className="border-sleep-warning/50 bg-sleep-warning/10 animate-fade-in-up">
          <AlertTriangle className="h-4 w-4 text-sleep-warning" />
          <AlertTitle className="text-sleep-warning">Need Immediate Help?</AlertTitle>
          <AlertDescription className="text-foreground">
            If you're experiencing thoughts of self-harm or severe sleep disruption affecting your daily life, 
            please contact a healthcare professional immediately.
          </AlertDescription>
        </Alert>

        {/* Emergency Resources */}
        <Card className="sleep-card border-sleep-warning/30 animate-fade-in-up" style={{ animationDelay: '0.1s' }}>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-sleep-warning">
              <Phone className="w-5 h-5" />
              Crisis Resources
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="space-y-2">
              <p className="text-sm font-medium text-foreground">24/7 Crisis Hotlines:</p>
              <div className="text-sm text-muted-foreground space-y-1">
                <p>• National Suicide Prevention Lifeline: 988</p>
                <p>• Crisis Text Line: Text HOME to 741741</p>
                <p>• National Sleep Foundation: sleepfoundation.org</p>
              </div>
            </div>
            <Button variant="outline" className="w-full border-sleep-warning text-sleep-warning hover:bg-sleep-warning/10">
              Find Local Sleep Specialists
            </Button>
          </CardContent>
        </Card>

        {/* Notifications */}
        <Card className="sleep-card animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Bell className="w-5 h-5 text-sleep-accent" />
              Notifications
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label htmlFor="winddown-reminder">Wind-down Reminder</Label>
                <p className="text-sm text-muted-foreground">Get notified 45 minutes before bedtime</p>
              </div>
              <Switch id="winddown-reminder" defaultChecked />
            </div>
            
            <Separator />
            
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label htmlFor="wake-alarm">Gentle Wake Alarm</Label>
                <p className="text-sm text-muted-foreground">Wake up during lighter sleep phases</p>
              </div>
              <Switch id="wake-alarm" defaultChecked />
            </div>
            
            <Separator />
            
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label htmlFor="weekly-report">Weekly Reports</Label>
                <p className="text-sm text-muted-foreground">Get your progress summary every Sunday</p>
              </div>
              <Switch id="weekly-report" defaultChecked />
            </div>
          </CardContent>
        </Card>

        {/* Privacy & Data */}
        <Card className="sleep-card animate-fade-in-up" style={{ animationDelay: '0.4s' }}>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Shield className="w-5 h-5 text-sleep-accent" />
              Privacy & Data
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label htmlFor="audio-features">Audio Sleep Analysis</Label>
                <p className="text-sm text-muted-foreground">Enable snore detection and noise monitoring</p>
              </div>
              <Switch id="audio-features" defaultChecked />
            </div>
            
            <Alert className="bg-muted/50 border-border">
              <Shield className="h-4 w-4" />
              <AlertDescription className="text-sm">
                <strong>Privacy First:</strong> All audio processing happens on your device. 
                Raw audio is never uploaded or stored on our servers.
              </AlertDescription>
            </Alert>
            
            <Separator />
            
            <div className="space-y-3">
              <Button variant="outline" className="w-full justify-start border-border">
                <Download className="w-4 h-4 mr-2" />
                Export My Data
              </Button>
              <p className="text-xs text-muted-foreground">
                Download all your sleep data, diary entries, and progress reports in JSON format.
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Red Flag Detection */}
        <Card className="sleep-card border-sleep-warning/30 animate-fade-in-up" style={{ animationDelay: '0.6s' }}>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <AlertTriangle className="w-5 h-5 text-sleep-warning" />
              Health Monitoring
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-3">
              <p className="text-sm text-foreground">
                APNEA monitors for signs that may indicate serious sleep disorders or health concerns:
              </p>
              <ul className="text-sm text-muted-foreground space-y-1 ml-4">
                <li>• Witnessed breathing pauses or gasping</li>
                <li>• Excessive daytime sleepiness (Epworth Scale)</li>
                <li>• Morning headaches or choking sensations</li>
                <li>• Mood changes or cognitive impacts</li>
              </ul>
              <p className="text-xs text-muted-foreground">
                If concerning patterns are detected, you'll be guided to seek professional evaluation.
              </p>
            </div>
            
            <Alert className="bg-sleep-warning/10 border-sleep-warning/50">
              <AlertTriangle className="h-4 w-4 text-sleep-warning" />
              <AlertDescription className="text-sm">
                <strong>Medical Disclaimer:</strong> APNEA is not a medical device and cannot diagnose sleep disorders. 
                Always consult healthcare professionals for medical concerns.
              </AlertDescription>
            </Alert>
          </CardContent>
        </Card>

        {/* Support */}
        <Card className="sleep-card animate-fade-in-up" style={{ animationDelay: '0.8s' }}>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <HelpCircle className="w-5 h-5 text-sleep-accent" />
              Support & Information
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <Button variant="ghost" className="w-full justify-start">
              <HelpCircle className="w-4 h-4 mr-2" />
              Help & FAQ
            </Button>
            <Button variant="ghost" className="w-full justify-start">
              <Shield className="w-4 h-4 mr-2" />
              Privacy Policy
            </Button>
            <Button variant="ghost" className="w-full justify-start">
              <Shield className="w-4 h-4 mr-2" />
              Terms of Service
            </Button>
            
            <Separator />
            
            <div className="text-center space-y-2">
              <p className="text-sm text-muted-foreground">APNEA Sleep Coach v1.0</p>
              <p className="text-xs text-muted-foreground">
                Built with evidence-based CBT-I principles
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Danger Zone */}
        <Card className="sleep-card border-destructive/30 animate-fade-in-up" style={{ animationDelay: '1s' }}>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-destructive">
              <Trash2 className="w-5 h-5" />
              Danger Zone
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <p className="text-sm text-foreground">Delete Account</p>
              <p className="text-xs text-muted-foreground">
                Permanently delete your account and all associated data. This action cannot be undone.
              </p>
            </div>
            <Button variant="destructive" className="w-full">
              <Trash2 className="w-4 h-4 mr-2" />
              Delete My Account
            </Button>
          </CardContent>
        </Card>
      </main>
    </div>
  );
};

export default Settings;