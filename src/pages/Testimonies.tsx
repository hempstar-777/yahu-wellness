import { useEffect, useState } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ChevronLeft, MessageSquare, Plus, Edit, Trash2, Calendar, Lock, Globe } from 'lucide-react';
import { Link } from 'react-router-dom';
import { toast } from 'sonner';
import ProtectedRoute from '@/components/ProtectedRoute';
import TestimonialMatching from '@/components/TestimonialMatching';
import { useTranslation } from 'react-i18next';

interface Testimony {
  id: string;
  user_id: string;
  title: string;
  content: string;
  is_public: boolean;
  created_at: string;
  updated_at: string;
  profiles?: {
    full_name: string;
  };
}

const Testimonies = () => {
  const { user } = useAuth();
  const { t } = useTranslation();
  const [myTestimonies, setMyTestimonies] = useState<Testimony[]>([]);
  const [publicTestimonies, setPublicTestimonies] = useState<Testimony[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingTestimony, setEditingTestimony] = useState<Testimony | null>(null);

  const [formData, setFormData] = useState({
    title: '',
    content: '',
    is_public: false,
  });

  useEffect(() => {
    if (user) {
      fetchTestimonies();
    }
  }, [user]);

  const fetchTestimonies = async () => {
    if (!user) return;

    setIsLoading(true);
    try {
      // Fetch user's testimonies
      const { data: myData, error: myError } = await supabase
        .from('testimonies')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false });

      if (myError) throw myError;
      if (myData) setMyTestimonies(myData);

      // Fetch public testimonies from other users
      const { data: publicData, error: publicError } = await supabase
        .from('testimonies')
        .select(`
          *,
          profiles:user_id (full_name)
        `)
        .eq('is_public', true)
        .neq('user_id', user.id)
        .order('created_at', { ascending: false })
        .limit(20);

      if (publicError) throw publicError;
      if (publicData) setPublicTestimonies(publicData);
    } catch (error) {
      console.error('Error fetching testimonies:', error);
      toast.error(t('testimonies.failedToLoad'));
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;

    try {
      if (editingTestimony) {
        const { error } = await supabase
          .from('testimonies')
          .update({
            title: formData.title,
            content: formData.content,
            is_public: formData.is_public,
          })
          .eq('id', editingTestimony.id);

        if (error) throw error;
        toast.success(t('testimonies.testimonyUpdated'));
      } else {
        const { error } = await supabase
          .from('testimonies')
          .insert({
            user_id: user.id,
            title: formData.title,
            content: formData.content,
            is_public: formData.is_public,
          });

        if (error) throw error;
        toast.success(t('testimonies.testimonyShared'));
      }

      setIsDialogOpen(false);
      setFormData({ title: '', content: '', is_public: false });
      setEditingTestimony(null);
      fetchTestimonies();
    } catch (error) {
      console.error('Error saving testimony:', error);
      toast.error(t('testimonies.failedToSave'));
    }
  };

  const deleteTestimony = async (id: string) => {
    if (!confirm(t('testimonies.deleteConfirm'))) return;

    try {
      const { error } = await supabase
        .from('testimonies')
        .delete()
        .eq('id', id);

      if (error) throw error;
      toast.success(t('testimonies.testimonyDeleted'));
      fetchTestimonies();
    } catch (error) {
      console.error('Error deleting testimony:', error);
      toast.error(t('testimonies.failedToDelete'));
    }
  };

  const openEditDialog = (testimony: Testimony) => {
    setEditingTestimony(testimony);
    setFormData({
      title: testimony.title,
      content: testimony.content,
      is_public: testimony.is_public,
    });
    setIsDialogOpen(true);
  };

  const closeDialog = () => {
    setIsDialogOpen(false);
    setEditingTestimony(null);
    setFormData({ title: '', content: '', is_public: false });
  };

  const TestimonyCard = ({ testimony, showActions = false }: { testimony: Testimony; showActions?: boolean }) => (
    <Card>
      <CardHeader>
        <div className="flex items-start justify-between gap-4">
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-2">
              <CardTitle className="text-xl">{testimony.title}</CardTitle>
              {testimony.is_public ? (
                <Badge className="gap-1">
                  <Globe className="w-3 h-3" />
                  {t('testimonies.public')}
                </Badge>
              ) : (
                <Badge variant="secondary" className="gap-1">
                  <Lock className="w-3 h-3" />
                  {t('testimonies.private')}
                </Badge>
              )}
            </div>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              {testimony.profiles?.full_name && (
                <span className="font-medium">{testimony.profiles.full_name}</span>
              )}
              {testimony.profiles?.full_name && <span>•</span>}
              <Calendar className="w-3 h-3" />
              {new Date(testimony.created_at).toLocaleDateString()}
            </div>
          </div>
          {showActions && (
            <div className="flex gap-2">
              <Button
                size="sm"
                variant="outline"
                onClick={() => openEditDialog(testimony)}
              >
                <Edit className="w-4 h-4" />
              </Button>
              <Button
                size="sm"
                variant="outline"
                onClick={() => deleteTestimony(testimony.id)}
              >
                <Trash2 className="w-4 h-4" />
              </Button>
            </div>
          )}
        </div>
      </CardHeader>
      <CardContent>
        <p className="text-foreground/80 whitespace-pre-wrap leading-relaxed">{testimony.content}</p>
      </CardContent>
    </Card>
  );

  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-gradient-light">
        <header className="border-b border-border/50 bg-background/80 backdrop-blur-sm">
          <div className="container mx-auto px-4 py-6">
            <div className="flex items-center gap-4 mb-4">
              <Button variant="ghost" size="sm" asChild>
                <Link to="/dashboard">
                  <ChevronLeft className="w-4 h-4 mr-2" />
                  {t('testimonies.dashboard')}
                </Link>
              </Button>
            </div>
            <div className="flex items-center justify-between">
              <div>
                <h1 className="font-serif text-3xl md:text-4xl font-bold flex items-center gap-3">
                  <MessageSquare className="w-8 h-8" />
                  {t('testimonies.title')}
                </h1>
                <p className="text-muted-foreground mt-2">{t('testimonies.subtitle')}</p>
              </div>
              <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                <DialogTrigger asChild>
                  <Button onClick={() => closeDialog()}>
                    <Plus className="w-4 h-4 mr-2" />
                    {t('testimonies.shareTestimony')}
                  </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[625px]">
                  <form onSubmit={handleSubmit}>
                    <DialogHeader>
                      <DialogTitle>{editingTestimony ? t('testimonies.editTestimony') : t('testimonies.shareYourTestimony')}</DialogTitle>
                      <DialogDescription>
                        {t('testimonies.verseQuote')}
                      </DialogDescription>
                    </DialogHeader>
                    <div className="grid gap-4 py-4">
                      <div className="grid gap-2">
                        <Label htmlFor="title">{t('testimonies.titleLabel')}</Label>
                        <Input
                          id="title"
                          placeholder={t('testimonies.titlePlaceholder')}
                          value={formData.title}
                          onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                          required
                        />
                      </div>
                      <div className="grid gap-2">
                        <Label htmlFor="content">{t('testimonies.contentLabel')}</Label>
                        <Textarea
                          id="content"
                          placeholder={t('testimonies.contentPlaceholder')}
                          value={formData.content}
                          onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                          rows={8}
                          required
                        />
                      </div>
                      <div className="flex items-center justify-between space-x-2 p-4 border rounded-lg">
                        <div className="space-y-0.5">
                          <Label htmlFor="public">{t('testimonies.makePublic')}</Label>
                          <p className="text-sm text-muted-foreground">
                            {t('testimonies.makePublicDesc')}
                          </p>
                        </div>
                        <Switch
                          id="public"
                          checked={formData.is_public}
                          onCheckedChange={(checked) => setFormData({ ...formData, is_public: checked })}
                        />
                      </div>
                    </div>
                    <DialogFooter>
                      <Button type="button" variant="outline" onClick={closeDialog}>
                        {t('testimonies.cancel')}
                      </Button>
                      <Button type="submit">
                        {editingTestimony ? t('testimonies.update') : t('testimonies.shareTestimony')}
                      </Button>
                    </DialogFooter>
                  </form>
                </DialogContent>
              </Dialog>
            </div>
          </div>
        </header>

        <div className="container mx-auto px-4 py-8">
          <Tabs defaultValue="my-testimonies" className="max-w-6xl mx-auto">
            <TabsList className="grid w-full grid-cols-2 mb-8">
              <TabsTrigger value="my-testimonies">{t('testimonies.myTestimonies')}</TabsTrigger>
              <TabsTrigger value="community">{t('testimonies.communityTestimonies')}</TabsTrigger>
            </TabsList>

            <TabsContent value="my-testimonies" className="space-y-6">
              {myTestimonies.length > 0 && (
                <TestimonialMatching currentTestimonyId={myTestimonies[0].id} />
              )}
              {isLoading ? (
                <div className="text-center py-12">
                  <p className="text-muted-foreground">{t('testimonies.loadingTestimonies')}</p>
                </div>
              ) : myTestimonies.length === 0 ? (
                <Card>
                  <CardHeader>
                    <CardTitle>{t('testimonies.noTestimoniesYet')}</CardTitle>
                    <CardDescription>
                      {t('testimonies.shareFirstTestimony')}
                    </CardDescription>
                  </CardHeader>
                </Card>
              ) : (
                <div className="space-y-4">
                  {myTestimonies.map((testimony) => (
                    <TestimonyCard key={testimony.id} testimony={testimony} showActions />
                  ))}
                </div>
              )}
            </TabsContent>

            <TabsContent value="community">
              {isLoading ? (
                <div className="text-center py-12">
                  <p className="text-muted-foreground">{t('testimonies.loadingTestimonies')}</p>
                </div>
              ) : publicTestimonies.length === 0 ? (
                <Card>
                  <CardHeader>
                    <CardTitle>{t('testimonies.noPublicTestimonies')}</CardTitle>
                    <CardDescription>
                      {t('testimonies.beTheFirst')}
                    </CardDescription>
                  </CardHeader>
                </Card>
              ) : (
                <div className="space-y-4">
                  {publicTestimonies.map((testimony) => (
                    <TestimonyCard key={testimony.id} testimony={testimony} />
                  ))}
                </div>
              )}
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </ProtectedRoute>
  );
};

export default Testimonies;
