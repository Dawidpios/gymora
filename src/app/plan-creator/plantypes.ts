export interface Exercise {
  name: string;
  sets: number;
  reps: string;
  tempo: string;
  rest: string;
  technical_cues: string;
}

export interface WorkoutPlan {
  assessment: string;
  weekly_training_split: string;
  exercises: Exercise[];
  progression_strategy: string;
  rest_times: string;
  weekly_progression_recommendations: string;
  warm_up_routine: string[];
  cooldown_stretching: string[];
  why_these_exercises: string;
  alternative_exercises: string;
  motivation: string;
}
