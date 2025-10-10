import { useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Crown, Users, Clock } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';

export const VIPCounter = () => {
  const { user } = useAuth();
  const [vipCount, setVipCount] = useState(0);
  const [isVIP, setIsVIP] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchVIPData();
  }, [user]);

  const fetchVIPData = async () => {
    try {
      // Get VIP count
      const { data: countData, error: countError } = await supabase.rpc('get_vip_count' as any);
      if (countError) throw countError;
      setVipCount(typeof countData === 'number' ? countData : 0);

      // Check if current user is VIP
      if (user) {
        const { data: vipData, error: vipError } = await supabase
          .from('vip_users' as any)
          .select('is_active')
          .eq('user_id', user.id)
          .eq('is_active', true)
          .maybeSingle();
        
        if (vipError) throw vipError;
        setIsVIP(!!vipData);
      }
    } catch (error) {
      console.error('Error fetching VIP data:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const spotsLeft = Math.max(0, 500 - vipCount);
  const percentFilled = Math.min(100, (vipCount / 500) * 100);

  // Don't show to users who are already VIP
  if (isVIP) return null;

  return (
    <Card className="p-6 bg-gradient-to-br from-primary/10 via-primary/5 to-background border-primary/20 shadow-glow">
      <div className="flex flex-col md:flex-row items-center gap-6">
        <div className="flex-shrink-0">
          <div className="w-20 h-20 rounded-full bg-gradient-spiritual flex items-center justify-center">
            <Crown className="w-10 h-10 text-primary-foreground" />
          </div>
        </div>
        
        <div className="flex-1 text-center md:text-left space-y-3">
          <h3 className="font-serif text-2xl md:text-3xl font-bold">
            Join VIP Early Access
          </h3>
          <p className="text-muted-foreground">
            Get <strong>lifetime FREE access</strong> to all courses and premium features!
          </p>
          
          <div className="flex items-center gap-3 justify-center md:justify-start">
            <div className="flex items-center gap-2 text-sm">
              <Users className="w-4 h-4 text-primary" />
              <span className="font-semibold">{vipCount} / 500</span>
              <span className="text-muted-foreground">VIP Members</span>
            </div>
            <div className="flex items-center gap-2 text-sm">
              <Clock className="w-4 h-4 text-destructive" />
              <span className="font-semibold text-destructive">
                {spotsLeft} spots left
              </span>
            </div>
          </div>
          
          <div className="w-full bg-muted rounded-full h-2.5">
            <div 
              className="bg-gradient-spiritual h-2.5 rounded-full transition-all duration-500"
              style={{ width: `${percentFilled}%` }}
            />
          </div>
        </div>

        <div className="flex-shrink-0">
          {user ? (
            <div className="text-center space-y-2">
              <p className="text-sm text-muted-foreground">
                You're already enrolled!
              </p>
              <Button asChild>
                <Link to="/dashboard">View Dashboard</Link>
              </Button>
            </div>
          ) : (
            <div className="text-center space-y-2">
              <Button asChild size="lg" className="bg-gradient-spiritual shadow-elevated">
                <Link to="/auth">
                  <Crown className="w-5 h-5 mr-2" />
                  Claim Your Spot
                </Link>
              </Button>
              <p className="text-xs text-muted-foreground">
                <Link to="/vip-benefits" className="underline hover:text-foreground">
                  See VIP Benefits
                </Link>
              </p>
            </div>
          )}
        </div>
      </div>
    </Card>
  );
};
