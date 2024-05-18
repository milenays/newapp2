import dbConnect from '../../../lib/mongodb';
import Customer from '../../../models/Customer';

export default async function handler(req, res) {
  const { method } = req;
  const { id } = req.query;

  await dbConnect();

  switch (method) {
    case 'GET':
      try {
        const customer = await Customer.findById(id);
        if (!customer) {
          return res.status(404).json({ success: false });
        }
        res.status(200).json({ success: true, data: customer });
      } catch (error) {
        res.status(400).json({ success: false });
      }
      break;
    case 'PUT':
      try {
        const customer = await Customer.findByIdAndUpdate(id, req.body, {
             new: true,
             runValidators: true,
           });
           if (!customer) {
             return res.status(404).json({ success: false });
           }
           res.status(200).json({ success: true, data: customer });
         } catch (error) {
           res.status(400).json({ success: false });
         }
         break;
       case 'DELETE':
         try {
           const deletedCustomer = await Customer.deleteOne({ _id: id });
           if (!deletedCustomer) {
             return res.status(404).json({ success: false });
           }
           res.status(200).json({ success: true, data: {} });
         } catch (error) {
           res.status(400).json({ success: false });
         }
         break;
       default:
         res.setHeader('Allow', ['GET', 'PUT', 'DELETE']);
         res.status(405).end(`Method ${method} Not Allowed`);
         break;
     }
   }

