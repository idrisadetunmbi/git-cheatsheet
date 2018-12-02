import { Category } from '../models';

export default new class {
  create = async (req, res) => {
    try {
      const category = new Category(req.body);
      await category.save();
      return res.status(201).send({
        data: category,
      });
    } catch (error) {
      return res.status(400).send({
        error: error.message,
      });
    }
  }

  get = async (req, res) => {
    const categories = await Category.find().populate('cheats');
    return res.status(200).send({ data: categories });
  }
}();
