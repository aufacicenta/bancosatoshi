// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import { NextApiRequest, NextApiResponse } from "next";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const metadata = { businessId: req.body.metadata.businessId, buyerEmail: req.body.metadata.buyerEmail };
    const { storeId } = req.body;
    const endpoint = `${process.env.BTC_PAY_SERVER_BASE_URL}/stores/${storeId}/invoices`;
    const headers = {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `token ${process.env.BTC_PAY_SERVER_AUTH_TOKEN}`,
    };

    const response = await fetch(endpoint, {
      method: "POST",
      headers,
      body: JSON.stringify({ metadata }),
    });

    const content = await response.json();

    if (!content?.checkoutLink) {
      throw new Error("Invalid BTC checkout content at API:getCheckoutURL");
    }

    res.status(200).json({
      checkoutLink: content.checkoutLink,
    });
  } catch (error) {
    console.log(error);
    res.status(500);
  }
};
