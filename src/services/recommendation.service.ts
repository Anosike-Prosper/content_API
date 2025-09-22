import Article from "../models/article.model";
import Interaction from "../models/interaction.model";
import User from "../models/user.model";
import { generateEmbedding } from "./embedding.service";
import { cosineSimilarity } from "../utils/similarity";
import { Types } from "mongoose";

export class RecommendationService {
  async getRecommendations(userId: string, limit = 5) {
    const user = await User.findById(userId);
    if (!user){
        return false
    } 

    //  CASE 1: User has interests → use embeddings
    if (user.interests.length > 0) {
      const interestsText = user.interests.join(" ");
      const userEmbedding = await generateEmbedding(interestsText);

      const articles = await Article.find();
      const scored = articles
        .map((article) => ({
          article,
          score: cosineSimilarity(userEmbedding, article.embedding || []),
        }))
        .sort((a, b) => b.score - a.score);

      return scored.slice(0, limit).map((s) => s.article);
    }

    // CASE 2: User has no interests but has seen/liked articles
    const userInteractions = await Interaction.find({ userId }).distinct("articleId");
    if (userInteractions.length > 0) {
      // Recommend popular articles the user has NOT seen
      return await this.getPopularArticles(limit, userInteractions);
    }

    //CASE 3: New user (no interests, no interactions) → return global popular
    return await this.getPopularArticles(limit);
  }

  private async getPopularArticles(limit: number, exclude: Types.ObjectId[] = []) {
    const pipeline: any[] = [
      {
        $group: {
          _id: "$articleId",
          count: { $sum: 1 },
        },
      },
      { $sort: { count: -1 } },
      { $limit: limit + exclude.length },
      {
        $lookup: {
          from: "articles",
          localField: "_id",
          foreignField: "_id",
          as: "article",
        },
      },
      { $unwind: "$article" },
      { $replaceRoot: { newRoot: "$article" } },
    ];

    let articles = await Interaction.aggregate(pipeline);

    // Exclude articles the user already saw
    if (exclude.length > 0) {
      articles = articles.filter(
        (a) => !exclude.includes(a._id.toString())
      );
    }

    return articles.slice(0, limit);
  }
}
