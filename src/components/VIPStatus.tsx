import { useEffect, useState } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { supabase } from '@/integrations/supabase/client';
import { Badge } from '@/components/ui/badge';
import { Crown, Users } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

export const VIPStatus = () => {
  const { user } = useAuth();
  const [isVIP, setIsVIP] = useState(false);
  const [vipNumber, setVipNumber] = useState<number | null>(null);
  const [totalVIPs, setTotalVIPs] = useState(0);
  const { toast } = useToast();

  useEffect(() => {
    if (user) {
      checkVIPStatus();
      getVIPCount();
    }
  }, [user]);

  const checkVIPStatus = async () => {
    try {
      const { data, error } = await supabase
        .from('vip_users' as any)
        .select('vip_number, is_active')
        .eq('user_id', user?.id)
        .eq('is_active', true)
        .maybeSingle();

      if (error) throw error;

      if (data) {
        setIsVIP(true);
        setVipNumber((data as any).vip_number);
      }
    } catch (error) {
      console.error('Error checking VIP status:', error);
    }
  };

  const getVIPCount = async () => {
    try {
      const { data, error } = await supabase.rpc('get_vip_count' as any);
      
      if (error) throw error;
      setTotalVIPs(typeof data === 'number' ? data : 0);
    } catch (error) {
      console.error('Error getting VIP count:', error);
    }
  };

  if (!user || !isVIP) return null;

  return (
    <div className="flex items-center gap-4 p-4 bg-gradient-to-r from-primary/10 to-primary/5 rounded-lg border border-primary/20">
      <Badge variant="default" className="flex items-center gap-2 px-4 py-2 text-base">
        <Crown className="w-5 h-5" />
        VIP #{vipNumber}
      </Badge>
      <div className="flex items-center gap-2 text-sm text-muted-foreground">
        <Users className="w-4 h-4" />
        <span>{totalVIPs} / 500 VIP Members</span>
      </div>
    </div>
  );
};
