import { Award, Star, GraduationCap, Crown, Trophy } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';

interface UserBadgeProps {
  badgeType: string;
  badgeCategory?: string;
  badgeLevel?: number;
  badgeData?: any;
  size?: 'sm' | 'md' | 'lg';
}

export const UserBadge = ({ badgeType, badgeCategory, badgeLevel, badgeData, size = 'md' }: UserBadgeProps) => {
  const getBadgeConfig = () => {
    const categoryNames: Record<string, string> = {
      deliverance: 'Deliverance',
      intercessors: 'Intercession',
      trauma: 'Inner Healing',
      naturalHealing: 'Natural Healing',
      tribunals: 'Courts of Heaven'
    };

    const categoryColors: Record<string, string> = {
      deliverance: 'bg-blue-100 text-blue-800 border-blue-300',
      intercessors: 'bg-purple-100 text-purple-800 border-purple-300',
      trauma: 'bg-rose-100 text-rose-800 border-rose-300',
      naturalHealing: 'bg-green-100 text-green-800 border-green-300',
      tribunals: 'bg-amber-100 text-amber-800 border-amber-300'
    };

    switch (badgeType) {
      case 'member':
        return {
          icon: Star,
          label: 'Member',
          color: 'bg-slate-100 text-slate-800 border-slate-300',
          description: 'Community Member'
        };
      case 'course_completion':
        return {
          icon: Award,
          label: `${categoryNames[badgeCategory || '']} - Level ${badgeLevel}`,
          color: categoryColors[badgeCategory || ''] || 'bg-gray-100 text-gray-800 border-gray-300',
          description: `Completed ${categoryNames[badgeCategory || '']} Level ${badgeLevel}`
        };
      case 'subject_expert':
        return {
          icon: Trophy,
          label: `${categoryNames[badgeCategory || '']} Expert`,
          color: categoryColors[badgeCategory || ''] || 'bg-gray-100 text-gray-800 border-gray-300',
          description: `Expert in ${categoryNames[badgeCategory || '']}`
        };
      case 'full_course_diploma':
        return {
          icon: GraduationCap,
          label: `${categoryNames[badgeCategory || '']} Graduate`,
          color: 'bg-gradient-to-r from-yellow-100 to-amber-100 text-amber-900 border-amber-400',
          description: `Completed full ${categoryNames[badgeCategory || '']} course`
        };
      default:
        return {
          icon: Award,
          label: 'Achievement',
          color: 'bg-gray-100 text-gray-800 border-gray-300',
          description: 'Special achievement'
        };
    }
  };

  const config = getBadgeConfig();
  const Icon = config.icon;
  
  const sizeClasses = {
    sm: 'h-3 w-3',
    md: 'h-4 w-4',
    lg: 'h-5 w-5'
  };

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <Badge variant="outline" className={`${config.color} border-2 gap-1.5`}>
            <Icon className={sizeClasses[size]} />
            <span className="text-xs font-semibold">{config.label}</span>
          </Badge>
        </TooltipTrigger>
        <TooltipContent>
          <p>{config.description}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};