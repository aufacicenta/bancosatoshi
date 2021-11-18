import { MutationResolvers } from "api/codegen/resolvers-types";
import { client as supabase } from "src/providers/supabase/client";

const createBusiness: MutationResolvers["createBusiness"] = async (_, _input, context) => {
  try {
    const token = context.req.cookies["sb:token"];

    if (!token) {
      throw new Error("Cannot fetch supabase token from cookies. User is not logged in");
    }

    supabase.auth.setAuth(token);

    const { data: user, error: getUserError } = await supabase.auth.api.getUser(token);

    if (getUserError) {
      throw getUserError;
    }

    if (!user) {
      throw new Error("createBusiness: authenticated user came empty.");
    }

    const { data: businesses, error: getBusinessError } = await supabase
      .from("business")
      .select("user_id")
      .eq("user_id", user.id);

    if (getBusinessError) {
      throw getBusinessError;
    }

    if (businesses?.length) {
      throw new Error("createBusiness: a business already exists for user.");
    }

    const { data: createBusinessData, error: createBusinessError } = await supabase
      .from("business")
      .upsert([{ user_id: user?.id }])
      .eq("user_id", user.id);

    if (createBusinessError) {
      throw createBusinessError;
    }

    const [record] = createBusinessData!;

    return {
      id: record.id,
      userId: record.user_id,
    };
  } catch (error) {
    // @TODO log error to some manager
    return error;
  }
};

export default createBusiness;
