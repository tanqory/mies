import React from 'react';
import { Button } from '../../components/ui/button';
import { Input } from '../../components/ui/input';
import { Separator } from '../../components/ui/separator';
import { cn } from '../../components/ui/utils';

export interface FooterLink {
  label: string;
  href: string;
}

export interface FooterSection {
  title: string;
  links: FooterLink[];
}

export interface SocialLink {
  platform: string;
  href: string;
  icon: React.ReactNode;
}

export interface FooterProps {
  logo?: React.ReactNode;
  companyName?: string;
  description?: string;
  sections: FooterSection[];
  socialLinks?: SocialLink[];
  newsletter?: {
    title: string;
    description: string;
    placeholder: string;
    buttonText: string;
    onSubmit: (email: string) => void;
  };
  copyright?: string;
  bottomLinks?: FooterLink[];
  className?: string;
  variant?: 'default' | 'minimal' | 'centered';
}

export function Footer({
  logo,
  companyName = 'บริษัท',
  description,
  sections,
  socialLinks = [],
  newsletter,
  copyright,
  bottomLinks = [],
  className,
  variant = 'default',
}: FooterProps) {
  const [email, setEmail] = React.useState('');
  const [isSubscribing, setIsSubscribing] = React.useState(false);

  const currentYear = new Date().getFullYear();
  const defaultCopyright = `© ${currentYear} ${companyName}. สงวนลิขสิทธิ์.`;

  const handleNewsletterSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim() || !newsletter?.onSubmit) return;

    setIsSubscribing(true);
    try {
      await newsletter.onSubmit(email);
      setEmail('');
    } catch (error) {
      console.error('Newsletter subscription error:', error);
    } finally {
      setIsSubscribing(false);
    }
  };

  if (variant === 'minimal') {
    return (
      <footer className={cn('border-t bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60', className)}>
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="py-8 flex flex-col sm:flex-row justify-between items-center space-y-4 sm:space-y-0">
            <div className="flex items-center space-x-4">
              {logo}
              <span className="font-semibold">{companyName}</span>
            </div>
            <div className="flex items-center space-x-6">
              {bottomLinks.map((link, index) => (
                <a
                  key={index}
                  href={link.href}
                  className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                >
                  {link.label}
                </a>
              ))}
            </div>
            <p className="text-sm text-muted-foreground">
              {copyright || defaultCopyright}
            </p>
          </div>
        </div>
      </footer>
    );
  }

  if (variant === 'centered') {
    return (
      <footer className={cn('border-t bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60', className)}>
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="py-12 sm:py-16 text-center">
            <div className="mb-8">
              {logo && (
                <div className="flex justify-center mb-4">
                  {logo}
                </div>
              )}
              <h3 className="text-2xl font-bold mb-2">{companyName}</h3>
              {description && (
                <p className="text-muted-foreground max-w-md mx-auto">
                  {description}
                </p>
              )}
            </div>

            {socialLinks.length > 0 && (
              <div className="flex justify-center space-x-4 mb-8">
                {socialLinks.map((social, index) => (
                  <Button
                    key={index}
                    variant="ghost"
                    size="sm"
                    asChild
                    className="w-10 h-10 p-0"
                  >
                    <a href={social.href} target="_blank" rel="noopener noreferrer">
                      {social.icon}
                    </a>
                  </Button>
                ))}
              </div>
            )}

            <Separator className="mb-8" />

            <div className="flex flex-wrap justify-center gap-6 mb-8">
              {sections.flatMap(section => section.links).map((link, index) => (
                <a
                  key={index}
                  href={link.href}
                  className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                >
                  {link.label}
                </a>
              ))}
            </div>

            <p className="text-sm text-muted-foreground">
              {copyright || defaultCopyright}
            </p>
          </div>
        </div>
      </footer>
    );
  }

  return (
    <footer className={cn('border-t bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60', className)}>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="py-12 sm:py-16">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 gap-8">
            {/* Company Info */}
            <div className="lg:col-span-2 xl:col-span-2">
              <div className="flex items-center space-x-2 mb-4">
                {logo}
                <span className="text-xl font-bold">{companyName}</span>
              </div>
              {description && (
                <p className="text-muted-foreground mb-4 text-sm leading-relaxed">
                  {description}
                </p>
              )}
              {socialLinks.length > 0 && (
                <div className="flex space-x-3">
                  {socialLinks.map((social, index) => (
                    <Button
                      key={index}
                      variant="ghost"
                      size="sm"
                      asChild
                      className="w-9 h-9 p-0 hover:bg-primary hover:text-primary-foreground"
                    >
                      <a href={social.href} target="_blank" rel="noopener noreferrer">
                        {social.icon}
                      </a>
                    </Button>
                  ))}
                </div>
              )}
            </div>

            {/* Navigation Sections */}
            {sections.map((section, index) => (
              <div key={index}>
                <h4 className="font-semibold mb-4">{section.title}</h4>
                <ul className="space-y-3">
                  {section.links.map((link, linkIndex) => (
                    <li key={linkIndex}>
                      <a
                        href={link.href}
                        className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                      >
                        {link.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}

            {/* Newsletter */}
            {newsletter && (
              <div className="lg:col-span-2 xl:col-span-1">
                <h4 className="font-semibold mb-4">{newsletter.title}</h4>
                <p className="text-sm text-muted-foreground mb-4">
                  {newsletter.description}
                </p>
                <form onSubmit={handleNewsletterSubmit} className="space-y-3">
                  <Input
                    type="email"
                    placeholder={newsletter.placeholder}
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="text-sm"
                    required
                  />
                  <Button
                    type="submit"
                    size="sm"
                    className="w-full"
                    disabled={isSubscribing || !email.trim()}
                  >
                    {isSubscribing ? (
                      <>
                        <div className="animate-spin rounded-full h-3 w-3 border-b-2 border-current mr-2"></div>
                        กำลังสมัคร...
                      </>
                    ) : (
                      newsletter.buttonText
                    )}
                  </Button>
                </form>
              </div>
            )}
          </div>
        </div>

        {/* Bottom Section */}
        <div className="py-6 border-t">
          <div className="flex flex-col sm:flex-row justify-between items-center space-y-4 sm:space-y-0">
            <p className="text-sm text-muted-foreground">
              {copyright || defaultCopyright}
            </p>
            {bottomLinks.length > 0 && (
              <div className="flex items-center space-x-6">
                {bottomLinks.map((link, index) => (
                  <a
                    key={index}
                    href={link.href}
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {link.label}
                  </a>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </footer>
  );
}