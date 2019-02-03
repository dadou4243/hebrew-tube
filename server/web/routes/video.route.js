
const router = require('express').Router();


const Auth = require('../../core/auth.core');

const VideoController = require('../controller/video.controller');

// Définition des routes
router.post('/', Auth.isConnected, Auth.isAdmin, VideoController.createVideo);
router.post('/:videoID', Auth.isConnected, Auth.isAdmin, VideoController.updateVideo);

router.get('/:videoID', Auth.isConnected, VideoController.getVideo);
router.get('/', Auth.isConnected, VideoController.getAllVideos);



router.delete('/:videoID', Auth.isConnected, Auth.isAdmin, VideoController.deleteVideo);


module.exports = router;

