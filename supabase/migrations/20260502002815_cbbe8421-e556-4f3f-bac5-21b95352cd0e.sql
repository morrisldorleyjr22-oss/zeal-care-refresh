-- Editable per-page content (text and images) for the admin CMS.
CREATE TABLE IF NOT EXISTS public.page_content (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  page text NOT NULL,
  key text NOT NULL,
  type text NOT NULL CHECK (type IN ('text','image')),
  value text NOT NULL DEFAULT '',
  updated_at timestamptz NOT NULL DEFAULT now(),
  created_at timestamptz NOT NULL DEFAULT now(),
  UNIQUE (page, key)
);

CREATE INDEX IF NOT EXISTS idx_page_content_page ON public.page_content(page);

ALTER TABLE public.page_content ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Page content is public readable" ON public.page_content;
CREATE POLICY "Page content is public readable"
  ON public.page_content FOR SELECT
  USING (true);

DROP POLICY IF EXISTS "Admins manage page content" ON public.page_content;
CREATE POLICY "Admins manage page content"
  ON public.page_content FOR ALL
  TO authenticated
  USING (app_private.has_role(auth.uid(), 'admin'::public.app_role))
  WITH CHECK (app_private.has_role(auth.uid(), 'admin'::public.app_role));

-- updated_at trigger
DROP TRIGGER IF EXISTS trg_page_content_updated_at ON public.page_content;
CREATE TRIGGER trg_page_content_updated_at
  BEFORE UPDATE ON public.page_content
  FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();

-- realtime
ALTER PUBLICATION supabase_realtime ADD TABLE public.page_content;