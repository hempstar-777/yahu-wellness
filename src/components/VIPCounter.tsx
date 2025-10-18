import { useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Check, Crown, Sparkles, AlertTriangle, Info } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import { Alert, AlertDescription } from './ui/alert';

export const VIPCounter = () => {
  const { user } = useAuth();
  const [vipCount, setVipCount] = useState(0);
  const [isVIP, setIsVIP] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchVIPData();
  }, [user]);

  const fetchVIPData = async () => {
    setIsLoading(true);
    try {
      const { data: countData, error: countError } = await supabase.rpc('get_vip_count' as any);
      
      if (countError) throw countError;
      setVipCount(typeof countData === 'number' ? countData : 0);

      if (user) {
        const { data: vipData } = await supabase
          .from('vip_users' as any)
          .select('is_active')
          .eq('user_id', user.id)
          .eq('is_active', true)
          .maybeSingle();

        setIsVIP(!!vipData);

        // Check admin status
        const { data: roleData } = await supabase
          .from('user_roles')
          .select('role')
          .eq('user_id', user.id)
          .eq('role', 'admin')
          .maybeSingle();

        setIsAdmin(!!roleData);
      }
    } catch (error) {
      console.error('Error fetching VIP data:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const spotsLeft = Math.max(0, 500 - vipCount);
  const percentFilled = Math.min(100, (vipCount / 500) * 100);

  // Admin view - show detailed stats
  if (isAdmin) {
    return (
      <Card className="bg-gradient-to-br from-amber-500/20 via-yellow-500/10 to-background border-amber-500/30 shadow-glow">
        <CardHeader className="text-center space-y-2">
          <div className="flex items-center justify-center gap-2">
            <Crown className="w-10 h-10 text-amber-500 animate-pulse" />
            <CardTitle className="text-4xl font-bold bg-gradient-to-r from-amber-500 to-yellow-500 bg-clip-text text-transparent">
              ADMIN VIP DASHBOARD
            </CardTitle>
          </div>
          <CardDescription className="text-lg font-semibold">
            Master Control - First 500 Free Lifetime VIP Campaign
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-8">
          <div className="grid grid-cols-3 gap-6 text-center">
            <div className="p-6 bg-gradient-to-br from-green-500/20 to-emerald-500/10 rounded-xl border border-green-500/30">
              <div className="text-5xl font-bold text-green-500">{vipCount}</div>
              <div className="text-sm font-medium text-muted-foreground mt-2">VIP Members Secured</div>
            </div>
            <div className="p-6 bg-gradient-to-br from-destructive/20 to-red-500/10 rounded-xl border border-destructive/30">
              <div className="text-5xl font-bold text-destructive">{spotsLeft}</div>
              <div className="text-sm font-medium text-muted-foreground mt-2">Spots Remaining</div>
            </div>
            <div className="p-6 bg-gradient-to-br from-primary/20 to-blue-500/10 rounded-xl border border-primary/30">
              <div className="text-5xl font-bold text-primary">{percentFilled.toFixed(1)}%</div>
              <div className="text-sm font-medium text-muted-foreground mt-2">Campaign Progress</div>
            </div>
          </div>
          
          <div className="space-y-3">
            <div className="flex items-center justify-between text-sm">
              <span className="font-semibold">Campaign Status:</span>
              <Badge variant={spotsLeft > 0 ? "default" : "destructive"} className="text-xs">
                {spotsLeft > 0 ? "🟢 ACTIVE - ACCEPTING NEW VIPs" : "🔴 FULL - 500/500 REACHED"}
              </Badge>
            </div>
            <Progress value={percentFilled} className="h-4" />
            <p className="text-xs text-muted-foreground text-center">
              {spotsLeft > 0 ? `${spotsLeft} lifetime VIP spots available for TikTok marketing` : "Free VIP campaign complete!"}
            </p>
          </div>

          <Alert className="border-amber-500/30 bg-amber-500/10">
            <Crown className="h-5 w-5 text-amber-500" />
            <AlertDescription className="text-sm">
              <strong className="text-amber-500">Supreme Commander Status:</strong> You have unlimited lifetime VIP access. 
              This dashboard tracks the first 500 free spots for your TikTok marketing campaign.
            </AlertDescription>
          </Alert>
        </CardContent>
      </Card>
    );
  }

  // Already VIP - don't show public counter
  if (isVIP) return null;

  // Public view - create urgency for non-VIPs
  return (
    <Card className="relative overflow-hidden bg-gradient-to-br from-primary/10 via-primary/5 to-background border-primary/30 shadow-elevated">
      <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full blur-3xl -z-10" />
      <CardHeader className="text-center space-y-3 pb-4">
        <div className="flex items-center justify-center gap-3">
          <Crown className="w-10 h-10 text-primary animate-pulse" />
          <CardTitle className="text-3xl md:text-4xl font-bold bg-gradient-spiritual bg-clip-text text-transparent">
            🔥 LIMITED VIP ACCESS 🔥
          </CardTitle>
        </div>
        <CardDescription className="text-lg md:text-xl font-semibold">
          First 500 Members Get <span className="text-primary">LIFETIME VIP Benefits</span> - Absolutely FREE!
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-8">
        <div className="text-center space-y-4">
          <div className="flex items-center justify-center gap-12">
            <div className="relative">
              <div className="absolute inset-0 bg-green-500/20 rounded-full blur-xl animate-pulse" />
              <div className="relative text-5xl md:text-6xl font-bold text-green-500">{vipCount}</div>
              <div className="text-sm font-medium text-muted-foreground mt-2">Already VIP</div>
            </div>
            <div className="h-16 w-px bg-border" />
            <div className="relative">
              <div className="absolute inset-0 bg-destructive/20 rounded-full blur-xl animate-pulse" />
              <div className="relative text-5xl md:text-6xl font-bold text-destructive">{spotsLeft}</div>
              <div className="text-sm font-medium text-muted-foreground mt-2">Spots Left!</div>
            </div>
          </div>
          <div className="space-y-2">
            <Progress value={percentFilled} className="h-4" />
            <p className="text-sm font-semibold text-muted-foreground">
              ⚡ {percentFilled.toFixed(1)}% Claimed - Only {spotsLeft} Free Lifetime VIP Spots Remaining!
            </p>
          </div>
        </div>

        <div className="bg-gradient-to-br from-primary/20 to-primary/5 rounded-xl p-6 space-y-3 border border-primary/30">
          <h3 className="font-bold text-xl text-center flex items-center justify-center gap-2">
            <Sparkles className="w-5 h-5 text-primary" />
            Your FREE Lifetime VIP Benefits:
          </h3>
          <ul className="space-y-3 text-sm">
            <li className="flex items-start gap-3">
              <Check className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
              <span><strong>Exclusive VIP Crown Badge</strong> - Stand out & get priority support</span>
            </li>
            <li className="flex items-start gap-3">
              <Check className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
              <span><strong>Advanced Deliverance Tools</strong> - Powerful spiritual warfare resources</span>
            </li>
            <li className="flex items-start gap-3">
              <Check className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
              <span><strong>Premium Prayer Videos & Teachings</strong> - Exclusive VIP-only content</span>
            </li>
            <li className="flex items-start gap-3">
              <Check className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
              <span><strong>Early Access to New Features</strong> - Be first to experience updates</span>
            </li>
            <li className="flex items-start gap-3">
              <Check className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
              <span><strong>Free for Life - No Payments Ever!</strong> - Lock in your spot now</span>
            </li>
          </ul>
        </div>

        <Alert className="border-amber-500/50 bg-amber-500/10">
          <AlertTriangle className="h-5 w-5 text-amber-500" />
          <AlertDescription className="font-semibold">
            ⏰ <strong>ACT FAST!</strong> Once all 500 spots are claimed, this FREE lifetime VIP offer will never return!
          </AlertDescription>
        </Alert>

        {user ? (
          <Button asChild size="lg" className="w-full text-lg py-6 shadow-elevated hover:shadow-glow bg-gradient-spiritual">
            <Link to="/dashboard">
              <Crown className="w-5 h-5 mr-2" />
              🎉 Claim Your FREE Lifetime VIP Spot
            </Link>
          </Button>
        ) : (
          <div className="space-y-4">
            <Button asChild size="lg" className="w-full text-lg py-6 shadow-elevated hover:shadow-glow bg-gradient-spiritual animate-pulse">
              <Link to="/auth">
                <Crown className="w-5 h-5 mr-2" />
                🚀 Sign Up & Get FREE VIP Now!
              </Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="w-full border-primary/50 hover:bg-primary/10">
              <Link to="/vip-benefits">
                <Info className="w-5 h-5 mr-2" />
                See All VIP Benefits
              </Link>
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
};
