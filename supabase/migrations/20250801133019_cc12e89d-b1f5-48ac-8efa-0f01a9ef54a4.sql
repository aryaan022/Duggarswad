-- Create storage bucket for recipe images
INSERT INTO storage.buckets (id, name, public) VALUES ('recipe-images', 'recipe-images', true);

-- Create storage policies for recipe images
CREATE POLICY "Anyone can view recipe images" 
ON storage.objects 
FOR SELECT 
USING (bucket_id = 'recipe-images');

CREATE POLICY "Anyone can upload recipe images" 
ON storage.objects 
FOR INSERT 
WITH CHECK (bucket_id = 'recipe-images');

CREATE POLICY "Anyone can update recipe images" 
ON storage.objects 
FOR UPDATE 
USING (bucket_id = 'recipe-images');

CREATE POLICY "Anyone can delete recipe images" 
ON storage.objects 
FOR DELETE 
USING (bucket_id = 'recipe-images');

-- Add delete policy for recipes table
CREATE POLICY "Anyone can delete recipes" 
ON public.recipes 
FOR DELETE 
USING (true);