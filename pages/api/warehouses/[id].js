import dbConnect from '../../../lib/mongodb';
import Warehouse from '../../../models/Warehouse';

export default async function handler(req, res) {
  const { method } = req;
  const { id } = req.query;

  await dbConnect();

  switch (method) {
    case 'GET':
      try {
        const warehouse = await Warehouse.findById(id);
        if (!warehouse) {
          return res.status(404).json({ success: false });
        }
        res.status(200).json({ success: true, data: warehouse });
      } catch (error) {
        res.status(400).json({ success: false });
      }
      break;
    case 'PUT':
      try {
        const warehouse = await Warehouse.findByIdAndUpdate(id, req.body, {
          new: true,
          runValidators: true,
        });
        if (!warehouse) {
          return res.status(404).json({ success: false });
        }
        res.status(200).json({ success: true, data: warehouse });
      } catch (error) {
        res.status(400).json({ success: false });
      }
      break;
    case 'DELETE':
      try {
        const deletedWarehouse = await Warehouse.deleteOne({ _id: id });
        if (!deletedWarehouse) {
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
