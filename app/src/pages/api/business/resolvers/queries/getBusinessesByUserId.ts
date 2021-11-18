import { QueryGetBusinessesByUserIdArgs } from "api/codegen";
import { QueryResolvers } from "api/codegen/resolvers-types";
import { client as supabase } from "src/providers/supabase/client";

const getBusinessesByUserId: QueryResolvers["getBusinessesByUserId"] = async (
  _,
  { input }: QueryGetBusinessesByUserIdArgs,
) => {
  try {
    const { data, error } = await supabase.from("business").select("id, user_id").eq("user_id", input.userId).single();

    if (error) {
      throw error;
    }

    return [
      {
        id: data.id,
        userId: data.user_id,
      },
    ];
  } catch (error) {
    return error;
  }
};

export default getBusinessesByUserId;
