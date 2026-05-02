CREATE TABLE public.mobile_money_pledges (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  donor_name text NOT NULL,
  contact text NOT NULL,
  amount numeric(12,2) NOT NULL CHECK (amount > 0),
  provider text NOT NULL,
  reference text,
  note text,
  status text NOT NULL DEFAULT 'pending',
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE public.mobile_money_pledges ENABLE ROW LEVEL SECURITY;

-- Anyone can submit a pledge (the page is public)
CREATE POLICY "Anyone can submit a mobile money pledge"
ON public.mobile_money_pledges
FOR INSERT
TO anon, authenticated
WITH CHECK (true);

-- Only admins can view pledges (donor info is private)
CREATE POLICY "Admins can view all pledges"
ON public.mobile_money_pledges
FOR SELECT
TO authenticated
USING (public.has_role(auth.uid(), 'admin'));

-- Only admins can update pledges
CREATE POLICY "Admins can update pledges"
ON public.mobile_money_pledges
FOR UPDATE
TO authenticated
USING (public.has_role(auth.uid(), 'admin'));

-- Only admins can delete pledges
CREATE POLICY "Admins can delete pledges"
ON public.mobile_money_pledges
FOR DELETE
TO authenticated
USING (public.has_role(auth.uid(), 'admin'));

-- Auto-update updated_at
CREATE TRIGGER mobile_money_pledges_set_updated_at
BEFORE UPDATE ON public.mobile_money_pledges
FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();