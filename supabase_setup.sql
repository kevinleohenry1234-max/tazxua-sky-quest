-- Supabase SQL Setup for Google Authentication
-- Run this in your Supabase SQL Editor

-- Enable necessary extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Create profiles table to store additional user information
CREATE TABLE IF NOT EXISTS public.profiles (
  id UUID REFERENCES auth.users(id) ON DELETE CASCADE PRIMARY KEY,
  email TEXT,
  full_name TEXT,
  avatar_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable Row Level Security (RLS)
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

-- Create policies for profiles table
CREATE POLICY "Public profiles are viewable by everyone" ON public.profiles
  FOR SELECT USING (true);

CREATE POLICY "Users can insert their own profile" ON public.profiles
  FOR INSERT WITH CHECK (auth.uid() = id);

CREATE POLICY "Users can update their own profile" ON public.profiles
  FOR UPDATE USING (auth.uid() = id);

-- Create a function to handle new user registration
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (id, email, full_name, avatar_url)
  VALUES (
    NEW.id,
    NEW.email,
    COALESCE(NEW.raw_user_meta_data->>'full_name', NEW.raw_user_meta_data->>'name', split_part(NEW.email, '@', 1)),
    NEW.raw_user_meta_data->>'avatar_url'
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create trigger to automatically create profile when user signs up
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- Create user_sessions table for session management (optional)
CREATE TABLE IF NOT EXISTS public.user_sessions (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  session_token TEXT UNIQUE NOT NULL,
  expires_at TIMESTAMP WITH TIME ZONE NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable RLS for user_sessions
ALTER TABLE public.user_sessions ENABLE ROW LEVEL SECURITY;

-- Create policies for user_sessions
CREATE POLICY "Users can view their own sessions" ON public.user_sessions
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own sessions" ON public.user_sessions
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can delete their own sessions" ON public.user_sessions
  FOR DELETE USING (auth.uid() = user_id);

-- Create function to clean up expired sessions
CREATE OR REPLACE FUNCTION public.cleanup_expired_sessions()
RETURNS void AS $$
BEGIN
  DELETE FROM public.user_sessions WHERE expires_at < NOW();
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create user_preferences table for storing user settings
CREATE TABLE IF NOT EXISTS public.user_preferences (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE UNIQUE,
  language TEXT DEFAULT 'vi',
  theme TEXT DEFAULT 'light',
  notifications_enabled BOOLEAN DEFAULT true,
  marketing_emails BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable RLS for user_preferences
ALTER TABLE public.user_preferences ENABLE ROW LEVEL SECURITY;

-- Create policies for user_preferences
CREATE POLICY "Users can view their own preferences" ON public.user_preferences
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own preferences" ON public.user_preferences
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own preferences" ON public.user_preferences
  FOR UPDATE USING (auth.uid() = user_id);

-- Create function to handle user preferences on signup
CREATE OR REPLACE FUNCTION public.handle_user_preferences()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.user_preferences (user_id)
  VALUES (NEW.id);
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create trigger for user preferences
DROP TRIGGER IF EXISTS on_profile_created ON public.profiles;
CREATE TRIGGER on_profile_created
  AFTER INSERT ON public.profiles
  FOR EACH ROW EXECUTE FUNCTION public.handle_user_preferences();

-- Create bookings table for homestay reservations
CREATE TABLE IF NOT EXISTS public.bookings (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  homestay_id INTEGER NOT NULL,
  homestay_name TEXT NOT NULL,
  check_in_date DATE NOT NULL,
  check_out_date DATE NOT NULL,
  guests_count INTEGER NOT NULL DEFAULT 1,
  total_price DECIMAL(10,2),
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'confirmed', 'cancelled', 'completed')),
  special_requests TEXT,
  contact_phone TEXT,
  contact_email TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable RLS for bookings
ALTER TABLE public.bookings ENABLE ROW LEVEL SECURITY;

-- Create policies for bookings
CREATE POLICY "Users can view their own bookings" ON public.bookings
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own bookings" ON public.bookings
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own bookings" ON public.bookings
  FOR UPDATE USING (auth.uid() = user_id);

-- Create reviews table for homestay reviews
CREATE TABLE IF NOT EXISTS public.reviews (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  homestay_id INTEGER NOT NULL,
  rating INTEGER NOT NULL CHECK (rating >= 1 AND rating <= 5),
  title TEXT,
  comment TEXT,
  images TEXT[], -- Array of image URLs
  is_verified BOOLEAN DEFAULT false,
  helpful_count INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable RLS for reviews
ALTER TABLE public.reviews ENABLE ROW LEVEL SECURITY;

-- Create policies for reviews
CREATE POLICY "Reviews are viewable by everyone" ON public.reviews
  FOR SELECT USING (true);

CREATE POLICY "Users can insert their own reviews" ON public.reviews
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own reviews" ON public.reviews
  FOR UPDATE USING (auth.uid() = user_id);

-- Create function to update updated_at timestamp
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create triggers for updated_at
CREATE TRIGGER update_profiles_updated_at BEFORE UPDATE ON public.profiles
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_user_preferences_updated_at BEFORE UPDATE ON public.user_preferences
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_bookings_updated_at BEFORE UPDATE ON public.bookings
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_reviews_updated_at BEFORE UPDATE ON public.reviews
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- Grant necessary permissions
GRANT USAGE ON SCHEMA public TO anon, authenticated;
GRANT ALL ON ALL TABLES IN SCHEMA public TO anon, authenticated;
GRANT ALL ON ALL SEQUENCES IN SCHEMA public TO anon, authenticated;
GRANT ALL ON ALL FUNCTIONS IN SCHEMA public TO anon, authenticated;

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS profiles_email_idx ON public.profiles(email);
CREATE INDEX IF NOT EXISTS bookings_user_id_idx ON public.bookings(user_id);
CREATE INDEX IF NOT EXISTS bookings_homestay_id_idx ON public.bookings(homestay_id);
CREATE INDEX IF NOT EXISTS bookings_check_in_date_idx ON public.bookings(check_in_date);
CREATE INDEX IF NOT EXISTS reviews_user_id_idx ON public.reviews(user_id);
CREATE INDEX IF NOT EXISTS reviews_homestay_id_idx ON public.reviews(homestay_id);
CREATE INDEX IF NOT EXISTS reviews_rating_idx ON public.reviews(rating);

-- Insert some sample data (optional)
-- This will be automatically handled by the triggers when users sign up

COMMENT ON TABLE public.profiles IS 'User profiles with additional information from Google OAuth';
COMMENT ON TABLE public.user_preferences IS 'User preferences and settings';
COMMENT ON TABLE public.bookings IS 'Homestay booking records';
COMMENT ON TABLE public.reviews IS 'User reviews for homestays';

-- ========================================
-- SKY QUEST SYSTEM TABLES
-- ========================================

-- Create skyquest_modes table for journey modes (calm/energetic)
CREATE TABLE IF NOT EXISTS public.skyquest_modes (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  key TEXT UNIQUE NOT NULL CHECK (key IN ('calm', 'energetic')),
  name TEXT NOT NULL,
  description TEXT NOT NULL,
  theme JSONB NOT NULL, -- {primary, secondary, gradientStart, gradientEnd, accent}
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create skyquest_steps table for journey steps
CREATE TABLE IF NOT EXISTS public.skyquest_steps (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  mode_id UUID REFERENCES public.skyquest_modes(id) ON DELETE CASCADE,
  order_index INTEGER NOT NULL,
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  type TEXT NOT NULL CHECK (type IN ('journal', 'photo', 'action', 'interview', 'social')),
  points INTEGER NOT NULL DEFAULT 0,
  proof_required BOOLEAN DEFAULT false,
  proof_type TEXT CHECK (proof_type IN ('photo', 'gps', 'text', 'link')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(mode_id, order_index)
);

-- Create skyquest_user_sessions table for user journey sessions
CREATE TABLE IF NOT EXISTS public.skyquest_user_sessions (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  mode_id UUID REFERENCES public.skyquest_modes(id) ON DELETE CASCADE,
  status TEXT DEFAULT 'active' CHECK (status IN ('active', 'completed', 'abandoned')),
  started_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  completed_at TIMESTAMP WITH TIME ZONE,
  total_points INTEGER DEFAULT 0,
  exp INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create skyquest_user_progress table for tracking step completion
CREATE TABLE IF NOT EXISTS public.skyquest_user_progress (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  session_id UUID REFERENCES public.skyquest_user_sessions(id) ON DELETE CASCADE,
  step_id UUID REFERENCES public.skyquest_steps(id) ON DELETE CASCADE,
  status TEXT DEFAULT 'locked' CHECK (status IN ('locked', 'available', 'in_progress', 'done', 'verified')),
  proof_url TEXT,
  note TEXT,
  completed_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(session_id, step_id)
);

-- Create skyquest_rewards table for available rewards
CREATE TABLE IF NOT EXISTS public.skyquest_rewards (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  name TEXT NOT NULL,
  type TEXT NOT NULL CHECK (type IN ('voucher', 'badge', 'souvenir')),
  threshold_points INTEGER NOT NULL,
  meta JSONB, -- Additional reward metadata
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create skyquest_user_rewards table for unlocked rewards
CREATE TABLE IF NOT EXISTS public.skyquest_user_rewards (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  reward_id UUID REFERENCES public.skyquest_rewards(id) ON DELETE CASCADE,
  session_id UUID REFERENCES public.skyquest_user_sessions(id) ON DELETE SET NULL,
  unlocked_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(user_id, reward_id)
);

-- Create skyquest_point_logs table for point tracking
CREATE TABLE IF NOT EXISTS public.skyquest_point_logs (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  session_id UUID REFERENCES public.skyquest_user_sessions(id) ON DELETE CASCADE,
  step_id UUID REFERENCES public.skyquest_steps(id) ON DELETE SET NULL,
  delta INTEGER NOT NULL,
  reason TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable RLS for all skyquest tables
ALTER TABLE public.skyquest_modes ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.skyquest_steps ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.skyquest_user_sessions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.skyquest_user_progress ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.skyquest_rewards ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.skyquest_user_rewards ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.skyquest_point_logs ENABLE ROW LEVEL SECURITY;

-- Create policies for skyquest_modes (public read)
CREATE POLICY "Modes are viewable by everyone" ON public.skyquest_modes
  FOR SELECT USING (true);

-- Create policies for skyquest_steps (public read)
CREATE POLICY "Steps are viewable by everyone" ON public.skyquest_steps
  FOR SELECT USING (true);

-- Create policies for skyquest_user_sessions
CREATE POLICY "Users can view their own sessions" ON public.skyquest_user_sessions
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own sessions" ON public.skyquest_user_sessions
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own sessions" ON public.skyquest_user_sessions
  FOR UPDATE USING (auth.uid() = user_id);

-- Create policies for skyquest_user_progress
CREATE POLICY "Users can view their own progress" ON public.skyquest_user_progress
  FOR SELECT USING (auth.uid() = (SELECT user_id FROM public.skyquest_user_sessions WHERE id = session_id));

CREATE POLICY "Users can insert their own progress" ON public.skyquest_user_progress
  FOR INSERT WITH CHECK (auth.uid() = (SELECT user_id FROM public.skyquest_user_sessions WHERE id = session_id));

CREATE POLICY "Users can update their own progress" ON public.skyquest_user_progress
  FOR UPDATE USING (auth.uid() = (SELECT user_id FROM public.skyquest_user_sessions WHERE id = session_id));

-- Create policies for skyquest_rewards (public read)
CREATE POLICY "Rewards are viewable by everyone" ON public.skyquest_rewards
  FOR SELECT USING (true);

-- Create policies for skyquest_user_rewards
CREATE POLICY "Users can view their own rewards" ON public.skyquest_user_rewards
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own rewards" ON public.skyquest_user_rewards
  FOR INSERT WITH CHECK (auth.uid() = user_id);

-- Create policies for skyquest_point_logs
CREATE POLICY "Users can view their own point logs" ON public.skyquest_point_logs
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own point logs" ON public.skyquest_point_logs
  FOR INSERT WITH CHECK (auth.uid() = user_id);

-- Create triggers for updated_at columns
CREATE TRIGGER update_skyquest_user_sessions_updated_at BEFORE UPDATE ON public.skyquest_user_sessions
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_skyquest_user_progress_updated_at BEFORE UPDATE ON public.skyquest_user_progress
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS skyquest_steps_mode_id_idx ON public.skyquest_steps(mode_id);
CREATE INDEX IF NOT EXISTS skyquest_steps_order_idx ON public.skyquest_steps(order_index);
CREATE INDEX IF NOT EXISTS skyquest_user_sessions_user_id_idx ON public.skyquest_user_sessions(user_id);
CREATE INDEX IF NOT EXISTS skyquest_user_sessions_status_idx ON public.skyquest_user_sessions(status);
CREATE INDEX IF NOT EXISTS skyquest_user_progress_session_id_idx ON public.skyquest_user_progress(session_id);
CREATE INDEX IF NOT EXISTS skyquest_user_progress_status_idx ON public.skyquest_user_progress(status);
CREATE INDEX IF NOT EXISTS skyquest_user_rewards_user_id_idx ON public.skyquest_user_rewards(user_id);
CREATE INDEX IF NOT EXISTS skyquest_point_logs_user_id_idx ON public.skyquest_point_logs(user_id);
CREATE INDEX IF NOT EXISTS skyquest_point_logs_session_id_idx ON public.skyquest_point_logs(session_id);

-- Insert initial data for skyquest_modes
INSERT INTO public.skyquest_modes (key, name, description, theme) VALUES
('calm', 'Mây Mây Sương Sương', 'Hành trình bình yên khám phá thiên nhiên và tâm hồn', 
 '{"primary": "#6B73FF", "secondary": "#9BB5FF", "gradientStart": "#667eea", "gradientEnd": "#764ba2", "accent": "#F093FB"}'),
('energetic', 'Hăng Say Săn Thưởng', 'Hành trình năng động với thử thách và phiêu lưu',
 '{"primary": "#FF6B6B", "secondary": "#FFE66D", "gradientStart": "#ff9a9e", "gradientEnd": "#fecfef", "accent": "#4ECDC4"}')
ON CONFLICT (key) DO NOTHING;

-- Insert sample steps for calm mode
INSERT INTO public.skyquest_steps (mode_id, order_index, title, description, type, points, proof_required, proof_type)
SELECT 
  (SELECT id FROM public.skyquest_modes WHERE key = 'calm'),
  1,
  'Chào Mừng Bình Minh',
  'Thức dậy sớm và chứng kiến bình minh trên đỉnh Tà Xùa',
  'photo',
  100,
  true,
  'photo'
WHERE NOT EXISTS (
  SELECT 1 FROM public.skyquest_steps s 
  JOIN public.skyquest_modes m ON s.mode_id = m.id 
  WHERE m.key = 'calm' AND s.order_index = 1
);

INSERT INTO public.skyquest_steps (mode_id, order_index, title, description, type, points, proof_required, proof_type)
SELECT 
  (SELECT id FROM public.skyquest_modes WHERE key = 'calm'),
  2,
  'Nhật Ký Thiên Nhiên',
  'Viết nhật ký về cảm xúc khi ngắm nhìn biển mây',
  'journal',
  80,
  true,
  'text'
WHERE NOT EXISTS (
  SELECT 1 FROM public.skyquest_steps s 
  JOIN public.skyquest_modes m ON s.mode_id = m.id 
  WHERE m.key = 'calm' AND s.order_index = 2
);

-- Insert sample steps for energetic mode
INSERT INTO public.skyquest_steps (mode_id, order_index, title, description, type, points, proof_required, proof_type)
SELECT 
  (SELECT id FROM public.skyquest_modes WHERE key = 'energetic'),
  1,
  'Chinh Phục Đỉnh Cao',
  'Leo lên đỉnh Tà Xùa trong thời gian kỷ lục',
  'action',
  150,
  true,
  'gps'
WHERE NOT EXISTS (
  SELECT 1 FROM public.skyquest_steps s 
  JOIN public.skyquest_modes m ON s.mode_id = m.id 
  WHERE m.key = 'energetic' AND s.order_index = 1
);

INSERT INTO public.skyquest_steps (mode_id, order_index, title, description, type, points, proof_required, proof_type)
SELECT 
  (SELECT id FROM public.skyquest_modes WHERE key = 'energetic'),
  2,
  'Thử Thách Cộng Đồng',
  'Tham gia hoạt động nhóm với người dân địa phương',
  'social',
  120,
  true,
  'photo'
WHERE NOT EXISTS (
  SELECT 1 FROM public.skyquest_steps s 
  JOIN public.skyquest_modes m ON s.mode_id = m.id 
  WHERE m.key = 'energetic' AND s.order_index = 2
);

-- Insert sample rewards
INSERT INTO public.skyquest_rewards (name, type, threshold_points, meta) VALUES
('Huy Hiệu Người Mới', 'badge', 50, '{"icon": "star", "color": "bronze"}'),
('Voucher Homestay 10%', 'voucher', 200, '{"discount": 10, "type": "percentage", "category": "homestay"}'),
('Kỷ Vật Tà Xùa', 'souvenir', 500, '{"item": "handmade_bracelet", "description": "Vòng tay thủ công từ tre địa phương"}')
ON CONFLICT DO NOTHING;

-- Comments for Sky Quest tables
COMMENT ON TABLE public.skyquest_modes IS 'Journey modes (calm/energetic) with themes';
COMMENT ON TABLE public.skyquest_steps IS 'Steps/tasks for each journey mode';
COMMENT ON TABLE public.skyquest_user_sessions IS 'User journey sessions tracking';
COMMENT ON TABLE public.skyquest_user_progress IS 'Individual step completion progress';
COMMENT ON TABLE public.skyquest_rewards IS 'Available rewards and achievements';
COMMENT ON TABLE public.skyquest_user_rewards IS 'User unlocked rewards';
COMMENT ON TABLE public.skyquest_point_logs IS 'Point transaction history';