DROP POLICY IF EXISTS "Public can view site media" ON storage.objects;

-- Anonymous + signed-in users can fetch individual files via signed name lookups,
-- but cannot list the whole bucket. Public-bucket URLs (storage/v1/object/public/...) still work.
CREATE POLICY "Admins can list site media"
  ON storage.objects FOR SELECT TO authenticated
  USING (bucket_id = 'site-media' AND public.has_role(auth.uid(), 'admin'));