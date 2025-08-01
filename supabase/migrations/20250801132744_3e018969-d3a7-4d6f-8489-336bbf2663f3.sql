-- Update RLS policies to allow viewing all recipes
DROP POLICY IF EXISTS "Anyone can view approved recipes" ON public.recipes;

-- Create new policy that allows viewing all recipes (for admin purposes)
CREATE POLICY "Anyone can view all recipes" 
ON public.recipes 
FOR SELECT 
USING (true);

-- Also allow anyone to update recipes (for admin approval/rejection)
CREATE POLICY "Anyone can update recipes" 
ON public.recipes 
FOR UPDATE 
USING (true);