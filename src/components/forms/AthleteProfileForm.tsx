// src/components/forms/AthleteProfileForm.tsx
import React, { useState, useEffect } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { LoadingSpinner } from '../common/LoadingSpinner.tsx';
import { EQUIPMENT_OPTIONS, SEX_OPTIONS, EXPERIENCE_LEVELS, VALIDATION_RULES } from '../../utils/constants';
import { getWeightClass } from '../../utils/formatters';
import type { AthleteProfile } from '../../types/athlete';

const profileSchema = z.object({
  sex: z.enum(['M', 'F', 'Mx'], { required_error: 'Please select your sex' }),
  age: z.number()
    .min(VALIDATION_RULES.age.min, `Age must be at least ${VALIDATION_RULES.age.min}`)
    .max(VALIDATION_RULES.age.max, `Age must be no more than ${VALIDATION_RULES.age.max}`),
  bodyweight: z.number()
    .min(VALIDATION_RULES.bodyweight.min, `Bodyweight must be at least ${VALIDATION_RULES.bodyweight.min} kg`)
    .max(VALIDATION_RULES.bodyweight.max, `Bodyweight must be no more than ${VALIDATION_RULES.bodyweight.max} kg`),
  equipment: z.string().min(1, 'Please select equipment type'),
  experience: z.string().optional(),
  goals: z.string().optional(),
});

type ProfileFormData = z.infer<typeof profileSchema>;

interface AthleteProfileFormProps {
  initialData?: AthleteProfile;
  onSubmit: (data: AthleteProfile) => Promise<void>;
  isLoading?: boolean;
}

export const AthleteProfileForm: React.FC<AthleteProfileFormProps> = ({
  initialData,
  onSubmit,
  isLoading = false,
}) => {
  const [weightClass, setWeightClass] = useState<string>('');
  
  const {
    control,
    handleSubmit,
    watch,
    formState: { errors, isValid, isDirty },
  } = useForm<ProfileFormData>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      sex: initialData?.sex || 'M',
      age: initialData?.age || 25,
      bodyweight: initialData?.bodyweight || 70,
      equipment: initialData?.equipment || 'Raw',
      experience: initialData?.experience || 'Intermediate',
      goals: initialData?.goals || '',
    },
    mode: 'onChange',
  });

  const watchedSex = watch('sex');
  const watchedBodyweight = watch('bodyweight');

  // Update weight class when sex or bodyweight changes
  useEffect(() => {
    if (watchedSex && watchedBodyweight) {
      const wc = getWeightClass(watchedBodyweight, watchedSex);
      setWeightClass(wc);
    }
  }, [watchedSex, watchedBodyweight]);
  const handleFormSubmit = async (data: ProfileFormData) => {
    const profileData: AthleteProfile = {
      ...data,
      equipment: data.equipment as any,
      weightClass,
      experience: data.experience as "Beginner" | "Intermediate" | "Advanced" | "Elite" | undefined,
    };
    
    await onSubmit(profileData);
  };

  return (
    <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Sex */}
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Sex *
          </label>
          <Controller
            name="sex"
            control={control}
            render={({ field }) => (
              <select
                {...field}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
              >
                {SEX_OPTIONS.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            )}
          />
          {errors.sex && (
            <p className="mt-1 text-sm text-red-600 dark:text-red-400">
              {errors.sex.message}
            </p>
          )}
        </div>

        {/* Age */}
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Age *
          </label>
          <Controller
            name="age"
            control={control}
            render={({ field }) => (
              <input
                {...field}
                type="number"
                min={VALIDATION_RULES.age.min}
                max={VALIDATION_RULES.age.max}
                onChange={(e) => field.onChange(Number(e.target.value))}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                placeholder="Enter your age"
              />
            )}
          />
          {errors.age && (
            <p className="mt-1 text-sm text-red-600 dark:text-red-400">
              {errors.age.message}
            </p>
          )}
        </div>

        {/* Bodyweight */}
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Bodyweight (kg) *
          </label>
          <Controller
            name="bodyweight"
            control={control}
            render={({ field }) => (
              <div>
                <input
                  {...field}
                  type="number"
                  step="0.1"
                  min={VALIDATION_RULES.bodyweight.min}
                  max={VALIDATION_RULES.bodyweight.max}
                  onChange={(e) => field.onChange(Number(e.target.value))}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  placeholder="Enter your bodyweight"
                />
                {watchedBodyweight && (
                  <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
                    Weight Class: <span className="font-medium">{weightClass}</span>
                  </p>
                )}
              </div>
            )}
          />
          {errors.bodyweight && (
            <p className="mt-1 text-sm text-red-600 dark:text-red-400">
              {errors.bodyweight.message}
            </p>
          )}
        </div>

        {/* Equipment */}
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Equipment *
          </label>
          <Controller
            name="equipment"
            control={control}
            render={({ field }) => (
              <select
                {...field}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
              >
                {EQUIPMENT_OPTIONS.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            )}
          />
          {errors.equipment && (
            <p className="mt-1 text-sm text-red-600 dark:text-red-400">
              {errors.equipment.message}
            </p>
          )}
          <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
            {EQUIPMENT_OPTIONS.find(opt => opt.value === watch('equipment'))?.description}
          </p>
        </div>

        {/* Experience */}
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Experience Level
          </label>
          <Controller
            name="experience"
            control={control}
            render={({ field }) => (
              <select
                {...field}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
              >
                <option value="">Select experience level</option>
                {EXPERIENCE_LEVELS.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            )}
          />
          <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
            {EXPERIENCE_LEVELS.find(exp => exp.value === watch('experience'))?.description}
          </p>
        </div>

        {/* Goals */}
        <div className="md:col-span-2">
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Training Goals (Optional)
          </label>
          <Controller
            name="goals"
            control={control}
            render={({ field }) => (
              <textarea
                {...field}
                rows={3}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                placeholder="Describe your training goals, upcoming competitions, or what you'd like to achieve..."
              />
            )}
          />
        </div>
      </div>

      {/* Submit Button */}
      <div className="flex justify-end">
        <button
          type="submit"
          disabled={!isValid || isLoading}
          className="bg-primary-600 hover:bg-primary-700 disabled:bg-gray-400 disabled:cursor-not-allowed text-white font-medium px-6 py-3 rounded-lg transition-colors flex items-center"
        >
          {isLoading ? (
            <>
              <LoadingSpinner size="sm" className="mr-2" />
              {initialData ? 'Updating...' : 'Getting Prediction...'}
            </>
          ) : (
            <>
              {initialData ? 'Update Profile' : 'Get My Prediction'}
            </>
          )}
        </button>
      </div>

      {/* Helper Text */}
      <div className="text-sm text-gray-500 dark:text-gray-400">
        <p>
          * Required fields. Your prediction will be based on data from over 350,000 powerlifting meets.
        </p>
        {!isDirty && initialData && (
          <p className="mt-1 text-primary-600 dark:text-primary-400">
            Make changes to update your prediction.
          </p>
        )}
      </div>
    </form>
  );
};