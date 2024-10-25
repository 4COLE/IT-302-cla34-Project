// Cole Abney 10/25/2024 IT 302-451 Phase 3 cla34@njit.edu

let comments;
const { ObjectId } = require('mongodb');

class CommentDAO {
  static async injectDB(conn) {
    if (comments) return;
    try {
      comments = await conn.db(process.env.DB_NAME).collection("comments");
    } catch (e) {
      console.error(`Unable to establish collection handles in CommentDAO: ${e}`);
    }
  }

  static async addComment(commentInfo) {
    try {
      return await comments.insertOne(commentInfo);
    } catch (e) {
      console.error(`Unable to post comment: ${e}`);
      return { error: e };
    }
  }

  static async updateComment(commentId, userId, text) {
    try {
      return await comments.updateOne(
        { _id: ObjectId(commentId), userId: userId },
        { $set: { text: text, lastModified: new Date() } }
      );
    } catch (e) {
      console.error(`Unable to update comment: ${e}`);
      return { error: e };
    }
  }

  static async deleteComment(commentId, userId) {
    try {
      return await comments.deleteOne({
        _id: ObjectId(commentId),
        userId: userId
      });
    } catch (e) {
      console.error(`Unable to delete comment: ${e}`);
      return { error: e };
    }
  }
}

module.exports = CommentDAO;
