import { format } from "date-fns"

export default class ManageDate {
  date_fmt(date: string, formatStr: string = "dd/MM/yyyy"): string {
    return format(new Date(date), formatStr)
  }

  date_fmt_back(date:string, formatStr: string = "yyyy/MM/dd"):any {
    const newDate = date.split("/")
    const day = Number(newDate[0])
    const month = Number(newDate[1]) - 1
    const year = Number(newDate[2])

    return format(new Date(year, month, day), formatStr)
  }
}