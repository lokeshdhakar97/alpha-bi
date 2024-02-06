import mongoose, { Schema, Document } from 'mongoose'

interface IDailyStats extends Document {
  date: string
  userRegistrations: number
  keywordSearches: number
  likes: number
}

const dailyStatsSchema = new Schema({
  date: { type: String, required: true, unique: true }, // Date in YYYY-MM-DD format
  userRegistrations: { type: Number, default: 0 },
  keywordSearches: { type: Number, default: 0 },
  likes: { type: Number, default: 0 },
})

const DailyStats =
  mongoose.models.DailyStats || mongoose.model<IDailyStats>('DailyStats', dailyStatsSchema)

export default DailyStats
