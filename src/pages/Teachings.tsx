import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ChevronLeft, BookOpen, Scale, User, Droplet, Sparkles, Bug, Cross, Shield } from "lucide-react";
import { Link } from "react-router-dom";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const Teachings = () => {
  return (
    <div className="min-h-screen bg-gradient-light">
      {/* Header */}
      <header className="border-b border-border/50 bg-background/80 backdrop-blur-sm sticky top-0 z-10">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="sm" asChild>
              <Link to="/">
                <ChevronLeft className="w-4 h-4 mr-2" />
                Back
              </Link>
            </Button>
            <div>
              <h1 className="font-serif text-2xl md:text-3xl font-bold">Spiritual Teachings</h1>
              <p className="text-sm text-muted-foreground">Deep foundations for complete transformation</p>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <Tabs defaultValue="courts" className="max-w-6xl mx-auto">
          <TabsList className="grid w-full grid-cols-2 lg:grid-cols-4 gap-2 h-auto p-2 bg-muted/50">
            <TabsTrigger value="courts" className="flex items-center gap-2">
              <Scale className="w-4 h-4" />
              <span className="hidden sm:inline">Courts of Heaven</span>
              <span className="sm:hidden">Courts</span>
            </TabsTrigger>
            <TabsTrigger value="anatomy" className="flex items-center gap-2">
              <User className="w-4 h-4" />
              <span className="hidden sm:inline">Body/Soul/Spirit</span>
              <span className="sm:hidden">Anatomy</span>
            </TabsTrigger>
            <TabsTrigger value="blood" className="flex items-center gap-2">
              <Droplet className="w-4 h-4" />
              <span className="hidden sm:inline">Blood of Yahusha</span>
              <span className="sm:hidden">Blood</span>
            </TabsTrigger>
            <TabsTrigger value="spirit" className="flex items-center gap-2">
              <Sparkles className="w-4 h-4" />
              <span className="hidden sm:inline">Holy Spirit</span>
              <span className="sm:hidden">Spirit</span>
            </TabsTrigger>
          </TabsList>

          <TabsList className="grid w-full grid-cols-2 lg:grid-cols-4 gap-2 h-auto p-2 bg-muted/50 mt-2">
            <TabsTrigger value="hierarchy" className="flex items-center gap-2">
              <Shield className="w-4 h-4" />
              <span className="hidden sm:inline">Spiritual Hierarchy</span>
              <span className="sm:hidden">Hierarchy</span>
            </TabsTrigger>
            <TabsTrigger value="parasites" className="flex items-center gap-2">
              <Bug className="w-4 h-4" />
              <span className="hidden sm:inline">Parasites & Disease</span>
              <span className="sm:hidden">Parasites</span>
            </TabsTrigger>
            <TabsTrigger value="warfare" className="flex items-center gap-2">
              <Cross className="w-4 h-4" />
              <span className="hidden sm:inline">Spiritual Warfare</span>
              <span className="sm:hidden">Warfare</span>
            </TabsTrigger>
            <TabsTrigger value="connection" className="flex items-center gap-2">
              <BookOpen className="w-4 h-4" />
              <span className="hidden sm:inline">The Connection</span>
              <span className="sm:hidden">Connection</span>
            </TabsTrigger>
          </TabsList>

          {/* Courts of Heaven */}
          <TabsContent value="courts" className="space-y-6 mt-6">
            <Card className="p-8 border-primary/20 shadow-elevated">
              <h2 className="font-serif text-3xl font-bold mb-4">Operating in the Courts of Heaven</h2>
              
              <div className="space-y-6 text-foreground/90 leading-relaxed">
                <p className="text-lg">
                  The Courts of Heaven is a biblical reality where believers can present legal cases before Yahuah 
                  as Judge, countering accusations from the enemy and obtaining divine verdicts for breakthrough.
                </p>

                <div className="bg-accent/30 p-6 rounded-lg space-y-3">
                  <h3 className="font-semibold text-xl">Biblical Foundation</h3>
                  <ul className="space-y-2 list-disc list-inside">
                    <li><strong>Daniel 7:9-10</strong> - The Ancient of Days seated with books opened</li>
                    <li><strong>Revelation 12:10</strong> - Satan as the accuser of the brethren</li>
                    <li><strong>Job 1-2</strong> - Legal accusations brought before Yahuah</li>
                    <li><strong>Hebrews 12:23-24</strong> - We come to the Judge of all and the blood that speaks</li>
                  </ul>
                </div>

                <div className="space-y-4">
                  <h3 className="font-semibold text-xl">How the Courts Operate</h3>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="bg-muted/50 p-4 rounded-lg">
                      <h4 className="font-semibold mb-2">1. The Accuser's Case</h4>
                      <p className="text-sm">Satan brings legal accusations based on sins, agreements, covenants, and generational iniquities that give him legal right to operate in your life.</p>
                    </div>
                    <div className="bg-muted/50 p-4 rounded-lg">
                      <h4 className="font-semibold mb-2">2. Your Defense</h4>
                      <p className="text-sm">Present the Blood of Yahusha as your defense, confess and repent of all legal grounds, and ask the Judge to render verdicts in your favor.</p>
                    </div>
                    <div className="bg-muted/50 p-4 rounded-lg">
                      <h4 className="font-semibold mb-2">3. Books of Record</h4>
                      <p className="text-sm">Heaven keeps records. Ask Yahuah to seal records of sin with the Blood, open books of destiny, and write new decrees over your life.</p>
                    </div>
                    <div className="bg-muted/50 p-4 rounded-lg">
                      <h4 className="font-semibold mb-2">4. Divine Verdicts</h4>
                      <p className="text-sm">Once the Judge rules, all demonic assignments are revoked. You receive legal authority to enforce the verdict through deliverance.</p>
                    </div>
                  </div>
                </div>

                <div className="bg-gradient-divine text-primary-foreground p-6 rounded-lg">
                  <h3 className="font-semibold text-xl mb-3">Prayer Template for Courts Access</h3>
                  <div className="text-sm space-y-2 font-mono">
                    <p>"Father Yahuah, I come before Your Courts as Judge of all the earth.</p>
                    <p>I present the Blood of Yahusha Ha Mashiach as my defense against every accusation.</p>
                    <p>I ask that all legal grounds the enemy has used against me be revoked.</p>
                    <p>Let the books of my sin be sealed by the Blood and the books of my destiny be opened.</p>
                    <p>I ask for verdicts of breakthrough, healing, freedom, and restoration.</p>
                    <p>I receive Your rulings and enforce them in the earthly realm. Amen."</p>
                  </div>
                </div>

                <div className="bg-muted/30 p-4 rounded-lg">
                  <p className="text-sm text-muted-foreground">
                    <strong>Note:</strong> Operating in the Courts is not a substitute for basic deliverance but a powerful 
                    supplement when dealing with legal hindrances, curses, and resistant strongholds that require judicial 
                    verdicts from heaven.
                  </p>
                </div>
              </div>
            </Card>
          </TabsContent>

          {/* Body/Soul/Spirit */}
          <TabsContent value="anatomy" className="space-y-6 mt-6">
            <Card className="p-8 border-primary/20 shadow-elevated">
              <h2 className="font-serif text-3xl font-bold mb-4">Understanding Your Triune Nature</h2>
              
              <div className="space-y-6 text-foreground/90 leading-relaxed">
                <p className="text-lg">
                  Humanity is created as a triune being—spirit, soul, and body—reflecting the image of the triune Yahuah. 
                  Understanding these three parts is essential for effective deliverance and spiritual warfare.
                </p>

                <div className="bg-accent/30 p-6 rounded-lg space-y-3">
                  <h3 className="font-semibold text-xl">Biblical Foundation</h3>
                  <p><strong>1 Thessalonians 5:23</strong> - "May your whole spirit, soul and body be preserved blameless"</p>
                  <p><strong>Hebrews 4:12</strong> - "The word of God divides between soul and spirit"</p>
                </div>

                <div className="grid md:grid-cols-3 gap-6">
                  <Card className="p-6 bg-gradient-spiritual text-primary-foreground">
                    <h3 className="font-semibold text-xl mb-3">1. The Spirit</h3>
                    <div className="space-y-2 text-sm">
                      <p><strong>Function:</strong> Your eternal, God-conscious part</p>
                      <p><strong>Characteristics:</strong></p>
                      <ul className="list-disc list-inside space-y-1">
                        <li>Communicates with Yahuah</li>
                        <li>Born again at salvation</li>
                        <li>Seat of conscience</li>
                        <li>Intuition and revelation</li>
                        <li>Worship capacity</li>
                      </ul>
                      <p className="mt-3"><strong>Deliverance Focus:</strong> Usually clean after salvation, but can be wounded by trauma</p>
                    </div>
                  </Card>

                  <Card className="p-6 bg-gradient-divine text-primary-foreground">
                    <h3 className="font-semibold text-xl mb-3">2. The Soul</h3>
                    <div className="space-y-2 text-sm">
                      <p><strong>Function:</strong> Your mind, will, and emotions</p>
                      <p><strong>Characteristics:</strong></p>
                      <ul className="list-disc list-inside space-y-1">
                        <li>Mind (thoughts, memories)</li>
                        <li>Will (decisions, choices)</li>
                        <li>Emotions (feelings)</li>
                        <li>Personality</li>
                        <li>Self-consciousness</li>
                      </ul>
                      <p className="mt-3"><strong>Deliverance Focus:</strong> Primary battleground—most demons attach here through wounds, traumas, agreements</p>
                    </div>
                  </Card>

                  <Card className="p-6 bg-muted">
                    <h3 className="font-semibold text-xl mb-3">3. The Body</h3>
                    <div className="space-y-2 text-sm">
                      <p><strong>Function:</strong> Your physical, world-conscious part</p>
                      <p><strong>Characteristics:</strong></p>
                      <ul className="list-disc list-inside space-y-1">
                        <li>Five senses</li>
                        <li>Physical health</li>
                        <li>Appetites and desires</li>
                        <li>Temple of Holy Spirit</li>
                        <li>World interaction</li>
                      </ul>
                      <p className="mt-3"><strong>Deliverance Focus:</strong> Can house spirits of infirmity, sexual demons, addictions manifesting physically</p>
                    </div>
                  </Card>
                </div>

                <div className="bg-muted/50 p-6 rounded-lg">
                  <h3 className="font-semibold text-xl mb-3">Why This Matters for Deliverance</h3>
                  <div className="space-y-3 text-sm">
                    <p><strong>Soul Wounds:</strong> Traumas create openings in the soul where demons attach. Inner healing addresses soul wounds while deliverance removes demons.</p>
                    <p><strong>Spirit vs. Soul:</strong> Your spirit is saved, but your soul must be renewed (Romans 12:2). Demons operate primarily in the unrenewed soul.</p>
                    <p><strong>Body Connection:</strong> Some physical diseases are rooted in spiritual bondage. After deliverance from spirits of infirmity, physical healing often follows.</p>
                    <p><strong>Integration:</strong> True freedom requires addressing all three: spirit filled with Holy Spirit, soul healed and renewed, body submitted as a living sacrifice.</p>
                  </div>
                </div>
              </div>
            </Card>
          </TabsContent>

          {/* Blood of Yahusha */}
          <TabsContent value="blood" className="space-y-6 mt-6">
            <Card className="p-8 border-primary/20 shadow-elevated">
              <h2 className="font-serif text-3xl font-bold mb-4">The Power of Yahusha's Blood</h2>
              
              <div className="space-y-6 text-foreground/90 leading-relaxed">
                <p className="text-lg">
                  The Blood of Yahusha Ha Mashiach is the most powerful weapon in spiritual warfare. 
                  It speaks a better word than the blood of Abel—it speaks mercy, redemption, and total victory.
                </p>

                <div className="bg-gradient-divine text-primary-foreground p-6 rounded-lg">
                  <h3 className="font-semibold text-xl mb-3">Seven-Fold Power of the Blood</h3>
                  <div className="grid md:grid-cols-2 gap-4 text-sm">
                    <div>
                      <p className="font-semibold">1. Redemption (Ephesians 1:7)</p>
                      <p className="opacity-90">Purchased from sin's slave market</p>
                    </div>
                    <div>
                      <p className="font-semibold">2. Forgiveness (1 John 1:9)</p>
                      <p className="opacity-90">Cleanses from all unrighteousness</p>
                    </div>
                    <div>
                      <p className="font-semibold">3. Justification (Romans 5:9)</p>
                      <p className="opacity-90">Declared righteous before Yahuah</p>
                    </div>
                    <div>
                      <p className="font-semibold">4. Sanctification (Hebrews 13:12)</p>
                      <p className="opacity-90">Set apart for holy purposes</p>
                    </div>
                    <div>
                      <p className="font-semibold">5. Overcoming Power (Revelation 12:11)</p>
                      <p className="opacity-90">Victory over the accuser</p>
                    </div>
                    <div>
                      <p className="font-semibold">6. Access to Yahuah (Hebrews 10:19)</p>
                      <p className="opacity-90">Boldness to enter the Holy Place</p>
                    </div>
                    <div className="md:col-span-2">
                      <p className="font-semibold">7. Peace with Yahuah (Colossians 1:20)</p>
                      <p className="opacity-90">Reconciliation through the cross</p>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <h3 className="font-semibold text-xl">Pleading the Blood in Spiritual Warfare</h3>
                  <div className="bg-accent/30 p-6 rounded-lg space-y-4">
                    <div>
                      <h4 className="font-semibold mb-2">How to Apply the Blood:</h4>
                      <ul className="space-y-2 text-sm list-disc list-inside">
                        <li><strong>Speak it audibly:</strong> "I plead the Blood of Yahusha over..."</li>
                        <li><strong>Cover your person:</strong> Spirit, soul, body, mind, will, emotions</li>
                        <li><strong>Cover your space:</strong> Home, property, vehicle, workplace</li>
                        <li><strong>Cover relationships:</strong> Family, children, spouse, ministry</li>
                        <li><strong>Cancel assignments:</strong> "By the Blood, I cancel every demonic assignment"</li>
                        <li><strong>Seal records:</strong> "I ask the Blood to seal all records of sin in heaven's courts"</li>
                      </ul>
                    </div>

                    <div className="bg-background/50 p-4 rounded-lg">
                      <h4 className="font-semibold mb-2">Declaration Example:</h4>
                      <p className="text-sm font-mono">
                        "I plead and apply the Blood of Yahusha Ha Mashiach over my entire being—spirit, soul, and body. 
                        I declare the Blood cleanses me from all sin, cancels every legal right of the enemy, 
                        and establishes Yahuah's purposes in my life. By the Blood, I overcome. 
                        By the Blood, I am protected. By the Blood, I am victorious!"
                      </p>
                    </div>
                  </div>
                </div>

                <div className="bg-muted/50 p-6 rounded-lg">
                  <h3 className="font-semibold text-xl mb-3">The Blood in the Courts of Heaven</h3>
                  <p className="text-sm mb-3">
                    In the Courts of Heaven, the Blood speaks as your legal defense. When the accuser brings charges, 
                    the Blood provides evidence of:
                  </p>
                  <ul className="space-y-2 text-sm list-disc list-inside">
                    <li>Full payment for all sin (past, present, future)</li>
                    <li>Broken power of generational curses</li>
                    <li>Cancelled certificates of debt (Colossians 2:14)</li>
                    <li>Revoked legal grounds for demonic operation</li>
                    <li>Established covenant relationship with Yahuah</li>
                  </ul>
                </div>

                <div className="border-l-4 border-primary pl-4">
                  <p className="italic text-muted-foreground">
                    "The Blood doesn't just cover sin—it speaks! Hebrews 12:24 says it speaks a better word. 
                    When you plead the Blood, you're not asking for mercy; you're presenting legal evidence 
                    of payment already made. The case is closed!"
                  </p>
                </div>
              </div>
            </Card>
          </TabsContent>

          {/* Holy Spirit */}
          <TabsContent value="spirit" className="space-y-6 mt-6">
            <Card className="p-8 border-primary/20 shadow-elevated">
              <h2 className="font-serif text-3xl font-bold mb-4">The Ruach HaKodesh (Holy Spirit)</h2>
              
              <div className="space-y-6 text-foreground/90 leading-relaxed">
                <p className="text-lg">
                  The Holy Spirit is not just a force—He is Yahuah Himself, the third person of the Trinity, 
                  actively working in believers for transformation, power, and intimate fellowship with the Father.
                </p>

                <div className="bg-accent/30 p-6 rounded-lg">
                  <h3 className="font-semibold text-xl mb-3">Three Experiences with the Holy Spirit</h3>
                  <div className="space-y-4">
                    <div className="bg-background/50 p-4 rounded-lg">
                      <h4 className="font-semibold mb-2">1. Indwelling (Salvation)</h4>
                      <p className="text-sm">At salvation, the Holy Spirit comes to live inside you (Romans 8:9). This is permanent and seals you for eternity (Ephesians 1:13-14).</p>
                    </div>
                    <div className="bg-background/50 p-4 rounded-lg">
                      <h4 className="font-semibold mb-2">2. Filling (Daily Walk)</h4>
                      <p className="text-sm">Being filled is a continuous experience (Ephesians 5:18). You can be filled multiple times. The filling brings joy, power, and fruit.</p>
                    </div>
                    <div className="bg-background/50 p-4 rounded-lg">
                      <h4 className="font-semibold mb-2">3. Baptism (Power for Service)</h4>
                      <p className="text-sm">The baptism in the Holy Spirit empowers for witness and ministry (Acts 1:8). Often accompanied by speaking in tongues and manifestation of gifts.</p>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <h3 className="font-semibold text-xl">The Holy Spirit in Deliverance</h3>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="bg-muted/50 p-4 rounded-lg">
                      <h4 className="font-semibold mb-2">Reveals Bondages</h4>
                      <p className="text-sm">The Holy Spirit exposes hidden sins, traumas, and demonic strongholds through conviction, revelation, and discernment.</p>
                    </div>
                    <div className="bg-muted/50 p-4 rounded-lg">
                      <h4 className="font-semibold mb-2">Empowers Prayer</h4>
                      <p className="text-sm">Praying in tongues releases the Spirit's perfect intercession when you don't know how to pray (Romans 8:26-27).</p>
                    </div>
                    <div className="bg-muted/50 p-4 rounded-lg">
                      <h4 className="font-semibold mb-2">Drives Out Demons</h4>
                      <p className="text-sm">Yahusha cast out demons by the Spirit of God (Matthew 12:28). The Holy Spirit gives power and authority over evil spirits.</p>
                    </div>
                    <div className="bg-muted/50 p-4 rounded-lg">
                      <h4 className="font-semibold mb-2">Fills Empty Places</h4>
                      <p className="text-sm">After deliverance, the Holy Spirit must fill the void or demons return (Matthew 12:43-45). Invite Him to fill every area.</p>
                    </div>
                    <div className="bg-muted/50 p-4 rounded-lg">
                      <h4 className="font-semibold mb-2">Produces Fruit</h4>
                      <p className="text-sm">The Spirit transforms character (Galatians 5:22-23), replacing demonic fruit with divine fruit.</p>
                    </div>
                    <div className="bg-muted/50 p-4 rounded-lg">
                      <h4 className="font-semibold mb-2">Leads into Truth</h4>
                      <p className="text-sm">The Spirit guides you into all truth (John 16:13), breaking deception and establishing freedom in reality.</p>
                    </div>
                  </div>
                </div>

                <div className="bg-gradient-divine text-primary-foreground p-6 rounded-lg">
                  <h3 className="font-semibold text-xl mb-3">Prayer to Invite the Holy Spirit's Filling</h3>
                  <div className="text-sm space-y-2 font-mono">
                    <p>"Father Yahuah, I thank You for the gift of Your Holy Spirit.</p>
                    <p>I ask You now to fill me completely—spirit, soul, and body.</p>
                    <p>Fill every area that has been emptied through deliverance.</p>
                    <p>Fill my mind with Your thoughts, my will with Your desires, my emotions with Your joy.</p>
                    <p>Holy Spirit, I yield to You completely. Have Your way in me.</p>
                    <p>Release Your gifts, Your fruit, and Your power through my life.</p>
                    <p>I receive You now in Yahusha's name. Amen."</p>
                  </div>
                </div>

                <div className="border-l-4 border-primary pl-4">
                  <p className="text-sm text-muted-foreground">
                    <strong>CRITICAL:</strong> Never attempt deliverance without inviting the Holy Spirit's filling afterward. 
                    Empty places become invitations for demons to return with greater force. The goal isn't just freedom FROM demons—it's 
                    freedom FOR intimacy with the Holy Spirit.
                  </p>
                </div>
              </div>
            </Card>
          </TabsContent>

          {/* Spiritual Hierarchy */}
          <TabsContent value="hierarchy" className="space-y-6 mt-6">
            <Card className="p-8 border-primary/20 shadow-elevated">
              <h2 className="font-serif text-3xl font-bold mb-4">The Demonic Hierarchy</h2>
              
              <div className="space-y-6 text-foreground/90 leading-relaxed">
                <p className="text-lg">
                  Understanding the structure and function of demonic forces helps you pray strategically and enforce 
                  Yahusha's victory effectively. We don't fear them—we know their rank to dismantle their operations.
                </p>

                <div className="bg-accent/30 p-6 rounded-lg">
                  <h3 className="font-semibold text-xl mb-3">Biblical Foundation</h3>
                  <p className="text-lg italic mb-3">"For we wrestle not against flesh and blood, but against principalities, against powers, against the rulers of the darkness of this world, against spiritual wickedness in high places." - Ephesians 6:12</p>
                  <p className="text-sm">This verse reveals a structured hierarchy with specific ranks and functions in Satan's kingdom.</p>
                </div>

                <div className="space-y-4">
                  <h3 className="font-semibold text-xl">The Four Ranks</h3>
                  
                  <Card className="p-6 bg-gradient-spiritual text-primary-foreground">
                    <div className="flex items-start gap-4">
                      <div className="flex-shrink-0 w-12 h-12 rounded-full bg-background/20 flex items-center justify-center font-bold text-xl">1</div>
                      <div className="space-y-2">
                        <h4 className="text-xl font-semibold">Principalities (Archai)</h4>
                        <p className="text-sm opacity-90">
                          <strong>Function:</strong> Highest ranking demons assigned over nations, regions, cities. 
                          They control culture, government, religion, and societal structures.
                        </p>
                        <p className="text-sm opacity-90">
                          <strong>Examples:</strong> Prince of Persia (Daniel 10:13), Prince of Greece. These territorial spirits 
                          resist God's purposes over geographic areas and people groups.
                        </p>
                        <p className="text-sm opacity-90">
                          <strong>Strategy:</strong> Require persistent, corporate prayer. Breakthrough comes through fasting, 
                          worship, and sustained intercession by many believers.
                        </p>
                      </div>
                    </div>
                  </Card>

                  <Card className="p-6 bg-gradient-divine text-primary-foreground">
                    <div className="flex items-start gap-4">
                      <div className="flex-shrink-0 w-12 h-12 rounded-full bg-background/20 flex items-center justify-center font-bold text-xl">2</div>
                      <div className="space-y-2">
                        <h4 className="text-xl font-semibold">Powers (Exousiai)</h4>
                        <p className="text-sm opacity-90">
                          <strong>Function:</strong> Authorities that enforce demonic orders from principalities. 
                          They operate in specific spheres: education, media, entertainment, business sectors.
                        </p>
                        <p className="text-sm opacity-90">
                          <strong>Examples:</strong> Spirit of Jezebel (control/witchcraft), Spirit of Leviathan (pride), 
                          Python spirit (divination/fortune-telling), Spirit of Religion (false doctrine).
                        </p>
                        <p className="text-sm opacity-90">
                          <strong>Strategy:</strong> Bind their authority, break their assignments over institutions, 
                          and command them to release their grip on systems and people.
                        </p>
                      </div>
                    </div>
                  </Card>

                  <Card className="p-6 bg-muted">
                    <div className="flex items-start gap-4">
                      <div className="flex-shrink-0 w-12 h-12 rounded-full bg-accent flex items-center justify-center font-bold text-xl">3</div>
                      <div className="space-y-2">
                        <h4 className="text-xl font-semibold">Rulers of Darkness (Kosmokratoras)</h4>
                        <p className="text-sm">
                          <strong>Function:</strong> World rulers that maintain spiritual darkness over specific areas of life. 
                          They blind minds to the gospel and promote false worldviews.
                        </p>
                        <p className="text-sm">
                          <strong>Examples:</strong> Spirit of Antichrist (opposes Yahusha), Spirit of the Age (worldliness), 
                          Strongman spirits over families (generational bondage), Mind-binding spirits (intellectual pride).
                        </p>
                        <p className="text-sm">
                          <strong>Strategy:</strong> Break their rule through proclamation of truth, spiritual warfare against 
                          deception, and establishing Kingdom authority.
                        </p>
                      </div>
                    </div>
                  </Card>

                  <Card className="p-6 border-destructive/50 bg-destructive/5">
                    <div className="flex items-start gap-4">
                      <div className="flex-shrink-0 w-12 h-12 rounded-full bg-destructive/20 flex items-center justify-center font-bold text-xl">4</div>
                      <div className="space-y-2">
                        <h4 className="text-xl font-semibold">Spiritual Wickedness in High Places (Pneumatika)</h4>
                        <p className="text-sm">
                          <strong>Function:</strong> Personal demons that attach to individuals through sin, trauma, 
                          occult involvement, and generational iniquity. These are the "ground troops."
                        </p>
                        <p className="text-sm">
                          <strong>Examples:</strong> Spirits of lust, anger, fear, depression, addiction, infirmity, poverty, 
                          rejection, shame, suicide, trauma, and thousands of others.
                        </p>
                        <p className="text-sm">
                          <strong>Strategy:</strong> Self-deliverance is possible at this level! Use the 5-step process: 
                          Confess, Repent, Renounce, Bind, Cast Out. These flee when you enforce your authority.
                        </p>
                      </div>
                    </div>
                  </Card>
                </div>

                <div className="bg-muted/50 p-6 rounded-lg">
                  <h3 className="font-semibold text-xl mb-3">Why They're There</h3>
                  <div className="space-y-3 text-sm">
                    <p><strong>Purpose:</strong> To steal, kill, and destroy (John 10:10). To keep humans from knowing Yahuah, 
                    experiencing freedom, and fulfilling Kingdom purposes.</p>
                    <p><strong>Legal Rights:</strong> They can only operate where they have legal ground—sin, unforgiveness, 
                    trauma, occult involvement, curses, and generational iniquity.</p>
                    <p><strong>Limited Authority:</strong> They are defeated foes (Colossians 2:15). Yahusha stripped them of 
                    power at the cross. They only have the authority you give them through agreement.</p>
                    <p><strong>Eviction Process:</strong> Remove legal grounds → Revoke agreements → Exercise authority in Yahusha's name → They must leave!</p>
                  </div>
                </div>

                <div className="border-l-4 border-primary pl-4">
                  <p className="italic text-muted-foreground">
                    "The higher the rank, the more strategic the warfare. Personal demons flee quickly. 
                    Principalities require sustained prayer. But remember—Yahusha has defeated them ALL. 
                    You're not fighting FOR victory; you're enforcing the victory already won!"
                  </p>
                </div>
              </div>
            </Card>
          </TabsContent>

          {/* Parasites & Disease */}
          <TabsContent value="parasites" className="space-y-6 mt-6">
            <Card className="p-8 border-primary/20 shadow-elevated">
              <h2 className="font-serif text-3xl font-bold mb-4">Parasites, Demons & Physical Disease</h2>
              
              <div className="space-y-6 text-foreground/90 leading-relaxed">
                <div className="bg-destructive/10 border border-destructive/30 p-6 rounded-lg">
                  <p className="text-lg font-semibold mb-2">⚠️ Critical Understanding</p>
                  <p className="text-sm">
                    This teaching does NOT replace medical care. Always seek appropriate medical treatment. 
                    However, many physical conditions have spiritual roots that medical science cannot address. 
                    Complete healing often requires both natural and spiritual intervention.
                  </p>
                </div>

                <div className="space-y-4">
                  <h3 className="font-semibold text-xl">The Connection Between Parasites and Demons</h3>
                  <p>
                    Research and deliverance experience reveal a striking correlation between physical parasites 
                    and demonic spirits. While not all parasites are demonic, many demonic infestations manifest 
                    through or alongside parasitic activity.
                  </p>

                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="bg-accent/30 p-4 rounded-lg">
                      <h4 className="font-semibold mb-2">Physical Parasites</h4>
                      <ul className="space-y-1 text-sm list-disc list-inside">
                        <li>Invade the body as external organisms</li>
                        <li>Feed off nutrients and energy</li>
                        <li>Release toxins that affect brain function</li>
                        <li>Can influence thoughts, cravings, mood</li>
                        <li>Affect 80%+ of population unknowingly</li>
                        <li>Linked to chronic fatigue, brain fog, autoimmune issues</li>
                      </ul>
                    </div>
                    <div className="bg-accent/30 p-4 rounded-lg">
                      <h4 className="font-semibold mb-2">Spiritual Parasites (Demons)</h4>
                      <ul className="space-y-1 text-sm list-disc list-inside">
                        <li>Attach to spirit, soul, or body</li>
                        <li>Feed off negative emotions and sin</li>
                        <li>Release spiritual toxins (lies, oppression)</li>
                        <li>Control thoughts, emotions, behaviors</li>
                        <li>Operate through trauma and legal grounds</li>
                        <li>Linked to chronic illness, mental torment, addiction</li>
                      </ul>
                    </div>
                  </div>
                </div>

                <div className="bg-muted/50 p-6 rounded-lg">
                  <h3 className="font-semibold text-xl mb-3">How Parasites Can Take Over Your Thoughts</h3>
                  <div className="space-y-3 text-sm">
                    <p>
                      <strong>Toxoplasma Gondii:</strong> A common parasite that alters brain chemistry and has been 
                      linked to risk-taking behavior, aggression, and even suicide. It literally changes how you think.
                    </p>
                    <p>
                      <strong>Gut-Brain Axis:</strong> Parasites in the gut release chemicals that travel to the brain, 
                      affecting mood, memory, and decision-making. They can create cravings for the foods they need to survive.
                    </p>
                    <p>
                      <strong>Demonic Enhancement:</strong> Demons can use parasitic infestations as physical anchors. 
                      The physical parasite creates the mental/emotional dysfunction, and the demon amplifies it into 
                      full spiritual bondage.
                    </p>
                    <p>
                      <strong>Thought Insertion:</strong> When demons are present, thoughts that aren't yours appear 
                      in your mind—suicidal ideation, perverse thoughts, blasphemy, self-hatred. These are not your thoughts; 
                      they're demonic suggestions.
                    </p>
                  </div>
                </div>

                <div className="space-y-4">
                  <h3 className="font-semibold text-xl">Diseases with No Physical Cure</h3>
                  <p>
                    Some conditions resist all medical treatment because their root is spiritual, not physical. 
                    The Bible calls them "spirits of infirmity" (Luke 13:11-13).
                  </p>

                  <div className="bg-gradient-divine text-primary-foreground p-6 rounded-lg">
                    <h4 className="font-semibold mb-3">Common Conditions with Spiritual Roots:</h4>
                    <div className="grid md:grid-cols-2 gap-4 text-sm">
                      <div>
                        <p className="font-semibold">Physical:</p>
                        <ul className="list-disc list-inside space-y-1 opacity-90">
                          <li>Chronic fatigue syndrome</li>
                          <li>Fibromyalgia</li>
                          <li>Autoimmune diseases</li>
                          <li>Migraines and chronic pain</li>
                          <li>Cancer (some cases)</li>
                          <li>Barrenness/infertility</li>
                        </ul>
                      </div>
                      <div>
                        <p className="font-semibold">Mental/Emotional:</p>
                        <ul className="list-disc list-inside space-y-1 opacity-90">
                          <li>Treatment-resistant depression</li>
                          <li>Bipolar disorder</li>
                          <li>Schizophrenia symptoms</li>
                          <li>Obsessive thoughts</li>
                          <li>Panic attacks</li>
                          <li>Eating disorders</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-muted/50 p-6 rounded-lg">
                  <h3 className="font-semibold text-xl mb-3">The Integrated Approach to Healing</h3>
                  <div className="space-y-3">
                    <div className="bg-background/50 p-4 rounded-lg">
                      <h4 className="font-semibold mb-2">1. Physical Intervention</h4>
                      <p className="text-sm">Parasite cleanse protocols, detoxification, proper nutrition, medical treatment where appropriate.</p>
                    </div>
                    <div className="bg-background/50 p-4 rounded-lg">
                      <h4 className="font-semibold mb-2">2. Spiritual Deliverance</h4>
                      <p className="text-sm">Identify and remove spirits of infirmity through the 5-step process. Command them to leave in Yahusha's name.</p>
                    </div>
                    <div className="bg-background/50 p-4 rounded-lg">
                      <h4 className="font-semibold mb-2">3. Soul Healing</h4>
                      <p className="text-sm">Address trauma, unforgiveness, and soul wounds that gave the spirits legal access.</p>
                    </div>
                    <div className="bg-background/50 p-4 rounded-lg">
                      <h4 className="font-semibold mb-2">4. Ongoing Maintenance</h4>
                      <p className="text-sm">Walk in holiness, maintain boundaries, and regularly declare your healing and freedom.</p>
                    </div>
                  </div>
                </div>

                <div className="border-l-4 border-primary pl-4">
                  <p className="italic text-muted-foreground text-sm">
                    "Yahusha healed the woman bent over for 18 years by casting out a spirit of infirmity (Luke 13). 
                    He didn't give her physical therapy—He addressed the spiritual root. When demons of sickness are removed, 
                    the body often heals spontaneously. Don't neglect the spiritual dimension of health!"
                  </p>
                </div>
              </div>
            </Card>
          </TabsContent>

          {/* Spiritual Warfare */}
          <TabsContent value="warfare" className="space-y-6 mt-6">
            <Card className="p-8 border-primary/20 shadow-elevated">
              <h2 className="font-serif text-3xl font-bold mb-4">Comprehensive Spiritual Warfare</h2>
              
              <div className="space-y-6 text-foreground/90 leading-relaxed">
                <p className="text-lg">
                  Spiritual warfare is not optional for believers—it's the reality we live in. But we don't fight from a place 
                  of defeat; we enforce the victory Yahusha already won at Calvary.
                </p>

                <div className="bg-gradient-spiritual text-primary-foreground p-6 rounded-lg">
                  <h3 className="font-semibold text-xl mb-3">The Armor of God (Ephesians 6:14-18)</h3>
                  <div className="grid md:grid-cols-2 gap-4 text-sm">
                    <div className="space-y-2">
                      <p><strong>Belt of Truth:</strong> Know and declare the Word</p>
                      <p><strong>Breastplate of Righteousness:</strong> Walk in holiness</p>
                      <p><strong>Shoes of Peace:</strong> Stand firm in the Gospel</p>
                    </div>
                    <div className="space-y-2">
                      <p><strong>Shield of Faith:</strong> Quench fiery darts with belief</p>
                      <p><strong>Helmet of Salvation:</strong> Protect your mind</p>
                      <p><strong>Sword of the Spirit:</strong> Wield the Word offensively</p>
                    </div>
                  </div>
                  <p className="mt-4 text-sm opacity-90">These are not literal items—they represent spiritual realities you must actively PUT ON daily through declaration and decision.</p>
                </div>

                <div className="space-y-4">
                  <h3 className="font-semibold text-xl">Weapons of Warfare</h3>
                  <div className="grid md:grid-cols-3 gap-4">
                    <div className="bg-muted/50 p-4 rounded-lg">
                      <h4 className="font-semibold mb-2">The Blood of Yahusha</h4>
                      <p className="text-sm">Your primary legal defense and weapon. Plead it, apply it, declare it over every situation.</p>
                    </div>
                    <div className="bg-muted/50 p-4 rounded-lg">
                      <h4 className="font-semibold mb-2">The Name of Yahusha</h4>
                      <p className="text-sm">Demons flee at His name. Use it with authority and faith in every command.</p>
                    </div>
                    <div className="bg-muted/50 p-4 rounded-lg">
                      <h4 className="font-semibold mb-2">The Word of God</h4>
                      <p className="text-sm">Scripture spoken audibly is a sword that pierces demonic strongholds and establishes truth.</p>
                    </div>
                    <div className="bg-muted/50 p-4 rounded-lg">
                      <h4 className="font-semibold mb-2">Prayer & Fasting</h4>
                      <p className="text-sm">Some spirits only come out through prayer and fasting (Mark 9:29). Increase spiritual power.</p>
                    </div>
                    <div className="bg-muted/50 p-4 rounded-lg">
                      <h4 className="font-semibold mb-2">Worship</h4>
                      <p className="text-sm">High praises create a hostile environment for demons. They flee when you magnify Yahuah.</p>
                    </div>
                    <div className="bg-muted/50 p-4 rounded-lg">
                      <h4 className="font-semibold mb-2">Testimony</h4>
                      <p className="text-sm">Declaring what God has done releases breakthrough for others (Revelation 12:11).</p>
                    </div>
                  </div>
                </div>

                <div className="bg-accent/30 p-6 rounded-lg">
                  <h3 className="font-semibold text-xl mb-3">Strategic Warfare Principles</h3>
                  <ul className="space-y-2 text-sm list-decimal list-inside">
                    <li><strong>Know Your Authority:</strong> You have the same authority Yahusha gave His disciples (Luke 10:19)</li>
                    <li><strong>Identify the Enemy:</strong> Discern what specific spirits are operating before engaging</li>
                    <li><strong>Remove Legal Grounds:</strong> Confess and repent of anything giving the enemy legal access</li>
                    <li><strong>Speak Audibly:</strong> Warfare happens in the spoken word, not just thoughts</li>
                    <li><strong>Be Persistent:</strong> Some battles require sustained prayer over days or weeks</li>
                    <li><strong>Don't Fear:</strong> Fear is a weapon of the enemy. Perfect love casts out fear (1 John 4:18)</li>
                    <li><strong>Stay Protected:</strong> Put on the armor daily and plead the Blood over yourself</li>
                    <li><strong>Fill the Void:</strong> After deliverance, fill with Holy Spirit, Word, worship, and fellowship</li>
                  </ul>
                </div>

                <div className="bg-muted/50 p-6 rounded-lg">
                  <h3 className="font-semibold text-xl mb-3">Daily Warfare Declaration</h3>
                  <div className="text-sm space-y-2 font-mono bg-background/50 p-4 rounded-lg">
                    <p>"I declare that I am seated with Christ in heavenly places, far above all principalities and powers.</p>
                    <p>I put on the full armor of God and stand firm in the authority of Yahusha.</p>
                    <p>I plead the Blood of Yahusha over my life, family, home, and assignments.</p>
                    <p>I bind every evil spirit assigned against me and command you to leave now.</p>
                    <p>I cancel every assignment, curse, hex, vex, spell, and witchcraft prayer spoken against me.</p>
                    <p>I break every soul tie and ungodly covenant in Yahusha's name.</p>
                    <p>I declare that no weapon formed against me shall prosper.</p>
                    <p>I am more than a conqueror through Christ who loves me. I walk in victory today!"</p>
                  </div>
                </div>
              </div>
            </Card>
          </TabsContent>

          {/* The Connection */}
          <TabsContent value="connection" className="space-y-6 mt-6">
            <Card className="p-8 border-primary/20 shadow-elevated">
              <h2 className="font-serif text-3xl font-bold mb-4">How Everything Is Connected</h2>
              
              <div className="space-y-6 text-foreground/90 leading-relaxed">
                <p className="text-lg">
                  The spiritual and physical realms are not separate—they're deeply interconnected. Understanding these 
                  connections is crucial for experiencing complete freedom and transformation.
                </p>

                <div className="bg-gradient-divine text-primary-foreground p-6 rounded-lg">
                  <h3 className="font-semibold text-xl mb-3">The Integrated Reality</h3>
                  <p className="text-sm">
                    Your spirit affects your soul. Your soul affects your body. Your body affects your spirit. 
                    Sin creates openings for demons. Demons create physical symptoms. Physical parasites create 
                    mental dysfunction. Mental dysfunction creates spiritual vulnerability. It's all connected in a complex web.
                  </p>
                </div>

                <div className="space-y-4">
                  <h3 className="font-semibold text-xl">The Connection Map</h3>
                  
                  <div className="grid md:grid-cols-2 gap-6">
                    <Card className="p-6 bg-accent/30">
                      <h4 className="font-semibold text-lg mb-3">Generational → Personal</h4>
                      <p className="text-sm mb-3">Sins of ancestors open doors for generational curses and demons that pass down family lines.</p>
                      <p className="text-sm">These create predispositions: alcoholism, sexual addiction, poverty, depression, disease.</p>
                      <p className="text-sm mt-3 italic">Solution: Confess generational iniquity, break agreements, cut ties.</p>
                    </Card>

                    <Card className="p-6 bg-accent/30">
                      <h4 className="font-semibold text-lg mb-3">Trauma → Soul Wounds → Demons</h4>
                      <p className="text-sm mb-3">Trauma creates fragmentation in the soul. Wounded parts become hiding places for demons.</p>
                      <p className="text-sm">Inner healing addresses the wound; deliverance removes the demonic attachment.</p>
                      <p className="text-sm mt-3 italic">Solution: Forgiveness, healing prayer, deliverance, filling with Holy Spirit.</p>
                    </Card>

                    <Card className="p-6 bg-accent/30">
                      <h4 className="font-semibold text-lg mb-3">Sin → Legal Ground → Oppression</h4>
                      <p className="text-sm mb-3">Every unconfessed sin gives demons legal right to operate in that area of your life.</p>
                      <p className="text-sm">The longer the sin persists, the stronger the demonic grip becomes.</p>
                      <p className="text-sm mt-3 italic">Solution: Immediate confession, repentance, renunciation, deliverance.</p>
                    </Card>

                    <Card className="p-6 bg-accent/30">
                      <h4 className="font-semibold text-lg mb-3">Demons → Physical Disease → Death</h4>
                      <p className="text-sm mb-3">Spirits of infirmity attach to the body and manifest as chronic illness, pain, and disease.</p>
                      <p className="text-sm">If unaddressed, they progress toward premature death (John 10:10).</p>
                      <p className="text-sm mt-3 italic">Solution: Command spirits of infirmity to leave, receive healing, maintain health.</p>
                    </Card>

                    <Card className="p-6 bg-accent/30">
                      <h4 className="font-semibold text-lg mb-3">Parasites → Thoughts → Behavior</h4>
                      <p className="text-sm mb-3">Physical parasites release toxins affecting brain chemistry and creating cravings.</p>
                      <p className="text-sm">Demons exploit this to insert thoughts and control behavior patterns.</p>
                      <p className="text-sm mt-3 italic">Solution: Parasite cleanse + spiritual deliverance + mind renewal.</p>
                    </Card>

                    <Card className="p-6 bg-accent/30">
                      <h4 className="font-semibold text-lg mb-3">Deliverance → Void → Refilling</h4>
                      <p className="text-sm mb-3">Casting out demons creates empty space that MUST be filled with the Holy Spirit.</p>
                      <p className="text-sm">Empty places invite demons to return with greater force (Matthew 12:43-45).</p>
                      <p className="text-sm mt-3 italic">Solution: Immediate filling with Holy Spirit, Word, worship, fellowship.</p>
                    </Card>
                  </div>
                </div>

                <div className="bg-muted/50 p-6 rounded-lg">
                  <h3 className="font-semibold text-xl mb-3">The Courts Connection</h3>
                  <p className="text-sm mb-3">
                    All of these connections are enforced through legal mechanisms in the Courts of Heaven:
                  </p>
                  <ul className="space-y-2 text-sm list-disc list-inside">
                    <li>Satan brings accusations based on sin, trauma, and generational iniquity</li>
                    <li>These accusations give him legal rights to afflict, oppress, and attack</li>
                    <li>The Blood of Yahusha is your legal defense that cancels all accusations</li>
                    <li>When you confess and repent, the Judge rules in your favor</li>
                    <li>Divine verdicts revoke demonic legal rights and mandate their eviction</li>
                    <li>You then enforce heaven's verdicts on earth through deliverance</li>
                  </ul>
                </div>

                <div className="space-y-4">
                  <h3 className="font-semibold text-xl">The Complete Freedom Process</h3>
                  <div className="bg-gradient-spiritual text-primary-foreground p-6 rounded-lg">
                    <ol className="space-y-3 text-sm list-decimal list-inside">
                      <li><strong>Assess:</strong> Take comprehensive assessments to identify all bondages</li>
                      <li><strong>Confess:</strong> Acknowledge all sin—personal, generational, and trauma agreements</li>
                      <li><strong>Courts:</strong> Present your case in the Courts of Heaven for divine verdicts</li>
                      <li><strong>Repent:</strong> Turn from all sin and break victim agreements from trauma</li>
                      <li><strong>Forgive:</strong> Release all offenders to break demonic access through unforgiveness</li>
                      <li><strong>Renounce:</strong> Break all agreements with sins, spirits, and strongholds</li>
                      <li><strong>Bind:</strong> Bind every evil spirit with chains of spiritual authority</li>
                      <li><strong>Cast Out:</strong> Command all spirits to leave in Yahusha's mighty name</li>
                      <li><strong>Cleanse:</strong> Physical parasite cleanse if needed for complete healing</li>
                      <li><strong>Fill:</strong> Invite Holy Spirit to fill every area—spirit, soul, body</li>
                      <li><strong>Heal:</strong> Receive inner healing for soul wounds and trauma</li>
                      <li><strong>Renew:</strong> Transform your mind through the Word (Romans 12:2)</li>
                      <li><strong>Maintain:</strong> Walk in holiness, stay filled, and guard your freedom</li>
                    </ol>
                  </div>
                </div>

                <div className="border-l-4 border-primary pl-4">
                  <p className="italic text-muted-foreground">
                    "You're not just a body with a soul. You're an eternal spirit with a soul living temporarily in a body. 
                    When you address all three dimensions—spirit, soul, body—and break the legal mechanisms through the Courts, 
                    you experience complete transformation. This is holistic deliverance!"
                  </p>
                </div>
              </div>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Teachings;