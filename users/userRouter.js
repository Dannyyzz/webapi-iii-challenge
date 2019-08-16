const express = "express";

const router = express.Router();

router.post("/", validateUser, (req, res) => {
    try {
        const user = await User.insert(req.body);
        res.status(201).json({
          user
        });
      } catch (error) {
        res.status(500).json({
          errorMessage: "Internal server error"
        });
      }
});

router.post("/:id/posts", (req, res) => {});

router.get("/", (_req, res) => {
    try {
        const users = await User.get();
    
    
         res.status(200).json({
          users
        });
      } catch (error) {
        res.status(500).json({
          errorMessage: "Internal server error"
        });
      }
});

router.get("/:id", validateUserId, (req, res) => {
    const { user } = req;	

    res.status(200).json({
      user
    });
});

router.get("/:id/posts", validateUserId, (req, res) => {
    const { user } = req;

    try {
     const posts = await User.getUserPosts(user.id);
     res.status(200).json({
       posts
     });
   } catch (error) {
     res.status(500).json({
       message: "some message"
     });
   }
});

router.delete("/:id", (req, res) => {});

router.put("/:id", (req, res) => {});

//custom middleware

async function validateUserId(req, res, next) {
    const { id } = req.params;

    try {
        const user = User.getById(id);

        if (!user) {
            res.status(400).json({ message: "invalid user id" });
            return;
          } else {
            req.user = user;
            next();
          }
      } catch (error) {
        res.status(500).json({ errorMessage: "Internal Server Error" });
      }
}

function validateUser(req, res, next) {
    console.log(req.body);
    if (req.body === undefined || Object.keys(req.body).length === 0) {
      res.status(400).json({
        message: "missing user data"
      });
      return;
    }
  
     if (req.body.name === undefined) {
      res.status(400).json({
        message: "missing required name field"
      });
      return;
    }
  
     next();
}

function validatePost(req, res, next) {}

module.exports = router;
