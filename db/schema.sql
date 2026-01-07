-- USER TABLE
CREATE TABLE public.profiles (
  id uuid REFERENCES auth.users ON DELETE cascade NOT NULL primary key,
  first_name TEXT NOT NULL,
  last_name TEXT,
  email TEXT,
  phone TEXT,
  job_title TEXT,
  avatar_url TEXT,
  social_links jsonb DEFAULT '[]'::jsonb,
  updated_at timestamp WITH time zone DEFAULT now()
);

ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can update own profile" ON public.profiles FOR UPDATE USING ( auth.uid() = id );

CREATE POLICY "Users can view own profile" ON public.profiles FOR SELECT USING ( auth.uid() = id );

CREATE OR REPLACE FUNCTION public.handle_new_user() RETURNS trigger
LANGUAGE plpgsql security definer SET search_path = public AS $$
DECLARE
  meta_full_name text;
  meta_avatar text;
  extracted_first_name text;
  extracted_last_name text;
BEGIN
  meta_full_name := COALESCE(new.raw_user_meta_data->>'full_name', new.raw_user_meta_data->>'name');
  meta_avatar := new.raw_user_meta_data->>'avatar_url';

  if meta_full_name is not null THEN
    extracted_first_name := split_part(meta_full_name, ' ', 1);
    extracted_last_name := nullif(trim(substring(meta_full_name FROM position(' ' in meta_full_name) + 1)), '');

    if extracted_last_name = meta_full_name THEN
       extracted_last_name := null;
    END if;
  END if;

  INSERT INTO public.profiles (id, email, first_name, last_name, avatar_url) VALUES (new.id, new.email, extracted_first_name, extracted_last_name, meta_avatar);

  RETURN new;
END;
$$;

CREATE TRIGGER on_auth_user_created AFTER INSERT ON auth.users FOR EACH ROW EXECUTE PROCEDURE public.handle_new_user();


-- UPLOAD AVATAR POLICY

CREATE POLICY "User can update own avatar" ON storage.objects FOR INSERT TO authenticated WITH CHECK ( bucket_id = 'avatars' );

CREATE POLICY "Allow strict uploads" ON storage.objects FOR INSERT TO authenticated WITH CHECK ( bucket_id = 'avatars' AND (storage.foldername(name))[1] = auth.uid()::text AND (LOWER(storage.extension(name)) IN ('jpg', 'jpeg', 'png', 'webp')));

-- RESUME TABLE

create table public.resumes (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references auth.users on delete cascade not null,
  title text NOT NULL default 'My Cv',
  template text NOT NULL default 'modern',
  content jsonb default '{
    "personalInfo": {},
    "experience": [],
    "education": [],
    "skills": [],
    "customSections": []
  }'::jsonb,
  created_at timestamp with time zone default now(),
  updated_at timestamp with time zone default now()
);

alter table public.resumes enable row level security;

create policy "Users can manage own resumes" on public.resumes for all using ( auth.uid() = user_id );

create or replace function public.handle_updated_at() returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

create trigger on_resume_updated before update on public.resumes
  for each row execute procedure public.handle_updated_at();