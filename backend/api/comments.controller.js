// Cole Abney 10/25/2024 IT 302-451 Phase 3 cla34@njit.edu

const CommentDAO = require('../dao/CommentDAO');

class CommentController {
  static async apiGetComments(req, res, next) {
    try {
      const coinId = req.params.id;
      const comments = await CommentDAO.getComments(coinId);
      res.json(comments);
    } catch (e) {
      res.status(500).json({ error: e.message });
    }
  }

  static async apiPostComment(req, res, next) {
    try {
      const { text, userName, userId } = req.body;
      const coinId = req.params.id;
      const commentInfo = {
        coinId,
        text,
        userName,
        userId,
        lastModified: new Date()
      };
      
      const result = await CommentDAO.addComment(commentInfo);
      res.json({ status: "success", result });
    } catch (e) {
      res.status(500).json({ error: e.message });
    }
  }

  static async apiUpdateComment(req, res, next) {
    try {
      const { text, userId } = req.body;
      const commentId = req.params.commentId;
      
      const result = await CommentDAO.updateComment(commentId, userId, text);
      
      if (result.modifiedCount === 0) {
        throw new Error("Unable to update comment. User may not be original poster.");
      }
      
      res.json({ status: "success", result });
    } catch (e) {
      res.status(500).json({ error: e.message });
    }
  }

  static async apiDeleteComment(req, res, next) {
    try {
      const commentId = req.params.commentId;
      const { userId } = req.body;
      
      const result = await CommentDAO.deleteComment(commentId, userId);
      
      if (result.deletedCount === 0) {
        throw new Error("Unable to delete comment. User may not be original poster.");
      }
      
      res.json({ status: "success", result });
    } catch (e) {
      res.status(500).json({ error: e.message });
    }
  }
}

module.exports = CommentController;
