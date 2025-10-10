import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

const courseNames: Record<string, string> = {
  deliverance: 'School of Deliverance',
  intercessors: 'School of Intercession',
  trauma: 'Spiritual Trauma & Inner Healing',
  naturalHealing: 'Natural & Holistic Healing',
  tribunals: 'Courts of Heaven'
};

const courseLevels: Record<string, number> = {
  deliverance: 4,
  intercessors: 3,
  trauma: 3,
  naturalHealing: 4,
  tribunals: 3
};

export const awardCourseCompletionBadge = async (
  userId: string,
  courseId: string,
  levelIndex: number
) => {
  try {
    // Check if badge already exists
    const { data: existing } = await supabase
      .from('user_badges' as any)
      .select('id')
      .eq('user_id', userId)
      .eq('badge_type', 'course_completion')
      .eq('badge_category', courseId)
      .eq('badge_level', levelIndex)
      .maybeSingle();

    if (existing) return;

    // Award the badge
    const { error } = await supabase
      .from('user_badges' as any)
      .insert({
        user_id: userId,
        badge_type: 'course_completion',
        badge_category: courseId,
        badge_level: levelIndex,
        badge_data: {
          title: `${courseNames[courseId]} - Level ${levelIndex}`,
          description: `Completed Level ${levelIndex}`
        }
      });

    if (error) throw error;
  } catch (error) {
    console.error('Error awarding badge:', error);
  }
};

export const awardCourseCertificate = async (
  userId: string,
  courseId: string,
  levelIndex: number,
  levelName: string
) => {
  try {
    // Check if certificate already exists
    const { data: existing } = await supabase
      .from('user_certificates' as any)
      .select('id')
      .eq('user_id', userId)
      .eq('course_id', courseId)
      .eq('level_index', levelIndex)
      .maybeSingle();

    if (existing) return;

    // Award the certificate
    const { error } = await supabase
      .from('user_certificates' as any)
      .insert({
        user_id: userId,
        certificate_type: 'course_module',
        course_id: courseId,
        course_name: courseNames[courseId],
        level_index: levelIndex,
        level_name: levelName
      });

    if (error) throw error;
    toast.success('🎓 Certificate earned!');
  } catch (error) {
    console.error('Error awarding certificate:', error);
  }
};

export const checkAndAwardDiploma = async (userId: string, courseId: string) => {
  try {
    // Get all completed levels for this course
    const { data: progress } = await supabase
      .from('course_progress')
      .select('level_index')
      .eq('user_id', userId)
      .eq('course_id', courseId)
      .eq('completed', true);

    const totalLevels = courseLevels[courseId];
    const completedLevels = progress?.length || 0;

    // Check if all levels are completed
    if (completedLevels >= totalLevels) {
      // Check if diploma already exists
      const { data: existingDiploma } = await supabase
        .from('user_certificates' as any)
        .select('id')
        .eq('user_id', userId)
        .eq('course_id', courseId)
        .eq('certificate_type', 'full_course_diploma')
        .maybeSingle();

      if (!existingDiploma) {
        // Award diploma certificate
        await supabase
          .from('user_certificates' as any)
          .insert({
            user_id: userId,
            certificate_type: 'full_course_diploma',
            course_id: courseId,
            course_name: courseNames[courseId],
            level_index: null,
            level_name: null
          });

        // Award diploma badge
        const { data: existingBadge } = await supabase
          .from('user_badges' as any)
          .select('id')
          .eq('user_id', userId)
          .eq('badge_type', 'full_course_diploma')
          .eq('badge_category', courseId)
          .maybeSingle();

        if (!existingBadge) {
          await supabase
            .from('user_badges' as any)
            .insert({
              user_id: userId,
              badge_type: 'full_course_diploma',
              badge_category: courseId,
              badge_data: {
                title: `${courseNames[courseId]} Graduate`,
                description: 'Completed full course'
              }
            });
        }

        toast.success('🎉 Diploma awarded! You completed the entire course!');
      }
    }
  } catch (error) {
    console.error('Error checking diploma:', error);
  }
};

export const checkAndAwardExpertBadge = async (userId: string, courseId: string) => {
  try {
    // Get all completed levels for this course
    const { data: progress } = await supabase
      .from('course_progress')
      .select('level_index')
      .eq('user_id', userId)
      .eq('course_id', courseId)
      .eq('completed', true);

    const totalLevels = courseLevels[courseId];
    const completedLevels = progress?.length || 0;

    // Award expert badge if 75% or more levels completed
    if (completedLevels >= Math.ceil(totalLevels * 0.75)) {
      const { data: existing } = await supabase
        .from('user_badges' as any)
        .select('id')
        .eq('user_id', userId)
        .eq('badge_type', 'subject_expert')
        .eq('badge_category', courseId)
        .maybeSingle();

      if (!existing) {
        await supabase
          .from('user_badges' as any)
          .insert({
            user_id: userId,
            badge_type: 'subject_expert',
            badge_category: courseId,
            badge_data: {
              title: `${courseNames[courseId]} Expert`,
              description: 'Demonstrated expertise in this subject'
            }
          });

        toast.success('🏆 Expert badge earned!');
      }
    }
  } catch (error) {
    console.error('Error awarding expert badge:', error);
  }
};