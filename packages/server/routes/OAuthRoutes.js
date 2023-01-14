import express from 'express';
import passport from 'passport';

const router = express.Router();

// google sign in
router
  .route('/google')
  .get(passport.authenticate('google', { scope: ['profile', 'email'] }));
router.route('/google/callback').get(
  passport.authenticate('google', (req, res) => {
    console.log('log from callback => ');
    console.log(req.user);
  })
);

export default router;
