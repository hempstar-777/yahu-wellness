import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ChevronLeft, AlertCircle } from "lucide-react";
import { Link } from "react-router-dom";
import { Alert, AlertDescription } from "@/components/ui/alert";

const TermsOfService = () => {
  return (
    <div className="min-h-screen bg-gradient-light">
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
              <h1 className="font-serif text-2xl md:text-3xl font-bold">Terms of Service</h1>
              <p className="text-sm text-muted-foreground">Last Updated: October 2025</p>
            </div>
          </div>
        </div>
      </header>

      <section className="container mx-auto px-4 py-8 pb-16">
        <div className="max-w-4xl mx-auto space-y-6">
          <Alert className="border-destructive/30 bg-destructive/5">
            <AlertCircle className="h-5 w-5 text-destructive" />
            <AlertDescription className="text-sm leading-relaxed">
              <strong>Critical Notice:</strong> This app provides spiritual guidance based on Messianic/Hebrew roots teachings. It is NOT medical treatment, psychiatric care, or licensed therapy. By using this app, you acknowledge these limitations and agree to seek professional help for medical or mental health crises.
            </AlertDescription>
          </Alert>

          <Card className="p-6 md:p-8 border-primary/20 shadow-elevated space-y-8">
            <section>
              <h2 className="font-serif text-2xl font-bold mb-4">1. Acceptance of Terms</h2>
              <p className="text-foreground/80 leading-relaxed">
                By accessing or using the Spiritual Freedom & Deliverance app, you agree to be bound by these Terms of Service. 
                If you do not agree to these terms, do not use this app.
              </p>
            </section>

            <section>
              <h2 className="font-serif text-2xl font-bold mb-4">2. Medical & Professional Care Disclaimer</h2>
              <div className="space-y-4 text-foreground/80 leading-relaxed">
                <p className="font-semibold text-destructive">
                  THIS APP IS NOT MEDICAL TREATMENT, PSYCHIATRIC CARE, OR LICENSED THERAPY.
                </p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>This app provides spiritual guidance based on Messianic/Hebrew roots teachings and biblical principles</li>
                  <li>We do NOT diagnose, treat, cure, or prevent any medical condition, mental health disorder, or disease</li>
                  <li>Our content is NOT a substitute for professional medical advice, diagnosis, or treatment</li>
                  <li>Spiritual deliverance works ALONGSIDE professional care - it does not replace it</li>
                  <li>We guide you toward healing that your body and soul are divinely designed by Yahuah to experience</li>
                </ul>
                <p className="font-semibold">
                  ALWAYS seek professional help for:
                </p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Mental health crises or suicidal thoughts (Call 988 or 911)</li>
                  <li>Severe trauma, PTSD, or dissociative disorders</li>
                  <li>Substance abuse or addiction (requires medical detox and treatment)</li>
                  <li>Self-harm or eating disorders</li>
                  <li>Sexual assault trauma (RAINN: 1-800-656-4673)</li>
                  <li>Any medical symptoms or emergencies</li>
                </ul>
              </div>
            </section>

            <section>
              <h2 className="font-serif text-2xl font-bold mb-4">3. Content Rating & Age Restrictions</h2>
              <div className="space-y-4 text-foreground/80 leading-relaxed">
                <p>
                  <strong>Age Rating:</strong> This app is rated for users 13+ (Teen) due to mature spiritual themes including:
                </p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Discussion of trauma, abuse, and spiritual warfare</li>
                  <li>References to occult practices for educational/renunciation purposes</li>
                  <li>Mature biblical teachings on sin, deliverance, and spiritual bondage</li>
                </ul>
                <p>
                  Users under 18 should use this app with parental guidance. Parents are responsible for monitoring their children's use.
                </p>
              </div>
            </section>

            <section>
              <h2 className="font-serif text-2xl font-bold mb-4">4. User Content & Testimonies</h2>
              <div className="space-y-4 text-foreground/80 leading-relaxed">
                <p>
                  When you submit testimonies or user content to this app:
                </p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>You retain ownership of your content</li>
                  <li>You grant us permission to display, moderate, and remove content as needed</li>
                  <li>Public testimonies may be visible to other users - only toggle "public" if you consent</li>
                  <li>We reserve the right to remove content that violates these terms or contains harmful material</li>
                  <li>You agree not to post content that is illegal, hateful, harassing, or violates others' rights</li>
                </ul>
              </div>
            </section>

            <section>
              <h2 className="font-serif text-2xl font-bold mb-4">5. VIP Membership & Payments</h2>
              <div className="space-y-4 text-foreground/80 leading-relaxed">
                <p>
                  VIP membership provides early access to features:
                </p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>All payments are processed securely through Stripe</li>
                  <li>VIP pricing and benefits are clearly disclosed before purchase</li>
                  <li>By purchasing VIP, you agree to the pricing and terms displayed at checkout</li>
                  <li>Refunds are handled per our refund policy (contact support for requests)</li>
                  <li>VIP status grants access to premium features but does not guarantee specific spiritual outcomes</li>
                </ul>
              </div>
            </section>

            <section>
              <h2 className="font-serif text-2xl font-bold mb-4">6. Privacy & Data Security</h2>
              <div className="space-y-4 text-foreground/80 leading-relaxed">
                <p>
                  We take your privacy seriously:
                </p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>We collect: Email (for authentication), assessment results, prayer journal entries, and optional testimonies</li>
                  <li>Your data is encrypted and protected with Row-Level Security via Lovable Cloud</li>
                  <li>We do NOT sell or share your personal data with third parties (except as required by law)</li>
                  <li>Public testimonies you choose to share may be visible to other users</li>
                  <li>You can request data deletion by contacting support</li>
                </ul>
                <p>
                  For full details, see our Privacy Policy (available in-app or on request).
                </p>
              </div>
            </section>

            <section>
              <h2 className="font-serif text-2xl font-bold mb-4">7. Spiritual Beliefs & Religious Freedom</h2>
              <div className="space-y-4 text-foreground/80 leading-relaxed">
                <p>
                  This app promotes Messianic/Hebrew roots teachings:
                </p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>We believe in Yahuah (The Most High) and Yahusha Ha Mashiach (the Messiah)</li>
                  <li>Our teachings focus on spiritual freedom through biblical deliverance principles</li>
                  <li>We reference Hebraic names and teachings that pre-date institutional religious corruption</li>
                  <li>We do NOT promote hate toward any group - our content identifies spiritual practices (not people) that conflict with biblical teachings</li>
                  <li>Users are free to use or not use this app based on their personal beliefs</li>
                </ul>
              </div>
            </section>

            <section>
              <h2 className="font-serif text-2xl font-bold mb-4">8. Limitation of Liability</h2>
              <div className="space-y-4 text-foreground/80 leading-relaxed">
                <p className="font-semibold">
                  TO THE MAXIMUM EXTENT PERMITTED BY LAW:
                </p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>This app is provided "AS IS" without warranties of any kind</li>
                  <li>We are NOT liable for any harm, injury, or damages resulting from use of this app</li>
                  <li>We are NOT responsible for spiritual, emotional, or physical outcomes of deliverance practices</li>
                  <li>You assume full responsibility for your own spiritual journey and any decisions you make</li>
                  <li>Our maximum liability to you shall not exceed the amount you paid for VIP membership (if any)</li>
                </ul>
              </div>
            </section>

            <section>
              <h2 className="font-serif text-2xl font-bold mb-4">9. Changes to Terms</h2>
              <p className="text-foreground/80 leading-relaxed">
                We may update these Terms of Service at any time. Continued use of the app after changes constitutes acceptance of the new terms. 
                We will notify users of significant changes via in-app notice or email.
              </p>
            </section>

            <section>
              <h2 className="font-serif text-2xl font-bold mb-4">10. Contact & Support</h2>
              <p className="text-foreground/80 leading-relaxed">
                For questions, support requests, or data deletion requests, please contact us through the app's support feature or via email 
                (contact information available in the app settings).
              </p>
            </section>

            <section>
              <h2 className="font-serif text-2xl font-bold mb-4">11. Governing Law</h2>
              <p className="text-foreground/80 leading-relaxed">
                These terms are governed by the laws of [Your Jurisdiction]. Any disputes shall be resolved through binding arbitration 
                in accordance with applicable arbitration rules.
              </p>
            </section>
          </Card>

          <div className="text-center">
            <Button asChild size="lg" className="bg-gradient-spiritual shadow-elevated">
              <Link to="/">Return to Home</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default TermsOfService;
