import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Crown, 
  GraduationCap, 
  MessageSquare, 
  Sparkles, 
  Users,
  CheckCircle2,
  ArrowRight,
  Clock
} from "lucide-react";
import { Link } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";

const VIPBenefits = () => {
  const { user } = useAuth();
  const [vipCount, setVipCount] = useState(0);
  const [isVIP, setIsVIP] = useState(false);

  useEffect(() => {
    fetchVIPStatus();
  }, [user]);

  const fetchVIPStatus = async () => {
    try {
      const { data: countData } = await supabase.rpc('get_vip_count' as any);
      setVipCount(typeof countData === 'number' ? countData : 0);

      if (user) {
        const { data: vipData } = await supabase
          .from('vip_users' as any)
          .select('is_active')
          .eq('user_id', user.id)
          .eq('is_active', true)
          .maybeSingle();
        setIsVIP(!!vipData);
      }
    } catch (error) {
      console.error('Error fetching VIP status:', error);
    }
  };

  const spotsLeft = Math.max(0, 500 - vipCount);

  const vipFeatures = [
    {
      icon: GraduationCap,
      title: "Lifetime Course Access",
      description: "Full access to all courses in the Spiritual University - worth $1,500+",
      highlight: true
    },
    {
      icon: Sparkles,
      title: "AI Deliverance Assistant",
      description: "24/7 access to personalized AI guidance for your spiritual journey"
    },
    {
      icon: MessageSquare,
      title: "Priority Support",
      description: "Get your questions answered first with VIP support"
    },
    {
      icon: Users,
      title: "Exclusive Community",
      description: "Join a private community of the first 500 members"
    },
    {
      icon: Crown,
      title: "All Future Features",
      description: "Automatic access to every new feature and course we release"
    },
    {
      icon: CheckCircle2,
      title: "No Subscription Fees",
      description: "One-time signup = lifetime access. No monthly payments ever."
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-light">
      <div className="container mx-auto px-4 py-12">
        {/* Hero Section */}
        <div className="max-w-4xl mx-auto text-center space-y-6 mb-12">
          <Badge className="bg-gradient-spiritual text-primary-foreground px-4 py-2">
            <Crown className="w-4 h-4 mr-2" />
            VIP Early Access Program
          </Badge>
          
          <h1 className="font-serif text-4xl md:text-5xl font-bold">
            Join the First 500
          </h1>
          
          <p className="text-xl text-muted-foreground">
            Be part of an exclusive group getting{" "}
            <strong className="text-foreground">lifetime FREE access</strong> to everything
          </p>

          {/* Counter */}
          <Card className="p-6 bg-gradient-to-br from-primary/10 to-background border-primary/20">
            <div className="flex flex-col md:flex-row items-center justify-center gap-6">
              <div className="text-center">
                <div className="text-5xl font-bold bg-gradient-spiritual bg-clip-text text-transparent">
                  {vipCount} / 500
                </div>
                <p className="text-sm text-muted-foreground mt-1">VIP Members</p>
              </div>
              
              <div className="h-12 w-px bg-border hidden md:block" />
              
              <div className="text-center">
                <div className="flex items-center gap-2 justify-center text-destructive">
                  <Clock className="w-6 h-6" />
                  <span className="text-3xl font-bold">{spotsLeft}</span>
                </div>
                <p className="text-sm text-muted-foreground mt-1">Spots Remaining</p>
              </div>
            </div>
            
            <div className="w-full bg-muted rounded-full h-3 mt-6">
              <div 
                className="bg-gradient-spiritual h-3 rounded-full transition-all duration-500"
                style={{ width: `${Math.min(100, (vipCount / 500) * 100)}%` }}
              />
            </div>
          </Card>
        </div>

        {/* Benefits Grid */}
        <div className="max-w-5xl mx-auto mb-12">
          <h2 className="font-serif text-3xl font-bold text-center mb-8">
            What You Get as a VIP Member
          </h2>
          
          <div className="grid md:grid-cols-2 gap-6">
            {vipFeatures.map((feature, index) => (
              <Card 
                key={index}
                className={`p-6 ${feature.highlight ? 'border-primary/50 bg-primary/5' : ''}`}
              >
                <CardHeader className="p-0 mb-4">
                  <div className="flex items-start gap-4">
                    <div className={`p-3 rounded-xl ${
                      feature.highlight 
                        ? 'bg-gradient-spiritual text-primary-foreground' 
                        : 'bg-accent text-accent-foreground'
                    }`}>
                      <feature.icon className="w-6 h-6" />
                    </div>
                    <div className="flex-1">
                      <CardTitle className="text-lg">{feature.title}</CardTitle>
                      {feature.highlight && (
                        <Badge variant="secondary" className="mt-2">Most Valuable</Badge>
                      )}
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="p-0">
                  <p className="text-muted-foreground">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Pricing Comparison */}
        <div className="max-w-4xl mx-auto mb-12">
          <h2 className="font-serif text-3xl font-bold text-center mb-8">
            VIP vs Regular Pricing
          </h2>
          
          <div className="grid md:grid-cols-2 gap-6">
            {/* VIP */}
            <Card className="border-primary/50 bg-gradient-to-br from-primary/10 to-background relative overflow-hidden">
              <div className="absolute top-4 right-4">
                <Badge className="bg-gradient-spiritual text-primary-foreground">
                  {spotsLeft} spots left
                </Badge>
              </div>
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-2xl">
                  <Crown className="w-6 h-6 text-primary" />
                  VIP Member
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <div className="text-4xl font-bold">$0</div>
                  <div className="text-sm text-muted-foreground">Lifetime Access</div>
                </div>
                <ul className="space-y-2">
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-5 h-5 text-primary" />
                    <span>All courses (worth $1,500+)</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-5 h-5 text-primary" />
                    <span>All future features</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-5 h-5 text-primary" />
                    <span>Priority support</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-5 h-5 text-primary" />
                    <span>Exclusive community</span>
                  </li>
                </ul>
              </CardContent>
            </Card>

            {/* Regular */}
            <Card className="opacity-75">
              <CardHeader>
                <CardTitle className="text-2xl">Regular Member</CardTitle>
                <Badge variant="secondary">After 500 VIPs</Badge>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <div className="text-4xl font-bold">$297+</div>
                  <div className="text-sm text-muted-foreground">Per Course</div>
                </div>
                <ul className="space-y-2 text-muted-foreground">
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-5 h-5" />
                    <span>Pay for each course separately</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-5 h-5" />
                    <span>Standard support</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-5 h-5" />
                    <span>Access to basic features</span>
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* CTA */}
        <div className="max-w-2xl mx-auto text-center">
          {isVIP ? (
            <Card className="p-8 bg-gradient-spiritual text-primary-foreground">
              <Crown className="w-16 h-16 mx-auto mb-4" />
              <h3 className="font-serif text-2xl font-bold mb-2">
                You're Already a VIP!
              </h3>
              <p className="mb-6 text-primary-foreground/90">
                Welcome to the exclusive first 500. Enjoy your lifetime access!
              </p>
              <Button asChild variant="secondary" size="lg">
                <Link to="/dashboard">Go to Dashboard</Link>
              </Button>
            </Card>
          ) : (
            <Card className="p-8">
              <h3 className="font-serif text-2xl font-bold mb-4">
                Ready to Join?
              </h3>
              <p className="text-muted-foreground mb-6">
                Sign up now to secure your VIP spot and get lifetime access to everything.
              </p>
              {user ? (
                <Button asChild size="lg" className="bg-gradient-spiritual">
                  <Link to="/dashboard">
                    View Dashboard
                    <ArrowRight className="w-5 h-5 ml-2" />
                  </Link>
                </Button>
              ) : (
                <Button asChild size="lg" className="bg-gradient-spiritual">
                  <Link to="/auth">
                    <Crown className="w-5 h-5 mr-2" />
                    Claim Your VIP Spot
                    <ArrowRight className="w-5 h-5 ml-2" />
                  </Link>
                </Button>
              )}
            </Card>
          )}
        </div>
      </div>
    </div>
  );
};

export default VIPBenefits;
