import { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Heart, Loader2, Check } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';

const Donate = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [amount, setAmount] = useState('');
  const [customAmount, setCustomAmount] = useState('');
  const [donorName, setDonorName] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  
  const suggestedAmounts = [5, 10, 25, 50, 100];

  useEffect(() => {
    if (searchParams.get('success') === 'true') {
      toast({
        title: "🙏 Thank You!",
        description: "Your generous support empowers Yahu Wellness to help more people walk in spiritual freedom.",
      });
      navigate('/donate', { replace: true });
    }
    
    if (searchParams.get('canceled') === 'true') {
      toast({
        title: "Donation Canceled",
        description: "No worries! Your support in any form is appreciated.",
        variant: "destructive",
      });
      navigate('/donate', { replace: true });
    }
  }, [searchParams, toast, navigate]);

  const handleDonate = async () => {
    const donationAmount = customAmount ? parseFloat(customAmount) : parseFloat(amount);
    
    if (!donationAmount || donationAmount < 1) {
      toast({
        title: "Invalid Amount",
        description: "Please enter an amount of at least $1",
        variant: "destructive",
      });
      return;
    }

    setIsProcessing(true);
    
    try {
      const { data, error } = await supabase.functions.invoke('create-donation', {
        body: {
          amount: donationAmount,
          donorName: donorName || 'Anonymous Blessing',
        },
      });

      if (error) throw error;

      if (data?.url) {
        window.open(data.url, '_blank');
      }
    } catch (error) {
      console.error('Donation error:', error);
      toast({
        title: "Error",
        description: "Unable to process donation. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-background via-background to-primary/5 py-12 px-4">
      <div className="container max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-spiritual bg-clip-text text-transparent">
            Support Yahu Wellness
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Your contribution helps us keep spiritual freedom accessible to everyone, 
            including those without credit cards. Every gift makes a difference.
          </p>
        </div>

        <Card className="border-primary/20 shadow-elevated mb-8">
          <CardHeader className="text-center pb-4">
            <CardTitle className="flex items-center justify-center gap-2 text-2xl">
              <Heart className="w-6 h-6 text-destructive" />
              Make a Difference
            </CardTitle>
            <CardDescription>
              100% of donations go toward app development and helping people walk in freedom
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Suggested Amounts */}
            <div className="space-y-3">
              <Label>Select Amount (USD)</Label>
              <div className="grid grid-cols-3 md:grid-cols-5 gap-3">
                {suggestedAmounts.map((amt) => (
                  <Button
                    key={amt}
                    variant={amount === amt.toString() ? "default" : "outline"}
                    onClick={() => {
                      setAmount(amt.toString());
                      setCustomAmount('');
                    }}
                    className="h-14 text-lg"
                  >
                    ${amt}
                  </Button>
                ))}
              </div>
            </div>

            {/* Custom Amount */}
            <div className="space-y-2">
              <Label htmlFor="custom">Or Enter Custom Amount</Label>
              <Input
                id="custom"
                type="number"
                min="1"
                placeholder="Enter amount"
                value={customAmount}
                onChange={(e) => {
                  setCustomAmount(e.target.value);
                  setAmount('');
                }}
              />
            </div>

            {/* Donor Name */}
            <div className="space-y-2">
              <Label htmlFor="name">Your Name (Optional)</Label>
              <Input
                id="name"
                type="text"
                placeholder="Anonymous Blessing"
                value={donorName}
                onChange={(e) => setDonorName(e.target.value)}
              />
            </div>

            {/* Donate Button */}
            <Button
              size="lg"
              className="w-full text-lg py-6 shadow-elevated hover:shadow-glow"
              onClick={handleDonate}
              disabled={isProcessing || (!amount && !customAmount)}
            >
              {isProcessing ? (
                <>
                  <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                  Processing...
                </>
              ) : (
                <>
                  <Heart className="w-5 h-5 mr-2" />
                  Donate ${customAmount || amount || '0'}
                </>
              )}
            </Button>
          </CardContent>
        </Card>

        {/* Impact Section */}
        <Card className="border-primary/10 bg-primary/5">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Check className="w-5 h-5 text-primary" />
              Your Impact
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3 text-sm text-muted-foreground">
            <p>• <strong>Free Access:</strong> Keeps core features free for people without credit cards</p>
            <p>• <strong>AI Guidance:</strong> Powers our AI Custodian spiritual support system</p>
            <p>• <strong>New Features:</strong> Funds development of advanced deliverance tools</p>
            <p>• <strong>Community:</strong> Supports group prayer sessions and forums</p>
            <p>• <strong>Content:</strong> Creates new prayers, teachings, and resources</p>
          </CardContent>
        </Card>

        <p className="text-center text-sm text-muted-foreground mt-8">
          Yahu Wellness is a ministry dedicated to spiritual freedom through Yahusha Ha'Mashiach. 
          All donations are processed securely through Stripe.
        </p>
      </div>
    </div>
  );
};

export default Donate;
