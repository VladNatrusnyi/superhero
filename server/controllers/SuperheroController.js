import SuperheroModel from './../models/Superhero.js'

export const update = async (req, res) => {
  try {
    const id = req.params.id

    const doc = {
      nickname: req.body.nickname,
      real_name: req.body.real_name,
      origin_description: req.body.origin_description,
      superpowers: req.body.superpowers,
      catch_phrase: req.body.catch_phrase,
      Images: req.body.Images,
    }

    console.log('DOC', doc)

    const updatedSuperhero = await SuperheroModel.findOneAndUpdate(
      { _id: id },
      doc,
      // { new: true }
    );

    if (updatedSuperhero) {
      return res.json({
        success: true
      })
    } else {
      return res.status(404).json({
        message: 'Superhero not found'
      })
    }
  } catch (err) {
    console.log(err)
    res.status(500).json({
      message: 'Failed to update superhero data'
    })
  }
}



export const remove = async (req, res) => {
  try {
    const id = req.params.id

    const deletedSuperhero = await SuperheroModel.findOneAndDelete({_id: id})

    if (!deletedSuperhero) {
      return res.status(404).json({
        message: 'Superhero not found'
      })
    }

    res.json({
      success: true
    })
  } catch (err) {
    console.log(err)
    res.status(500).json({
      message: 'Failed to remove superhero'
    })
  }
}

export const getOne = async (req, res) => {
  try {
    const id = req.params.id

    const superhero = await SuperheroModel.findById(id);

    if (!superhero) {
      return res.status(404).json({
        message: 'Superhero not found'
      })
    }

    res.json(superhero)

  } catch (err) {
    console.log(err)
    res.status(500).json({
      message: 'Failed to get superhero'
    })
  }
}



export const getAll = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 5;

    const skip = (page - 1) * limit;

    const totalSuperheroes = await SuperheroModel.countDocuments(); // Отримуємо загальну кількість записів

    const totalPages = Math.ceil(totalSuperheroes / limit); // Розраховуємо загальну кількість сторінок

    const superheroes = await SuperheroModel.find().sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);

    res.json({
      superheroes,
      currentPage: page, // Поточна сторінка
      totalPages: totalPages, // Загальна кількість сторінок
      totalSuperheroes: totalSuperheroes
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: 'Failed to get superheroes'
    });
  }
};


export const create = async (req, res) => {
  try {

    const existingSuperhero = await SuperheroModel.findOne({ nickname: req.body.nickname });

    if (existingSuperhero) {
      return res.status(400).json({ message: 'Superhero with this nickname already exists' });
    }

    const doc = new SuperheroModel({
      nickname: req.body.nickname,
      real_name: req.body.real_name,
      origin_description: req.body.origin_description,
      superpowers: req.body.superpowers,
      catch_phrase: req.body.catch_phrase,
      Images: req.body.Images,
    })

    const superhero = await doc.save()

    res.json(superhero)

  } catch (err) {
    console.log(err)
    res.status(500).json({
      message: 'It was not possible to create a superhero'
    })
  }
}
