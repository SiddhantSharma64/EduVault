import { useLocation, Link } from "react-router-dom";
import { useEffect } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Home, ArrowLeft, Search } from "lucide-react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex items-center justify-center relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute -top-[30%] -right-[10%] w-[60%] h-[60%] rounded-full bg-primary/5 blur-3xl" />
        <div className="absolute top-[40%] -left-[20%] w-[40%] h-[40%] rounded-full bg-secondary/10 blur-3xl" />
      </div>
      
      {/* Floating elements */}
      {[...Array(6)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-4 h-4 rounded-full bg-primary/30"
          style={{
            top: `${20 + i * 10}%`,
            left: `${10 + i * 15}%`,
          }}
          animate={{
            y: [0, -20, 0],
            x: [0, i % 2 ? 15 : -15, 0],
            opacity: [0.3, 0.7, 0.3],
          }}
          transition={{
            duration: 4 + i,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      ))}

      <div className="relative z-10 p-8 max-w-md w-full">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center space-y-6"
        >
          <motion.div 
            initial={{ scale: 0.8 }}
            animate={{ scale: [0.8, 1.2, 1] }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="relative mx-auto"
          >
            <div className="text-[120px] font-bold text-transparent bg-clip-text bg-gradient-to-b from-primary/80 to-primary/30 leading-none">
              404
            </div>
            <motion.div 
              className="absolute -bottom-4 w-full h-4 bg-gradient-to-r from-transparent via-primary/20 to-transparent rounded-full blur-lg"
              animate={{ opacity: [0.5, 1, 0.5] }}
              transition={{ duration: 2, repeat: Infinity }}
            />
          </motion.div>
          
          <div className="space-y-3">
            <h1 className="text-2xl font-bold">Page Not Found</h1>
            <p className="text-muted-foreground">
              Oops! The study material you're looking for seems to have gone missing from our vault.
            </p>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-3 pt-4 justify-center">
            <Link to="/">
              <Button variant="default" className="gap-2 w-full sm:w-auto" data-navigate-to="/">
                <Home className="h-4 w-4" />
                Return to Home
              </Button>
            </Link>
            <Button variant="outline" className="gap-2 w-full sm:w-auto" onClick={() => window.history.back()}>
              <ArrowLeft className="h-4 w-4" />
              Go Back
            </Button>
          </div>
          
          {/* Test navigation buttons */}
          <div className="mt-4 gap-2 grid grid-cols-2">
            <Button variant="secondary" size="sm" data-navigate-to="/features">
              Features Page
            </Button>
            <Button variant="secondary" size="sm" data-scroll-to="resources" onClick={() => window.location.href = '/#resources'}>
              Resources Section
            </Button>
          </div>
          
          <div className="pt-8 pb-4">
            <div className="h-px w-full bg-gradient-to-r from-transparent via-border to-transparent" />
          </div>
          
          <div className="text-sm text-muted-foreground">
            <p>Need help finding something?</p>
            <Link to="/" className="inline-flex items-center gap-1 text-primary hover:underline mt-1">
              <Search className="h-3 w-3" />
              Search our resources
            </Link>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default NotFound;
