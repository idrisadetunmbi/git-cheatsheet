import { Cheat, Category } from '../models';

export default new class {
  create = async (req, res) => {
    try {
      const cheat = new Cheat(req.body);
      await cheat.save();

      const category = await Category.findById(req.body.category);
      category.cheats.push(cheat);
      category.save();

      return res.status(201).send({
        data: cheat,
      });
    } catch (error) {
      return res.status(400).send({
        error: error.message,
      });
    }
  }

  get = async (req, res) => {
    const cheats = await Cheat.find().populate('category');
    return res.status(200).send({
      data: cheats,
    });
  }
}();
