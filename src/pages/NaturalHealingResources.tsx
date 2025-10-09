import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowLeft, ExternalLink, BookOpen, Leaf, Heart } from 'lucide-react';

const NaturalHealingResources = () => {
  const navigate = useNavigate();

  const resources = [
    {
      category: 'Master Herbalist - Yahki Awakened',
      icon: Leaf,
      description: 'World-renowned master healer specializing in intracellular detoxification, cellular regeneration, and holistic revitalization through wild-crafted herbs',
      items: [
        {
          title: 'Yahki Awakened Official Website',
          url: 'https://yahkiawakened.com',
          description: 'Access to highest quality wild-crafted herbs, herbal programs, and the 3Bitters formula'
        },
        {
          title: 'Yahki Health Clinic Consultations',
          url: 'https://yahkihealthclinic.com/consultations/',
          description: 'One-on-one consultations with trained herbal counselors and therapists'
        },
        {
          title: 'Key Teachings',
          description: 'The body was created to heal and regenerate itself when provided with the right environmental conditions',
          highlights: [
            'Intracellular detoxification protocols',
            'Anti-parasitic herbal therapies',
            'System-specific herbal treatments (cardiovascular, digestive, nervous, etc.)',
            'Wild-crafted alkaline herbs and teas',
            'Cellular regeneration through proper nutrition'
          ]
        }
      ]
    },
    {
      category: 'Biblical Natural Healing',
      icon: BookOpen,
      items: [
        {
          title: 'Genesis 1:29 - God\'s Original Diet',
          description: '"I give you every seed-bearing plant on the face of the whole earth and every tree that has fruit with seed in it. They will be yours for food."'
        },
        {
          title: 'Ezekiel 47:12 - Leaves for Healing',
          description: '"Their fruit will serve for food and their leaves for healing."'
        }
      ]
    },
    {
      category: 'Anti-Parasitic Protocols',
      icon: Heart,
      items: [
        {
          title: 'Spiritual-Physical Connection',
          description: 'Understanding how physical parasites can create spiritual doorways and how to address both aspects simultaneously'
        },
        {
          title: 'Herbal Anti-Parasitic Formulas',
          highlights: [
            'Wormwood (Biblical herb mentioned in Revelation)',
            'Black walnut hull',
            'Clove',
            '3Bitters herbal blend (Yahki Awakened)',
            'Pumpkin seeds',
            'Garlic and onion (Biblical foods)'
          ]
        },
        {
          title: 'Detoxification Support',
          highlights: [
            'Bentonite clay for binding toxins',
            'Activated charcoal',
            'Diatomaceous earth (food grade)',
            'Herbal bitters for liver support',
            'Cilantro and chlorella for heavy metals'
          ]
        }
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-secondary/20">
      <div className="container mx-auto px-4 py-8 max-w-5xl">
        <Button
          variant="ghost"
          onClick={() => navigate('/courses')}
          className="mb-6"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Courses
        </Button>

        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-3 mb-4">
            <Leaf className="h-12 w-12 text-green-600" />
            <h1 className="text-4xl md:text-5xl font-bold">Natural Healing Resources</h1>
          </div>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Biblical principles, master herbalist teachings, and anti-parasitic protocols for holistic mind-body-spirit wellness
          </p>
        </div>

        <div className="space-y-8">
          {resources.map((resource, idx) => {
            const Icon = resource.icon;
            return (
              <Card key={idx} className="border-2">
                <CardHeader>
                  <div className="flex items-center gap-3">
                    <Icon className="h-8 w-8 text-green-600" />
                    <CardTitle className="text-2xl">{resource.category}</CardTitle>
                  </div>
                  {resource.description && (
                    <CardDescription className="text-base mt-2">
                      {resource.description}
                    </CardDescription>
                  )}
                </CardHeader>
                <CardContent className="space-y-6">
                  {resource.items.map((item, itemIdx) => (
                    <div key={itemIdx} className="border-l-4 border-green-600 pl-4 py-2">
                      <div className="flex items-start justify-between gap-4">
                        <div className="flex-1">
                          <h4 className="font-semibold text-lg mb-2">{item.title}</h4>
                          {item.description && (
                            <p className="text-muted-foreground mb-3">{item.description}</p>
                          )}
                          {item.highlights && (
                            <ul className="space-y-2">
                              {item.highlights.map((highlight, hIdx) => (
                                <li key={hIdx} className="flex items-start gap-2 text-sm">
                                  <span className="text-green-600 mt-1">✓</span>
                                  <span>{highlight}</span>
                                </li>
                              ))}
                            </ul>
                          )}
                        </div>
                        {item.url && (
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => window.open(item.url, '_blank')}
                          >
                            <ExternalLink className="h-4 w-4 mr-2" />
                            Visit
                          </Button>
                        )}
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>
            );
          })}
        </div>

        <Card className="mt-8 border-2 border-amber-500 bg-amber-50/50">
          <CardHeader>
            <CardTitle className="text-xl">⚠️ Important Disclaimer</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3 text-sm">
            <p>
              This information is provided for educational purposes only and is not intended to diagnose, treat, cure, or prevent any disease.
            </p>
            <p>
              Always consult with a qualified healthcare practitioner before beginning any herbal protocol, especially if you are pregnant, nursing, taking medications, or have a medical condition.
            </p>
            <p>
              The spiritual warfare aspect of parasites and disease should be addressed through prayer, deliverance ministry, and biblical counsel in addition to natural protocols.
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default NaturalHealingResources;
