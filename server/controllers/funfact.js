import request from 'request';
import funFacts from '../models/seed/funfact';
import FunFactModel from '../models/funfact';

class FunFact {
  static getFact (req, res, next) {
    FunFactModel.findOne({ id: req.params.id })
      .exec(function(error, fact) {
        if (error) return next(error);

        if (!fact) {
          return res.status(404).json({
            success: false,
            message: 'Fact does not exist',
          });
        } else {
          return res.json({
            success: true,
            data: fact
          });
        }
      });
  }

  static seedFact (req, res, next) {
    FunFactModel.remove({}, () => {
      for (let i = 0; i < funFacts.length; i++) {
        let newFunFact = new FunFactModel(funFacts[i]);
        newFunFact.save();
      }
    });

    return res.status(201).json({
      success: true,
      message: 'Successfully seeded the database',
    });
  }
}

module.exports = FunFact;
