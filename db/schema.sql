CREATE TABLE public.profiles (
  id uuid REFERENCES auth.users ON DELETE cascade NOT NULL primary key,
  first_name TEXT,
  last_name TEXT,
  email TEXT,
  phone TEXT,
  job_title TEXT,
  avatar_url TEXT,
  city TEXT,
  country TEXT,
  post_code TEXT,
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
  meta_full_name := new.raw_user_meta_data->>'full_name';
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