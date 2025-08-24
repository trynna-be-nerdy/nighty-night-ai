import { useLocation, Link } from "react-router-dom";
import { useEffect } from "react";
import { Home, Moon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <Card className="sleep-card w-full max-w-md animate-fade-in-up">
        <CardContent className="pt-8 text-center space-y-6">
          <div className="w-16 h-16 rounded-full bg-sleep-accent/20 flex items-center justify-center mx-auto">
            <Moon className="w-8 h-8 text-sleep-accent" />
          </div>
          
          <div className="space-y-2">
            <h1 className="text-4xl font-bold text-foreground">404</h1>
            <h2 className="text-xl font-semibold text-foreground">Page Not Found</h2>
            <p className="text-muted-foreground">
              Looks like you've wandered into the wrong sleep cycle. Let's get you back to restful territory.
            </p>
          </div>
          
          <Link to="/">
            <Button className="sleep-button-primary">
              <Home className="w-4 h-4 mr-2" />
              Return Home
            </Button>
          </Link>
        </CardContent>
      </Card>
    </div>
  );
};

export default NotFound;
