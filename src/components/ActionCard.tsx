import React from 'react';
import { LucideIcon } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

interface ActionCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
  actionLabel: string;
  actionPath: string;
  iconColor?: string;
  gradientFrom?: string;
  gradientTo?: string;
}

const ActionCard: React.FC<ActionCardProps> = ({
  icon: Icon,
  title,
  description,
  actionLabel,
  actionPath,
  iconColor = "text-blue-200",
  gradientFrom = "from-blue-500/20",
  gradientTo = "to-teal-500/20"
}) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(actionPath);
  };

  return (
    <Card className={`relative overflow-hidden bg-gradient-to-br ${gradientFrom} ${gradientTo} backdrop-blur-sm border-white/20 hover:border-white/30 transition-all duration-300 hover:scale-105 cursor-pointer group`}>
      <div className="absolute inset-0 bg-white/5 group-hover:bg-white/10 transition-colors duration-300" />
      
      <CardHeader className="relative z-10 text-center pb-4">
        <div className="flex justify-center mb-4">
          <div className="p-3 rounded-full bg-white/10 group-hover:bg-white/20 transition-colors duration-300">
            <Icon className={`w-8 h-8 ${iconColor}`} />
          </div>
        </div>
        <CardTitle className="text-white text-lg font-semibold mb-2">
          {title}
        </CardTitle>
        <CardDescription className="text-white/80 text-sm leading-relaxed">
          {description}
        </CardDescription>
      </CardHeader>
      
      <CardContent className="relative z-10 pt-0 pb-6">
        <div className="flex justify-center">
          <Button
            onClick={handleClick}
            variant="ghost"
            size="sm"
            className="text-white hover:bg-white/20 border border-white/30 hover:border-white/50 transition-all duration-300"
          >
            {actionLabel}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default ActionCard;