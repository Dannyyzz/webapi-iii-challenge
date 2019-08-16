const express = "express";

const router = express.Router();

router.post("/", (req, res) => {});

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
    console.log("api?");
    res.send("YES!");
});

router.get("/:id/posts", (req, res) => {});

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

function validateUser(req, res, next) {}

function validatePost(req, res, next) {}

module.exports = router;
