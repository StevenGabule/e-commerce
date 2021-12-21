import connectDB from "../../../../utils/connectDB";
import Orders from "../../../../models/orderModel";
import auth from "../../../../middleware/auth";

connectDB();

// eslint-disable-next-line import/no-anonymous-default-export
export default async (req, res) => {
  switch (req.method) {
    case "PATCH":
      await deliveredOrder(req, res);
      break;
  }
};
