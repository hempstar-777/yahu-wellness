import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowLeft, Heart, BookOpen, Shield, Lightbulb } from 'lucide-react';

const SpiritualTraumaResources = () => {
  const navigate = useNavigate();

  const resources = [
    {
      category: 'Biblical Foundation for Trauma Healing',
      icon: BookOpen,
      description: 'Understanding trauma through the lens of Scripture and the ministry of the Holy Spirit',
      items: [
        {
          title: 'The Holy Spirit as Comforter',
          scripture: 'John 14:16-17',
          description: '"And I will ask the Father, and he will give you another advocate to help you and be with you forever—the Spirit of truth."',
          application: 'The Holy Spirit is our primary healer and comforter in times of trauma and pain'
        },
        {
          title: 'Healing for the Brokenhearted',
          scripture: 'Psalm 147:3',
          description: '"He heals the brokenhearted and binds up their wounds."',
          application: 'God promises to heal emotional and spiritual wounds through His presence'
        },
        {
          title: 'Beauty from Ashes',
          scripture: 'Isaiah 61:1-3',
          description: 'The Spirit gives us a crown of beauty instead of ashes, the oil of joy instead of mourning',
          application: 'God transforms our trauma into testimonies of His redemptive power'
        }
      ]
    },
    {
      category: 'Holy Spirit-Led Healing Process',
      icon: Heart,
      description: 'Practical steps for Spirit-empowered trauma recovery',
      items: [
        {
          title: 'Step 1: Invitation & Surrender',
          topics: [
            'Invite the Holy Spirit into the traumatic memory',
            'Surrender control and trust God\'s timing',
            'Ask the Spirit to reveal truth and lies',
            'Create a safe space for emotional processing'
          ]
        },
        {
          title: 'Step 2: Spirit-Led Revelation',
          topics: [
            'Allow the Holy Spirit to show you His perspective',
            'Listen for the Father\'s voice speaking truth',
            'Identify lies you believed from the trauma',
            'Receive God\'s truth to replace the lies'
          ]
        },
        {
          title: 'Step 3: Forgiveness & Release',
          topics: [
            'Forgive those who caused harm (by the Spirit\'s power)',
            'Release bitterness and vengeance to God',
            'Break ungodly soul ties formed through trauma',
            'Receive God\'s forgiveness for sinful responses to trauma'
          ]
        },
        {
          title: 'Step 4: Renewing the Mind',
          topics: [
            'Replace traumatic memories with God\'s truth (Romans 12:2)',
            'Declare Scripture over wounded areas',
            'Practice Spirit-led meditation on God\'s Word',
            'Build new neural pathways through praise and worship'
          ]
        },
        {
          title: 'Step 5: Walking in Freedom',
          topics: [
            'Daily communion with the Holy Spirit',
            'Guard your heart from re-traumatization',
            'Share your testimony to help others',
            'Continue in accountability and community'
          ]
        }
      ]
    },
    {
      category: 'Types of Spiritual Trauma',
      icon: Shield,
      items: [
        {
          title: 'Church Hurt & Religious Trauma',
          description: 'Healing from spiritual abuse, legalism, manipulation, and toxic church environments',
          healing: 'Distinguish between God\'s character and people\'s failures; rebuild trust in the true Jesus'
        },
        {
          title: 'Rejection & Abandonment',
          description: 'Deep wounds from being unloved, unwanted, or discarded',
          healing: 'Receive the Father\'s love; break off orphan spirit; identity healing in Christ'
        },
        {
          title: 'Generational Trauma',
          description: 'Inherited pain, patterns, and bondages passed down through family lines',
          healing: 'Break generational curses; receive ancestral healing through Christ\'s blood'
        },
        {
          title: 'Ritual & Satanic Abuse',
          description: 'Severe trauma from occult practices, ritual abuse, or demonic involvement',
          healing: 'Deliverance ministry; dissociation healing; extensive Holy Spirit ministry required'
        }
      ]
    },
    {
      category: 'The Power of the Holy Spirit in Trauma Healing',
      icon: Lightbulb,
      items: [
        {
          title: 'The Spirit Reveals Truth',
          description: 'John 16:13 - The Spirit guides us into all truth, exposing lies we believed from trauma'
        },
        {
          title: 'The Spirit Empowers Forgiveness',
          description: 'We cannot forgive in our own strength, but the Holy Spirit enables supernatural forgiveness'
        },
        {
          title: 'The Spirit Brings Freedom',
          description: '2 Corinthians 3:17 - "Where the Spirit of the Lord is, there is freedom"'
        },
        {
          title: 'The Spirit Transforms Memories',
          description: 'The Holy Spirit can minister to past wounds and reframe memories with God\'s presence'
        },
        {
          title: 'The Spirit Sustains Healing',
          description: 'Ongoing sanctification and healing is a work of the Spirit, not our effort'
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
            <Heart className="h-12 w-12 text-rose-600" />
            <h1 className="text-4xl md:text-5xl font-bold">Spiritual Trauma Healing</h1>
          </div>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Holy Spirit-led inner healing for deep emotional and spiritual wounds
          </p>
        </div>

        <div className="space-y-8">
          {resources.map((resource, idx) => {
            const Icon = resource.icon;
            return (
              <Card key={idx} className="border-2">
                <CardHeader>
                  <div className="flex items-center gap-3">
                    <Icon className="h-8 w-8 text-rose-600" />
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
                    <div key={itemIdx} className="border-l-4 border-rose-600 pl-4 py-2">
                      <h4 className="font-semibold text-lg mb-2">{item.title}</h4>
                      
                      {item.scripture && (
                        <p className="text-sm text-primary font-medium mb-2">{item.scripture}</p>
                      )}
                      
                      {item.description && (
                        <p className="text-muted-foreground mb-2 italic">{item.description}</p>
                      )}
                      
                      {item.application && (
                        <p className="text-foreground font-medium">→ {item.application}</p>
                      )}

                      {item.healing && (
                        <p className="text-green-700 dark:text-green-400 font-medium mt-2">
                          ✓ Healing Path: {item.healing}
                        </p>
                      )}
                      
                      {item.topics && (
                        <ul className="space-y-2 mt-3">
                          {item.topics.map((topic, tIdx) => (
                            <li key={tIdx} className="flex items-start gap-2 text-sm">
                              <span className="text-rose-600 mt-1">•</span>
                              <span>{topic}</span>
                            </li>
                          ))}
                        </ul>
                      )}
                    </div>
                  ))}
                </CardContent>
              </Card>
            );
          })}
        </div>

        <Card className="mt-8 border-2 border-blue-500 bg-blue-50/50 dark:bg-blue-950/20">
          <CardHeader>
            <CardTitle className="text-xl flex items-center gap-2">
              <Heart className="h-6 w-6 text-blue-600" />
              Ministry Approach
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3 text-sm">
            <p className="font-semibold">
              All trauma healing must be Holy Spirit-led, not formula-based
            </p>
            <p>
              While we provide frameworks and steps, true healing comes from an encounter with the living God through His Spirit. Create space for the Holy Spirit to work uniquely in each person's story.
            </p>
            <p>
              <strong>Safety First:</strong> Severe trauma cases require trained ministry teams, professional counseling support, and extensive prayer covering. Never attempt complex trauma ministry alone or without proper training.
            </p>
            <p>
              <strong>Integration:</strong> Trauma healing often requires both spiritual ministry (deliverance, inner healing, prayer) and professional support (therapy, medical care). The Holy Spirit can work through both.
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default SpiritualTraumaResources;
