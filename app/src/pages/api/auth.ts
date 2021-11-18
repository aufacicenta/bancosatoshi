import { NextApiRequest, NextApiResponse } from "next";
import { client as supabase } from "src/providers/supabase/client";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  supabase.auth.api.setAuthCookie(req, res);
}
