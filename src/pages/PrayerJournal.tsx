import { useEffect, useState } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { ChevronLeft, BookHeart, Plus, Check, Edit, Trash2, Calendar } from 'lucide-react';
import { Link } from 'react-router-dom';
import { toast } from 'sonner';
import ProtectedRoute from '@/components/ProtectedRoute';

interface Prayer {
  id: string;
  title: string;
  content: string;
  prayer_type: string | null;
  is_answered: boolean;
  created_at: string;
  updated_at: string;
}

const PrayerJournal = () => {
  const { user } = useAuth();
  const [prayers, setPrayers] = useState<Prayer[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingPrayer, setEditingPrayer] = useState<Prayer | null>(null);

  const [formData, setFormData] = useState({
    title: '',
    content: '',
    prayer_type: 'general',
  });

  useEffect(() => {
    if (user) {
      fetchPrayers();
    }
  }, [user]);

  const fetchPrayers = async () => {
    if (!user) return;

    setIsLoading(true);
    try {
      const { data, error } = await supabase
        .from('prayer_journal')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false });

      if (error) throw error;
      if (data) setPrayers(data);
    } catch (error) {
      console.error('Error fetching prayers:', error);
      toast.error('Failed to load prayers');
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;

    try {
      if (editingPrayer) {
        // Update existing prayer
        const { error } = await supabase
          .from('prayer_journal')
          .update({
            title: formData.title,
            content: formData.content,
            prayer_type: formData.prayer_type,
          })
          .eq('id', editingPrayer.id);

        if (error) throw error;
        toast.success('Prayer updated successfully');
      } else {
        // Create new prayer
        const { error } = await supabase
          .from('prayer_journal')
          .insert({
            user_id: user.id,
            title: formData.title,
            content: formData.content,
            prayer_type: formData.prayer_type,
          });

        if (error) throw error;
        toast.success('Prayer added to journal');
      }

      setIsDialogOpen(false);
      setFormData({ title: '', content: '', prayer_type: 'general' });
      setEditingPrayer(null);
      fetchPrayers();
    } catch (error) {
      console.error('Error saving prayer:', error);
      toast.error('Failed to save prayer');
    }
  };

  const toggleAnswered = async (prayer: Prayer) => {
    try {
      const { error } = await supabase
        .from('prayer_journal')
        .update({ is_answered: !prayer.is_answered })
        .eq('id', prayer.id);

      if (error) throw error;
      toast.success(prayer.is_answered ? 'Marked as unanswered' : 'Marked as answered!');
      fetchPrayers();
    } catch (error) {
      console.error('Error updating prayer:', error);
      toast.error('Failed to update prayer');
    }
  };

  const deletePrayer = async (id: string) => {
    if (!confirm('Are you sure you want to delete this prayer?')) return;

    try {
      const { error } = await supabase
        .from('prayer_journal')
        .delete()
        .eq('id', id);

      if (error) throw error;
      toast.success('Prayer deleted');
      fetchPrayers();
    } catch (error) {
      console.error('Error deleting prayer:', error);
      toast.error('Failed to delete prayer');
    }
  };

  const openEditDialog = (prayer: Prayer) => {
    setEditingPrayer(prayer);
    setFormData({
      title: prayer.title,
      content: prayer.content,
      prayer_type: prayer.prayer_type || 'general',
    });
    setIsDialogOpen(true);
  };

  const closeDialog = () => {
    setIsDialogOpen(false);
    setEditingPrayer(null);
    setFormData({ title: '', content: '', prayer_type: 'general' });
  };

  const getPrayerTypeColor = (type: string | null) => {
    switch (type) {
      case 'healing': return 'bg-green-500';
      case 'deliverance': return 'bg-purple-500';
      case 'provision': return 'bg-blue-500';
      case 'guidance': return 'bg-yellow-500';
      default: return 'bg-gray-500';
    }
  };

  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-gradient-light">
        {/* Header */}
        <header className="border-b border-border/50 bg-background/80 backdrop-blur-sm">
          <div className="container mx-auto px-4 py-6">
            <div className="flex items-center gap-4 mb-4">
              <Button variant="ghost" size="sm" asChild>
                <Link to="/dashboard">
                  <ChevronLeft className="w-4 h-4 mr-2" />
                  Dashboard
                </Link>
              </Button>
            </div>
            <div className="flex items-center justify-between">
              <div>
                <h1 className="font-serif text-3xl md:text-4xl font-bold flex items-center gap-3">
                  <BookHeart className="w-8 h-8" />
                  Prayer Journal
                </h1>
                <p className="text-muted-foreground mt-2">Record your prayers and track God's faithfulness</p>
              </div>
              <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                <DialogTrigger asChild>
                  <Button onClick={() => closeDialog()}>
                    <Plus className="w-4 h-4 mr-2" />
                    New Prayer
                  </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[525px]">
                  <form onSubmit={handleSubmit}>
                    <DialogHeader>
                      <DialogTitle>{editingPrayer ? 'Edit Prayer' : 'New Prayer Request'}</DialogTitle>
                      <DialogDescription>
                        Write down your prayer request. God hears you.
                      </DialogDescription>
                    </DialogHeader>
                    <div className="grid gap-4 py-4">
                      <div className="grid gap-2">
                        <Label htmlFor="title">Title</Label>
                        <Input
                          id="title"
                          placeholder="What are you praying for?"
                          value={formData.title}
                          onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                          required
                        />
                      </div>
                      <div className="grid gap-2">
                        <Label htmlFor="content">Prayer</Label>
                        <Textarea
                          id="content"
                          placeholder="Write your prayer here..."
                          value={formData.content}
                          onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                          rows={6}
                          required
                        />
                      </div>
                      <div className="grid gap-2">
                        <Label htmlFor="type">Prayer Type</Label>
                        <Select
                          value={formData.prayer_type}
                          onValueChange={(value) => setFormData({ ...formData, prayer_type: value })}
                        >
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="general">General</SelectItem>
                            <SelectItem value="healing">Healing</SelectItem>
                            <SelectItem value="deliverance">Deliverance</SelectItem>
                            <SelectItem value="provision">Provision</SelectItem>
                            <SelectItem value="guidance">Guidance</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                    <DialogFooter>
                      <Button type="button" variant="outline" onClick={closeDialog}>
                        Cancel
                      </Button>
                      <Button type="submit">
                        {editingPrayer ? 'Update Prayer' : 'Save Prayer'}
                      </Button>
                    </DialogFooter>
                  </form>
                </DialogContent>
              </Dialog>
            </div>
          </div>
        </header>

        {/* Prayer List */}
        <div className="container mx-auto px-4 py-8">
          {isLoading ? (
            <div className="text-center py-12">
              <p className="text-muted-foreground">Loading prayers...</p>
            </div>
          ) : prayers.length === 0 ? (
            <Card className="max-w-2xl mx-auto">
              <CardHeader>
                <CardTitle>No Prayers Yet</CardTitle>
                <CardDescription>
                  Start your prayer journal by adding your first prayer request.
                </CardDescription>
              </CardHeader>
            </Card>
          ) : (
            <div className="max-w-4xl mx-auto space-y-4">
              {prayers.map((prayer) => (
                <Card key={prayer.id} className={prayer.is_answered ? 'border-green-500/50 bg-green-50/50 dark:bg-green-950/20' : ''}>
                  <CardHeader>
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <CardTitle className="text-xl">{prayer.title}</CardTitle>
                          {prayer.is_answered && (
                            <Badge className="bg-green-500">
                              <Check className="w-3 h-3 mr-1" />
                              Answered
                            </Badge>
                          )}
                        </div>
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                          <Calendar className="w-3 h-3" />
                          {new Date(prayer.created_at).toLocaleDateString()}
                          {prayer.prayer_type && (
                            <>
                              <span>•</span>
                              <Badge variant="outline" className={`${getPrayerTypeColor(prayer.prayer_type)} text-white border-0`}>
                                {prayer.prayer_type}
                              </Badge>
                            </>
                          )}
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => toggleAnswered(prayer)}
                        >
                          <Check className="w-4 h-4" />
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => openEditDialog(prayer)}
                        >
                          <Edit className="w-4 h-4" />
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => deletePrayer(prayer.id)}
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-foreground/80 whitespace-pre-wrap">{prayer.content}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>
      </div>
    </ProtectedRoute>
  );
};

export default PrayerJournal;
