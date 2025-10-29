import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { 
  Share2, 
  Facebook, 
  MessageCircle, 
  Link, 
  Copy, 
  Check,
  Twitter,
  Mail,
  Download
} from 'lucide-react';

interface SocialShareProps {
  url?: string;
  title?: string;
  description?: string;
  image?: string;
  className?: string;
  showTitle?: boolean;
  variant?: 'default' | 'compact' | 'floating';
}

const SocialShare: React.FC<SocialShareProps> = ({
  url = window.location.href,
  title = 'Khám phá Tà Xùa - Thiên đường săn mây',
  description = 'Trải nghiệm những điểm đến tuyệt vời tại Tà Xùa cùng Sky Quest',
  image = '',
  className = '',
  showTitle = true,
  variant = 'default'
}) => {
  const [copied, setCopied] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const encodedUrl = encodeURIComponent(url);
  const encodedTitle = encodeURIComponent(title);
  const encodedDescription = encodeURIComponent(description);
  const encodedImage = encodeURIComponent(image);

  const shareLinks = {
    facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}&quote=${encodedTitle}`,
    zalo: `https://zalo.me/share?url=${encodedUrl}&title=${encodedTitle}&desc=${encodedDescription}`,
    twitter: `https://twitter.com/intent/tweet?url=${encodedUrl}&text=${encodedTitle}`,
    email: `mailto:?subject=${encodedTitle}&body=${encodedDescription}%0A%0A${encodedUrl}`,
  };

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      // Fallback for older browsers
      const textArea = document.createElement('textarea');
      textArea.value = url;
      document.body.appendChild(textArea);
      textArea.select();
      document.execCommand('copy');
      document.body.removeChild(textArea);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handleShare = (platform: string) => {
    const link = shareLinks[platform as keyof typeof shareLinks];
    if (link) {
      window.open(link, '_blank', 'width=600,height=400,scrollbars=yes,resizable=yes');
    }
  };

  const handleNativeShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title,
          text: description,
          url
        });
      } catch (err) {

      }
    } else {
      setIsOpen(!isOpen);
    }
  };

  if (variant === 'floating') {
    return (
      <div className={`fixed right-4 top-1/2 transform -translate-y-1/2 z-50 ${className}`}>
        <div className="flex flex-col gap-2">
          <Button
            onClick={() => setIsOpen(!isOpen)}
            size="sm"
            className="rounded-full w-12 h-12 shadow-lg"
          >
            <Share2 className="w-4 h-4" />
          </Button>
          
          {isOpen && (
            <Card className="shadow-lg animate-in slide-in-from-right-2">
              <CardContent className="p-2">
                <div className="flex flex-col gap-1">
                  <Button
                    onClick={() => handleShare('facebook')}
                    variant="ghost"
                    size="sm"
                    className="justify-start gap-2 text-blue-600 hover:bg-blue-50"
                  >
                    <Facebook className="w-4 h-4" />
                    Facebook
                  </Button>
                  <Button
                    onClick={() => handleShare('zalo')}
                    variant="ghost"
                    size="sm"
                    className="justify-start gap-2 text-blue-500 hover:bg-blue-50"
                  >
                    <MessageCircle className="w-4 h-4" />
                    Zalo
                  </Button>
                  <Button
                    onClick={handleCopyLink}
                    variant="ghost"
                    size="sm"
                    className="justify-start gap-2"
                  >
                    {copied ? <Check className="w-4 h-4 text-green-500" /> : <Copy className="w-4 h-4" />}
                    {copied ? 'Đã copy!' : 'Copy link'}
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    );
  }

  if (variant === 'compact') {
    return (
      <div className={`flex items-center gap-2 ${className}`}>
        <Button
          onClick={handleNativeShare}
          variant="outline"
          size="sm"
          className="gap-2"
        >
          <Share2 className="w-4 h-4" />
          Chia sẻ
        </Button>
      </div>
    );
  }

  return (
    <Card className={className}>
      <CardContent className="p-6">
        {showTitle && (
          <div className="flex items-center gap-2 mb-4">
            <Share2 className="w-5 h-5 text-primary" />
            <h3 className="text-lg font-semibold">Chia sẻ với bạn bè</h3>
          </div>
        )}

        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {/* Facebook */}
          <Button
            onClick={() => handleShare('facebook')}
            variant="outline"
            className="flex flex-col gap-2 h-auto py-4 text-blue-600 border-blue-200 hover:bg-blue-50"
          >
            <Facebook className="w-6 h-6" />
            <span className="text-sm">Facebook</span>
          </Button>

          {/* Zalo */}
          <Button
            onClick={() => handleShare('zalo')}
            variant="outline"
            className="flex flex-col gap-2 h-auto py-4 text-blue-500 border-blue-200 hover:bg-blue-50"
          >
            <MessageCircle className="w-6 h-6" />
            <span className="text-sm">Zalo</span>
          </Button>

          {/* Twitter */}
          <Button
            onClick={() => handleShare('twitter')}
            variant="outline"
            className="flex flex-col gap-2 h-auto py-4 text-sky-500 border-sky-200 hover:bg-sky-50"
          >
            <Twitter className="w-6 h-6" />
            <span className="text-sm">Twitter</span>
          </Button>

          {/* Email */}
          <Button
            onClick={() => handleShare('email')}
            variant="outline"
            className="flex flex-col gap-2 h-auto py-4 text-gray-600 border-gray-200 hover:bg-gray-50"
          >
            <Mail className="w-6 h-6" />
            <span className="text-sm">Email</span>
          </Button>
        </div>

        {/* Copy Link */}
        <div className="mt-4 p-3 bg-muted/50 rounded-lg">
          <div className="flex items-center gap-2">
            <Link className="w-4 h-4 text-muted-foreground" />
            <span className="text-sm font-medium">Link chia sẻ:</span>
          </div>
          <div className="flex items-center gap-2 mt-2">
            <input
              type="text"
              value={url}
              readOnly
              className="flex-1 px-3 py-2 text-sm bg-white border rounded-md"
            />
            <Button
              onClick={handleCopyLink}
              variant="outline"
              size="sm"
              className="gap-2"
            >
              {copied ? (
                <>
                  <Check className="w-4 h-4 text-green-500" />
                  Đã copy!
                </>
              ) : (
                <>
                  <Copy className="w-4 h-4" />
                  Copy
                </>
              )}
            </Button>
          </div>
        </div>

        {/* Share Statistics */}
        <div className="mt-4 pt-4 border-t">
          <div className="flex items-center justify-between text-sm text-muted-foreground">
            <span>Đã được chia sẻ 1,234 lần</span>
            <div className="flex items-center gap-4">
              <span className="flex items-center gap-1">
                <Facebook className="w-3 h-3" />
                456
              </span>
              <span className="flex items-center gap-1">
                <MessageCircle className="w-3 h-3" />
                321
              </span>
              <span className="flex items-center gap-1">
                <Twitter className="w-3 h-3" />
                123
              </span>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="mt-4 flex gap-2">
          <Button
            variant="ghost"
            size="sm"
            className="gap-2 text-muted-foreground"
            onClick={() => window.print()}
          >
            <Download className="w-4 h-4" />
            In trang
          </Button>
          
          {navigator.share && (
            <Button
              onClick={handleNativeShare}
              variant="ghost"
              size="sm"
              className="gap-2 text-muted-foreground"
            >
              <Share2 className="w-4 h-4" />
              Chia sẻ khác
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default SocialShare;