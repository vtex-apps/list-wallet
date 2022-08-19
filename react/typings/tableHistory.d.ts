interface TableHistory {
  value: number
  description: string
  dateAndTime: string
  status: boolean
}

interface FilterHistory {
  dateAndTime?: DateRange
  status?: boolean
}

interface DateRange {
  startDate: string
  endDate: string
}
