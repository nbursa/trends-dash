export type Trend = {
  current: {
    average: number
    top_3_position: number
    top_3_percentage: number
    market_share_position: number
    market_share_percentage: number
  }
  previous: {
    average: number
    top_3_position: number
    top_3_percentage: number
    market_share_position: number
    market_share_percentage: number
    execution_date: string
  }
}

export type TrendMap = Record<string, Trend>
